"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import { ensureGsap, gsap, ScrollTrigger } from "@/lib/gsap";

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  id,
  style,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  id?: string;
  style?: CSSProperties;
  as?: "div" | "article" | "li";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    ensureGsap();
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(el, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        el,
        { y, opacity: 0.001 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }
      );
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Component = Tag as "div";
  return (
    <Component ref={ref} id={id} className={className} style={style}>
      {children}
    </Component>
  );
}
