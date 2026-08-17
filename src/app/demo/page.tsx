import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container, SectionLabel } from "@/components/ui/Container";
import { DemoPanel } from "@/components/demo/DemoPanel";

export const metadata: Metadata = {
  title: "Try the Model — ROPscreen",
  description: "Upload a neonatal fundus image and get a live prediction from the ResNet-50 + SWIN-B ensemble.",
};

export default function DemoPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="bg-noise border-b border-border">
          <Container className="py-16 sm:py-20">
            <SectionLabel>Live demo</SectionLabel>
            <h1 className="mt-5 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
              Run a fundus image through the real ensemble.
            </h1>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted">
              This calls the same ResNet-50 + SWIN-B ensemble evaluated in the paper — not a
              simplified stand-in. Predictions include a Grad-CAM overlay and a per-model
              breakdown of how each network voted.
            </p>
          </Container>
        </section>

        <Container className="py-14">
          <DemoPanel />
        </Container>
      </main>
      <Footer />
    </>
  );
}
