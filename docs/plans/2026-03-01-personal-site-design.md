# Personal Site Design — jaehoshin.com

## Decision

Personal portfolio + blog site. Minimal & clean. From scratch. No public resume page.

## Tech Stack

- Next.js 15 (App Router)
- Tailwind CSS v4
- MDX (local files, no CMS)
- Inter + JetBrains Mono fonts
- Vercel deployment
- Dark mode (system preference toggle)

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Hero + featured projects + recent blog posts |
| `/about` | Story, experience timeline, photo |
| `/projects` | Project cards grid |
| `/projects/[slug]` | Project detail (MDX) |
| `/blog` | Blog post list |
| `/blog/[slug]` | Blog post (MDX) |

## Content Structure

```
content/
├── projects/
│   ├── mangstoon-ai.mdx
│   ├── ai-ops-agent.mdx
│   ├── factchat.mdx
│   ├── youtube-pipeline.mdx
│   └── ecommerce.mdx
└── blog/
    └── (hackathon writeup on 3/12)
```

## Project Frontmatter

```yaml
title: string
description: string
date: string
tags: string[]
featured: boolean
image: string (optional)
link: string (optional)
award: string (optional)
```

## Blog Frontmatter

```yaml
title: string
description: string
date: string
tags: string[]
```

## Design Direction

- Minimal, lots of white space
- Clean typography (Inter body, JetBrains Mono code)
- Dark mode support
- No shadcn/ui — plain HTML + Tailwind
- Mobile responsive
- Fast (static generation where possible)

## Home Page

- Name + title + one-liner
- Social links (GitHub, LinkedIn, Email)
- Featured projects grid (3 cards)
- Recent blog posts (or "Writing soon..." empty state)

## Key Decisions

- No public resume — the site IS the portfolio
- MDX for all content — easy to add/edit
- No CMS — git-based content, deploy on push
- Domain TBD (buy jaehoshin.com or use existing)
