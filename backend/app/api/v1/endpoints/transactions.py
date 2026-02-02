from fastapi import APIRouter, Depends, HTTPException, status
from typing import Optional
from backend.app.services.payment_service import PaymentService
from backend.app.core.dependencies import get_current_user
from backend.app.schemas.transaction import Transaction, TransactionCreate

router = APIRouter()
payment_service = PaymentService()


@router.post("/create-order")
async def create_payment_order(
        amount: float,
        booking_id: str,
        currency: str = "INR",
        current_user: dict = Depends(get_current_user)
):
    """Create Razorpay order for payment"""
    try:
        # Create order
        order = payment_service.create_order(
            amount=amount,
            currency=currency,
            receipt=f"booking_{booking_id}"
        )

        if not order:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to create payment order"
            )

        return {
            "order_id": order["id"],
            "amount": order["amount"],
            "currency": order["currency"],
            "key": payment_service.client.auth[0]  # Razorpay key ID
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.post("/verify")
async def verify_payment(
        razorpay_order_id: str,
        razorpay_payment_id: str,
        razorpay_signature: str,
        booking_id: str,
        current_user: dict = Depends(get_current_user)
):
    """Verify Razorpay payment"""
    try:
        # Verify signature
        is_valid = payment_service.verify_payment_signature(
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        )

        if not is_valid:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid payment signature"
            )

        # Get order details
        order = payment_service.get_order(razorpay_order_id)

        if not order:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Order not found"
            )

        # Update booking payment status (simplified)
        # In production, you'd update the transactions table

        return {
            "success": True,
            "message": "Payment verified successfully",
            "order_id": razorpay_order_id,
            "payment_id": razorpay_payment_id,
            "amount": order["amount"] / 100  # Convert from paise
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.get("/{transaction_id}", response_model=Transaction)
async def get_transaction(
        transaction_id: str,
        current_user: dict = Depends(get_current_user)
):
    """Get transaction by ID"""
    # This is a simplified version
    # In production, you'd fetch from transactions table
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Transaction retrieval not implemented"
    )