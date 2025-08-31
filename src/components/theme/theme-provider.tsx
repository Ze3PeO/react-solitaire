import { LocalStorageKey, ThemeColor, Themes } from "@/lib/constants";
import type { Theme } from "@/lib/types";
import { useEffect, useState, useMemo } from "react";
import { ThemeProviderContext } from "@/components/theme/theme-context";
import { useLocalStorage } from "@/hooks/use-local-storage";

interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: Theme;
}

export function ThemeProvider({
    children,
    defaultTheme = "system",
    ...props
}: ThemeProviderProps) {
    const [localStorageTheme, setLocalStorageTheme] = useLocalStorage<Theme>(
        LocalStorageKey.THEME,
        defaultTheme,
    );
    const [theme, setTheme] = useState<Theme>(
        () => localStorageTheme ?? defaultTheme,
    );

    useEffect(() => {
        const applyTheme = (theme: Theme) => {
            setLocalStorageTheme(theme);
            const root = window.document.documentElement;
            const themeColor = document.querySelector(
                'meta[name="theme-color"]',
            );

            root.classList.remove(...Themes);
            root.classList.add(theme);
            themeColor?.setAttribute("content", ThemeColor[theme]);
        };

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
    }, [theme, setLocalStorageTheme]);

    const value = useMemo(
        () => ({
            theme,
            setTheme: (theme: Theme) => {
                setTheme(theme);
            },
        }),
        [theme, setTheme],
    );

    return (
        <ThemeProviderContext {...props} value={value}>
            {children}
        </ThemeProviderContext>
    );
}
