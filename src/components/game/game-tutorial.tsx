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
import { Book } from "lucide-react";
import { Separator } from "@/components/ui/separator";

function GameTutorial() {
    return <GameTutorialDialog />;
}

function GameTutorialDialog() {
    const { t } = useTranslation();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Book />
                    {t("game.tutorial.button")}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("game.tutorial.title")}</DialogTitle>
                    <DialogDescription>
                        {t("game.tutorial.description")}
                    </DialogDescription>
                </DialogHeader>
                <article className="max-h-fit overflow-y-auto">
                    <h3 className="italic">
                        {t("game.tutorial.content.introduction.title")}
                    </h3>
                    <br />
                    <p>{t("game.tutorial.content.introduction.text")}</p>
                    <br />
                    <Separator />
                    <br />
                    <h3 className="italic">
                        {t("game.tutorial.content.rules.title")}
                    </h3>
                    <br />
                    <ol className="list-decimal list-inside flex flex-col gap-2">
                        <Trans
                            i18nKey="game.tutorial.content.rules.text"
                            components={{
                                li: <li />,
                                span: <span className="font-bold" />,
                            }}
                        />
                    </ol>
                    <br />
                    <Separator />
                    <br />
                    <h3 className="italic">
                        {t("game.tutorial.content.controls.title")}
                    </h3>
                    <br />
                    <p>{t("game.tutorial.content.controls.description")}</p>
                    <br />
                    <ul className="list-disc list-inside flex flex-col gap-2">
                        <li>
                            <Trans
                                i18nKey="game.tutorial.content.controls.types.mouse"
                                components={{
                                    span: <span className="font-bold" />,
                                }}
                            />
                        </li>
                        <li>
                            <Trans
                                i18nKey="game.tutorial.content.controls.types.keyboard"
                                components={{
                                    span: <span className="font-bold" />,
                                }}
                            />
                        </li>
                        <li>
                            <Trans
                                i18nKey="game.tutorial.content.controls.types.buttons.title"
                                components={{
                                    span: <span className="font-bold" />,
                                }}
                            />
                            <ul className="list-disc list-inside ml-4 flex flex-col gap-2">
                                <Trans
                                    i18nKey="game.tutorial.content.controls.types.buttons.description"
                                    components={{
                                        li: <li />,
                                        span: <span className="font-bold" />,
                                    }}
                                />
                            </ul>
                        </li>
                    </ul>
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

export default GameTutorial;
