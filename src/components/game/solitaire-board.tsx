import { DndProvider } from "react-dnd";
// import { TouchBackend } from 'react-dnd-touch-backend' // use for mobile
import { HTML5Backend } from "react-dnd-html5-backend";
import { useRef, useState, useLayoutEffect } from "react";

import SolitairePile from "./solitaire-pile";

import type { Game } from "@/lib/types";
import { generateGame } from "@/lib/utils";

// https://react-dnd.github.io/react-dnd/docs/tutorial
function SolitaireBoard() {
  const [game, setGame] = useState<Game>(generateGame());

  const parentRef = useRef<HTMLDivElement>(null);

  const cardWidth = 48;
  const cardAspect = 5 / 7;
  const cardHeight = Math.round(cardWidth / cardAspect);
  const numCards = Math.max(
    ...game.piles
      .filter((pile) => pile.type === "tableauPile")
      .map((pile) => pile.cards.length),
    0
  );

  const maxCardMarginTop = -cardHeight * (3 / 5);

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
        className="h-full max-sm:w-full flex justify-center grow overflow-hidden border bg-emerald-700 dark:bg-emerald-900 p-1 rounded-md"
        style={
          {
            "--card-margin-top": `${cardMarginTop}px`,
            "--card-width": `${cardWidth}px`,
            "--card-height": `${cardHeight}px`,
          } as React.CSSProperties
        }
      >
        <div className="grid w-fit grid-rows-[auto_1fr] grid-cols-7 gap-1 ">
          <div className="col-span-4 grid grid-cols-4 gap-1">
            {game.piles
              .filter((pile) => pile.type === "foundation")
              .map((pile) => (
                <SolitairePile
                  key={pile.id}
                  cards={pile.cards}
                  fanned={false}
                  id={pile.id}
                  type={pile.type}
                  suit={pile.suit}
                />
              ))}
          </div>
          <div></div>
          <div className="col-span-2 grid grid-cols-2 gap-1">
            <SolitairePile cards={[]} fanned={false} id="waste" type="waste" />
            <SolitairePile cards={[]} fanned={false} id="stock" type="stock" />
          </div>
          <div
            className="col-span-7 grid grid-cols-7 gap-1 min-h-0"
            ref={parentRef}
          >
            {game.piles
              .filter((pile) => pile.type === "tableauPile")
              .map((pile) => (
                <SolitairePile
                  key={pile.id}
                  cards={pile.cards}
                  fanned={true}
                  id={pile.id}
                  type={pile.type}
                />
              ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default SolitaireBoard;
