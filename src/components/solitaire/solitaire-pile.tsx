import { ItemTypes } from "@/lib/constants";
import SolitaireCard from "./solitaire-card";
import type { Pile } from "@/lib/types";
import { useDroppable } from "@dnd-kit/core";
import Icon from "@/components/ui/icon";
import { useTranslation } from "react-i18next";

type PileProps = {
    cards: Pile["cards"];
    type: Pile["type"];
    suit?: Pile["suit"];
    id: Pile["id"];
    fanned?: boolean;
    index?: number;
};

function SolitairePile({
    cards,
    type,
    suit,
    id,
    fanned = false,
    index = 0,
}: PileProps) {
    const { t } = useTranslation();

    const labels: Record<Pile["type"], string> = {
        tableauPile: "solitaire.pile.label.tableauPile",
        waste: "solitaire.pile.label.waste",
        stock: "solitaire.pile.label.stock",
        foundation: "solitaire.pile.label.foundation",
    };

    const { setNodeRef } = useDroppable({
        id,
        data: {
            accepts: [ItemTypes.CARD],
            pile: { type, id, suit, cards },
            label: t(labels[type], { index, suit: t(`solitaire.card.suit.${suit}`) }),
        },
        disabled: type === "stock" || type === "waste",
    });

    const useDroppableRefOnCards = type === "tableauPile" && cards.length > 0;

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
                covered={
                    card.flipped &&
                    type === "waste" &&
                    cardIndex < cards.length - 1
                }
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
                        : {
                              "--card-margin-top":
                                  "calc(-1 * var(--card-height))",
                          }),
                } as React.CSSProperties
            }
        >
            <div
                ref={!useDroppableRefOnCards ? setNodeRef : undefined}
                className="absolute inset-0 bg-emerald-800 rounded-sm border border-emerald-900 dark:border-emerald-700 dark:text-emerald-900 text-emerald-600 flex justify-center items-center"
            >
                {suit && <Icon name={suit} className="w-7 h-7" />}
            </div>
            <div ref={useDroppableRefOnCards ? setNodeRef : undefined}>
                {cards.length > 0 ? renderCards() : null}
            </div>
        </div>
    );
}

export default SolitairePile;
