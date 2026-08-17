"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

const citation = `H. Acharla, "Ensembling Convolutional and Transformer Architectures for Retinopathy of
Prematurity Screening in Neonatal Fundus Images," Mountain House High School, IEEE COMPSAC.`;

export function CitationBlock() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="card-surface rounded-2xl p-6">
      <div className="flex items-start justify-between gap-4">
        <pre className="mono-tag whitespace-pre-wrap text-xs leading-relaxed text-muted">{citation}</pre>
        <button
          onClick={copy}
          className="mono-tag flex shrink-0 items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-[10px] uppercase tracking-widest text-muted hover:text-foreground"
        >
          {copied ? <Check size={12} className="text-teal" /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}
