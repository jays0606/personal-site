// The record — every entry has a date, a track, one sentence, and a link where one exists.
// `month` is omitted when I only trust the year. Newest first.

export type Track = "work" | "build" | "hack" | "oss" | "life";

export const TRACKS: { id: Track | "all"; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "work", label: "MindLogic" },
  { id: "build", label: "Building" },
  { id: "hack", label: "Hackathons" },
  { id: "oss", label: "Open source" },
  { id: "life", label: "Life" },
];

export type Entry = {
  year: number;
  month?: number; // 1–12
  track: Track;
  title: string;
  detail: string;
  href?: string; // internal (/work/…) or external
  mark?: boolean; // the one or two lines to typeset bigger
};

export const RECORD: Entry[] = [
  {
    year: 2026,
    month: 9,
    track: "build",
    title: "Rebuilt this site as a ledger.",
    detail:
      "The March version was a bento grid that described an employee. This one is a dated record of what actually shipped, failures included.",
  },
  {
    year: 2026,
    month: 8,
    track: "build",
    title: "Reviewed the media lab against the best AI channels in Korea and abroad.",
    detail:
      "221 episodes rendered since June. Three channels terminated by YouTube for looking mass-produced. Verdict: fewer channels, a named narrator, and a measurement loop before rendering anything else.",
    href: "/work/content-factory",
  },
  {
    year: 2026,
    month: 8,
    track: "build",
    title: "Started 인용랩 — measuring whether AI search engines cite a site.",
    detail:
      "An AI-readiness audit tool and a citation tracker that repeats every prompt three times, because one LLM answer proves nothing. First two clinic and pharmacy engagements, under Korean medical-advertising law.",
    href: "/work/inyonglab",
  },
  {
    year: 2026,
    month: 8,
    track: "build",
    title: "몸톡 — a chatbot over six dance-anatomy textbooks and seventeen lectures.",
    detail:
      "Built for a pilates studio. No vector database: a page tree per document, BM25, and an agent that reads pages and cites them by number or timestamp. Second client on the same engine.",
    href: "/work/knowledge-chatbots",
  },
  {
    year: 2026,
    month: 8,
    track: "build",
    title: "OmniVoice became the voice of everything I make.",
    detail:
      "Replaced CosyVoice3 on the GPU box. 72 voices, Korean and English, two seconds to synthesise twelve seconds of speech while the same card is rendering video. Public at tts.viberick.com.",
    href: "/work/voice-lab",
  },
  {
    year: 2026,
    month: 8,
    track: "build",
    title: "First live Seedance session for Odyssey — and zero minutes of film.",
    detail:
      "A 70-minute animated Odyssey, planned to the shot. Measured the economics to the token ($3.44 per 10-second shot at 1080p), hit three moderation gates, learned that a storyboard grid is a contact sheet to a content filter. Pre-production is excellent; delivery is not.",
    href: "/work/odyssey",
  },
  {
    year: 2026,
    month: 7,
    track: "build",
    title: "가게봇 went live with its first signed customer.",
    detail:
      "A chatbot any small business installs by pasting one script tag. FastAPI and Gemini on Cloud Run, an owner dashboard, QR codes, FAQ import. Five shops use it; one pays.",
    href: "/work/gagebot",
    mark: true,
  },
  {
    year: 2026,
    month: 7,
    track: "hack",
    title: "돌봄루틴 — a ten-tool MCP server for Korean family care, for Kakao's PlayMCP contest.",
    detail:
      "Drug-interaction checks against the government DUR endpoints, a 25,000-pill offline index, care plans as markdown cards.",
  },
  {
    year: 2026,
    month: 6,
    track: "build",
    title: "Rewrote the YouTube factory from scratch.",
    detail:
      "content-factory: Postgres-backed, eight stages from script to thumbnail, roughly three dollars an episode, driven over SSH and tmux. LTX-2.3 replaced Wan for image-to-video the same week.",
    href: "/work/content-factory",
  },
  {
    year: 2026,
    month: 6,
    track: "build",
    title: "Designed a synthetic Korean voice and face — 서하 — that belongs to no one.",
    detail:
      "Voice-design mode picks a take, the take becomes a locked clone reference, the clone narrates. Zero publicity-rights exposure, which is the whole point.",
    href: "/work/voice-lab",
  },
  {
    year: 2026,
    month: 6,
    track: "hack",
    title: "Build with OpenAI builder session, Seoul.",
    detail: "Ninety minutes on the clock. Scoping is the entire game at that length.",
  },
  {
    year: 2026,
    month: 5,
    track: "hack",
    title: "AnsimShield — an on-device brake for voice phishing, for the Gemma 4 Good hackathon.",
    detail:
      "Kaggle × DeepMind. Three Gemma calls argue with each other (detector, skeptic, reconciler) before the phone asks the bank to pause a transfer for thirty seconds. Korean losses crossed a trillion won in 2025; that number is why.",
    href: "/work/ansimshield",
  },
  {
    year: 2026,
    month: 5,
    track: "build",
    title: "Lodestar — a Western-astrology app that cites your actual chart.",
    detail:
      "Swiss Ephemeris for the math, Gemini for the words, Expo for the phone. Nineteen endpoints, transit-aware journaling, GDPR export. Working prototype, not yet in a store.",
    href: "/work/lodestar",
  },
  {
    year: 2026,
    month: 5,
    track: "hack",
    title: "Genspark speed-building hackathon, Seoul.",
    detail: "Another ninety-minute build window.",
  },
  {
    year: 2026,
    month: 4,
    track: "hack",
    title: "Flew to San Francisco for the Gemma 4 Voice Agents Hackathon at YC.",
    detail:
      "Cactus × Google DeepMind, at YC's office. Built military-medic: a voice triage agent for field medics that runs entirely offline on the device — local speech in, local speech out, no network.",
    href: "/work/military-medic",
    mark: true,
  },
  {
    year: 2026,
    month: 4,
    track: "build",
    title: "Became technical lead for Professor 김주환's 내면소통 app, INZEUM.",
    detail:
      "Sleep meditation and inner-communication practice on a phone. Expo, FastAPI, and the user's own cloned voice reading the meditation back to them.",
  },
  {
    year: 2026,
    month: 3,
    track: "hack",
    title: "DigestAnything at Ralphthon Seoul #2.",
    detail: "Paste a URL, a video, or a PDF; get five ways to learn it and a tutor that quizzes you.",
    href: "https://github.com/jays0606/DigestAnything",
  },
  {
    year: 2026,
    month: 3,
    track: "hack",
    title: "World Explorer — a voice-only globe for kids, for the Gemini Live Agent Challenge.",
    detail:
      "A child says a country; the globe flies there, a local friend appears, and the AI runs the whole scene through ten tool calls. No text box anywhere.",
    href: "/work/world-explorer",
  },
  {
    year: 2026,
    month: 2,
    track: "hack",
    title: "Third place, solo, at the Gemini 3 Seoul Hackathon.",
    detail:
      "MangstoonAI: a selfie and a sentence become a 22-panel webtoon in under a minute. Built alone in seven hours against 111 teams of up to four, from 1,500 applicants. $20,000 in Google Cloud credits.",
    href: "/work/mangstoon-ai",
    mark: true,
  },
  {
    year: 2026,
    track: "life",
    title: "Spoke to 200+ people at KT Cloud on what an AI-native company actually looks like.",
    detail: "Not tools. Memory, context, and agents that can act inside the systems a company already uses.",
  },
  {
    year: 2025,
    month: 12,
    track: "work",
    title: "Jarvis — an autonomous Slack agent — rolled out company-wide.",
    detail:
      "Claude Agent SDK and MCP over Jira, PostgreSQL, GitHub, Sentry, AWS. Non-engineers debug customer issues and file tickets in plain language. Used daily across engineering, CS, and product.",
    href: "/work/jarvis",
    mark: true,
  },
  {
    year: 2025,
    track: "work",
    title: "Led the company's move to Claude Code.",
    detail: "Practice guides, evaluation and monitoring, automated review across the engineering org.",
  },
  {
    year: 2025,
    month: 8,
    track: "build",
    title: "Started the YouTube factory: twenty channels, one pipeline.",
    detail:
      "Script, metadata, thumbnail, images, video, speech, subtitles, assembly — Gemini and FFmpeg end to end. Seven channels reached monetisation. This version is retired; its successor is above.",
    href: "/work/content-factory",
  },
  {
    year: 2025,
    month: 6,
    track: "work",
    title: "FactChat reached 50+ universities.",
    detail:
      "MindLogic's enterprise chatbot platform. Multi-provider LLM gateway, RAG with quality monitoring, per-tenant credit metering, and a PromptOps layer for hallucination checks and prompt versioning.",
    href: "/work/factchat",
  },
  {
    year: 2025,
    month: 4,
    track: "build",
    title: "SmartEarthing — a small earthing-products store, profitable in its first year.",
    detail: "Sourced in China, sold on Coupang, aimed at customers over fifty. My first business with a real P&L.",
  },
  {
    year: 2025,
    month: 3,
    track: "work",
    title: "Director of Engineering at MindLogic.",
    detail:
      "Architecture, hiring, and engineering culture for fifteen engineers across three conversational-AI products, serving 50+ enterprise clients and 100,000+ users. Intern to director in five years.",
    mark: true,
  },
  {
    year: 2024,
    track: "work",
    title: "AI-ARS — a voice contact centre that answers real phone calls.",
    detail: "RAG over the company's knowledge, voice-activity detection, sub-second turns. Multilingual.",
  },
  {
    year: 2023,
    track: "work",
    title: "AI idol companions for K-pop fan engagement.",
    detail:
      "Cloned voices, persona memory that updates itself, role-play, face-reference image generation, a lip-sync video API. Long-term relationships at scale.",
  },
  {
    year: 2023,
    month: 6,
    track: "oss",
    title: "mediapipe-facelandmark-demo — 118 stars.",
    detail: "468 facial landmarks from a webcam, in the browser, no server. Still my most-starred repo.",
    href: "https://github.com/jays0606/mediapipe-facelandmark-demo",
  },
  {
    year: 2023,
    month: 3,
    track: "oss",
    title: "3d-avatar-controller.",
    detail: "A GLTF avatar you drive with WASD, in React Three Fiber.",
    href: "https://github.com/jays0606/3d-avatar-controller",
  },
  {
    year: 2023,
    month: 1,
    track: "work",
    title: "Opentown VTuber Studio — full-body motion capture onto 3D avatars, live.",
    detail: "Mediapipe pose, hands, and face; 52 ARKit blendshapes; VRM models; thirty frames a second.",
  },
  {
    year: 2022,
    month: 3,
    track: "work",
    title: "Back at MindLogic as Lead AI Engineer.",
    detail: "Three years leading the AI team through the companion and voice products above.",
  },
  {
    year: 2021,
    track: "work",
    title: "Software engineer at Common Computer.",
    detail: "Containerised chat applications that queried blockchain transactions.",
  },
  {
    year: 2021,
    month: 8,
    track: "life",
    title: "B.S. in Electrical and Electronic Engineering, Yonsei University.",
    detail: "",
  },
  {
    year: 2020,
    month: 7,
    track: "work",
    title: "Computer-vision intern at MindLogic.",
    detail: "Style transfer, face frontalisation, expression manipulation. The company I came back to.",
  },
  {
    year: 2019,
    track: "life",
    title: "Exchange year at Arizona State University.",
    detail: "The photo at the top of this page is from that December, under the Manhattan Bridge.",
  },
  {
    year: 2017,
    month: 3,
    track: "life",
    title: "Started at Yonsei.",
    detail: "Before that, five years growing up in China — which is where the Chinese comes from. Korean, English, Chinese, in that order.",
  },
];

export const YEARS = Array.from(new Set(RECORD.map((e) => e.year))).sort((a, b) => b - a);

export const MONTHS = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
