import Link from "next/link";
import { Page, SectionLabel } from "@/components/site-chrome";
import { Portrait } from "@/components/portrait";
import { Record } from "@/components/record";
import { getFeaturedWork } from "@/lib/content";
import { NOW_LABEL } from "@/lib/site";

export default function Home() {
  const featured = getFeaturedWork();

  return (
    <Page home>
      {/* ---- who ---- */}
      <section className="mt-14 md:mt-20 grid gap-10 md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_340px] md:gap-16 items-start">
        <div>
          <h1 className="display text-[2.6rem] sm:text-[3.4rem] lg:text-[4rem] m-0 max-w-[14ch]">
            One engineer, one GPU, and a lot of agents.
          </h1>
          <div className="measure mt-8 space-y-4 text-[17.5px]">
            <p>
              I&rsquo;m Jaeho, 28, in Seoul. By day I run engineering at{" "}
              <a href="https://mindlogic.ai" target="_blank" rel="noopener noreferrer">
                MindLogic
              </a>{" "}
              — fifteen engineers, three conversational-AI products, fifty-some enterprise clients. Nights and weekends I run{" "}
              <span className="font-medium">VibeRick</span>: a Korean video factory that lives on a single RTX 5090, a few
              apps, a chatbot for corner shops, and whatever hackathon is on this month.
            </p>
            <p>
              I like systems that keep running after I go to sleep. Most of what&rsquo;s below is that, plus the parts that
              didn&rsquo;t — three YouTube channels terminated for looking mass-produced, a feature film with zero minutes
              rendered. They stay on the record.
            </p>
            <p className="quiet">
              Korean, English, Chinese. Heading to the US in a few years; the record below is how I plan to get there.
            </p>
          </div>
          <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[15.5px]">
            <a href="https://github.com/jays0606" target="_blank" rel="noopener noreferrer">
              github.com/jays0606
            </a>
            <a href="https://linkedin.com/in/jays0606" target="_blank" rel="noopener noreferrer">
              linkedin.com/in/jays0606
            </a>
            <a href="mailto:jaehoshin62@gmail.com">jaehoshin62@gmail.com</a>
          </p>
        </div>
        <Portrait />
      </section>

      {/* ---- the record ---- */}
      <section className="mt-24 md:mt-32">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <SectionLabel kr="기록" en="The record" id="record" />
          <p className="quiet text-[14.5px] m-0">Newest first. A dash means I only trust the year.</p>
        </div>
        <div className="mt-8">
          <Record />
        </div>
      </section>

      {/* ---- now ---- */}
      <section className="mt-24 md:mt-28 grid gap-8 md:grid-cols-[9rem_1fr] md:gap-x-8">
        <SectionLabel kr="지금" en="Now" id="now" />
        <div className="measure space-y-4">
          <p className="quiet text-[14.5px] m-0">{NOW_LABEL}</p>
          <p>
            Relaunching the video factory as three branded channels instead of fourteen anonymous ones, with an upload stage
            and a metrics pull so I can finally see what works. The Odyssey film ships as short prologues first; the full
            feature comes after, if the prologues earn it.
          </p>
          <p>
            가게봇 is serving its first customers. 인용랩 is auditing two clinics for AI-search citations. At MindLogic, Jarvis
            keeps getting new tools.
          </p>
          <p>
            <Link href="/now">More on the now page.</Link>
          </p>
        </div>
      </section>

      {/* ---- selected ---- */}
      <section className="mt-24 md:mt-28 grid gap-8 md:grid-cols-[9rem_1fr] md:gap-x-8">
        <SectionLabel kr="선별" en="Closer looks" id="work" />
        <div>
          <ol className="list-none m-0 p-0 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {featured.map((w) => (
              <li key={w.slug} className="m-0">
                <Link href={`/work/${w.slug}`} className="record-title no-underline hover:underline">
                  {w.frontmatter.title}
                </Link>
                <p className="record-detail m-0 mt-1 text-[15.5px]">{w.frontmatter.summary}</p>
                {w.frontmatter.status && <p className="quiet m-0 mt-1 text-[13.5px]">{w.frontmatter.status}</p>}
              </li>
            ))}
          </ol>
          <p className="mt-8 text-[15.5px]">
            <Link href="/work">All write-ups</Link>
          </p>
        </div>
      </section>

      {/* ---- contact ---- */}
      <section className="mt-24 md:mt-28 grid gap-8 md:grid-cols-[9rem_1fr] md:gap-x-8">
        <SectionLabel kr="연락" en="Contact" id="contact" />
        <div className="measure">
          <p>
            If you&rsquo;re building something in agents, media, or voice — or you&rsquo;re in Seoul and want to see the box
            — write to <a href="mailto:jaehoshin62@gmail.com">jaehoshin62@gmail.com</a>. I answer.
          </p>
        </div>
      </section>
    </Page>
  );
}
