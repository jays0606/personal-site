# Personal Site

Portfolio site for Jaeho Shin — Engineering Director @ Mindlogic, Founder @ VibeRick.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Content:** MDX via `next-mdx-remote` + `gray-matter`
- **Fonts:** Outfit (display), IBM Plex Sans (body), JetBrains Mono (code)

## Project Structure

```
app/                  # Next.js App Router pages
  blog/               # Blog listing + [slug] detail
  projects/           # Projects listing + [slug] detail
  resume/             # Resume page
  layout.tsx          # Root layout (fonts, metadata)
  page.tsx            # Home (bento grid)
  globals.css         # Global styles + Tailwind
components/           # Shared React components
  bento-card.tsx      # Bento grid card
  fade-in.tsx         # Fade-in animation wrapper
  spotlight.tsx       # Cursor spotlight effect
  mdx-content.tsx     # MDX renderer
content/              # MDX content files
  blog/               # Blog posts (.mdx)
  projects/           # Project write-ups (.mdx)
  resume.mdx          # Resume content
lib/                  # Utilities
  content.ts          # MDX parsing & content loading
public/               # Static assets (images, resume PDF)
docs/                 # Documentation & artifacts
  plans/              # Design & implementation plans
  screenshots/        # Site screenshots (gitignored)
```

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint

## Conventions

- App Router file conventions: `page.tsx`, `layout.tsx`, `loading.tsx`
- MDX files use gray-matter frontmatter for metadata
- Tailwind v4 — use `@import "tailwindcss"` syntax, no `tailwind.config`
- Components are flat in `components/` (add `ui/` subfolder when it grows past ~10 files)
