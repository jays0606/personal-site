# The Record — portfolio redesign (2026-09-05)

## Brief

Subject: Jaeho Shin, 28, Seoul. Runs engineering at MindLogic by day; runs VibeRick
(a media factory on one RTX 5090, a handful of apps, hackathons) the rest of the time.
Three-year plan: YC or O-1, US in early 30s.

Primary job of the site: a **compounding public record** of what he has shipped —
readable by a YC partner in 90 seconds, and detailed enough to later back a visa
petition. Secondary: it should feel like *him* — Korean, builder, honest about failures.

Audience reads English. Korean appears only as small section names (기록, 지금) — an
identity signal, not a translation.

Frame chosen (option C): builder leading, MindLogic as proof of scale.

## The one bold element

The page is the record. Not cards, not a bento — a single dated ledger from 2019 to
now, with big year numerals, that you scroll through. Everything else (hero, now,
contact) is quiet and short.

Signature device: a red **seal** (낙관) — a square cinnabar stamp with 申 next to the
name. Red is used for the seal and for the "now" marker on the ledger only. On load
the seal stamps once (scale 1.25→1, 60ms, then settles). That is the page's only
non-user-triggered motion.

## Tokens

Color
- Porcelain `#F2F3F1` — page ground (cool white, not cream)
- Ink `#15171A` — text, rules
- Graphite `#5B5F66` — secondary text
- Mist `#D9DCDA` — hairline rules only inside the ledger
- Cinnabar `#C2362B` — seal, current marker, focus ring
- Night `#0F1114` — the terminal easter egg background

Type
- Display: **Fraunces** (variable; opsz + SOFT) — name, year numerals, headline. Soft=50,
  wonk on for the headline only.
- Body/UI: **Hanken Grotesk** — everything else. 17px/1.55 body, measure ≤ 68ch.
- Korean labels: **Nanum Myeongjo** — 기록, 지금, 연락. Small (13px), ink, no caps.
- Mono: **Geist Mono** — only inside the terminal easter egg and the ledger's date gutter.

Layout (desktop 1100px max, left-aligned, 40px gutters; mobile stacks)

```
 [seal] Jaeho Shin                                    Seoul, KR  →  US, soon

 One engineer, one GPU,                 ┌──────────────┐
 and a lot of agents.                   │  portrait    │ ← flips to webtoon on
                                        │  DUMBO shot  │   hover / tap
 3 short sentences of who/what/why.     └──────────────┘
 github · linkedin · mail (plain links, no icons)

 기록  The record        [all] [MindLogic] [VibeRick] [hackathons] [open source]
 2026 ──────────────────────────────────────────────────────────────
   Sep  •  ...                                     (● red = this month)
   Aug     ...
 2025 ──────────────────────────────────────────────────────────────
 …
 2019

 지금  Now                              (three short paragraphs, dated)
 선별  Six things worth a closer look    (project links, 2-col list, no cards)
 연락  Contact                           (one sentence, email)
 ─────────────────────────────────────────────────────────────────
 jaeho@rtx5090:~$ _                      (footer terminal; type `help`)
```

## Principles

1. Numbers live inside sentences, never in a stats row.
2. No cards, no shadows, no gradients. Hierarchy from size, weight, and space.
3. Failures stay in the record (terminated channels, unfinished film). They are
   the most credible lines on the page.
4. Every ledger line has a date, a track, one sentence, and — where it exists — a link.
5. MindLogic at title level: what was built and its scale, never internals or clients'
   private numbers. No equity, no revenue, no MRR, no client names for consulting.

## Self-check against generic defaults

- Cream + terracotta → replaced with porcelain + cinnabar (cooler ground, a *red*
  that comes from Korean seal ink, and it is confined to one 28px square).
- Broadsheet hairlines → hairlines exist only between ledger years; nothing else is ruled.
- All-caps eyebrows / middle dots / "→" on links → none. Korean words do the labelling.
- Mono for data labels → mono only in the date gutter, which is genuinely tabular.
- Fade-up on every section → one stamp, nothing else.

## Pages

- `/` hero, record, now, selected work, contact, terminal footer
- `/work/[slug]` MDX write-ups (existing content dir, rewritten + new entries)
- `/now` — the "now" section as its own page, dated
- `/file` — running evidence ledger for a future petition. `noindex`, footer-only link.
- `/resume` — hidden, refreshed from resume.tex
- `/writing` — kept; all posts are drafts, route shows an honest empty state.

## Surprises

1. Portrait flips to a webtoon rendering of the same photo (MangstoonAI nod).
2. `/file` — the O-1 criteria ledger, pre-filled from the record.
3. Footer terminal: `help`, `ls`, `whoami`, `now`, `gpu`, `cat record.md`, `open <slug>`.
