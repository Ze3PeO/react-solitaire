import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import IconSprite from "@/components/ui/icon-sprite";
import "./i18n.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <IconSprite />
  </StrictMode>
);
