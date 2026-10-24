"use client";

import { useEffect, useRef, useState } from "react";

type Line = { dir: "c" | "s"; text: string };

function script(email: string): { lines: Line[]; ok: boolean } {
  const domain = email.split("@")[1] ?? "";
  const ok = !/^(no|fake|test)/i.test(email.split("@")[0] ?? "");
  return {
    ok,
    lines: [
      { dir: "c", text: `MX lookup ${domain}` },
      { dir: "s", text: `mx1.${domain} pref 10` },
      { dir: "c", text: "EHLO verifier.local" },
      { dir: "s", text: "250 OK" },
      { dir: "c", text: "MAIL FROM:<probe@verifier.local>" },
      { dir: "s", text: "250 OK" },
      { dir: "c", text: `RCPT TO:<${email}>` },
      ok ? { dir: "s", text: "250 Accepted" } : { dir: "s", text: "550 No such user" },
      { dir: "c", text: "QUIT" },
    ],
  };
}

const VALID = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Steps through an SMTP verification handshake for the typed address (simulated). */
export function SmtpHandshake() {
  const [email, setEmail] = useState("hello@example.com");
  const [shown, setShown] = useState<Line[]>([]);
  const [result, setResult] = useState<"ok" | "bad" | null>(null);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const run = (e: React.FormEvent) => {
    e.preventDefault();
    if (!VALID.test(email)) {
      setError("Enter a full address, like name@domain.com.");
      return;
    }
    setError(null);
    timers.current.forEach(window.clearTimeout);
    const { lines, ok } = script(email.trim());
    setShown([]);
    setResult(null);
    setRunning(true);
    lines.forEach((line, i) => {
      timers.current.push(window.setTimeout(() => setShown((s) => [...s, line]), 260 * (i + 1)));
    });
    timers.current.push(
      window.setTimeout(() => {
        setResult(ok ? "ok" : "bad");
        setRunning(false);
      }, 260 * (lines.length + 1)),
    );
  };

  return (
    <div className="p-4 sm:p-5">
      <form onSubmit={run} className="flex gap-2">
        <label htmlFor="smtp-email" className="sr-only">
          Email address to verify
        </label>
        <input
          id="smtp-email"
          type="text"
          inputMode="email"
          autoComplete="off"
          spellCheck={false}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "smtp-error" : undefined}
          className="min-w-0 flex-1 rounded-md border border-line bg-surface-2 px-3 py-1.5 font-mono text-[13px] text-ink caret-ink outline-none transition-colors placeholder:text-faint focus:border-faint"
        />
        <button
          type="submit"
          disabled={running}
          className="rounded-md bg-ink px-3 py-1.5 text-[13px] font-medium text-bg transition-opacity hover:opacity-85 active:scale-[0.98] disabled:opacity-50"
        >
          {running ? "Checking" : "Verify"}
        </button>
      </form>
      {error && (
        <p id="smtp-error" className="mt-2 text-[13px] text-muted">
          {error}
        </p>
      )}

      <div
        className={`mt-3 overflow-hidden rounded-md bg-surface-2 p-3 font-mono text-[12px] leading-[1.55] ${shown.length || running ? "h-[212px]" : "h-auto"}`}
        aria-live="polite"
      >
        {shown.length === 0 && !running && (
          <span className="font-sans text-[13px] text-faint">Press Verify to open an SMTP session. Try no@example.com too.</span>
        )}
        {shown.map((l, i) => (
          <div key={i} className={`animate-[rise_0.3s_ease-out_both] ${l.dir === "c" ? "text-muted" : "text-ink"}`}>
            <span className="text-faint">{l.dir === "c" ? "→ " : "← "}</span>
            {l.text}
          </div>
        ))}
        {result && (
          <div className="mt-1 flex items-center gap-2 text-ink">
            <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${result === "ok" ? "bg-live" : "bg-faint"}`} />
            {result === "ok" ? "mailbox exists" : "mailbox not found"}
          </div>
        )}
      </div>
    </div>
  );
}
