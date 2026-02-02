from fastapi import APIRouter, Depends, HTTPException, Query, status
from typing import List, Dict
from datetime import date
from backend.app.schemas.booking import BookingCreate, BookingUpdate, Booking
from backend.app.services.booking_service import BookingService
from backend.app.core.dependencies import get_current_user, get_current_vendor
from backend.app.core.validators import validate_booking_data
from backend.app.utils.validation import sanitize_input, validate_uuid, ValidationResult

router = APIRouter()
booking_service = BookingService()


@router.post("/", response_model=Booking)
async def create_booking(
        booking_data: BookingCreate,
        validated_data: Dict = Depends(validate_booking_data),
        current_user: dict = Depends(get_current_user)
):
    """
    Create a new booking with full validation
    """
    try:
        # Add user ID to validated data
        validated_data["user_id"] = current_user["id"]

        # Create booking
        booking = await booking_service.create_booking(validated_data)

        if not booking:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to create booking"
            )

        return sanitize_input(booking)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create booking: {str(e)}"
        )


@router.get("/my-bookings", response_model=List[Booking])
async def get_my_bookings(
        current_user: dict = Depends(get_current_user),
        limit: int = Query(20, le=100)
):
    """
    Get current user's bookings
    """
    try:
        bookings = await booking_service.get_user_bookings(
            current_user["id"],
            limit=limit
        )
        return [sanitize_input(booking) for booking in bookings]
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch bookings: {str(e)}"
        )


@router.get("/{booking_id}", response_model=Booking)
async def get_booking(
        booking_id: str,
        current_user: dict = Depends(get_current_user)
):
    """
    Get booking by ID with validation
    """
    try:
        # Validate booking ID
        validation_result = ValidationResult()
        is_valid, cleaned_id = validate_uuid(booking_id, "booking_id", validation_result)

        if not is_valid:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid booking ID: {validation_result.errors[0]['message']}"
            )

        booking = await booking_service.get_booking_by_id(cleaned_id)
        if not booking:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Booking not found"
            )

        # Check authorization
        if (booking["user_id"] != current_user["id"] and
                booking.get("vendor_id") != current_user.get("vendor_id")):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to view this booking"
            )

        return sanitize_input(booking)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch booking: {str(e)}"
        )


@router.put("/{booking_id}/status")
async def update_booking_status(
        booking_id: str,
        status: str,
        current_user: dict = Depends(get_current_vendor)
):
    """
    Update booking status with validation (vendor only)
    """
    try:
        # Validate booking ID
        validation_result = ValidationResult()
        is_valid_id, cleaned_id = validate_uuid(booking_id, "booking_id", validation_result)

        if not is_valid_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid booking ID: {validation_result.errors[0]['message']}"
            )

        # Validate status
        from backend.app.utils.validation import validate_availability_status
        is_valid_status, cleaned_status = validate_availability_status(
            status,
            "status"
        )

        if not is_valid_status:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid status. Must be one of: confirmed, cancelled, completed, rejected"
            )

        # Get vendor ID
        vendor_response = booking_service.supabase.table("vendors") \
            .select("id") \
            .eq("user_id", current_user["id"]) \
            .single() \
            .execute()

        if not vendor_response.data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Vendor profile not found"
            )

        vendor_id = vendor_response.data["id"]

        # Verify vendor owns this booking
        booking = await booking_service.get_booking_by_id(cleaned_id)
        if not booking:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Booking not found"
            )

        if booking.get("vendor_id") != vendor_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to update this booking"
            )

        # Update status
        success = await booking_service.update_booking_status(
            cleaned_id,
            cleaned_status,
            vendor_id
        )

        if not success:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to update booking status"
            )

        return {"message": "Booking status updated successfully"}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update booking status: {str(e)}"
        )