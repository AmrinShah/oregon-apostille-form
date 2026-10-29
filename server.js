const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, "public");

// Serve the supplied self-contained HTML preview and its embedded scripts/assets.
app.use(express.static(publicDir));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", app: "oregon-apostille-form" });
});

// Fallback for other paths (compatible with Express 5).
app.use((_req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Oregon Apostille form preview running at http://localhost:${PORT}`);
});
