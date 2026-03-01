# Bento Grid Portfolio Redesign

## Context
Personal portfolio site for Jaeho Shin — Engineering Director at Mindlogic, Seoul. Target audience: tech peers and community. Current site is a Brittany Chiang split-layout clone. Redesigning to a full bento grid layout.

## Key Decisions
- **Remove private info**: No equity percentages, no specific funding amounts (₩7B), no revenue figures unless already public
- **Spotlight project**: MangstoonAI (3rd Place, Gemini 3 Seoul Hackathon, $20K credits) — gets the largest project card
- **Keyword identity**: Google ADK, Claude Agent SDK, Claude Code, MCP, LLMs, Evaluation, Real-time AI, ARS, Production AI
- **Hidden resume**: `/resume` route exists but is not linked publicly
- **Profile photo**: DUMBO Manhattan Bridge shot (`IMG_8137.jpg`), cropped to upper body

## Homepage: Bento Grid Layout

### Desktop Grid (12-column, gap-4)

```
Row 1:
┌─────────(col-span-8)───────────┬──(col-span-4)─┐
│  HERO CARD                      │  PHOTO CARD   │
│  "Jaeho Shin"                   │  DUMBO shot   │
│  Engineering Director           │  object-cover  │
│  "I ship AI that works —        │  upper body   │
│   not demos."                   │               │
│  [GitHub] [LinkedIn] [Email]    │               │
└─────────────────────────────────┴───────────────┘

Row 2:
┌──(col-span-4)──┬──(col-span-4)──┬──(col-span-4)─┐
│  WHAT I DO     │  CURRENTLY      │  CONNECT      │
│  • LLMs        │  Building AI    │  Seoul 🇰🇷     │
│  • Claude/ADK  │  ops agents     │  Yonsei Univ  │
│  • Real-time   │  with MCP &     │  KR/EN/CN     │
│  • Evaluation  │  Claude Code    │  [socials]    │
└────────────────┴─────────────────┴───────────────┘

Row 3 (Spotlight):
┌──────────────(col-span-12)──────────────────────┐
│  SPOTLIGHT: MangstoonAI                          │
│  ★ 3rd Place — Google Gemini 3 Seoul Hackathon   │
│  Solo entry vs 111 teams · $20K credits          │
│  AI webtoon generator — 22 panels in <1 min      │
│  [Tags: gemini, adk, hackathon, fastapi, next.js]│
│  → Link to project detail                        │
└─────────────────────────────────────────────────-┘

Row 4:
┌──(col-span-4)──┬──(col-span-4)──┬──(col-span-4)─┐
│  PROJECT:      │  PROJECT:       │  PROJECT:      │
│  AI Ops Agent  │  Mediapipe      │  FactChat      │
│  Claude + MCP  │  FaceLandmark   │  Enterprise    │
│  + Slack       │  114★ on GitHub │  RAG platform  │
└────────────────┴─────────────────┴───────────────┘

Row 5:
┌──(col-span-4)──┬──(col-span-8)──────────────────┐
│  PROJECT:      │  EXPERIENCE                      │
│  3D Avatar     │  Timeline (4 roles, expandable)  │
│  Controller    │  Director → Lead → CEO → SWE     │
│  11★ GitHub    │  + Intern + Education            │
└────────────────┴─────────────────────────────────┘

Row 6:
┌──────────────(col-span-12)──────────────────────┐
│  WRITING                                         │
│  Blog posts (placeholder/draft titles)           │
│  "Claude Code Adoption Across 15 Engineers"      │
│  "Building AI Ops Agents with MCP"               │
│  "Solo vs 111 Teams: Gemini Hackathon Lessons"   │
└─────────────────────────────────────────────────-┘

Row 7:
┌──────────────(col-span-12)──────────────────────┐
│  FOOTER                                          │
│  Built with Next.js + Tailwind. Seoul, Korea.    │
└─────────────────────────────────────────────────-┘
```

### Mobile: Single column stack (all cards col-span-full)

## Card Design System

All cards share:
- Background: `bg-slate-900/60` with `border border-slate-800/50`
- Corners: `rounded-2xl`
- Padding: `p-6`
- Hover: `hover:border-cyan-400/20 hover:scale-[1.01]` transition
- Glassmorphism: `backdrop-blur-sm`

### Card Types

1. **Hero** — Name (Outfit bold), title, one-liner tagline, social icon row
2. **Photo** — `IMG_8137.jpg` cropped, `object-cover object-[center_20%]`, rounded
3. **Keywords/What I Do** — Pill tags for core skills (cyan outlined)
4. **Currently** — Short editable "what I'm working on" text
5. **Connect** — Location, education, languages, social links
6. **Spotlight Project** — Full-width, prominent award badge, description, tags
7. **Project Cards** — Title + arrow, description, tech pills, hover glow
8. **Experience** — Compact timeline, expandable on click
9. **Writing** — Blog post titles with dates, links to /blog/[slug]
10. **Footer** — Credits, minimal

## New Content

### Projects to Add
- **Mediapipe FaceLandmark Demo**: 114★, live demo at mediapipe-facelandmark-demo.vercel.app
- **3D Avatar Controller**: 11★, live demo at 3d-avatar-controller.vercel.app
- **Opentown Vtuber Studio**: Real-time full-body motion tracking (from resume)

### Experience to Add
- Computer Vision Engineer Intern @ Mindlogic (Jul 2020 - Feb 2021)
- Education: Yonsei University, B.S. Electricity & Electrical Engineering

### Content to Remove/Sanitize
- No equity percentages
- No specific funding amounts
- No revenue figures (₩300M stays as "scaled to significant revenue" or similar)
- No phone number

### Blog Posts (Placeholder/Draft)
1. "Driving Claude Code Adoption Across a 15-Person Engineering Team"
2. "Building Autonomous AI Ops Agents with MCP"
3. "Solo vs 111 Teams: Lessons from Gemini 3 Seoul Hackathon"

## Hidden Resume Page

- Route: `/resume` (not linked anywhere public)
- Content source: `content/resume.mdx`
- Styled as clean, printable document
- Print CSS: `@media print` removes nav, optimizes for paper
- User can edit MDX file directly like a document

## Interactions

- Keep existing spotlight cursor effect
- Cards: fade-in on scroll via Intersection Observer
- Hover: border glow + subtle scale
- Page transitions: CSS view transitions for /projects/[slug] and /blog/[slug]
- Responsive: 12-col → 8-col (md) → 1-col (sm)

## Tech Stack (unchanged)
- Next.js 16 + React 19
- Tailwind CSS v4 + Typography plugin
- MDX via next-mdx-remote
- Deployed on Vercel
