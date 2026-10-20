import { projects } from "@/data/resume";
import { Reveal } from "./reveal";
import { CountUp } from "./count-up";

const STATS = [
  { value: "3.5+", label: "Years shipping production code" },
  { value: `${projects.length}`, label: "Projects shipped or in production" },
  { value: "3", label: "Companies, each a step up in scope" },
];

export function Highlights() {
  return (
    <section className="border-y border-void-line bg-void-raised px-6 py-20">
      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-10 sm:grid-cols-3">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.06} className="text-center">
            <CountUp value={stat.value} className="font-display text-4xl font-semibold text-white sm:text-5xl" />
            <p className="mt-2 font-label text-sm text-mist-dim">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
