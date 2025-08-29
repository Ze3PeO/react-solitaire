import { Button } from "@/components/ui/button";
import { useSolitaire } from "@/hooks/use-solitaire";
import { CheckCheck, Redo, RotateCcw, Undo } from "lucide-react";
import { useTranslation } from "react-i18next";

function SolitaireControls() {
    const { t } = useTranslation();

    const {
        resetGame,
        canUndo,
        canRedo,
        undo,
        redo,
        canAutoFinish,
        autoFinish,
    } = useSolitaire();

    return (
        <div className="flex gap-2">
            <Button variant="secondary" size="icon" onClick={resetGame}>
                <RotateCcw />
                <span className="sr-only">{t("solitaire.controls.reset")}</span>
            </Button>
            <Button
                variant="secondary"
                size="icon"
                disabled={!canAutoFinish}
                onClick={autoFinish}
            >
                <CheckCheck />
                <span className="sr-only">
                    {t("solitaire.controls.autoFinish")}
                </span>
            </Button>
            <Button
                variant="secondary"
                size="icon"
                disabled={!canUndo}
                onClick={undo}
            >
                <Undo />
                <span className="sr-only">{t("solitaire.controls.undo")}</span>
            </Button>
            <Button
                variant="secondary"
                size="icon"
                disabled={!canRedo}
                onClick={redo}
            >
                <Redo />
                <span className="sr-only">{t("solitaire.controls.redo")}</span>
            </Button>
        </div>
    );
}

export default SolitaireControls;
