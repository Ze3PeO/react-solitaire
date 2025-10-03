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

// Serve static files from the 'dist' folder
app.use(express.static(path.join(__dirname, "dist")));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
