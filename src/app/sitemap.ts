import type { MetadataRoute } from "next";
import { projects, showcases } from "@content/projects";
import { site } from "@content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    ...projects.map((p) => ({ url: `${site.url}/work/${p.slug}`, priority: p.caseStudy ? 0.8 : 0.5 })),
    ...showcases.map((s) => ({ url: `${site.url}/work/${s.slug}`, priority: 0.6 })),
  ];
}
