import { useEffect, useState } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { languageOptions } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Languages } from "lucide-react";

const LanguageSelector = () => {
  const [language, setLanguage] = useState(i18next.language);

  const { i18n } = useTranslation();

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
        <Languages />
        <span className="sr-only">Language</span>
      </Label>
      <Select value={language} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-full" id="language">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          {languageOptions.map(({ language, code }, key) => (
            <SelectItem value={code} key={key}>
              {language}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
