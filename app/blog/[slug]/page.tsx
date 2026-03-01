import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPosts, getContentBySlug, type BlogFrontmatter } from "@/lib/content";
import { MDXContent } from "@/components/mdx-content";
import { Spotlight } from "@/components/spotlight";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getContentBySlug<BlogFrontmatter>("blog", slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: "article",
      publishedTime: post.frontmatter.date,
      authors: ["Jaeho Shin"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getContentBySlug<BlogFrontmatter>("blog", slug);
  if (!post) notFound();

  const { frontmatter, content, readingTime } = post;

  return (
    <>
      <Spotlight />
      <div className="relative z-10 mx-auto max-w-2xl px-6 py-16 md:px-12 md:py-24">
        <Link
          href="/"
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
          <div className="mt-3 flex gap-3 text-sm text-slate-500">
            <span>{new Date(frontmatter.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            <span>&middot;</span>
            <span>{readingTime}</span>
          </div>
          <hr className="my-10 border-slate-800" />
          <MDXContent source={content} />
        </article>
      </div>
    </>
  );
}
