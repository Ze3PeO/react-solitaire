import { Languages, Suits, Themes } from "@/lib/constants";

// --- Solitaire ---

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
    score: number;
};

export type CardSelection = {
    cardId?: string;
    pileId: string;
};

export type Stat = {
    id: string;
    time: number;
    score: number;
    date: number;
};

// --- Settings ---

export type Theme = (typeof Themes)[number];

export type Language = (typeof Languages)[number];
