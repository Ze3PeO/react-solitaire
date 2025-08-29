import { Badge } from "@/components/ui/badge";
import { Timer } from "lucide-react";
import { formatTime } from "@/lib/utils";
import { useSolitaire } from "@/hooks/use-solitaire";

function SolitaireTimer() {
    const { elapsedTime } = useSolitaire();

    return (
        <Badge variant="secondary" className="flex items-center gap-2">
            <Timer />
            <span>{formatTime(elapsedTime)}</span>
        </Badge>
    );
}

export default SolitaireTimer;
