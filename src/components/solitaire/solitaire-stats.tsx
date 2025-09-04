import { useLocalStorage } from "@/hooks/use-local-storage";
import { useCsvExport } from "@/hooks/use-csv-export";
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
import { ChartLine, Frown } from "lucide-react";
import { useTranslation } from "react-i18next";

function SolitaireStats() {
    return <SolitaireStatsDialog />;
}

function SolitaireStatsDialog() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [stats, _] = useLocalStorage<Stat[]>(LocalStorageKey.STATS, []);
    const { exportData } = useCsvExport();
    const { t } = useTranslation();

    const handleExportCSV = () => {
        const data = stats
            .sort((a: Stat, b: Stat) => b.date - a.date)
            .map((stat: Stat) => ({
                id: stat.id,
                date: new Date(stat.date).toLocaleDateString(),
                time: stat.time,
                score: stat.score,
            }));

        exportData(data, {
            filename: `solitaire-stats-${new Date().toISOString().split("T")[0]}.csv`,
            headers: ["date", "time", "score"],
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <ChartLine />
                    {t("solitaire.stats.dialog.button")}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {t("solitaire.stats.dialog.title")}
                    </DialogTitle>
                    <DialogDescription>
                        {t("solitaire.stats.dialog.description")}
                    </DialogDescription>
                </DialogHeader>
                {stats.length === 0 ? (
                    <SolitaireStatsEmpty />
                ) : (
                    <SolitaireStatsTabs stats={stats} />
                )}
                <DialogFooter className="flex gap-2 flex-col">
                    <Button
                        variant="secondary"
                        onClick={handleExportCSV}
                        disabled={stats.length === 0}
                    >
                        {t("solitaire.stats.dialog.export")}
                    </Button>
                    <DialogClose asChild>
                        <Button variant="default">{t("global.close")}</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function SolitaireStatsEmpty() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center gap-2 px-2 py-8 text-muted-foreground overflow-y-auto">
            <Frown />
            <span>{t("solitaire.stats.empty")}</span>
        </div>
    );
}

function SolitaireStatsTabs({ stats }: { stats: Stat[] }) {
    const { t } = useTranslation();

    return (
        <Tabs defaultValue="time" className="overflow-y-auto">
            <TabsList className="w-full">
                <TabsTrigger value="time">
                    {t("solitaire.stats.tabs.time")}
                </TabsTrigger>
                <TabsTrigger value="score">
                    {t("solitaire.stats.tabs.score")}
                </TabsTrigger>
            </TabsList>
            <TabsContent value="time">
                <SolitaireStatsTable stats={stats} sortBy="time" />
            </TabsContent>
            <TabsContent value="score">
                <SolitaireStatsTable stats={stats} sortBy="score" />
            </TabsContent>
        </Tabs>
    );
}

function SolitaireStatsTable({
    stats,
    sortBy,
}: {
    stats: Stat[];
    sortBy: "time" | "score";
}) {
    const { t } = useTranslation();

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>{t("solitaire.stats.table.date")}</TableHead>
                    <TableHead>{t("solitaire.stats.table.time")}</TableHead>
                    <TableHead>{t("solitaire.stats.table.score")}</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {stats
                    .sort((a: Stat, b: Stat) => {
                        return sortBy === "time"
                            ? a.time - b.time
                            : b.score - a.score;
                    })
                    .slice(0, 10)
                    .map((stat: Stat, index: number) => (
                        <TableRow key={stat.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                                {new Date(stat.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{formatTime(stat.time)}</TableCell>
                            <TableCell>{stat.score}</TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    );
}

export default SolitaireStats;
