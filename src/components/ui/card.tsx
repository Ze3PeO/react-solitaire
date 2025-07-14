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
      <div className="w-16 aspect-[5/7] bg-card text-card-foreground flex flex-col gap-6 rounded-sm border py-6 shadow-sm">
        <span>{text}</span>
      </div>
      {children}
    </div>
  );
}

export default Card;
