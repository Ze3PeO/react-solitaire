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
import LanguageSelector from "@/components/lang/language-selector";
import ThemeSelector from "@/components/theme/theme-selector";
import { useTranslation } from "react-i18next";
import { Settings } from "lucide-react";

function GameSettings() {
    return <GameSettingsDialog />;
}

function GameSettingsDialog() {
    const { t } = useTranslation();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Settings />
                    {t("game.settings.button")}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("game.settings.title")}</DialogTitle>
                    <DialogDescription>
                        {t("game.settings.description")}
                    </DialogDescription>
                </DialogHeader>
                <LanguageSelector />
                <ThemeSelector />
                <DialogFooter className="flex gap-2">
                    <DialogClose asChild>
                        <Button variant="default">{t("global.close")}</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default GameSettings;
