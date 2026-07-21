from fastapi import FastAPI, APIRouter, HTTPException, Form, File, UploadFile
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from starlette.concurrency import run_in_threadpool
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import base64
import logging
import requests
from html import escape as html_escape
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, field_validator
from typing import Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Dahmi Logistics API")

api_router = APIRouter(prefix="/api")

SERVICE_OPTIONS = ["FTL", "Part Load", "Express", "Vendor Partnership", "Other"]

# ---------- Email notifications (Resend) ----------
RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "")
NOTIFY_EMAIL = os.environ.get("NOTIFY_EMAIL", "dahmilogistics@gmail.com")
FROM_EMAIL = os.environ.get("FROM_EMAIL", "Dahmi Logistics <onboarding@resend.dev>")

RESUME_MAX_BYTES = 5 * 1024 * 1024
RESUME_ALLOWED_TYPES = {
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}
RESUME_ALLOWED_EXTENSIONS = (".pdf", ".doc", ".docx")


def _send_email_sync(subject: str, html: str, attachment: Optional[dict] = None) -> None:
    if not RESEND_API_KEY:
        logger.warning("RESEND_API_KEY not set — skipping email notification: %s", subject)
        return
    payload = {
        "from": FROM_EMAIL,
        "to": [NOTIFY_EMAIL],
        "subject": subject,
        "html": html,
    }
    if attachment:
        payload["attachments"] = [attachment]
    resp = requests.post(
        "https://api.resend.com/emails",
        headers={"Authorization": f"Bearer {RESEND_API_KEY}", "Content-Type": "application/json"},
        json=payload,
        timeout=15,
    )
    if resp.status_code >= 300:
        logger.error("Resend email failed (%s): %s", resp.status_code, resp.text[:500])


async def send_notification_email(subject: str, html: str, attachment: Optional[dict] = None) -> None:
    try:
        await run_in_threadpool(_send_email_sync, subject, html, attachment)
    except Exception:
        logger.exception("Failed to send notification email: %s", subject)


# ---------- Models ----------
class ContactSubmissionCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    phone: str = Field(..., min_length=7, max_length=20)
    email: Optional[str] = Field(default=None, max_length=120)
    service_interest: str = Field(..., max_length=50)
    message: str = Field(..., min_length=5, max_length=2000)
    language: Optional[str] = Field(default="en", max_length=5)

    @field_validator("name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 2:
            raise ValueError("Name must be at least 2 characters")
        return v

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        cleaned = re.sub(r"[\s\-()]", "", v.strip())
        if not re.fullmatch(r"\+?\d{7,15}", cleaned):
            raise ValueError("Enter a valid phone number (7-15 digits)")
        return cleaned

    @field_validator("email")
    @classmethod
    def validate_email(cls, v: Optional[str]) -> Optional[str]:
        if v is None or v.strip() == "":
            return None
        v = v.strip()
        if not re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", v):
            raise ValueError("Enter a valid email address")
        return v

    @field_validator("service_interest")
    @classmethod
    def validate_service(cls, v: str) -> str:
        v = v.strip()
        if v not in SERVICE_OPTIONS:
            raise ValueError(f"service_interest must be one of {SERVICE_OPTIONS}")
        return v

    @field_validator("message")
    @classmethod
    def validate_message(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 5:
            raise ValueError("Message must be at least 5 characters")
        return v


class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: Optional[str] = None
    service_interest: str
    message: str
    language: Optional[str] = "en"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Dahmi Logistics API", "status": "ok"}


@api_router.post("/contact", response_model=ContactSubmission)
async def create_contact_submission(payload: ContactSubmissionCreate):
    submission = ContactSubmission(**payload.model_dump())
    doc = submission.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.contact_submissions.insert_one(doc)

    html = f"""
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> {html_escape(submission.name)}</p>
    <p><strong>Phone:</strong> {html_escape(submission.phone)}</p>
    <p><strong>Email:</strong> {html_escape(submission.email) if submission.email else '-'}</p>
    <p><strong>Service Interest:</strong> {html_escape(submission.service_interest)}</p>
    <p><strong>Message:</strong><br>{html_escape(submission.message)}</p>
    <p><strong>Language:</strong> {html_escape(submission.language or '')}</p>
    <p style="color:#888;font-size:12px;">Submitted {submission.created_at.isoformat()}</p>
    """
    await send_notification_email(f"New Contact: {submission.name}", html)

    return submission


POSITION_OPTIONS = ["drivers", "operations", "sales", "accounts", "other"]


class CareerApplicationCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    phone: str = Field(..., min_length=7, max_length=20)
    email: Optional[str] = Field(default=None, max_length=120)
    position: str = Field(..., max_length=30)
    experience: Optional[str] = Field(default=None, max_length=100)
    message: str = Field(..., min_length=5, max_length=2000)
    language: Optional[str] = Field(default="en", max_length=5)

    @field_validator("name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 2:
            raise ValueError("Name must be at least 2 characters")
        return v

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        cleaned = re.sub(r"[\s\-()]", "", v.strip())
        if not re.fullmatch(r"\+?\d{7,15}", cleaned):
            raise ValueError("Enter a valid phone number (7-15 digits)")
        return cleaned

    @field_validator("email")
    @classmethod
    def validate_email(cls, v: Optional[str]) -> Optional[str]:
        if v is None or v.strip() == "":
            return None
        v = v.strip()
        if not re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", v):
            raise ValueError("Enter a valid email address")
        return v

    @field_validator("position")
    @classmethod
    def validate_position(cls, v: str) -> str:
        v = v.strip()
        if v not in POSITION_OPTIONS:
            raise ValueError(f"position must be one of {POSITION_OPTIONS}")
        return v

    @field_validator("message")
    @classmethod
    def validate_message(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 5:
            raise ValueError("Message must be at least 5 characters")
        return v


class CareerApplication(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: Optional[str] = None
    position: str
    experience: Optional[str] = None
    message: str
    language: Optional[str] = "en"
    resume_filename: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


async def _validate_resume(resume: Optional[UploadFile]) -> Optional[bytes]:
    if resume is None or not resume.filename:
        return None
    ext = os.path.splitext(resume.filename)[1].lower()
    if resume.content_type not in RESUME_ALLOWED_TYPES and ext not in RESUME_ALLOWED_EXTENSIONS:
        raise HTTPException(422, "Resume must be a PDF or Word document (.pdf, .doc, .docx)")
    content = await resume.read(RESUME_MAX_BYTES + 1)
    if len(content) > RESUME_MAX_BYTES:
        raise HTTPException(422, "Resume must be under 5MB")
    if not content:
        return None
    return content


@api_router.post("/careers", response_model=CareerApplication)
async def create_career_application(
    name: str = Form(...),
    phone: str = Form(...),
    email: Optional[str] = Form(None),
    position: str = Form(...),
    experience: Optional[str] = Form(None),
    message: str = Form(...),
    language: Optional[str] = Form("en"),
    resume: Optional[UploadFile] = File(None),
):
    payload = CareerApplicationCreate(
        name=name,
        phone=phone,
        email=email,
        position=position,
        experience=experience,
        message=message,
        language=language,
    )
    resume_bytes = await _validate_resume(resume)

    application = CareerApplication(
        **payload.model_dump(),
        resume_filename=resume.filename if resume_bytes else None,
    )
    doc = application.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.career_applications.insert_one(doc)

    html = f"""
    <h2>New Career Application</h2>
    <p><strong>Name:</strong> {html_escape(application.name)}</p>
    <p><strong>Phone:</strong> {html_escape(application.phone)}</p>
    <p><strong>Email:</strong> {html_escape(application.email) if application.email else '-'}</p>
    <p><strong>Position:</strong> {html_escape(application.position)}</p>
    <p><strong>Experience:</strong> {html_escape(application.experience) if application.experience else '-'}</p>
    <p><strong>Message:</strong><br>{html_escape(application.message)}</p>
    <p><strong>Language:</strong> {html_escape(application.language or '')}</p>
    <p><strong>Resume attached:</strong> {'Yes — ' + html_escape(application.resume_filename) if application.resume_filename else 'No'}</p>
    <p style="color:#888;font-size:12px;">Submitted {application.created_at.isoformat()}</p>
    """
    attachment = None
    if resume_bytes:
        attachment = {
            "filename": resume.filename,
            "content": base64.b64encode(resume_bytes).decode("ascii"),
        }
    await send_notification_email(f"New Career Application: {application.name} ({application.position})", html, attachment)

    return application


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=False,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
