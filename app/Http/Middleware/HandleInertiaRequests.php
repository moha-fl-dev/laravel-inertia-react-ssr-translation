<?php

namespace App\Http\Middleware;

use App\Helpers\TranslationHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        // Determine if the request is a GET request
        if ($request->method() !== 'GET') {
            // Skip translation loading for non-GET requests
            return [
                ...parent::share($request),
                'auth' => [
                    'user' => $request->user(),
                ],
                'ziggy' => fn () => [
                    ...(new Ziggy)->toArray(),
                    'location' => $request->url(),
                ],
                'lng' => App::getLocale(),
            ];
        }

        // get route name. naming each route is required
        // example: dashboard.index or profile.edit
        $routeName = $request->route()->getName();

        // get the required namespace(s) from the config
        $requiredNamespaces = config('translations.routes')[$routeName];

        // load the resources. json files containing the translations
        // note: is there value is caching this?
        $translations = TranslationHelper::getTranslations(App::getLocale(), $requiredNamespaces);

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'lng' => App::getLocale(),
            'translations' => $translations,
        ];
    }
}
