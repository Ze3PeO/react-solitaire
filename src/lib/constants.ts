import type { Theme } from "@/lib/types";

export const ItemTypes = {
  CARD: "card",
};

export const Suits = ["clubs", "diamonds", "hearts", "spades"] as const;

export const Ranks = {
  ACE: 0,
  TWO: 1,
  THREE: 2,
  FOUR: 3,
  FIVE: 4,
  SIX: 5,
  SEVEN: 6,
  EIGHT: 7,
  NINE: 8,
  TEN: 9,
  JACK: 10,
  QUEEN: 11,
  KING: 12,
} as const;

export const Events = {
  GAME_WIN: "solitaire-game-win",
  GAME_FIRST_MOVE: "solitaire-game-first-move",
  GAME_RESTART: "solitaire-game-restart",
} as const;

export const ThemeColor = {
  light: "#FFFFFF",
  dark: "#0A0A0A",
} as Record<Theme, string>;
