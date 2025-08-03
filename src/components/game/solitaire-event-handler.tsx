import { useEffect } from "react";
import { Events } from "@/lib/constants";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useSolitaire } from "@/components/game/solitaire-provider";

function SolitaireEventHandler({ children }: { children: React.ReactNode }) {
  const { moveCardToFoundation, moveCardToTableau } = useSolitaire();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;
    if (!over.data.current?.accepts.includes(active.data.current?.type)) return;

    const pile = over.data.current?.pile;
    const card = active.data.current?.card;

    switch (pile.type) {
      case "foundation":
        moveCardToFoundation(card, pile);
        break;
      case "tableauPile":
        moveCardToTableau(card, pile);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const onGameWin = () =>
      toast.success("You win! Press the reset button to play again.");

    window.addEventListener(Events.GAME_WIN, onGameWin);

    return () => {
      window.removeEventListener(Events.GAME_WIN, onGameWin);
    };
  }, []);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {children}
      <Toaster position="top-center" />
    </DndContext>
  );
}

export default SolitaireEventHandler;
