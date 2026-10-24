import { education, skillGroups } from "@/data/resume";

export function Skills() {
  return (
    <dl className="grid gap-x-10 gap-y-5 sm:grid-cols-[10rem_1fr]">
      {skillGroups.map((g) => (
        <div key={g.id} className="contents">
          <dt className="text-faint">{g.label}</dt>
          <dd className="-mt-4 text-muted sm:mt-0">{g.items.join(", ")}</dd>
        </div>
      ))}
      <div className="contents">
        <dt className="text-faint">Education</dt>
        <dd className="-mt-4 text-muted sm:mt-0">
          {education.degree}, {education.school} <span className="font-mono text-xs text-faint">{education.dateRange}</span>
        </dd>
      </div>
    </dl>
  );
}
