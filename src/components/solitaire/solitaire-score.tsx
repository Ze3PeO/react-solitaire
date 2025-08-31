import { Badge } from "@/components/ui/badge";
import { Gauge } from "lucide-react";
import { useSolitaire } from "@/hooks/use-solitaire";

function SolitaireScore() {
    const { score } = useSolitaire();

    return (
        <Badge variant="secondary" className="flex items-center gap-2">
            <Gauge />
            <span>{String(score).padStart(3, "0")}</span>
        </Badge>
    );
}

export default SolitaireScore;
