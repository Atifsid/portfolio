import { projects } from "@/data/resume";
import { ExternalIcon, GithubIcon } from "./icons";
import { Reveal } from "./reveal";
import { TiltCard } from "./tilt-card";

const ACCENTS = [
  "linear-gradient(90deg, #3d5afe, #8b5cf6)",
  "linear-gradient(90deg, #8b5cf6, #3d5afe)",
  "linear-gradient(90deg, #3d5afe, #5a7dfe)",
];

export function TheWork() {
  return (
    <section id="work" className="relative bg-void px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="font-label text-sm uppercase tracking-[0.14em] text-mist-dim">Selected Work</p>
          <h2 className="mt-3 font-display text-4xl text-white sm:text-5xl">
            <span className="italic font-normal text-mist">Twelve builds,</span>{" "}
            <span className="font-semibold">shipped and live.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={(i % 3) * 0.06} className="h-full">
              <TiltCard className="group flex h-full flex-col overflow-hidden rounded-2xl border border-void-line bg-void-raised transition-colors duration-300 hover:border-glow-blue/40">
                <span
                  aria-hidden="true"
                  className="block h-1 w-full"
                  style={{ background: ACCENTS[i % ACCENTS.length] }}
                />
                <div className="flex flex-1 flex-col p-6">
                  <span className="font-label text-[11px] uppercase tracking-[0.1em] text-mist-dim">
                    {project.type === "live" ? "Live" : "Open source"} &middot; {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display text-xl text-white">{project.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-mist">{project.description}</p>
                  {project.highlights && (
                    <ul className="mt-3 space-y-1.5">
                      {project.highlights.map((h) => (
                        <li key={h} className="flex gap-2 text-[0.82rem] text-mist">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-glow-blue" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                      <span key={s} className="rounded-full border border-void-line px-2.5 py-0.5 font-label text-[11px] text-mist">
                        {s}
                      </span>
                    ))}
                  </div>
                  {project.href && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-1.5 self-start font-label text-xs text-white transition-colors hover:text-glow-blue"
                    >
                      {project.type === "live" ? (
                        <>Visit live <ExternalIcon className="h-3 w-3" /></>
                      ) : (
                        <>View repository <GithubIcon className="h-3 w-3" /></>
                      )}
                    </a>
                  )}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
