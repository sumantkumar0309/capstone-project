# Capstone Pro

Capstone Pro is a full-stack location platform for India villages data, with:

- Express + Prisma backend
- PostgreSQL (Neon)
- Redis cache + adaptive rate limiting (Upstash/local Redis)
- JWT auth + API key/secret B2B auth
- React + Vite frontend explorer/dashboard/docs UI

## Tech Stack

- Backend: Node.js, Express, Prisma, PostgreSQL, Redis
- Frontend: React, Vite, TypeScript, Tailwind CSS, Radix UI
- Deployment: Vercel

## Project Structure

- `src/` backend application code
- `prisma/` Prisma schema and migrations
- `frontend/` React frontend app
- `api/` Vercel serverless entrypoint
- `postman/` API collections/environments

## 1) Backend Setup

### Install

```bash
npm install
```

### Environment

Copy `.env.example` to `.env` and set real values:

```env
DATABASE_URL=postgresql://...
DATABASE_URL_UNPOOLED=postgresql://...
PORT=4000
JWT_SECRET=replace_me
JWT_EXPIRES_IN=1h
REDIS_URL=rediss://...
RATE_LIMIT_REDIS=true
```

### Prisma

```bash
npm run prisma:generate
```

Apply migration in your database:

```bash
npx prisma migrate deploy
```

(Optional) import villages CSV:

```bash
npm run seed
```

### Run Backend

```bash
npm run dev
```

Health check:

```bash
curl http://127.0.0.1:4000/health
```

## 2) Frontend Setup

```bash
cd frontend
npm install
```

Create `frontend/.env` from `frontend/.env.example`:

```env
VITE_API_BASE_URL=http://localhost:4000/api/b2b/locations
VITE_API_KEY=your_api_key_here
VITE_API_SECRET=your_api_secret_here
```

Run frontend:

```bash
npm run dev
```

## 3) Security + Auth Flow

1. Register user: `POST /api/auth/register`
2. Login user: `POST /api/auth/login`
3. Create API key with JWT: `POST /api/keys`
4. Use `x-api-key` + `x-api-secret` on B2B routes

## 4) Performance & Caching

Cached location routes:

- `GET /api/b2b/locations/states`
- `GET /api/b2b/locations/states/:stateId/districts`
- `GET /api/b2b/locations/districts/:districtId/subdistricts`
- `GET /api/b2b/locations/subdistricts/:subDistrictId/villages`
- `GET /api/b2b/locations/search`

Headers:

- `X-Cache: MISS|HIT`
- `X-Cache-Store: REDIS|MEMORY|REDIS_OR_MEMORY`

## 5) Quality Gates

From repo root:

```bash
npm run test:task4
MONITOR_ITERATIONS=1 MONITOR_INTERVAL_MS=1000 npm run monitor:health
```

From frontend:

```bash
npm run lint
npm run test
npm run build
```

## 6) Deploy

- Set backend env vars in Vercel project
- Ensure Neon and Redis URLs are reachable from Vercel
- Deploy; root route is served by `api/index.js`

## 7) CI

GitHub Actions workflow runs frontend quality checks and backend smoke checks on push/PR.
