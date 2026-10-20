"use client";

import { useEffect, useRef } from "react";
import { experience } from "@/data/resume";
import { Reveal } from "./reveal";
import { ensureGsap, gsap, ScrollTrigger } from "@/lib/gsap";

export function Experience() {
  const listRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const line = lineRef.current;
    if (!list || !line) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(line, { scaleY: 1 });
      return;
    }

    ensureGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: list, start: "top 70%", end: "bottom 60%", scrub: 0.5 },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="relative bg-void-raised px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <Reveal className="text-center">
          <p className="font-label text-sm uppercase tracking-[0.14em] text-mist-dim">Experience</p>
          <h2 className="mt-3 font-display text-4xl text-white sm:text-5xl">
            <span className="font-semibold">Four roles,</span>{" "}
            <span className="italic font-normal text-mist">one upward line.</span>
          </h2>
        </Reveal>

        <div ref={listRef} className="relative mt-16 pl-7 sm:pl-9">
          <div className="absolute left-0 top-1 bottom-1 w-px bg-void-line" />
          <div
            ref={lineRef}
            className="absolute left-0 top-1 bottom-1 w-px origin-top bg-glow-blue"
            style={{ transform: "scaleY(0)" }}
          />

          <div className="divide-y divide-void-line">
            {experience.map((entry, i) => (
              <Reveal key={entry.id} delay={i * 0.04} className="relative py-10 first:pt-0">
                <span className="absolute -left-7 top-2 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-glow-blue bg-void-raised sm:-left-9" />
                <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-2xl text-white">{entry.role}</h3>
                      {entry.current && (
                        <span className="rounded-full bg-glow-blue/15 px-2.5 py-0.5 font-label text-[11px] text-glow-blue">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="mt-1 font-label text-sm text-mist-dim">{entry.company}</p>
                  </div>
                  <p className="font-label text-sm text-mist-dim">{entry.dateRange}</p>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet.slice(0, 24)} className="flex gap-3 text-[0.95rem] leading-relaxed text-mist">
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-glow-blue" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
