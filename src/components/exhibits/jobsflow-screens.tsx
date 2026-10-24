"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useInView } from "@/lib/use-in-view";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const SCREENS = [
  {
    id: "today",
    label: "Today",
    src: "/images/jobsflow/app-today.webp",
    caption: "New roles ranked by an explainable fit score, with sponsorship flagged.",
  },
  {
    id: "tailor",
    label: "Tailor",
    src: "/images/jobsflow/app-ats-check.webp",
    caption: "A resume rewritten for the posting, checked against its keywords in code.",
  },
  {
    id: "people",
    label: "Referrals",
    src: "/images/jobsflow/app-contacts.webp",
    caption: "People who could refer you, found from public search results.",
  },
  {
    id: "tracker",
    label: "Tracker",
    src: "/images/jobsflow/app-tracker.webp",
    caption: "Every application and the follow-ups that are due.",
  },
];

const DWELL = 5;

/** The real JobsFlow screens, cycling while visible; picking a tab stops the cycle. */
export function JobsFlowScreens() {
  const [rootRef, inView] = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    gsap.killTweensOf(bar);
    gsap.set(bar, { scaleX: auto ? 0 : 1 });
    if (!auto || !inView || reduced) return;
    const tween = gsap.to(bar, {
      scaleX: 1,
      duration: DWELL,
      ease: "none",
      onComplete: () => setActive((i) => (i + 1) % SCREENS.length),
    });
    return () => {
      tween.kill();
    };
  }, [active, auto, inView, reduced]);

  return (
    <div ref={rootRef}>
      <div role="tablist" aria-label="JobsFlow screens" className="flex gap-1 border-b border-line px-3 pt-3 sm:px-4">
        {SCREENS.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            type="button"
            id={`jf-tab-${s.id}`}
            aria-selected={i === active}
            aria-controls="jf-panel"
            onClick={() => {
              setAuto(false);
              setActive(i);
            }}
            className={`relative px-3 pb-2.5 pt-1 text-[13px] transition-colors duration-200 ${
              i === active ? "text-ink" : "text-faint hover:text-muted"
            }`}
          >
            {s.label}
            {i === active && (
              <span className="absolute inset-x-3 -bottom-px h-px overflow-hidden bg-line">
                <span ref={barRef} className="block h-full origin-left bg-ink" style={{ transform: auto ? "scaleX(0)" : "scaleX(1)" }} />
              </span>
            )}
          </button>
        ))}
      </div>

      <div id="jf-panel" role="tabpanel" aria-labelledby={`jf-tab-${SCREENS[active].id}`}>
        <div className="relative aspect-[16/9] overflow-hidden bg-[#f5f3ee]">
          {SCREENS.map((s, i) => (
            <Image
              key={s.id}
              src={s.src}
              alt={`JobsFlow ${s.label} screen`}
              fill
              sizes="(min-width: 768px) 720px, 100vw"
              quality={90}
              className={`object-contain object-center transition-[opacity,transform] duration-700 ease-out ${
                i === active ? "scale-100 opacity-100" : "scale-[1.015] opacity-0"
              }`}
              priority={i === 0}
            />
          ))}
        </div>
        <p className="border-t border-line px-4 py-3 text-[13px] text-muted sm:px-5">{SCREENS[active].caption}</p>
      </div>
    </div>
  );
}
