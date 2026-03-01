# Bento Grid Portfolio Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the current Brittany Chiang split-layout with a full dark bento grid homepage, add profile photo, new projects from GitHub, blog placeholders, education, hidden resume page, and sanitize private info.

**Architecture:** Single-page bento grid using CSS Grid (12-column) with responsive breakpoints. Cards are reusable components. Content stays in MDX files. New `components/bento-card.tsx` wraps shared card styling. Homepage (`app/page.tsx`) is fully rewritten. Subpages (projects, blog) remain largely the same.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, MDX via next-mdx-remote, no new dependencies.

---

### Task 1: Copy profile photo + add new project MDX files

**Files:**
- Copy: `/Users/jaehoshin/Desktop/personal/IMG_8137.jpg` → `public/profile-hero.jpg`
- Create: `content/projects/mediapipe-facelandmark.mdx`
- Create: `content/projects/3d-avatar-controller.mdx`
- Create: `content/projects/vtuber-studio.mdx`

**Step 1: Copy the profile photo**

```bash
cp /Users/jaehoshin/Desktop/personal/IMG_8137.jpg /Users/jaehoshin/Desktop/personal-site/public/profile-hero.jpg
```

**Step 2: Create mediapipe-facelandmark.mdx**

```mdx
---
title: Mediapipe FaceLandmark Demo
description: Real-time face landmark detection demo built with Mediapipe and TypeScript. 114+ stars on GitHub.
date: "2023-06-01"
tags: [mediapipe, typescript, three.js, computer-vision, webgl]
featured: true
link: https://github.com/jays0606/mediapipe-facelandmark-demo
demo: https://mediapipe-facelandmark-demo.vercel.app
---

Real-time browser-based face landmark detection using Google's Mediapipe FaceLandmarker API. Renders 468 facial landmarks with live webcam feed.

## Features

- Real-time face landmark detection in the browser
- 468 facial landmarks rendered on a 3D mesh
- Built with TypeScript and deployed on Vercel
- No backend required — runs entirely client-side

## Technical Details

- **Detection**: Mediapipe FaceLandmarker with WebAssembly backend
- **Rendering**: Canvas 2D overlay on webcam feed
- **Performance**: 30+ FPS on modern browsers
- **Deployment**: Static site on Vercel, zero server costs
```

**Step 3: Create 3d-avatar-controller.mdx**

```mdx
---
title: 3D Avatar Controller
description: Interactive 3D avatar controller playground using Three.js and React Three Fiber.
date: "2023-03-01"
tags: [three.js, react-three-fiber, 3d, typescript, webgl]
featured: true
link: https://github.com/jays0606/3d-avatar-controller
demo: https://3d-avatar-controller.vercel.app
---

A playground for controlling 3D GLTF avatars in the browser using keyboard inputs and physics-based movement.

## Features

- Load and animate GLTF/GLB 3D models in the browser
- Keyboard-controlled avatar movement with physics
- Camera follow system with smooth interpolation
- Built with React Three Fiber and Three.js

## Technical Details

- **3D Engine**: Three.js via React Three Fiber
- **Physics**: Basic collision detection and movement
- **Models**: GLTF format with animation support
- **Controls**: WASD keyboard input with camera follow
```

**Step 4: Create vtuber-studio.mdx**

```mdx
---
title: Opentown Vtuber Studio
description: Real-time full-body motion tracking for 3D VTuber avatars with facial expression capture.
date: "2023-01-01"
tags: [computer-vision, three.js, mediapipe, motion-capture, vtuber]
featured: false
---

Built a real-time VTuber studio that captures full-body motion and facial expressions, mapping them onto 3D avatars for live streaming.

## Features

- Full-body motion tracking using Mediapipe Pose
- Facial expression capture and blendshape mapping
- Real-time 3D avatar animation
- Low-latency streaming output

## Technical Details

- **Pose Estimation**: Mediapipe Pose + Hands + Face
- **Avatar System**: Three.js with VRM model support
- **Blendshapes**: 52 ARKit-compatible facial blendshapes
- **Performance**: Optimized for real-time streaming at 30 FPS
```

**Step 5: Verify files exist**

```bash
ls -la public/profile-hero.jpg content/projects/mediapipe-facelandmark.mdx content/projects/3d-avatar-controller.mdx content/projects/vtuber-studio.mdx
```

**Step 6: Commit**

```bash
git add public/profile-hero.jpg content/projects/mediapipe-facelandmark.mdx content/projects/3d-avatar-controller.mdx content/projects/vtuber-studio.mdx
git commit -m "feat: add profile photo and 3 new project MDX files"
```

---

### Task 2: Create blog post placeholders

**Files:**
- Create: `content/blog/claude-code-adoption.mdx`
- Create: `content/blog/ai-ops-agents-mcp.mdx`
- Create: `content/blog/gemini-hackathon-solo.mdx`

**Step 1: Create claude-code-adoption.mdx**

```mdx
---
title: "Driving Claude Code Adoption Across 15 Engineers"
description: "How we went from zero to full-team Claude Code usage in 3 months — tooling, workflows, and lessons learned."
date: "2026-03-01"
tags: [claude-code, ai-tools, engineering-culture, developer-experience]
---

How we went from zero to full-team Claude Code usage in 3 months at Mindlogic. What worked, what didn't, and the workflows that stuck.

## Why We Switched

Our team was already using GitHub Copilot, but the agentic workflow of Claude Code — multi-file edits, terminal access, context-aware refactoring — changed how we approach feature development.

## The Rollout

*Coming soon — this post is in progress.*
```

**Step 2: Create ai-ops-agents-mcp.mdx**

```mdx
---
title: "Building Autonomous AI Ops Agents with MCP"
description: "How we built an AI agent that integrates Slack, Jira, GitHub, and Sentry — used daily by 15+ engineers."
date: "2026-02-15"
tags: [mcp, claude, agents, slack, devops]
---

Our AI operations agent sits in Slack and handles daily engineering workflows — from triaging Sentry errors to updating Jira tickets to querying production databases. Here's how we built it.

## Architecture

The agent uses Claude with MCP (Model Context Protocol) to connect to multiple external services through a unified tool interface.

*Coming soon — this post is in progress.*
```

**Step 3: Create gemini-hackathon-solo.mdx**

```mdx
---
title: "Solo vs 111 Teams: Lessons from Gemini 3 Seoul Hackathon"
description: "How I won 3rd place competing alone against 111 teams of up to 4 people at Google's Gemini hackathon."
date: "2026-02-28"
tags: [hackathon, gemini, google-adk, solo, competition]
---

I entered Google's Gemini 3 Seoul Hackathon solo — no teammates, just me and an idea. Against 111 teams (max 4 per team), I walked away with 3rd place and $20K in credits. Here's what I learned.

## The Strategy

When you're competing alone against teams of 4, you can't outwork them. You have to out-focus them.

*Coming soon — this post is in progress.*
```

**Step 4: Commit**

```bash
git add content/blog/
git commit -m "feat: add 3 blog post placeholders"
```

---

### Task 3: Sanitize experience data + add education and intern role

This task rewrites the experience data in `app/page.tsx` to remove private info (equity %, funding amounts, revenue) and add the missing intern role and education.

**Files:**
- Modify: `app/page.tsx` (experience array, lines 7-42)

**Step 1: Replace the experience array**

Replace the current `experience` array (lines 7-42) with this sanitized version:

```typescript
const experience = [
  {
    period: "2025 — Present",
    title: "Engineering Director (이사)",
    company: "Mindlogic Inc.",
    companyUrl: "https://mindlogic.ai",
    description:
      "Leading 15+ engineers across 3 AI product lines serving 50+ enterprise clients. Driving org-wide AI-assisted development adoption with Claude Code, building autonomous AI operations agents via MCP, and coordinating government R&D proposals.",
    tech: ["Python", "TypeScript", "Claude Code", "Google ADK", "MCP", "FastAPI", "GCP"],
  },
  {
    period: "2022 — 2025",
    title: "Tech Lead / Lead AI Engineer",
    company: "Mindlogic Inc.",
    companyUrl: "https://mindlogic.ai",
    description:
      "Led AI-Idol persona chatbots for immersive fan experiences. Architected multilingual AI-ARS with sub-2s real-time phone interactions. Built PromptOps framework for hallucination detection and prompt versioning. Optimized chat backend reducing latency 80% under 50+ concurrent requests.",
    tech: ["Python", "FastAPI", "PyTorch", "React", "Docker", "AWS"],
  },
  {
    period: "2024 — 2025",
    title: "CEO & Founder",
    company: "E-commerce Business",
    description:
      "Launched and scaled a premium barefoot walking goods business, building an end-to-end pipeline from sourcing manufacturers to marketing and sales.",
    tech: ["Entrepreneurship", "Supply Chain", "Marketing"],
  },
  {
    period: "2021 — 2022",
    title: "Software Engineer",
    company: "Common Computer Inc.",
    description:
      "Architected Docker containers for chat applications, facilitating efficient queries to blockchain transactions.",
    tech: ["Docker", "Node.js", "Blockchain"],
  },
  {
    period: "2020 — 2021",
    title: "Computer Vision Engineer Intern",
    company: "Mindlogic Inc.",
    companyUrl: "https://mindlogic.ai",
    description:
      "Developed facial applications including style transfer, frontalization, and expression manipulation using deep learning.",
    tech: ["Python", "PyTorch", "Computer Vision", "Deep Learning"],
  },
];

const education = {
  school: "Yonsei University",
  degree: "B.S. Electricity & Electrical Engineering",
  period: "2017 — 2021",
  location: "Seoul, South Korea",
};
```

**Step 2: Verify the dev server still works**

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
```
Expected: `200`

**Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: sanitize experience data, add intern role and education"
```

---

### Task 4: Create BentoCard component

**Files:**
- Create: `components/bento-card.tsx`

**Step 1: Create the component**

```tsx
import { type ReactNode } from "react";

type BentoCardProps = {
  children: ReactNode;
  className?: string;
  href?: string;
};

export function BentoCard({ children, className = "", href }: BentoCardProps) {
  const cardClasses = `group relative rounded-2xl border border-slate-800/50 bg-slate-900/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/20 hover:bg-slate-800/40 ${className}`;

  if (href) {
    if (href.startsWith("http")) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cardClasses}>
          {children}
        </a>
      );
    }
    const Link = require("next/link").default;
    return (
      <Link href={href} className={cardClasses}>
        {children}
      </Link>
    );
  }

  return <div className={cardClasses}>{children}</div>;
}
```

**Step 2: Commit**

```bash
git add components/bento-card.tsx
git commit -m "feat: add BentoCard component"
```

---

### Task 5: Update globals.css for bento grid

**Files:**
- Modify: `app/globals.css`

**Step 1: Add bento grid CSS after the existing styles**

Append after the existing `.delay-500` rule (line 151):

```css

/* ─── Bento Grid ─── */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
}

@media (max-width: 1023px) {
  .bento-grid {
    grid-template-columns: repeat(8, 1fr);
  }
}

@media (max-width: 639px) {
  .bento-grid {
    grid-template-columns: 1fr;
  }
}

/* Scroll-triggered fade in */
.bento-card-animate {
  opacity: 0;
  transform: translateY(1rem);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.bento-card-animate.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Spotlight project card shimmer on award badge */
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.award-shimmer {
  background: linear-gradient(90deg, #fbbf24, #f59e0b, #fbbf24, #f59e0b);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 3s linear infinite;
}
```

**Step 2: Commit**

```bash
git add app/globals.css
git commit -m "feat: add bento grid CSS and animations"
```

---

### Task 6: Create FadeIn scroll animation component

**Files:**
- Create: `components/fade-in.tsx`

**Step 1: Create the component**

```tsx
"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function FadeIn({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("visible"), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`bento-card-animate ${className}`}>
      {children}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add components/fade-in.tsx
git commit -m "feat: add FadeIn scroll animation component"
```

---

### Task 7: Rewrite homepage as bento grid

This is the main task. Fully rewrite `app/page.tsx` to use the bento grid layout.

**Files:**
- Rewrite: `app/page.tsx`

**Step 1: Write the new homepage**

The new `app/page.tsx` should contain:

```tsx
import Image from "next/image";
import Link from "next/link";
import { getFeaturedProjects, getBlogPosts } from "@/lib/content";
import { Spotlight } from "@/components/spotlight";
import { BentoCard } from "@/components/bento-card";
import { FadeIn } from "@/components/fade-in";

const experience = [
  {
    period: "2025 — Present",
    title: "Engineering Director (이사)",
    company: "Mindlogic Inc.",
    companyUrl: "https://mindlogic.ai",
    description:
      "Leading 15+ engineers across 3 AI product lines serving 50+ enterprise clients. Driving org-wide AI-assisted development adoption with Claude Code, building autonomous AI operations agents via MCP, and coordinating government R&D proposals.",
    tech: ["Python", "TypeScript", "Claude Code", "Google ADK", "MCP", "FastAPI", "GCP"],
  },
  {
    period: "2022 — 2025",
    title: "Tech Lead / Lead AI Engineer",
    company: "Mindlogic Inc.",
    companyUrl: "https://mindlogic.ai",
    description:
      "Led AI-Idol persona chatbots for immersive fan experiences. Architected multilingual AI-ARS with sub-2s real-time phone interactions. Built PromptOps for hallucination detection and prompt versioning. Optimized chat backend reducing latency 80%.",
    tech: ["Python", "FastAPI", "PyTorch", "React", "Docker", "AWS"],
  },
  {
    period: "2024 — 2025",
    title: "CEO & Founder",
    company: "E-commerce Business",
    description:
      "Launched and scaled a premium barefoot walking goods business, building the full pipeline from sourcing to marketing.",
    tech: ["Entrepreneurship", "Supply Chain", "Marketing"],
  },
  {
    period: "2021 — 2022",
    title: "Software Engineer",
    company: "Common Computer Inc.",
    description:
      "Architected Docker containers for chat applications, facilitating efficient queries to blockchain transactions.",
    tech: ["Docker", "Node.js", "Blockchain"],
  },
  {
    period: "2020 — 2021",
    title: "Computer Vision Engineer Intern",
    company: "Mindlogic Inc.",
    companyUrl: "https://mindlogic.ai",
    description:
      "Developed facial applications including style transfer, frontalization, and expression manipulation.",
    tech: ["Python", "PyTorch", "Computer Vision"],
  },
];

const keywords = [
  "LLMs", "Claude Code", "Google ADK", "MCP", "Agents",
  "Real-time AI", "Evaluation", "RAG", "Prompt Engineering",
  "FastAPI", "Python", "TypeScript", "Three.js", "Computer Vision",
];

export default function Home() {
  const featuredProjects = getFeaturedProjects();
  const blogPosts = getBlogPosts();

  // Separate MangstoonAI as spotlight
  const spotlightProject = featuredProjects.find((p) => p.slug === "mangstoon-ai");
  const otherProjects = featuredProjects.filter((p) => p.slug !== "mangstoon-ai");

  return (
    <>
      <Spotlight />
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-20 lg:px-8 lg:py-24">
        {/* ─── Row 1: Hero + Photo ─── */}
        <div className="bento-grid">
          <FadeIn className="col-span-full lg:col-span-8">
            <BentoCard className="flex flex-col justify-between min-h-[280px]">
              <div>
                <h1
                  className="text-4xl font-extrabold tracking-tight text-slate-200 sm:text-5xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Jaeho Shin
                </h1>
                <p
                  className="mt-2 text-lg font-medium text-slate-300"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Engineering Director @ Mindlogic
                </p>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-400">
                  I ship AI that works — not demos. From hackathon prototypes to platforms serving 50+ enterprise clients in production.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-5">
                {[
                  { label: "GitHub", href: "https://github.com/jays0606", icon: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" },
                  { label: "LinkedIn", href: "https://linkedin.com/in/jays0606", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                  { label: "Email", href: "mailto:jaehoshin62@gmail.com", icon: null },
                ].map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    aria-label={label}
                    className="text-slate-500 transition-colors hover:text-slate-200"
                  >
                    {icon ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                        <path d={icon} />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </BentoCard>
          </FadeIn>

          <FadeIn className="col-span-full lg:col-span-4" delay={100}>
            <BentoCard className="overflow-hidden p-0 h-full min-h-[280px]">
              <Image
                src="/profile-hero.jpg"
                alt="Jaeho Shin in DUMBO, Brooklyn"
                width={400}
                height={500}
                className="h-full w-full object-cover object-[center_25%]"
                priority
              />
            </BentoCard>
          </FadeIn>

          {/* ─── Row 2: Keywords + Currently + Connect ─── */}
          <FadeIn className="col-span-full sm:col-span-4 lg:col-span-4" delay={150}>
            <BentoCard>
              <h2 className="section-heading mb-4">What I Build</h2>
              <div className="flex flex-wrap gap-2">
                {keywords.map((kw) => (
                  <span key={kw} className="tech-pill">{kw}</span>
                ))}
              </div>
            </BentoCard>
          </FadeIn>

          <FadeIn className="col-span-full sm:col-span-4 lg:col-span-4" delay={200}>
            <BentoCard>
              <h2 className="section-heading mb-4">Currently</h2>
              <p className="text-sm leading-relaxed text-slate-300">
                Building autonomous AI operations agents with MCP & Claude at Mindlogic.
                Driving Claude Code adoption across 15+ engineers.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Founded{" "}
                <a href="https://viberick.com" target="_blank" rel="noopener noreferrer" className="font-medium text-cyan-300 hover:text-cyan-200 transition-colors">
                  VibeRick
                </a>
                {" "}— building AI-powered tools.
              </p>
            </BentoCard>
          </FadeIn>

          <FadeIn className="col-span-full sm:col-span-4 lg:col-span-4" delay={250}>
            <BentoCard>
              <h2 className="section-heading mb-4">Connect</h2>
              <div className="space-y-2 text-sm">
                <p className="text-slate-300">Seoul, South Korea</p>
                <p className="text-slate-400">Yonsei University — B.S. EE</p>
                <p className="text-slate-400">Korean · English · Chinese</p>
              </div>
            </BentoCard>
          </FadeIn>

          {/* ─── Row 3: Spotlight Project ─── */}
          {spotlightProject && (
            <FadeIn className="col-span-full" delay={300}>
              <Link href={`/projects/${spotlightProject.slug}`}>
                <BentoCard className="border-cyan-400/10 bg-gradient-to-br from-slate-900/80 to-slate-800/40">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h2 className="text-xl font-bold text-slate-200 group-hover:text-cyan-300 transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                          {spotlightProject.frontmatter.title}
                        </h2>
                        <span className="award-badge">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                            <path fillRule="evenodd" d="M10 1a.75.75 0 01.65.38l2.15 3.7 4.1.72a.75.75 0 01.42 1.26L14.35 10l.7 4.08a.75.75 0 01-1.09.79L10 12.72l-3.96 2.15a.75.75 0 01-1.09-.79l.7-4.08L2.68 7.06a.75.75 0 01.42-1.26l4.1-.72 2.15-3.7A.75.75 0 0110 1z" clipRule="evenodd" />
                          </svg>
                          3rd Place — $20K Credits
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-medium text-slate-400">
                        Google Gemini 3 Seoul Hackathon · Solo entry vs 111 teams
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-slate-300">
                        {spotlightProject.frontmatter.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {spotlightProject.frontmatter.tags.map((tag) => (
                          <span key={tag} className="tech-pill">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium text-cyan-300 group-hover:text-cyan-200 transition-colors shrink-0">
                      View Project
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 transition-transform group-hover:translate-x-1">
                        <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </BentoCard>
              </Link>
            </FadeIn>
          )}

          {/* ─── Row 4: Other Projects ─── */}
          {otherProjects.map((project, i) => (
            <FadeIn key={project.slug} className="col-span-full sm:col-span-4 lg:col-span-4" delay={350 + i * 50}>
              <Link href={`/projects/${project.slug}`} className="block h-full">
                <BentoCard className="h-full flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-slate-200 group-hover:text-cyan-300 transition-colors">
                      {project.frontmatter.title}
                    </h3>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0 text-slate-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300">
                      <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                    </svg>
                  </div>
                  {project.frontmatter.award && (
                    <span className="award-badge mt-2 self-start text-[0.625rem]">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                        <path fillRule="evenodd" d="M10 1a.75.75 0 01.65.38l2.15 3.7 4.1.72a.75.75 0 01.42 1.26L14.35 10l.7 4.08a.75.75 0 01-1.09.79L10 12.72l-3.96 2.15a.75.75 0 01-1.09-.79l.7-4.08L2.68 7.06a.75.75 0 01.42-1.26l4.1-.72 2.15-3.7A.75.75 0 0110 1z" clipRule="evenodd" />
                      </svg>
                      {project.frontmatter.award.split("—")[0].trim()}
                    </span>
                  )}
                  <p className="mt-2 flex-1 text-sm leading-relaxed">{project.frontmatter.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.frontmatter.tags.map((tag) => (
                      <span key={tag} className="tech-pill text-[0.625rem]">{tag}</span>
                    ))}
                  </div>
                </BentoCard>
              </Link>
            </FadeIn>
          ))}

          {/* ─── Row 5: Experience ─── */}
          <FadeIn className="col-span-full lg:col-span-8" delay={500}>
            <BentoCard>
              <h2 className="section-heading mb-6">Experience</h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.title + exp.company} className="flex flex-col gap-1 sm:flex-row sm:gap-6">
                    <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:w-28 sm:pt-0.5">
                      {exp.period}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-slate-200">
                        {exp.title} · {exp.companyUrl ? (
                          <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition-colors">
                            {exp.company}
                          </a>
                        ) : exp.company}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-slate-400">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </BentoCard>
          </FadeIn>

          <FadeIn className="col-span-full lg:col-span-4" delay={550}>
            <Link href="/projects" className="block h-full">
              <BentoCard className="h-full flex flex-col items-center justify-center text-center">
                <p className="text-3xl font-bold text-slate-200" style={{ fontFamily: "var(--font-display)" }}>
                  8+
                </p>
                <p className="mt-1 text-sm text-slate-400">Projects</p>
                <p className="mt-4 text-sm font-medium text-cyan-300 group-hover:text-cyan-200 transition-colors inline-flex items-center gap-1">
                  View All
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 transition-transform group-hover:translate-x-1">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </p>
              </BentoCard>
            </Link>
          </FadeIn>

          {/* ─── Row 6: Writing ─── */}
          <FadeIn className="col-span-full" delay={600}>
            <BentoCard>
              <div className="flex items-center justify-between mb-6">
                <h2 className="section-heading">Writing</h2>
                <Link href="/blog" className="text-xs font-medium text-cyan-300 hover:text-cyan-200 transition-colors">
                  View All →
                </Link>
              </div>
              {blogPosts.length > 0 ? (
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group/post flex items-baseline justify-between gap-4 rounded-lg p-3 -mx-3 transition-colors hover:bg-slate-800/30"
                    >
                      <h3 className="text-sm font-medium text-slate-300 group-hover/post:text-cyan-300 transition-colors">
                        {post.frontmatter.title}
                      </h3>
                      <span className="shrink-0 text-xs text-slate-500">
                        {new Date(post.frontmatter.date).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">Writing soon...</p>
              )}
            </BentoCard>
          </FadeIn>

          {/* ─── Row 7: Footer ─── */}
          <div className="col-span-full mt-4 pb-8 text-center text-sm text-slate-500">
            <p>
              Built with{" "}
              <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-300 transition-colors">Next.js</a>
              {" "}and{" "}
              <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-300 transition-colors">Tailwind CSS</a>
              . Seoul, Korea.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
```

**Step 2: Verify the dev server renders correctly**

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
```
Expected: `200`

**Step 3: Visually verify with Playwright**

Open `http://localhost:3000` in browser, take a full-page screenshot, verify the bento grid renders correctly on desktop.

**Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: rewrite homepage as bento grid layout"
```

---

### Task 8: Create hidden resume page

**Files:**
- Create: `content/resume.mdx`
- Create: `app/resume/page.tsx`

**Step 1: Create resume MDX content**

Create `content/resume.mdx`:

```mdx
---
title: Resume
---

# Jaeho Shin

**Engineering Director** · Seoul, South Korea
jaehoshin62@gmail.com · [github.com/jays0606](https://github.com/jays0606) · [linkedin.com/in/jays0606](https://linkedin.com/in/jays0606)

---

## Summary

Engineering Director with 4+ years building production-grade AI applications. Leading 15+ engineers at Mindlogic, serving 50+ enterprise clients. Specializing in LLM applications, real-time AI services, and developer tooling. Google Gemini Hackathon award winner.

---

## Experience

### Engineering Director (이사) — Mindlogic Inc.
**2025 – Present** · Seoul, S. Korea

- Leading 15+ engineers across 3 AI product lines serving 50+ enterprise clients
- Driving org-wide Claude Code adoption and AI-assisted development workflows
- Building autonomous AI operations agents integrating Slack, Jira, GitHub, Sentry via MCP
- Coordinating government R&D proposals with ETRI

### Tech Lead / Lead AI Engineer — Mindlogic Inc.
**2022 – 2025** · Seoul, S. Korea

- Led AI-Idol persona chatbots for immersive fan experiences
- Architected multilingual AI-ARS with sub-2s real-time phone interactions
- Built PromptOps framework for hallucination detection, cost/latency monitoring, and prompt versioning
- Optimized chat backend reducing latency 80% under 50+ concurrent requests
- Launched Opentown Vtuber Studio for real-time full-body motion tracking

### CEO & Founder — E-commerce Business
**2024 – 2025** · Seoul, S. Korea

- Launched and scaled a premium barefoot walking goods business
- Built end-to-end pipeline from sourcing manufacturers to marketing and sales

### Software Engineer — Common Computer Inc.
**2021 – 2022** · Seoul, S. Korea

- Architected Docker containers for chat applications with blockchain transaction queries

### Computer Vision Engineer Intern — Mindlogic Inc.
**2020 – 2021** · Seoul, S. Korea

- Developed facial applications: style transfer, frontalization, expression manipulation

---

## Education

### Yonsei University
**B.S. Electricity & Electrical Engineering** · 2017 – 2021 · Seoul, S. Korea

---

## Skills

**Languages:** Python, TypeScript, JavaScript
**Frameworks:** PyTorch, FastAPI, React, Three.js, Next.js
**AI/ML:** LLMs, RAG, Prompt Engineering, Computer Vision, MCP, Google ADK, Claude
**Tools:** Docker, Git, AWS, GCP
**Languages:** Korean (Native), English (Fluent), Chinese (Basic)

---

## Selected Projects

- **MangstoonAI** — 3rd Place, Google Gemini 3 Seoul Hackathon ($20K credits). Solo entry vs 111 teams.
- **Mediapipe FaceLandmark Demo** — 114+ stars on GitHub. Real-time face detection in browser.
- **AI Operations Agent** — Autonomous Slack bot used daily by 15+ engineers.
- **FactChat** — Enterprise AI chatbot serving 50+ university clients.
```

**Step 2: Create resume page**

Create `app/resume/page.tsx`:

```tsx
import { Spotlight } from "@/components/spotlight";
import { MDXContent } from "@/components/mdx-content";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  robots: { index: false, follow: false },
};

export default function ResumePage() {
  const filePath = path.join(process.cwd(), "content", "resume.mdx");
  const raw = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(raw);

  return (
    <>
      <Spotlight />
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-16 md:px-12 md:py-24 print:px-0 print:py-0">
        <div className="print:hidden mb-8 flex items-center justify-between">
          <a
            href="/"
            className="text-sm font-medium text-cyan-300 hover:text-cyan-200 transition-colors"
          >
            ← Back
          </a>
          <button
            onClick={undefined}
            className="text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
          >
            Print / Save PDF
          </button>
        </div>
        <article className="prose prose-lg max-w-none print:prose-sm">
          <MDXContent source={content} />
        </article>
      </div>
      <style>{`
        @media print {
          body { background: white; color: black; }
          .spotlight, nav, footer { display: none; }
          .prose { --tw-prose-body: #1a1a1a; --tw-prose-headings: #000; --tw-prose-links: #0066cc; }
        }
      `}</style>
    </>
  );
}
```

**Step 3: Commit**

```bash
git add content/resume.mdx app/resume/page.tsx
git commit -m "feat: add hidden resume page (not linked publicly)"
```

---

### Task 9: Remove unused components and clean up

**Files:**
- Delete or keep: `components/section-nav.tsx` (no longer used on homepage)
- Verify: all imports are correct

**Step 1: Check if section-nav is used anywhere else**

```bash
grep -r "section-nav\|SectionNav" --include="*.tsx" --include="*.ts" app/ components/
```

If only used in old page.tsx (now removed), delete it:

```bash
rm components/section-nav.tsx
```

**Step 2: Verify build passes**

```bash
cd /Users/jaehoshin/Desktop/personal-site && npx next build
```

Expected: Build succeeds with no errors.

**Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove unused section-nav component"
```

---

### Task 10: Visual verification with Playwright

**Step 1: Take full-page desktop screenshot**

Navigate to `http://localhost:3000` and take a full-page screenshot. Verify:
- Bento grid renders with proper card spacing
- Profile photo shows correctly
- MangstoonAI spotlight card is prominent
- Keywords/tech pills render in "What I Build" card
- Experience timeline is compact and readable
- Writing section shows 3 blog posts
- Footer is minimal and centered

**Step 2: Check mobile responsive**

Resize browser to 375px width, take screenshot. Verify:
- All cards stack to single column
- Photo card still renders
- No horizontal overflow

**Step 3: Check project detail page still works**

Navigate to `http://localhost:3000/projects/mangstoon-ai`, verify it still renders correctly.

**Step 4: Check blog page**

Navigate to `http://localhost:3000/blog`, verify it shows the 3 placeholder posts.

**Step 5: Check hidden resume**

Navigate to `http://localhost:3000/resume`, verify it renders the resume content.

---

### Task 11: Final commit with all changes

**Step 1: Verify git status**

```bash
git status
```

**Step 2: Stage and commit any remaining changes**

```bash
git add -A
git commit -m "feat: complete bento grid portfolio redesign"
```
