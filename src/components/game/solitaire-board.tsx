import { DndProvider } from "react-dnd";
// import { TouchBackend } from 'react-dnd-touch-backend' // use for mobile
import { HTML5Backend } from "react-dnd-html5-backend";
import { useRef, useState, useLayoutEffect } from "react";

import SolitairePile from "./solitaire-pile";

import type { Pile } from "@/lib/types";

// https://react-dnd.github.io/react-dnd/docs/tutorial
function SolitaireBoard() {
  const [piles, setPiles] = useState<Pile[]>([
    {
      id: "1",
      cards: [
        {
          id: "1",
          suit: "hearts",
          rank: 1,
          flipped: true,
        },
        {
          id: "2",
          suit: "hearts",
          rank: 2,
          flipped: true,
        },
      ],
      type: "tableauPile",
    },
    {
      id: "2",
      cards: [
        {
          id: "3",
          suit: "hearts",
          rank: 1,
          flipped: true,
        },
        {
          id: "4",
          suit: "hearts",
          rank: 2,
          flipped: true,
        },
        {
          id: "5",
          suit: "hearts",
          rank: 3,
          flipped: true,
        },
        {
          id: "6",
          suit: "hearts",
          rank: 4,
          flipped: true,
        },
        {
          id: "7",
          suit: "hearts",
          rank: 5,
          flipped: true,
        },
        {
          id: "8",
          suit: "hearts",
          rank: 6,
          flipped: true,
        },
        {
          id: "9",
          suit: "hearts",
          rank: 7,
          flipped: true,
        },
        {
          id: "10",
          suit: "hearts",
          rank: 8,
          flipped: true,
        },
      ],
      type: "tableauPile",
      suit: "hearts",
    },
    {
      id: "3",
      cards: [],
      type: "tableauPile",
      suit: "hearts",
    },
  ]);

  const parentRef = useRef<HTMLDivElement>(null);

  const cardWidth = 64;
  const cardAspect = 5 / 7;
  const cardHeight = Math.round(cardWidth / cardAspect);
  const numCards = Math.max(
    ...piles
      .filter((pile) => pile.type === "tableauPile")
      .map((pile) => pile.cards.length),
    0
  );

  const maxCardMarginTop = -cardHeight * (2 / 3);

  const [cardMarginTop, setCardMarginTop] = useState(maxCardMarginTop);

  useLayoutEffect(() => {
    const updateCardMarginTop = () => {
      if (!parentRef.current) return;

      const parentHeight = parentRef.current.offsetHeight;
      const scaleFactor =
        (parentHeight - cardHeight) / (cardHeight * (numCards - 1));
      const margin = cardHeight - cardHeight * scaleFactor;

      setCardMarginTop(Math.min(maxCardMarginTop, -margin));
    };

    window.addEventListener("resize", updateCardMarginTop);

    updateCardMarginTop();

    return () => window.removeEventListener("resize", updateCardMarginTop);
  }, [cardHeight, maxCardMarginTop, numCards]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className="aspect-square h-full grow overflow-hidden border flex bg-emerald-700 gap-2 p-2"
        style={
          {
            "--card-margin-top": `${cardMarginTop}px`,
            "--card-width": `${cardWidth}px`,
            "--card-height": `${cardHeight}px`,
          } as React.CSSProperties
        }
        ref={parentRef}
      >
        {piles.map((pile) => (
          <SolitairePile
            key={pile.id}
            cards={pile.cards}
            suit={pile.suit}
            fanned={true}
            id={pile.id}
            type={pile.type}
          />
        ))}
      </div>
    </DndProvider>
  );
}

export default SolitaireBoard;
