import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk, Nanum_Myeongjo, Geist_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const nanum = Nanum_Myeongjo({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-kr", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const BASE_URL = "https://jaehoshin.com";

const TITLE = "Jaeho Shin";
const DESCRIPTION =
  "One engineer, one GPU, and a lot of agents. Director of Engineering at MindLogic in Seoul; builds AI media, apps, and agents as VibeRick. A dated record of what shipped.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { default: TITLE, template: "%s — Jaeho Shin" },
  description: DESCRIPTION,
  keywords: ["Jaeho Shin", "신재호", "AI engineer", "MindLogic", "VibeRick", "Claude Code", "MCP", "Gemini", "Seoul", "agents"],
  authors: [{ name: "Jaeho Shin", url: BASE_URL }],
  creator: "Jaeho Shin",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: TITLE,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
  alternates: { canonical: BASE_URL },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${hanken.variable} ${nanum.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Jaeho Shin",
              alternateName: "신재호",
              url: BASE_URL,
              image: `${BASE_URL}/portrait.jpg`,
              jobTitle: "Director of Engineering",
              worksFor: { "@type": "Organization", name: "MindLogic", url: "https://mindlogic.ai" },
              alumniOf: { "@type": "CollegeOrUniversity", name: "Yonsei University" },
              knowsLanguage: ["ko", "en", "zh"],
              knowsAbout: ["AI agents", "Large language models", "MCP", "Claude Code", "Gemini", "Text to speech", "Video generation"],
              sameAs: ["https://github.com/jays0606", "https://linkedin.com/in/jays0606"],
            }),
          }}
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
