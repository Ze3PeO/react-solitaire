import { createContext } from "react";
import type { Card, Pile } from "@/lib/types";

interface SolitaireProviderState {
    drawFromStock: () => void;
    handleCardMove: (card: Card, dest: Pile) => void;
    resetGame: () => void;
    restartGame: () => void;
    foundations: readonly Pile[];
    waste: Readonly<Pile>;
    stock: Readonly<Pile>;
    tableauPiles: readonly Pile[];
    canUndo: boolean;
    canRedo: boolean;
    undo: () => void;
    redo: () => void;
    canAutoFinish: boolean;
    autoFinish: () => void;
    isFinished: boolean;
    elapsedTime: number;
    score: number;
}

export const SolitaireProviderContext = createContext<
    SolitaireProviderState | undefined
>(undefined);
