import { useEffect, useState } from "react";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useSolitaire } from "@/hooks/use-solitaire";
import Confetti from "react-confetti";
import { useWindowSize } from "@/hooks/use-window-size";
import { useTranslation } from "react-i18next";
import type { Active, Over } from "@dnd-kit/core";
import type { Card, Pile } from "@/lib/types";

function SolitaireEventHandler({ children }: { children: React.ReactNode }) {
    const { t } = useTranslation();
    const { handleCardMove, isFinished } = useSolitaire();
    const { width, height } = useWindowSize();
    const [showConfetti, setShowConfetti] = useState(false);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        const accepts = over.data.current?.accepts as string[];

        if (!accepts.includes(active.data.current?.type as string)) return;

        const pile = over.data.current?.pile as Pile;
        const card = active.data.current?.card as Card;

        handleCardMove(card, pile);
    };

    const announcements = {
        onDragStart({ active }: { active: Active }) {
            return t("solitaire.eventHandler.dnd.announcements.onDragStart", {
                cardLabel: active.data.current?.label,
            });
        },
        onDragOver({ active, over }: { active: Active; over: Over }) {
            if (over) {
                return t(
                    "solitaire.eventHandler.dnd.announcements.onDragOver.withPile",
                    {
                        cardLabel: active.data.current?.label ?? "",
                        pileLabel: over.data.current?.label ?? "",
                    },
                );
            }

            return t(
                "solitaire.eventHandler.dnd.announcements.onDragOver.withoutPile",
                {
                    cardLabel: active.data.current?.label ?? "",
                },
            );
        },
        onDragEnd({ active, over }: { active: Active; over: Over }) {
            if (over) {
                return t(
                    "solitaire.eventHandler.dnd.announcements.onDragEnd.withPile",
                    {
                        cardLabel: active.data.current?.label ?? "",
                        pileLabel: over.data.current?.label ?? "",
                    },
                );
            }

            return t(
                "solitaire.eventHandler.dnd.announcements.onDragEnd.withoutPile",
                {
                    cardLabel: active.data.current?.label ?? "",
                },
            );
        },
        onDragCancel({ active }: { active: Active }) {
            return t("solitaire.eventHandler.dnd.announcements.onDragCancel", {
                cardLabel: active.data.current?.label ?? "",
            });
        },
    };

    useEffect(() => {
        if (!isFinished) return;

        setShowConfetti(true);
    }, [isFinished]);

    return (
        <DndContext
            onDragEnd={handleDragEnd}
            accessibility={{
                announcements,
                screenReaderInstructions: {
                    draggable: t("solitaire.eventHandler.dnd.instructions"),
                },
            }}
        >
            {children}
            {showConfetti && (
                <Confetti
                    width={width}
                    height={height}
                    recycle={false}
                    onConfettiComplete={() => { setShowConfetti(false); }}
                />
            )}
        </DndContext>
    );
}

export default SolitaireEventHandler;
