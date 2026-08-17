import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/home/Hero";
import { ProblemStats } from "@/components/home/ProblemStats";
import { ArchitectureSection } from "@/components/home/ArchitectureSection";
import { ResultsSection } from "@/components/home/ResultsSection";
import { GradcamGallery } from "@/components/home/GradcamGallery";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ProblemStats />
        <ArchitectureSection />
        <ResultsSection />
        <GradcamGallery />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
