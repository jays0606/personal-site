import Link from "next/link";
import { getBlogPosts } from "@/lib/content";
import { Spotlight } from "@/components/spotlight";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  const posts = getBlogPosts();

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
        <h1 className="text-3xl font-bold tracking-tight text-slate-200" style={{ fontFamily: "var(--font-display)" }}>
          Blog
        </h1>
        <p className="mt-3 text-slate-400">Thoughts on AI, engineering, and building things.</p>
        <div className="mt-12">
          {posts.length > 0 ? (
            <div className="flex flex-col gap-2">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="card-hover group relative rounded-lg p-5 transition-all"
                >
                  <div className="relative z-10 flex items-baseline justify-between">
                    <h2 className="font-medium text-slate-200 group-hover:text-cyan-300 transition-colors">
                      {post.frontmatter.title}
                    </h2>
                    <span className="ml-4 shrink-0 text-sm text-slate-500">
                      {new Date(post.frontmatter.date).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                    </span>
                  </div>
                  <p className="relative z-10 mt-1 text-sm">{post.frontmatter.description}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-slate-500">Writing soon...</p>
          )}
        </div>
      </div>
    </>
  );
}
