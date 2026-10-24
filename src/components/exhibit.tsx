import type { ReactNode } from "react";
import { ExternalIcon } from "./icons";

type ExhibitProps = {
  title: string;
  meta: string;
  href?: string;
  linkLabel?: string;
  children: ReactNode;
  description: ReactNode;
  note?: string;
  /** Keep the caption in one column, for exhibits placed side by side. */
  stacked?: boolean;
};

/** A working piece of a project in a frame, with its caption underneath. */
export function Exhibit({ title, meta, href, linkLabel, children, description, note, stacked }: ExhibitProps) {
  return (
    <article className="group/exhibit">
      <div className="relative overflow-hidden rounded-frame border border-line bg-surface">{children}</div>
      <div className={`mt-4 flex flex-col gap-1 ${stacked ? "" : "sm:flex-row sm:justify-between sm:gap-8"}`}>
        <div className="max-w-[56ch]">
          <h3 className="font-medium text-ink">
            {href ? (
              <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 no-underline hover:underline">
                {title}
                <ExternalIcon className="h-3.5 w-3.5 text-faint" />
                <span className="sr-only">({linkLabel ?? "opens in a new tab"})</span>
              </a>
            ) : (
              title
            )}
          </h3>
          <p className="text-muted">{description}</p>
        </div>
        <div className={`flex shrink-0 flex-col gap-0.5 text-[13px] text-faint ${stacked ? "mt-1" : "sm:items-end sm:pt-1"}`}>
          <span>{meta}</span>
          {note && <span>{note}</span>}
        </div>
      </div>
    </article>
  );
}
