"use client";

import { useState } from "react";

export function Portrait() {
  const [toon, setToon] = useState(false);
  return (
    <figure className="m-0">
      <div
        className="portrait"
        data-toon={toon}
        role="button"
        tabIndex={0}
        aria-pressed={toon}
        aria-label="Portrait. Press to switch between the photo and its webtoon version."
        onClick={() => setToon((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setToon((v) => !v);
          }
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/portrait.jpg" alt="Jaeho Shin under the Manhattan Bridge, DUMBO, December 2019." width={1200} height={1600} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="toon" src="/portrait-webtoon.jpg" alt="" aria-hidden="true" width={1024} height={1536} loading="lazy" />
      </div>
      <figcaption className="portrait-hint mt-2">
        DUMBO, December 2019. Hover or tap: the same photo, redrawn as a webtoon panel by the pipeline behind MangstoonAI.
      </figcaption>
    </figure>
  );
}
