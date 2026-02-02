"""
FastAPI dependencies for validation
"""

from fastapi import Depends, HTTPException, status, Request
from typing import Dict, Any, Optional
from backend.app.utils.validation import (
    validate_user_registration,
    validate_itinerary_creation,
    validate_booking_creation,
    validate_vendor_profile,
    validate_email_address,
    validate_password,
    sanitize_input,
    ValidationResult
)
from backend.app.schemas.user import UserLogin, UserCreate
from backend.app.schemas.itinerary import ItineraryCreate, ItineraryUpdate
from backend.app.schemas.booking import BookingCreate, BookingUpdate
from backend.app.schemas.vendor import VendorCreate, VendorUpdate


async def validate_user_registration_data(
        user_data: UserCreate
) -> Dict[str, Any]:
    """
    Dependency to validate user registration data
    """
    # Convert Pydantic model to dict
    data_dict = user_data.dict()

    # Sanitize input
    sanitized_data = sanitize_input(data_dict)

    # Validate
    validation = validate_user_registration(sanitized_data)

    if not validation.is_valid:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail={
                "message": "Validation failed",
                "errors": validation.errors,
                "cleaned_data": validation.cleaned_data
            }
        )

    return validation.cleaned_data


async def validate_user_login_data(
        login_data: UserLogin
) -> Dict[str, Any]:
    """
    Dependency to validate user login data
    """
    # Sanitize
    sanitized = sanitize_input(login_data.dict())

    # Validate email
    validation = ValidationResult()
    is_valid_email, cleaned_email = validate_email_address(
        sanitized.get("email"),
        "email",
        validation
    )

    # Validate password
    is_valid_password, _ = validate_password(
        sanitized.get("password"),
        "password",
        validation
    )

    if not validation.is_valid:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail={
                "message": "Login validation failed",
                "errors": validation.errors
            }
        )

    return {
        "email": cleaned_email,
        "password": sanitized.get("password")  # Password not cleaned
    }


async def validate_itinerary_data(
        itinerary_data: ItineraryCreate
) -> Dict[str, Any]:
    """
    Dependency to validate itinerary creation/update data
    """
    # Convert to dict and sanitize
    data_dict = itinerary_data.dict()
    sanitized_data = sanitize_input(data_dict)

    # Validate
    validation = validate_itinerary_creation(sanitized_data)

    if not validation.is_valid:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail={
                "message": "Itinerary validation failed",
                "errors": validation.errors,
                "cleaned_data": validation.cleaned_data
            }
        )

    return validation.cleaned_data


async def validate_booking_data(
        booking_data: BookingCreate
) -> Dict[str, Any]:
    """
    Dependency to validate booking creation data
    """
    # Convert to dict and sanitize
    data_dict = booking_data.dict()
    sanitized_data = sanitize_input(data_dict)

    # Validate
    validation = validate_booking_creation(sanitized_data)

    if not validation.is_valid:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail={
                "message": "Booking validation failed",
                "errors": validation.errors,
                "cleaned_data": validation.cleaned_data
            }
        )

    return validation.cleaned_data


async def validate_vendor_data(
        vendor_data: VendorCreate
) -> Dict[str, Any]:
    """
    Dependency to validate vendor profile data
    """
    # Convert to dict and sanitize
    data_dict = vendor_data.dict()
    sanitized_data = sanitize_input(data_dict)

    # Validate
    validation = validate_vendor_profile(sanitized_data)

    if not validation.is_valid:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail={
                "message": "Vendor profile validation failed",
                "errors": validation.errors,
                "cleaned_data": validation.cleaned_data
            }
        )

    return validation.cleaned_data


async def sanitize_request_body(request: Request) -> Dict[str, Any]:
    """
    Middleware-like dependency to sanitize all request bodies
    """
    body = await request.json()
    return sanitize_input(body)