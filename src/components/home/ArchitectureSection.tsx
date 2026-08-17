import { Container, SectionLabel } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ArchitectureDiagram } from "@/components/home/ArchitectureDiagram";

const methodNotes = [
  { label: "Transfer learning", detail: "ImageNet-pretrained backbones, frozen, fine-tuned classification head" },
  { label: "Augmentation", detail: "Rotation, flips, brightness/contrast, blur & noise — balanced to 2,500 img/class" },
  { label: "Hyperparameter search", detail: "LR ∈ {0.05 … 0.000001}, epochs ∈ {5…50}, early stopping on val loss" },
];

export function ArchitectureSection() {
  return (
    <section id="architecture" className="scroll-mt-24 border-t border-border">
      <Container className="py-24">
        <Reveal>
          <SectionLabel>How it works</SectionLabel>
          <h2 className="mt-5 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
            A CNN and a Vision Transformer, voting together.
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            CNNs like ResNet-50 excel at localized feature extraction — the fine-grained vascular
            patterns of the retina. Vision Transformers like SWIN-B use shifted-window self-attention
            to model broader structural context. Ensembling the two lets ROPscreen capture both.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-16 overflow-x-auto">
          <div className="min-w-[720px] md:min-w-0">
            <ArchitectureDiagram />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-16 grid gap-5 sm:grid-cols-3">
            {methodNotes.map((m) => (
              <div key={m.label} className="rounded-xl border border-border-soft bg-white/[0.02] p-5">
                <div className="text-sm font-medium text-foreground">{m.label}</div>
                <div className="mt-1.5 text-sm leading-relaxed text-muted">{m.detail}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
