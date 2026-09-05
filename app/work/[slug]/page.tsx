import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Page } from "@/components/site-chrome";
import { MDXContent } from "@/components/mdx-content";
import { getWork, getContentBySlug, type WorkFrontmatter } from "@/lib/content";

export async function generateStaticParams() {
  return getWork().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getContentBySlug<WorkFrontmatter>("work", slug);
  if (!item) return {};
  return {
    title: item.frontmatter.title,
    description: item.frontmatter.summary,
    openGraph: { title: item.frontmatter.title, description: item.frontmatter.summary, type: "article" },
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getContentBySlug<WorkFrontmatter>("work", slug);
  if (!item || item.frontmatter.hidden) notFound();
  const { frontmatter: f, content } = item;

  const links = [
    f.link && { label: "Source", href: f.link },
    f.demo && { label: "Demo", href: f.demo },
    f.youtube && { label: "Video", href: f.youtube },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <Page>
      <article className="mt-14 md:mt-20 max-w-[72ch]">
        <p className="record-month !pt-0">
          {f.period ?? f.date.slice(0, 4)}
          {f.status ? `, ${f.status}` : ""}
        </p>
        <h1 className="display text-[2.2rem] sm:text-[2.8rem] mt-3 m-0">{f.title}</h1>
        <p className="mt-5 text-[19px] leading-[1.5] quiet">{f.summary}</p>
        {f.award && <p className="mt-4 font-medium">{f.award}</p>}
        {links.length > 0 && (
          <p className="mt-5 flex gap-5 text-[15.5px]">
            {links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label}
              </a>
            ))}
          </p>
        )}
        {f.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={f.image} alt="" className="mt-10 rounded-[3px] w-full" />
        )}
        <div className="mt-12">
          <MDXContent source={content} />
        </div>
        <p className="mt-16 text-[15.5px]">
          <Link href="/work">All write-ups</Link>
          <span className="quiet"> &nbsp;or&nbsp; </span>
          <Link href="/#record">back to the record</Link>
        </p>
      </article>
    </Page>
  );
}
