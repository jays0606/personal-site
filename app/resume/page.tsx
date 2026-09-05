import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Page } from "@/components/site-chrome";
import { MDXContent } from "@/components/mdx-content";

export const metadata: Metadata = {
  title: "Résumé",
  robots: { index: false, follow: false },
};

export default function ResumePage() {
  const raw = fs.readFileSync(path.join(process.cwd(), "content", "resume.mdx"), "utf-8");
  const { content } = matter(raw);
  return (
    <Page>
      <article className="mt-14 md:mt-20 max-w-[72ch] print:mt-0">
        <MDXContent source={content} />
      </article>
      <style>{`@media print { .term, footer, header nav { display: none !important; } body { background: #fff; } }`}</style>
    </Page>
  );
}
