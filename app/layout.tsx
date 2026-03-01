import type { Metadata } from "next";
import { IBM_Plex_Sans, JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-display", weight: ["400", "500", "600", "700", "800"] });
const ibmPlexSans = IBM_Plex_Sans({ subsets: ["latin"], variable: "--font-body", weight: ["300", "400", "500", "600"] });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const BASE_URL = "https://jaehoshin.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Jaeho Shin — Engineering Director",
    template: "%s | Jaeho Shin",
  },
  description: "Engineering Director @ Mindlogic. I build AI products that ship — from hackathon prototypes to platforms serving 50+ enterprise clients.",
  keywords: ["Jaeho Shin", "AI Engineer", "Engineering Director", "Mindlogic", "Claude Code", "Google ADK", "MCP", "LLMs", "Full Stack", "Seoul"],
  authors: [{ name: "Jaeho Shin", url: BASE_URL }],
  creator: "Jaeho Shin",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Jaeho Shin",
    title: "Jaeho Shin — Engineering Director",
    description: "Engineering Director @ Mindlogic. I ship AI that works — not demos.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jaeho Shin — Engineering Director" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jaeho Shin — Engineering Director",
    description: "Engineering Director @ Mindlogic. I ship AI that works — not demos.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: BASE_URL },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${ibmPlexSans.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Jaeho Shin",
              url: BASE_URL,
              image: `${BASE_URL}/profile-hero.jpg`,
              jobTitle: "Engineering Director",
              worksFor: { "@type": "Organization", name: "Mindlogic Inc.", url: "https://mindlogic.ai" },
              alumniOf: { "@type": "CollegeOrUniversity", name: "Yonsei University" },
              knowsAbout: ["Artificial Intelligence", "Large Language Models", "Claude Code", "Google ADK", "MCP", "Full Stack Development"],
              sameAs: [
                "https://github.com/jays0606",
                "https://linkedin.com/in/jays0606",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
