import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Send,
  Loader2,
  TrendingUp,
  Users,
  Wallet,
  MapPinned,
  Truck,
  Route,
  Handshake,
  Calculator,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TiltCard } from "@/components/TiltCard";
import { SectionHeader, fadeUp, CtaBanner } from "@/components/Sections";
import { useLang } from "@/lib/i18n";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const perkIcons = [TrendingUp, Users, Wallet, MapPinned];
const roleIcons = [Truck, Route, Handshake, Calculator];

const CareerForm = () => {
  const { t, lang } = useLang();
  const f = t.careers.form;

  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    position: "",
    experience: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const setField = (key, val) => {
    setValues((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: null }));
  };

  const validate = () => {
    const errs = {};
    if (!values.name || values.name.trim().length < 2) errs.name = f.errors.name;
    const phoneClean = values.phone.replace(/[\s\-()]/g, "");
    if (!/^\+?\d{7,15}$/.test(phoneClean)) errs.phone = f.errors.phone;
    if (values.email && values.email.trim() !== "") {
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email.trim())) errs.email = f.errors.email;
    }
    if (!values.position) errs.position = f.errors.position;
    if (!values.message || values.message.trim().length < 5) errs.message = f.errors.message;
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${API}/careers`, {
        name: values.name.trim(),
        phone: values.phone.trim(),
        email: values.email.trim() || null,
        position: values.position,
        experience: values.experience.trim() || null,
        message: values.message.trim(),
        language: lang,
      });
      toast.success(f.successTitle, { description: f.successDesc });
      setValues({ name: "", phone: "", email: "", position: "", experience: "", message: "" });
      setErrors({});
    } catch (err) {
      console.error("Career application failed", err);
      toast.error(f.errorTitle, { description: f.errorDesc });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" data-testid="career-form" noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="career-name">{f.name} *</Label>
          <Input
            id="career-name"
            data-testid="career-name-input"
            value={values.name}
            onChange={(e) => setField("name", e.target.value)}
            placeholder={f.namePlaceholder}
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && (
            <p className="text-xs text-destructive" data-testid="career-name-error">
              {errors.name}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="career-phone">{f.phone} *</Label>
          <Input
            id="career-phone"
            type="tel"
            data-testid="career-phone-input"
            value={values.phone}
            onChange={(e) => setField("phone", e.target.value)}
            placeholder={f.phonePlaceholder}
            className={errors.phone ? "border-destructive" : ""}
          />
          {errors.phone && (
            <p className="text-xs text-destructive" data-testid="career-phone-error">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="career-email">{f.email}</Label>
          <Input
            id="career-email"
            type="email"
            data-testid="career-email-input"
            value={values.email}
            onChange={(e) => setField("email", e.target.value)}
            placeholder={f.emailPlaceholder}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-xs text-destructive" data-testid="career-email-error">
              {errors.email}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label>{f.position} *</Label>
          <Select value={values.position} onValueChange={(v) => setField("position", v)}>
            <SelectTrigger
              data-testid="career-position-select"
              className={errors.position ? "border-destructive" : ""}
            >
              <SelectValue placeholder={f.positionPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {f.positionOptions.map((opt) => (
                <SelectItem
                  key={opt.value}
                  value={opt.value}
                  data-testid={`career-position-option-${opt.value}`}
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.position && (
            <p className="text-xs text-destructive" data-testid="career-position-error">
              {errors.position}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="career-experience">{f.experience}</Label>
        <Input
          id="career-experience"
          data-testid="career-experience-input"
          value={values.experience}
          onChange={(e) => setField("experience", e.target.value)}
          placeholder={f.experiencePlaceholder}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="career-message">{f.message} *</Label>
        <Textarea
          id="career-message"
          data-testid="career-message-textarea"
          rows={4}
          value={values.message}
          onChange={(e) => setField("message", e.target.value)}
          placeholder={f.messagePlaceholder}
          className={errors.message ? "border-destructive" : ""}
        />
        {errors.message && (
          <p className="text-xs text-destructive" data-testid="career-message-error">
            {errors.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={submitting}
        data-testid="career-submit-button"
        className="w-full gap-2 bg-[hsl(var(--brand-orange))] text-white hover:bg-[hsl(var(--brand-orange-2))] sm:w-auto sm:px-8"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {f.submitting}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            {f.submit}
          </>
        )}
      </Button>
    </form>
  );
};

export default function Careers() {
  const { t } = useLang();

  const scrollToForm = () => {
    const el = document.getElementById("career-apply");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main data-testid="careers-page">
      {/* Header */}
      <div className="hero-mist border-b">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <span className="inline-flex items-center rounded-full border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--brand-orange-2))]">
              {t.careers.kicker}
            </span>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              {t.careers.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
              {t.careers.subtitle}
            </p>
            <Button
              onClick={scrollToForm}
              data-testid="careers-apply-scroll-button"
              className="mt-6 gap-2 bg-[hsl(var(--brand-orange))] text-white hover:bg-[hsl(var(--brand-orange-2))]"
            >
              {t.careers.form.title}
              <Send className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Perks */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16" data-testid="careers-perks-section">
        <motion.div {...fadeUp}>
          <SectionHeader kicker={t.careers.kicker} title={t.careers.perksTitle} center />
        </motion.div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.careers.perks.map((perk, i) => {
            const Icon = perkIcons[i];
            return (
              <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
                <TiltCard max={9} className="h-full">
                  <Card className="h-full border bg-card transition-[box-shadow,border-color] duration-200 hover:border-[hsl(var(--brand-orange))]/40 hover:shadow-md">
                    <CardContent className="p-6">
                      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[hsl(var(--brand-sand))]">
                        <Icon className="h-5 w-5 text-[hsl(var(--brand-orange-2))]" strokeWidth={1.9} />
                      </span>
                      <h3 className="mt-4 text-base font-semibold">{perk.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{perk.desc}</p>
                    </CardContent>
                  </Card>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Roles */}
      <section className="bg-secondary/60 py-14 sm:py-16" data-testid="careers-roles-section">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div {...fadeUp}>
            <SectionHeader kicker={t.careers.kicker} title={t.careers.rolesTitle} center />
          </motion.div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {t.careers.roles.map((role, i) => {
              const Icon = roleIcons[i];
              return (
                <motion.div key={role.code} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.07 }}>
                  <Card
                    className="group h-full border bg-card transition-[box-shadow,border-color] duration-200 hover:border-[hsl(var(--brand-orange))]/40 hover:shadow-md"
                    data-testid={`career-role-card-${role.code}`}
                  >
                    <CardContent className="flex items-start gap-4 p-6">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--brand-navy))] text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 dark:bg-[hsl(var(--brand-orange))]">
                        <Icon className="h-6 w-6" strokeWidth={1.8} />
                      </span>
                      <div>
                        <h3 className="text-base font-semibold sm:text-lg">{role.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{role.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section id="career-apply" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <motion.div {...fadeUp} className="lg:col-span-5">
            <SectionHeader kicker={t.careers.kicker} title={t.careers.form.title} subtitle={t.careers.form.subtitle} />
          </motion.div>
          <motion.div {...fadeUp} className="lg:col-span-7">
            <Card className="border">
              <CardContent className="p-6 sm:p-8">
                <CareerForm />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
