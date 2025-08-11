import { createContext, useContext, useEffect, useState } from "react";
import { generateGame, getCardColor, generateFinishedGame } from "@/lib/utils";
import type { Card, Game, Pile } from "@/lib/types";
import type { ReactNode } from "react";
import { cloneDeep } from "lodash";
import { Ranks } from "@/lib/constants";
import { useHistoryState } from "@/hooks/use-history-state";
import { useTimer } from "@/hooks/use-timer";

interface SolitaireProviderState {
  drawFromStock: () => void;
  handleCardMove: (card: Card, dest: Pile) => void;
  resetGame: () => void;
  foundations: Readonly<Pile[]>;
  waste: Readonly<Pile>;
  stock: Readonly<Pile>;
  tableauPiles: Readonly<Pile[]>;
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
  canAutoFinish: boolean;
  autoFinish: () => void;
  isFinished: boolean;
  elapsedTime: number;
}

const SolitaireContext = createContext<SolitaireProviderState | undefined>(
  undefined
);

export const SolitaireProvider = ({ children }: { children: ReactNode }) => {
  const { state, set, undo, redo, canUndo, canRedo, reset, clear } =
    useHistoryState<Game>(generateGame());
  const {
    elapsedTime,
    start: startTimer,
    stop: stopTimer,
    restart: restartTimer,
  } = useTimer();

  const [wasFirstMovePlayed, setWasFirstMovePlayed] = useState(false);
  const [canAutoFinish, setCanAutoFinish] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const isWin = Object.values(state.piles).every(
      (pile: Pile) =>
        (pile.type === "foundation" && pile.cards.length === 13) ||
        (pile.type !== "foundation" && pile.cards.length === 0)
    );

    if (isWin) {
      setIsFinished(true);
      stopTimer();
      clear();
    }

    const canAutoFinish =
      Object.values(state.piles).every(
        (pile: Pile) =>
          (pile.type === "waste" && pile.cards.length === 0) ||
          (pile.type === "stock" && pile.cards.length === 0) ||
          (pile.type === "tableauPile" &&
            pile.cards.every((card: Card) => card.flipped)) ||
          pile.type === "foundation"
      ) && !isFinished;

    setCanAutoFinish(canAutoFinish);
  }, [state]);

  // --- Actions ---

  const drawFromStock = () => {
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

    const newState = cloneDeep(state);
    newState.piles[newStock.id] = newStock;
    newState.piles[newWaste.id] = newWaste;

    set(newState);

    checkForFirstMove();
  };

  const handleCardMove = (card: Card, dest: Pile) => {
    switch (dest.type) {
      case "foundation":
        moveCardToFoundation(card, dest);
        break;
      case "tableauPile":
        moveCardToTableau(card, dest);
        break;
      default:
        break;
    }
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
    const src = findSrcPile(card);

    if (!src) return;

    const newSrc: Pile = cloneDeep(src);
    const newDest: Pile = cloneDeep(dest);

    const cardIndex = newSrc.cards.findIndex((c) => c.id === card.id);
    const cardsToMove = newSrc.cards.splice(cardIndex);
    newDest.cards.push(...cardsToMove);

    if (newSrc.cards.length > 0 && newSrc.type === "tableauPile") {
      newSrc.cards[newSrc.cards.length - 1].flipped = true;
    }

    const newState = cloneDeep(state);
    newState.piles[newSrc.id] = newSrc;
    newState.piles[newDest.id] = newDest;

    set(newState);

    checkForFirstMove();
  };

  const resetGame = () => {
    setWasFirstMovePlayed(false);
    setIsFinished(false);

    reset(generateGame());

    restartTimer();
  };

  const autoFinish = () => {
    if (!canAutoFinish) return;

    set(generateFinishedGame());
  };

  const checkForFirstMove = () => {
    if (wasFirstMovePlayed) return;

    startTimer();

    setWasFirstMovePlayed(true);
  };

  // --- Helper ---

  const findSrcPile = (card: Card): Pile | undefined => {
    return Object.values(state.piles).find((pile: Pile) =>
      pile.cards.some((c) => c.id === card.id)
    );
  };

  const foundations = Object.values(state.piles).filter(
    (pile: Pile) => pile.type === "foundation"
  );

  const waste = Object.values(state.piles).find(
    (pile: Pile) => pile.type === "waste"
  )!;

  const stock = Object.values(state.piles).find(
    (pile: Pile) => pile.type === "stock"
  )!;

  const tableauPiles = Object.values(state.piles).filter(
    (pile: Pile) => pile.type === "tableauPile"
  );

  return (
    <SolitaireContext.Provider
      value={{
        drawFromStock,
        handleCardMove,
        resetGame,
        foundations: Object.freeze(foundations),
        waste: Object.freeze(waste),
        stock: Object.freeze(stock),
        tableauPiles: Object.freeze(tableauPiles),
        canUndo,
        canRedo,
        undo,
        redo,
        canAutoFinish,
        autoFinish,
        isFinished,
        elapsedTime,
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
