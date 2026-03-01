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
                Building autonomous AI operations agents with MCP &amp; Claude at Mindlogic.
                Driving Claude Code adoption across 15+ engineers.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Building AI-powered tools on the side.
              </p>
            </BentoCard>
          </FadeIn>

          <FadeIn className="col-span-full sm:col-span-4 lg:col-span-4" delay={250}>
            <BentoCard>
              <h2 className="section-heading mb-4">Connect</h2>
              <div className="space-y-2 text-sm">
                <p className="text-slate-300">Seoul, South Korea</p>
                <p className="text-slate-400">Yonsei University &mdash; B.S. EE</p>
                <p className="text-slate-400">Korean &middot; English &middot; Chinese</p>
              </div>
            </BentoCard>
          </FadeIn>

          {/* ─── Row 3: Spotlight Project ─── */}
          {spotlightProject && (
            <FadeIn className="col-span-full" delay={300}>
              <BentoCard className="border-cyan-400/10 bg-gradient-to-br from-slate-900/80 to-slate-800/40 overflow-hidden">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h2 className="text-xl font-bold text-slate-200" style={{ fontFamily: "var(--font-display)" }}>
                        {spotlightProject.frontmatter.title}
                      </h2>
                      <span className="award-badge">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                          <path fillRule="evenodd" d="M10 1a.75.75 0 01.65.38l2.15 3.7 4.1.72a.75.75 0 01.42 1.26L14.35 10l.7 4.08a.75.75 0 01-1.09.79L10 12.72l-3.96 2.15a.75.75 0 01-1.09-.79l.7-4.08L2.68 7.06a.75.75 0 01.42-1.26l4.1-.72 2.15-3.7A.75.75 0 0110 1z" clipRule="evenodd" />
                        </svg>
                        3rd Place &mdash; $20K Credits
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-slate-400">
                      Google Gemini 3 Seoul Hackathon &middot; Solo entry vs 111 teams
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                      {spotlightProject.frontmatter.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {spotlightProject.frontmatter.tags.map((tag) => (
                        <span key={tag} className="tech-pill">{tag}</span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-4">
                      {spotlightProject.frontmatter.link && (
                        <a
                          href={spotlightProject.frontmatter.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-cyan-300 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
                          </svg>
                          Source
                        </a>
                      )}
                      <Link
                        href={`/projects/${spotlightProject.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-medium text-cyan-300 hover:text-cyan-200 transition-colors"
                      >
                        View Project
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                          <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                  {spotlightProject.frontmatter.youtube && (
                    <a
                      href={spotlightProject.frontmatter.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block w-full lg:w-80 shrink-0 rounded-xl overflow-hidden group/yt"
                    >
                      <Image
                        src={`https://img.youtube.com/vi/${spotlightProject.frontmatter.youtube.split("/").pop()}/maxresdefault.jpg`}
                        alt={`${spotlightProject.frontmatter.title} demo video`}
                        width={480}
                        height={270}
                        className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover/yt:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover/yt:bg-black/20 transition-colors rounded-xl">
                        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-600 shadow-lg shadow-red-600/30 group-hover/yt:scale-110 transition-transform">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="h-6 w-6 ml-0.5">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </a>
                  )}
                </div>
              </BentoCard>
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
                  <p className="mt-2 flex-1 text-sm leading-relaxed">{project.frontmatter.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.frontmatter.tags.map((tag) => (
                      <span key={tag} className="tech-pill text-[0.625rem]">{tag}</span>
                    ))}
                  </div>
                  {(project.frontmatter.link || project.frontmatter.demo || project.frontmatter.youtube) && (
                    <div className="mt-3 flex items-center gap-3 pt-2 border-t border-slate-800/50">
                      {project.frontmatter.link && (
                        <span className="inline-flex items-center gap-1 text-[0.625rem] font-medium text-slate-400">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
                          </svg>
                          GitHub
                        </span>
                      )}
                      {project.frontmatter.demo && (
                        <span className="inline-flex items-center gap-1 text-[0.625rem] font-medium text-slate-400">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                            <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5zm4.943-.518a.75.75 0 01.764-.054l4.5 2.25a.75.75 0 010 1.344l-4.5 2.25A.75.75 0 019 10.25v-4.5a.75.75 0 01.193-.518z" clipRule="evenodd" />
                          </svg>
                          Live Demo
                        </span>
                      )}
                      {project.frontmatter.youtube && (
                        <span className="inline-flex items-center gap-1 text-[0.625rem] font-medium text-slate-400">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                          </svg>
                          YouTube
                        </span>
                      )}
                    </div>
                  )}
                </BentoCard>
              </Link>
            </FadeIn>
          ))}

          {/* ─── Row 5: Experience + Projects CTA ─── */}
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
                        {exp.title} &middot;{" "}
                        {exp.companyUrl ? (
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
                  5+
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
                  View All &rarr;
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
