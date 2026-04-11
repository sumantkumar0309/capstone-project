# Frontend: Capstone Pro

React + Vite frontend for browsing India location hierarchy (State -> District -> Sub-District -> Village) using secure B2B API credentials.

## Prerequisites

- Node.js 18+
- npm 9+
- Backend running and reachable

## Environment Variables

Create `frontend/.env` (or copy from `.env.example`):

```env
VITE_API_BASE_URL=http://localhost:4000/api/b2b/locations
VITE_API_KEY=your_api_key_here
VITE_API_SECRET=your_api_secret_here
```

## Install and Run

```bash
cd frontend
npm install
npm run dev
```

App will run on http://localhost:8080 by default.

## Scripts

```bash
npm run lint
npm run test
npm run build
npm run preview
```

## Notes

- API credentials are loaded from Vite env vars only.
- Do not commit real `.env` values.
- If location dropdowns are empty, check backend auth headers and API key validity.
