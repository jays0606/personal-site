# Personal site — jaehoshin.com

Portfolio for Jaeho Shin, rebuilt 2026-09-05 as **a dated ledger** ("the record") rather than a
bento grid. Design rationale: `docs/plans/2026-09-05-the-record-design.md`. Read it before
changing the look.

## Stack

Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind CSS v4 (`@import "tailwindcss"`, tokens
in `@theme` inside `app/globals.css`, no config file) · MDX via `next-mdx-remote` + `gray-matter`.
Fonts via `next/font/google`: Fraunces (display), Hanken Grotesk (body), Nanum Myeongjo (Korean
section labels), Geist Mono (date gutter + terminal).

## Where things live

```
content/record.ts        THE content. Every ledger entry: year, month?, track, title, detail, href?, mark?
content/work/*.mdx       Write-ups. Frontmatter: title, summary, date, period?, track, status?, featured?, order?, link?, demo?, youtube?, award?, image?, hidden?
content/writing/*.mdx    Posts. All drafts (draft: true) — /writing shows an honest empty state.
content/resume.mdx       Hidden /resume (noindex). Keep in sync with ~/Code/personal/resume/resume.tex.
app/page.tsx             Home: who → record → now → closer looks → contact → terminal footer
app/now/page.tsx         Now page. Update NOW_LABEL in lib/site.ts when you update it.
app/file/page.tsx        O-1A criteria ledger. noindex, footer-only link. Delete if unwanted.
components/record.tsx    Client: track filter + year-grouped ledger. The red dot marks NOW (hardcoded year/month).
components/terminal.tsx  Footer easter egg. Static data; `gpu` output is a snapshot, not live.
components/portrait.tsx  Photo ↔ webtoon flip. public/portrait.jpg + public/portrait-webtoon.jpg (gpt-image-2 edit of the same photo).
```

## Rules

- **Add to the record, don't rewrite it.** New entries go at the top of `RECORD` in `content/record.ts`. Omit `month` when only the year is certain — it renders as a dash on purpose.
- Numbers live inside sentences. No stat rows, no cards, no gradients, no all-caps labels, no middle-dot separators, no "→" on links.
- Red (`--color-cinnabar`) is for the seal and the now-dot only.
- MindLogic at title level: what was built and its scale. No equity, revenue, MRR, or consulting-client names.
- When the month rolls over: bump `NOW_LABEL` (lib/site.ts), `NOW` in `components/record.tsx`, and the now text in `app/page.tsx` + `app/now/page.tsx` + `now()` in `components/terminal.tsx`.

## Commands

```
npm run dev      # http://localhost:3000
npm run build    # must pass before deploy
vercel --prod    # project "personal-site" is linked (.vercel/project.json)
```

## Domain

`jaehoshin.com` currently points at an old **Squarespace** site. The Vercel project is not attached
to the domain yet. Cutover = add the domain in Vercel → change DNS at the registrar → the Squarespace
site goes dark. Jaeho's call; don't do it unasked.
