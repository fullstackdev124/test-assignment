<?php

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Services\Calendar\CalendarService;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// GET /busy?host_email=host@gmail.com (optional: host_email → Google; host@yahoo.com → Yahoo; else default)
Route::get('/busy', function (Request $request) {
    $startDate = Carbon::now()->startOfDay();
    $endDate = Carbon::now()->endOfDay();
    $hostEmail = $request->query('host_email') ? (string) $request->query('host_email') : null;
    $busyTimes = CalendarService::getCalendarBusyTimes($startDate, $endDate, $hostEmail);

    return $busyTimes;
});

// GET /free?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD&host_email=host@gmail.com (optional host_email)
// Returns free slots (host available, 8am–8pm host TZ, not busy) in booker timezone (America/New_York)
Route::get('/free', function (Request $request) {
    $startParam = $request->query('start_date');
    $endParam = $request->query('end_date');
    $hostEmail = $request->query('host_email') ? (string) $request->query('host_email') : null;

    if (!$startParam || !$endParam) {
        return response()->json([
            'error' => 'Missing required parameters: start_date and end_date (YYYY-MM-DD)',
        ], 422);
    }

    try {
        $startDate = Carbon::parse($startParam)->startOfDay();
        $endDate = Carbon::parse($endParam)->endOfDay();
    } catch (\Exception $e) {
        return response()->json(['error' => 'Invalid date format. Use YYYY-MM-DD.'], 422);
    }

    if ($startDate->gt($endDate)) {
        return response()->json(['error' => 'start_date must be before or equal to end_date.'], 422);
    }

    $freeTimes = CalendarService::getFreeTimes($startDate, $endDate, 'America/New_York', $hostEmail);

    // Serialize Carbon instances to ISO 8601 for JSON response
    return array_map(function ($slot) {
        return [
            'start_date' => $slot['start_date']->toIso8601String(),
            'end_date' => $slot['end_date']->toIso8601String(),
        ];
    }, $freeTimes);
});
