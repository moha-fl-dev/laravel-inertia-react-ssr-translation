import {Config} from 'ziggy-js';
import {Resource} from "i18next";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
    translations: Resource // add the translation prop. will be available for every route
    lng: string // add the language props. will be available for evey route
};
