"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number;
  phase: number;
  twinkle: number;
  peak: number;
};

const DEPTH = 1200; // stars live in a volume this deep and wrap, so the flight never ends
const FOCAL = 300;
const SPREAD = 1600; // width/height of the volume, in world units
const SCROLL_SPEED = 0.35; // world units travelled per pixel scrolled
const IDLE_SPEED = 0.05; // slow forward drift when not scrolling
const MAX_STREAK = 18; // px; fast scrolling stretches stars into short streaks

// One star per ~4,500 px² of viewport, capped so large screens stay cheap.
const AREA_PER_STAR = 4_500;
const MAX_STARS = 380;
// Grey stars on a light page read fainter than white ones on dark, so light mode gets more of them.
const LIGHT_MULTIPLIER = 1.8;

function spawn(z = Math.random() * DEPTH): Star {
  return {
    x: (Math.random() - 0.5) * SPREAD,
    y: (Math.random() - 0.5) * SPREAD,
    z,
    phase: Math.random() * Math.PI * 2,
    twinkle: 0.5 + Math.random() * 1.2,
    peak: 0.4 + Math.random() * 0.6,
  };
}

function inkColor() {
  return getComputedStyle(document.documentElement).getPropertyValue("--ink").trim() || "#ededee";
}

/** Stars behind the page: scrolling down flies forward through them, scrolling up flies back. */
export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let color = inkColor();
    let light = document.documentElement.dataset.theme === "light";
    let frame = 0;
    let last = performance.now();
    let lastScroll = window.scrollY;
    let velocity = 0; // smoothed travel per frame, drives the streaks

    const project = (s: Star, z: number) => {
      const k = FOCAL / z;
      const unit = Math.min(w, h) / 900;
      return { x: w / 2 + s.x * unit * k, y: h / 2 + s.y * unit * k, k };
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineCap = "round";
      for (const s of stars) {
        if (s.z < 1) continue;
        const p = project(s, s.z);
        if (p.x < -20 || p.x > w + 20 || p.y < -20 || p.y > h + 20) continue;

        // Fade in from the far end, brighten as stars approach, twinkle at rest.
        const far = 1 - s.z / DEPTH;
        const glint = 0.6 + 0.4 * Math.sin(t * 0.001 * s.twinkle + s.phase);
        const alpha = Math.min(1, far * 1.5) * glint * s.peak;
        if (alpha < 0.02) continue;
        const size = Math.min(2.4, 0.4 + p.k * 0.9);
        ctx.globalAlpha = alpha;

        // A streak toward where the star was a moment ago; length follows travel speed.
        const trail = Math.max(-MAX_STREAK, Math.min(MAX_STREAK, velocity * p.k * 6));
        if (Math.abs(trail) > 1.2) {
          const dx = p.x - w / 2;
          const dy = p.y - h / 2;
          const len = Math.hypot(dx, dy) || 1;
          ctx.lineWidth = size;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - (dx / len) * trail, p.y - (dy / len) * trail);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    // Keep existing stars (mobile URL bars resize the viewport while scrolling); only top up or trim.
    const fitCount = () => {
      const scale = light ? LIGHT_MULTIPLIER : 1;
      const count = Math.round(Math.min(MAX_STARS, (w * h) / AREA_PER_STAR) * scale);
      if (stars.length > count) stars.length = count;
      while (stars.length < count) stars.push(spawn());
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fitCount();
      if (reduced) draw(0);
    };

    const step = (now: number) => {
      const dt = Math.min(now - last, 50) / 16.67;
      last = now;
      const scroll = window.scrollY;
      const scrolled = scroll - lastScroll;
      lastScroll = scroll;

      // Scrolling down moves the camera forward (stars come closer); scrolling up moves it back.
      const travel = scrolled * SCROLL_SPEED + IDLE_SPEED * dt;
      velocity += (travel - velocity) * 0.15;
      for (const s of stars) {
        s.z -= travel;
        if (s.z < 1) {
          Object.assign(s, spawn(s.z + DEPTH));
        } else if (s.z > DEPTH) {
          Object.assign(s, spawn(s.z - DEPTH));
        }
      }
      draw(now);
      frame = requestAnimationFrame(step);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      if (reduced) {
        draw(0);
        return;
      }
      last = performance.now();
      lastScroll = window.scrollY;
      frame = requestAnimationFrame(step);
    };

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(frame);
      else start();
    };

    // Follow the theme toggle, which flips data-theme on <html>.
    const themeObserver = new MutationObserver(() => {
      color = inkColor();
      light = document.documentElement.dataset.theme === "light";
      fitCount();
      if (reduced) draw(0);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    resize();
    start();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(frame);
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Stars dim behind the 720px reading column so they never speckle the text.
  const columnMask =
    "linear-gradient(to right, #000 0, #000 calc(50% - 420px), rgba(0,0,0,0.25) calc(50% - 340px), rgba(0,0,0,0.25) calc(50% + 340px), #000 calc(50% + 420px), #000 100%)";

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      style={{ maskImage: columnMask, WebkitMaskImage: columnMask }}
    />
  );
}
