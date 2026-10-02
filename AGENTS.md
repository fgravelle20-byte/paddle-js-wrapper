# Base44 Dev Environment

## Project Overview
This is `@paddle/paddle-js` — a TypeScript wrapper library for Paddle.js (Paddle Billing). It is a **library package**, not a web application. It has no web server or dev server of its own.

## Why "Failed to Start"
The repo has no web server to serve on port 3000. The Base44 preview requires something listening on port 3000. A static preview server was added (`preview/server.mjs` + `preview/index.html`) to serve a demo page that loads the built library.

## Build & Test
- **Build**: `yarn build` (rollup) — compiles `src/index.ts` to `dist/index.js` (UMD) and `dist/index.esm.js` (ESM)
- **Tests**: `yarn test` (jest) — 10 tests, all pass
- **Type check**: `yarn tsc` — passes with strict settings
- **Lint**: `yarn lint` (eslint)

## Docker Compose
`docker-compose.base44.yml` runs a `node:22` container that:
1. Installs deps with `yarn install --frozen-lockfile`
2. Builds the library with `yarn build`
3. Serves `preview/index.html` + `dist/` on port 3000 via `preview/server.mjs`

## Verification
- `curl http://localhost:3000/` returns the preview HTML (200 OK)
- `curl http://localhost:3000/dist/index.esm.js` returns the built ESM bundle (200 OK)
- Container healthcheck passes (healthy)
