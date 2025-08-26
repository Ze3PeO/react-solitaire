import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import IconSprite from "@/components/ui/icon-sprite";
import "./lib/i18n.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <IconSprite />
  </StrictMode>
);
