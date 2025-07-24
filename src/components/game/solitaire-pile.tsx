import SolitaireCard from "./solitaire-card";
import type { Pile } from "@/lib/types";
import { formatSuit } from "@/lib/utils";

interface PileProps {
  cards: Pile["cards"];
  id: Pile["id"];
  type: Pile["type"];
  suit?: Pile["suit"];
  fanned?: boolean;
}

function SolitairePile({ cards, id, type, suit, fanned = false }: PileProps) {
  const renderCards = (): React.ReactNode => {
    return fanned ? renderFannedCards() : renderStackedCards();
  };

  const renderFannedCards = (cardIndex: number = 0): React.ReactNode => {
    if (cardIndex >= cards.length) {
      return null;
    }

    const card = cards[cardIndex];

    return (
      <SolitaireCard
        key={card.id}
        suit={card.suit}
        rank={card.rank}
        flipped={card.flipped}
        id={card.id}
      >
        {renderFannedCards(cardIndex + 1)}
      </SolitaireCard>
    );
  };

  const renderStackedCards = (): React.ReactNode => {
    const cardIndex = cards.length - 1;

    if (cardIndex < 0) {
      return null;
    }

    if (cardIndex === 0) {
      const card = cards[cardIndex];

      return (
        <SolitaireCard
          key={card.id}
          suit={card.suit}
          rank={card.rank}
          flipped={card.flipped}
          id={card.id}
        />
      );
    }

    return renderFannedCards(cardIndex - 1);
  };

  return (
    <div
      className="relative"
      style={
        {
          height: "var(--card-height)",
          width: "var(--card-width)",
          ...(fanned
            ? {}
            : { "--card-margin-top": "calc(-1 * var(--card-height))" }),
        } as React.CSSProperties
      }
    >
      <div className="absolute inset-0 bg-emerald-800 text-4xl rounded-sm border border-emerald-900 dark:border-emerald-700 dark:text-emerald-900 text-emerald-600 flex justify-center items-center">
        {suit && formatSuit(suit)}
      </div>
      {cards.length > 0 ? renderCards() : null}
    </div>
  );
}

export default SolitairePile;
