import { skillGroups, education } from "@/data/resume";
import { Reveal } from "./reveal";

const SPAN: Record<string, string> = {
  frontend: "lg:col-span-7",
  languages: "lg:col-span-5",
  backend: "lg:col-span-4",
  cloud: "lg:col-span-4",
  databases: "lg:col-span-4",
  domain: "lg:col-span-12",
};

const ORDER = ["frontend", "languages", "backend", "cloud", "databases", "domain"];

export function Skills() {
  const ordered = ORDER.map((id) => skillGroups.find((g) => g.id === id)!);

  return (
    <section id="skills" className="relative bg-void px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <p className="font-label text-sm uppercase tracking-[0.14em] text-mist-dim">Skills</p>
          <h2 className="mt-3 font-display text-4xl text-white sm:text-5xl">
            <span className="italic font-normal text-mist">The full</span>{" "}
            <span className="font-semibold">stack.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-12">
          {ordered.map((group, i) => (
            <Reveal key={group.id} delay={(i % 3) * 0.06} className={`h-full ${SPAN[group.id]}`}>
              <div className="group flex h-full flex-col rounded-2xl border border-void-line bg-void-raised p-6 transition-[border-color,transform] duration-300 ease-out hover:-translate-y-1 hover:border-glow-blue/40">
                <h3 className="font-display text-lg text-white">{group.label}</h3>
                <ul className="mt-4 flex flex-wrap content-start gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-void-line px-3 py-1 font-label text-xs text-mist transition-colors duration-200 group-hover:border-void-line/80"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.2} className="h-full lg:col-span-12">
            <div className="rounded-2xl border border-void-line bg-void-raised p-6">
              <h3 className="font-display text-lg text-white">Education</h3>
              <p className="mt-3 text-sm text-mist">
                {education.degree} &mdash; {education.school}
                <span className="ml-2 font-label text-xs text-mist-dim">{education.dateRange}</span>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
