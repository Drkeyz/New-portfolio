/**
 * All site-wide copy lives here. Edit text in this file, not in components.
 * Search the repo for [VERIFY], [PLACEHOLDER] and [MEDIA] (or run `npm run todo`)
 * to find every slot that still needs real content.
 */

export const site = {
  name: "Oladimeji Adebiyi",
  shortName: "Oladimeji",
  artistName: "Drkeyz",
  role: "Product Designer & Design Engineer",
  location: "Lagos, Nigeria",
  email: "dimeji.adebiyi1@gmail.com",
  availability: "Open to freelance & full-time",
  // Used for canonical URLs, sitemap and Open Graph. Override with NEXT_PUBLIC_SITE_URL on Vercel.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://drkeyz.com",
  description:
    "Oladimeji Adebiyi is a product designer and design engineer turning complex problems into clear, useful digital products across DeFi, food delivery, HR tech and AI support.",
  // Drop the PDF at /public/cv/oladimeji-adebiyi-cv.pdf and the link appears automatically.
  cvPath: "/cv/oladimeji-adebiyi-cv.pdf",
};

export const socials = {
  email: { label: "Email", href: `mailto:${site.email}` },
  linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/oladimeji-adebiyi/" },
  behance: { label: "Behance", href: "https://www.behance.net/dimejiadebiyi" },
  dribbble: { label: "Dribbble", href: "https://dribbble.com/Drkeyz" },
  instagram: { label: "Instagram", href: "https://instagram.com/drkeyzofficial" },
  tiktok: { label: "TikTok", href: "https://www.tiktok.com/@drkeyzofficial" },
  x: { label: "X", href: "https://x.com/_holadimeji_" },
  fanlink: { label: "Fanlink", href: "https://drkeyz.fanlink.tv/Tearstotambourine" },
} as const;

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Creative", href: "/#creative" },
  { label: "Contact", href: "/#contact" },
];

export const hero = {
  headline: { lead: "I design products people understand, use, and", accent: "remember." },
  intro:
    "Product designer and design engineer turning complex problems into clear, useful, and engaging digital experiences.",
  location: "Open to freelance & full-time roles",
  primaryCta: { label: "View selected work", href: "#work" },
  secondaryCta: { label: "Let's talk", href: "#contact" },
  portraitAlt: "Oladimeji Adebiyi, portrait in black and white",
};

export const work = {
  title: "Selected work",
  intro: "Products, interfaces, and systems I've designed across very different problems.",
};

export const approach = {
  headline: "Good design starts before the pixels.",
  principles: [
    "Understand the problem",
    "Understand the people",
    "Make complexity feel simple",
    "Design, test, refine",
  ],
  statement: { lead: "I don't design screens. I design the experience", accent: "between", tail: "them." },
};

export const about = {
  headline: "Designer by profession. Creative by nature.",
  pullQuote: "Rhythm, structure, timing, and knowing when to leave space.",
  bio: [
    "I've always been curious about how things work, and how they make people feel. I came to product design from a degree in Chemistry Education at the University of Lagos, which taught me how people learn and where they get stuck.",
    "Outside the screen I make music, play piano and trumpet, and take photographs. Different disciplines, surprisingly similar thinking: rhythm, structure, timing, emotion, and knowing when to leave space.",
  ],
  proofPoint:
    "I've worked with cross-functional teams to drive a 30% improvement in user satisfaction on key projects.",
  // Most recent first.
  timeline: [
    { role: "Lead Product Designer", org: "Juncta", dates: "06/2026 – 09/2026" },
    { role: "Product Designer", org: "Chams Access", dates: "06/2025 – 05/2026" },
    { role: "Lead Product Designer", org: "Cargoland Food", dates: "03/2025 – 06/2025" },
    { role: "Product Designer", org: "Depha Labs", dates: "10/2023 – 02/2025" },
    { role: "Product Designer", org: "Asphalt Xpress", dates: "04/2023 – 07/2023" },
    { role: "Product Designer", org: "I4G x Zuri", dates: "2023" },
  ],
  skills: [
    "User Research",
    "Usability Testing",
    "Wireframing",
    "Prototyping",
    "Interface Design",
    "Brand Design",
    "Design Systems",
    "Design Thinking",
    "Data Analysis",
    "Visual Storytelling",
  ],
  // [PLACEHOLDER: other tools]
  tools: ["Figma", "Miro", "Whimsical"],
  // Most recent first.
  certifications: [
    "Fundamental Skills in Engineering Design — University of Leeds, 2026",
    "Brand Identity and Strategy — IE Business School, 2026",
    "Claude Code in Action — Anthropic, 2026",
    "Conduct UX Research and Test Early Concepts — Google, 2023",
    "Foundations of User Experience (UX) Design — Google & Coursera",
    "Camera Control — Coursera",
    "Cameras, Exposure, and Photography — Coursera",
  ],
};

export const creative = {
  eyebrow: "Beyond the interface.",
  intro: "Design is what I do. Creativity is how I see.",
  release: {
    title: "Tears to Tambourine",
    artist: "Drkeyz",
    href: "https://drkeyz.fanlink.tv/Tearstotambourine",
    artwork: "/images/releases/biza-so-we-say.jpg" as string | null,
    // [PLACEHOLDER] Audio preview: add an MP3 under /public/audio/ and set the path here.
    // While this is null the play button links out to Fanlink instead.
    audio: null as string | null,
  },
  // [PLACEHOLDER: other releases] — same shape as `release`.
  otherReleases: [] as { title: string; href: string; artwork: string | null }[],
  // Soft pieces that play over the Piano and Trumpet photographs, only when a visitor asks.
  // [PLACEHOLDER] These are stand-ins by other musicians, credited on the page. Replace each with
  // a recording of Oladimeji's own playing (same path, or update src), then update title + credit.
  performances: {
    piano: {
      src: "/audio/piano-soft.m4a",
      instrument: "Piano",
      title: "Waltz in A minor",
      // Public domain: https://commons.wikimedia.org/wiki/File:Chopin_-_Waltz_No._19_in_A_minor,_B._150_(Aya_Higuchi).flac
      credit: "Chopin, played by Aya Higuchi",
    },
    trumpet: {
      src: "/audio/trumpet-soft.mp3",
      instrument: "Trumpet",
      title: "Quiet Night",
      // CC0: https://freesound.org/s/730752/
      credit: "Gary Rea",
    },
  },
  photographs: [
    {
      src: "/images/photography/piano-clavinova.jpg" as string | null,
      alt: "Oladimeji at a Clavinova piano under pink and violet stage light",
      label: "At the Clavinova",
      width: 2000,
      height: 1428,
    },
    {
      src: "/images/photography/keys-stage.jpg" as string | null,
      alt: "Oladimeji at a Yamaha keyboard in front of a violet patterned backdrop",
      label: "On keys",
      width: 2000,
      height: 1428,
    },
    {
      src: "/images/photography/trumpet-soundcheck.jpg" as string | null,
      alt: "Oladimeji playing trumpet beside a mixing desk",
      label: "Horn, at soundcheck",
      width: 1010,
      height: 1267,
    },
  ],
};

export const contact = {
  lines: ["Let's", "make", "something", "good."],
  sayHello: "Say hello",
  footer: "Designed & built by Oladimeji. Soundtrack by Drkeyz.",
};
