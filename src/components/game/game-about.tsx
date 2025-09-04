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
import { Trans, useTranslation } from "react-i18next";
import { Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";

function GameAbout() {
    return <GameAboutDialog />;
}

function GameAboutDialog() {
    const { t } = useTranslation();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Info />
                    {t("game.about.button")}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("game.about.title")}</DialogTitle>
                    <DialogDescription>
                        {t("game.about.description")}
                    </DialogDescription>
                </DialogHeader>
                <article className="max-h-fit overflow-y-auto">
                    <h3 className="italic">
                        {t("game.about.content.why.title")}
                    </h3>
                    <br />
                    <p>
                        <Trans
                            i18nKey="game.about.content.why.text"
                            components={{
                                br: <br />,
                            }}
                        />
                    </p>
                    <br />
                    <Separator />
                    <br />
                    <h3 className="italic">
                        {t("game.about.content.where.title")}
                    </h3>
                    <br />
                    <p>
                        <Trans
                            i18nKey="game.about.content.where.text"
                            components={{
                                a: (
                                    <a
                                        className="underline"
                                        href="https://github.com/Ze3PeO/react-solitaire"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={t(
                                            "game.about.content.where.githubLabel",
                                        )}
                                    />
                                ),
                            }}
                        />
                    </p>
                </article>
                <DialogFooter className="flex gap-2">
                    <DialogClose asChild>
                        <Button variant="default">{t("global.close")}</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default GameAbout;
