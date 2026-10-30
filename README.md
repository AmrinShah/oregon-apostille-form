# Oregon Apostille Order Form — Node.js + Express

A 3-step apostille order wizard (Documents → Details → Review), laid out like the
olivetranslate.com/order checkout: step bar, main form card, sticky order summary,
and a fixed total/continue bar on mobile.

## Requirements
- Node.js 18 or newer
- npm

## Run locally
1. Open a terminal in the `oregon-apostille-node` folder.
2. Run `npm install`.
3. Run `npm start`.
4. Open http://localhost:3000 in your browser.

Health check: http://localhost:3000/health

## Files
- `public/index.html` — the whole order page (plain HTML/CSS/JS, no build step).
- `backup/index.design-preview.html` — the original design-preview bundle, kept for reference (not served).

## Page URLs
The form has three short steps, each with its own URL: `/details` (name, email, phone),
`/documents` (upload, document type, destination country, translation, speed, return and
address, in collapsible sections) and `/payment`, then `/confirmation`. Uploading at least one document is
required. Each uploaded file becomes its own document (priced per document).
Translation (switched off), notarization ("Not sure"), speed (Standard) and return
(US Shipping) start with defaults, so customers only change what's different for them.
The browser Back/Forward buttons move between steps. Reloading always starts again at
`/details`, because nothing is saved yet. Whatever server hosts the page must send
`index.html` for these paths; `server.js` already does this.

## Translation page count
The page count is worked out from the uploaded files: each JPG/PNG counts as 1 page, and
PDFs are counted in the browser with pdf.js (loaded from cdnjs only when a PDF is
uploaded). DOC, DOCX and ZIP files can't be counted, so the customer adjusts the number
by hand. With no uploads, they pick it themselves.

## Editing prices and options
All prices and lists are in the `CFG` object at the top of the `<script>` in
`public/index.html`: processing speeds, notary fee, translation price per page,
shipping options, document types, languages and countries.
The Same Day option still shows the `[CUTOFF TIME]` placeholder.

## Not included yet
- Submitting an order does not send it anywhere. The confirmation screen is shown
  client-side and the order number is random. Hook your backend, email, or a
  payment provider (e.g. Stripe Checkout) into `submit()` where the `TODO` is.
- Uploaded files stay in the browser (`S.docs[i].files`) until that backend exists.
- The header and footer logos load from oregonapostillehub.com.
