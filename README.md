# KeyVault — e-commerce UI stack for digital game stores

A design case and HTML prototype of KeyVault, a store that sells game keys for Steam, Epic Games, EA app, GOG, Ubisoft Connect, Battle.net and other activation platforms.

The Figma file holds the screens, components (atoms, molecules, organisms) and design tokens. This repository is the matching HTML prototype: every change goes into Figma first, then here.

**Pages**
- `index.html` — Home: featured-game carousel, shop by platform, popular now (tabs), games under €1, collections, how it works
- `catalog.html` — Catalog: filters (price, device, activation platform, region, type, genre, publisher), sorting, grid / list views, pagination, empty state, mobile filter and sort sheets

Shared across pages: header with mega menu and a category bar that hides on scroll down, mobile menu and full-screen search, cart and wishlist (kept between pages), footer. Desktop (1440) and mobile (390) layouts.

**Structure**
- `assets/tokens.css` — generated from Figma variables and styles by `python3 tokens/build.py` (source: `tokens/figma-export.json`); never edited by hand
- `assets/kv.css` — shared component styles; `assets/home.css` — Home only
- `assets/kv.js` — shared shell, icons, data, Game card, cart and wishlist store

**In progress:** product page, cart, checkout, key delivery, sign in, account, help centre, 404.

Live prototype: https://zaaapx.github.io/marketplace-ui-stack/
