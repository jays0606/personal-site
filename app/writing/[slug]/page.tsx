import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Page } from "@/components/site-chrome";
import { MDXContent } from "@/components/mdx-content";
import { getWriting, getContentBySlug, type WritingFrontmatter } from "@/lib/content";

export async function generateStaticParams() {
  return getWriting().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getContentBySlug<WritingFrontmatter>("writing", slug);
  if (!post || post.frontmatter.draft) return {};
  return { title: post.frontmatter.title, description: post.frontmatter.description };
}

export default async function WritingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getContentBySlug<WritingFrontmatter>("writing", slug);
  if (!post || post.frontmatter.draft) notFound();
  const { frontmatter: f, content, readingTime } = post;
  return (
    <Page>
      <article className="mt-14 md:mt-20 max-w-[72ch]">
        <p className="record-month !pt-0">
          {f.date}
          {readingTime ? `, ${readingTime}` : ""}
        </p>
        <h1 className="display text-[2.2rem] sm:text-[2.8rem] mt-3 m-0">{f.title}</h1>
        <p className="mt-5 text-[19px] leading-[1.5] quiet">{f.description}</p>
        <div className="mt-12">
          <MDXContent source={content} />
        </div>
        <p className="mt-16 text-[15.5px]">
          <Link href="/writing">All writing</Link>
        </p>
      </article>
    </Page>
  );
}
