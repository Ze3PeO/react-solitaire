import { useLocalStorage } from "@/hooks/use-local-storage";
import { LocalStorageKey } from "@/lib/constants";
import type { Stat } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatTime } from "@/lib/utils";

function SolitaireStats() {
  return <SolitaireStatsDialog />;
}

function SolitaireStatsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Stats</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Stats</DialogTitle>
          <DialogDescription>
            Here you can see your top 10 games. Either by time or score.
          </DialogDescription>
        </DialogHeader>
        <SolitaireStatsSelection />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function SolitaireStatsSelection() {
  return (
    <Tabs defaultValue="time">
      <TabsList>
        <TabsTrigger value="time">Time</TabsTrigger>
        <TabsTrigger value="score">Score</TabsTrigger>
      </TabsList>
      <TabsContent value="time">
        <SolitaireStatsTable sortBy="time" />
      </TabsContent>
      <TabsContent value="score">
        <SolitaireStatsTable sortBy="score" />
      </TabsContent>
    </Tabs>
  );
}

function SolitaireStatsTable({ sortBy }: { sortBy: "time" | "score" }) {
  const [stats, _] = useLocalStorage<Stat[]>(LocalStorageKey.STATS, []);

  return (
    <table className="w-full">
      <thead>
        <tr className="text-left border border-x-0 border-t-0">
          <th className="px-1">Date</th>
          <th className="px-1">Time</th>
          <th className="px-1">Score</th>
        </tr>
      </thead>
      {stats
        .sort((a: Stat, b: Stat) => {
          if (sortBy === "time") {
            return a.time - b.time;
          }
          return b.score - a.score;
        })
        .slice(0, 10)
        .map((stat: Stat) => (
          <tr key={stat.id}>
            <td className="px-1">{new Date(stat.date).toLocaleDateString()}</td>
            <td className="px-1">{formatTime(stat.time)}</td>
            <td className="px-1">{stat.score}</td>
          </tr>
        ))}
    </table>
  );
}

export default SolitaireStats;
