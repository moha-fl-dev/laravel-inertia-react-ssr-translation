<?php

namespace App\Helpers;

use Illuminate\Support\Facades\File;

class TranslationHelper
{

    public static function getTranslations(string $language, array $namespaces): array
    {
        $translations = [];

        foreach ($namespaces as $namespace) {
            $path = public_path("locales/$language/$namespace.json");
            if (File::exists($path)) {
                $translations[$namespace] = json_decode(File::get($path), true);
            }
        }

        return $translations;
    }
}
