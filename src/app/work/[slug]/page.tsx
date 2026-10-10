import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getShowcase, nextProject, nextShowcase, projects, showcases, type Project } from "@content/projects";
import { CaseStudyLayout, type CaseFrontmatter } from "@/components/case/CaseStudyLayout";
import { ShowcaseLayout, type ShowcaseFrontmatter } from "@/components/case/ShowcaseLayout";
import { Media } from "@/components/Media";

export const dynamicParams = false;

export function generateStaticParams() {
  return [...projects.map((p) => ({ slug: p.slug })), ...showcases.map((s) => ({ slug: s.slug }))];
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const sc = getShowcase(slug);
  if (sc) {
    const { frontmatter } = await loadShowcase(slug);
    return {
      title: `${sc.label} — ${sc.kind}`,
      description: frontmatter.intro,
      alternates: { canonical: `/work/${slug}` },
      openGraph: { title: `${sc.label} — Oladimeji Adebiyi`, description: frontmatter.intro },
    };
  }
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.industry} case study`,
    description: p.description,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { title: `${p.name} — Oladimeji Adebiyi`, description: p.oneLiner },
  };
}

async function loadCaseStudy(slug: string) {
  const mod = await import(`@content/work/${slug}.mdx`);
  return mod as { default: React.ComponentType; frontmatter: CaseFrontmatter };
}

async function loadShowcase(slug: string) {
  const mod = await import(`@content/showcase/${slug}.mdx`);
  return mod as { default: React.ComponentType; frontmatter: ShowcaseFrontmatter };
}

export default async function WorkPage({ params }: Params) {
  const { slug } = await params;

  const sc = getShowcase(slug);
  if (sc) {
    const { default: Content, frontmatter } = await loadShowcase(slug);
    return (
      <ShowcaseLayout item={sc} next={nextShowcase(slug)} fm={frontmatter}>
        <Content />
      </ShowcaseLayout>
    );
  }

  const project = getProject(slug);
  if (!project) notFound();
  const next = nextProject(slug);

  if (project.caseStudy) {
    const { default: Content, frontmatter } = await loadCaseStudy(slug);
    return (
      <CaseStudyLayout project={project} next={next} fm={frontmatter}>
        <Content />
      </CaseStudyLayout>
    );
  }

  return <InProgress project={project} next={next} />;
}

/** Projects without a written case study yet: the overview, honestly labelled. */
function InProgress({ project, next }: { project: Project; next: Project }) {
  const isDev = process.env.NODE_ENV !== "production";
  return (
    <main id="main" className="pt-28 md:pt-36">
      <article className="wrap">
        <p className="t-label flex items-center gap-3 text-muted">
          <Link href="/#work" className="link-underline">
            Selected work
          </Link>
          <span aria-hidden>/</span>
          <span className="tabular-nums">{project.index}</span>
          <span aria-hidden className="h-px w-6 bg-brass" />
          {project.industry}
        </p>
        <h1 className="t-hero mt-8">{project.name}</h1>
        <p className="t-sub mt-8 max-w-[34ch] text-pretty">{project.description}</p>

        <dl className="mt-14 grid grid-cols-1 gap-x-[var(--col-gap)] gap-y-6 border-t border-line/40 pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Role", project.role],
            ["Year", project.year],
            ["Platform", project.platform],
            ["Capabilities", project.capabilities.join(", ")],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="t-label text-muted">{k}</dt>
              <dd className="mt-2 text-[0.9375rem]">{v}</dd>
            </div>
          ))}
        </dl>

        <figure className="mt-16 md:mt-24">
          <Media
            media={project.media}
            sizes="(min-width: 1360px) 1280px, 100vw"
            bg={project.theme.bg}
            fg={project.theme.fg}
            priority
          />
        </figure>

        <div className="grid-12 mt-16 gap-y-12 md:mt-24">
          <div className="col-span-12 md:col-span-7">
            <p className="t-title text-balance">{project.oneLiner}</p>
            {project.highlights && (
              <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-muted">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2">
                    <span aria-hidden className="size-1.5 rounded-full bg-brass" />
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9">
            <p className="t-label text-muted">Status</p>
            <p className="mt-3">The full case study for {project.name} is being written. Ask me about it in the meantime.</p>
            <ul className="mt-6 space-y-2">
              <li>
                <Link href="/#contact" className="link-underline">
                  Get in touch →
                </Link>
              </li>
              {project.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noreferrer" className="link-underline" data-cursor="Open project">
                    {l.label} ↗<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {isDev && project.verify && (
          <aside className="mt-16 border border-dashed border-brass p-6 text-[0.9375rem]">
            <p className="t-label">To confirm (visible in development only)</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              {project.verify.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </aside>
        )}
      </article>

      <nav aria-label="Next project" className="mt-24 border-t border-line/40 md:mt-32">
        <Link
          href={`/work/${next.slug}`}
          className="wrap group block py-20 md:py-32"
          data-cursor={next.caseStudy ? "View case study" : "Open project"}
        >
          <p className="t-label text-muted">Next</p>
          <p className="t-display mt-6 flex items-baseline gap-6">
            {next.name}
            <span aria-hidden className="inline-block transition-transform duration-700 ease-rhythm group-hover:translate-x-4">
              →
            </span>
          </p>
        </Link>
      </nav>
    </main>
  );
}
