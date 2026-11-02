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

// Main-site pages linked from the form's header and footer. They are not part of
// this project, so locally they get a placeholder instead of the live website.
const SITE_PAGES = {
  "/about-us": "About Us",
  "/oregon-apostille-cities": "We cover",
  "/hague-convention-countries": "Hague Countries",
  "/blog": "Blog",
  "/terms-and-conditions": "Terms and conditions",
};

app.use((req, res, next) => {
  const title = SITE_PAGES[req.path.replace(/\/+$/, "")];
  if (!title) return next();
  res.send(`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} · Local preview</title>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  body{margin:0;min-height:100vh;display:grid;place-items:center;padding:16px;box-sizing:border-box;background:#f5f8fc;font-family:Montserrat,system-ui,sans-serif;color:#1a1a1a}
  .card{max-width:440px;width:100%;background:#fff;border:1px solid #dde5ef;border-radius:12px;padding:32px 24px;text-align:center;box-shadow:0 4px 16px rgba(5,90,171,.08)}
  img{width:180px;height:auto}
  h1{font-size:22px;margin:20px 0 8px}
  p{margin:0 0 24px;line-height:1.5;color:#4a5361}
  a.btn{display:inline-block;background:#055AAB;color:#fff;text-decoration:none;font-weight:600;padding:12px 24px;border-radius:8px;transition:background-color .22s,transform .22s,box-shadow .22s}
  a.btn:hover{background:#04498B;transform:translateY(-2px);box-shadow:0 6px 16px rgba(5,90,171,.28)}
  a.btn:active{transform:scale(.97)}
</style></head>
<body><main class="card">
  <img src="https://oregonapostillehub.com/wp-content/uploads/2025/01/oah-header-logo.webp" alt="Oregon Apostille Hub">
  <h1>${title}</h1>
  <p>This page is part of the main Oregon Apostille Hub website. It isn't included in this local preview, which only contains the order form.</p>
  <a class="btn" href="/details">← Back to the order form</a>
</main></body></html>`);
});

// Fallback for other paths (compatible with Express 5).
app.use((_req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Oregon Apostille form preview running at http://localhost:${PORT}`);
});
