"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CloseIcon, MenuIcon } from "./icons";
import { ensureGsap, ScrollTrigger } from "@/lib/gsap";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    ensureGsap();
    const trigger = ScrollTrigger.create({
      start: 80,
      end: 99999,
      onUpdate: (self) => {
        nav.dataset.scrolled = self.scroll() > 80 ? "true" : "false";
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Primary"
        data-scrolled="false"
        className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-void-line bg-void/70 px-6 py-4 backdrop-blur-md transition-[padding,background-color] duration-300 ease-out data-[scrolled=true]:bg-void/90 data-[scrolled=true]:py-3 lg:px-12"
      >
        <a href="#top" className="flex items-center gap-2.5">
          <Image src="/images/logo.png" alt="" width={32} height={32} className="h-8 w-8 rounded-[9px]" priority />
          <span className="font-display text-xl font-semibold tracking-tight text-white">
            Atif Siddiqui
          </span>
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="font-label text-sm text-mist transition-colors hover:text-white"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href="#contact"
            className="rounded-full bg-white px-5 py-2.5 font-label text-sm font-medium text-void transition-[transform,background-color] duration-200 ease-out hover:bg-mist active:scale-[0.96]"
          >
            Let&rsquo;s talk
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="p-1.5 text-white md:hidden"
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 z-30 bg-void pt-20 md:hidden">
          <ul className="flex flex-col gap-1 px-6 py-6">
            {LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center border-b border-void-line py-4 font-display text-xl text-white"
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex items-center rounded-full bg-white px-6 py-3 font-label text-sm font-medium text-void"
              >
                Let&rsquo;s talk
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
