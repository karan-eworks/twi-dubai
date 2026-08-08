"use client";

import { Check, Link2 } from "lucide-react";
import { useEffect, useState } from "react";

interface ShareActionsProps {
  title: string;
  url: string;
  /** Announced to screen readers, e.g. "Share this article". */
  label?: string;
  /** The field the row sits on — "dark" for a navy hero, "light" for body copy. */
  surface?: "light" | "dark";
}

const CONTROL_BASE =
  "inline-flex size-10 cursor-pointer items-center justify-center rounded-sm border transition-colors focus-visible:outline-2 focus-visible:outline-offset-4";

const CONTROL_CLASS: Record<"light" | "dark", string> = {
  dark: `${CONTROL_BASE} border-white/25 text-white/85 hover:border-white hover:bg-white hover:text-navy-900 focus-visible:outline-white`,
  light: `${CONTROL_BASE} border-border text-muted-foreground hover:border-navy-500 hover:bg-navy-500 hover:text-white focus-visible:outline-ring`,
};

const LABEL_CLASS: Record<"light" | "dark", string> = {
  dark: "text-white/70",
  light: "text-muted-foreground",
};

/* Brand marks are filled glyphs by definition — lucide ships none, so the
   three paths live here at one size and weight. */
const BRAND_ICON = {
  LinkedIn:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  Facebook:
    "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  X: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
} as const;

export function ShareActions({
  title,
  url,
  label = "Share this page",
  surface = "dark",
}: ShareActionsProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(timeout);
  }, [copied]);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const targets = [
    {
      name: "LinkedIn" as const,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: "Facebook" as const,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "X" as const,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // Clipboard blocked (insecure context or denied permission) — the URL
      // is in the address bar, so there is nothing to recover from here.
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span
        className={`datum me-2 text-[10px] uppercase tracking-[0.16em] ${LABEL_CLASS[surface]}`}
      >
        Share
      </span>

      {targets.map((target) => (
        <a
          key={target.name}
          href={target.href}
          target="_blank"
          rel="noreferrer"
          className={CONTROL_CLASS[surface]}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="size-4"
          >
            <path d={BRAND_ICON[target.name]} />
          </svg>
          <span className="sr-only">{`${label} on ${target.name}`}</span>
        </a>
      ))}

      <button
        type="button"
        onClick={copyLink}
        className={CONTROL_CLASS[surface]}
      >
        {copied ? (
          <Check aria-hidden="true" className="size-4" />
        ) : (
          <Link2 aria-hidden="true" className="size-4" />
        )}
        <span className="sr-only">Copy link</span>
      </button>

      <p aria-live="polite" className="sr-only">
        {copied ? "Link copied to clipboard" : ""}
      </p>
    </div>
  );
}
