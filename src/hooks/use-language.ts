import { LanguageProviderContext } from "@/components/lang/language-context";
import { use } from "react";

export const useLanguage = () => {
    const context = use(LanguageProviderContext);

    if (context === undefined)
        throw new Error("useLanguage must be used within a LanguageProvider");

    return context;
};
