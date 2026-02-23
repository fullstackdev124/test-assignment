<?php

namespace App\Services\Calendar;

use App\Services\Calendar\Contracts\CalendarProviderInterface;
use App\Services\Calendar\Providers\DefaultCalendarProvider;
use App\Services\Calendar\Providers\GoogleCalendarProvider;
use App\Services\Calendar\Providers\YahooCalendarProvider;

/**
 * Resolves which calendar provider to use based on host email.
 * Gmail / Google → Google Calendar; Yahoo → Yahoo Calendar; else default.
 */
class CalendarProviderResolver
{
    /** @var array<string, class-string<CalendarProviderInterface>> */
    protected static array $domainMap = [
        'gmail.com' => GoogleCalendarProvider::class,
        'googlemail.com' => GoogleCalendarProvider::class,
        'yahoo.com' => YahooCalendarProvider::class,
        'ymail.com' => YahooCalendarProvider::class,
    ];

    protected static ?CalendarProviderInterface $defaultProvider = null;

    /**
     * Get the calendar provider for the given host email.
     * If no email or unknown domain, returns the default provider.
     */
    public static function forHostEmail(?string $hostEmail): CalendarProviderInterface
    {
        if (empty($hostEmail)) {
            return self::defaultProvider();
        }

        $at = strrchr($hostEmail, '@');
        $domain = $at !== false ? strtolower(ltrim($at, '@')) : '';
        $providerClass = self::$domainMap[$domain] ?? null;

        if ($providerClass !== null) {
            return new $providerClass();
        }

        return self::defaultProvider();
    }

    protected static function defaultProvider(): CalendarProviderInterface
    {
        if (self::$defaultProvider === null) {
            self::$defaultProvider = new DefaultCalendarProvider();
        }

        return self::$defaultProvider;
    }
}
