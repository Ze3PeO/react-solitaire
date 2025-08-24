import { Badge } from "@/components/ui/badge";
import { Gauge } from "lucide-react";
import { useSolitaire } from "@/components/solitaire/solitaire-provider";

function SolitaireScore() {
  const { score } = useSolitaire();

  return (
    <Badge variant="secondary" className="flex items-center gap-2">
      <Gauge />
      <span>{score}</span>
    </Badge>
  );
}

export default SolitaireScore;
