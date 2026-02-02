from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class TransactionBase(BaseModel):
    booking_id: str
    amount: float
    currency: str = "INR"
    payment_method: Optional[str] = "razorpay"


class TransactionCreate(TransactionBase):
    pass


class TransactionUpdate(BaseModel):
    status: Optional[str] = None
    razorpay_payment_id: Optional[str] = None
    razorpay_signature: Optional[str] = None


class Transaction(TransactionBase):
    id: str
    status: str
    transaction_id: Optional[str] = None
    razorpay_order_id: Optional[str] = None
    razorpay_payment_id: Optional[str] = None
    razorpay_signature: Optional[str] = None
    created_at: datetime
    booking: Optional[dict] = None

    class Config:
        from_attributes = True