<?php

namespace App\Services\Calendar\Providers;

use App\Services\Calendar\Contracts\CalendarProviderInterface;
use Carbon\Carbon;
use Carbon\CarbonPeriod;

/**
 * Default / fallback calendar provider (e.g. internal or no external calendar).
 * Uses the same stub logic as the original CalendarService.
 */
class DefaultCalendarProvider implements CalendarProviderInterface
{
    public function getBusyTimes(Carbon $startDate, Carbon $endDate, ?string $hostIdentifier = null): array
    {
        $timezone = $this->getTimezone($hostIdentifier);
        $start = $startDate->copy()->startOfHour()->tz($timezone);
        $end = $endDate->copy()->tz($timezone);
        $period = CarbonPeriod::since($start)->hours(1)->until($end);
        $hoursBusy = [8, 9, 12, 14, 16];

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

    public function getTimezone(?string $hostIdentifier = null): string
    {
        return 'America/Los_Angeles';
    }
}
