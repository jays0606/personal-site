import Link from "next/link";
import { getProjects } from "@/lib/content";
import { Spotlight } from "@/components/spotlight";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "All Projects" };

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <>
      <Spotlight />
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-16 md:px-12 md:py-24">
        <Link
          href="/#projects"
          className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 hover:text-cyan-200 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 transition-transform group-hover:-translate-x-1">
            <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
          </svg>
          Jaeho Shin
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-slate-200" style={{ fontFamily: "var(--font-display)" }}>
          All Projects
        </h1>
        <div className="mt-12">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="py-4 pr-8 text-sm font-semibold text-slate-200">Year</th>
                <th className="py-4 pr-8 text-sm font-semibold text-slate-200">Project</th>
                <th className="hidden py-4 pr-8 text-sm font-semibold text-slate-200 sm:table-cell">Built with</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.slug} className="border-b border-slate-800/50">
                  <td className="py-4 pr-8 text-sm text-slate-500">
                    {new Date(project.frontmatter.date).getFullYear()}
                  </td>
                  <td className="py-4 pr-8">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group inline-flex items-center gap-2 font-medium text-slate-200 hover:text-cyan-300 transition-colors"
                    >
                      {project.frontmatter.title}
                      {project.frontmatter.award && (
                        <span className="award-badge text-[0.625rem]">
                          {project.frontmatter.award.split("—")[0].trim()}
                        </span>
                      )}
                    </Link>
                  </td>
                  <td className="hidden py-4 pr-8 sm:table-cell">
                    <div className="flex flex-wrap gap-1.5">
                      {project.frontmatter.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="tech-pill text-[0.625rem]">{tag}</span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
