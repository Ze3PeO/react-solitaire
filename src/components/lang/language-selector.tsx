import { useEffect, useState } from "react";
import i18next from "i18next";
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

const LanguageSelector = () => {
  const [language, setLanguage] = useState(i18next.language);

  const { i18n, t } = useTranslation();

  const handleLanguageChange = (language: string) => {
    setLanguage(language);
    i18next.changeLanguage(language);
  };

  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n, i18n.language]);

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
