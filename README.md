# Cloudflare Pages Demo — React + Vite

A proof-of-concept React app built with Vite, designed for **Cloudflare Pages** deployment with **environment variable** support.

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build 

# Preview production build locally
npm run preview
```

## Environment Variables

This app uses three `VITE_`-prefixed environment variables that are displayed in the UI:

| Variable | Purpose | Default |
|---|---|---|
| `VITE_APP_TITLE` | App title shown in header | `Cloudflare Pages Demo` |
| `VITE_API_URL` | Backend API base URL | `https://api.dev.example.com` |
| `VITE_FEATURE_FLAG` | Feature toggle | `enabled` |

**How they work:**

- **Local dev** → values come from `.env`
- **Production build** → values come from `.env.production`
- **Cloudflare Pages** → set in **Settings → Environment Variables** in the dashboard (overrides `.env.production`)

> ⚠️ Vite embeds env vars **at build time**. After changing vars in Cloudflare, you must **redeploy** for them to take effect.

## Deploy to Cloudflare Pages

### Option 1: Git Integration (Recommended)

1. Push this repo to GitHub / GitLab
2. Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/?to=/:account/pages)
3. Click **Create a project** → **Connect to Git**
4. Select your repository
5. Configure build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
6. Add environment variables under **Settings → Environment Variables**:
   - `VITE_APP_TITLE` = `My Production App`
   - `VITE_API_URL` = `https://api.myapp.com`
   - `VITE_FEATURE_FLAG` = `enabled`
7. Click **Save and Deploy**

### Option 2: Wrangler CLI

```bash
# Install Wrangler globally
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build the project
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy dist --project-name=cloudflare-pages-demo
```

To set env vars via CLI before building:

```bash
VITE_APP_TITLE="CLI Deploy" VITE_API_URL="https://api.cli.com" npm run build
wrangler pages deploy dist --project-name=cloudflare-pages-demo
```

## Project Structure

```
cloudfare_Demo/
├── public/
│   └── vite.svg
├── src/
│   ├── App.jsx         # Main component (env vars display, build info, etc.)
│   ├── App.css         # Premium dark UI styles
│   ├── index.css       # Global resets
│   └── main.jsx        # React entry point
├── .env                # Dev environment variables
├── .env.production     # Production environment variables
├── index.html          # HTML entry
├── vite.config.js      # Vite configuration
├── wrangler.toml       # Cloudflare Pages config
└── package.json        # Dependencies & scripts
```

## Tech Stack

- **React 18** — UI library
- **Vite 5** — Build tool
- **Cloudflare Pages** — Hosting & CDN
