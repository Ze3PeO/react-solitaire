import { Badge } from "@/components/ui/badge";
import { Timer } from "lucide-react";

function SolitaireTimer() {
  return (
    <Badge variant="secondary" className="flex items-center gap-2">
      <Timer />
      <span>00:00</span>
    </Badge>
  );
}

export default SolitaireTimer;
