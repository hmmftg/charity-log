# Deploy: Render (Go API) + GitHub Pages (React UI)

This guide connects the **Go backend on Render** with the **React frontend on GitHub Pages**.

| Component | Host | URL example |
|-----------|------|-------------|
| Frontend | GitHub Pages | `https://hmmftg.github.io/charity-log/` |
| Backend API | Render | `https://your-service.onrender.com` |
| Database | Render PostgreSQL | internal to Render |

---

## Part 1 — Render (Go backend)

You can use an **existing Render web service** or create one from this repo.

### Option A: Use your existing Render project

Open your Render web service and set:

| Setting | Value |
|---------|-------|
| **Root Directory** | `backend` |
| **Build Command** | `go build -o healthcare ./cmd/healthcare/ && go build -o paramEncryptor ./cmd/paramEncryptor/` |
| **Start Command** | `./scripts/render-start.sh` |

**Environment variables:**

| Key | Value |
|-----|-------|
| `DATABASE_URL` | Your Render PostgreSQL **Internal** connection string |
| `PORT` | Leave unset — Render injects this automatically |

Link your existing PostgreSQL database to the web service so `DATABASE_URL` is available.

> Use the **Internal** database URL (not External) so traffic stays on Render's private network.

After deploy, note your public API URL, e.g. `https://charity-log-api.onrender.com`.

### Option B: Create from `render.yaml`

1. In Render Dashboard → **New** → **Blueprint**
2. Connect the `hmmftg/charity-log` repo
3. Render creates `charity-log-api` (web) + `charity-log-db` (PostgreSQL)

Or merge the `render.yaml` settings into your existing services manually.

### Database setup

If the database is empty, run migrations locally against the Render DB (External URL, one-time):

```bash
# Example — use your Render external connection string temporarily
psql "$RENDER_EXTERNAL_DATABASE_URL" -f your-migration.sql
```

Or connect from your machine using Render's **External Database URL** from the database dashboard.

### Verify the API

```bash
curl https://YOUR-SERVICE.onrender.com/healthcare/swagger
```

---

## Part 2 — GitHub Pages (React frontend)

### 1. Enable GitHub Pages

1. Repo **Settings** → **Pages**
2. **Source**: GitHub Actions

### 2. Add GitHub secret

**Settings** → **Secrets and variables** → **Actions** → **New repository secret**

| Secret | Example value |
|--------|---------------|
| `RENDER_API_URL` | `https://charity-log-api.onrender.com` |

No trailing slash. This is injected at build time into the frontend.

### 3. Deploy

Push to `main` (when `frontend/` changes) or run the workflow manually:

**Actions** → **Deploy frontend to GitHub Pages** → **Run workflow**

Your site will be at:

```
https://hmmftg.github.io/charity-log/
```

---

## Part 3 — CORS

The Go backend already allows all origins (`AllowOrigins: ["*"]`), so GitHub Pages can call the Render API without extra CORS config.

---

## Architecture

```
Browser
  │
  ├─► GitHub Pages (static React)
  │     https://hmmftg.github.io/charity-log/
  │
  └─► Render Go API
        https://your-service.onrender.com
              │
              └─► Render PostgreSQL
```

---

## Local development (unchanged)

```bash
# Terminal 1 — backend
cd backend && go run ./cmd/healthcare/ -p config/param-local.yaml

# Terminal 2 — frontend
cd frontend && npm run dev
```

Frontend uses `frontend/.env.dev` pointing at `localhost:9090`.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Blank page on GitHub Pages | Check **Pages** source is "GitHub Actions"; confirm `VITE_BASE_URL` is `/charity-log/` |
| API calls fail (CORS/network) | Confirm `RENDER_API_URL` secret matches your Render service URL (https, no trailing slash) |
| Render service crashes on start | Check `DATABASE_URL` is set and uses Internal URL; view Render logs |
| Render cold start (~30s) | Free tier sleeps after inactivity; first request wakes it up |
| Login fails | Ensure DB is migrated and users exist; or test with registered accounts via `/ums/register/` |

---

## Quick checklist

- [ ] Render web service built with `render-start.sh`
- [ ] Render PostgreSQL linked (`DATABASE_URL` set)
- [ ] API URL works (`/healthcare/swagger`)
- [ ] GitHub secret `RENDER_API_URL` set
- [ ] GitHub Pages enabled (GitHub Actions source)
- [ ] Workflow ran successfully
- [ ] Demo loads at `https://hmmftg.github.io/charity-log/`
