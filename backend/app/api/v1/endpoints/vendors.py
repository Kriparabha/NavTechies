from fastapi import APIRouter, Depends, HTTPException, Query, status
from typing import List, Optional, Dict
from backend.app.schemas.vendor import VendorCreate, VendorUpdate, Vendor
from backend.app.services.vendor_service import VendorService
from backend.app.core.dependencies import get_current_user, get_current_vendor
from backend.app.core.validators import validate_vendor_data
from backend.app.utils.validation import sanitize_input, validate_uuid, ValidationResult

router = APIRouter()
vendor_service = VendorService()


@router.post("/", response_model=Vendor)
async def create_vendor(
        vendor_data: VendorCreate,
        validated_data: Dict = Depends(validate_vendor_data),
        current_user: dict = Depends(get_current_user)
):
    """
    Create vendor profile with validation
    """
    try:
        # Check if user already has a vendor profile
        existing_vendor = vendor_service.supabase.table("vendors") \
            .select("*") \
            .eq("user_id", current_user["id"]) \
            .execute()

        if existing_vendor.data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Vendor profile already exists"
            )

        # Add user ID to validated data
        validated_data["user_id"] = current_user["id"]
        validated_data["rating"] = 0.0
        validated_data["total_reviews"] = 0
        validated_data["verification_status"] = "pending"
        validated_data["is_available"] = True

        # Create vendor profile
        vendor = await vendor_service.create_vendor(validated_data)
        if not vendor:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to create vendor profile"
            )

        return sanitize_input(vendor)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create vendor profile: {str(e)}"
        )


@router.put("/{vendor_id}", response_model=Vendor)
async def update_vendor(
        vendor_id: str,
        vendor_data: VendorUpdate,
        current_user: dict = Depends(get_current_vendor)
):
    """
    Update vendor profile with validation
    """
    try:
        # Validate vendor ID
        validation_result = ValidationResult()
        is_valid, cleaned_id = validate_uuid(vendor_id, "vendor_id", validation_result)

        if not is_valid:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid vendor ID: {validation_result.errors[0]['message']}"
            )

        # Verify vendor owns this profile
        vendor = await vendor_service.get_vendor_by_id(cleaned_id)
        if not vendor:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Vendor not found"
            )

        if vendor.get("user_id") != current_user["id"]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to update this vendor profile"
            )

        # Sanitize and prepare update data
        update_dict = vendor_data.dict(exclude_unset=True)
        sanitized_update = sanitize_input(update_dict)

        # Validate specific fields if provided
        if "hourly_rate" in sanitized_update:
            from backend.app.utils.validation import validate_price
            rate_valid, cleaned_rate = validate_price(
                sanitized_update["hourly_rate"],
                "hourly_rate",
                min_price=100,
                max_price=5000
            )
            if not rate_valid:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Invalid hourly rate. Must be between ₹100 and ₹5,000"
                )
            sanitized_update["hourly_rate"] = cleaned_rate

        # Update vendor
        updated = await vendor_service.update_vendor(cleaned_id, sanitized_update)

        if not updated:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to update vendor profile"
            )

        return sanitize_input(updated)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update vendor profile: {str(e)}"
        )