"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MONTHS, RECORD, TRACKS, type Entry, type Track } from "@/content/record";

const NOW = { year: 2026, month: 9 };

function EntryLink({ e, children }: { e: Entry; children: React.ReactNode }) {
  if (!e.href) return <>{children}</>;
  if (e.href.startsWith("/")) return <Link href={e.href}>{children}</Link>;
  return (
    <a href={e.href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export function Record({ limit }: { limit?: number }) {
  const [track, setTrack] = useState<Track | "all">("all");

  const entries = useMemo(() => {
    const list = track === "all" ? RECORD : RECORD.filter((e) => e.track === track);
    return limit ? list.slice(0, limit) : list;
  }, [track, limit]);

  const years = Array.from(new Set(entries.map((e) => e.year)));

  return (
    <div>
      <div className="flex flex-wrap gap-1 -ml-2.5" role="group" aria-label="Filter the record">
        {TRACKS.map((t) => (
          <button key={t.id} className="chip" aria-pressed={track === t.id} onClick={() => setTrack(t.id)} type="button">
            {t.label}
          </button>
        ))}
      </div>

      <ol className="mt-10 list-none p-0 m-0">
        {years.map((year) => (
          <li key={year} className="record-rule pt-5 pb-10 md:grid md:grid-cols-[9rem_1fr] md:gap-x-8">
            <div className="record-year md:sticky md:top-6 self-start mb-6 md:mb-0">{year}</div>
            <ol className="list-none p-0 m-0 space-y-7">
              {entries
                .filter((e) => e.year === year)
                .map((e, i) => {
                  const isNow = e.year === NOW.year && e.month === NOW.month;
                  return (
                    <li key={`${year}-${i}`} className="grid grid-cols-[3.25rem_1fr] gap-x-4">
                      <div className="record-month">
                        {e.month ? MONTHS[e.month] : <span aria-label="month not recorded">—</span>}
                      </div>
                      <div className="measure">
                        <p className={`record-title m-0 ${e.mark ? "mark" : ""}`}>
                          {isNow && <span className="now-dot" aria-label="this month" />}
                          <EntryLink e={e}>{e.title}</EntryLink>
                        </p>
                        {e.detail && <p className="record-detail m-0 mt-1.5">{e.detail}</p>}
                      </div>
                    </li>
                  );
                })}
            </ol>
          </li>
        ))}
      </ol>
    </div>
  );
}
