import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "@/components/theme/theme-provider";
import type { Theme } from "@/lib/types";
import { Paintbrush } from "lucide-react";
import { Label } from "@/components/ui/label";

const ModeSelector = () => {
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
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ModeSelector;
