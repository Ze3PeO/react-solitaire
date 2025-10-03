import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetTrigger,
    SheetFooter,
} from "@/components/ui/sheet";
import { Menu, AlertCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import SolitaireStats from "@/components/solitaire/solitaire-stats";
import GameSettings from "@/components/game/game-settings";
import { useTranslation, Trans } from "react-i18next";
import { Separator } from "@/components/ui/separator";
import GameTutorial from "@/components/game/game-tutorial";
import GameAbout from "@/components/game/game-about";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function GameMenu() {
    const { t } = useTranslation();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <Menu />
                    <span className="sr-only">{t("game.menu.button")}</span>
                    <AlertCircleIcon className="absolute -top-2 -right-2 text-destructive size-4" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>
                        {t("global.title")} - {t("game.menu.title")}
                    </SheetTitle>
                    <SheetDescription>
                        <span>{t("game.menu.description")}</span>
                    </SheetDescription>
                </SheetHeader>
                <Separator />
                <div className="flex flex-col gap-4 px-4">
                    <SolitaireStats />
                    <GameSettings />
                    <GameTutorial />
                    <GameAbout />
                    <Alert variant="destructive">
                        <AlertCircleIcon />
                        <AlertTitle>{t("migration.alert.title")}</AlertTitle>
                        <AlertDescription>
                            <p>
                                <Trans
                                    i18nKey="migration.alert.text"
                                    components={{
                                        a: (
                                            <a
                                                className="underline"
                                                href="https://simple-solitaire.de"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            />
                                        ),
                                    }}
                                />
                            </p>
                        </AlertDescription>
                    </Alert>
                </div>
                <SheetFooter>
                    <p className="text-center">
                        <Trans
                            i18nKey="game.menu.about.text"
                            components={{
                                a: (
                                    <a
                                        className="underline"
                                        href="https://github.com/Ze3PeO"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={t("game.menu.about.label")}
                                    />
                                ),
                            }}
                        />
                    </p>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

export default GameMenu;
