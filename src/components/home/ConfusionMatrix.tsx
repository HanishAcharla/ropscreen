"use client";

import { motion } from "framer-motion";

function cellColor(value: number) {
  // coral-tinted intensity scale, diagonal-friendly on dark background
  const t = Math.min(1, value / 100);
  const alpha = 0.08 + t * 0.72;
  return `rgba(255, 122, 82, ${alpha.toFixed(3)})`;
}

export function ConfusionMatrix({
  labels,
  matrix,
  title,
}: {
  labels: readonly string[];
  matrix: readonly (readonly number[])[];
  title: string;
}) {
  return (
    <div className="card-surface rounded-2xl p-5">
      <div className="mb-4 text-sm font-medium text-foreground">{title}</div>
      <div className="flex gap-2">
        <div className="flex flex-col justify-around gap-1 pb-6 pr-1 pt-1 text-right">
          {labels.map((l) => (
            <div key={l} className="flex h-full items-center justify-end text-[10px] leading-tight text-muted-2" style={{ maxWidth: 52 }}>
              {l}
            </div>
          ))}
        </div>

        <div className="flex-1">
          <div
            className="grid gap-1"
            style={{ gridTemplateColumns: `repeat(${labels.length}, minmax(0, 1fr))` }}
          >
            {matrix.map((row, ri) =>
              row.map((val, ci) => (
                <motion.div
                  key={`${ri}-${ci}`}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.35, delay: (ri * labels.length + ci) * 0.04 }}
                  className="flex aspect-square items-center justify-center rounded-md text-[11px] font-medium"
                  style={{
                    background: cellColor(val),
                    color: val > 55 ? "#180a04" : "var(--foreground)",
                  }}
                >
                  {val.toFixed(1)}%
                </motion.div>
              ))
            )}
          </div>
          <div className="mt-1.5 grid gap-1" style={{ gridTemplateColumns: `repeat(${labels.length}, minmax(0, 1fr))` }}>
            {labels.map((l) => (
              <div key={l} className="truncate text-center text-[10px] text-muted-2">
                {l}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 flex justify-between text-[10px] text-muted-2">
        <span>↑ true label</span>
        <span>predicted label →</span>
      </div>
    </div>
  );
}
