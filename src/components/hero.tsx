"use client";

import { useEffect, useRef } from "react";
import { profile } from "@/data/resume";
import { AuroraBackground } from "./aurora-background";
import { Marquee } from "./marquee";
import { ensureGsap, gsap, SplitText } from "@/lib/gsap";

const STACK = ["React", "Next.js", "React Native", "Node.js", "Spring Boot", ".NET", "PostgreSQL", "AWS"];

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    ensureGsap();

    if (reduced) {
      gsap.set(["[data-hero-badge]", "[data-hero-sub]", "[data-hero-ctas]"], { opacity: 1, y: 0 });
      return;
    }

    let cancelled = false;
    let split: SplitText | undefined;
    let tl: gsap.core.Timeline | undefined;

    document.fonts.ready.then(() => {
      if (cancelled) return;

      split = SplitText.create("[data-hero-headline]", {
        type: "lines",
        linesClass: "hero-line-mask",
      });

      tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero-badge]", { y: 16, opacity: 0, duration: 0.6 })
        .from(split.lines, { yPercent: 110, opacity: 0, duration: 0.9, stagger: 0.09 }, "-=0.25")
        .from("[data-hero-sub]", { y: 16, opacity: 0, duration: 0.7 }, "-=0.45")
        .from("[data-hero-ctas] > *", { y: 14, opacity: 0, duration: 0.6, stagger: 0.08 }, "-=0.4");
    });

    return () => {
      cancelled = true;
      tl?.kill();
      split?.revert();
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const glow = glowRef.current;
    if (!root || !glow) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    ensureGsap();
    const xTo = gsap.quickTo(glow, "x", { duration: 0.9, ease: "power3" });
    const yTo = gsap.quickTo(glow, "y", { duration: 0.9, ease: "power3" });

    const onMove = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      xTo(e.clientX - rect.left);
      yTo(e.clientY - rect.top);
    };
    root.addEventListener("pointermove", onMove);
    return () => root.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section id="top" ref={rootRef} className="relative overflow-hidden bg-void pb-28 pt-40 lg:pt-48">
      <AuroraBackground />
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-0 top-0 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow-blue/10 blur-[90px]"
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <span
          data-hero-badge
          className="inline-flex items-center rounded-full border border-void-line bg-void-raised px-4 py-1.5 font-label text-xs text-mist"
        >
          Senior Software Developer
        </span>
        <h1
          data-hero-headline
          className="mt-8 font-display text-5xl leading-[1.05] text-white sm:text-6xl lg:text-7xl"
        >
          <span className="font-semibold">Systems built</span>{" "}
          <span className="italic font-normal text-mist">with intent.</span>
          <br />
          <span className="italic font-normal text-mist">Shipped</span>{" "}
          <span className="font-semibold">to last.</span>
        </h1>
        <p data-hero-sub className="mx-auto mt-7 max-w-xl text-sm text-mist">
          {profile.summary}
        </p>
        <div data-hero-ctas className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#contact"
            className="rounded-full bg-white px-7 py-3.5 font-label text-sm font-medium text-void transition-[transform,background-color] duration-200 ease-out hover:bg-mist active:scale-[0.97]"
          >
            Get in touch
          </a>
          <a
            href="#work"
            className="rounded-full border border-void-line px-7 py-3.5 font-label text-sm font-medium text-white transition-[transform,border-color] duration-200 ease-out hover:border-mist active:scale-[0.97]"
          >
            See the work
          </a>
        </div>
      </div>

      <div id="stack" className="relative mx-auto mt-24 max-w-5xl border-t border-void-line px-6 pt-10">
        <Marquee items={STACK} />
      </div>
    </section>
  );
}
