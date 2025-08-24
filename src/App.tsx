import SolitaireBoard from "@/components/solitaire/solitaire-board";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { SolitaireProvider } from "@/components/solitaire/solitaire-provider";
import SolitaireScore from "@/components/solitaire/solitaire-score";
import SolitaireTimer from "@/components/solitaire/solitaire-timer";
import SolitaireControls from "@/components/solitaire/solitaire-controls";
import SolitaireMenu from "@/components/solitaire/solitaire-menu";
import SolitaireEventHandler from "@/components/solitaire/solitaire-event-handler";
import LanguageSelector from "@/components/lang/language-selector";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SolitaireProvider>
        <SolitaireEventHandler>
          <div className="flex min-h-svh flex-col items-center justify-center gap-2 pt-2 px-2 pb-safe-2 max-w-prose mx-auto ">
            <div className="flex justify-between w-full gap-2">
              <SolitaireMenu />
              <LanguageSelector />
              <ModeToggle />
            </div>
            <SolitaireBoard />
            <div className="flex justify-between items-center gap-2 w-full">
              <div className="flex h-fit gap-2">
                <SolitaireScore />
                <SolitaireTimer />
              </div>
              <SolitaireControls />
            </div>
          </div>
        </SolitaireEventHandler>
      </SolitaireProvider>
    </ThemeProvider>
  );
}

export default App;
