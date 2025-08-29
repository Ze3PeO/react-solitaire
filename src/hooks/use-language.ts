import { LanguageProviderContext } from "@/components/lang/language-context";
import { useContext } from "react";

export const useLanguage = () => {
    const context = useContext(LanguageProviderContext);

    if (context === undefined)
        throw new Error("useLanguage must be used within a LanguageProvider");

    return context;
};
