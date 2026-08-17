"use client";

import Image from "next/image";
import { gradcamExamples } from "@/lib/site-data";

export function ExampleImages({ onPick, disabled }: { onPick: (url: string, label: string) => void; disabled?: boolean }) {
  return (
    <div>
      <p className="mono-tag text-xs uppercase tracking-widest text-muted-2">Or try a real example</p>
      <div className="mt-3 flex gap-3">
        {gradcamExamples.map((ex) => (
          <button
            key={ex.key}
            disabled={disabled}
            onClick={() => onPick(ex.original, ex.label)}
            className="group relative aspect-square w-1/3 overflow-hidden rounded-xl border border-border bg-black transition-all hover:border-coral/50 disabled:pointer-events-none disabled:opacity-50"
          >
            <Image
              src={ex.original}
              alt={`Example ${ex.label} fundus image`}
              fill
              sizes="(max-width: 1024px) 33vw, 160px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-2 py-1.5 text-left">
              <span className="text-[10px] font-medium text-white">{ex.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
