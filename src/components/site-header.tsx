"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/resume";

const timeFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

export function LocalClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(timeFormat.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="inline-flex items-center gap-2">
      <span aria-hidden="true" className="pulse h-1.5 w-1.5 rounded-full bg-live" />
      <span className="font-mono text-xs">
        <time suppressHydrationWarning>{time ?? "--:--"}</time> in Ghaziabad
      </span>
    </span>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    const apply = () => {
      if (next === "light") document.documentElement.dataset.theme = "light";
      else delete document.documentElement.dataset.theme;
      setTheme(next);
    };
    try {
      localStorage.setItem("theme", next);
    } catch {}
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced && "startViewTransition" in document) {
      (document as Document & { startViewTransition: (cb: () => void) => void }).startViewTransition(apply);
    } else {
      apply();
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="grid h-8 w-8 place-items-center rounded-full border border-line text-muted transition-colors duration-200 hover:border-faint hover:text-ink"
    >
      {theme === "dark" ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z" />
        </svg>
      )}
    </button>
  );
}

const NAV = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="rise flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pt-10 sm:pt-12" style={{ ["--i" as string]: 0 }}>
      <div className="min-w-0">
        <div>
          <a href="#top" className="font-medium text-ink no-underline">
            {profile.name}
          </a>
          <span className="text-muted"> · {profile.title} at Localwell</span>
        </div>
        <div className="mt-1 text-faint">
          <LocalClock />
        </div>
      </div>
      <div className="flex items-center gap-5 text-muted">
        <nav aria-label="Sections" className="flex gap-4 text-sm sm:gap-5">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="no-underline transition-colors hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
