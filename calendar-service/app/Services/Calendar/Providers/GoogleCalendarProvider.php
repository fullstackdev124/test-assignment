<?php

namespace App\Services\Calendar\Providers;

use App\Services\Calendar\Contracts\CalendarProviderInterface;
use Carbon\Carbon;
use Carbon\CarbonPeriod;

/**
 * Google Calendar provider (e.g. for Gmail users).
 * Fetches busy times from Google Calendar API; timezone from calendar settings.
 */
class GoogleCalendarProvider implements CalendarProviderInterface
{
    /**
     * @param Carbon $startDate
     * @param Carbon $endDate
     * @param string|null $hostIdentifier Host Gmail address (used for API auth / calendar ID)
     */
    public function getBusyTimes(Carbon $startDate, Carbon $endDate, ?string $hostIdentifier = null): array
    {
        $timezone = $this->getTimezone($hostIdentifier);
        $start = $startDate->copy()->startOfHour()->tz($timezone);
        $end = $endDate->copy()->tz($timezone);
        $period = CarbonPeriod::since($start)->hours(1)->until($end);

        // TODO: Replace with real Google Calendar API call (freebusy or events).
        // Example: FreeBusy query for primary calendar of $hostIdentifier.
        $hoursBusy = [8, 9, 12, 14, 16]; // Stub: same as original for now

        $dates = [];
        foreach ($period as $date) {
            $date->setTimezone($timezone);
            if (in_array($date->hour, $hoursBusy, true)) {
                $dates[] = [
                    'start_date' => $date->copy(),
                    'end_date' => $date->copy()->addHour(),
                ];
            }
        }

        return $dates;
    }

    /**
     * @param string|null $hostIdentifier Host Gmail address
     */
    public function getTimezone(?string $hostIdentifier = null): string
    {
        // TODO: Fetch from Google Calendar API (calendar list / settings) for $hostIdentifier.
        return 'America/Los_Angeles';
    }
}
