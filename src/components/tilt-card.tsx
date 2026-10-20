"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { ensureGsap, gsap } from "@/lib/gsap";

export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    ensureGsap();
    gsap.set(el, { transformPerspective: 800 });
    const rotateX = gsap.quickTo(el, "rotateX", { duration: 0.5, ease: "power3" });
    const rotateY = gsap.quickTo(el, "rotateY", { duration: 0.5, ease: "power3" });
    const scale = gsap.quickTo(el, "scale", { duration: 0.4, ease: "power3" });

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotateY(px * 10);
      rotateX(py * -10);
    };
    const onEnter = () => scale(1.015);
    const onLeave = () => {
      scale(1);
      rotateX(0);
      rotateY(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
