# Oladimeji Adebiyi — Portfolio

Next.js 15 (App Router) · TypeScript · Tailwind CSS 4 · Motion · MDX. Deploys to Vercel as-is.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all pages are static)
npm run todo       # list every [VERIFY] / [PLACEHOLDER] / [MEDIA] slot
```

On Vercel, set `NEXT_PUBLIC_SITE_URL` to the final domain (defaults to https://drkeyz.com). It's used for canonical URLs, the sitemap and Open Graph.

## Where things live

| What | Where |
|---|---|
| All site copy, links, timeline, skills | `content/site.ts` |
| Project list (home page cards, "also worked on", landing pages) | `content/projects.ts` |
| Case studies | `content/work/<slug>.mdx` |
| Design tokens, type scale, motion | `src/app/globals.css` |
| Components | `src/components/` (case-study blocks in `src/components/case/`) |

## Swap a placeholder for a real image

Every image slot that doesn't have a file yet renders a labelled `[MEDIA]` frame at the right aspect ratio. To fill one:

1. Put the file in `public/images/<folder>/`, e.g. `public/images/juncta/pools.png`.
2. Find the matching entry (`content/projects.ts`, `content/site.ts` or the MDX file) and set `src: "/images/juncta/pools.png"`.
3. Set `width` and `height` to the image's real pixel size.

Images are served through `next/image` (AVIF/WebP, responsive sizes). Don't upscale: if a file is smaller than its slot, use a smaller layout.

**Covers smaller than their slot** use `matte: "#hex"`. The image is shown at native size, centred on a panel of that colour, so it's never stretched. When you have a 2x export, replace the file, update `width`/`height`, and delete `matte`.

**The three personal photos** (`portrait-hero-bw.jpg`, `piano-stage.jpg`, `trumpet-stage.jpg`) are imported directly in `Hero.tsx` and `Creative.tsx`, so they get blur placeholders automatically. Replace a file with one of the same name to update it.

**Videos:** keep the original `.mov` in `media-source/` (not deployed) and convert for the web with `avconvert -p PresetAppleM4V1080pHD -s media-source/in.mov -o public/video/out.mp4` (built into macOS; H.264 with fast start). HEVC `.mov` files don't play in every browser.

**Other media:**
- Cover art: `creative.release.artwork` in `content/site.ts`
- Audio preview: `creative.release.audio`. While it's `null`, the play button links out to Fanlink.
- CV: drop `public/cv/oladimeji-adebiyi-cv.pdf` and the "Download CV" button appears.
- Case study walkthrough video: set `video` in the MDX frontmatter. Either put the file at `public/video/<name>.mp4` and set `src: "/video/<name>.mp4"` (add `captions: "/video/<name>.vtt"` if you have captions), or paste a YouTube, Vimeo or Loom **embed** URL into `embed`. A "Watch the walkthrough" button then appears over the hero screen. The video loads only when pressed and never autoplays. Keep self-hosted files small (under ~20 MB, H.264 MP4); for anything longer, use an embed.

## Add a case study

1. In `content/projects.ts`, set `caseStudy: true` on the project (or add a new entry).
2. Create `content/work/<slug>.mdx`. Copy `juncta.mdx` as a starting point.
3. Edit the `frontmatter` export: title, meta, hero media, and the `theme` palette. The cursor and accents follow `theme.accent`; `muted` must reach 4.5:1 contrast on `bg`.
4. Write the eight sections in order: `<Section n="01" title="Context" headline="…">` … `<Section n="08" title="What I learned">`. `title` feeds the floating section index; `headline` is the big editorial line (wrap accent words in `*asterisks*`).
5. Optional frontmatter: `intro` (the line under the title), `glance` (four "at a glance" items) and `video` (see above).

Until then, projects without a case study get an honest "case study in progress" page at `/work/<slug>`.

**Blocks available in MDX** (no imports needed):
- Structure and text: `Section`, `Lead`, `Sub` (with `kicker`), `Statement` (a big pull line), plus ordinary Markdown paragraphs.
- Story: `Findings`, `Columns` (people), `Steps` (process), `Layers` (architecture), `BinDiagram`.
- Numbers: `Stat`, `StatRow`, `Metrics`, `Table`.
- Screens: `Figure` (one framed screen), `Annotated` (numbered call-outs; `x`/`y` are percentages of the image), `Detail` (a close-up of one region; `region` is `[x, y, w, h]` in source pixels), `Pair` (two details side by side), `ScreenTabs` (states or steps of one screen behind tabs, each with its own call-outs), `Row` (small self-bordered pieces like modals, top-aligned), `Crop` (a bare crop, e.g. inside a slider), `ScrollPan` (a very tall screen that pans as you scroll), `ComparisonSlider`, `Screens`, `Media`.
- System: `Stages`, `DesignSystem`, `Swatches`, `Callout` (use `kind="a11y"` for the accessibility callout).
- Unfinished: `Placeholder`, `Verify`.

Running text sits in a reading column; wide blocks break out of it on their own. Any block can be widened with `data-span="lead" | "mid" | "wide" | "bleed"`.

**Rules built into the blocks:**
- A `Stat` or `Metrics` value that still contains `[VERIFY]` or `[PLACEHOLDER]` is hidden automatically.
- `<Verify>` markers and the "To confirm" lists on in-progress pages only show in development.
- `<Placeholder>` shows in every environment, so it can't ship unnoticed.

## Add a design showcase

Lighter than a case study: a page that lets the work speak (SneakerShop, Lighter of Lives).

1. Give the entry in `landingPages` (`content/projects.ts`) a `slug` and set `href: "/work/<slug>"`. Optionally add a `note` (badge, title, body) to show on hover.
2. Create `content/showcase/<slug>.mdx`. Copy one of the existing two. Frontmatter sets the title, intro, meta, outbound links, hero (`url` puts it in a browser window, `region` crops it) and theme (`dark: false` for a light page).
3. Extra blocks for showcases: `PhoneLineup` (every screen in a row), `PhoneNotes` (a phone with numbered call-outs), `Colourways` (pick an option and the screen changes), `Phone`, `Browser`, and `ScrollPan` with a `url` (a full page panning inside a browser window).

## Behaviour notes

- **Dark mode:** The toggle is in the nav. The new theme grows out of the button as a circle (View Transitions API, in Chrome, Edge and Safari 18+), and the choice is saved. The first visit follows the OS setting. Themed colours (`paper`, `ink`, `muted`, `line`) swap; fixed ones (`snow`, `coal`, `stage`, `brass`) don't.
- **Scrolling:** Native scrolling, no scroll library. In-page anchor links glide with CSS `scroll-behavior: smooth`, which is turned off for reduced motion.
- **Signature motion:** Juncta opens from a framed card to full screen (`FeatureReveal`). Approach principles come into focus as they pass the centre of the screen (`FocusList`). Key lines light up word by word (`ScrollHighlight`). Images uncover with a curtain (`data-reveal="clip"`). Contact lines slide in from alternating sides (`KineticLines`). Page changes lift a dark curtain (`template.tsx`). Everything is transform, opacity or clip-path, and it all honours `prefers-reduced-motion`.

- **Motion:** Reveals use one IntersectionObserver and CSS (`data-reveal`, staggered with `--d`). Content is visible without JavaScript. `prefers-reduced-motion` drops to simple fades with no parallax, no count-up and no intro.
- **Load sequence:** CSS only, under 1.5s, once per browser session.
- **Creative section:** A charcoal layer fades in as you scroll (opacity only). Intro text flips from ink to paper at the midpoint, so it stays at or above 3:1 large-text contrast throughout.
- **Cursor:** Only on fine pointers with hover and with motion allowed. Add `data-cursor="Label"` to any element to show a label.
- **Easter egg:** The footer "Sound off/on" toggle. When it's on, keys A S D F G H J K play a C-major scale. Keypresses are ignored in form fields and when a modifier key is held.

## Still to fill in

Run `npm run todo` for the live list. As of now:

**Content to confirm ([VERIFY])**
- `content/projects.ts` (Cargoland Food): a result metric; whether the Behance "Food Vendor Mobile App" is Cargoland; the dates (résumé says 03/2025 – 06/2025, drkeyz.com says Aug–Oct 2025)
- `content/projects.ts` (Orgsphere): whether the Behance "HR Mobile App Platform" is Orgsphere; a result metric
- `content/projects.ts` (Help Nest): whether 87% bot resolution / 4.5 CSAT / 4.2m handling time are real results or sample data
- `content/projects.ts` (Also worked on): SkillLoop and Crypto-to-Local-Currency, each missing a role, year and one-line description (hidden in production until filled)

**Words to write ([PLACEHOLDER])**
- `content/site.ts` → `about.tools`: any tools beyond Figma, Miro, Whimsical
- `content/site.ts` → `creative.otherReleases`: other releases

**Files to add ([MEDIA])**
- Lighter of Lives: exports of the About, Our Works, Get Involved and Contact pages (only the home page is shown now)
- SneakerShop: clean screen exports. The current five were cut from the old case-study page at about 860px wide.
- Your own recordings for the Piano and Trumpet "Listen" controls. The current files are credited stand-ins: Satie's Gymnopédie No. 1 played by Michael Laucke (public domain, Wikimedia Commons) and "Quiet Night" by Gary Rea (CC0, Freesound). Replace the files in `public/audio/` and update `title` and `credit` in `creative.performances`, `content/site.ts`.
- Photography: your own photographs of places and objects, to replace the current performance photos in `creative.photographs`.
- Juncta Monitor screen, once that feature is live
- SneakerShop's exact Behance (or drkeyz.com) project URL → `href` in `landingPages`, `content/projects.ts` (currently the Behance profile)
- `public/images/releases/tears-to-tambourine.jpg` → `creative.release.artwork` in `content/site.ts`
- `public/audio/tears-to-tambourine-preview.mp3` → `creative.release.audio` (until then, the player links out to Fanlink)
- `public/cv/oladimeji-adebiyi-cv.pdf`: the "Download CV" button appears automatically

