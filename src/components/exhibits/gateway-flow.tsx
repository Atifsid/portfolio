"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useInView, useTicker } from "@/lib/use-in-view";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const SOURCES = [
  { id: "a", label: "Partner A", sub: "POST /orders" },
  { id: "b", label: "Partner B", sub: "POST /orders" },
  { id: "m", label: "MedCart", sub: "checkout" },
];

type LogLine = { id: number; order: string; from: string };

function edgeOf(el: HTMLElement, frame: HTMLElement, side: "left" | "right" | "top" | "bottom") {
  const a = el.getBoundingClientRect();
  const b = frame.getBoundingClientRect();
  const x = side === "left" ? a.left : side === "right" ? a.right : a.left + a.width / 2;
  const y = side === "top" ? a.top : side === "bottom" ? a.bottom : a.top + a.height / 2;
  return { x: x - b.left, y: y - b.top };
}

/** Orders from partners and MedCart pass through Integrations BE into the OMS. */
export function GatewayFlow() {
  const [frameRef, inView] = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const sourceRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const laneRef = useRef<HTMLDivElement>(null);
  const [inLane, setInLane] = useState<string | null>(null);
  const omsRef = useRef<HTMLDivElement>(null);
  const [synced, setSynced] = useState(0);
  const [log, setLog] = useState<LogLine[]>([]);
  const seq = useRef(4120);

  const send = () => {
    const frame = frameRef.current;
    const lane = laneRef.current;
    const oms = omsRef.current;
    if (!frame || !lane || !oms) return;

    const source = SOURCES[Math.floor(Math.random() * SOURCES.length)];
    const sourceEl = sourceRefs.current[source.id];
    if (!sourceEl) return;

    const order = `ORD-${(seq.current += 1 + Math.floor(Math.random() * 7))}`;
    const dot = document.createElement("div");
    dot.className = "pointer-events-none absolute left-0 top-0 h-2 w-2 rounded-full bg-ink";
    frame.appendChild(dot);

    // Dots leave from the facing edge of each node, so they never sit on top of a label.
    const horizontal = lane.getBoundingClientRect().left > sourceEl.getBoundingClientRect().right;
    const a = edgeOf(sourceEl, frame, horizontal ? "right" : "bottom");
    const slot = edgeOf(lane, frame, "left");
    const b = { x: slot.x + 12, y: slot.y };
    const c = edgeOf(oms, frame, horizontal ? "left" : "top");

    gsap
      .timeline({ onComplete: () => dot.remove() })
      .fromTo(dot, { x: a.x - 4, y: a.y - 4, scale: 0 }, { scale: 1, duration: 0.2, ease: "power2.out" })
      .to(dot, { x: b.x - 4, y: b.y - 4, duration: 0.8, ease: "power3.inOut" })
      .call(() => setInLane(order))
      .to(dot, { scale: 1.6, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" })
      .to(dot, { x: c.x - 4, y: c.y - 4, duration: 0.8, ease: "power3.inOut" }, ">0.2")
      .to(dot, { scale: 0, duration: 0.2 })
      .call(() => {
        setSynced((n) => n + 1);
        setLog((lines) => [{ id: seq.current, order, from: source.label }, ...lines].slice(0, 1));
      });
  };

  useTicker(inView && !reduced, 1100, send);

  const node = "rounded-lg border border-line bg-surface-2 px-3 py-2.5 text-[13px] leading-snug";

  return (
    <div ref={frameRef} className="relative px-5 pb-12 pt-6 sm:px-7 sm:pb-14 sm:pt-10">
      <div className="grid grid-rows-[auto_auto_auto] gap-8 sm:grid-cols-[1fr_1.25fr_1fr] sm:grid-rows-1 sm:items-center sm:gap-6">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-1 sm:gap-2.5">
          {SOURCES.map((s) => (
            <div key={s.id} ref={(el) => { sourceRefs.current[s.id] = el; }} className={node}>
              {s.label}
              <span className="mt-0.5 block font-mono text-[11px] text-faint">{s.sub}</span>
            </div>
          ))}
        </div>
        <div className={`${node} text-center`}>
          <span className="font-medium">Integrations BE</span>
          <span className="mt-0.5 block font-mono text-[11px] text-faint">validate · map · onboard</span>
          <div
            ref={laneRef}
            className="mt-3 flex h-7 items-center justify-center rounded-md border border-dashed border-line font-mono text-[11px] text-muted"
          >
            {reduced ? "ORD-4127" : inLane ?? "idle"}
          </div>
        </div>
        <div ref={omsRef} className={node}>
          Order management
          <span className="mt-0.5 block font-mono text-[11px] text-faint">Localwell OMS</span>
        </div>
      </div>

      <div className="absolute inset-x-5 bottom-4 flex justify-between gap-4 font-mono text-[11px] text-faint sm:inset-x-7">
        <span aria-live="off">
          {reduced ? (
            "partner order → gateway → OMS"
          ) : log[0] ? (
            <>
              {log[0].order} <span className="hidden sm:inline">from {log[0].from}</span> → <span className="text-ink">201</span>
            </>
          ) : (
            "waiting for orders"
          )}
        </span>
        <span>
          synced <span className="text-ink">{synced}</span>
        </span>
      </div>
    </div>
  );
}
