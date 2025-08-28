import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { type Suit, type Card, type Pile, type Game } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";
import { Ranks, Suits } from "@/lib/constants";

// --- shadcn/ui ---

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// --- Formatter ---

export function formatRank(rank: number): string {
    const rankLabels: { [key: number]: string } = {
        [Ranks.ACE]: "A",
        [Ranks.TWO]: "2",
        [Ranks.THREE]: "3",
        [Ranks.FOUR]: "4",
        [Ranks.FIVE]: "5",
        [Ranks.SIX]: "6",
        [Ranks.SEVEN]: "7",
        [Ranks.EIGHT]: "8",
        [Ranks.NINE]: "9",
        [Ranks.TEN]: "10",
        [Ranks.JACK]: "J",
        [Ranks.QUEEN]: "Q",
        [Ranks.KING]: "K",
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
        date.getSeconds(),
    ).padStart(2, "0")}`;
}

// --- Helpers ---

export function generateGame(): Game {
    const deck: Card[] = [];
    const piles: Record<string, Pile> = {};

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
        const id = uuidv4();

        piles[id] = {
            cards: shuffledDeck
                .splice(0, pileIndex)
                .map((card: Card, cardIndex: number) => {
                    card.flipped = cardIndex + 1 === pileIndex;
                    return card;
                }),
            type: "tableauPile",
            id,
        };
    });

    // Create the foundation, stock and waste piles
    Suits.forEach((suit: Suit) => {
        const id = uuidv4();

        piles[id] = {
            cards: [],
            suit,
            type: "foundation",
            id,
        };
    });

    const stock: Pile = {
        cards: shuffledDeck,
        type: "stock",
        id: uuidv4(),
    };

    piles[stock.id] = stock;

    const waste: Pile = {
        cards: [],
        type: "waste",
        id: uuidv4(),
    };

    piles[waste.id] = waste;

    // Assemble the game and return
    return {
        piles,
        score: 0,
    };
}

export function generateFinishedGame(): Game {
    const piles: Record<string, Pile> = {};

    // Create the 7 tableauPiles
    Array.from({ length: 7 }, (_, index) => index).forEach(() => {
        const id = uuidv4();

        piles[id] = {
            cards: [],
            type: "tableauPile",
            id,
        };
    });

    // Create the foundation, stock and waste piles
    Suits.forEach((suit: Suit) => {
        const id = uuidv4();

        piles[id] = {
            cards: Array.from({ length: 13 }, (_, index) => index).map(
                (rank) => ({
                    suit,
                    rank,
                    flipped: true,
                    id: uuidv4(),
                }),
            ),
            suit,
            type: "foundation",
            id,
        };
    });

    const stock: Pile = {
        cards: [],
        type: "stock",
        id: uuidv4(),
    };

    piles[stock.id] = stock;

    const waste: Pile = {
        cards: [],
        type: "waste",
        id: uuidv4(),
    };

    piles[waste.id] = waste;

    // Assemble the game and return
    return {
        piles,
        score: 0,
    };
}

export function generateAlmostFinishedGame(): Game {
    const game = generateFinishedGame();

    const foundation = Object.values(game.piles).find(
        (pile) => pile.type === "foundation",
    );

    const tableauPile = Object.values(game.piles).find(
        (pile) => pile.type === "tableauPile",
    );

    if (foundation?.cards.length && tableauPile) {
        const card = foundation.cards.pop()!;
        tableauPile.cards.push(card);
    }

    return game;
}

export function isRedSuit(suit: Suit): boolean {
    return suit === "hearts" || suit === "diamonds";
}

export function getCardColor(card: Card) {
    return isRedSuit(card.suit) ? "red" : "black";
}

export function shuffleArray<T>(array: T[]): T[] {
    // Fisher–Yates shuffle (https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}
