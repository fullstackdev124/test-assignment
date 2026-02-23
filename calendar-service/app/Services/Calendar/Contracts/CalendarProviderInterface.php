<?php

namespace App\Services\Calendar\Contracts;

use Carbon\Carbon;

/**
 * Contract for calendar providers (Google Calendar, Yahoo Calendar, etc.).
 * Each provider returns busy times and timezone for a given host.
 */
interface CalendarProviderInterface
{
    /**
     * Return busy time intervals for the host in the given date range.
     *
     * @param Carbon $startDate
     * @param Carbon $endDate
     * @param string|null $hostIdentifier Host email or ID (provider-specific)
     * @return array List of ['start_date' => Carbon, 'end_date' => Carbon]
     */
    public function getBusyTimes(Carbon $startDate, Carbon $endDate, ?string $hostIdentifier = null): array;

    /**
     * Return the timezone for the host's calendar (e.g. America/Los_Angeles).
     *
     * @param string|null $hostIdentifier Host email or ID
     * @return string
     */
    public function getTimezone(?string $hostIdentifier = null): string;
}
