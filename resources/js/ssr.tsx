import {createInertiaApp} from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import {resolvePageComponent} from 'laravel-vite-plugin/inertia-helpers';
import ReactDOMServer from 'react-dom/server';
import {RouteName} from 'ziggy-js';
import {route} from '../../vendor/tightenco/ziggy';
import i18next from "@/utils/i18n.config";
import {I18nextProvider} from "react-i18next";

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: async (name) =>{

            return await resolvePageComponent(
                `./Pages/${name}.tsx`,
                import.meta.glob('./Pages/**/*.tsx'),
            )
        },
        setup: ({ App, props }) => {

            /* eslint-disable */
            // @ts-expect-error
            global.route<RouteName> = (name, params, absolute) =>
                route(name, params as any, absolute, {
                    ...page.props.ziggy,
                    location: new URL(page.props.ziggy.location),
                });
            /* eslint-enable */

            return <I18nextProvider i18n={i18next}>
                <App {...props} />
            </I18nextProvider >
        },
    }),
);
