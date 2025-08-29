import { createContext } from "react";
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
