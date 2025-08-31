import { SolitaireProviderContext } from "@/components/solitaire/soliaitre-context";
import { use } from "react";

export const useSolitaire = () => {
    const context = use(SolitaireProviderContext);

    if (context === undefined) {
        throw new Error("useSolitaire must be used within a SolitaireProvider");
    }

    return context;
};
