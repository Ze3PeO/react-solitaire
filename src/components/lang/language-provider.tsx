import type { Language } from "@/lib/types";
import { createContext, useContext, useEffect, useState } from "react";
import i18next from "i18next";

type LanguageProviderProps = {
  children: React.ReactNode;
  defaultLanguage?: Language;
};

type LanguageProviderState = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const initialState: LanguageProviderState = {
  language: "en",
  setLanguage: () => null,
};

const LanguageProviderContext = createContext<LanguageProviderState>(initialState);

export function LanguageProvider({
  children,
  defaultLanguage = "en",
  ...props
}: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(
    () => (i18next.language as Language) || defaultLanguage
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
    <LanguageProviderContext.Provider {...props} value={value}>
      {children}
    </LanguageProviderContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext);

  if (context === undefined)
    throw new Error("useLanguage must be used within a LanguageProvider");

  return context;
};
