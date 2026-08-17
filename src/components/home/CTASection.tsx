import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="border-t border-border">
      <Container className="py-24">
        <Reveal>
          <div className="bg-noise card-surface relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-coral/15 blur-[100px]" />
            <h2 className="relative font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
              Upload a fundus image. Watch the ensemble decide.
            </h2>
            <p className="relative mx-auto mt-4 max-w-lg leading-relaxed text-muted">
              The live demo runs the real ResNet-50 + SWIN-B ensemble from the paper — not a
              simplified stand-in — with a Grad-CAM overlay on every prediction.
            </p>
            <div className="relative mt-8 flex justify-center">
              <Button href="/demo" size="lg">
                Try ROPscreen now <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
