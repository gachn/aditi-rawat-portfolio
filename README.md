# Aditi Portfolio Revamp

Next.js + Sanity rebuild of the portfolio for easy non-coder editing.

## Stack
- Next.js (App Router, TypeScript)
- Sanity CMS
- GitHub Pages deployment target

## Setup
1. Install dependencies:
   - `npm install`
2. Copy env file:
   - `cp .env.example .env.local`
3. Add Sanity values in `.env.local`.
4. Run app:
   - `npm run dev`

## CMS Editing
1. Start Studio:
   - `npm run sanity:dev`
2. Open:
   - `http://localhost:3333`

## Deploy to GitHub Pages
1. Push this repo to GitHub (branch: `main`).
2. In GitHub, open `Settings` -> `Pages` and set source to `GitHub Actions`.
3. In GitHub, open `Settings` -> `Secrets and variables` -> `Actions` and add:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
   - `SANITY_API_READ_TOKEN`
4. Push to `main` to trigger deployment workflow:
   - `.github/workflows/deploy-pages.yml`
5. Your site URL will be:
   - `https://<github-username>.github.io/<repo-name>/`

## Generic Wix Asset Migration
Use this for any project slug and source URL:

1. Add write token:
   - `SANITY_API_WRITE_TOKEN=your_write_token`
2. Run:
   - `npm run migrate:wix -- --slug trinidad-and-tobago --source https://www.aditirawat.com/animations/trinidad-and-tobago`

The script:
- extracts Wix image/video assets
- uploads assets to Sanity
- patches the matching `project` doc with `coverImage`, `gallery`, and `videoFile`
