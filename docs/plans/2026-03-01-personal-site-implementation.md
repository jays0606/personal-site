# Personal Site Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a minimal personal portfolio + blog site for Jaeho Shin (Engineering Director) with project showcase and MDX blog.

**Architecture:** Next.js 15 App Router with local MDX files parsed via gray-matter at build time. Tailwind CSS v4 for styling. Static generation for all pages. Content lives in `content/` directory with frontmatter metadata.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, MDX, gray-matter, next-mdx-remote, Inter + JetBrains Mono fonts, Vercel deployment.

---

### Task 1: Scaffold Next.js project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `postcss.config.mjs`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `.gitignore`

**Step 1: Create Next.js app**

```bash
cd ~/Desktop/personal-site
npx create-next-app@latest . --typescript --eslint --app --tailwind --src-dir=false --import-alias="@/*" --use-npm
```

Accept defaults. This scaffolds Next.js 15 + Tailwind + TypeScript.

**Step 2: Install additional dependencies**

```bash
cd ~/Desktop/personal-site
npm install gray-matter next-mdx-remote reading-time
npm install -D @tailwindcss/typography
```

- `gray-matter`: Parse MDX frontmatter
- `next-mdx-remote`: Render MDX content in App Router
- `reading-time`: Calculate read time for blog posts
- `@tailwindcss/typography`: Prose styling for MDX content

**Step 3: Verify dev server starts**

```bash
cd ~/Desktop/personal-site && npm run dev
```

Expected: Dev server on http://localhost:3000

**Step 4: Commit**

```bash
cd ~/Desktop/personal-site
git add -A
git commit -m "feat: scaffold Next.js 15 + Tailwind v4 project"
```

---

### Task 2: Configure Tailwind, fonts, and global styles

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

**Step 1: Update globals.css with design system**

Replace `app/globals.css` with:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
  --color-accent: #2563eb;
}

body {
  @apply bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100;
  font-family: var(--font-sans);
}

::selection {
  @apply bg-blue-100 dark:bg-blue-900;
}
```

**Step 2: Update layout.tsx with fonts + metadata**

Replace `app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: {
    default: "Jaeho Shin",
    template: "%s | Jaeho Shin",
  },
  description: "Engineering Director @ Mindlogic. Founder @ VibeRick. I build AI products that ship.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen antialiased">
        <main className="mx-auto max-w-2xl px-6 py-16">
          {children}
        </main>
      </body>
    </html>
  );
}
```

**Step 3: Verify fonts load correctly**

```bash
cd ~/Desktop/personal-site && npm run dev
```

Check http://localhost:3000 — should show clean Inter font on white background.

**Step 4: Commit**

```bash
cd ~/Desktop/personal-site
git add app/globals.css app/layout.tsx
git commit -m "feat: configure Tailwind v4, Inter + JetBrains Mono fonts, dark mode"
```

---

### Task 3: Create navigation component

**Files:**
- Create: `components/nav.tsx`
- Modify: `app/layout.tsx` (add Nav to layout)

**Step 1: Create nav component**

Create `components/nav.tsx`:

```tsx
import Link from "next/link";

const links = [
  { href: "/about", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/blog", label: "blog" },
];

export function Nav() {
  return (
    <nav className="mb-16 flex items-center justify-between">
      <Link href="/" className="font-medium text-neutral-900 dark:text-neutral-100">
        Jaeho Shin
      </Link>
      <div className="flex gap-6 text-sm text-neutral-600 dark:text-neutral-400">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
```

**Step 2: Add Nav to layout.tsx**

Import and add `<Nav />` above `{children}` inside the `<main>` tag.

**Step 3: Verify nav renders on all pages**

```bash
cd ~/Desktop/personal-site && npm run dev
```

**Step 4: Commit**

```bash
cd ~/Desktop/personal-site
git add components/nav.tsx app/layout.tsx
git commit -m "feat: add navigation component"
```

---

### Task 4: Create MDX content utilities

**Files:**
- Create: `lib/content.ts`

**Step 1: Create content utility**

Create `lib/content.ts`:

```ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const contentDir = path.join(process.cwd(), "content");

export type ProjectFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  featured: boolean;
  image?: string;
  link?: string;
  award?: string;
};

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags: string[];
};

export type ContentItem<T> = {
  slug: string;
  frontmatter: T;
  content: string;
  readingTime?: string;
};

function getContentByType<T>(type: "projects" | "blog"): ContentItem<T>[] {
  const dir = path.join(contentDir, type);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const filePath = path.join(dir, filename);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      const slug = filename.replace(/\.mdx$/, "");
      return {
        slug,
        frontmatter: data as T,
        content,
        readingTime: readingTime(content).text,
      };
    })
    .sort((a, b) => new Date(b.frontmatter as any).getTime() - new Date(a.frontmatter as any).getTime());
}

export function getProjects(): ContentItem<ProjectFrontmatter>[] {
  return getContentByType<ProjectFrontmatter>("projects").sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

export function getFeaturedProjects(): ContentItem<ProjectFrontmatter>[] {
  return getProjects().filter((p) => p.frontmatter.featured);
}

export function getBlogPosts(): ContentItem<BlogFrontmatter>[] {
  return getContentByType<BlogFrontmatter>("blog").sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

export function getContentBySlug<T>(type: "projects" | "blog", slug: string): ContentItem<T> | null {
  const filePath = path.join(contentDir, type, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    frontmatter: data as T,
    content,
    readingTime: readingTime(content).text,
  };
}
```

**Step 2: Commit**

```bash
cd ~/Desktop/personal-site
git add lib/content.ts
git commit -m "feat: add MDX content utilities with frontmatter parsing"
```

---

### Task 5: Add seed content (projects MDX files)

**Files:**
- Create: `content/projects/mangstoon-ai.mdx`
- Create: `content/projects/ai-ops-agent.mdx`
- Create: `content/projects/factchat.mdx`
- Create: `content/projects/youtube-pipeline.mdx`
- Create: `content/projects/ecommerce.mdx`
- Create: `content/blog/.gitkeep`

**Step 1: Create content directories**

```bash
mkdir -p ~/Desktop/personal-site/content/projects ~/Desktop/personal-site/content/blog
```

**Step 2: Create project MDX files**

Create `content/projects/mangstoon-ai.mdx`:

```mdx
---
title: MangstoonAI
description: AI webtoon generator — turn your fantasy into a 22-panel webtoon starring yourself in under a minute.
date: "2026-02-28"
tags: [gemini, adk, hackathon, fastapi, next.js]
featured: true
link: https://github.com/jays0606/mangstoon_ai
award: "3rd Place — Google Gemini 3 Seoul Hackathon ($20K Credits)"
---

Solo entry against 111+ teams (max 4 per team). Built an AI webtoon generator that transforms a text story + selfie into a full 22-panel scroll-style webtoon.

## How It Works

1. Write your fantasy scenario and upload a selfie
2. AI extracts your face features and generates a detailed storyboard
3. All 22 panels generate in parallel — under 1 minute total
4. Edit any panel with natural language instructions

## Architecture

- **Agent**: Google ADK with Gemini 3.1 Pro orchestrating the pipeline
- **Storyboarding**: Gemini 3 Flash for fast, structured JSON storyboards
- **Image Generation**: Gemini 3.1 Flash Image for 9:16 vertical panels
- **Parallel Generation**: ThreadPoolExecutor (6 workers) + async queue streaming
- **Backend**: FastAPI on Cloud Run (Seoul region)
- **Frontend**: Next.js on Vercel with SSE real-time panel streaming
- **Storage**: Google Cloud Storage for panel images

## Key Technical Decisions

- **2-step prompt pipeline**: Flash optimizes the prompt before Image generates — much better quality
- **Face/outfit separation**: Permanent face description + per-panel outfit for character consistency
- **Language detection**: Auto-detects Korean/Japanese/English, ensures all in-image text matches
```

Create `content/projects/ai-ops-agent.mdx`:

```mdx
---
title: AI Operations Agent
description: Autonomous Slack bot integrating Jira, PostgreSQL, GitHub, Sentry via MCP — used daily by 15+ engineers.
date: "2025-12-01"
tags: [claude, mcp, slack, agents, internal-tools]
featured: true
---

Built an autonomous AI operations agent for Mindlogic's engineering team. Non-developers can now query databases, create Jira tickets, check Sentry errors, and search code — all through natural Slack conversations.

## Capabilities

- **Database queries**: Natural language to SQL across production PostgreSQL
- **Jira operations**: Create, update, search tickets without leaving Slack
- **GitHub integration**: Code search, PR summaries, deployment status
- **Sentry debugging**: Error triage, stack trace analysis, impact assessment
- **AWS monitoring**: Service health checks, log queries

## Architecture

- Built on Claude with MCP (Model Context Protocol) for multi-service orchestration
- Custom skill routing system for domain-specific capabilities
- Multi-tier memory system (global, daily, per-user) for cross-session learning
- Plugin architecture (mindlogic-plugins) extending Claude Code capabilities
```

Create `content/projects/factchat.mdx`:

```mdx
---
title: FactChat
description: Enterprise AI chatbot platform serving 50+ university clients with RAG, credit metering, and multi-provider LLM gateway.
date: "2025-06-01"
tags: [llm, rag, saas, enterprise, fastapi]
featured: true
---

Led technical delivery of FactChat — Mindlogic's flagship B2B AI chatbot platform deployed across 50+ Korean universities including SNU, Sogang, and CNU.

## What I Built

- **Multi-provider LLM gateway**: OpenAI, Gemini, Anthropic with cost-aware model routing
- **Credit metering system**: Per-tenant usage tracking and billing
- **RAG pipeline**: Document ingestion, embedding, retrieval with quality monitoring
- **Memory architecture**: Long-term contextual memory with adaptive recall
- **PromptOps framework**: Hallucination detection, cost/latency monitoring, prompt versioning with CI/CD
```

Create `content/projects/youtube-pipeline.mdx`:

```mdx
---
title: YouTube Automation Pipeline
description: AI-powered content pipeline managing 20 YouTube channels with automated video generation.
date: "2025-09-01"
tags: [automation, youtube, ai, video]
featured: false
---

Built an end-to-end automation pipeline for managing 20 YouTube channels — from content ideation to video generation and publishing.
```

Create `content/projects/ecommerce.mdx`:

```mdx
---
title: E-commerce Business
description: Founded and scaled a premium barefoot walking goods business to ₩300M+ revenue in 1 year.
date: "2025-04-01"
tags: [entrepreneurship, ecommerce, marketing]
featured: false
---

Launched an e-commerce business offering premium barefoot walking goods tailored for customers aged 50+. Achieved ₩300M+ in revenue within 1 year, maintaining a 25%+ profit margin.

Built and managed the entire pipeline — from sourcing manufacturers in China to executing marketing campaigns and driving sales.
```

Create empty blog directory:

```bash
touch ~/Desktop/personal-site/content/blog/.gitkeep
```

**Step 3: Commit**

```bash
cd ~/Desktop/personal-site
git add content/
git commit -m "feat: add seed project content (5 projects)"
```

---

### Task 6: Build home page

**Files:**
- Modify: `app/page.tsx`

**Step 1: Build the home page**

Replace `app/page.tsx`:

```tsx
import Link from "next/link";
import { getFeaturedProjects, getBlogPosts } from "@/lib/content";

export default function Home() {
  const projects = getFeaturedProjects();
  const posts = getBlogPosts();

  return (
    <div>
      {/* Hero */}
      <section className="mb-16">
        <h1 className="text-3xl font-bold tracking-tight">Jaeho Shin</h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Engineering Director @ Mindlogic &middot; Founder @ VibeRick
        </p>
        <p className="mt-4 leading-relaxed text-neutral-700 dark:text-neutral-300">
          I build AI products that ship. Leading 15+ engineers across 3 AI products
          serving 50+ enterprise clients. Hackathon winner. Previously built a
          &#8361;300M business from scratch.
        </p>
        <div className="mt-4 flex gap-4 text-sm">
          <a href="https://github.com/jays0606" target="_blank" rel="noopener noreferrer" className="text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100">GitHub</a>
          <a href="https://linkedin.com/in/jays0606" target="_blank" rel="noopener noreferrer" className="text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100">LinkedIn</a>
          <a href="mailto:jaehoshin62@gmail.com" className="text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100">Email</a>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="mb-16">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Featured Projects</h2>
          <Link href="/projects" className="text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100">
            view all &rarr;
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group rounded-lg border border-neutral-200 p-4 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {project.frontmatter.title}
                </h3>
                {project.frontmatter.award && (
                  <span className="ml-2 shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                    {project.frontmatter.award.split("—")[0].trim()}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                {project.frontmatter.description}
              </p>
              <div className="mt-2 flex gap-2">
                {project.frontmatter.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs text-neutral-400 dark:text-neutral-500">
                    #{tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Posts */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Posts</h2>
          <Link href="/blog" className="text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100">
            view all &rarr;
          </Link>
        </div>
        {posts.length > 0 ? (
          <div className="flex flex-col gap-3">
            {posts.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex items-baseline justify-between"
              >
                <span className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {post.frontmatter.title}
                </span>
                <span className="ml-2 shrink-0 text-sm text-neutral-400">
                  {post.readingTime}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-neutral-400">Writing soon...</p>
        )}
      </section>
    </div>
  );
}
```

**Step 2: Verify home page renders with project cards**

```bash
cd ~/Desktop/personal-site && npm run dev
```

Expected: Home page with hero, 3 featured project cards, empty blog section.

**Step 3: Commit**

```bash
cd ~/Desktop/personal-site
git add app/page.tsx
git commit -m "feat: build home page with hero, featured projects, recent posts"
```

---

### Task 7: Build projects list page

**Files:**
- Create: `app/projects/page.tsx`

**Step 1: Create projects page**

Create `app/projects/page.tsx`:

```tsx
import Link from "next/link";
import { getProjects } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold tracking-tight">Projects</h1>
      <p className="mb-8 text-neutral-600 dark:text-neutral-400">
        Things I&apos;ve built — from hackathon winners to production platforms.
      </p>
      <div className="flex flex-col gap-4">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group rounded-lg border border-neutral-200 p-4 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
          >
            <div className="flex items-start justify-between">
              <h2 className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {project.frontmatter.title}
              </h2>
              <span className="ml-2 shrink-0 text-sm text-neutral-400">
                {new Date(project.frontmatter.date).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
              </span>
            </div>
            {project.frontmatter.award && (
              <span className="mt-1 inline-block rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                {project.frontmatter.award}
              </span>
            )}
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              {project.frontmatter.description}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.frontmatter.tags.map((tag) => (
                <span key={tag} className="text-xs text-neutral-400 dark:text-neutral-500">#{tag}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
cd ~/Desktop/personal-site
git add app/projects/page.tsx
git commit -m "feat: add projects list page"
```

---

### Task 8: Build project detail page (MDX rendering)

**Files:**
- Create: `app/projects/[slug]/page.tsx`
- Create: `components/mdx-content.tsx`

**Step 1: Create MDX renderer component**

Create `components/mdx-content.tsx`:

```tsx
import { MDXRemote } from "next-mdx-remote/rsc";

export function MDXContent({ source }: { source: string }) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <MDXRemote source={source} />
    </div>
  );
}
```

**Step 2: Create project detail page**

Create `app/projects/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjects, getContentBySlug, type ProjectFrontmatter } from "@/lib/content";
import { MDXContent } from "@/components/mdx-content";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getContentBySlug<ProjectFrontmatter>("projects", slug);
  if (!project) return {};
  return { title: project.frontmatter.title, description: project.frontmatter.description };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getContentBySlug<ProjectFrontmatter>("projects", slug);
  if (!project) notFound();

  const { frontmatter, content } = project;

  return (
    <article>
      <Link href="/projects" className="mb-8 inline-block text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100">
        &larr; projects
      </Link>
      <h1 className="text-2xl font-bold tracking-tight">{frontmatter.title}</h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">{frontmatter.description}</p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <span className="text-sm text-neutral-400">
          {new Date(frontmatter.date).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
        </span>
        {frontmatter.award && (
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
            {frontmatter.award}
          </span>
        )}
        {frontmatter.link && (
          <a href={frontmatter.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
            View Source &rarr;
          </a>
        )}
      </div>
      <hr className="my-8 border-neutral-200 dark:border-neutral-800" />
      <MDXContent source={content} />
    </article>
  );
}
```

**Step 3: Verify project detail page renders MDX**

```bash
cd ~/Desktop/personal-site && npm run dev
```

Navigate to http://localhost:3000/projects/mangstoon-ai — should render full MDX content with prose styling.

**Step 4: Commit**

```bash
cd ~/Desktop/personal-site
git add components/mdx-content.tsx app/projects/\[slug\]/page.tsx
git commit -m "feat: add project detail page with MDX rendering"
```

---

### Task 9: Build blog list page and blog detail page

**Files:**
- Create: `app/blog/page.tsx`
- Create: `app/blog/[slug]/page.tsx`

**Step 1: Create blog list page**

Create `app/blog/page.tsx`:

```tsx
import Link from "next/link";
import { getBlogPosts } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold tracking-tight">Blog</h1>
      <p className="mb-8 text-neutral-600 dark:text-neutral-400">
        Thoughts on AI, engineering, and building things.
      </p>
      {posts.length > 0 ? (
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <div className="flex items-baseline justify-between">
                <h2 className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {post.frontmatter.title}
                </h2>
                <span className="ml-2 shrink-0 text-sm text-neutral-400">
                  {new Date(post.frontmatter.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                </span>
              </div>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                {post.frontmatter.description}
              </p>
              <span className="mt-1 text-xs text-neutral-400">{post.readingTime}</span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-neutral-400">Writing soon...</p>
      )}
    </div>
  );
}
```

**Step 2: Create blog detail page**

Create `app/blog/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPosts, getContentBySlug, type BlogFrontmatter } from "@/lib/content";
import { MDXContent } from "@/components/mdx-content";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getContentBySlug<BlogFrontmatter>("blog", slug);
  if (!post) return {};
  return { title: post.frontmatter.title, description: post.frontmatter.description };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getContentBySlug<BlogFrontmatter>("blog", slug);
  if (!post) notFound();

  const { frontmatter, content, readingTime } = post;

  return (
    <article>
      <Link href="/blog" className="mb-8 inline-block text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100">
        &larr; blog
      </Link>
      <h1 className="text-2xl font-bold tracking-tight">{frontmatter.title}</h1>
      <div className="mt-2 flex gap-3 text-sm text-neutral-400">
        <span>{new Date(frontmatter.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
        <span>&middot;</span>
        <span>{readingTime}</span>
      </div>
      <hr className="my-8 border-neutral-200 dark:border-neutral-800" />
      <MDXContent source={content} />
    </article>
  );
}
```

**Step 3: Commit**

```bash
cd ~/Desktop/personal-site
git add app/blog/
git commit -m "feat: add blog list and detail pages"
```

---

### Task 10: Build about page

**Files:**
- Create: `app/about/page.tsx`
- Copy: `~/Desktop/profile.jpeg` to `public/profile.jpeg`

**Step 1: Copy profile photo**

```bash
cp ~/Desktop/profile.jpeg ~/Desktop/personal-site/public/profile.jpeg
```

**Step 2: Create about page**

Create `app/about/page.tsx`:

```tsx
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

const experience = [
  {
    title: "Engineering Director (이사)",
    company: "Mindlogic Inc.",
    period: "Mar 2022 — Present",
    description: "Leading 15+ engineers across 3 AI products (FactChat, Blooming, Informe) serving 50+ enterprise clients. Promoted to director with 0.3% equity.",
  },
  {
    title: "Founder",
    company: "VibeRick",
    description: "Software company building AI-powered tools and services.",
  },
  {
    title: "CEO",
    company: "E-commerce Business",
    period: "Apr 2024 — Apr 2025",
    description: "Built a premium barefoot walking goods business to ₩300M+ revenue in 1 year with 25%+ margins.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <div className="mb-8 flex items-start gap-6">
        <Image
          src="/profile.jpeg"
          alt="Jaeho Shin"
          width={80}
          height={80}
          className="rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">About</h1>
          <p className="mt-1 text-neutral-600 dark:text-neutral-400">
            Engineering Director. Builder. Occasional entrepreneur.
          </p>
        </div>
      </div>

      <div className="space-y-4 leading-relaxed text-neutral-700 dark:text-neutral-300">
        <p>
          I&apos;m an Engineering Director at Mindlogic in Seoul, where I lead a team of 15+
          engineers building AI products for enterprise clients. Our chatbot platform serves
          50+ Korean universities.
        </p>
        <p>
          I care about shipping AI that actually works in production — not demos.
          That means obsessing over latency, hallucination reduction, cost optimization,
          and building the tooling that makes the whole team faster.
        </p>
        <p>
          Outside of work, I&apos;ve won 3rd place solo at Google&apos;s Gemini 3 Hackathon (against 111 teams),
          built a ₩300M e-commerce business, and run 20 YouTube channels with AI automation.
        </p>
      </div>

      <h2 className="mb-4 mt-12 text-lg font-semibold">Experience</h2>
      <div className="flex flex-col gap-6">
        {experience.map((exp) => (
          <div key={exp.title + exp.company}>
            <div className="flex items-baseline justify-between">
              <h3 className="font-medium">{exp.title}</h3>
              {exp.period && <span className="ml-2 shrink-0 text-sm text-neutral-400">{exp.period}</span>}
            </div>
            <p className="text-sm text-neutral-500">{exp.company}</p>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{exp.description}</p>
          </div>
        ))}
      </div>

      <h2 className="mb-4 mt-12 text-lg font-semibold">Get in touch</h2>
      <div className="flex gap-4 text-sm">
        <a href="https://github.com/jays0606" target="_blank" rel="noopener noreferrer" className="text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100">GitHub</a>
        <a href="https://linkedin.com/in/jays0606" target="_blank" rel="noopener noreferrer" className="text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100">LinkedIn</a>
        <a href="mailto:jaehoshin62@gmail.com" className="text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100">Email</a>
      </div>
    </div>
  );
}
```

**Step 3: Commit**

```bash
cd ~/Desktop/personal-site
git add app/about/page.tsx public/profile.jpeg
git commit -m "feat: add about page with experience timeline"
```

---

### Task 11: Add dark mode toggle

**Files:**
- Create: `components/theme-toggle.tsx`
- Modify: `app/layout.tsx` (add toggle + script)

**Step 1: Create theme toggle**

Create `components/theme-toggle.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
    >
      {dark ? "☀" : "☽"}
    </button>
  );
}
```

**Step 2: Add theme initialization script to layout.tsx**

Add before `</head>` (or in `<html>` via `suppressHydrationWarning`):

In `app/layout.tsx`, add to `<html>`: `suppressHydrationWarning`

Add a `<script>` in the `<head>` for theme init:

```tsx
<script
  dangerouslySetInnerHTML={{
    __html: `
      (function() {
        var t = localStorage.getItem('theme');
        if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark');
        }
      })();
    `,
  }}
/>
```

Add `<ThemeToggle />` to the Nav component.

**Step 3: Commit**

```bash
cd ~/Desktop/personal-site
git add components/theme-toggle.tsx components/nav.tsx app/layout.tsx
git commit -m "feat: add dark mode toggle with system preference detection"
```

---

### Task 12: Add footer

**Files:**
- Create: `components/footer.tsx`
- Modify: `app/layout.tsx`

**Step 1: Create footer**

Create `components/footer.tsx`:

```tsx
export function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-200 pt-8 pb-16 text-sm text-neutral-400 dark:border-neutral-800">
      <p>&copy; {new Date().getFullYear()} Jaeho Shin</p>
    </footer>
  );
}
```

**Step 2: Add Footer to layout.tsx**

Import and add `<Footer />` after `{children}` inside `<main>`.

**Step 3: Commit**

```bash
cd ~/Desktop/personal-site
git add components/footer.tsx app/layout.tsx
git commit -m "feat: add footer component"
```

---

### Task 13: Build, test, and deploy

**Step 1: Run production build**

```bash
cd ~/Desktop/personal-site && npm run build
```

Expected: Build succeeds with all pages statically generated.

**Step 2: Test locally**

```bash
cd ~/Desktop/personal-site && npm start
```

Verify all pages work: /, /about, /projects, /projects/mangstoon-ai, /blog

**Step 3: Push to GitHub**

```bash
cd ~/Desktop/personal-site
gh repo create personal-site --public --source=. --push
```

**Step 4: Deploy to Vercel**

```bash
cd ~/Desktop/personal-site
npx vercel --yes
```

Or connect GitHub repo to Vercel dashboard for auto-deploy.

**Step 5: Commit any final fixes**

```bash
cd ~/Desktop/personal-site
git add -A
git commit -m "chore: production build verified, ready for deployment"
```

---

## Summary

| Task | What | Est. Time |
|------|------|-----------|
| 1 | Scaffold Next.js project | 3 min |
| 2 | Tailwind + fonts + globals | 5 min |
| 3 | Navigation component | 3 min |
| 4 | MDX content utilities | 5 min |
| 5 | Seed project content | 10 min |
| 6 | Home page | 5 min |
| 7 | Projects list page | 3 min |
| 8 | Project detail + MDX rendering | 5 min |
| 9 | Blog list + detail pages | 5 min |
| 10 | About page | 5 min |
| 11 | Dark mode toggle | 3 min |
| 12 | Footer | 2 min |
| 13 | Build + deploy | 5 min |
| **Total** | | **~60 min** |
