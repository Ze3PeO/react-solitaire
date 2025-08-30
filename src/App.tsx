import SolitaireBoard from "@/components/solitaire/solitaire-board";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { SolitaireProvider } from "@/components/solitaire/solitaire-provider";
import SolitaireScore from "@/components/solitaire/solitaire-score";
import SolitaireTimer from "@/components/solitaire/solitaire-timer";
import SolitaireControls from "@/components/solitaire/solitaire-controls";
import GameMenu from "@/components/game/game-menu";
import SolitaireEventHandler from "@/components/solitaire/solitaire-event-handler";
import { LanguageProvider } from "@/components/lang/language-provider";
import { useTranslation } from "react-i18next";

function App() {
    const { t } = useTranslation();

    return (
        <LanguageProvider defaultLanguage="en">
            <ThemeProvider defaultTheme="dark">
                <h1 className="sr-only">{t("global.title")}</h1>
                <div className="flex min-h-svh flex-col items-center justify-center gap-2 pt-2 px-2 pb-safe-2 max-w-prose mx-auto ">
                    <header className="flex justify-between items-center w-full gap-2">
                        <GameMenu />
                        <ThemeToggle />
                    </header>
                    <SolitaireProvider>
                        <SolitaireEventHandler>
                            <SolitaireBoard />
                            <footer className="flex justify-between items-center gap-2 w-full">
                                <div className="flex h-fit gap-2">
                                    <SolitaireScore />
                                    <SolitaireTimer />
                                </div>
                                <SolitaireControls />
                            </footer>
                        </SolitaireEventHandler>
                    </SolitaireProvider>
                </div>
            </ThemeProvider>
        </LanguageProvider>
    );
}

export default App;
