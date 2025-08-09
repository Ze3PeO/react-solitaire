import { ItemTypes } from "@/lib/constants";
import type { CSSProperties, ReactNode } from "react";
import type { Card } from "@/lib/types";
import { formatRank, formatSuit, isRedSuit } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";

interface CardProps {
  suit: Card["suit"];
  rank: Card["rank"];
  flipped: Card["flipped"];
  id: Card["id"];
  children?: ReactNode;
}

function SolitaireCard({ suit, rank, flipped, id, children }: CardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: {
      type: ItemTypes.CARD,
      card: { id, suit, rank, flipped },
    },
  });

  const textColorClass = isRedSuit(suit)
    ? "text-red-500 dark:text-red-400"
    : "text-card-foreground";

  const style: CSSProperties | undefined = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 10,
        position: "absolute",
      }
    : undefined;

  const scale = transform ? 1.125 : 1;

  // --- Back of card ---
  if (!flipped) {
    return (
      <div className="select-none">
        <div
          style={{
            width: "var(--card-width)",
            height: "var(--card-height)",
          }}
          className="relative border-blue-700 dark:border-indigo-700 bg-blue-600 dark:bg-indigo-900 text-card-foreground flex justify-between rounded-sm border shadow-sm px-1"
        ></div>
        {children && (
          <div style={{ marginTop: "var(--card-margin-top)" }}>{children}</div>
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
      className="cursor-move select-none"
    >
      <div
        style={{
          width: "var(--card-width)",
          height: "var(--card-height)",
          transform: `scale(${scale})`,
        }}
        className={`relative bg-card ${textColorClass} flex justify-between rounded-sm border shadow-sm px-1 transition-transform`}
      >
        {flipped && (
          <>
            <span>{formatRank(rank)}</span>
            <span>{formatSuit(suit)}</span>
          </>
        )}
      </div>
      {children && (
        <div style={{ marginTop: "var(--card-margin-top)" }}>{children}</div>
      )}
    </div>
  );
}

export default SolitaireCard;
