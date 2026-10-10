/**
 * Project index. To add a project:
 *   1. Add an entry to `projects` below.
 *   2. Optionally add content/work/<slug>.mdx and set `caseStudy: true`.
 *   3. Put screens in /public/images/<slug>/ and set `media.src`.
 */

export type Media = {
  /** Path under /public, e.g. "/images/juncta/pools.png". null renders a labelled [MEDIA] placeholder. */
  src: string | null;
  alt: string;
  /** Native pixel size of the image (or the intended size while it's a placeholder). */
  width: number;
  height: number;
  /** Shown inside the placeholder so it's obvious what goes there. */
  label: string;
  /**
   * Panel colour for images smaller than their slot: the image is shown at
   * native size, centred on this colour, instead of being stretched.
   * Remove once a high-resolution export (2x) is in place.
   */
  matte?: string;
  /** Max width of a matted image, as % of the panel (default 88). */
  inset?: number;
};

export type ProjectTheme = {
  /** Placeholder / card background. */
  bg: string;
  /** Text colour on top of `bg`. */
  fg: string;
  /** Accent used by the cursor on the case study page. */
  accent: string;
};

export type Project = {
  slug: string;
  index: string;
  name: string;
  industry: string;
  role: string;
  year: string;
  platform: string;
  description: string;
  oneLiner: string;
  capabilities: string[];
  links: { label: string; href: string }[];
  layout: "lead" | "offset" | "full" | "split";
  media: Media;
  theme: ProjectTheme;
  caseStudy: boolean;
  /** Short factual highlights (sourced from drkeyz.com case studies). */
  highlights?: string[];
  /** Open questions, shown only in development. */
  verify?: string[];
};

const neutral: ProjectTheme = { bg: "#E6E6E1", fg: "#0E0E0E", accent: "#0E0E0E" };

export const projects: Project[] = [
  {
    slug: "juncta",
    index: "01",
    name: "Juncta",
    industry: "DeFi",
    role: "Lead Product Designer",
    year: "Jun–Sep 2026",
    platform: "Web app · Design system",
    description:
      "A DLMM liquidity market maker with lending built in. Idle capital in the DEX earns yield in the lending market without the user routing it there.",
    oneLiner:
      "35 production-ready screens and a full design system in 17 weeks. The first DLMM designed for a Move chain.",
    capabilities: ["UX research", "Product design", "Design system"],
    links: [
      { label: "juncta.xyz", href: "https://www.juncta.xyz" },
      { label: "Launch app", href: "https://app.juncta.xyz" },
    ],
    layout: "lead",
    media: {
      src: "/images/juncta/pools.png",
      alt: "Juncta pools dashboard: total value locked, lending supplied, top pools table and protocol overview",
      width: 2880,
      height: 1726,
      label: "Juncta — Pools dashboard",
    },
    theme: { bg: "#07090D", fg: "#F5F5F2", accent: "#17CFAA" },
    caseStudy: true,
  },
  {
    slug: "cargoland-food",
    index: "02",
    name: "Cargoland Food",
    industry: "Food delivery",
    role: "Lead Product Designer",
    year: "Mar–Jun 2025",
    platform: "Web + mobile",
    description:
      "A Nigerian-built marketplace where consumers, businesses, and riders order, sell, and deliver.",
    oneLiner:
      "Led design from research to release. The consumer app is live on Google Play, with a design system built to scale to the vendor and rider apps.",
    capabilities: ["UX research", "Product design", "Design system", "Brand identity"],
    links: [{ label: "cargolandfood.com", href: "https://www.cargolandfood.com" }],
    highlights: ["100+ screens", "3 user types", "Consumer app, merchant dashboard, rider app"],
    layout: "offset",
    media: {
      src: "/images/cargoland/cover.png",
      alt: "Three Cargoland Food app screens held in hand: markets, home with categories and featured food, and a drinks listing",
      width: 2880,
      height: 1723,
      label: "Cargoland Food — consumer app screens",
    },
    theme: { bg: "#FBF6F1", fg: "#1E140E", accent: "#C2410C" },
    caseStudy: true,
    verify: [
      "[VERIFY metric: e.g. checkout steps reduced, onboarding completion, Play Store rating]",
      "[VERIFY: is the Behance \"Food Vendor Mobile App\" project part of Cargoland? If so, use its screens here.] https://www.behance.net/gallery/241654589/Food-Vendor-Mobile-App",
    ],
  },
  {
    slug: "orgsphere",
    index: "03",
    name: "Orgsphere",
    industry: "HR tech",
    role: "Product Designer @ Chams Access",
    year: "2025",
    platform: "Mobile",
    description:
      "A mobile HR platform for leave requests, expense tracking, performance appraisals, and company activities.",
    oneLiner: "HR management that fits in an employee's pocket.",
    capabilities: ["UX research", "Product design", "Visual system"],
    links: [],
    highlights: ["5 core modules", "40+ screens", "3 user roles"],
    layout: "full",
    media: {
      src: "/images/orgsphere/cover.png",
      alt: "Orgsphere case study cover: an activities list, the employee home with today's overview and recent leave requests, and all leaves, on a dark puzzle-pattern background",
      width: 2880,
      height: 1787,
      label: "Orgsphere — mobile screens",
    },
    theme: { bg: "#F6FAF7", fg: "#0F1F16", accent: "#08783D" },
    caseStudy: true,
    verify: [
      "[VERIFY: is the Behance \"HR Mobile App Platform\" project Orgsphere? If so, use its screens here.] https://www.behance.net/gallery/245314671/HR-Mobile-App-Platform",
      "[VERIFY metric]",
    ],
  },
  {
    slug: "help-nest",
    index: "04",
    name: "Help Nest",
    industry: "AI support",
    role: "Product Designer @ Chams Access",
    year: "2025",
    platform: "Web dashboards",
    description:
      "An AI-powered support platform. Led extensive user research; designed the Admin and Super-admin dashboards.",
    oneLiner: "Research-led dashboards that give support teams control over AI-assisted support.",
    capabilities: ["User research", "Dashboard design", "Information architecture"],
    links: [],
    highlights: ["30+ dashboard screens", "Admin + Super-admin views"],
    layout: "split",
    media: {
      src: "/images/helpnest/cover.png",
      alt: "Helpnest admin dashboard: total conversations, bot resolved, satisfaction rate, escalations, response time, active chats and a seven-day conversation volume chart",
      width: 2880,
      height: 1787,
      label: "Help Nest — Admin dashboard",
    },
    theme: { bg: "#F5F8FB", fg: "#0E1B26", accent: "#2F6D9B" },
    caseStudy: true,
    verify: [
      "[VERIFY metric: drkeyz.com shows 87% bot resolution, 4.5/5 CSAT, 4.2m avg handling time. Are these measured results or dashboard sample data?]",
    ],
  },
];

export const alsoWorkedOn = [
  {
    name: "PenCentral",
    context: "Chams Access",
    description: "Refined UX for one of Nigeria's leading pension remittance platforms.",
    href: "https://pencentral.ng/" as string | null,
  },
  {
    name: "ARGUS",
    context: "Depha Labs · 2023",
    description: "On-chain analysis research; beta landing page, beta dashboard, and brand logo.",
    href: "https://www.behance.net/gallery/217916047/Blockchain-Analysis-Platform",
  },
  {
    name: "Crypto to Local Currency Exchange App",
    context: "Personal project",
    description: "A mobile app for converting crypto into local currency.",
    href: "https://www.behance.net/gallery/224697463/Overview-of-a-Crypto-to-Local-Currency-Exchange-App",
  },
  {
    name: "QuickTerms",
    context: "I4G x Zuri · 2023",
    description:
      "A T&C and privacy policy generator. 90% user satisfaction in testing, 1,000+ users, 40% fewer design errors.",
    href: "https://www.behance.net/gallery/151559535" as string | null,
  },
  {
    name: "Asphalt Xpress",
    context: "2023",
    description: "Personas and empathy maps; prototypes that cut development iteration time by 20%.",
    href: "https://www.behance.net/gallery/151420029" as string | null,
  },
];

export type Showcase = Media & {
  href: string;
  year: string;
  kind: string;
  /** Set when the piece has its own page at /work/<slug> (content/showcase/<slug>.mdx). */
  slug?: string;
  /** A short note revealed on hover / focus (and always shown on touch). */
  note?: { badge: string; title: string; body: string };
};

// Design showcases: a visual strip on the home page. Ones with a `slug` open an in-site page.
export const landingPages: Showcase[] = [
  {
    src: "/images/landing/lighter-of-lives.png",
    alt: "Lighter of Lives Foundation charity landing page",
    width: 1280,
    height: 766,
    label: "Lighter of Lives Foundation",
    year: "2025",
    kind: "Website · Pro bono",
    slug: "lighter-of-lives",
    href: "/work/lighter-of-lives",
    note: {
      badge: "Pro bono",
      title: "Designed at no cost.",
      body: "Lighter of Lives works to get out-of-school children back into classrooms. Designing their website, free of charge, was a small way to stand beside that work.",
    },
  },
  {
    src: "/images/landing/argus.png",
    alt: "Argus AI-powered blockchain analytics landing page",
    width: 1922,
    height: 1150,
    label: "Argus",
    year: "2023",
    kind: "UI Design",
    href: "https://www.behance.net/gallery/217916047/Blockchain-Analysis-Platform",
  },
  {
    src: "/images/landing/skillloop.jpg",
    alt: "SkillLoop's welcome screen, Teach what you know, learn what you don't, on a phone held in hand",
    width: 2400,
    height: 1800,
    label: "SkillLoop Mobile App",
    year: "",
    kind: "Mobile design · Personal project",
    href: "https://www.behance.net/gallery/231237699/SkillLoop-Mobile-App",
  },
  {
    src: "/images/landing/sneakershop.jpg",
    alt: "SneakerShop mobile app: the Explore screen with sneaker categories, popular sneakers and a student discount",
    width: 2560,
    height: 1532,
    label: "SneakerShop Mobile",
    year: "2023",
    kind: "Mobile design",
    slug: "sneakershop",
    href: "/work/sneakershop",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const nextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};

/** True when a string still contains an unresolved content slot. */
export const isPending = (value: string) => /\[(VERIFY|PLACEHOLDER|MEDIA)/.test(value);

export const showcases = landingPages.filter((l): l is Showcase & { slug: string } => Boolean(l.slug));
export const getShowcase = (slug: string) => showcases.find((s) => s.slug === slug);
export const nextShowcase = (slug: string) => {
  const i = showcases.findIndex((s) => s.slug === slug);
  return showcases[(i + 1) % showcases.length];
};
