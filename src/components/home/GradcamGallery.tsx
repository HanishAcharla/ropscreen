"use client";

import Image from "next/image";
import { useState } from "react";
import { Container, SectionLabel } from "@/components/ui/Container";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { gradcamExamples } from "@/lib/site-data";
import { cn } from "@/lib/utils";

function GradcamCard({ example }: { example: (typeof gradcamExamples)[number] }) {
  const [showHeatmap, setShowHeatmap] = useState(true);

  return (
    <div className="card-surface overflow-hidden rounded-2xl">
      <div className="relative aspect-square w-full overflow-hidden bg-black">
        <Image
          src={example.original}
          alt={`${example.label} fundus image`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <Image
          src={example.heatmap}
          alt={`${example.label} Grad-CAM heatmap`}
          fill
          className={cn("object-cover transition-opacity duration-500", showHeatmap ? "opacity-100" : "opacity-0")}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <button
          onClick={() => setShowHeatmap((s) => !s)}
          className="mono-tag absolute bottom-3 right-3 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-widest text-white backdrop-blur transition-colors hover:bg-black/70"
        >
          {showHeatmap ? "Show original" : "Show Grad-CAM"}
        </button>
      </div>
      <div className="p-5">
        <div className="text-sm font-medium text-foreground">{example.label}</div>
        <p className="mt-1.5 text-xs leading-relaxed text-muted">{example.insight}</p>
      </div>
    </div>
  );
}

export function GradcamGallery() {
  return (
    <section className="border-t border-border">
      <Container className="py-24">
        <Reveal>
          <SectionLabel>Interpretability</SectionLabel>
          <h2 className="mt-5 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
            Grad-CAM shows the model is looking where a clinician would.
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            Gradient-weighted Class Activation Mapping highlights the regions that drove each
            ResNet-50 prediction. These class activation patterns align with clinically meaningful
            retinal features rather than background artifacts — real examples from the paper below,
            click to toggle the overlay.
          </p>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-3">
          {gradcamExamples.map((example) => (
            <StaggerItem key={example.key}>
              <GradcamCard example={example} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
