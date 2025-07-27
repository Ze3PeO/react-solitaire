import { createContext, useContext, useState } from "react";
import { generateGame } from "@/lib/utils";
import type { Card, Game, Pile, Suit } from "@/lib/types";
import type { ReactNode } from "react";
import { cloneDeep } from "lodash";

interface SolitaireProviderState {
  clickStock: () => void;
  moveCardToFoundation: (card: Card, pile: Pile) => void;
  moveCardToTableau: (card: Card, pile: Pile) => void;
  foundations: Record<Suit, Pile>;
  waste: Pile;
  stock: Pile;
  tableauPiles: Record<number, Pile>;
}

const SolitaireContext = createContext<SolitaireProviderState | undefined>(
  undefined
);

export const SolitaireProvider = ({ children }: { children: ReactNode }) => {
  const [game, setGame] = useState<Game>(generateGame());

  const clickStock = () => {
    setGame((prevGame) => {
      const stock: Pile = cloneDeep(prevGame.stock);
      const waste: Pile = cloneDeep(prevGame.waste);

      if (stock.cards.length > 0) {
        const uppermostCard = stock.cards.pop()!;
        uppermostCard.flipped = true;
        waste.cards.push(uppermostCard);
      } else {
        waste.cards.forEach((card) => (card.flipped = false));
        stock.cards = waste.cards.reverse();
        waste.cards = [];
      }

      return {
        ...prevGame,
        stock,
        waste,
      };
    });
  };

  const moveCardToFoundation = (card: Card, pile: Pile) => {
    return;
  };

  const moveCardToTableau = (card: Card, pile: Pile) => {
    return;
  };

  return (
    <SolitaireContext.Provider
      value={{
        clickStock,
        moveCardToFoundation,
        moveCardToTableau,
        foundations: cloneDeep(game.foundations),
        waste: cloneDeep(game.waste),
        stock: cloneDeep(game.stock),
        tableauPiles: cloneDeep(game.tableauPiles),
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
