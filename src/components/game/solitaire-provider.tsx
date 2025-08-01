import { createContext, useContext, useState } from "react";
import { generateGame, getCardColor } from "@/lib/utils";
import type { Card, Game, Pile } from "@/lib/types";
import type { ReactNode } from "react";
import { cloneDeep } from "lodash";
import { Ranks } from "@/lib/constants";

interface SolitaireProviderState {
  drawFromStock: () => void;
  moveCardToFoundation: (card: Card, dest: Pile) => void;
  moveCardToTableau: (card: Card, dest: Pile) => void;
  restartGame: () => void;
  foundations: Readonly<Pile[]>;
  waste: Readonly<Pile>;
  stock: Readonly<Pile>;
  tableauPiles: Readonly<Pile[]>;
}

const SolitaireContext = createContext<SolitaireProviderState | undefined>(
  undefined
);

export const SolitaireProvider = ({ children }: { children: ReactNode }) => {
  const [game, setGame] = useState<Game>(generateGame());

  // --- Actions ---

  const drawFromStock = () => {
    setGame((prevGame) => {
      const newStock: Pile = cloneDeep(stock);
      const newWaste: Pile = cloneDeep(waste);

      if (newStock.cards.length > 0) {
        const uppermostCard = newStock.cards.pop()!;
        uppermostCard.flipped = true;
        newWaste.cards.push(uppermostCard);
      } else {
        newWaste.cards.forEach((card) => (card.flipped = false));
        newStock.cards = newWaste.cards.reverse();
        newWaste.cards = [];
      }

      const newGame = cloneDeep(prevGame);
      newGame.piles[newStock.id] = newStock;
      newGame.piles[newWaste.id] = newWaste;

      return newGame;
    });
  };

  const moveCardToFoundation = (card: Card, dest: Pile) => {
    if (!canBeMovedToFoundation(card, dest)) return;

    moveCard(card, dest);
  };

  const canBeMovedToFoundation = (card: Card, dest: Pile): boolean => {
    if (dest.type !== "foundation") return false;
    if (dest.suit !== undefined && card.suit !== dest.suit) return false;
    if (dest.suit === undefined) return false;
    if (dest.cards.length === 0 && card.rank !== Ranks.ACE) return false;

    if (
      dest.cards.length > 0 &&
      dest.cards[dest.cards.length - 1].rank !== card.rank - 1
    ) {
      return false;
    }

    return true;
  };

  const moveCardToTableau = (card: Card, dest: Pile) => {
    if (!canBeMovedToTableau(card, dest)) return;

    moveCard(card, dest);
  };

  const canBeMovedToTableau = (card: Card, dest: Pile): boolean => {
    if (dest.type !== "tableauPile") return false;
    if (dest.cards.length === 0 && card.rank !== Ranks.KING) return false;

    if (
      dest.cards.length > 0 &&
      dest.cards[dest.cards.length - 1].rank !== card.rank + 1
    ) {
      return false;
    }

    if (
      dest.cards.length > 0 &&
      getCardColor(dest.cards[dest.cards.length - 1]) === getCardColor(card)
    ) {
      return false;
    }

    return true;
  };

  const moveCard = (card: Card, dest: Pile) => {
    setGame((prevGame) => {
      const src = findSrcPile(card);

      if (!src) return prevGame;

      const newSrc: Pile = cloneDeep(src);
      const newDest: Pile = cloneDeep(dest);

      const cardIndex = newSrc.cards.findIndex((c) => c.id === card.id);
      const cardsToMove = newSrc.cards.splice(cardIndex);
      newDest.cards.push(...cardsToMove);

      if (newSrc.cards.length > 0 && newSrc.type === "tableauPile") {
        newSrc.cards[newSrc.cards.length - 1].flipped = true;
      }

      const newGame = cloneDeep(prevGame);
      newGame.piles[newSrc.id] = newSrc;
      newGame.piles[newDest.id] = newDest;

      return newGame;
    });
  };

  const restartGame = () => {
    setGame(generateGame());
  };

  // --- Helper ---

  const findSrcPile = (card: Card): Pile | undefined => {
    return Object.values(game.piles).find((pile: Pile) =>
      pile.cards.some((c) => c.id === card.id)
    );
  };

  const foundations = Object.values(game.piles).filter(
    (pile: Pile) => pile.type === "foundation"
  );

  const waste = Object.values(game.piles).find(
    (pile: Pile) => pile.type === "waste"
  )!;

  const stock = Object.values(game.piles).find(
    (pile: Pile) => pile.type === "stock"
  )!;

  const tableauPiles = Object.values(game.piles).filter(
    (pile: Pile) => pile.type === "tableauPile"
  );

  return (
    <SolitaireContext.Provider
      value={{
        drawFromStock,
        moveCardToFoundation,
        moveCardToTableau,
        restartGame,
        foundations: Object.freeze(foundations),
        waste: Object.freeze(waste),
        stock: Object.freeze(stock),
        tableauPiles: Object.freeze(tableauPiles),
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
