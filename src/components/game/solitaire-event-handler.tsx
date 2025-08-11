import { useEffect, useState } from "react";
import { Events } from "@/lib/constants";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useSolitaire } from "@/components/game/solitaire-provider";
import Confetti from "react-confetti";
import { useWindowSize } from "@/hooks/use-window-size";

function SolitaireEventHandler({ children }: { children: React.ReactNode }) {
  const { handleCardMove } = useSolitaire();
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;
    if (!over.data.current?.accepts.includes(active.data.current?.type)) return;

    const pile = over.data.current?.pile;
    const card = active.data.current?.card;

    handleCardMove(card, pile);
  };

  useEffect(() => {
    const onGameWin = () => setShowConfetti(true);

    window.addEventListener(Events.GAME_WIN, onGameWin);

    return () => {
      window.removeEventListener(Events.GAME_WIN, onGameWin);
    };
  }, []);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {children}
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )}
    </DndContext>
  );
}

export default SolitaireEventHandler;
