# Base44 Development Environment

## Project Overview
This is `@paddle/paddle-js` — a TypeScript wrapper library for Paddle.js (v2/Billing). It is an npm package, not a web application. It provides `initializePaddle()` and TypeScript definitions for Paddle Checkout and Retain.

## Architecture
- **Source**: `src/` — TypeScript source (entry: `src/index.ts`)
- **Types**: `types/` — TypeScript declaration files (`.d.ts`)
- **Build**: Rollup (`rollup.config.mjs`) → UMD (`dist/index.js`) + ESM (`dist/index.esm.js`)
- **Tests**: Jest (`yarn test`)
- **Package manager**: Yarn (classic, `yarn.lock`)

## Running in Base44
A demo Vite app (`demo/`) visualizes the library in the preview. The compose service:
1. `npm install -g yarn` — make yarn available
2. `yarn install --frozen-lockfile` — install build dependencies
3. `yarn build` — build the library to `dist/`
4. `cd demo && npm install` — install Vite
5. `vite --host 0.0.0.0 --port 5173` — serve demo (mapped to host port 3000)

## Key Files
- `docker-compose.base44.yml` — Base44 dev environment
- `demo/` — Vite demo app (not part of the published package)
- `.base44/environment.json` — Base44 metadata

## Notes
- No external credentials required to build or run the demo
- `initializePaddle()` loads Paddle.js from `https://cdn.paddle.com/paddle/v2/paddle.js` — a real Paddle token or seller ID is needed for full checkout functionality
- Source edits to `src/` require `yarn build` to update the demo (the demo imports from `dist/`)
- The `types/` directory contains `.d.ts` files with enum declarations — these are type-only at runtime; the runtime enums live in `src/constants/`
