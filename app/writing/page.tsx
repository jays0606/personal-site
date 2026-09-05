import type { Metadata } from "next";
import Link from "next/link";
import { Page, SectionLabel } from "@/components/site-chrome";
import { getWriting } from "@/lib/content";

export const metadata: Metadata = { title: "Writing" };

export default function WritingIndex() {
  const posts = getWriting();
  return (
    <Page>
      <section className="mt-14 md:mt-20">
        <SectionLabel kr="글" en="Writing" />
        {posts.length === 0 ? (
          <div className="measure mt-6 space-y-3">
            <p>Nothing published yet. Three drafts are sitting in the repo; the record is more honest than any of them.</p>
            <p className="quiet text-[15px]">
              When one is worth your time it will appear here and on the record.{" "}
              <Link href="/#record">Back to the record.</Link>
            </p>
          </div>
        ) : (
          <ol className="list-none m-0 p-0 mt-12 space-y-8">
            {posts.map((p) => (
              <li key={p.slug} className="grid gap-x-8 md:grid-cols-[9rem_1fr]">
                <div className="record-month !pt-1">{p.frontmatter.date.slice(0, 7)}</div>
                <div className="measure">
                  <Link href={`/writing/${p.slug}`} className="record-title no-underline hover:underline text-[1.15rem]">
                    {p.frontmatter.title}
                  </Link>
                  <p className="record-detail m-0 mt-1">{p.frontmatter.description}</p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>
    </Page>
  );
}
