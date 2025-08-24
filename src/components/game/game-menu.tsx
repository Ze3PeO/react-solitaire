import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import SolitaireStats from "@/components/solitaire/solitaire-stats";
import GameSettings from "@/components/game/game-settings";

function GameMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>
            <span>
              This is the menu for the solitaire game. Here you will find
              statistics, how to play, about and other settings.
            </span>
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 p-4">
          <SolitaireStats />
          <GameSettings />
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default GameMenu;
