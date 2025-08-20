# JPI Frontend (scaffold)

This folder contains a minimal Vite + React + TypeScript scaffold for the JPI frontend described in the project spec.

Quickstart

1. cd frontend
2. npm install
3. npm run dev

Notes
- Bulma is imported in `src/main.tsx`.
- Type checking: `npm run typecheck`.
- Linting: `npm run lint`.
- Tests: `npm run test` (Vitest — tests not added yet).
 - Webpack dev server (alternative): `npm run dev:webpack` (port 3000)
 - Webpack production build: `npm run build:webpack` -> `dist/`

API configuration
- The frontend defaults to using `/api` as the API base. In development you have two options:
	1. Set `VITE_API_URL` in your environment to your backend URL (for example `http://localhost:3000`).
	2. Use the Vite dev server proxy which forwards requests from `/api` to `http://localhost:3000` (configured in `vite.config.ts`).

If your backend is on a different port or host, update `vite.config.ts` proxy target or set `VITE_API_URL`.
