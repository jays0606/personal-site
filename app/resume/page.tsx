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
        <div className="print:hidden mb-8">
          <a
            href="/"
            className="text-sm font-medium text-cyan-300 hover:text-cyan-200 transition-colors"
          >
            &larr; Back
          </a>
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
