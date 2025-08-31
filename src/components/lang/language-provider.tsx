import type { Language } from "@/lib/types";
import { useEffect, useState } from "react";
import i18next from "i18next";
import { LanguageProviderContext } from "@/components/lang/language-context";

interface LanguageProviderProps {
    children: React.ReactNode;
    defaultLanguage?: Language;
}

export function LanguageProvider({
    children,
    defaultLanguage = "en",
    ...props
}: LanguageProviderProps) {
    const [language, setLanguage] = useState<Language>(
        () => (i18next.language as Language) || defaultLanguage,
    );

    useEffect(() => {
        i18next.changeLanguage(language);

        document.body.dir = i18next.dir();
        document.documentElement.lang = i18next.language;
    }, [language]);

    const value = {
        language,
        setLanguage: (language: Language) => {
            setLanguage(language);
        },
    };

    return (
        <LanguageProviderContext {...props} value={value}>
            {children}
        </LanguageProviderContext>
    );
}
