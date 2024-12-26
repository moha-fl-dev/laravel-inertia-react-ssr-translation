import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {addTranslationResource} from "@/utils/i18n.config";
import {PageProps} from "@/types";
import {useTranslation} from "react-i18next";

export default function Dashboard({lng, translations}: PageProps) {
    addTranslationResource(lng, translations)

    const {t} = useTranslation()

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 flex flex-row justify-between items-center">
                            <span>You're logged in!</span>
                            <span>{t('dashboard:keyWithCount', {count: 1})}</span>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
