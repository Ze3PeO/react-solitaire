import { ThemeColor } from "@/lib/constants";
import type { Theme } from "@/lib/types";
import { useEffect, useState } from "react";
import { ThemeProviderContext } from "@/components/theme/theme-context";

type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
};

export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "vite-ui-theme",
    ...props
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
    );

    useEffect(() => {
        if (theme === "system") {
            const systemTheme = window.matchMedia(
                "(prefers-color-scheme: dark)",
            ).matches
                ? "dark"
                : "light";

            applyTheme(systemTheme);
            return;
        }

        applyTheme(theme);
    }, [theme]);

    const applyTheme = (theme: Theme) => {
        localStorage.setItem(storageKey, theme);
        const root = window.document.documentElement;
        const themeColor = document.querySelector('meta[name="theme-color"]');

        root.classList.remove("light", "dark");
        root.classList.add(theme);
        themeColor?.setAttribute("content", ThemeColor[theme]);
    };

    const value = {
        theme,
        setTheme: (theme: Theme) => {
            setTheme(theme);
        },
    };

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}
