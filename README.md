# Aditi Portfolio Revamp

Next.js + Sanity rebuild of the portfolio for easy non-coder editing.

## Stack
- Next.js (App Router, TypeScript)
- Sanity CMS
- Vercel deployment target

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
