"use client";

import { useRef, useState } from "react";
import { experience } from "@/data/resume";
import { gsap } from "@/lib/gsap";

function Role({ entry, initiallyOpen }: { entry: (typeof experience)[number]; initiallyOpen: boolean }) {
  const [open, setOpen] = useState(initiallyOpen);
  const bodyRef = useRef<HTMLDivElement>(null);
  const id = `role-${entry.id}`;

  const toggle = () => {
    const body = bodyRef.current;
    const next = !open;
    setOpen(next);
    if (!body) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.killTweensOf(body);
    if (next) {
      gsap.fromTo(body, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: reduced ? 0 : 0.45, ease: "expo.out" });
    } else {
      gsap.to(body, { height: 0, opacity: 0, duration: reduced ? 0 : 0.3, ease: "power2.out" });
    }
  };

  return (
    <li className="border-b border-line">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={toggle}
          className="group grid w-full grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-0.5 py-4 text-left"
        >
          <span>
            <span className="font-medium">{entry.role}</span>
            <span className="text-muted"> · {entry.company}</span>
          </span>
          <span className="flex items-center gap-3 font-mono text-xs text-faint">
            <span className={entry.current ? "inline-flex items-center gap-2 text-ink" : undefined}>
              {entry.current && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-live" />}
              {entry.dateRange.replace("Present", "now")}
            </span>
            <svg
              aria-hidden="true"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className={`transition-transform duration-300 ease-out group-hover:text-ink ${open ? "rotate-45" : ""}`}
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
        </button>
      </h3>
      <div id={id} ref={bodyRef} className="overflow-hidden" style={initiallyOpen ? undefined : { height: 0, opacity: 0 }}>
        <ul className="max-w-[64ch] space-y-2 pb-6 text-muted">
          {entry.bullets.map((b) => (
            <li key={b} className="relative pl-4 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2 before:bg-faint">
              {b}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export function Experience() {
  return (
    <ul className="border-t border-line">
      {experience.map((entry, i) => (
        <Role key={entry.id} entry={entry} initiallyOpen={i === 0} />
      ))}
    </ul>
  );
}
