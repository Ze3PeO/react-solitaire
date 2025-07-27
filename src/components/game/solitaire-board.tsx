import { useRef, useState, useLayoutEffect } from "react";

import SolitairePile from "@/components/game/solitaire-pile";

import { useSolitaire } from "@/components/game/solitaire-provider";

// https://react-dnd.github.io/react-dnd/docs/tutorial
function SolitaireBoard() {
  const { foundations, waste, stock, tableauPiles, clickStock } =
    useSolitaire();

  const parentRef = useRef<HTMLDivElement>(null);

  const cardWidth = 48;
  const cardAspect = 5 / 7;
  const cardHeight = Math.round(cardWidth / cardAspect);
  const numCards = Math.max(
    ...Object.values(tableauPiles).map((pile) => pile.cards.length),
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
          {Object.values(foundations).map((pile) => (
            <SolitairePile
              key={pile.suit}
              cards={pile.cards}
              type={pile.type}
              suit={pile.suit}
            />
          ))}
        </div>
        <div></div>
        <div className="col-span-2 grid grid-cols-2 gap-1">
          <SolitairePile cards={waste.cards} type={waste.type} />
          <div
            onClick={() => clickStock()}
            className={
              stock.cards.length > 0 || waste.cards.length > 0
                ? "cursor-pointer"
                : undefined
            }
          >
            <SolitairePile cards={stock.cards} type={stock.type} />
          </div>
        </div>
        <div
          className="col-span-7 grid grid-cols-7 gap-1 min-h-0"
          ref={parentRef}
        >
          {Object.values(tableauPiles).map((pile) => (
            <SolitairePile
              key={pile.index}
              cards={pile.cards}
              fanned={true}
              type={pile.type}
              index={pile.index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SolitaireBoard;
