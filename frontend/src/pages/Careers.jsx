import { useRef, useState } from "react";
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
  Paperclip,
  X,
  Scale,
  Building2,
  MapPin,
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
const openingIcons = [TrendingUp, Truck, Calculator, Scale, Users];

const RESUME_MAX_BYTES = 5 * 1024 * 1024;
const RESUME_ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const RESUME_ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];

const CareerForm = () => {
  const { t, lang } = useLang();
  const f = t.careers.form;
  const fileInputRef = useRef(null);

  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    position: "",
    experience: "",
    message: "",
  });
  const [resume, setResume] = useState(null);
  // Honeypot — hidden from real users; only bots fill it.
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const setField = (key, val) => {
    setValues((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: null }));
  };

  const isResumeValid = (file) => {
    const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (!RESUME_ALLOWED_TYPES.includes(file.type) && !RESUME_ALLOWED_EXTENSIONS.includes(ext)) {
      return f.errors.resumeType;
    }
    if (file.size > RESUME_MAX_BYTES) {
      return f.errors.resumeSize;
    }
    return null;
  };

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const err = isResumeValid(file);
    if (err) {
      setErrors((prev) => ({ ...prev, resume: err }));
      e.target.value = "";
      return;
    }
    setErrors((prev) => ({ ...prev, resume: null }));
    setResume(file);
  };

  const clearResume = () => {
    setResume(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
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
    if (resume) {
      const resumeErr = isResumeValid(resume);
      if (resumeErr) errs.resume = resumeErr;
    }
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
      const formData = new FormData();
      formData.append("name", values.name.trim());
      formData.append("phone", values.phone.trim());
      if (values.email.trim()) formData.append("email", values.email.trim());
      formData.append("position", values.position);
      if (values.experience.trim()) formData.append("experience", values.experience.trim());
      formData.append("message", values.message.trim());
      formData.append("language", lang);
      formData.append("company_website", companyWebsite);
      if (resume) formData.append("resume", resume);

      await axios.post(`${API}/careers`, formData);
      toast.success(f.successTitle, { description: f.successDesc });
      setValues({ name: "", phone: "", email: "", position: "", experience: "", message: "" });
      clearResume();
      setCompanyWebsite("");
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
      {/* Honeypot field — visually hidden, off tab order, ignored by humans */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="career-company-website">Company Website</label>
        <input
          id="career-company-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={companyWebsite}
          onChange={(e) => setCompanyWebsite(e.target.value)}
        />
      </div>

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

      <div className="space-y-1.5">
        <Label htmlFor="career-resume">{f.resume}</Label>
        <input
          ref={fileInputRef}
          id="career-resume"
          type="file"
          data-testid="career-resume-input"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleResumeChange}
          className="hidden"
        />
        {resume ? (
          <div
            className={`flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm ${
              errors.resume ? "border-destructive" : ""
            }`}
          >
            <span className="flex min-w-0 items-center gap-2 text-foreground">
              <Paperclip className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="truncate">{resume.name}</span>
            </span>
            <button
              type="button"
              data-testid="career-resume-remove"
              onClick={clearResume}
              className="shrink-0 rounded p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label={f.resumeRemove}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            data-testid="career-resume-choose"
            onClick={() => fileInputRef.current?.click()}
            className={`flex w-full items-center gap-2 rounded-md border border-dashed px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-[hsl(var(--brand-orange))] hover:text-foreground ${
              errors.resume ? "border-destructive" : ""
            }`}
          >
            <Paperclip className="h-4 w-4 shrink-0" />
            {f.resumeChoose}
          </button>
        )}
        <p className="text-xs text-muted-foreground">{f.resumeHint}</p>
        {errors.resume && (
          <p className="text-xs text-destructive" data-testid="career-resume-error">
            {errors.resume}
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

      {/* Current opening: Branch Managers */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16" data-testid="careers-opening-section">
        <motion.div {...fadeUp}>
          <span className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--brand-orange-2))]">
            <Building2 className="h-3.5 w-3.5" />
            {t.careers.opening.badge}
          </span>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            {t.careers.opening.title}
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
            {t.careers.opening.intro}
          </p>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.careers.opening.responsibilities.map((r, i) => {
            const Icon = openingIcons[i];
            return (
              <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.06 }}>
                <Card className="h-full border bg-card">
                  <CardContent className="p-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--brand-sand))]">
                      <Icon className="h-5 w-5 text-[hsl(var(--brand-orange-2))]" strokeWidth={1.9} />
                    </span>
                    <h3 className="mt-3 text-sm font-semibold">{r.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div {...fadeUp} className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {t.careers.opening.branchesLabel}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {t.careers.opening.branches.map((b) => (
                <span
                  key={b}
                  data-testid={`careers-opening-branch-${b}`}
                  className="inline-flex items-center gap-1.5 rounded-full border bg-secondary/60 px-3 py-1.5 text-sm font-medium"
                >
                  <MapPin className="h-3.5 w-3.5 text-[hsl(var(--brand-orange-2))]" />
                  {b}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {t.careers.opening.idealCandidateLabel}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t.careers.opening.idealCandidate}
            </p>
          </div>
        </motion.div>

        <motion.div {...fadeUp} className="mt-8">
          <Button
            onClick={scrollToForm}
            data-testid="careers-opening-apply-button"
            className="gap-2 bg-[hsl(var(--brand-orange))] text-white hover:bg-[hsl(var(--brand-orange-2))]"
          >
            {t.careers.opening.cta}
            <Send className="h-4 w-4" />
          </Button>
        </motion.div>
      </section>

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
