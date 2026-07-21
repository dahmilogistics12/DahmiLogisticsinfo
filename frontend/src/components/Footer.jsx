import { Link } from "react-router-dom";
import { Phone, Mail, Globe, MapPin, Truck } from "lucide-react";
import { useLang, CONTACT_PHONE, CONTACT_PHONE_TEL, CONTACT_EMAIL, CONTACT_WEBSITE } from "@/lib/i18n";

export const Footer = () => {
  const { t } = useLang();

  const quickLinks = [
    { key: "home", path: "/" },
    { key: "about", path: "/about" },
    { key: "services", path: "/services" },
    { key: "fleet", path: "/fleet" },
    { key: "network", path: "/network" },
    { key: "careers", path: "/careers" },
    { key: "contact", path: "/contact" },
  ];

  return (
    <footer
      className="bg-[hsl(var(--brand-navy))] text-white"
      data-testid="site-footer"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--brand-orange))] text-white">
                <Truck className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="leading-none">
                <span className="block text-[17px] font-bold tracking-tight">DAHMI</span>
                <span className="block text-[10px] font-semibold tracking-[0.28em] text-[hsl(var(--brand-orange))]">
                  LOGISTICS
                </span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/70">{t.footer.blurb}</p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              {t.footer.quickLinks}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.key}>
                  <Link
                    to={l.path}
                    data-testid={`footer-link-${l.key}`}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {t.nav[l.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              {t.footer.services}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {t.footer.servicesList.map((s, i) => (
                <li key={i} className="text-sm text-white/70">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              {t.footer.contact}
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`tel:${CONTACT_PHONE_TEL}`}
                  data-testid="footer-phone"
                  className="flex items-center gap-2.5 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 text-[hsl(var(--brand-orange))]" />
                  {CONTACT_PHONE}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  data-testid="footer-email"
                  className="flex items-center gap-2.5 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 text-[hsl(var(--brand-orange))]" />
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/70">
                <Globe className="h-4 w-4 text-[hsl(var(--brand-orange))]" />
                {CONTACT_WEBSITE}
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--brand-orange))]" />
                <span>23/4, Bikramgarh, Kolkata, 700032</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-center text-sm font-medium text-[hsl(var(--brand-orange))]">
            {t.footer.tagline}
          </p>
          <p className="mt-2 text-center text-xs text-white/50">
            © {new Date().getFullYear()} Dahmi Logistics. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};
