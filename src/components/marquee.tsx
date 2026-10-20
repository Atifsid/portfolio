"use client";

import { useEffect, useRef } from "react";
import { ensureGsap, gsap } from "@/lib/gsap";

export function Marquee({ items }: { items: string[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    ensureGsap();
    const ctx = gsap.context(() => {
      const tween = gsap.to(track, {
        xPercent: -50,
        duration: items.length * 2.6,
        ease: "none",
        repeat: -1,
      });
      track.addEventListener("mouseenter", () => tween.timeScale(0.25));
      track.addEventListener("mouseleave", () => tween.timeScale(1));
    });

    return () => ctx.revert();
  }, [items.length]);

  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((item) => (
        <span key={item} className="font-display text-lg italic text-mist-dim">
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden">
      <div ref={trackRef} className="flex w-max">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
