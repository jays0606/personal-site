import type { Metadata } from "next";
import Link from "next/link";
import { Page, SectionLabel } from "@/components/site-chrome";
import { NOW_LABEL } from "@/lib/site";

export const metadata: Metadata = {
  title: "The file",
  robots: { index: false, follow: false },
};

type Row = {
  n: number;
  criterion: string;
  have: string[];
  need: string;
  status: "have" | "partial" | "none";
};

// The eight O-1A criteria (8 CFR 214.2(o)(3)(iii)(B)). Three are required.
const ROWS: Row[] = [
  {
    n: 1,
    criterion: "Nationally or internationally recognised prizes or awards",
    have: ["3rd place, Gemini 3 Seoul Hackathon (Google), Feb 2026 — solo, 111 teams, $20K."],
    need: "One more placement at a recognised competition. The circuit entries on the record are attempts at exactly this.",
    status: "partial",
  },
  {
    n: 2,
    criterion: "Membership in associations that require outstanding achievement",
    have: [],
    need: "Nothing yet. Low priority; the other criteria are cheaper to earn honestly.",
    status: "none",
  },
  {
    n: 3,
    criterion: "Published material about you in major media or trade publications",
    have: ["Hackathon coverage, if any, needs collecting with URLs and dates."],
    need: "Press or trade coverage with a byline, naming me. A shipped Odyssey and a working factory are the likely hooks.",
    status: "none",
  },
  {
    n: 4,
    criterion: "Judging the work of others in the field",
    have: ["Hiring and technical review at MindLogic (does not count on its own)."],
    need: "Serve as a hackathon judge or reviewer, with a letter from the organiser. Ask the organisers I already know.",
    status: "none",
  },
  {
    n: 5,
    criterion: "Original contributions of major significance",
    have: [
      "Jarvis — company-wide autonomous Slack agent over MCP (Dec 2025).",
      "FactChat platform at 50+ universities.",
      "mediapipe-facelandmark-demo, 118 stars.",
      "content-factory — zero-touch Korean long-form video pipeline.",
    ],
    need: "Letters from people outside MindLogic who used or built on these. Adoption numbers with dates.",
    status: "partial",
  },
  {
    n: 6,
    criterion: "Authorship of scholarly articles",
    have: [],
    need: "Not the plan. A well-cited technical write-up or a conference talk with proceedings could substitute.",
    status: "none",
  },
  {
    n: 7,
    criterion: "Critical or essential capacity for organisations with a distinguished reputation",
    have: [
      "Director of Engineering, MindLogic (Mar 2025—): fifteen engineers, three products, 50+ enterprise clients.",
      "Technical lead, INZEUM with Prof. 김주환 (Apr 2026—).",
    ],
    need: "Letters from the CEO and from Prof. 김주환. Evidence the organisations are distinguished (press, clients, funding).",
    status: "have",
  },
  {
    n: 8,
    criterion: "High salary or remuneration relative to others in the field",
    have: ["Not published here."],
    need: "Compensation data against Korean and US benchmarks, from an accountant.",
    status: "partial",
  },
];

const STATUS: Record<Row["status"], string> = { have: "have", partial: "partial", none: "not yet" };

export default function FilePage() {
  const haveCount = ROWS.filter((r) => r.status === "have").length;
  const partialCount = ROWS.filter((r) => r.status === "partial").length;
  return (
    <Page>
      <section className="mt-14 md:mt-20">
        <SectionLabel kr="서류" en="The file" />
        <div className="measure mt-5 space-y-3">
          <p>
            A working file for a future US petition, kept in public on purpose. Building in public applies to paperwork
            too. It maps <Link href="/#record">the record</Link> onto the eight things an O-1A examiner is allowed to count.
            Three are required.
          </p>
          <p className="quiet text-[15px]">
            {NOW_LABEL}: {haveCount} solid, {partialCount} partial, {8 - haveCount - partialCount} empty. Not indexed by
            search engines. If you are a lawyer and this makes you wince, write to me.
          </p>
        </div>

        <ol className="list-none m-0 p-0 mt-12 space-y-10">
          {ROWS.map((r) => (
            <li key={r.n} className="grid gap-x-8 gap-y-2 md:grid-cols-[9rem_1fr] record-rule pt-6">
              <div>
                <div className="record-year !text-[2.4rem]">{r.n}</div>
                <div className={`mt-2 text-[13.5px] ${r.status === "have" ? "text-cinnabar font-medium" : "quiet"}`}>
                  {STATUS[r.status]}
                </div>
              </div>
              <div className="measure">
                <p className="record-title m-0">{r.criterion}</p>
                {r.have.length > 0 && (
                  <ul className="mt-3 pl-5 space-y-1 text-[15.5px]">
                    {r.have.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                )}
                <p className="record-detail mt-3 m-0 text-[15.5px]">
                  <span className="font-medium text-ink">To strengthen: </span>
                  {r.need}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </Page>
  );
}
