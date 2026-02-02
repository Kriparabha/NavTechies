from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class VendorBase(BaseModel):
    business_name: str
    description: Optional[str] = None
    expertise: Optional[List[str]] = []
    languages: Optional[List[str]] = []
    experience_years: Optional[int] = 0
    hourly_rate: Optional[float] = 0.0
    verification_status: Optional[str] = "pending"


class VendorCreate(VendorBase):
    user_id: Optional[str] = None


class VendorUpdate(BaseModel):
    business_name: Optional[str] = None
    description: Optional[str] = None
    expertise: Optional[List[str]] = None
    hourly_rate: Optional[float] = None
    is_available: Optional[bool] = None
    verification_status: Optional[str] = None


class Vendor(VendorBase):
    id: str
    user_id: Optional[str]
    rating: float = Field(..., ge=0, le=5)
    total_reviews: int
    is_available: bool
    documents: Optional[dict] = None
    created_at: datetime
    user: Optional[dict] = None

    class Config:
        from_attributes = True


class VendorWithStats(Vendor):
    total_bookings: int = 0
    total_revenue: float = 0.0
    completion_rate: float = 0.0