import {
  Hero,
  StatsStrip,
  AboutSection,
  ShippersSection,
  CommitmentSection,
  PartnersSection,
  FleetSection,
  ValuePropsStrip,
  NetworkSection,
  CtaBanner,
} from "@/components/Sections";

export default function Home() {
  return (
    <main data-testid="home-page">
      <Hero />
      <StatsStrip />
      <AboutSection />
      <ShippersSection />
      <CommitmentSection />
      <PartnersSection />
      <FleetSection />
      <ValuePropsStrip />
      <NetworkSection />
      <CtaBanner />
    </main>
  );
}
