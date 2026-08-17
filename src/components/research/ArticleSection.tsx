import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

export function ArticleSection({
  id,
  index,
  title,
  lead,
  children,
}: {
  id: string;
  index: string;
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-border py-16 first:border-t-0 first:pt-0">
      <Reveal>
        <div className="flex items-baseline gap-3">
          <span className="mono-tag text-sm text-coral-soft">{index}</span>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </h2>
        </div>
        {lead && <p className="mt-4 max-w-3xl leading-relaxed text-muted">{lead}</p>}
        <div className="mt-8">{children}</div>
      </Reveal>
    </section>
  );
}
