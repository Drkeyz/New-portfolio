"use client";

import { useState } from "react";

/** Big "Say hello →" that copies the email. Falls back to mailto: when clipboard isn't available. */
export function CopyEmail({ email, label }: { email: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const onClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!navigator.clipboard?.writeText) return; // let mailto: happen
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <div>
      <a
        href={`mailto:${email}`}
        onClick={onClick}
        className="group inline-flex items-baseline gap-4 t-display"
        data-cursor="Copy email"
      >
        <span className="relative">
          {copied ? "Copied ✓" : label}
          <span
            aria-hidden
            className="absolute -bottom-1 left-0 h-[3px] w-full origin-left scale-x-0 bg-brass transition-transform duration-700 ease-rhythm group-hover:scale-x-100 group-focus-visible:scale-x-100"
          />
        </span>
        {!copied && (
          <span aria-hidden className="inline-block transition-transform duration-500 ease-rhythm group-hover:translate-x-3">
            →
          </span>
        )}
      </a>
      <p className="mt-4 text-muted">
        {email} <span className="text-[0.875rem]">· click to copy</span>
      </p>
      <p aria-live="polite" className="sr-only">
        {copied ? `Email address ${email} copied to clipboard` : ""}
      </p>
    </div>
  );
}
