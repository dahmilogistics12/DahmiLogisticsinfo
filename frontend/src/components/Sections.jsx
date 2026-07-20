import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Phone,
  Clock,
  MapPinned,
  Radar,
  BadgePercent,
  Headset,
  ShieldCheck,
  CheckCircle2,
  ScanEye,
  Timer,
  Truck,
  Package,
  PackageOpen,
  Container,
  Caravan,
  Briefcase,
  Wallet,
  Handshake,
  Smartphone,
  TrendingUp,
  MapPin,
  ArrowRight,
  Network,
  ShieldPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/TiltCard";
import { useLang, CONTACT_PHONE_TEL } from "@/lib/i18n";

const HERO_IMG =
  "https://images.unsplash.com/photo-1530547429276-0b6e470c90b8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTF8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBoaWdod2F5JTIwZnJlaWdodCUyMHRydWNrJTIwbG9naXN0aWNzfGVufDB8fHxibHVlfDE3ODQ1NDU0OTh8MA&ixlib=rb-4.1.0&q=85";

export const fadeUp = {
  initial: { opacity: 0, y: 26, filter: "blur(6px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] },
};

export const SectionHeader = ({ kicker, title, subtitle, center = false }) => (
  <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
    <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--brand-orange-2))]">
      {kicker}
    </span>
    <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">{title}</h2>
    {subtitle && <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{subtitle}</p>}
  </div>
);

/* ---------------- HERO ---------------- */
export const Hero = () => {
  const { t } = useLang();
  return (
    <section className="hero-mist relative overflow-hidden">
      <div className="noise mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-12 lg:py-24">
        <motion.div
          className="lg:col-span-6"
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <motion.span
            className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-xs font-semibold sm:text-sm"
            data-testid="hero-badge"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Timer className="h-3.5 w-3.5 text-[hsl(var(--brand-orange-2))]" />
            {t.hero.badge}
          </motion.span>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            {t.hero.title1}
            <br />
            <motion.span
              className="inline-block text-[hsl(var(--brand-orange-2))]"
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            >
              {t.hero.title2}
            </motion.span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t.hero.subtitle}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link to="/contact" data-testid="hero-contact-button">
              <Button className="glow-anim h-11 w-full gap-2 bg-[hsl(var(--brand-orange))] px-7 text-white transition-[background-color,box-shadow] duration-200 hover:bg-[hsl(var(--brand-orange-2))] sm:w-auto">
                {t.common.contactUs}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href={`tel:${CONTACT_PHONE_TEL}`} data-testid="hero-call-button">
              <Button variant="outline" className="h-11 w-full gap-2 px-7 sm:w-auto">
                <Phone className="h-4 w-4" />
                {t.common.callNow}
              </Button>
            </a>
          </div>
        </motion.div>

        <motion.div
          className="lg:col-span-6"
          initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <TiltCard max={6} className="relative">
            <div className="relative overflow-hidden rounded-2xl border shadow-lg">
              <img
                src={HERO_IMG}
                alt={t.hero.imageAlt}
                className="h-72 w-full object-cover sm:h-96"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222,62%,18%)]/70 via-transparent to-transparent" />
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 400 300"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M-10 250 C 80 190, 160 260, 240 200 S 380 150, 420 90"
                  stroke="hsla(28,92%,55%,0.85)"
                  strokeWidth="2"
                  className="route-dash"
                />
                <circle cx="240" cy="200" r="5" fill="hsl(28,92%,55%)" />
                <circle cx="90" cy="212" r="4" fill="white" />
              </svg>
              <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-3" style={{ transform: "translateZ(30px)" }}>
                <div className="float-anim rounded-xl border bg-card/95 p-3 shadow-sm backdrop-blur">
                  <div className="flex items-center gap-2">
                    <Network className="h-4 w-4 text-[hsl(var(--brand-orange-2))]" />
                    <p className="text-xs font-semibold sm:text-sm">{t.hero.card1Title}</p>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground sm:text-xs">{t.hero.card1Sub}</p>
                </div>
                <div className="float-anim-delayed rounded-xl border bg-card/95 p-3 shadow-sm backdrop-blur">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[hsl(var(--brand-orange-2))]" />
                    <p className="text-xs font-semibold sm:text-sm">{t.hero.card2Title}</p>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground sm:text-xs">{t.hero.card2Sub}</p>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
};

/* ---------------- STATS ---------------- */
export const StatsStrip = () => {
  const { t } = useLang();
  const icons = [MapPinned, Truck, Headset, Network];
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4" data-testid="stats-strip">
        {t.stats.map((s, i) => {
          const Icon = icons[i];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <TiltCard max={10}>
                <Card className="border bg-card transition-[box-shadow,border-color] duration-200 hover:border-[hsl(var(--brand-orange))]/40 hover:shadow-md">
                  <CardContent className="flex items-center gap-4 p-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--brand-sand))]">
                      <Icon className="h-5 w-5 text-[hsl(var(--brand-orange-2))]" />
                    </span>
                    <div>
                      <p className="text-xl font-bold tracking-tight sm:text-2xl">{s.value}</p>
                      <p className="text-xs text-muted-foreground sm:text-sm">{s.label}</p>
                    </div>
                  </CardContent>
                </Card>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

/* ---------------- ABOUT ---------------- */
export const AboutSection = ({ full = false }) => {
  const { t } = useLang();
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20" data-testid="about-section">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <motion.div {...fadeUp}>
          <SectionHeader kicker={t.about.kicker} title={t.about.title} />
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">{t.about.body1}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{t.about.body2}</p>
          <ul className="mt-6 space-y-3">
            {t.about.points.map((p, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-2.5 text-sm sm:text-base"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--brand-orange-2))]" />
                {p}
              </motion.li>
            ))}
          </ul>
          {!full && (
            <Link to="/about" data-testid="about-learn-more" className="mt-7 inline-block">
              <Button variant="outline" className="gap-2">
                {t.common.learnMore}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </motion.div>
        <motion.div {...fadeUp}>
          <TiltCard max={5}>
            <div className="relative overflow-hidden rounded-2xl border shadow-md">
              <img
                src="https://images.pexels.com/photos/38107476/pexels-photo-38107476.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt={t.about.imageAlt}
                className="h-72 w-full object-cover sm:h-[420px]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[hsl(222,62%,18%)]/10" />
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
};

/* ---------------- FOR SHIPPERS ---------------- */
const shipperIcons = [Clock, MapPinned, Radar, BadgePercent, Headset];

export const ShippersSection = () => {
  const { t } = useLang();
  return (
    <section className="bg-secondary/60 py-16 sm:py-20" data-testid="for-shippers-section">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div {...fadeUp}>
          <SectionHeader kicker={t.shippers.kicker} title={t.shippers.title} subtitle={t.shippers.subtitle} center />
        </motion.div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.shippers.items.map((item, i) => {
            const Icon = shipperIcons[i];
            return (
              <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.07 }}>
                <Card className="group h-full border bg-card transition-[box-shadow,border-color] duration-200 hover:border-[hsl(var(--brand-orange))]/40 hover:shadow-md">
                  <CardContent className="p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[hsl(var(--brand-navy))] text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="h-5 w-5" strokeWidth={1.9} />
                    </span>
                    <h3 className="mt-4 text-base font-semibold sm:text-lg">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.35 }}>
            <Card className="flex h-full flex-col justify-center border-2 border-dashed border-[hsl(var(--brand-orange))]/50 bg-[hsl(var(--brand-sand))]/50">
              <CardContent className="p-6 text-center">
                <p className="text-sm font-medium text-muted-foreground">{t.common.getQuoteHint}</p>
                <Link to="/contact" data-testid="shippers-cta-button" className="mt-4 inline-block">
                  <Button className="gap-2 bg-[hsl(var(--brand-orange))] text-white hover:bg-[hsl(var(--brand-orange-2))]">
                    {t.common.contactUs}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ---------------- COMMITMENT ---------------- */
const commitmentIcons = [ShieldCheck, CheckCircle2, ScanEye, Timer];

export const CommitmentSection = () => {
  const { t } = useLang();
  return (
    <section
      className="bg-[hsl(222,62%,14%)] py-16 text-white sm:py-20"
      data-testid="our-commitment-section"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--brand-orange))]">
            {t.commitment.kicker}
          </span>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
            {t.commitment.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">{t.commitment.subtitle}</p>
        </motion.div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.commitment.pillars.map((p, i) => {
            const Icon = commitmentIcons[i];
            return (
              <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
                <TiltCard max={8} className="h-full">
                  <div className="h-full rounded-xl border border-white/10 bg-white/5 p-6 transition-[background-color,border-color] duration-200 hover:border-[hsl(var(--brand-orange))]/40 hover:bg-white/10">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[hsl(var(--brand-orange))] text-white">
                      <Icon className="h-5 w-5" strokeWidth={1.9} />
                    </span>
                    <h3 className="mt-4 text-base font-semibold sm:text-lg">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{p.desc}</p>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ---------------- PARTNERS ---------------- */
const partnerIcons = [Briefcase, Wallet, Handshake, Smartphone, TrendingUp];

export const PartnersSection = () => {
  const { t } = useLang();
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20" data-testid="for-partners-section">
      <motion.div {...fadeUp}>
        <SectionHeader kicker={t.partners.kicker} title={t.partners.title} subtitle={t.partners.subtitle} center />
      </motion.div>
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-12">
        <motion.div {...fadeUp} className="md:col-span-6 lg:col-span-5">
          <TiltCard max={5} className="h-full">
            <Card className="h-full border bg-[hsl(var(--brand-sand))]/60 transition-[box-shadow] duration-200 hover:shadow-md">
              <CardContent className="flex h-full flex-col justify-between p-7">
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[hsl(var(--brand-orange))] text-white">
                    <Briefcase className="h-6 w-6" strokeWidth={1.9} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold sm:text-xl">{t.partners.items[0].title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {t.partners.items[0].desc}
                  </p>
                </div>
                <Link to="/contact" data-testid="partners-cta-button" className="mt-6 inline-block">
                  <Button className="gap-2 bg-[hsl(var(--brand-navy))] text-white hover:bg-[hsl(var(--brand-navy-2))] dark:bg-[hsl(var(--brand-orange))] dark:hover:bg-[hsl(var(--brand-orange-2))]">
                    {t.partners.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TiltCard>
        </motion.div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-6 lg:col-span-7">
          {t.partners.items.slice(1).map((item, i) => {
            const Icon = partnerIcons[i + 1];
            return (
              <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.07 }}>
                <Card className="group h-full border bg-card transition-[box-shadow,border-color] duration-200 hover:border-[hsl(var(--brand-orange))]/40 hover:shadow-md">
                  <CardContent className="p-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--brand-sand))] transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5 text-[hsl(var(--brand-orange-2))]" strokeWidth={1.9} />
                    </span>
                    <h3 className="mt-3.5 text-base font-semibold">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ---------------- FLEET ---------------- */
const fleetIcons = [Truck, Package, PackageOpen, Container, Caravan];

export const FleetSection = () => {
  const { t } = useLang();
  return (
    <section className="bg-secondary/60 py-16 sm:py-20" data-testid="fleet-showcase">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div {...fadeUp}>
          <SectionHeader kicker={t.fleet.kicker} title={t.fleet.title} subtitle={t.fleet.subtitle} center />
        </motion.div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {t.fleet.items.map((item, i) => {
            const Icon = fleetIcons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, rotateY: -12 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
                style={{ transformPerspective: 900 }}
              >
                <TiltCard max={10} className="h-full">
                  <Card
                    className="group h-full overflow-hidden border bg-card transition-[box-shadow,border-color] duration-200 hover:border-[hsl(var(--brand-orange))]/50 hover:shadow-lg"
                    data-testid={`fleet-card-${item.code.toLowerCase()}`}
                  >
                    <div className="h-1.5 bg-[hsl(var(--brand-orange))] transition-[height] duration-300 group-hover:h-2.5" />
                    <CardContent className="p-5">
                      <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[hsl(var(--brand-navy))] text-white transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 dark:bg-[hsl(var(--brand-orange))]">
                        <Icon className="h-6 w-6" strokeWidth={1.8} />
                      </span>
                      <Badge variant="outline" className="mt-4 text-[10px] font-bold tracking-wider text-[hsl(var(--brand-orange-2))]">
                        {item.code}
                      </Badge>
                      <h3 className="mt-2 text-base font-semibold">{item.name}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ---------------- VALUE PROPS MARQUEE ---------------- */
const valueIcons = [Network, Truck, Timer, ShieldPlus, Handshake];

export const ValuePropsStrip = () => {
  const { t } = useLang();
  const items = t.valueProps;
  // Duplicate list for the seamless marquee loop
  const doubled = [...items, ...items];
  return (
    <section className="border-y bg-card py-6" data-testid="value-props-strip">
      <div className="marquee">
        <div className="marquee-track">
          {doubled.map((v, i) => {
            const Icon = valueIcons[i % items.length];
            return (
              <div key={i} className="flex shrink-0 items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--brand-sand))]">
                  <Icon className="text-[hsl(var(--brand-orange-2))]" size={18} strokeWidth={2} />
                </span>
                <p className="whitespace-nowrap text-sm font-semibold">{v}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ---------------- NETWORK ---------------- */
export const NetworkSection = () => {
  const { t } = useLang();
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20" data-testid="network-section">
      <motion.div {...fadeUp}>
        <SectionHeader kicker={t.network.kicker} title={t.network.title} subtitle={t.network.subtitle} center />
      </motion.div>
      <motion.div {...fadeUp} className="mt-10">
        <Card className="overflow-hidden border">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="border-b p-7 sm:p-9 lg:border-b-0 lg:border-r">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--brand-navy))] text-white dark:bg-[hsl(var(--brand-orange))]">
                    <MapPin size={18} />
                  </span>
                  <h3 className="text-lg font-semibold">{t.network.branchesLabel}</h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {t.network.branches.map((b, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: i * 0.08 }}
                    >
                      <Badge
                        data-testid={`branch-badge-${i}`}
                        className="rounded-full bg-[hsl(var(--brand-navy))] px-4 py-1.5 text-sm font-medium text-white hover:bg-[hsl(var(--brand-navy-2))] dark:bg-[hsl(var(--brand-orange))] dark:hover:bg-[hsl(var(--brand-orange-2))]"
                      >
                        {b}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--brand-navy))] dark:bg-[hsl(var(--brand-orange))]" />
                  {t.network.legendMain}
                </div>
              </div>
              <div className="p-7 sm:p-9">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--brand-orange))] text-white">
                    <Network size={18} />
                  </span>
                  <h3 className="text-lg font-semibold">{t.network.satelliteLabel}</h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {t.network.satellite.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: i * 0.07 }}
                    >
                      <Badge
                        variant="outline"
                        data-testid={`satellite-badge-${i}`}
                        className="rounded-full border-[hsl(var(--brand-orange))]/50 px-4 py-1.5 text-sm font-medium text-[hsl(var(--brand-orange-2))]"
                      >
                        {s}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="h-2.5 w-2.5 rounded-full border-2 border-[hsl(var(--brand-orange))]" />
                  {t.network.legendSatellite}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};

/* ---------------- CTA BANNER ---------------- */
export const CtaBanner = () => {
  const { t } = useLang();
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
      <motion.div
        {...fadeUp}
        className="cta-sand noise relative overflow-hidden rounded-2xl border p-8 text-center sm:p-14"
        data-testid="cta-banner"
      >
        <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl">{t.ctaBanner.title}</h2>
        <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-[hsl(var(--brand-orange-2))] sm:text-base">
          {t.ctaBanner.subtitle}
        </p>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground sm:text-base">{t.ctaBanner.body}</p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/contact" data-testid="cta-banner-contact-button">
            <Button className="h-11 gap-2 bg-[hsl(var(--brand-orange))] px-8 text-white hover:bg-[hsl(var(--brand-orange-2))]">
              {t.common.contactUs}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <a href={`tel:${CONTACT_PHONE_TEL}`} data-testid="cta-banner-call-button">
            <Button variant="outline" className="h-11 gap-2 px-8">
              <Phone className="h-4 w-4" />
              {t.common.callNow}
            </Button>
          </a>
        </div>
      </motion.div>
    </section>
  );
};
