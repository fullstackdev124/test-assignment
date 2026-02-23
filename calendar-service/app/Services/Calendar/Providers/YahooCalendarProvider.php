<?php

namespace App\Services\Calendar\Providers;

use App\Services\Calendar\Contracts\CalendarProviderInterface;
use Carbon\Carbon;
use Carbon\CarbonPeriod;

/**
 * Yahoo Calendar provider (e.g. for Yahoo Mail users).
 * Fetches busy times from Yahoo Calendar; timezone from calendar settings.
 */
class YahooCalendarProvider implements CalendarProviderInterface
{
    /**
     * @param Carbon $startDate
     * @param Carbon $endDate
     * @param string|null $hostIdentifier Host Yahoo address (used for API / calendar)
     */
    public function getBusyTimes(Carbon $startDate, Carbon $endDate, ?string $hostIdentifier = null): array
    {
        $timezone = $this->getTimezone($hostIdentifier);
        $start = $startDate->copy()->startOfHour()->tz($timezone);
        $end = $endDate->copy()->tz($timezone);
        $period = CarbonPeriod::since($start)->hours(1)->until($end);

        // TODO: Replace with real Yahoo Calendar API when available.
        $hoursBusy = [10, 11, 15]; // Stub: different pattern to distinguish from Google

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
     * @param string|null $hostIdentifier Host Yahoo address
     */
    public function getTimezone(?string $hostIdentifier = null): string
    {
        // TODO: Fetch from Yahoo Calendar API for $hostIdentifier.
        return 'America/Los_Angeles';
    }
}
