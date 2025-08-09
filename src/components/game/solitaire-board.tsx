import { useRef, useState, useLayoutEffect } from "react";

import SolitairePile from "@/components/game/solitaire-pile";

import { useSolitaire } from "@/components/game/solitaire-provider";

function SolitaireBoard() {
  const { foundations, waste, stock, tableauPiles, drawFromStock } =
    useSolitaire();

  const parentRef = useRef<HTMLDivElement>(null);

  const cardWidth = 48;
  const cardAspect = 5 / 7;
  const cardHeight = Math.round(cardWidth / cardAspect);
  const numCards = Math.max(
    ...tableauPiles.map((pile) => pile.cards.length),
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      drawFromStock();
    }
  };

  return (
    <div
      className="h-full w-full flex justify-center grow overflow-hidden border bg-emerald-700 dark:bg-emerald-900 p-1 rounded-md"
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
          {foundations.map((pile) => (
            <SolitairePile
              key={pile.id}
              cards={pile.cards}
              type={pile.type}
              suit={pile.suit}
              id={pile.id}
            />
          ))}
        </div>
        <div></div>
        <div className="col-span-2 grid grid-cols-2 gap-1">
          <SolitairePile cards={waste.cards} type={waste.type} id={waste.id} />
          <div
            onClick={() => drawFromStock()}
            onKeyDown={handleKeyDown}
            className={
              stock.cards.length > 0 || waste.cards.length > 0
                ? "cursor-pointer"
                : undefined
            }
            tabIndex={stock.cards.length > 0 || waste.cards.length > 0 ? 0 : -1}
          >
            <SolitairePile
              cards={stock.cards}
              type={stock.type}
              id={stock.id}
            />
          </div>
        </div>
        <div
          className="col-span-7 grid grid-cols-7 gap-1 min-h-0"
          ref={parentRef}
        >
          {tableauPiles.map((pile) => (
            <SolitairePile
              key={pile.id}
              cards={pile.cards}
              fanned={true}
              type={pile.type}
              id={pile.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SolitaireBoard;
