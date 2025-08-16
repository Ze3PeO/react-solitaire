import { useEffect, useState } from "react";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useSolitaire } from "@/components/game/solitaire-provider";
import Confetti from "react-confetti";
import { useWindowSize } from "@/hooks/use-window-size";
import type { Stat } from "@/lib/types";
import { LocalStorageKey } from "@/lib/constants";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { v4 as uuidv4 } from "uuid";

function SolitaireEventHandler({ children }: { children: React.ReactNode }) {
  const { handleCardMove, isFinished, elapsedTime, score } = useSolitaire();
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [stats, setStats] = useLocalStorage<Stat[]>(LocalStorageKey.STATS, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;
    if (!over.data.current?.accepts.includes(active.data.current?.type)) return;

    const pile = over.data.current?.pile;
    const card = active.data.current?.card;

    handleCardMove(card, pile);
  };

  useEffect(() => {
    if (!isFinished) return;

    setShowConfetti(true);

    setStats([
      ...stats,
      {
        id: uuidv4(),
        time: elapsedTime,
        score: score,
        date: Date.now(),
      },
    ]);
  }, [isFinished]);

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
