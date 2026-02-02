from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime


class ItineraryStopBase(BaseModel):
    stop_order: int
    title: str
    description: Optional[str] = None
    location: Optional[str] = None
    address: Optional[str] = None
    stop_type: Optional[str] = None
    estimated_minutes: Optional[int] = None
    is_optional: bool = False


class ItineraryStopCreate(ItineraryStopBase):
    pass


class ItineraryStop(ItineraryStopBase):
    id: str
    itinerary_id: str
    created_at: Optional[datetime] = None

    class Config:
        arbitrary_types_allowed = True


class ItineraryBase(BaseModel):
    title: str
    description: str
    duration_minutes: int = Field(..., ge=30, le=240)
    category: str
    difficulty: Optional[str] = "easy"
    price_per_person: float = Field(..., ge=0)
    max_group_size: Optional[int] = 10
    meeting_point: Optional[str] = None
    meeting_address: str
    highlights: Optional[List[str]] = []
    inclusions: Optional[List[str]] = []
    exclusions: Optional[List[str]] = []
    what_to_bring: Optional[List[str]] = []
    safety_notes: Optional[List[str]] = []
    languages_available: Optional[List[str]] = ["English"]


class ItineraryCreate(ItineraryBase):
    pass


class ItineraryUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    price_per_person: Optional[float] = None
    is_active: Optional[bool] = None
    meeting_address: Optional[str] = None


class Itinerary(ItineraryBase):
    id: str
    vendor_id: str
    is_active: bool
    created_at: datetime
    stops: Optional[List[ItineraryStop]] = []
    vendor: Optional[Dict[str, Any]] = None

    class Config:
        arbitrary_types_allowed = True