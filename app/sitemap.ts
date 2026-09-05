import type { MetadataRoute } from "next";
import { getWork, getWriting } from "@/lib/content";
import { BASE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const work = getWork().map((p) => ({ url: `${BASE_URL}/work/${p.slug}`, lastModified: new Date(p.frontmatter.date) }));
  const writing = getWriting().map((p) => ({ url: `${BASE_URL}/writing/${p.slug}`, lastModified: new Date(p.frontmatter.date) }));
  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/work`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/now`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ...work,
    ...writing,
  ];
}
