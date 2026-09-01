import { fileURLToPath } from "node:url";
import path from "node:path";
import express from "express";
import app from "./app.js";
import { config } from "./config.js";
const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

app.use(express.static(path.join(rootDirectory, "dist")));
app.get("/{*path}", (_request, response) => response.sendFile(path.join(rootDirectory, "dist", "index.html")));

app.listen(config.port, () => {
  console.log(`Horcabas backend running on http://127.0.0.1:${config.port} in ${config.mode} calendar mode`);
});
