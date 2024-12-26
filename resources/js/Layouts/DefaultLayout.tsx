import {isValidElement, ReactNode} from "react";
import i18next from "@/utils/i18n.config";

export default function DefaultLayout({children}: { children: ReactNode }) {

    if(isValidElement(children)){
        const translations = children.props.translations

       if(translations) {
           Object.entries(translations).forEach(([namespace, resource]) => {
               if (!i18next.hasResourceBundle('en', namespace)) {
                   i18next.addResourceBundle('en', namespace, resource, true, true);
               }
           });
       }
    }

    return (<main>{children}</main>)
}
