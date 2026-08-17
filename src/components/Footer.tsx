import Link from "next/link";
import { RetinaMark, GithubGlyph } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { paper } from "@/lib/site-data";
import { FileText } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <RetinaMark size={22} />
              <span className="font-[family-name:var(--font-display)] text-base font-semibold">
                ROP<span className="text-coral">screen</span>
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              A research prototype ensembling ResNet-50 and SWIN-B to screen neonatal fundus images for
              Retinopathy of Prematurity. Built by {paper.author}, {paper.affiliation}.
            </p>
          </div>

          <div>
            <p className="mono-tag text-xs uppercase tracking-widest text-muted-2">Explore</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/#architecture" className="text-muted hover:text-foreground">Architecture</Link></li>
              <li><Link href="/#results" className="text-muted hover:text-foreground">Results</Link></li>
              <li><Link href="/research" className="text-muted hover:text-foreground">Full research writeup</Link></li>
              <li><Link href="/demo" className="text-muted hover:text-foreground">Try the model</Link></li>
            </ul>
          </div>

          <div>
            <p className="mono-tag text-xs uppercase tracking-widest text-muted-2">Links</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href={paper.pdfHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-foreground">
                  <FileText size={14} /> Read the paper
                </a>
              </li>
              <li>
                <a href="https://github.com/HanishAcharla" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-foreground">
                  <GithubGlyph size={14} /> GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {paper.author}. Research prototype — not a certified diagnostic device.</p>
          <p className="mono-tag">ResNet-50 + SWIN-B · 84% ensemble accuracy · 6,004 fundus images</p>
        </div>
      </Container>
    </footer>
  );
}
