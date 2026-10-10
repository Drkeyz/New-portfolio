You are a world-class senior product designer, creative director, and front-end engineer. Design and build a premium personal portfolio website for Oladimeji Adebiyi.

Use Apple's design discipline — clarity, typography, hierarchy, restraint — but give the site a distinctive identity of its own. It should feel like a high-end design studio portfolio crossed with a contemporary editorial magazine, with a subtle artistic personality. Art-directed, not template-driven.

====================================================
BUILD ORDER (work in this sequence; finish each phase before the next)
====================================================
Phase 1 — Foundation + home page: design tokens, fonts, grid, Navigation, Hero, Selected Work, Design Approach, About, Creative, Contact, Footer.
Phase 2 — MDX case study template + the full Juncta case study.
Phase 3 — Polish: custom cursor, scroll-scrubbed light-to-dark Creative transition, music player, load sequence, piano easter egg, SEO/OG image, Lighthouse pass.
If you run short on output, stop at the end of a phase and say which phase is next. Never silently drop a section.

====================================================
WHO HE IS
====================================================
- Name: Oladimeji Adebiyi (artist name: Drkeyz)
- Primary identity: Product Designer, 3+ years, Lagos, Nigeria. Turns complex problems into clear, useful digital products across DeFi, food delivery, HR tech, and AI support tools. Strong focus on usability and accessibility.
- Secondary identity: Musical artist, pianist, trumpeter, and photographer.
- Proof point: Collaborated with cross-functional teams to drive a 30% improvement in user satisfaction on key projects.
- Current: Product Designer at Chams Access (06/2025 – present)
- Availability: Open to freelance and full-time roles
- Email: dimeji.adebiyi1@gmail.com

Within 10 seconds a visitor should know WHO (Oladimeji Adebiyi), WHAT (Product Designer), WHERE (Lagos, Nigeria), and WHY (he makes complex problems feel simple). As they explore, they discover the artist.

The intended reaction, in order:
1. "This person understands product."
2. "This person has unusually strong creative range."
3. "I want to talk to them."
Never: "This is a musician who also does design." Design stays dominant (~75% of the site).

====================================================
CREATIVE CONCEPT: RHYTHM
====================================================
Rhythm is the invisible principle connecting design and music. Do NOT theme the site literally around music (no piano-key graphics, no music-note icons). Express rhythm through:
- Repeated visual beats and a consistent spacing scale
- Intentional whitespace and visual pauses
- Sequential, staggered animations with deliberate timing
- Scroll pacing: dense moments followed by breathing room
- Typographic rhythm
The site should feel like a well-composed piece of music. Minimal at first glance, deep on exploration, memorable without being loud.

Do NOT make it look like: a generic SaaS landing page, a Webflow template, a gradient-heavy Dribbble shot, a cyberpunk/futuristic site, a developer portfolio, an animation showcase, or a music artist website.

====================================================
VISUAL DESIGN
====================================================
Palette (monochrome foundation, CSS variables). Contrast ratios are measured and must be respected:

Light sections (background --paper #F5F5F2):
- --ink #0E0E0E — primary text (≈18:1)
- --ink-muted #6B6B66 — secondary/meta text (≈4.9:1, passes AA for body text)
- --line #8A8A85 — hairlines, dividers, non-text UI only (≈3.2:1, fails for body text: never use it for text on light backgrounds)
- --brass #C89B3C — DECORATIVE ONLY on light backgrounds (≈2.3:1): dots, rules, the availability indicator, underlines. Never text.

Dark sections (Creative, background --stage #0B0B0C):
- --paper #F5F5F2 for primary text
- --ink-muted-dark #8A8A85 for secondary text (≈5.6:1, passes)
- --brass #C89B3C may be used for text and highlights here (≈7.7:1, passes)

Typography (all from Google Fonts via next/font/google; do not use fonts that need a licence):
- Display: "Inter Tight", weights 500–700, large editorial sizes via clamp(), tight tracking (-0.03em). Preload it.
- Body: "Inter", 17–18px, line-height 1.6.
- Accent: "Instrument Serif" italic, for single emotional words only (e.g. *remember*).
- Juncta case study display: "Space Grotesk".

Rules: rely on typography, spacing, imagery, and composition. Avoid heavy rounded cards, shadows, gradients, and glassmorphism. 12-column grid, max width ~1280px, generous margins.

====================================================
IMAGERY (important)
====================================================
Oladimeji does NOT want many pictures of himself. Use exactly THREE personal photos on the whole site, nowhere else. All files already exist in /public/images:

- portrait-hero-bw.jpg (2000×2500, 4:5, black-and-white) → Hero only. Neutral portrait against a textured grey wall; white cap, round sunglasses, dark zip knit over shirt and striped tie. Subject is right of centre, looking left, so place the headline to the LEFT of the image, overlapping the left edge. A colour version (portrait-hero.jpg) exists but use the black-and-white one.
  Alt: "Oladimeji Adebiyi, portrait in black and white"

- piano-stage.jpg (2248×1600, landscape) → Creative section, PIANO subsection. He plays a two-tier keyboard on stage, with band members behind him under heavy purple stage lighting. The hands and keyboards sit in the right half and lower half of the frame: crop tight there as the image enters, then widen to the full frame on scroll. Colour-grade it with CSS (e.g. grayscale(0.85) + brightness(0.8) + a warm brass multiply overlay) so the purple doesn't fight the charcoal/brass stage palette.
  Alt: "Oladimeji playing keyboards on stage with a live band"

- trumpet-stage.jpg (1108×1420, portrait, SMALL) → Creative section, TRUMPET subsection. He plays trumpet into a microphone in front of a bright magenta/orange LED screen with partial text at the top. Crop out the top ~20% (LED text) and start tight on the trumpet and hands (centre-left, mid-height), widening on scroll. Grade it hard with the same treatment as the piano, plus a darker vignette, because the LED background is very saturated. Because it is only 1108px wide, NEVER render it full-bleed: cap it at ~7 of 12 columns / max 1108px rendered width, and pair it with typography or cover art to fill the composition.
  Alt: "Oladimeji playing trumpet on stage"

No other photos of him anywhere: none in About, no gallery, no repeated headshots, and no photo of him in the Open Graph image.
In the Creative section, supporting visuals come from release cover art and atmospheric textures (CSS/SVG grain, soft spotlight gradients), not more photos of him.

All other imagery is product work: dashboard screens, mobile screens, flows, wireframes, design-system details (the main visual language of the site). Treat it editorially: full-bleed moments, asymmetric crops, overlapping screens, device frames used sparingly, large detail crops of UI. Never use stock photos.
Use supplied images as-is via next/image (AVIF/WebP, responsive `sizes`, blur placeholders). Never upscale beyond native resolution; if an image is too small for its slot, use a smaller composition or a device frame.
Project screens folders (currently EMPTY, to be filled later): /public/images/juncta/, /cargoland/, /orgsphere/, /helpnest/. Until real screens exist, render a clearly labelled neutral placeholder block ("[MEDIA] Juncta — Pools dashboard, 1600×1000") at the intended aspect ratio, so the layout is final and swapping is a one-line change. Do NOT generate fake UI screenshots.
Other empty folders: /public/images/releases/ (cover art), /public/images/photography/ (his photos of places and objects).

====================================================
NAVIGATION
====================================================
Fixed and minimal. Left: "Oladimeji" wordmark. Right: Work, About, Creative, Contact. Small availability indicator (brass dot + "Open to freelance & full-time" in --ink-muted) and a live Lagos time (WAT, Africa/Lagos timezone). Becomes more compact after scrolling; hides on scroll down, returns on scroll up (always visible when it contains keyboard focus). Mobile: minimal menu button opening a fullscreen overlay with large type; the overlay traps focus, closes on Escape, and returns focus to the button.

====================================================
SITE STRUCTURE
====================================================

1. HERO (most of the first viewport)
Headline: "I design products people understand, use, and *remember*." (*remember* in Instrument Serif italic)
Intro: "Product designer turning complex problems into clear, useful, and engaging digital experiences."
Location line: "Lagos, Nigeria · Open to freelance & full-time"
CTAs: "View selected work" (primary, scrolls to #work), "Let's talk" (secondary, scrolls to #contact).
Visual: portrait-hero-bw.jpg in an editorial magazine composition: a tall crop occupying roughly 5 of 12 columns on the right, bleeding off the right edge, with the oversized headline overlapping the image's left edge. Never a circular profile photo. The image reveals with a slow vertical unmask on load. Load it with `priority`. Let the top of the first Selected Work project peek above the fold. Calm and confident.

2. SELECTED WORK (id="work", the most important section)
Title: "Selected work". Supporting line: "Products, interfaces, and systems I've designed across very different problems."
Asymmetric editorial layout, NOT a 3-column grid:
- 01: large visual ~65–70% width
- 02: smaller, offset below/right
- 03: full-width
- 04: split layout
Each preview: name, one-line description, role, industry, year, capabilities, large visual.
Hover/focus: image scales subtly, title shifts slightly, extra info reveals, cursor reads "View case study". The extra info must also be visible on touch devices and on keyboard focus. Intentional, never over-animated.
Only Juncta has a case study page for now. For 02–04, link to /work/[slug] pages that render a "Case study in progress" state with the overview content below, rather than a 404.

[01] JUNCTA — DeFi · Lead Product Designer · Mar–Apr 2026 (6-week intensive) · Designed for Cedra, now live on Solana devnet
- A DLMM-based liquidity market maker with a fully integrated lending protocol. Idle capital in the DEX automatically earns yield in the lending market without the user routing it there.
- Capabilities: UX research, product design, design system.
- One-liner: "35 production-ready screens and a full design system in 6 weeks. The first DLMM designed for a Move chain."
- Links: https://www.juncta.xyz · https://app.juncta.xyz

[02] CARGOLAND FOOD — Food delivery · Lead Product Designer · 03/2025 – 06/2025 · Web + mobile
- A Nigerian food delivery platform connecting customers with restaurants, vendors, and riders.
- Led UX across web and mobile; wireframes, flows, prototypes, high-fidelity UI; research to validate decisions; built the design system and brand identity; partnered with developers through implementation.
- One-liner: "Led design from research to release. The consumer app is live on Google Play, with a design system built to scale to the vendor and rider apps."
- [VERIFY metric: e.g. checkout steps reduced, onboarding completion, Play Store rating]
- [VERIFY: is the Behance "Food Vendor Mobile App" project part of Cargoland? If so, use its screens here.]
- Link: https://www.cargolandfood.com

[03] ORGSPHERE — HR tech · Product Designer @ Chams Access · 2025 · Mobile
- A mobile HR management application, designed end to end. [VERIFY scope: e.g. leave, attendance, payslips, directory]
- One-liner: "HR management that fits in an employee's pocket."
- [VERIFY: is the Behance "HR Mobile App Platform" project Orgsphere? If so, use its screens here.]
- [VERIFY metric]

[04] HELP NEST — AI support · Product Designer @ Chams Access · 2025 · Web dashboards
- An AI-powered support platform. Led extensive user research; designed Admin and Super-admin dashboards.
- One-liner: "Research-led dashboards that give support teams control over AI-assisted support."
- [VERIFY metric]

"Also worked on" (compact text row below, each linking to its Behance project where one exists; use https://www.behance.net/dimejiadebiyi as the link until the exact project URL is supplied, marked [VERIFY link]):
- PenCentral (Chams Access): refined UX for one of Nigeria's leading pension remittance platforms.
- ARGUS (Depha Labs, 2023–2025): on-chain analysis research; beta landing page, beta dashboard, brand logo. (Behance: Blockchain Analysis Platform)
- SkillLoop Mobile App: [VERIFY: one-line description, role, year]
- Crypto to Local Currency Exchange App: [VERIFY: one-line description, role, year]
- QuickTerms (I4G x Zuri, 2023): T&C and privacy policy generator — 90% user satisfaction in testing, 1,000+ users, 40% fewer design errors.
- Asphalt Xpress (2023): personas and empathy maps; prototypes that cut development iteration time by 20%.
- Landing pages: Charity, Financial Investment, Logistics, Car Dealership — shown as a small visual strip of thumbnails ([MEDIA] placeholders for now) rather than case studies.

3. DESIGN APPROACH
Headline: "Good design starts before the pixels."
Four principles, typographic (not cards), revealing in sequence on scroll:
01 Understand the problem · 02 Understand the people · 03 Make complexity feel simple · 04 Design, test, refine
Statement: "I don't design screens. I design the experience between them."
Plain vertical layout on all breakpoints (no horizontal scroll), with the principles composed asymmetrically across the grid on desktop.

4. ABOUT (id="about")
Headline: "Designer by profession. Creative by nature."
No photo here. Make it typographic: an oversized pull-quote, the bio in a narrow readable column (~60ch), and the timeline as a clean two-column list. Let whitespace do the work.
Bio (use as written, first person):
"I've always been curious about how things work, and how they make people feel. I came to product design from a degree in Chemistry Education at the University of Lagos, which taught me how people learn and where they get stuck. Outside the screen I make music, play piano and trumpet, and take photographs. Different disciplines, surprisingly similar thinking: rhythm, structure, timing, emotion, and knowing when to leave space."
Pull-quote: "Rhythm, structure, timing, and knowing when to leave space."
Experience timeline (current role first, then most recent first):
- Product Designer · Chams Access · 06/2025 – present
- Lead Product Designer · Juncta · 03/2026 – 04/2026 (project engagement alongside Chams Access)
- Lead Product Designer · Cargoland Food · 03/2025 – 06/2025
- Product Designer · Depha Labs · 10/2023 – 02/2025
- Product Designer · Asphalt Xpress · 04/2023 – 07/2023
- Product Designer · I4G x Zuri · 2023
Skills: User Research · Usability Testing · Wireframing · Prototyping · Interface Design · Design Systems · Design Thinking · Data Analysis · Visual Storytelling
Tools: Figma · Miro · Whimsical [PLACEHOLDER: other tools]
Certifications: Google UX Design Foundations; Google Conduct UX Research and Test Early Concepts; Coursera Camera Control; Coursera Cameras, Exposure & Photography.

5. CREATIVE LIFE (id="creative") — "Beyond the interface."
The signature moment of the site. As this section enters, the page background transitions smoothly (scroll-scrubbed, via a background-color/opacity layer, not by repainting every element) from --paper to --stage #0B0B0C, with warm brass highlights and a soft spotlight. Text colours swap to the dark-section tokens at the same time so contrast never dips below AA mid-transition. Same typography and grid, so it's still one identity — design is light and structured, creative life is dark and atmospheric. Reverses on scroll back up.
Intro: "Design is what I do. Creativity is how I see."
Subsections: MUSIC · PIANO · TRUMPET · PHOTOGRAPHY
- PIANO: piano-stage.jpg (see Imagery for crop and grade).
- TRUMPET: trumpet-stage.jpg (see Imagery: never full-bleed).
- MUSIC: release cover art from /public/images/releases/ ([MEDIA] placeholder until supplied) and atmospheric textures.
- PHOTOGRAPHY: his own photographs of places and objects from /public/images/photography/ ([MEDIA] placeholders until supplied), never photos of him. If the folder is empty, show the section with placeholders, not an empty gap.
- Performance clips are optional, linked out rather than embedded.
- Custom minimal music player (not Spotify-looking, never autoplays): artwork, title, artist, play/pause button with aria-label and aria-pressed, release link. Audio source: [PLACEHOLDER: /public/audio/tears-to-tambourine-preview.mp3]; if no audio file is present, the play button becomes "Listen on Fanlink ↗" and links out.
  Featured release: "Tears to Tambourine" by Drkeyz → https://drkeyz.fanlink.tv/Tearstotambourine
  [PLACEHOLDER: other releases]
- CTA: "Listen to my music" → the Fanlink URL.
- Links: Instagram (https://instagram.com/drkeyzofficial), TikTok (https://www.tiktok.com/@drkeyzofficial), Fanlink.

6. CONTACT (id="contact")
Returns to the light palette. Large, memorable typographic close, each line animating in:
LET'S
MAKE
SOMETHING
GOOD.
Large "Say hello →" button that copies dimeji.adebiyi1@gmail.com to the clipboard and shows "Copied ✓" (announced via an aria-live region). If the Clipboard API is unavailable, fall back to a mailto: link.
Links: Email (mailto), LinkedIn (https://www.linkedin.com/in/oladimeji-adebiyi/), Behance (https://www.behance.net/dimejiadebiyi), Dribbble (https://dribbble.com/Drkeyz), Instagram, TikTok, X (https://x.com/_holadimeji_). Download CV → /cv/oladimeji-adebiyi-cv.pdf [PLACEHOLDER: CV PDF]; hide the link if the file is absent.
Footer: "Designed & built by Oladimeji. Soundtrack by Drkeyz."
Hidden easter egg: keys A–K play soft piano notes (Web Audio API, synthesised, no audio files). Off by default; enabled only via a sound toggle in the footer (a real button with aria-pressed). While enabled, ignore keypresses when focus is in an input, textarea, or contenteditable, or when any modifier key (Ctrl/Cmd/Alt) is held.

====================================================
CASE STUDY PAGES
====================================================
Reusable MDX template at /work/[slug]. Each case study is an editorial design story focused on DESIGN DECISIONS, not just UI screens:
01 Context · 02 Problem · 03 Research · 04 Thinking · 05 Design · 06 Iteration · 07 Outcome · 08 What I learned
Available MDX components: user flows, wireframes, research insights, information architecture, before/after (draggable comparison slider, also operable by keyboard with arrow keys and role="slider"), explorations, high-fidelity screens, prototypes, design systems, an accessibility-decisions callout (used within Design), and impact numbers that count up in view. Any metric whose value contains [VERIFY] or [PLACEHOLDER] is hidden automatically, not rendered.
Each case study adopts its own palette and accent from MDX frontmatter (background, surface, accent, display font). The cursor takes that accent. Check that the frontmatter palette meets AA for body text; if it doesn't, use the accent only for non-text elements.
Sticky section index (01–08) on desktop; "Next case study" link at the end.

JUNCTA CASE STUDY CONTENT (build this page in full)
Title: "Juncta. *Where liquidity never sleeps.*"
Meta: Lead Product Designer · March–April 2026, 6-week intensive · Dashboard screens + full design system · Designed for Cedra (Move L1), now live on Solana devnet
Caption under hero: "Juncta was designed for Cedra and has since moved to Solana. The design system and core flows carried over across chains." [VERIFY]
Theme: background #07090D, surface #171C26, text #F5F5F2, signal green #17CFAA (working capital), amber #F79009 (attention), red #F04438 (liquidation/loss), Space Grotesk display.

01 Context: Every Move-based DEX launching was a concentrated liquidity market maker, a port of the Uniswap V3 playbook. LPs set static ranges and watch capital sit idle once price drifts out of range. Juncta chose DLMM: liquidity lives in discrete price bins, and the protocol knows which bin is active, which makes routing inactive liquidity into lending architecturally clean.
02 Problem: Make a protocol with six simultaneous yield states per position feel as simple as a savings account, so a first-time LP can use it without losing money.
Big stat block: "$542,000,000 sits out of range in an average week. 36.7% of that liquidity goes untouched for 90+ days." Source: Dune, 26 weekly snapshots, 7 chains, Jan–Jun 2026.
03 Research — five validated problems: passive LPs consistently lose; DEX liquidity and lending are disconnected; impermanent loss is treated as inevitable; lending parameters adapt too slowly; collateral sits idle. Three user types: Passive LP (wants yield, not a second job), Active/Pro LP (wants control and live bin data), Borrower (wants liquidity without unwinding a position).
04 Thinking: Mapped where capital sits idle — the DEX and lending market were silos that never talk. Tested static-range vs. DLMM head to head; DLMM's bin-level tracking could tell the lending layer which capital was idle. The fix wasn't a new feature but routing an existing signal.
05 Design: Three layers, one surface — DLMM (liquidity in discrete bins), DEBT (lending that reacts to the DEX in real time), SIGNAL (rebalancing logic the user never triggers). Showcase dashboard screens from /public/images/juncta/ ([MEDIA] placeholders until supplied: Pools, New Pool, Swap, Provide Liquidity, Borrow, Monitor, Portfolio), a two-state borrow comparison (first-time borrower vs. active position) in the comparison slider, and hand-designed liquidation stages: Healthy >1.2 · Soft 1.1–1.2 · Accelerate 1.0–1.1 · Full <1.0. Design system: narrow palette (green = working, amber = attention, red = action required), every table legible at 12px. Accessibility callout: status is never conveyed by colour alone (each state also has a label and icon).
06 Iteration: The first signal layer surfaced every bin-rebalance event; testers ignored most of it, so it was cut to the one trigger that mattered — when a position needs attention. Then the DLMM / Debt / Signal split was locked.
07 Outcome (shipped results): 35/35 production-ready screens (Pools, New Pool, Swap, Provide Liquidity, Borrow, Monitor, Portfolio) · 6× empty-state variants with shimmer skeletons · 1st DLMM designed for a Move chain with natively integrated lending yield on inactive bins.
Targets table, clearly labelled "Targets" (not results): capital utilisation >85% · 90-day LP retention >70% · fees per $ of TVL 2x+ a standard AMM · time-to-mainnet 12 weeks.
08 What I learned: [PLACEHOLDER — in his own words]
Next case study: Cargoland Food.

====================================================
CUSTOM CURSOR (desktop, fine pointers only)
====================================================
Only when `(pointer: fine) and (hover: hover)` matches and reduced motion is off. A small custom dot that smoothly interpolates toward the pointer with subtle spring easing. Keep the native cursor visible underneath (or restore it on text inputs) so precision is never lost. On interactive elements it expands into a small pill with contextual text, set via a data-cursor attribute: VIEW CASE STUDY, OPEN PROJECT, PLAY MUSIC, DRAG, EXPLORE. Turns brass in the Creative section and takes each project's accent on case study pages. No giant trailing circle. Native cursor on touch devices. Nothing depends solely on hover. The cursor element is aria-hidden.

====================================================
ANIMATION & INTERACTION
====================================================
Animation creates hierarchy and personality, never decoration. Smooth, organic, fast. Easing around cubic-bezier(0.22, 1, 0.36, 1); most durations 0.4–1s.
Use: page transitions, masked text reveals, image reveals, subtle parallax, hover transformations, staggered sequences (rhythm), the light-to-dark Creative transition, count-up numbers, a brief load sequence (<1.5s, shown once per session) where the name reveals in timed beats. Content must be readable and in the DOM without JavaScript (no content hidden behind animations that never fire).
Avoid: long loaders, bouncing, constant floating elements, scroll hijacking, animations that interfere with reading, heavy 3D/WebGL.
Animate transform and opacity only. Respect prefers-reduced-motion: simple fades, no parallax, no smooth scroll, no count-up (show final numbers), skip the load sequence.
Do not use Lenis; native scrolling is better for accessibility and performance here.

====================================================
RESPONSIVE
====================================================
Excellent on large desktop, laptop, tablet, and mobile. Mobile gets intentional compositions, not stacked desktop layouts: no custom cursor, reduced animation, preserved type hierarchy, the hero portrait cropped tighter (face and cap) behind or beneath the headline with a scrim so text keeps AA contrast, strong work imagery, easy case study browsing, touch targets at least 44×44px.

====================================================
ACCESSIBILITY & PERFORMANCE
====================================================
WCAG 2.2 AA in both light and dark sections: semantic HTML with landmarks, one h1 per page and a correct heading hierarchy, skip-to-content link, keyboard navigation, visible focus states (2px outline with offset, visible on both light and dark backgrounds), alt text, captions, contrast as specified in the palette. As an accessibility-focused designer, his site must model this.
Lighthouse 90+ in all four categories. Optimise images, fonts (preload Inter Tight), and video; lazy-load everything except the hero portrait (load it with priority); code-split the cursor, music player, comparison slider and easter egg as client components loaded only where needed; keep everything else a server component.
SEO: metadata per page, Open Graph image generated with next/og (typographic: name + "Product Designer, Lagos" on --paper, no photo of him), sitemap.xml, robots.txt, and Person schema (JSON-LD) with name, alternateName "Drkeyz", jobTitle, address Lagos NG, email, and sameAs linking LinkedIn, Behance, Dribbble, Instagram, TikTok, X, and Fanlink.

====================================================
TECH STACK
====================================================
Next.js 15 (App Router), TypeScript, Tailwind CSS, Motion (the `motion` package, imported from "motion/react") for animation, MDX for case studies (@next/mdx or next-mdx-remote, with typed frontmatter). Deploy-ready for Vercel.
Reusable components: Navigation, Hero, ProjectCard, CaseStudyLayout, ImageGallery, ComparisonSlider, Cursor, SectionHeading, MusicPlayer, SocialLinks, Footer, MediaPlaceholder.
Keep all site copy and project metadata in /content (e.g. content/site.ts, content/projects.ts, content/work/juncta.mdx) so new projects are added by creating one MDX file + one entry, and swapping a placeholder for real media is a one-line change.

====================================================
CONTENT RULES (very important)
====================================================
Use only the information in this prompt. Do NOT invent companies, clients, titles, outcomes, metrics, testimonials, awards, research findings, or business results. Do not assume you can browse the sources below; treat them only as link targets. Where information is missing, keep a clearly marked [PLACEHOLDER] or [VERIFY] slot, and make those slots easy to grep for.
Writing: confident, concise, human, slightly conversational. Avoid clichés like "passionate about creating seamless experiences", "crafting innovative digital solutions", "leveraging cutting-edge technologies", and "pixel-perfect".

LINKS
- Existing portfolio: https://drkeyz.com
- Behance: https://www.behance.net/dimejiadebiyi
- Dribbble: https://dribbble.com/Drkeyz
- LinkedIn: https://www.linkedin.com/in/oladimeji-adebiyi/
- Instagram: https://instagram.com/drkeyzofficial
- TikTok: https://www.tiktok.com/@drkeyzofficial
- X: https://x.com/_holadimeji_
- Music: https://drkeyz.fanlink.tv/Tearstotambourine

ASSETS (in /public/images)
- portrait-hero-bw.jpg (2000×2500), portrait-hero.jpg (2000×2500, colour, unused): Hero only
- piano-stage.jpg (2248×1600): Creative / Piano
- trumpet-stage.jpg (1108×1420, small, never full-bleed): Creative / Trumpet
- juncta/, cargoland/, orgsphere/, helpnest/: project screens (empty for now, use MediaPlaceholder)
- releases/: cover art (empty for now)
- photography/: his photos of places and objects (empty for now)

====================================================
DELIVERABLE
====================================================
Build the complete responsive site, not a static landing page, following the Build Order above. At the end, give a short README covering: how to run it, how to add a case study, how to swap a [MEDIA] placeholder for a real image, and a list of every remaining [PLACEHOLDER] / [VERIFY] slot with its file path.
