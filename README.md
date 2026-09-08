# VORTEX Backend

Phase 1 foundation for VORTEX, an AI-powered, map-first tourism discovery platform for India.

## Requirements

- Node.js 20 or newer
- npm
- PostgreSQL will be required in Phase 2

## Setup

From the repository root:

```powershell
cd backend
npm install
Copy-Item .env.example .env
```

Update `.env` with local values. Supabase is the source of truth for the existing Safarnama database. Never commit `.env` or place the publishable key in source code.

## Run

Development mode with automatic restart:

```powershell
npm run dev
```

Build and run the compiled server:

```powershell
npm run build
npm start
```

Type-check without emitting files:

```powershell
npm run typecheck
```

The default server URL is `http://localhost:4000`.

## Safarnama frontend integration

The deployed frontend is currently a static bundle and does not yet issue API requests. Configure the frontend deployment with:

```text
VITE_API_BASE_URL=https://<your-deployed-backend-domain>/api
```

Then request live Supabase-backed tourism content from:

```text
GET ${VITE_API_BASE_URL}/content
```

The response contains `destinations`, `experiences`, `reels`, `artisans`, and `crafts` from the existing Supabase database. For local development, use `VITE_API_BASE_URL=http://localhost:4000/api`.

## Supabase verification

The backend exposes a read-only connection check at:

```text
GET http://localhost:4000/api/supabase/verify
```

It reads one destination and exact row counts from `destinations`, `experiences`, `reels`, `artisans`, `crafts`, and `discovery_metrics`. It does not write records or change the Supabase schema.

## Health check

```powershell
Invoke-RestMethod http://localhost:4000/api/health
```

Expected response:

```json
{
  "success": true,
  "message": "VORTEX backend is running"
}
```

API routes for discovery, destinations, reels, map data, crafts, trips, authentication, and AI recommendations will be added in later phases. No frontend files were changed during Phase 1.
