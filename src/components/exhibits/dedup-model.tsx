"use client";

import { useState } from "react";
import { useInView, useTicker } from "@/lib/use-in-view";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type Kind = "ats" | "api" | "aggregator";

type Posting = {
  id: string;
  kind: Kind;
  platform: string;
  company: string;
  title: string;
  city: string;
  salary?: string;
};

type Row = Posting & { from: string[]; reason?: "url" | "fuzzy" | "kept"; filled?: string };

// Sample postings. The merge below follows JobsPedia's dedupeAndMerge rules.
const STREAM: Posting[] = [
  { id: "gh-stripe-1", kind: "ats", platform: "greenhouse", company: "Stripe", title: "Senior Backend Engineer", city: "San Francisco" },
  { id: "ab-linear-3", kind: "ats", platform: "ashby", company: "Linear", title: "Product Engineer", city: "Remote" },
  { id: "li-889", kind: "aggregator", platform: "linkedin", company: "Stripe", title: "Senior Backend Engineer", city: "San Francisco", salary: "$190k–240k" },
  { id: "gh-figma-4", kind: "ats", platform: "greenhouse", company: "Figma", title: "Software Engineer", city: "New York" },
  { id: "gh-figma-5", kind: "ats", platform: "greenhouse", company: "Figma", title: "Software Engineer", city: "New York" },
  { id: "ro-1207", kind: "api", platform: "remoteok", company: "Linear", title: "Product Engineer", city: "Remote", salary: "$160k–200k" },
  { id: "gh-figma-4", kind: "aggregator", platform: "indeed", company: "Figma", title: "Software Engineer", city: "New York" },
  { id: "rv-310", kind: "api", platform: "remotive", company: "Notion", title: "Frontend Engineer", city: "Remote" },
];

const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const fuzzyKey = (j: Posting) => `${normalize(j.company)}|${normalize(j.title)}|${normalize(j.city)}`;

function groupBy<T>(items: T[], keyOf: (item: T) => string) {
  const groups = new Map<string, T[]>();
  for (const item of items) {
    const key = keyOf(item);
    const group = groups.get(key);
    if (group) group.push(item);
    else groups.set(key, [item]);
  }
  return [...groups.values()];
}

function merge(group: Row[], reason: Row["reason"]): Row {
  if (group.length === 1) return group[0];
  const primary = group.find((j) => j.kind === "ats") ?? group[0];
  const rest = group.filter((j) => j !== primary);
  const donor = rest.find((j) => j.salary);
  return {
    ...primary,
    salary: primary.salary ?? donor?.salary,
    filled: !primary.salary && donor ? donor.platform : primary.filled,
    from: group.flatMap((j) => j.from),
    reason,
  };
}

function dedupe(postings: Posting[]): Row[] {
  const rows: Row[] = postings.map((p) => ({ ...p, from: [p.platform] }));
  const byUrl = groupBy(rows, (j) => j.id).map((g) => merge(g, "url"));
  const result: Row[] = [];
  for (const group of groupBy(byUrl, fuzzyKey)) {
    const kinds = new Set(group.map((j) => j.kind));
    if (group.length > 1 && kinds.size > 1) result.push(merge(group, "fuzzy"));
    else result.push(...group.map((j) => (group.length > 1 ? { ...j, reason: "kept" as const } : j)));
  }
  return result;
}

const REASON: Record<NonNullable<Row["reason"]>, string> = {
  url: "same apply URL",
  fuzzy: "company · title · city, across sources",
  kept: "same source, separate req, kept",
};

export function DedupModel() {
  const [rootRef, inView] = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const [count, setCount] = useState(3);
  const total = STREAM.length;

  // Pause on the full dataset for a few ticks before starting over.
  useTicker(inView && !reduced, 1500, () => setCount((n) => (n >= total + 3 ? 1 : n + 1)));

  const shown = reduced ? total : Math.min(count, total);
  const incoming = STREAM.slice(0, shown);
  const rows = dedupe(incoming);

  return (
    <div ref={rootRef} className="grid sm:min-h-[318px] sm:grid-cols-2">
      <div className="min-w-0 p-4 sm:p-5">
        <div className="mb-3 flex justify-between font-mono text-[11px] text-faint">
          <span>incoming</span>
          <span>{shown} postings</span>
        </div>
        <ul className="space-y-1.5">
          {[...incoming].reverse().slice(0, 5).map((p, i) => (
            <li
              key={`${p.platform}-${p.id}`}
              className={`flex items-baseline justify-between gap-3 rounded-md bg-surface-2 px-2.5 py-1.5 text-[13px] transition-opacity duration-500 ${
                i === 0 && !reduced ? "animate-[rise_0.5s_cubic-bezier(0.16,1,0.3,1)_both]" : ""
              }`}
            >
              <span className="truncate">
                {p.title} <span className="text-faint">· {p.company}</span>
              </span>
              <span className="shrink-0 font-mono text-[11px] text-faint">{p.platform}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="min-w-0 border-t border-line p-4 sm:border-l sm:border-t-0 sm:p-5">
        <div className="mb-3 flex justify-between font-mono text-[11px] text-faint">
          <span>jobs.db</span>
          <span>
            <span className="text-ink">{rows.length}</span> unique
          </span>
        </div>
        <ul className="space-y-1.5">
          {rows.map((r) => (
            <li key={`${r.id}-${r.from[0]}`} className="rounded-md bg-surface-2 px-2.5 py-1.5 text-[13px]">
              <div className="flex items-baseline justify-between gap-3">
                <span className="truncate">
                  {r.title} <span className="text-faint">· {r.company}</span>
                </span>
                <span className={`shrink-0 font-mono text-[11px] ${r.from.length > 1 ? "text-ink" : "text-faint"}`}>
                  {r.from.join(" + ")}
                </span>
              </div>
              {(r.reason || r.filled) && (
                <div className="mt-0.5 font-mono text-[11px] text-faint">
                  {r.reason && REASON[r.reason]}
                  {r.filled && ` · salary from ${r.filled}`}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
