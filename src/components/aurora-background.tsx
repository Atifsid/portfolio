"use client";

import { useEffect, useRef } from "react";
import { ensureGsap, gsap } from "@/lib/gsap";

export function AuroraBackground({ className }: { className?: string }) {
  const blueRef = useRef<HTMLDivElement>(null);
  const violetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !blueRef.current || !violetRef.current) return;

    ensureGsap();
    const ctx = gsap.context(() => {
      gsap.to(blueRef.current, {
        x: "+=60",
        y: "-=40",
        scale: 1.15,
        duration: 9,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(violetRef.current, {
        x: "-=70",
        y: "+=50",
        scale: 1.1,
        duration: 11,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.6,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}>
      <div
        ref={blueRef}
        className="absolute -top-1/4 right-[8%] h-[32rem] w-[32rem] rounded-full bg-glow-blue/25 blur-[110px]"
      />
      <div
        ref={violetRef}
        className="absolute left-[5%] top-[10%] h-[26rem] w-[26rem] rounded-full bg-glow-violet/20 blur-[110px]"
      />
    </div>
  );
}
