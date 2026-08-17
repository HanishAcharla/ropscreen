"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, Image as ImageIcon, Wand2, Layers, Combine, Target } from "lucide-react";
import { cn } from "@/lib/utils";

function Arrow({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={cn("flex shrink-0 items-center justify-center text-muted-2", className)}
    >
      <ArrowRight size={18} className="hidden md:block" />
      <ArrowDown size={18} className="md:hidden" />
    </motion.div>
  );
}

function StageCard({
  icon: Icon,
  title,
  description,
  accent,
  compact,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  accent?: "coral" | "teal";
  compact?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "card-surface rounded-2xl p-5 text-left",
        compact ? "w-full" : "w-full md:w-44",
        accent === "coral" && "border-coral/40",
        accent === "teal" && "border-teal/40"
      )}
    >
      <Icon
        size={18}
        className={accent === "coral" ? "text-coral" : accent === "teal" ? "text-teal" : "text-foreground"}
      />
      <div className="mt-3 text-sm font-semibold text-foreground">{title}</div>
      <div className="mt-1 text-xs leading-relaxed text-muted">{description}</div>
    </motion.div>
  );
}

export function ArchitectureDiagram() {
  return (
    <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center md:justify-between">
      <StageCard icon={ImageIcon} title="Fundus Image" description="Neonatal retinal photograph, any resolution" />
      <Arrow />
      <StageCard icon={Wand2} title="Preprocessing" description="Border removal + CLAHE contrast enhancement" />
      <Arrow />

      <div className="flex flex-col gap-3 md:w-52">
        <div className="mono-tag mb-0.5 text-center text-[10px] uppercase tracking-widest text-muted-2 md:hidden">
          Dual-branch inference
        </div>
        <StageCard
          icon={Layers}
          title="ResNet-50"
          description="Local vascular texture, 224×224 input"
          accent="coral"
          compact
        />
        <StageCard
          icon={Layers}
          title="SWIN-B"
          description="Global structural context, 384×384 input"
          accent="teal"
          compact
        />
      </div>

      <Arrow />
      <StageCard icon={Combine} title="Weighted Ensemble" description="Softmax probabilities averaged 0.5 / 0.5" />
      <Arrow />
      <StageCard icon={Target} title="Classification" description="Physiological · ROP · Hemorrhage + Grad-CAM" />
    </div>
  );
}
