import { createContext, useContext } from "react";
import type { Language } from "@/lib/types";

type LanguageProviderState = {
    language: Language;
    setLanguage: (language: Language) => void;
};

const initialState: LanguageProviderState = {
    language: "en",
    setLanguage: () => null,
};

export const LanguageProviderContext =
    createContext<LanguageProviderState>(initialState);

export const useLanguage = () => {
    const context = useContext(LanguageProviderContext);

    if (context === undefined)
        throw new Error("useLanguage must be used within a LanguageProvider");

    return context;
};
