import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/Container";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { AlertTriangle, Users, Eye } from "lucide-react";

const stats = [
  {
    icon: Eye,
    value: "31.9%",
    label: "Pooled prevalence of ROP",
    detail: "among infants born prematurely, across recent systematic analyses.",
  },
  {
    icon: AlertTriangle,
    value: "7.5%",
    label: "Pooled prevalence of severe ROP",
    detail: "cases that carry a real risk of permanent vision loss if missed.",
  },
  {
    icon: Users,
    value: "Bottlenecked",
    label: "Specialist-dependent screening",
    detail: "manual exams are labor intensive and hard to scale where trained ophthalmologists are scarce.",
  },
];

export function ProblemStats() {
  return (
    <section className="border-t border-border">
      <Container className="py-24">
        <Reveal>
          <SectionLabel>The problem</SectionLabel>
          <h2 className="mt-5 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
            ROP remains the leading preventable cause of infantile blindness.
          </h2>
          <p className="mt-4 max-w-2xl text-muted leading-relaxed">
            Retinopathy of Prematurity is a vasoproliferative disorder affecting infants born before
            37 weeks. Perinatal care has improved dramatically — but timely, accurate screening is
            still bottlenecked by the limited availability of trained specialists.
          </p>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-3">
          {stats.map((s) => (
            <StaggerItem key={s.label}>
              <div className="card-surface h-full rounded-2xl p-7 transition-colors hover:border-white/20">
                <s.icon size={20} className="text-coral" />
                <div className="mt-5 font-[family-name:var(--font-display)] text-3xl font-semibold">
                  {s.value}
                </div>
                <div className="mt-2 text-sm font-medium text-foreground">{s.label}</div>
                <div className="mt-1.5 text-sm leading-relaxed text-muted">{s.detail}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
