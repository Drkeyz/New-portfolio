import { socials } from "@content/site";

type Key = keyof typeof socials;

export function SocialLinks({
  keys = ["email", "linkedin", "behance", "dribbble", "instagram", "tiktok", "x"],
  className = "",
}: {
  keys?: Key[];
  className?: string;
}) {
  return (
    <ul className={`flex flex-wrap gap-x-6 gap-y-3 ${className}`}>
      {keys.map((k) => {
        const s = socials[k];
        const external = !s.href.startsWith("mailto:");
        return (
          <li key={k}>
            <a
              href={s.href}
              className="link-underline inline-flex min-h-11 items-center"
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              {s.label}
              {external && <span className="sr-only"> (opens in a new tab)</span>}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
