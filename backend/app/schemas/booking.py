from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime, date, time


class BookingBase(BaseModel):
    itinerary_id: str
    vendor_id: str
    booking_date: date
    start_time: time
    number_of_people: int = Field(1, ge=1)
    special_requests: Optional[str] = None


class BookingCreate(BookingBase):
    user_id: str


class BookingUpdate(BaseModel):
    status: Optional[str] = None
    special_requests: Optional[str] = None
    meeting_point_confirmed: Optional[bool] = None
    payment_status: Optional[str] = None


class Booking(BookingBase):
    id: str
    user_id: str
    total_amount: float
    status: str
    meeting_point_confirmed: bool
    payment_status: str
    created_at: datetime
    itinerary: Optional[dict] = None
    vendor: Optional[dict] = None
    user: Optional[dict] = None

    class Config:
        from_attributes = True


class BookingSlot(BaseModel):
    date: date
    available_slots: List[str]