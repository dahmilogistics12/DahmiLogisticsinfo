import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Phone, Menu, Languages, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/Logo";
import { useLang, CONTACT_PHONE, CONTACT_PHONE_TEL } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";

const navItems = [
  { key: "home", path: "/" },
  { key: "about", path: "/about" },
  { key: "services", path: "/services" },
  { key: "fleet", path: "/fleet" },
  { key: "network", path: "/network" },
  { key: "careers", path: "/careers" },
  { key: "contact", path: "/contact" },
];

export const Navbar = () => {
  const { lang, toggleLang, t } = useLang();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header
      className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70"
      data-testid="navbar"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.key}
              to={item.path}
              data-testid={`nav-link-${item.key}`}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? "text-foreground" : "text-foreground/70 hover:text-foreground"
                }`
              }
            >
              {t.nav[item.key]}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            data-testid="theme-toggle"
            className="h-9 w-9"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleLang}
            data-testid="language-toggle"
            className="h-9 gap-1.5 px-3"
            aria-label="Switch language"
          >
            <Languages className="h-4 w-4" />
            <span className="text-xs font-semibold">{lang === "en" ? "हिन्दी" : "English"}</span>
          </Button>

          <a href={`tel:${CONTACT_PHONE_TEL}`} className="hidden sm:block" data-testid="navbar-call-button">
            <Button
              size="sm"
              className="h-9 gap-1.5 bg-[hsl(var(--brand-orange))] px-3 text-white hover:bg-[hsl(var(--brand-orange-2))]"
            >
              <Phone className="h-4 w-4" />
              <span className="text-xs font-semibold tracking-wide">{CONTACT_PHONE}</span>
            </Button>
          </a>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 lg:hidden"
                data-testid="navbar-mobile-menu-button"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="mt-6 flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    data-testid={`mobile-nav-link-${item.key}`}
                    className={`rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? "bg-muted text-foreground"
                        : "text-foreground/70 hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {t.nav[item.key]}
                  </Link>
                ))}
                <Separator className="my-3" />
                <a href={`tel:${CONTACT_PHONE_TEL}`} data-testid="mobile-call-button">
                  <Button className="w-full gap-2 bg-[hsl(var(--brand-orange))] text-white hover:bg-[hsl(var(--brand-orange-2))]">
                    <Phone className="h-4 w-4" />
                    {CONTACT_PHONE}
                  </Button>
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
