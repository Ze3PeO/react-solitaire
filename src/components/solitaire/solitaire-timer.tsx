import { Badge } from "@/components/ui/badge";
import { Timer } from "lucide-react";
import { formatTime } from "@/lib/utils";
import { useSolitaire } from "@/hooks/use-solitaire";
import { useEffect, useState } from "react";

function SolitaireTimer() {
    const { startTime, elapsedTime } = useSolitaire();
    const [time, setTime] = useState<number>(0);

    useEffect(() => {
        if (startTime === null) {
            setTime(elapsedTime);

            return;
        }

        setTime(Date.now() - startTime);

        const timerInterval = setInterval(() => {
            setTime(Date.now() - startTime);
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [startTime, elapsedTime]);

    return (
        <Badge variant="secondary" className="flex items-center gap-2">
            <Timer />
            <span>{formatTime(time)}</span>
        </Badge>
    );
}

export default SolitaireTimer;
