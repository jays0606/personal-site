import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const contentDir = path.join(process.cwd(), "content");

export type ProjectFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  featured: boolean;
  image?: string;
  link?: string;
  demo?: string;
  youtube?: string;
  award?: string;
  hidden?: boolean;
};

export type BlogFrontmatter = {
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

function getContentByType<T>(type: "projects" | "blog"): ContentItem<T>[] {
  const dir = path.join(contentDir, type);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const filePath = path.join(dir, filename);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      const slug = filename.replace(/\.mdx$/, "");
      return {
        slug,
        frontmatter: data as T,
        content,
        readingTime: readingTime(content).text,
      };
    });
}

export function getProjects(): ContentItem<ProjectFrontmatter>[] {
  return getContentByType<ProjectFrontmatter>("projects")
    .filter((p) => !p.frontmatter.hidden)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}

export function getFeaturedProjects(): ContentItem<ProjectFrontmatter>[] {
  return getProjects().filter((p) => p.frontmatter.featured);
}

export function getBlogPosts(): ContentItem<BlogFrontmatter>[] {
  return getContentByType<BlogFrontmatter>("blog")
    .filter((p) => !p.frontmatter.draft)
    .sort(
      (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    );
}

export function getContentBySlug<T>(type: "projects" | "blog", slug: string): ContentItem<T> | null {
  const filePath = path.join(contentDir, type, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    frontmatter: data as T,
    content,
    readingTime: readingTime(content).text,
  };
}
