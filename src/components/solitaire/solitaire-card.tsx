import { ItemTypes } from "@/lib/constants";
import type { CSSProperties, ReactNode } from "react";
import type { Card } from "@/lib/types";
import { cn, formatRank, isRedSuit } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import Icon from "@/components/ui/icon";

type CardProps = {
    suit: Card["suit"];
    rank: Card["rank"];
    flipped: Card["flipped"];
    id: Card["id"];
    children?: ReactNode;
    covered?: boolean;
};

function SolitaireCard({ suit, rank, flipped, id, children, covered = false }: CardProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
        data: {
            type: ItemTypes.CARD,
            card: { id, suit, rank, flipped },
        },
    });

    const className = isRedSuit(suit)
        ? "text-red-500 dark:text-red-400"
        : "text-card-foreground";

    const style: CSSProperties | undefined = transform
        ? ({
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
              zIndex: 10,
              position: "absolute",
              "--card-scale": "1.125",
          } as CSSProperties)
        : undefined;

    // --- Back of card ---
    if (!flipped) {
        return (
            <div className="select-none">
                <div
                    style={{
                        width: "var(--card-width)",
                        height: "var(--card-height)",
                    }}
                    className="relative border-blue-700 dark:border-indigo-700 bg-blue-600 dark:bg-indigo-900 text-card-foreground flex justify-between rounded-sm border shadow-xl px-1"
                ></div>
                {children && (
                    <div style={{ marginTop: "var(--card-margin-top)" }}>
                        {children}
                    </div>
                )}
            </div>
        );
    }

    // --- Front of card ---
    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            tabIndex={covered ? -1 : attributes.tabIndex}
            className="cursor-move select-none"
        >
            <div
                style={{
                    width: "var(--card-width)",
                    height: "var(--card-height)",
                    transform: `scale(var(--card-scale))`,
                }}
                className={cn(
                    "relative bg-card flex justify-between rounded-sm border shadow-xl px-1 transition-transform",
                    className,
                )}
            >
                {flipped && (
                    <div className="flex items-center  justify-between w-full h-fit">
                        <span>{formatRank(rank)}</span>
                        <Icon name={suit} className="w-3 h-3" />
                    </div>
                )}
            </div>
            {children && (
                <div style={{ marginTop: "var(--card-margin-top)" }}>
                    {children}
                </div>
            )}
        </div>
    );
}

export default SolitaireCard;
