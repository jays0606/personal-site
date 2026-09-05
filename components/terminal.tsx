"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MONTHS, RECORD } from "@/content/record";

type Line = { kind: "in" | "out" | "err"; text: string };

const FILES = ["record.md", "now.md", "work/", "resume.pdf", "gpu.log"];

const WORK = ["mangstoon-ai", "content-factory", "jarvis", "gagebot", "voice-lab", "military-medic", "world-explorer", "factchat", "odyssey", "lodestar", "ansimshield", "knowledge-chatbots", "inyonglab"];

function help() {
  return [
    "help            this",
    "ls              list files",
    "cat record.md   the last eight entries",
    "cat now.md      what I'm doing this month",
    "gpu             what the one card is holding right now",
    "open <slug>     open a write-up (try: open mangstoon-ai)",
    "whoami          ",
    "clear           ",
  ].join("\n");
}

function gpu() {
  return [
    "NVIDIA GeForce RTX 5090  32 GB   driver 595   one card, three tenants",
    "",
    "  tenant          port   vram      state",
    "  ComfyUI (LTX)   8188   ~19 GB    rendering 1280x720 @ 100%, 575 W",
    "  OmniVoice TTS   8001   ~6 GB     warm, 2.0 s per 12 s of speech",
    "  korean-stt      8010   ~6 GB     warm, 0.9 s per transcript",
    "",
    "  --reserve-vram 3   (was 12; that mistake cost 56 s/clip vs 34)",
  ].join("\n");
}

function record() {
  return RECORD.slice(0, 8)
    .map((e) => `${e.year}${e.month ? " " + MONTHS[e.month] : "    "}  ${e.title}`)
    .join("\n");
}

function now() {
  return [
    "# now — September 2026",
    "",
    "- relaunching the YouTube factory as three branded channels with a metrics loop",
    "- Odyssey: prologues first, feature later; Seedance promo ends Sep 17",
    "- 가게봇 for its first customers; 인용랩 audits for two clinics",
    "- day job: three conversational-AI products and Jarvis at MindLogic",
    "- next: the US",
  ].join("\n");
}

export function Terminal() {
  const router = useRouter();
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: "Last login: from a MacBook over tailscale. Type `help`." },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  // Keep the newest line visible inside the box. Never scroll the page.
  useEffect(() => {
    const box = boxRef.current;
    if (box) box.scrollTop = box.scrollHeight;
  }, [lines]);

  function run(raw: string) {
    const cmd = raw.trim();
    const next: Line[] = [{ kind: "in", text: cmd }];
    const [name, ...args] = cmd.split(/\s+/);
    switch (name) {
      case "":
        break;
      case "help":
        next.push({ kind: "out", text: help() });
        break;
      case "ls":
        next.push({ kind: "out", text: args[0] === "work" || args[0] === "work/" ? WORK.join("\n") : FILES.join("  ") });
        break;
      case "cat":
        if (args[0] === "record.md") next.push({ kind: "out", text: record() });
        else if (args[0] === "now.md") next.push({ kind: "out", text: now() });
        else if (args[0] === "gpu.log") next.push({ kind: "out", text: gpu() });
        else if (args[0] === "resume.pdf") next.push({ kind: "out", text: "binary file. try: open resume" });
        else next.push({ kind: "err", text: `cat: ${args[0] ?? ""}: No such file` });
        break;
      case "gpu":
        next.push({ kind: "out", text: gpu() });
        break;
      case "whoami":
        next.push({ kind: "out", text: "jaeho — 28, Seoul. builds things that keep running after he goes to sleep." });
        break;
      case "open": {
        const slug = (args[0] ?? "").replace(/^\/?work\//, "");
        if (slug === "resume") {
          next.push({ kind: "out", text: "opening /resume" });
          setTimeout(() => router.push("/resume"), 250);
        } else if (WORK.includes(slug)) {
          next.push({ kind: "out", text: `opening /work/${slug}` });
          setTimeout(() => router.push(`/work/${slug}`), 250);
        } else {
          next.push({ kind: "err", text: `open: ${slug || "<slug>"}: not found. try: ls work` });
        }
        break;
      }
      case "clear":
        setLines([]);
        setInput("");
        return;
      case "sudo":
        next.push({ kind: "err", text: "sudo is password-gated on the box. it's password-gated here too." });
        break;
      case "rm":
        next.push({ kind: "err", text: "no." });
        break;
      case "exit":
        next.push({ kind: "out", text: "logout" });
        break;
      default:
        next.push({ kind: "err", text: `${name}: command not found. try help.` });
    }
    setLines((l) => [...l, ...next]);
    setHistory((h) => (cmd ? [cmd, ...h] : h));
    setHIdx(-1);
    setInput("");
  }

  return (
    <div ref={boxRef} className="term" onClick={() => inputRef.current?.focus()} aria-label="A small terminal. Type help.">
      {lines.map((l, i) =>
        l.kind === "in" ? (
          <div key={i}>
            <span className="p">
              jaeho@<b>rtx5090</b>:~$
            </span>{" "}
            {l.text}
          </div>
        ) : (
          <pre key={i} className={l.kind === "err" ? "red" : ""}>
            {l.text}
          </pre>
        ),
      )}
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          run(input);
        }}
      >
        <label className="p whitespace-nowrap" htmlFor="term-in">
          jaeho@<b>rtx5090</b>:~$
        </label>
        <input
          id="term-in"
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "ArrowUp") {
              e.preventDefault();
              const n = Math.min(hIdx + 1, history.length - 1);
              setHIdx(n);
              setInput(history[n] ?? "");
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              const n = Math.max(hIdx - 1, -1);
              setHIdx(n);
              setInput(n === -1 ? "" : history[n]);
            }
          }}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="command"
        />
      </form>
    </div>
  );
}
