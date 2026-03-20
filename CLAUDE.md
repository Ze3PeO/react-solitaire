# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install           # Install dependencies
pnpm run dev           # Vite dev server with HMR
pnpm run build         # TypeScript type-check + Vite production build
pnpm run preview       # Preview production build
pnpm run lint          # ESLint
pnpm run format        # Prettier (4-space indent, semicolons, trailing commas)
```

No test framework is configured.

## Architecture

This is a Klondike Solitaire game built with React 19, TypeScript, Vite, and Tailwind CSS 4. It's a PWA with offline support via `vite-plugin-pwa`.

### State Management

Game state flows through nested React Context providers:

```
App.tsx
└── LanguageProvider (i18next with en/de)
    └── ThemeProvider (dark/light/system, persisted to localStorage)
        └── SolitaireProvider (all game state)
            └── SolitaireEventHandler (@dnd-kit DnD + win detection + confetti)
```

**SolitaireProvider** (`src/components/solitaire/solitaire-provider.tsx`) is the core — it owns:
- Game state via `useHistoryState` (undo/redo stack)
- Timer via `useTimer`
- Stats via `useLocalStorage`
- All game actions: `drawFromStock`, `handleCardMove`, `autoFinish`, `resetGame`, `restartGame`

State is accessed throughout components via the `useSolitaire()` hook.

### Timer Design

`useTimer` exposes `startTime: number | null` and `elapsedTime: number`. No interval runs in the hook — the provider re-renders only when the timer starts or stops. Visual components (e.g. `SolitaireTimer`) have their own `setInterval` and compute `Date.now() - startTime` locally. When the timer is paused, `stop()` snapshots the elapsed ms into `elapsedTime`; `start()` offsets the new `startTime` by `elapsedTime` so elapsed time is continuous.

### Game Model

Defined in `src/lib/types.ts` and `src/lib/constants.ts`:
- **Game**: `{ piles: Record<string, Pile>, score: number }`
- **Pile**: `{ cards: Card[], type: PileType, suit?: Suit, id: string }` — types are `stock`, `waste`, `foundation`, `tableauPile`
- **Card**: `{ suit: Suit, rank: number, flipped: boolean, id: string }` — ranks are 0-indexed (Ace=0, King=12)
- State mutations use `lodash.cloneDeep` for immutability

### Scoring

- +5: reveal tableau card, waste → tableau
- +10: waste/tableau → foundation
- -15: foundation → tableau
- -100: recycle stock (waste back to stock)
- Score floors at 0

### Persistence

Game state and elapsed time are saved to localStorage on `beforeunload` and restored on startup. Stats (wins) are persisted separately. Keys defined in `LocalStorageKey` constant.

### Key Directories

- `src/components/solitaire/` — game board, cards, piles, controls, scoring, timer, stats
- `src/components/game/` — menu, settings, tutorial, about dialogs
- `src/components/theme/` and `src/components/lang/` — theme and i18n providers/selectors
- `src/components/ui/` — shadcn/ui primitives (excluded from linting)
- `src/hooks/` — custom hooks (`use-history-state`, `use-timer`, `use-local-storage`, etc.)
- `src/lib/` — types, constants, utilities (`generateGame`, card helpers, `cn`)

### Conventions

- Path alias: `@/*` maps to `src/*`
- UI components use shadcn/ui with Radix primitives and class-variance-authority
- Drag-and-drop via `@dnd-kit/core`
- i18n translation files loaded via HTTP backend (in `public/locales/`)
- Note: context file has a typo in the name: `soliaitre-context.tsx`
