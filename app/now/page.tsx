import type { Metadata } from "next";
import Link from "next/link";
import { Page, SectionLabel } from "@/components/site-chrome";
import { NOW_LABEL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Now",
  description: "What Jaeho Shin is working on this month.",
};

export default function NowPage() {
  return (
    <Page>
      <section className="mt-14 md:mt-20 grid gap-8 md:grid-cols-[9rem_1fr] md:gap-x-8">
        <SectionLabel kr="지금" en="Now" />
        <div className="measure space-y-5">
          <p className="quiet text-[14.5px] m-0">
            {NOW_LABEL}. A <a href="https://nownownow.com/about">now page</a>: what has my attention, updated when it changes.
          </p>

          <h3 className="font-semibold mt-8 mb-0">The video factory</h3>
          <p>
            Fourteen configured channels became three. The August review was blunt: nobody wins with anonymous TTS on a
            fixed template at daily cadence, and YouTube agreed by terminating three of mine. The relaunch is a named
            narrator, a sources-and-credits pass on every script, three uploads per render (main, compilation, audio-only),
            and — before any of that — an upload stage and a daily metrics pull. I cannot iterate on what I don&rsquo;t
            measure.
          </p>

          <h3 className="font-semibold mt-8 mb-0">Odyssey</h3>
          <p>
            A seventy-minute animated Odyssey, English-led, pre-produced to the shot and rendered at 0%. The Seedance
            promotional pricing ends September 17. The plan changed from &ldquo;one big drop&rdquo; to short prologues
            first — Cyclops, Sirens, Calypso, Circe — with the feature later if the prologues earn it. Every reference
            channel that grew did it that way.
          </p>

          <h3 className="font-semibold mt-8 mb-0">Small businesses</h3>
          <p>
            <Link href="/work/gagebot">가게봇</Link> has five shops on it and one paying. <Link href="/work/inyonglab">인용랩</Link>{" "}
            is running citation audits for two clinics under Korean medical-advertising law, which forbids most of what the
            industry does anyway.
          </p>

          <h3 className="font-semibold mt-8 mb-0">Day job</h3>
          <p>
            MindLogic: three conversational-AI products, and <Link href="/work/jarvis">Jarvis</Link>, the Slack agent that
            keeps growing tools. Hiring.
          </p>

          <h3 className="font-semibold mt-8 mb-0">Next</h3>
          <p>
            The US, in a few years. Either through a company worth funding or through a record worth a visa. Both routes
            need the same thing, which is why this site is a ledger.
          </p>
        </div>
      </section>
    </Page>
  );
}
