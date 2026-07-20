from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, field_validator
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Dahmi Logistics API")

api_router = APIRouter(prefix="/api")

SERVICE_OPTIONS = ["FTL", "Part Load", "Express", "Vendor Partnership", "Other"]


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
    return submission


@api_router.get("/contacts", response_model=List[ContactSubmission])
async def list_contact_submissions(
    limit: int = Query(default=100, ge=1, le=500),
    skip: int = Query(default=0, ge=0),
):
    docs = (
        await db.contact_submissions.find({}, {"_id": 0})
        .sort("created_at", -1)
        .skip(skip)
        .to_list(limit)
    )
    for d in docs:
        if isinstance(d.get("created_at"), str):
            d["created_at"] = datetime.fromisoformat(d["created_at"])
    return docs


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
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


@api_router.post("/careers", response_model=CareerApplication)
async def create_career_application(payload: CareerApplicationCreate):
    application = CareerApplication(**payload.model_dump())
    doc = application.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.career_applications.insert_one(doc)
    return application


@api_router.get("/careers", response_model=List[CareerApplication])
async def list_career_applications(
    limit: int = Query(default=100, ge=1, le=500),
    skip: int = Query(default=0, ge=0),
):
    docs = (
        await db.career_applications.find({}, {"_id": 0})
        .sort("created_at", -1)
        .skip(skip)
        .to_list(limit)
    )
    for d in docs:
        if isinstance(d.get("created_at"), str):
            d["created_at"] = datetime.fromisoformat(d["created_at"])
    return docs


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
