import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Instrument_Serif, Space_Grotesk } from "next/font/google";
import { site, socials } from "@content/site";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { PianoDock } from "@/components/piano/PianoDock";
import { RevealObserver } from "@/components/RevealObserver";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

// Only used on case studies that ask for it in frontmatter.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.description,
    url: site.url,
  },
  twitter: { card: "summary_large_image", creator: "@_holadimeji_" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F5F2" },
    { media: "(prefers-color-scheme: dark)", color: "#0D0D0E" },
  ],
};

// Person schema linking the designer and artist identities.
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.artistName,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  url: site.url,
  knowsAbout: ["Product design", "User research", "Design systems", "Accessibility", "Music", "Photography"],
  sameAs: [
    socials.linkedin.href,
    socials.behance.href,
    socials.dribbble.href,
    socials.instagram.href,
    socials.tiktok.href,
    socials.x.href,
    socials.fanlink.href,
  ],
};

// Runs before first paint: enables reveal styles, and skips the intro after the first visit this session.
// Also applies the saved (or OS) colour theme, so there's no flash of the wrong one.
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))d.classList.add('dark')}catch(e){}try{if(sessionStorage.getItem('intro-seen')){d.classList.add('intro-seen')}else{sessionStorage.setItem('intro-seen','1')}}catch(e){d.classList.add('intro-seen')}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${inter.variable} ${instrumentSerif.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="fixed left-4 top-4 z-[200] -translate-y-24 bg-coal px-4 py-3 text-snow focus:translate-y-0"
        >
          Skip to content
        </a>
        <Navigation />
        {children}
        <Footer />
        <RevealObserver />
        <PianoDock />
        <Cursor />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
