# Dahmi Logistics — Website

Bilingual (EN/HI) marketing site for Dahmi Logistics — a road transport and logistics
company operating across India. React frontend, FastAPI backend, MongoDB storage.

## Stack

- **Frontend**: React (Create React App + craco), Tailwind CSS, shadcn/ui, framer-motion
- **Backend**: FastAPI, Motor (async MongoDB driver), Resend (email notifications)
- **Database**: MongoDB

## Project structure

```
backend/     FastAPI app (server.py), .env.example for config reference
frontend/    React app (src/pages, src/components, src/lib/i18n.jsx for translations)
```

## Local development

**Backend**
```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows; use `source venv/bin/activate` on macOS/Linux
pip install -r requirements.txt
cp .env.example .env         # then fill in real values
uvicorn server:app --reload --port 8000
```

**Frontend**
```bash
cd frontend
yarn install
yarn start                   # runs on http://localhost:3000
```

The frontend expects `REACT_APP_BACKEND_URL` in `frontend/.env` to point at the backend
(e.g. `http://localhost:8000` locally).

## Environment variables

See [backend/.env.example](backend/.env.example) for the full list (Mongo connection,
CORS/allowed-hosts, rate limits, Resend email config) with inline explanations.

## Features

- Contact and Careers forms, validated client- and server-side
- Careers form accepts a resume upload (PDF/DOC/DOCX, 5MB limit, validated by file
  signature, not just extension)
- Both forms email submissions via Resend and rate-limit + honeypot-guard against spam
- Interactive India network map showing branch/satellite locations
- Full English/Hindi translation coverage

## Security

Rate limiting, spam honeypots, CORS/host allowlisting, security headers, and file-upload
validation are implemented in `backend/server.py`. Production-only hardening (API docs
disabled, HSTS, TrustedHost) activates automatically when `ENVIRONMENT=production`.
