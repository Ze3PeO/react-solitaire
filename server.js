// server.js
import express from "express";
import * as path from "node:path";
import { fileURLToPath } from "url";
import compression from "compression";

const app = express();
const PORT = 4173;

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Compression for responses
app.use(compression());

// Security headers
app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader(
        "Strict-Transport-Security",
        "max-age=63072000; includeSubDomains",
    );
    res.setHeader(
        "Content-Security-Policy",
        [
            "default-src 'self'",
            "script-src 'self'",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: blob:",
            "font-src 'self'",
            "connect-src 'self'",
            "object-src 'none'",
            "base-uri 'self'",
            "frame-ancestors 'none'",
            "form-action 'self'",
            "manifest-src 'self'",
            "worker-src 'self'",
            "upgrade-insecure-requests",
        ].join("; "),
    );

    next();
});

// Serve static files from the 'dist' folder
app.use(express.static(path.join(__dirname, "dist")));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
