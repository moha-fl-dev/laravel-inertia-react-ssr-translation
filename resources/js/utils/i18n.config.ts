import i18next, {Resource} from 'i18next';

i18next.init({
    debug: true,
    supportedLngs: ['en', 'nl'],
    fallbackLng: 'en',
    partialBundledLanguages: true,
    ns: [],
    resources: {}
});

export default i18next

/**
 * use addResourceBundle to add the translations to the store
 * this allows us to add namespaces dynamically for every route.
 * it can also set the language
 */
export function addTranslationResource(lng: string, translations: Resource) {

    if (translations) {
        Object.entries(translations).forEach(([namespace, resource]) => {
            if (!i18next.hasResourceBundle(lng, namespace)) {
                i18next.addResourceBundle(lng, namespace, resource, true, true);
            }
        });
    }
    if (i18next.language !== lng) {
        i18next.changeLanguage(lng);
    }
}
