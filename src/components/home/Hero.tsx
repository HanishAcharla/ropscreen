"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HeroVisual } from "@/components/home/HeroVisual";
import { ArrowRight, Sparkles } from "lucide-react";

const chips = [
  { value: "84%", label: "ensemble accuracy" },
  { value: "6,004", label: "fundus images" },
  { value: "3", label: "screening classes" },
];

export function Hero() {
  return (
    <section className="bg-noise relative overflow-hidden pt-16 pb-20 sm:pt-20 sm:pb-28">
      <Container className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mono-tag inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3.5 py-1.5 text-xs uppercase tracking-widest text-coral-soft"
          >
            <Sparkles size={12} />
            IEEE COMPSAC · CNN + Vision Transformer ensemble
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-[family-name:var(--font-display)] text-[2.6rem] font-semibold leading-[1.08] tracking-tight sm:text-6xl"
          >
            Screening for
            <span className="block">
              <span className="text-gradient-coral">Retinopathy of Prematurity</span>
            </span>
            before it costs a child their sight.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            ROPscreen ensembles a <span className="text-foreground">ResNet-50</span> convolutional
            network with a <span className="text-foreground">SWIN-B vision transformer</span> to
            classify neonatal fundus images — combining local vascular detail with global structural
            context, with Grad-CAM interpretability built in.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button href="/demo" size="lg">
              Try the model live <ArrowRight size={16} />
            </Button>
            <Button href="/research" variant="secondary" size="lg">
              Read the research
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-12 flex flex-wrap gap-x-10 gap-y-4"
          >
            {chips.map((c) => (
              <div key={c.label}>
                <div className="font-[family-name:var(--font-display)] text-3xl font-semibold text-foreground">
                  {c.value}
                </div>
                <div className="mt-0.5 text-sm text-muted">{c.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroVisual />
        </motion.div>
      </Container>
    </section>
  );
}
