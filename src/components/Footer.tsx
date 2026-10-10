import { contact, site } from "@content/site";
import { PianoKeys } from "./PianoKeys";

export function Footer() {
  return (
    <footer className="border-t border-line/40 bg-paper text-ink">
      <div className="wrap flex flex-col gap-4 py-8 text-[0.875rem] text-muted md:flex-row md:items-center md:justify-between">
        <p>{contact.footer}</p>
        <div className="flex items-center gap-6">
          <PianoKeys />
          <p className="tabular-nums">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
