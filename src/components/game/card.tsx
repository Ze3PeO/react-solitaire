import { ItemTypes } from "@/lib/constants";
import { useDrag } from "react-dnd";
import type { ReactNode } from "react";

interface CardProps {
  children?: ReactNode;
  text?: string;
}

function Card({ children, text = "Karte" }: CardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0 : 1,
      }}
      className="cursor-move select-none"
    >
      <div className="relative w-16 aspect-[5/7] bg-card text-card-foreground flex flex-col justify-start gap-6 rounded-sm border shadow-sm">
        <span>{text}</span>
      </div>
      <div style={{ marginTop: "var(--card-margin-top)" }}>{children}</div>
    </div>
  );
}

export default Card;
