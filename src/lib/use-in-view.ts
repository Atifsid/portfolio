"use client";

import { useEffect, useRef, useState } from "react";

/** True while the element is on screen; exhibits use it to run only when visible. */
export function useInView<T extends Element>(rootMargin = "0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return [ref, inView] as const;
}

/** Runs `fn` every `ms` while `active`; stops when it goes off screen or motion is reduced. */
export function useTicker(active: boolean, ms: number, fn: () => void) {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => fnRef.current(), ms);
    return () => window.clearInterval(id);
  }, [active, ms]);
}
