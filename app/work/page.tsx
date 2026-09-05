import type { Metadata } from "next";
import Link from "next/link";
import { Page, SectionLabel } from "@/components/site-chrome";
import { getWork } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: "Write-ups of the things Jaeho Shin has built: agents, a video factory, voice, apps, hackathon entries.",
};

const TRACK_LABEL = { work: "MindLogic", build: "Building", hack: "Hackathon", oss: "Open source" } as const;

export default function WorkIndex() {
  const items = getWork();
  return (
    <Page>
      <section className="mt-14 md:mt-20">
        <SectionLabel kr="작업" en="Work" />
        <p className="measure quiet mt-4">
          Longer write-ups. Each one says what it is, what it does, what it&rsquo;s made of, and what happened.
        </p>
        <ol className="list-none m-0 p-0 mt-12 space-y-8">
          {items.map((w) => (
            <li key={w.slug} className="grid gap-x-8 md:grid-cols-[9rem_1fr]">
              <div className="record-month !pt-1">
                {w.frontmatter.period ?? w.frontmatter.date.slice(0, 4)}
                <div className="mt-1 quiet">{TRACK_LABEL[w.frontmatter.track]}</div>
              </div>
              <div className="measure">
                <Link href={`/work/${w.slug}`} className="record-title no-underline hover:underline text-[1.15rem]">
                  {w.frontmatter.title}
                </Link>
                <p className="record-detail m-0 mt-1">{w.frontmatter.summary}</p>
                {w.frontmatter.status && <p className="quiet m-0 mt-1 text-[13.5px]">{w.frontmatter.status}</p>}
              </div>
            </li>
          ))}
        </ol>
      </section>
    </Page>
  );
}
