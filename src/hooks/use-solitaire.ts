import { SolitaireProviderContext } from "@/components/solitaire/soliaitre-context";
import { useContext } from "react";

export const useSolitaire = () => {
    const context = useContext(SolitaireProviderContext);

    if (context === undefined) {
        throw new Error("useSolitaire must be used within a SolitaireProvider");
    }

    return context;
};
