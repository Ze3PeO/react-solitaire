import SolitaireBoard from "@/components/game/solitaire-board";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { SolitaireProvider } from "@/components/game/solitaire-provider";
import { DndProvider } from "react-dnd";
// import { TouchBackend } from 'react-dnd-touch-backend' // use for mobile
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <DndProvider backend={HTML5Backend}>
        <SolitaireProvider>
          <div className="flex min-h-svh flex-col items-center justify-center gap-2 p-2">
            <div className="flex justify-end w-full">
              <ModeToggle />
            </div>
            <SolitaireBoard />
          </div>
        </SolitaireProvider>
      </DndProvider>
    </ThemeProvider>
  );
}

export default App;
