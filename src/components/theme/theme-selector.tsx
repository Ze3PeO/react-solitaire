import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "@/components/theme/theme-provider";
import { Themes } from "@/lib/constants";
import type { Theme } from "@/lib/types";
import { Paintbrush } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";

const ThemeSelector = () => {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();

  const handleModeChange = (mode: Theme) => {
    setTheme(mode);
  };

  return (
    <div className="flex gap-2">
      <Label htmlFor="mode">
        <Paintbrush />
        <span className="sr-only">Theme</span>
      </Label>
      <Select value={theme} onValueChange={handleModeChange}>
        <SelectTrigger className="w-full" id="mode">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {Themes.map((theme, key) => (
            <SelectItem value={theme} key={key}>
              {t(`theme.option.${theme}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ThemeSelector;
