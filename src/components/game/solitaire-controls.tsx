import { Button } from "@/components/ui/button";
import { useSolitaire } from "@/components/game/solitaire-provider";
import { CheckCheck, Redo, RotateCcw, Undo } from "lucide-react";

function SolitaireControls() {
  const { resetGame, canUndo, canRedo, undo, redo, canAutoFinish, autoFinish } =
    useSolitaire();

  return (
    <div className="flex gap-2">
      <Button variant="secondary" size="icon" onClick={resetGame}>
        <RotateCcw />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        disabled={!canAutoFinish}
        onClick={autoFinish}
      >
        <CheckCheck />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        disabled={!canUndo}
        onClick={undo}
      >
        <Undo />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        disabled={!canRedo}
        onClick={redo}
      >
        <Redo />
      </Button>
    </div>
  );
}

export default SolitaireControls;
