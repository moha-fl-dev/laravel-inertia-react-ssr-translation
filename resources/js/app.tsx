import '../css/app.css';
import './bootstrap';
import {createInertiaApp} from '@inertiajs/react';
import {resolvePageComponent} from 'laravel-vite-plugin/inertia-helpers';
import {createRoot, hydrateRoot} from 'react-dom/client';
import '@/utils/i18n.config'
import i18next from "@/utils/i18n.config";
import {I18nextProvider} from "react-i18next";


const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        return await resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        )
    }
    ,
    setup({el, App, props}) {

        if (import.meta.env.SSR) {

            hydrateRoot(el, <I18nextProvider i18n={i18next}>
                <App {...props} />
            </I18nextProvider>);
            return;
        }

        createRoot(el).render(<I18nextProvider i18n={i18next}>
            <App {...props} />
        </I18nextProvider>);
    },
    progress: {
        color: '#4B5563',
    },
});
