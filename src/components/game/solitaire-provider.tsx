import { createContext, useContext, useState } from "react";
import { generateGame } from "@/lib/utils";
import type { Game, Pile } from "@/lib/types";
import type { ReactNode } from "react";
import { cloneDeep } from "lodash";

interface SolitaireProviderState {
  clickStock: () => void;
  foundations: Pile[];
  waste: Pile;
  stock: Pile;
  tableauPiles: Pile[];
}

const SolitaireContext = createContext<SolitaireProviderState | undefined>(
  undefined
);

export const SolitaireProvider = ({ children }: { children: ReactNode }) => {
  const [game, setGame] = useState<Game>(generateGame());

  const clickStock = () => {
    setGame((prevGame) => {
      const stockIndex = prevGame.piles.findIndex((p) => p.type === "stock");
      const wasteIndex = prevGame.piles.findIndex((p) => p.type === "waste");

      if (stockIndex === -1 || wasteIndex === -1) return prevGame;

      const stock: Pile = cloneDeep(prevGame.piles[stockIndex]);
      const waste: Pile = cloneDeep(prevGame.piles[wasteIndex]);

      if (stock.cards.length > 0) {
        const uppermostCard = stock.cards.pop()!;
        uppermostCard.flipped = true;
        waste.cards.push(uppermostCard);
      } else {
        waste.cards.forEach((card) => (card.flipped = false));
        stock.cards = waste.cards.reverse();
        waste.cards = [];
      }

      const newPiles = [...prevGame.piles];
      newPiles[stockIndex] = stock;
      newPiles[wasteIndex] = waste;

      return { piles: newPiles };
    });
  };

  const foundations = game.piles.filter((pile) => pile.type === "foundation");
  const waste = game.piles.find((pile) => pile.type === "waste")!;
  const stock = game.piles.find((pile) => pile.type === "stock")!;
  const tableauPiles = game.piles.filter((pile) => pile.type === "tableauPile");

  return (
    <SolitaireContext.Provider
      value={{
        clickStock,
        foundations: cloneDeep(foundations),
        waste: cloneDeep(waste),
        stock: cloneDeep(stock),
        tableauPiles: cloneDeep(tableauPiles),
      }}
    >
      {children}
    </SolitaireContext.Provider>
  );
};

export { SolitaireContext };

export const useSolitaire = () => {
  const context = useContext(SolitaireContext);

  if (context === undefined) {
    throw new Error("useSolitaire must be used within a SolitaireProvider");
  }

  return context;
};
