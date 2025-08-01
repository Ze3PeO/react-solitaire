import { Badge } from "@/components/ui/badge";
import { Gauge } from "lucide-react";

function SolitaireScore() {
  return (
    <Badge variant="secondary" className="flex items-center gap-2">
      <Gauge />
      <span>0</span>
    </Badge>
  );
}

export default SolitaireScore;
