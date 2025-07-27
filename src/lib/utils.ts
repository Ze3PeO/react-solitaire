import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { type Suit, type Card, type Pile, type Game } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";
import { Suits } from "@/lib/constants";

// --- shadcn/ui ---

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Formatter ---

export function formatRank(rank: number): string {
  // ToDo Format rank label based on locale

  const rankLabels: { [key: number]: string } = {
    0: "A",
    1: "2",
    2: "3",
    3: "4",
    4: "5",
    5: "6",
    6: "7",
    7: "8",
    8: "9",
    9: "10",
    10: "J",
    11: "Q",
    12: "K",
  };

  return rankLabels[rank];
}

export function formatSuit(suit: Suit): string {
  const suitLabels: { [key in Suit]: string } = {
    clubs: "♣",
    diamonds: "♦",
    hearts: "♥",
    spades: "♠",
  };

  return suitLabels[suit];
}

export function formatTime(timestamp: number): string {
  const date = new Date(timestamp);

  return `${String(date.getMinutes()).padStart(2, "0")}:${String(
    date.getSeconds()
  ).padStart(2, "0")}`;
}

// --- Helpers ---

export function generateGame(): Game {
  const deck: Card[] = [];
  const tableauPiles = {} as Record<number, Pile>;
  const foundations = {} as Record<Suit, Pile>;

  // Generate deck of 52 cards (https://en.wikipedia.org/wiki/Standard_52-card_deck)
  Suits.forEach((suit: Suit) => {
    Array.from({ length: 13 }, (_, index) => index).forEach((rank) => {
      deck.push({
        suit,
        rank,
        flipped: false,
        id: uuidv4(),
      });
    });
  });

  // Shuffle the deck
  const shuffledDeck = shuffleArray(deck);

  // Create and fill the 7 tableauPiles with cards going from 1 card to 7 cards
  Array.from({ length: 7 }, (_, n) => n + 1).forEach((pileIndex) => {
    tableauPiles[pileIndex] = {
      cards: shuffledDeck
        .splice(0, pileIndex)
        .map((card: Card, cardIndex: number) => {
          card.flipped = cardIndex + 1 === pileIndex;
          return card;
        }),
      type: "tableauPile",
      index: pileIndex,
    };
  });

  // Create the foundation, stock and waste piles
  Suits.forEach((suit: Suit) => {
    foundations[suit] = {
      cards: [],
      suit,
      type: "foundation",
    };
  });

  const stock: Pile = {
    cards: shuffledDeck,
    type: "stock",
  };

  const waste: Pile = {
    cards: [],
    type: "waste",
  };

  // Assemble the game and return
  return {
    foundations,
    stock,
    waste,
    tableauPiles,
  };
}

export function shuffleArray<T>(array: T[]): T[] {
  // Fisher–Yates shuffle (https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}
