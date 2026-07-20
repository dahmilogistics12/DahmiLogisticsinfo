import { FleetSection, ValuePropsStrip, CtaBanner } from "@/components/Sections";
import { useLang } from "@/lib/i18n";

const FLEET_HERO_IMG =
  "https://images.unsplash.com/photo-1708526150183-5007b1f6833c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTF8MHwxfHNlYXJjaHw0fHxpbmRpYW4lMjBoaWdod2F5JTIwZnJlaWdodCUyMHRydWNrJTIwbG9naXN0aWNzfGVufDB8fHxibHVlfDE3ODQ1NDU0OTh8MA&ixlib=rb-4.1.0&q=85";

export default function Fleet() {
  const { t } = useLang();
  return (
    <main data-testid="fleet-page">
      <div className="relative overflow-hidden border-b">
        <img
          src={FLEET_HERO_IMG}
          alt={t.fleet.title}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-[hsl(var(--brand-navy))]/70" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 text-white sm:px-6 sm:py-20">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">{t.fleet.title}</h1>
          <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">{t.fleet.subtitle}</p>
        </div>
      </div>
      <FleetSection />
      <ValuePropsStrip />
      <div className="pt-16">
        <CtaBanner />
      </div>
    </main>
  );
}
