"use client";

import { useRef, useState } from "react";
import { profile } from "@/data/resume";
import { LocalClock } from "./site-header";

export function Footer() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <footer id="contact" className="mt-32 border-t border-line pb-16 pt-10">
      <h2 className="text-[clamp(1.5rem,4vw,2rem)] font-medium leading-tight tracking-[-0.02em]">Have a role or a project in mind?</h2>
      <p className="mt-2 max-w-[52ch] text-muted">Email is the quickest way to reach me.</p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={copy}
          className="relative rounded-lg bg-ink px-4 py-2 text-sm font-medium text-bg transition-[opacity,transform] duration-200 hover:opacity-85 active:scale-[0.98]"
        >
          <span className={`inline-block transition-[opacity,transform] duration-200 ${copied ? "-translate-y-1 opacity-0" : ""}`}>
            Copy email
          </span>
          <span
            aria-hidden={!copied}
            className={`absolute inset-0 grid place-items-center transition-[opacity,transform] duration-200 ${
              copied ? "" : "translate-y-1 opacity-0"
            }`}
          >
            Copied
          </span>
        </button>
        <a href={`mailto:${profile.email}`} className="text-sm text-muted hover:text-ink">
          {profile.email}
        </a>
        <span className="sr-only" aria-live="polite">
          {copied ? "Email copied to clipboard" : ""}
        </span>
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-4 text-sm text-faint">
        <div className="flex gap-5">
          <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-ink">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-ink">
            LinkedIn
          </a>
          <a href={profile.twitter} target="_blank" rel="noreferrer" className="hover:text-ink">
            Twitter
          </a>
        </div>
        <LocalClock />
      </div>
    </footer>
  );
}
