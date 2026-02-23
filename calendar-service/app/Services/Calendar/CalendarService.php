<?php
// Opening PHP tag so the server knows this file is PHP.

namespace App\Services\Calendar;
// Put this class in the App\Services\Calendar namespace so we can reference it cleanly.

use Carbon\Carbon;
// Carbon gives us nice date/time handling (timezones, intervals, comparisons).

use Carbon\CarbonPeriod;
// CarbonPeriod lets us iterate over a range of dates/times (e.g. hour by hour).

class CalendarService
{
// Start of the CalendarService class that holds all calendar-related logic.

    /**
     * Returns a collection of calendar busy times for the given host.
     * Provider (Google / Yahoo / default) is chosen by host email domain.
     *
     * @param Carbon $startDate
     * @param Carbon $endDate
     * @param string|null $hostEmail Host email (e.g. host@gmail.com → Google Calendar; host@yahoo.com → Yahoo)
     * @return array
     */
    public static function getCalendarBusyTimes(Carbon $startDate, Carbon $endDate, ?string $hostEmail = null)
    {
        // Resolve which provider (Google / Yahoo / default) to use based on the host's email domain.
        $provider = CalendarProviderResolver::forHostEmail($hostEmail);

        // Ask that provider for all busy intervals in the given date range and return them.
        return $provider->getBusyTimes($startDate, $endDate, $hostEmail);
    }

    /**
     * Returns the calendar timezone for the given host.
     *
     * @param string|null $hostEmail Host email (determines provider)
     * @return string
     */
    public static function getCalendarTimezone(?string $hostEmail = null)
    {
        // Resolve which provider to use based on the host's email.
        $provider = CalendarProviderResolver::forHostEmail($hostEmail);

        // Return the timezone string (e.g. America/Los_Angeles) that the host's calendar uses.
        return $provider->getTimezone($hostEmail);
    }

    /**
     * Returns a list of free time slots when the host is available, between two dates.
     * Free = within host working hours (8am–8pm host timezone) and NOT in busy times.
     * Busy times come from the host's calendar provider (Google / Yahoo / default by email).
     *
     * @param Carbon $startDate Start of the date range (inclusive)
     * @param Carbon $endDate   End of the date range (inclusive)
     * @param string $bookerTimezone Timezone of the person booking (default: America/New_York)
     * @param string|null $hostEmail Host email (e.g. host@gmail.com → Google Calendar; host@yahoo.com → Yahoo)
     * @return array List of free slots, each with 'start_date' and 'end_date' in booker timezone
     */
    public static function getFreeTimes(
        Carbon $startDate,
        Carbon $endDate,
        string $bookerTimezone = 'America/New_York',
        ?string $hostEmail = null
    ) {
        // Pick the right calendar provider (Google / Yahoo / default) from the host's email.
        $provider = CalendarProviderResolver::forHostEmail($hostEmail);
        // Get the timezone the host's calendar lives in so we can enforce 8am–8pm in their time.
        $hostTimezone = $provider->getTimezone($hostEmail);

        // Host is only available 8am–8pm in their own timezone (8 = 8am, 20 = 8pm in 24h).
        $workStartHour = 8;
        $workEndHour = 20;

        // Fetch all busy intervals from the host's calendar for the requested date range.
        $busyTimes = $provider->getBusyTimes($startDate, $endDate, $hostEmail);

        // Build an hour-by-hour range from start to end, normalized to the host's timezone.
        $period = CarbonPeriod::since($startDate->copy()->startOfHour()->tz($hostTimezone))
            ->hours(1)
            ->until($endDate->copy()->endOfHour()->tz($hostTimezone));

        // We'll collect every slot that is both within working hours and not busy.
        $freeSlots = [];

        // Loop over each one-hour slot in the range.
        foreach ($period as $slotStart) {
            // Ensure we're interpreting this slot in the host's timezone.
            $slotStart->setTimezone($hostTimezone);
            // Get the hour (0–23) in the host's timezone so we can check 8am–8pm.
            $hourInHostTz = $slotStart->hour;

            // If the slot is before 8am or at/after 8pm in host time, skip it (outside working hours).
            if ($hourInHostTz < $workStartHour || $hourInHostTz >= $workEndHour) {
                continue;
            }

            // Slot is one hour long: from slotStart to slotStart + 1 hour.
            $slotEnd = $slotStart->copy()->addHour();

            // Assume this slot is free until we find an overlapping busy interval.
            $isBusy = false;
            // Check every busy interval from the calendar.
            foreach ($busyTimes as $busy) {
                // Normalize busy interval to host timezone for a fair comparison.
                $busyStart = $busy['start_date']->copy()->tz($hostTimezone);
                $busyEnd = $busy['end_date']->copy()->tz($hostTimezone);
                // Two intervals overlap if slot starts before busy ends AND slot ends after busy starts.
                if ($slotStart->lt($busyEnd) && $slotEnd->gt($busyStart)) {
                    $isBusy = true;
                    break;
                }
            }

            // If we didn't find any overlap, this slot is free.
            if (!$isBusy) {
                // Add it to the result, with start/end converted to the booker's timezone.
                $freeSlots[] = [
                    'start_date' => $slotStart->copy()->setTimezone($bookerTimezone),
                    'end_date' => $slotEnd->copy()->setTimezone($bookerTimezone),
                ];
            }
        }

        // Return the list of free slots (each in booker timezone) for the UI/API.
        return $freeSlots;
    }
}
