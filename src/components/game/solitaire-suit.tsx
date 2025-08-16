import Clubs from "@/assets/icons/clubs";
import Diamonds from "@/assets/icons/diamonds";
import Hearts from "@/assets/icons/hearts";
import Spades from "@/assets/icons/spades";
import type { Suit } from "@/lib/types";

type SuitProps = {
  suit: Suit;
  className?: string;
};

function SolitaireSuit({ suit, className }: SuitProps) {
  switch (suit) {
    case "hearts":
      return <Hearts className={className} />;
    case "diamonds":
      return <Diamonds className={className} />;
    case "clubs":
      return <Clubs className={className} />;
    case "spades":
      return <Spades className={className} />;
    default:
      return null;
  }
}

export default SolitaireSuit;
