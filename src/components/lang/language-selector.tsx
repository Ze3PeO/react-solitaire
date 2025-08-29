import { useTranslation } from "react-i18next";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Languages as LanguagesIcon } from "lucide-react";
import { Languages } from "@/lib/constants";
import { useLanguage } from "@/components/lang/language-context";
import type { Language } from "@/lib/types";

const LanguageSelector = () => {
    const { language, setLanguage } = useLanguage();
    const { t } = useTranslation();

    const handleLanguageChange = (language: string) => {
        setLanguage(language as Language);
    };

    return (
        <div className="flex gap-2">
            <Label htmlFor="language">
                <LanguagesIcon />
                <span className="sr-only">{t("lang.selector.button")}</span>
            </Label>
            <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-full" id="language">
                    <SelectValue placeholder={t("lang.selector.placeholder")} />
                </SelectTrigger>
                <SelectContent>
                    {Languages.map((language, key) => (
                        <SelectItem value={language} key={key}>
                            {t(`lang.selector.option.${language}`)}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default LanguageSelector;
