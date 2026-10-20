import Image from "next/image";
import { profile } from "@/data/resume";
import { GithubIcon, LinkedinIcon, MailIcon } from "./icons";
import { Reveal } from "./reveal";
import { AuroraBackground } from "./aurora-background";

export function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-void-line bg-void px-6 py-28">
      <AuroraBackground className="opacity-60" />

      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="font-label text-sm uppercase tracking-[0.14em] text-mist-dim">Get in touch</p>
          <h2 className="mt-3 font-display text-4xl text-white sm:text-5xl">
            <span className="font-semibold">Let&rsquo;s build</span>{" "}
            <span className="italic font-normal text-mist">something that ships.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-lg text-mist">
            Open to senior full-stack roles and interesting builds. No contact form &mdash; just write.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-label text-sm font-medium text-void transition-[transform,background-color] duration-200 ease-out hover:bg-mist active:scale-[0.97]"
            >
              <MailIcon className="h-4 w-4" />
              {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-void-line px-7 py-3.5 font-label text-sm text-white transition-[transform,border-color] duration-200 ease-out hover:border-mist active:scale-[0.97]"
            >
              <LinkedinIcon className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-void-line px-7 py-3.5 font-label text-sm text-white transition-[transform,border-color] duration-200 ease-out hover:border-mist active:scale-[0.97]"
            >
              <GithubIcon className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </Reveal>

        <div className="mt-24 flex flex-col items-center justify-between gap-4 border-t border-void-line pt-8 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <Image src="/images/logo.png" alt="" width={24} height={24} className="h-6 w-6 rounded-[7px]" />
            <span className="font-display text-lg text-white">{profile.name}</span>
          </div>
          <span className="font-label text-xs text-mist-dim">{profile.location}</span>
        </div>
      </div>
    </footer>
  );
}
