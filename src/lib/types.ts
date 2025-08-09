import { Suits } from "@/lib/constants";

export type Suit = (typeof Suits)[number];

export type Card = {
  suit: Suit;
  rank: number;
  flipped: boolean;
  id: string;
};

export type PileType = "tableauPile" | "waste" | "stock" | "foundation";

export type Pile = {
  cards: Card[];
  type: PileType;
  suit?: Suit;
  id: string;
};

export type Game = {
  piles: Record<string, Pile>;
};

export type CardSelection = {
  cardId?: string;
  pileId: string;
};

export type Stat = {
  time: number;
  score: number;
  date: number;
};

export type Theme = "dark" | "light" | "system";
