"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, AlertCircle, ImageOff, RotateCcw } from "lucide-react";
import type { PredictionResponse } from "@/lib/api";
import { classLabels } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const classColor: Record<string, { bar: string; text: string; ring: string }> = {
  Physiological: { bar: "bg-teal", text: "text-teal", ring: "ring-teal/40" },
  ROP: { bar: "bg-coral", text: "text-coral", ring: "ring-coral/40" },
  Hemorrhage: { bar: "bg-violet", text: "text-violet", ring: "ring-violet/40" },
};

function ProbabilityBar({ label, value, delay }: { label: string; value: number; delay: number }) {
  const colors = classColor[label] ?? classColor.ROP;
  const pct = Math.round(value * 100);
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">{label}</span>
        <span className={cn("mono-tag", colors.text)}>{pct}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className={cn("h-full rounded-full", colors.bar)}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

function ModelBreakdownRow({ name, probs }: { name: string; probs: Record<string, number> }) {
  return (
    <div className="flex items-center gap-3 text-xs">
      <span className="w-24 shrink-0 text-muted">{name}</span>
      <div className="flex h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
        {classLabels.map((label) => (
          <div
            key={label}
            className={classColor[label]?.bar}
            style={{ width: `${(probs[label] ?? 0) * 100}%` }}
            title={`${label}: ${Math.round((probs[label] ?? 0) * 100)}%`}
          />
        ))}
      </div>
      <span className="mono-tag w-10 shrink-0 text-right text-muted-2">
        {Math.round(Math.max(...Object.values(probs)) * 100)}%
      </span>
    </div>
  );
}

export function ResultsPanel({
  status,
  result,
  error,
  onReset,
}: {
  status: "idle" | "loading" | "done" | "error";
  result: PredictionResponse | null;
  error: string | null;
  onReset: () => void;
}) {
  const [showHeatmap, setShowHeatmap] = useState(true);

  return (
    <div className="card-surface flex h-full min-h-[420px] flex-col rounded-2xl p-6 sm:p-7">
      <>
        {status === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-1 flex-col items-center justify-center text-center"
          >
            <div className="rounded-full border border-border bg-white/[0.03] p-4">
              <ImageOff size={22} className="text-muted-2" />
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted">
              Upload a fundus image or pick an example to see the ensemble&apos;s live prediction.
            </p>
          </motion.div>
        )}

        {status === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-1 flex-col items-center justify-center text-center"
          >
            <Loader2 size={26} className="animate-spin text-coral" />
            <p className="mt-4 text-sm font-medium text-foreground">Running ResNet-50 + SWIN-B…</p>
            <p className="mt-1.5 max-w-xs text-xs text-muted-2">
              If the model has been idle, the free-tier server can take up to 30s to wake up.
            </p>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-1 flex-col items-center justify-center text-center"
          >
            <AlertCircle size={22} className="text-coral" />
            <p className="mt-4 max-w-xs text-sm text-foreground">{error ?? "Something went wrong."}</p>
            <button
              onClick={onReset}
              className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs text-muted hover:text-foreground"
            >
              <RotateCcw size={13} /> Try again
            </button>
          </motion.div>
        )}

        {status === "done" && result && (
          <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-1 flex-col">
            <div className="flex items-center gap-3">
              <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/5 ring-2", classColor[result.predicted_class]?.ring)}>
                <CheckCircle2 size={18} className={classColor[result.predicted_class]?.text} />
              </div>
              <div>
                <div className="text-xs text-muted-2">Ensemble prediction</div>
                <div className={cn("font-[family-name:var(--font-display)] text-xl font-semibold", classColor[result.predicted_class]?.text)}>
                  {result.predicted_class} · {Math.round(result.confidence * 100)}%
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {classLabels.map((label, i) => (
                <ProbabilityBar key={label} label={label} value={result.probabilities[label] ?? 0} delay={i * 0.08} />
              ))}
            </div>

            {result.gradcam_png_base64 && (
              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-muted">Grad-CAM (ResNet-50)</span>
                  <button
                    onClick={() => setShowHeatmap((s) => !s)}
                    className="mono-tag rounded-full border border-border px-2.5 py-1 text-[10px] uppercase tracking-widest text-muted hover:text-foreground"
                  >
                    {showHeatmap ? "Show original" : "Show heatmap"}
                  </button>
                </div>
                <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-border bg-black">
                  <Image
                    src={`data:image/png;base64,${result.preprocessed_image_base64}`}
                    alt="Preprocessed fundus image"
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <Image
                    src={`data:image/png;base64,${result.gradcam_png_base64}`}
                    alt="Grad-CAM heatmap overlay"
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className={cn("object-cover transition-opacity duration-500", showHeatmap ? "opacity-100" : "opacity-0")}
                  />
                </div>
              </div>
            )}

            <div className="mt-6 border-t border-border-soft pt-5">
              <p className="mb-3 text-xs font-medium text-muted">Per-model breakdown</p>
              <div className="space-y-2.5">
                <ModelBreakdownRow name="ResNet-50" probs={result.model_breakdown.resnet50} />
                <ModelBreakdownRow name="SWIN-B" probs={result.model_breakdown.swin_b} />
              </div>
            </div>

            <button
              onClick={onReset}
              className="mono-tag mt-6 inline-flex items-center justify-center gap-1.5 self-start rounded-full border border-border px-4 py-2 text-xs uppercase tracking-widest text-muted hover:text-foreground"
            >
              <RotateCcw size={13} /> Analyze another image
            </button>
          </motion.div>
        )}
      </>
    </div>
  );
}
