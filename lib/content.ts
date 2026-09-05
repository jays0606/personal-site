import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const contentDir = path.join(process.cwd(), "content");

export type WorkFrontmatter = {
  title: string;
  summary: string; // one sentence, shown in lists
  date: string; // YYYY-MM-DD, used for ordering only
  period?: string; // human range, e.g. "Jun 2026 — now"
  track: "work" | "build" | "hack" | "oss";
  status?: string; // "live", "prototype", "retired", "0 min rendered"…
  featured?: boolean;
  order?: number; // featured ordering
  link?: string;
  demo?: string;
  youtube?: string;
  award?: string;
  image?: string;
  hidden?: boolean;
};

export type WritingFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  draft?: boolean;
};

export type ContentItem<T> = {
  slug: string;
  frontmatter: T;
  content: string;
  readingTime?: string;
};

type Kind = "work" | "writing";

function getContentByType<T>(type: Kind): ContentItem<T>[] {
  const dir = path.join(contentDir, type);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug: filename.replace(/\.mdx$/, ""),
        frontmatter: data as T,
        content,
        readingTime: readingTime(content).text,
      };
    });
}

export function getWork(): ContentItem<WorkFrontmatter>[] {
  return getContentByType<WorkFrontmatter>("work")
    .filter((p) => !p.frontmatter.hidden)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}

export function getFeaturedWork(): ContentItem<WorkFrontmatter>[] {
  return getWork()
    .filter((p) => p.frontmatter.featured)
    .sort((a, b) => (a.frontmatter.order ?? 99) - (b.frontmatter.order ?? 99));
}

export function getWriting(): ContentItem<WritingFrontmatter>[] {
  return getContentByType<WritingFrontmatter>("writing")
    .filter((p) => !p.frontmatter.draft)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}

export function getContentBySlug<T>(type: Kind, slug: string): ContentItem<T> | null {
  const filePath = path.join(contentDir, type, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { slug, frontmatter: data as T, content, readingTime: readingTime(content).text };
}
