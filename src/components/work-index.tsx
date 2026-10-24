"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/resume";
import { gsap } from "@/lib/gsap";
import { ExternalIcon, GithubIcon } from "./icons";

// Projects that already have an exhibit on the page are not repeated here.
const EXHIBITED = new Set(["jobsflow", "jobspedia", "hrms", "email-verify"]);

/** Remaining projects as a list; on pointer devices a screenshot follows the cursor. */
export function WorkIndex() {
  const items = projects.filter((p) => !EXHIBITED.has(p.id));
  const previewRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState<string | null>(null);
  const move = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null);

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    move.current = {
      x: gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" }),
      y: gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" }),
    };
  }, []);

  // Sit above the cursor (below it near the top edge) so the hovered row stays readable.
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = previewRef.current;
    const w = el?.offsetWidth ?? 300;
    const h = el?.offsetHeight ?? 220;
    const x = Math.min(e.clientX + 20, window.innerWidth - w - 16);
    const above = e.clientY - h - 28;
    move.current?.x(x);
    move.current?.y(above >= 12 ? above : e.clientY + 28);
  };

  const active = items.find((p) => p.id === current);

  return (
    <>
      <ul className="group/list border-t border-line" onPointerMove={onMove} onPointerLeave={() => setCurrent(null)}>
        {items.map((p) => (
          <li key={p.id} className="border-b border-line">
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              onPointerEnter={(e) => e.pointerType === "mouse" && setCurrent(p.id)}
              onFocus={() => setCurrent(null)}
              className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-0.5 py-3.5 no-underline transition-[color,padding] duration-300 ease-out group-hover/list:text-faint hover:!text-ink sm:hover:pl-1.5"
            >
              <span className="inline-flex items-center gap-1.5 font-medium">
                {p.title}
                {p.type === "live" ? (
                  <ExternalIcon className="h-3.5 w-3.5 text-faint" />
                ) : (
                  <GithubIcon className="h-3 w-3 text-faint" />
                )}
              </span>
              <span className="hidden text-right text-[13px] text-faint sm:block">{p.stack.slice(0, 3).join(" · ")}</span>
              <span className="col-span-2 text-[14px] text-muted sm:hidden">{p.description}</span>
            </a>
          </li>
        ))}
      </ul>

      <div
        ref={previewRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-20 hidden w-[320px] overflow-hidden rounded-lg border border-line bg-surface shadow-[0_12px_32px_-12px_rgba(0,0,0,0.5)] transition-[opacity,transform] duration-300 ease-out md:block ${
          active ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {active?.preview && (
          <div className="relative" style={{ aspectRatio: "1920 / 907" }}>
            {items
          .filter((p) => p.preview)
          .map((p) => (
            // Plain img so every preview is decoded up front and swaps instantly on hover.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={p.id}
              src={p.preview}
              alt=""
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-200 ${
                current === p.id ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          </div>
        )}
        {active && <p className="border-t border-line px-3 py-2.5 text-[13px] leading-snug text-muted first:border-t-0">{active.description}</p>}
      </div>
    </>
  );
}
