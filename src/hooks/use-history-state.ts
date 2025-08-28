import { useReducer, useCallback } from "react";

interface HistoryState<T> {
    past: T[];
    present: T;
    future: T[];
}

type HistoryAction<T> =
    | { type: "SET"; payload: T }
    | { type: "UNDO" }
    | { type: "REDO" }
    | { type: "RESET"; payload: T }
    | { type: "CLEAR" };

function historyReducer<T>(
    state: HistoryState<T>,
    action: HistoryAction<T>,
): HistoryState<T> {
    switch (action.type) {
        case "SET":
            return {
                past: [...state.past, state.present],
                present: action.payload,
                future: [],
            };
        case "UNDO":
            if (state.past.length === 0) return state;
            return {
                past: state.past.slice(0, -1),
                present: state.past[state.past.length - 1],
                future: [state.present, ...state.future],
            };
        case "REDO":
            if (state.future.length === 0) return state;
            return {
                past: [...state.past, state.present],
                present: state.future[0],
                future: state.future.slice(1),
            };
        case "RESET":
            return {
                past: [],
                present: action.payload,
                future: [],
            };
        case "CLEAR":
            return {
                past: [],
                present: state.present,
                future: [],
            };
        default:
            return state;
    }
}

export function useHistoryState<T>(initialState: T) {
    const [state, dispatch] = useReducer(historyReducer<T>, {
        past: [],
        present: initialState,
        future: [],
    });

    const set = useCallback((newState: T) => {
        dispatch({ type: "SET", payload: newState });
    }, []);

    const undo = useCallback(() => {
        dispatch({ type: "UNDO" });
    }, []);

    const redo = useCallback(() => {
        dispatch({ type: "REDO" });
    }, []);

    const reset = useCallback((newState: T) => {
        dispatch({ type: "RESET", payload: newState });
    }, []);

    const clear = useCallback(() => {
        dispatch({ type: "CLEAR" });
    }, []);

    const canUndo = state.past.length > 0;
    const canRedo = state.future.length > 0;

    return {
        state: state.present,
        set,
        undo,
        redo,
        reset,
        clear,
        canUndo,
        canRedo,
    };
}
