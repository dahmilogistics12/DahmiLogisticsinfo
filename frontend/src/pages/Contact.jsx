import { Phone, Mail, Globe, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/ContactForm";
import { useLang, CONTACT_PHONE, CONTACT_PHONE_TEL, CONTACT_EMAIL, CONTACT_WEBSITE } from "@/lib/i18n";

export default function Contact() {
  const { t } = useLang();

  return (
    <main data-testid="contact-page">
      <div className="hero-mist border-b">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <span className="inline-flex items-center rounded-full border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--brand-orange-2))]">
            {t.contact.kicker}
          </span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {t.contact.title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">{t.contact.subtitle}</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <Card className="border">
              <CardContent className="p-6 sm:p-8">
                <ContactForm />
              </CardContent>
            </Card>
          </div>

          {/* Details */}
          <div className="lg:col-span-5">
            <Card className="border bg-[hsl(var(--brand-navy))] text-white" data-testid="contact-details">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-lg font-semibold sm:text-xl">{t.contact.details.title}</h2>
                <ul className="mt-6 space-y-5">
                  <li className="flex items-start gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--brand-orange))]">
                      <Phone className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-white/60">
                        {t.contact.details.phoneLabel}
                      </p>
                      <a
                        href={`tel:${CONTACT_PHONE_TEL}`}
                        data-testid="contact-details-phone"
                        className="text-sm font-semibold hover:text-[hsl(var(--brand-orange))] sm:text-base"
                      >
                        {CONTACT_PHONE}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--brand-orange))]">
                      <Mail className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-white/60">
                        {t.contact.details.emailLabel}
                      </p>
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        data-testid="contact-details-email"
                        className="break-all text-sm font-semibold hover:text-[hsl(var(--brand-orange))] sm:text-base"
                      >
                        {CONTACT_EMAIL}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--brand-orange))]">
                      <Globe className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-white/60">
                        {t.contact.details.websiteLabel}
                      </p>
                      <p className="text-sm font-semibold sm:text-base">{CONTACT_WEBSITE}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--brand-orange))]">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-white/60">
                        {t.contact.details.branchesLabel}
                      </p>
                      <p className="text-sm font-semibold sm:text-base">
                        {t.network.branches.join(" | ")}
                      </p>
                      <p className="mt-1 text-xs text-white/60">{t.network.satellite.join(" · ")}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--brand-orange))]">
                      <Clock className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-white/60">
                        {t.contact.details.hoursLabel}
                      </p>
                      <p className="text-sm font-semibold sm:text-base">{t.contact.details.hours}</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
