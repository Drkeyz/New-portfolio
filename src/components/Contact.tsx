import fs from "node:fs";
import path from "node:path";
import { contact, site } from "@content/site";
import { CopyEmail } from "./CopyEmail";
import { KineticLines } from "./motion/Kinetic";
import { Magnetic } from "./motion/Magnetic";
import { SocialLinks } from "./SocialLinks";

// The CV link only appears once the PDF exists in /public.
const hasCv = fs.existsSync(path.join(process.cwd(), "public", site.cvPath));

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="overflow-x-clip pb-24 pt-16 md:pb-32 md:pt-24">
      <div className="wrap">
        <p className="t-label mb-10 flex items-center gap-3 text-muted" data-reveal="fade">
          <span aria-hidden className="h-px w-8 bg-brass" />
          Contact
        </p>
        <KineticLines id="contact-title" lines={contact.lines} className="t-mega uppercase" />

        <div className="grid-12 mt-20 gap-y-14 md:mt-28">
          <div className="col-span-12 md:col-span-7">
            <Magnetic strength={0.15}>
              <CopyEmail email={site.email} label={contact.sayHello} />
            </Magnetic>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9">
            <h3 className="t-label text-muted">Elsewhere</h3>
            <SocialLinks className="mt-3" />
            {hasCv && (
              <a
                href={site.cvPath}
                download
                className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full border border-ink px-6 text-[0.95rem] font-medium transition-colors duration-500 hover:bg-ink hover:text-paper"
              >
                Download CV <span aria-hidden>↓</span>
                <span className="sr-only"> (PDF)</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
