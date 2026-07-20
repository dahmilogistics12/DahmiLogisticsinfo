import { ShippersSection, PartnersSection, CommitmentSection, CtaBanner } from "@/components/Sections";
import { useLang } from "@/lib/i18n";

export default function Services() {
  const { t } = useLang();
  return (
    <main data-testid="services-page">
      <div className="hero-mist border-b">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">{t.nav.services}</h1>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">{t.shippers.subtitle}</p>
        </div>
      </div>
      <ShippersSection />
      <PartnersSection />
      <CommitmentSection />
      <div className="pt-16">
        <CtaBanner />
      </div>
    </main>
  );
}
