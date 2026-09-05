import Link from "next/link";
import { Seal } from "./seal";
import { Terminal } from "./terminal";

export function Header({ home = false }: { home?: boolean }) {
  return (
    <header className="flex items-baseline justify-between gap-6 pt-8 md:pt-12">
      <div className="flex items-center gap-3">
        <Seal />
        {home ? (
          <span className="display-quiet text-[22px]">Jaeho Shin</span>
        ) : (
          <Link href="/" className="display-quiet text-[22px] no-underline">
            Jaeho Shin
          </Link>
        )}
      </div>
      <nav className="flex gap-5 text-[15px]" aria-label="Site">
        <Link href="/#record" className="no-underline quiet hover:text-ink">
          Record
        </Link>
        <Link href="/work" className="no-underline quiet hover:text-ink">
          Work
        </Link>
        <Link href="/now" className="no-underline quiet hover:text-ink">
          Now
        </Link>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 mb-12">
      <Terminal />
      <div className="mt-6 flex flex-wrap justify-between gap-x-6 gap-y-2 text-[13.5px] quiet">
        <span>Seoul, Korea. Written and coded by hand, with agents.</span>
        <span className="flex gap-5">
          <a href="https://github.com/jays0606" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://linkedin.com/in/jays0606" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="mailto:jaehoshin62@gmail.com">Email</a>
          <Link href="/file">the file</Link>
        </span>
      </div>
    </footer>
  );
}

export function Page({ children, home = false }: { children: React.ReactNode; home?: boolean }) {
  return (
    <div className="mx-auto max-w-[1100px] px-5 sm:px-8 lg:px-10">
      <Header home={home} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export function SectionLabel({ kr, en, id }: { kr: string; en: string; id?: string }) {
  return (
    <h2 id={id} className="flex items-baseline gap-3 m-0 scroll-mt-8">
      <span className="kr" lang="ko">
        {kr}
      </span>
      <span className="display-quiet text-[26px] md:text-[30px]">{en}</span>
    </h2>
  );
}
