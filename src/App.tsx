import SolitaireBoard from "@/components/game/solitaire-board";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex min-h-svh flex-col items-center justify-center">
        <ModeToggle />
        <SolitaireBoard />
      </div>
    </ThemeProvider>
  );
}

export default App;
