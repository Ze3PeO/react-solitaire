import { ItemTypes } from "@/lib/constants";
import { useDrag } from "react-dnd";
import type { ReactNode } from "react";
import type { Card } from "@/lib/types";
import { formatRank, formatSuit, isRedSuit } from "@/lib/utils";

interface CardProps {
  suit: Card["suit"];
  rank: Card["rank"];
  flipped: Card["flipped"];
  id: Card["id"];
  children?: ReactNode;
}

function SolitaireCard({ suit, rank, flipped, id, children }: CardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { id, suit, rank, flipped },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const textColorClass = isRedSuit(suit)
    ? "text-red-500"
    : "text-card-foreground";

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
      ref={drag}
      style={{
        opacity: isDragging ? 0 : 1,
      }}
      className="cursor-move select-none"
    >
      <div
        style={{
          width: "var(--card-width)",
          height: "var(--card-height)",
        }}
        className={`relative bg-card ${textColorClass} flex justify-between rounded-sm border shadow-sm px-1`}
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
