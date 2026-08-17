import { Container, SectionLabel } from "@/components/ui/Container";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { ModelComparisonChart } from "@/components/home/ModelComparisonChart";
import { ConfusionMatrix } from "@/components/home/ConfusionMatrix";
import { confusionMatrices, modelMetrics } from "@/lib/site-data";

const ensemble = modelMetrics.find((m) => m.isEnsemble)!;
const bestSingle = modelMetrics.find((m) => m.short === "SWIN-B")!;

const highlights = [
  { label: "Ensemble accuracy", value: `${Math.round(ensemble.accuracy * 100)}%`, sub: `vs ${Math.round(bestSingle.accuracy * 100)}% best single model` },
  { label: "Precision", value: `${Math.round(ensemble.precision * 100)}%` },
  { label: "Recall", value: `${Math.round(ensemble.recall * 100)}%`, sub: "critical for catching every diseased case" },
  { label: "F1 score", value: `${Math.round(ensemble.f1 * 100)}%` },
];

export function ResultsSection() {
  return (
    <section id="results" className="scroll-mt-24 border-t border-border">
      <Container className="py-24">
        <Reveal>
          <SectionLabel>Results</SectionLabel>
          <h2 className="mt-5 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
            The ensemble beats every model it&apos;s built from.
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            Macro-averaged across the test set. High recall matters most here — a missed ROP case
            can mean irreversible vision loss, while a false positive simply prompts a specialist
            follow-up.
          </p>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-4">
          {highlights.map((h) => (
            <StaggerItem key={h.label}>
              <div className="card-surface h-full rounded-2xl p-6">
                <div className="font-[family-name:var(--font-display)] text-3xl font-semibold text-gradient-coral">
                  {h.value}
                </div>
                <div className="mt-1.5 text-sm text-foreground">{h.label}</div>
                {h.sub && <div className="mt-1 text-xs text-muted-2">{h.sub}</div>}
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal delay={0.1} className="mt-8">
          <div className="card-surface rounded-2xl p-6 sm:p-8">
            <div className="mb-2 text-sm font-medium text-foreground">Accuracy · Precision · Recall · F1 by model</div>
            <ModelComparisonChart />
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-8">
          <div className="mb-5 text-sm font-medium text-foreground">Normalized confusion matrices</div>
          <div className="grid gap-5 md:grid-cols-3">
            <ConfusionMatrix title="ResNet-50" labels={confusionMatrices.resnet50.labels} matrix={confusionMatrices.resnet50.matrix} />
            <ConfusionMatrix title="SWIN-B" labels={confusionMatrices.swinB.labels} matrix={confusionMatrices.swinB.matrix} />
            <ConfusionMatrix title="ResNet-50 + SWIN-B (Ensemble)" labels={confusionMatrices.ensemble.labels} matrix={confusionMatrices.ensemble.matrix} />
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted-2">
            The ensemble raises hemorrhage recall from 53.7% (ResNet-50 alone) to 91.2%, and pushes
            physiological recall to 92% — CNNs can overlook the broader structural pattern
            associated with hemorrhages that the transformer&apos;s self-attention captures.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
