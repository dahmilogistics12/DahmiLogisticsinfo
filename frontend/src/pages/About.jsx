import { AboutSection, CommitmentSection, ValuePropsStrip, CtaBanner, StatsStrip } from "@/components/Sections";
import { useLang } from "@/lib/i18n";

export default function About() {
  const { t } = useLang();
  return (
    <main data-testid="about-page">
      <div className="hero-mist border-b">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">{t.nav.about}</h1>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">{t.about.body1}</p>
        </div>
      </div>
      <div className="py-10">
        <StatsStrip />
      </div>
      <AboutSection full />
      <CommitmentSection />
      <ValuePropsStrip />
      <div className="pt-16">
        <CtaBanner />
      </div>
    </main>
  );
}
