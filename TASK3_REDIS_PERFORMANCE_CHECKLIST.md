# Task 3: Redis + Performance Checklist

This project now implements:
- Upstash Redis connection via REDIS_URL
- Redis caching for:
  - GET /api/b2b/locations/states
  - GET /api/b2b/locations/states/:stateId/districts
- Adaptive rate limiting:
  - Uses Redis store when Redis is ready
  - Falls back to in-memory limiter when Redis is unavailable

## 1) Environment Variables

Required in backend environment:
- REDIS_URL=rediss://... (Upstash TLS URL)
- DATABASE_URL=postgresql://... (must be reachable)
- JWT_SECRET=...

## 2) Start Backend

From project root:

npm run dev

Expected logs:
- Server running on http://localhost:4000
- Connected to Redis gracefully

## 3) Verify Health

curl.exe -s -o - -w "`nSTATUS:%{http_code}`n" http://127.0.0.1:4000/health

Expected:
- STATUS:200

## 4) Generate API Key/Secret (once DB is up)

1. Register user:

Invoke-RestMethod -Method Post -Uri http://127.0.0.1:4000/api/auth/register -ContentType application/json -Body '{"email":"test_user@example.com","password":"Pass@12345"}'

2. Login and get JWT:

$login = Invoke-RestMethod -Method Post -Uri http://127.0.0.1:4000/api/auth/login -ContentType application/json -Body '{"email":"test_user@example.com","password":"Pass@12345"}'
$token = $login.token

3. Create API key:

$keyRes = Invoke-RestMethod -Method Post -Uri http://127.0.0.1:4000/api/keys -Headers @{ Authorization = "Bearer $token" }
$apiKey = $keyRes.apiKey.key
$apiSecret = $keyRes.apiSecret

## 5) Cache Verification (States)

First call:

$first = Invoke-WebRequest -Uri "http://127.0.0.1:4000/api/b2b/locations/states" -Headers @{ "x-api-key" = $apiKey; "x-api-secret" = $apiSecret }
$first.StatusCode
$first.Headers["X-Cache"]

Second call:

$second = Invoke-WebRequest -Uri "http://127.0.0.1:4000/api/b2b/locations/states" -Headers @{ "x-api-key" = $apiKey; "x-api-secret" = $apiSecret }
$second.StatusCode
$second.Headers["X-Cache"]

Expected:
- First: X-Cache = MISS
- Second: X-Cache = HIT

## 6) Cache Verification (Districts)

Use one stateId from the states response and test similarly:

$stateId = "<STATE_ID>"
$d1 = Invoke-WebRequest -Uri "http://127.0.0.1:4000/api/b2b/locations/states/$stateId/districts" -Headers @{ "x-api-key" = $apiKey; "x-api-secret" = $apiSecret }
$d2 = Invoke-WebRequest -Uri "http://127.0.0.1:4000/api/b2b/locations/states/$stateId/districts" -Headers @{ "x-api-key" = $apiKey; "x-api-secret" = $apiSecret }
$d1.Headers["X-Cache"]
$d2.Headers["X-Cache"]

Expected:
- First: MISS
- Second: HIT

## 7) Optional Rate Limiting Verification

Hit an endpoint quickly more than 100 requests/minute with the same API key and verify 429 responses.

Note:
- If Redis is temporarily unavailable, limiter falls back to memory store automatically.
- passOnStoreError=true is enabled to avoid hard failures during transient Redis issues.

## 8) Performance Validation

Check response time difference:
- First request (MISS) includes DB query time.
- Second request (HIT) should be significantly faster.

You can inspect response times in Postman or use PowerShell Measure-Command.

## Current Known Blocker for Full E2E

If DATABASE_URL points to localhost:5432, PostgreSQL must be running.
Without DB connectivity, auth and location endpoints cannot complete and cache HIT/MISS cannot be demonstrated end-to-end.
