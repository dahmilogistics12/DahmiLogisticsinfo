# plan.md — Dahmi Logistics Bilingual Website (React + FastAPI + MongoDB)

## 1) Objectives
- Deliver a professional bilingual (EN/HI) marketing website for Dahmi Logistics inspired by tcifreight.in structure.
- Provide **Contact Us form only** with MongoDB storage and a simple way for owner to view submissions.
- Ensure fast, responsive UX (mobile-first), clear navigation, and consistent branding.

## 2) Implementation Steps

### Phase 1 — Core Flow Build (No separate POC)
Core = contact form → FastAPI → MongoDB persistence → owner retrieval.
1. Backend foundations
   - Create FastAPI app with Mongo connection + env config.
   - Define `ContactSubmission` model + server-side validation.
   - Implement:
     - `POST /api/contact` (store: name, phone, email, service_interest, message, created_at, language)
     - `GET /api/contacts` (list latest first; basic paging params)
2. Frontend foundations
   - Create React app shell with Tailwind + shadcn/ui.
   - Build Contact section/page with validated form + success/error states.
   - Wire API calls (loading, retry, toasts).
3. Quick core verification
   - Manual E2E: submit form → confirm stored → confirm GET lists submission.

**User stories (Phase 1)**
1. As a visitor, I can open the Contact page and see phone/email/branches instantly.
2. As a visitor, I can submit a contact message and receive a clear success confirmation.
3. As a visitor, I see field-level errors when I submit invalid/empty data.
4. As the owner, I can fetch all contact submissions from an endpoint and review them.
5. As a visitor on mobile, the contact form is usable without layout issues.

### Phase 2 — V1 Website Development (Marketing site + bilingual)
1. Information architecture (react-router)
   - Routes (or section anchors): Home, About, Services, Fleet, Network, Partners, Contact.
   - Sticky navbar with language toggle + click-to-call CTA.
2. Bilingual system
   - Implement i18n via React Context + `translations/en.json` and `translations/hi.json`.
   - Language toggle persists (localStorage) and updates all copy.
3. Home page sections (reference tcifreight.in style)
   - Hero (strong headline + CTA to Contact)
   - About preview (Dahmi Logistics + tagline “On Time Every Time”)
   - “Why Dahmi” / commitment icon grid: Safety, Reliability, Transparency, Timely Delivery
   - Services cards:
     - For Shippers: timely deliveries, pan-India coverage, real-time visibility, best price assurance, dedicated support
     - Partners: regular loads, fast payments, transparent dealings, digital process, long-term partnerships
   - Fleet showcase: FTL, LCV, Open Body, Container, Trailer
   - Value props strip: Pan India Network, Wide Range of Vehicles, On Time Every Time, Safe & Secure, Strong Partnership
   - Network/Branches: branches + satellite branches (cards + mini India map graphic)
   - CTA banner: “Let’s Move Together — Connect | Collaborate | Grow”
   - Footer with full contact info
4. Visual design
   - Use design_agent output for typography, spacing, color system, components.
   - Use vision_expert_agent suggestions for logistics imagery and iconography.
5. SEO + basics
   - Proper titles/meta, OpenGraph, sitemap/robots minimal.

**User stories (Phase 2)**
1. As a visitor, I can understand Dahmi’s value proposition within 5 seconds on the hero.
2. As a visitor, I can switch to Hindi and the entire site copy updates consistently.
3. As a visitor, I can navigate to Services/Fleet/Network from the sticky navbar.
4. As a visitor, I can find branches and satellite branches quickly in the Network section.
5. As a visitor, I can contact Dahmi from any page via persistent phone CTA and Contact CTA.

**Phase 2 exit test**
- Run testing_agent_v3 for: navigation, language toggle, contact submission, responsive layout.

### Phase 3 — Owner Lead Viewing (lightweight)
1. Add a minimal Admin route/page (no login unless requested)
   - `/admin/contacts` showing table of submissions + search by phone/email + date sorting.
   - Optional: export CSV.
2. Harden API
   - Basic rate limiting for POST.
   - Simple API key header for GET/exports (owner-only).

**User stories (Phase 3)**
1. As the owner, I can open an admin page and view all contact leads in a table.
2. As the owner, I can search leads by phone/email to find a customer quickly.
3. As the owner, I can export leads to CSV for follow-ups.
4. As the owner, I can restrict lead viewing with an API key.
5. As a visitor, I’m protected from spam via rate limiting and validation.

**Phase 3 exit test**
- testing_agent_v3: submit lead → appears in admin list; export works; API key enforced.

### Phase 4 — Future Enhancements (on request)
- Quote request flow, shipment tracking UI, vendor registration.
- Rich SEO (blogs, schema.org), performance tuning, analytics.

## 3) Next Actions
- Run design_agent for a fresh logistics brand look (not strictly brochure colors).
- Run vision_expert_agent for imagery/icon guidelines.
- Implement Phase 1 backend + contact form first; verify Mongo persistence.
- Build Phase 2 full site sections + bilingual toggle; then run testing_agent_v3.

## 4) Success Criteria
- Contact form reliably stores leads in MongoDB and shows clear UX states (loading/success/error).
- Bilingual toggle translates all visible UI text (EN/HI) and persists preference.
- Site matches professional logistics marketing expectations (hero, why-us, services, fleet, network, CTA, footer).
- Responsive across mobile/tablet/desktop; no broken navigation.
- testing_agent_v3 passes end-to-end for core flows (toggle, navigation, contact submit).
---
## STATUS UPDATE (Phase 1 & 2 COMPLETE)
- Backend: POST /api/contact + GET /api/contacts implemented with full validation. Working.
- Frontend: Full bilingual (EN/HI) marketing site done — Home (all 10 sections), About, Services, Fleet, Network, Contact pages. Language toggle persists via localStorage (dahmi-lang).
- Testing: testing_agent_v3 iteration_1 — 100% pass (backend 14/14, frontend all features).
- Next (Phase 3, on user request): Admin leads page (/admin/contacts), CSV export, rate limiting, API key protection.
