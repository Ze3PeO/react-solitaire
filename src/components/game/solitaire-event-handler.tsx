import { useEffect } from "react";
import { Events } from "@/lib/constants";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

function SolitaireEventHandler() {
  useEffect(() => {
    const onGameWin = () =>
      toast.success("You win! Press the reset button to play again.");

    window.addEventListener(Events.GAME_WIN, onGameWin);

    return () => {
      window.removeEventListener(Events.GAME_WIN, onGameWin);
    };
  }, []);

  return <Toaster />;
}

export default SolitaireEventHandler;
