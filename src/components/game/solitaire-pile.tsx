import SolitaireCard from "./solitaire-card";
import type { Card, Pile, Suit } from "@/lib/types";

function SolitairePile({
  cards,
  suit,
  fanned = false,
  id,
  type,
}: {
  cards: Card[];
  suit?: Suit;
  fanned?: boolean;
  id: Pile["id"];
  type: Pile["type"];
}) {
  const renderCards = (): React.ReactNode => {
    return fanned ? renderFannedCards() : renderStackedCards();
  };

  const renderFannedCards = (cardIndex: number = 0): React.ReactNode => {
    if (cardIndex >= cards.length) {
      return null;
    }

    const card = cards[cardIndex];
    const cardText = `${card.rank}${card.suit}`; // You might want to format this better

    return (
      <SolitaireCard key={card.id} text={cardText}>
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
      const cardText = `${card.rank}${card.suit}`; // You might want to format this better

      return <SolitaireCard key={card.id} text={cardText} />;
    }

    return renderFannedCards(cardIndex - 1);
  };

  return (
    <div
      className="bg-emerald-800 rounded-sm relative"
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
      <div className="absolute inset-0 flex justify-center items-center">
        {suit}
      </div>
      {cards.length > 0 ? renderCards() : null}
    </div>
  );
}

export default SolitairePile;
