import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLang } from "@/lib/i18n";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const ContactForm = () => {
  const { t, lang } = useLang();
  const f = t.contact.form;

  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    service_interest: "",
    message: "",
  });
  // Honeypot — hidden from real users; only bots fill it.
  const [companyWebsite, setCompanyWebsite] = useState("");
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
    if (!values.service_interest) errs.service = f.errors.service;
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
      await axios.post(`${API}/contact`, {
        name: values.name.trim(),
        phone: values.phone.trim(),
        email: values.email.trim() || null,
        service_interest: values.service_interest,
        message: values.message.trim(),
        language: lang,
        company_website: companyWebsite,
      });
      toast.success(f.successTitle, { description: f.successDesc });
      setValues({ name: "", phone: "", email: "", service_interest: "", message: "" });
      setCompanyWebsite("");
      setErrors({});
    } catch (err) {
      console.error("Contact submission failed", err);
      toast.error(f.errorTitle, { description: f.errorDesc });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" data-testid="contact-form" noValidate>
      {/* Honeypot field — visually hidden, off tab order, ignored by humans */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-company-website">Company Website</label>
        <input
          id="contact-company-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={companyWebsite}
          onChange={(e) => setCompanyWebsite(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="contact-name">{f.name} *</Label>
          <Input
            id="contact-name"
            data-testid="contact-name-input"
            value={values.name}
            onChange={(e) => setField("name", e.target.value)}
            placeholder={f.namePlaceholder}
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && (
            <p className="text-xs text-destructive" data-testid="contact-name-error">
              {errors.name}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="contact-phone">{f.phone} *</Label>
          <Input
            id="contact-phone"
            type="tel"
            data-testid="contact-phone-input"
            value={values.phone}
            onChange={(e) => setField("phone", e.target.value)}
            placeholder={f.phonePlaceholder}
            className={errors.phone ? "border-destructive" : ""}
          />
          {errors.phone && (
            <p className="text-xs text-destructive" data-testid="contact-phone-error">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="contact-email">{f.email}</Label>
          <Input
            id="contact-email"
            type="email"
            data-testid="contact-email-input"
            value={values.email}
            onChange={(e) => setField("email", e.target.value)}
            placeholder={f.emailPlaceholder}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-xs text-destructive" data-testid="contact-email-error">
              {errors.email}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label>{f.service} *</Label>
          <Select
            value={values.service_interest}
            onValueChange={(v) => setField("service_interest", v)}
          >
            <SelectTrigger
              data-testid="contact-service-select"
              className={errors.service ? "border-destructive" : ""}
            >
              <SelectValue placeholder={f.servicePlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {f.serviceOptions.map((opt) => (
                <SelectItem
                  key={opt.value}
                  value={opt.value}
                  data-testid={`contact-service-option-${opt.value.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.service && (
            <p className="text-xs text-destructive" data-testid="contact-service-error">
              {errors.service}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="contact-message">{f.message} *</Label>
        <Textarea
          id="contact-message"
          data-testid="contact-message-textarea"
          rows={5}
          value={values.message}
          onChange={(e) => setField("message", e.target.value)}
          placeholder={f.messagePlaceholder}
          className={errors.message ? "border-destructive" : ""}
        />
        {errors.message && (
          <p className="text-xs text-destructive" data-testid="contact-message-error">
            {errors.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={submitting}
        data-testid="contact-submit-button"
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
