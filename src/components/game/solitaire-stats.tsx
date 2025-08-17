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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function SolitaireStats() {
  return <SolitaireStatsDialog />;
}

function SolitaireStatsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Statistics</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Stats</DialogTitle>
          <DialogDescription>
            Here you can see your top 10 games. Either by time taken to complete
            the game or the score.
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
      <TabsList className="w-full">
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stats
          .sort((a: Stat, b: Stat) => {
            if (sortBy === "time") {
              return a.time - b.time;
            }
            return b.score - a.score;
          })
          .slice(0, 10)
          .map((stat: Stat) => (
            <TableRow key={stat.id}>
              <TableCell>{new Date(stat.date).toLocaleDateString()}</TableCell>
              <TableCell>{formatTime(stat.time)}</TableCell>
              <TableCell>{stat.score}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

export default SolitaireStats;
