import { Badge } from "@/components/ui/badge";
import { Timer } from "lucide-react";
import { useTimer } from "@/hooks/use-timer";
import { formatTime } from "@/lib/utils";
import { Events } from "@/lib/constants";
import { useEffect } from "react";

function SolitaireTimer() {
  // ToDo: Move timer to provider and expose only the elapsedTime
  const { elapsedTime, start, stop, restart } = useTimer();

  useEffect(() => {
    window.addEventListener(Events.GAME_FIRST_MOVE, start);
    window.addEventListener(Events.GAME_RESTART, restart);
    window.addEventListener(Events.GAME_WIN, stop);
  }, [start, restart, stop]);

  return (
    <Badge variant="secondary" className="flex items-center gap-2">
      <Timer />
      <span>{formatTime(elapsedTime)}</span>
    </Badge>
  );
}

export default SolitaireTimer;
