import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        VitePWA({
            registerType: "autoUpdate",
            manifest: {
                name: "React Solitaire",
                short_name: "Solitaire",
                description: "Soliatire implementation made with React",
                theme_color: "#FFFFFF",
                display: "standalone",
                icons: [
                    {
                        src: "/favicon.ico",
                        type: "image/x-icon",
                        sizes: "16x16 32x32",
                    },
                    {
                        src: "/icons/icon-192.png",
                        type: "image/png",
                        sizes: "192x192",
                    },
                    {
                        src: "/icons/icon-512.png",
                        type: "image/png",
                        sizes: "512x512",
                    },
                    {
                        src: "/icons/icon-192-maskable.png",
                        type: "image/png",
                        sizes: "192x192",
                        purpose: "maskable",
                    },
                    {
                        src: "/icons/icon-512-maskable.png",
                        type: "image/png",
                        sizes: "512x512",
                        purpose: "maskable",
                    },
                ],
            },
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
