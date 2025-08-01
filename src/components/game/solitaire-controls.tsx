import { Button } from "@/components/ui/button";
import { useSolitaire } from "@/components/game/solitaire-provider";
import { CheckCheck, Redo, RotateCcw, Undo } from "lucide-react";

function SolitaireControls() {
  const { restartGame } = useSolitaire();

  return (
    <div className="flex gap-2">
      <Button variant="secondary" size="icon" onClick={restartGame}>
        <RotateCcw />
      </Button>
      <Button variant="secondary" size="icon" disabled>
        <CheckCheck />
      </Button>
      <Button variant="secondary" size="icon" disabled>
        <Undo />
      </Button>
      <Button variant="secondary" size="icon" disabled>
        <Redo />
      </Button>
    </div>
  );
}

export default SolitaireControls;
