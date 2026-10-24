"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const FIRST = ["Aarav", "Diya", "Kabir", "Meera", "Rohan", "Ishita", "Vivaan", "Anaya", "Arjun", "Sara", "Neel", "Tara"];
const LAST = ["Sharma", "Iyer", "Khan", "Gupta", "Rao", "Mehta", "Das", "Nair", "Bose", "Kapoor"];
const DEPT = ["Engineering", "Finance", "Operations", "Design", "People", "Sales"];

const PAGE = 6;
const TOTAL = 1000;

function employee(i: number) {
  return {
    id: i + 1,
    name: `${FIRST[(i * 7) % FIRST.length]} ${LAST[(i * 3) % LAST.length]}`,
    dept: DEPT[(i * 5) % DEPT.length],
  };
}

/** Paginated directory over 1,000 sample records, with a slow-network switch. */
export function SlowNetworkList() {
  const [page, setPage] = useState(0);
  const [slow, setSlow] = useState(true);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState(() => Array.from({ length: PAGE }, (_, i) => employee(i)));
  const [latency, setLatency] = useState<number | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const pages = Math.ceil(TOTAL / PAGE);

  const load = useCallback(
    (next: number) => {
      window.clearTimeout(timer.current);
      const ms = slow ? 900 + Math.round(Math.random() * 500) : 60 + Math.round(Math.random() * 40);
      setPage(next);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setRows(Array.from({ length: PAGE }, (_, i) => employee(next * PAGE + i)).filter((e) => e.id <= TOTAL));
        setLatency(ms);
        setLoading(false);
      }, ms);
    },
    [slow],
  );

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const btn =
    "rounded-md border border-line px-2.5 py-1 text-[13px] text-muted transition-colors hover:border-faint hover:text-ink disabled:pointer-events-none disabled:opacity-40";

  return (
    <div className="p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-[11px] text-faint">employees · {TOTAL.toLocaleString("en-US")} records</span>
        <label className="flex cursor-pointer items-center gap-2 text-[13px] text-muted">
          <span>Slow network</span>
          <button
            type="button"
            role="switch"
            aria-checked={slow}
            onClick={() => setSlow((s) => !s)}
            className={`relative h-5 w-9 rounded-full border border-line transition-colors duration-200 ${slow ? "bg-ink" : "bg-surface-2"}`}
          >
            <span
              className={`absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full transition-[left,background-color] duration-300 ease-out ${
                slow ? "left-[18px] bg-bg" : "left-[2px] bg-faint"
              }`}
            />
          </button>
        </label>
      </div>

      <ul className="space-y-1.5" aria-busy={loading}>
        {(loading ? Array.from({ length: PAGE }, (_, i) => ({ id: -i - 1, name: "", dept: "" })) : rows).map((e) => (
          <li key={e.id} className="flex h-9 items-center justify-between gap-3 rounded-md bg-surface-2 px-2.5 text-[13px]">
            {loading ? (
              <>
                <span className="h-2.5 w-32 animate-pulse rounded bg-line" />
                <span className="h-2.5 w-16 animate-pulse rounded bg-line" />
              </>
            ) : (
              <>
                <span className="truncate">{e.name}</span>
                <span className="shrink-0 text-faint">{e.dept}</span>
              </>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="font-mono text-[11px] text-faint">
          page {page + 1} / {pages}
          {latency !== null && !loading && ` · ${latency}ms`}
          {loading && " · loading"}
        </span>
        <div className="flex gap-1.5">
          <button type="button" className={btn} disabled={page === 0} onClick={() => load(page - 1)}>
            Prev
          </button>
          <button type="button" className={btn} disabled={page >= pages - 1} onClick={() => load(page + 1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
