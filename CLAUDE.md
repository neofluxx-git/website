# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing site for Neofluxx (omnichannel customer engagement platform). Pure static HTML/CSS/JS — **no build step, no package.json, no tests, no linter**. Edit files directly; deploy = upload. Site language is pt-BR; commit messages are written in Portuguese.

Production: `https://neofluxx.com`. The app itself lives at `https://app.neofluxx.com` (separate codebase).

## Local preview

Open `index.html` directly in a browser, or serve the directory:

```
python3 -m http.server 8000
```

**CORS gotcha:** the demo-request form posts to a Cloudflare Worker that only accepts the production origin. `js/main.js` detects `localhost`/`127.0.0.1` and shows a "CORS — only works on neofluxx.com" message instead of the generic network error. Don't try to "fix" this by changing the worker URL or the API key — submitting from localhost is expected to fail.

## Files

- `index.html` — landing page
- `price.html` — pricing page (most frequently edited; see pricing toggle below)
- `tools.html` — features page
- `politica-de-privacidade.html`, `termos-de-servico.html` — legal pages
- `css/styles.css` — single hand-edited stylesheet for the entire site (no preprocessor pipeline despite the `@charset "UTF-8"` header)
- `js/main.js` — single global script, loaded on every page; uses `if (element)` guards so the same file works across pages where some IDs/classes are absent

## Architecture notes that aren't obvious from one file

### Demo-request form (`#demo-dialog`)

Lives in every page's header. Uses a native `<dialog>` element opened by any `.open-demo` button. On submit, `js/main.js` POSTs JSON `{nome, email, whatsapp}` to `https://demo-solicitation-neofluxx.neofluxx01.workers.dev/` with header `X-API-Key: 123456`. The key is intentionally public (it's in client-side JS); rate-limiting / abuse protection lives in the Worker, not here. Phone is masked client-side to `(NN) NNNNN-NNNN`.

### Monthly/annual pricing toggle (`price.html` + `js/main.js`)

The toggle is driven entirely by the `.toggle-btn[data-type]` handler in `main.js`. When "anual" is active, the script:

1. Adds `anual-active` to `<body>` (CSS hooks off this).
2. Toggles `display` on paired elements with these exact class pairs — **adding new pricing rows requires both halves of every pair**:
   - `.plan-price.mensal` ↔ `.plan-price.anual` (main cards)
   - `.plan-price-mobile-details.mensal` ↔ `.plan-price-mobile-details.anual` (accordion details)
   - `.mes` ↔ `.ano` (period labels)
3. Swaps any `<img>` with `data-original-src` / `data-annual-src`.
4. Swaps `textContent` of any element with `data-text-mensal` / `data-text-anual`.

The "yellow" icon variants under `assets/icons/*-yellow.svg` exist solely to be the annual-mode counterparts to their non-yellow siblings.

### Channel showcase (`index.html`)

The hover-to-switch channel block is driven by the `channelData` object in `js/main.js`, keyed by `[data-channel]` on `.icons-three .icon` elements. To add a channel: add an icon with the matching `data-channel` value, then add the corresponding entry to `channelData` (title, subtitle, items, imgSrc, imgAlt). Image paths in `channelData` are inconsistent (`./assets/...` vs `../assets/...`) — match the surrounding entries when adding.

### Sticky pricing-cards header

`updateCardsVisibility` in `main.js` only activates above 960px viewport width and only while scrolled within the `.features-table` range. Editing the pricing comparison table can shift `tableTop`/`tableHeight`; the script reads these once at DOMContentLoaded, so dramatic layout changes near that section may need a hard reload to reset.

## Conventions

- Texts and class/data-attribute values are in Portuguese (`mensal`, `anual`, `demo-form`, etc.) — keep new code consistent.
- Recent commit-message pattern: short pt-BR imperative ("Atualizar preço do plano X para R$ Y").
- No comments expected for routine markup/style edits; the existing JS has Portuguese comments only where the logic is non-obvious.
