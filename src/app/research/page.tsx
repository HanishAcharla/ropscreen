import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ArticleSection } from "@/components/research/ArticleSection";
import { DataTable } from "@/components/research/DataTable";
import { CitationBlock } from "@/components/research/CitationBlock";
import { ArchitectureDiagram } from "@/components/home/ArchitectureDiagram";
import { ModelComparisonChart } from "@/components/home/ModelComparisonChart";
import { ConfusionMatrix } from "@/components/home/ConfusionMatrix";
import {
  paper,
  modelMetrics,
  ablation,
  confusionMatrices,
  datasetStats,
  gradcamExamples,
  references,
} from "@/lib/site-data";
import { FileText, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Research — ROPscreen",
  description: paper.title,
};

const toc = [
  { id: "abstract", label: "Abstract" },
  { id: "problem", label: "The problem" },
  { id: "dataset", label: "Dataset" },
  { id: "methodology", label: "Methodology" },
  { id: "results", label: "Results" },
  { id: "ablation", label: "Ablation" },
  { id: "interpretability", label: "Interpretability" },
  { id: "limitations", label: "Limitations" },
  { id: "references", label: "References" },
];

export default function ResearchPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="bg-noise border-b border-border">
          <Container className="py-16 sm:py-20">
            <Reveal>
              <p className="mono-tag text-xs uppercase tracking-widest text-coral-soft">{paper.venue}</p>
              <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                {paper.title}
              </h1>
              <p className="mt-4 text-sm text-muted">
                {paper.author} · {paper.affiliation}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={paper.pdfHref} size="md">
                  <FileText size={15} /> Download the PDF
                </Button>
                <Button href="/demo" variant="secondary" size="md">
                  Try the model <ArrowRight size={15} />
                </Button>
              </div>
            </Reveal>
          </Container>
        </section>

        <section className="border-b border-border-soft">
          <Container>
            <div className="scrollbar-none flex gap-6 overflow-x-auto py-4 text-sm">
              {toc.map((t) => (
                <a key={t.id} href={`#${t.id}`} className="shrink-0 text-muted hover:text-foreground">
                  {t.label}
                </a>
              ))}
            </div>
          </Container>
        </section>

        <Container className="py-4">
          <ArticleSection id="abstract" index="01" title="Abstract">
            <div className="card-surface rounded-2xl p-7 text-sm leading-relaxed text-muted">
              <p>
                Neonatal eye care faces significant challenges due to diseases like Retinopathy of
                Prematurity (ROP). Accurate and punctual detection of ROP is crucial for the
                preservation of infant eyesight, but traditional screening procedures rely on manual
                examination bottle-necked by the limited availability of trained specialists. This
                paper proposes an approach to infant retinal disease detection by leveraging
                Convolutional Neural Networks (CNN) &amp; Vision Transformers (ViT). Specifically, we
                utilize MobileNet-V2, a lightweight deep convolutional network architecture that
                prioritizes low computational cost, and ResNet-50, a widely adopted deep learning
                network that enables deeper architectures. In addition, we employ SWIN-B, a
                hierarchical vision transformer that uses self-attention-based shifted windows. We
                further develop an ensemble model where CNNs capture fine-grained vascular patterns
                that complement the global structural context extracted by ViTs. Our dataset is
                sourced from Nature Scientific and contained 6,004 images (224x224) across 13 classes
                which we condense to 3 to prioritize broad initial classification of ROP. Our hybrid
                ensemble SWIN-B and ResNet-50 model achieves an accuracy of 84% with a high degree of
                precision (81%) and recall (87%) that prove promising for initial screening
                procedures. The research findings of this study highlight the implications of deep
                learning ensemble CNN and ViT models in screening performance, while maintaining
                interoperability through class activation analysis.
              </p>
              <p className="mt-4 text-xs text-muted-2">
                <span className="font-medium text-foreground">Index Terms —</span> Retinopathy of
                Prematurity, Biomedical image analysis, ensemble learning, convolutional neural
                networks, vision transformers
              </p>
            </div>
          </ArticleSection>

          <ArticleSection
            id="problem"
            index="02"
            title="The problem"
            lead="Retinopathy of Prematurity is a vasoproliferative disorder affecting infants born before 37 weeks of pregnancy, in which abnormal growth of blood vessels can lead to retinal lesions. ROP remains the leading cause of infantile blindness worldwide."
          >
            <div className="grid gap-5 sm:grid-cols-3">
              <div className="card-surface rounded-2xl p-6">
                <div className="font-[family-name:var(--font-display)] text-2xl font-semibold">31.9%</div>
                <div className="mt-1.5 text-sm text-muted">Pooled prevalence of ROP in premature infants</div>
              </div>
              <div className="card-surface rounded-2xl p-6">
                <div className="font-[family-name:var(--font-display)] text-2xl font-semibold">7.5%</div>
                <div className="mt-1.5 text-sm text-muted">Pooled prevalence of severe ROP</div>
              </div>
              <div className="card-surface rounded-2xl p-6">
                <div className="font-[family-name:var(--font-display)] text-2xl font-semibold">Scarce</div>
                <div className="mt-1.5 text-sm text-muted">Trained specialists able to perform manual screening at scale</div>
              </div>
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
              Prior work spans handcrafted vascular tortuosity scoring (Wallace et al., 2007),
              CNN-based classifiers on skewed datasets (Wang et al., 2022; Chen et al., 2021), YOLO-based
              detectors trained on very small cohorts (Ramachandran et al., 2021), and hybrid
              CNN–transformer models evaluated on only two classes (Luo et al., 2024). Limitations
              across this body of work — dataset diversity, generalization, and feature representation —
              motivate a hybrid ensemble architecture that combines localized CNN feature extraction
              with the global contextual modeling of vision transformers.
            </p>
          </ArticleSection>

          <ArticleSection
            id="dataset"
            index="03"
            title="Dataset & preprocessing"
            lead={`Sourced from Nature Scientific Data's "Retinal Image Dataset of Infants and ROP" for its balance between dataset size and recency: ${datasetStats.totalImages.toLocaleString()} fundus images (${datasetStats.imageSize}) across ${datasetStats.originalClasses} original diagnosis classes, condensed to ${datasetStats.finalClasses} to prioritize broad initial ROP screening.`}
          >
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-2">Class distribution</p>
                <DataTable
                  columns={["Class", "Images", "Description"]}
                  rows={datasetStats.classes.map((c) => [c.name, c.count.toLocaleString(), c.description])}
                />
                <p className="mt-3 text-xs leading-relaxed text-muted-2">
                  Rare classes (Hamartomas, Optic nerve hypoplasia, Toxoplasma) were excluded to
                  improve class balance; all ROP sub-stages/zones were condensed into a single ROP
                  class. Split 70/15/15 at the patient level.
                </p>
              </div>
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-2">Train / val / test split</p>
                <DataTable
                  columns={["Split", "Raw", "After augmentation"]}
                  rows={[
                    ["Train", datasetStats.splits.raw.train.toLocaleString(), datasetStats.splits.afterAugmentation.train.toLocaleString()],
                    ["Validation", datasetStats.splits.raw.val.toLocaleString(), datasetStats.splits.afterAugmentation.val.toLocaleString()],
                    ["Test", datasetStats.splits.raw.test.toLocaleString(), datasetStats.splits.afterAugmentation.test.toLocaleString()],
                  ]}
                />
                <p className="mt-3 text-xs leading-relaxed text-muted-2">
                  Augmentation ({datasetStats.augmentations.join(", ")}) was applied to the training
                  split only, balancing each class to 2,500 images. Preprocessing —{" "}
                  {datasetStats.preprocessing.join(" + ")} — was applied to all splits.
                </p>
              </div>
            </div>
          </ArticleSection>

          <ArticleSection
            id="methodology"
            index="04"
            title="Methodology"
            lead="Each backbone is loaded with ImageNet-pretrained weights, frozen, and fine-tuned via a lightweight classification head — trading full fine-tuning for faster convergence and lower overfitting risk on a moderately sized medical imaging dataset."
          >
            <div className="overflow-x-auto pb-2">
              <div className="min-w-[720px]">
                <ArchitectureDiagram />
              </div>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border-soft bg-white/[0.02] p-5">
                <div className="text-sm font-medium text-foreground">MobileNet-V2</div>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">
                  Depthwise separable convolutions with inverted residuals — evaluated as a
                  low-compute baseline. Its low parameter count led to degraded performance (42%
                  accuracy), so it was excluded from the final ensemble.
                </p>
              </div>
              <div className="rounded-xl border border-border-soft bg-white/[0.02] p-5">
                <div className="text-sm font-medium text-foreground">ResNet-50</div>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">
                  50-layer residual network with bottleneck blocks. Strong at capturing local
                  vascular texture; used as the CNN half of the final ensemble and as the backbone
                  for Grad-CAM interpretability.
                </p>
              </div>
              <div className="rounded-xl border border-border-soft bg-white/[0.02] p-5">
                <div className="text-sm font-medium text-foreground">SWIN-B</div>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">
                  Hierarchical vision transformer using shifted-window self-attention for
                  linear-complexity global context modeling. Trained with progressive unfreezing —
                  classifier head, then last 2, 4, and 6 layers.
                </p>
              </div>
            </div>

            <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">
              Hyperparameters were tuned via grid search over learning rate ∈ {"{"}0.05, 0.01, 0.005,
              0.001, 0.0001, 0.00001, 0.000001{"}"} and epochs ∈ {"{"}10, 20, 30, 40, 50{"}"} for the
              CNNs (batch size 32, early stopping on validation loss), and epochs ∈ {"{"}5, 10, 15, 20
              {"}"} for SWIN-B given its higher parameter count. All experiments ran on a Google Colab
              A100 GPU with TensorFlow. The final ensemble averages ResNet-50 and SWIN-B softmax
              outputs with equal weight (0.5 / 0.5) — weighting toward either model degraded results.
            </p>
          </ArticleSection>

          <ArticleSection
            id="results"
            index="05"
            title="Results"
            lead="Macro-averaged accuracy, precision, recall and F1 on the held-out test set. The ensemble improves on every individual model across all four metrics."
          >
            <DataTable
              columns={["Model", "Accuracy", "Precision", "Recall", "F1"]}
              highlightLastRow
              rows={modelMetrics.map((m) => [
                m.model,
                `${Math.round(m.accuracy * 100)}%`,
                `${Math.round(m.precision * 100)}%`,
                `${Math.round(m.recall * 100)}%`,
                `${Math.round(m.f1 * 100)}%`,
              ])}
            />

            <div className="card-surface mt-8 rounded-2xl p-6 sm:p-7">
              <ModelComparisonChart />
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <ConfusionMatrix title="ResNet-50" labels={confusionMatrices.resnet50.labels} matrix={confusionMatrices.resnet50.matrix} />
              <ConfusionMatrix title="SWIN-B" labels={confusionMatrices.swinB.labels} matrix={confusionMatrices.swinB.matrix} />
              <ConfusionMatrix title="Ensemble" labels={confusionMatrices.ensemble.labels} matrix={confusionMatrices.ensemble.matrix} />
            </div>

            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
              ResNet-50 alone excels at ROP (83.0% correct) but misclassifies 46.3% of hemorrhage
              cases. SWIN-B narrows that gap (81.1% hemorrhage accuracy) through self-attention over
              broader structural regions. The ensemble combines both strengths: 91.2% of hemorrhage
              images and 92.0% of physiological images are classified correctly, with recall — the
              metric that matters most for screening, since a missed diseased case risks irreversible
              vision loss — reaching 87%.
            </p>
          </ArticleSection>

          <ArticleSection
            id="ablation"
            index="06"
            title="Ablation study"
            lead="Effect of preprocessing and augmentation, evaluated with a ResNet-50 backbone on test data."
          >
            <DataTable
              columns={["Setting", "Accuracy", "Precision", "Recall", "F1"]}
              rows={ablation.map((a) => [
                a.setting,
                `${Math.round(a.accuracy * 100)}%`,
                `${Math.round(a.precision * 100)}%`,
                `${Math.round(a.recall * 100)}%`,
                `${Math.round(a.f1 * 100)}%`,
              ])}
            />
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
              Augmentation drives the primary performance gains across every configuration. Heavy
              preprocessing (CLAHE + border removal) without augmentation performs worst of all
              (53% accuracy) — implying augmentation is essential for robust generalization, and that
              preprocessing alone can hurt if it isn&apos;t paired with enough training diversity.
            </p>
          </ArticleSection>

          <ArticleSection
            id="interpretability"
            index="07"
            title="Interpretability"
            lead="Grad-CAM (Gradient-weighted Class Activation Mapping) visualizes which regions of an image drove each ResNet-50 prediction — a check that the model relies on clinically meaningful features rather than background artifacts."
          >
            <div className="grid gap-5 sm:grid-cols-3">
              {gradcamExamples.map((ex) => (
                <div key={ex.key} className="card-surface overflow-hidden rounded-2xl">
                  <div className="grid grid-cols-2">
                    <div className="relative aspect-square border-r border-border">
                      <Image src={ex.original} alt={`${ex.label} original`} fill className="object-cover" sizes="240px" />
                    </div>
                    <div className="relative aspect-square">
                      <Image src={ex.heatmap} alt={`${ex.label} Grad-CAM`} fill className="object-cover" sizes="240px" />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-sm font-medium text-foreground">{ex.label}</div>
                    <p className="mt-1 text-xs leading-relaxed text-muted">{ex.insight}</p>
                  </div>
                </div>
              ))}
            </div>
          </ArticleSection>

          <ArticleSection id="limitations" index="08" title="Limitations & future work">
            <ul className="max-w-3xl space-y-3 text-sm leading-relaxed text-muted">
              <li className="flex gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-coral" />
                Rare disease classes (Hamartomas, Optic Nerve Hypoplasia, Toxoplasma) were excluded
                to improve class balance, which may limit generalization to those conditions.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-coral" />
                The model performs broad 3-class screening rather than fine-grained ROP stage
                classification (Stage 1–5, Zone I–III, plus disease).
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-coral" />
                Dataset sourced from a single collection — future work points toward multi-institutional
                datasets to combat regional camera/population overfitting, consistent with
                generalizability issues reported in prior ROP deep learning literature.
              </li>
            </ul>
          </ArticleSection>

          <ArticleSection id="references" index="09" title="References">
            <ol className="max-w-3xl space-y-3 text-xs leading-relaxed text-muted-2">
              {references.map((ref, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mono-tag shrink-0 text-muted-2">[{i + 1}]</span>
                  <span>{ref}</span>
                </li>
              ))}
            </ol>

            <div className="mt-10">
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-2">Cite this work</p>
              <CitationBlock />
            </div>
          </ArticleSection>
        </Container>
      </main>
      <Footer />
    </>
  );
}
