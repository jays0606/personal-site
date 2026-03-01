import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjects, getContentBySlug, type ProjectFrontmatter } from "@/lib/content";
import { MDXContent } from "@/components/mdx-content";
import { Spotlight } from "@/components/spotlight";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getContentBySlug<ProjectFrontmatter>("projects", slug);
  if (!project) return {};
  return {
    title: project.frontmatter.title,
    description: project.frontmatter.description,
    openGraph: {
      title: project.frontmatter.title,
      description: project.frontmatter.description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.frontmatter.title,
      description: project.frontmatter.description,
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getContentBySlug<ProjectFrontmatter>("projects", slug);
  if (!project) notFound();

  const { frontmatter, content } = project;

  return (
    <>
      <Spotlight />
      <div className="relative z-10 mx-auto max-w-2xl px-6 py-16 md:px-12 md:py-24">
        <Link
          href="/#projects"
          className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 hover:text-cyan-200 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 transition-transform group-hover:-translate-x-1">
            <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
          </svg>
          Jaeho Shin
        </Link>
        <article>
          <h1 className="text-3xl font-bold tracking-tight text-slate-200" style={{ fontFamily: "var(--font-display)" }}>
            {frontmatter.title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-400">{frontmatter.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-sm text-slate-500">
              {new Date(frontmatter.date).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
            </span>
            {frontmatter.award && (
              <span className="award-badge">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                  <path fillRule="evenodd" d="M10 1a.75.75 0 01.65.38l2.15 3.7 4.1.72a.75.75 0 01.42 1.26L14.35 10l.7 4.08a.75.75 0 01-1.09.79L10 12.72l-3.96 2.15a.75.75 0 01-1.09-.79l.7-4.08L2.68 7.06a.75.75 0 01.42-1.26l4.1-.72 2.15-3.7A.75.75 0 0110 1z" clipRule="evenodd" />
                </svg>
                {frontmatter.award}
              </span>
            )}
            {frontmatter.link && (
              <a
                href={frontmatter.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-cyan-300 hover:text-cyan-200 transition-colors"
              >
                View Source
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                  <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                </svg>
              </a>
            )}
            {frontmatter.demo && (
              <a
                href={frontmatter.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-cyan-300 hover:text-cyan-200 transition-colors"
              >
                Live Demo
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                  <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                </svg>
              </a>
            )}
            {frontmatter.youtube && (
              <a
                href={frontmatter.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-cyan-300 hover:text-cyan-200 transition-colors"
              >
                YouTube
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <span key={tag} className="tech-pill">{tag}</span>
            ))}
          </div>
          <hr className="my-10 border-slate-800" />
          <MDXContent source={content} />
        </article>
      </div>
    </>
  );
}
