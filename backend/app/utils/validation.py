"""
Validation utilities for Guwahati Heritage Experiences
Handles data validation, sanitization, and business logic validation
"""

import re
import uuid
from typing import Dict, List, Any, Optional, Tuple, Union
from datetime import datetime, date, time, timedelta
from email_validator import validate_email, EmailNotValidError
import phonenumbers
from phonenumbers import NumberParseException
from backend.app.utils.geolocation import validate_coordinates, is_within_guwahati


class ValidationError(Exception):
    """Custom validation error with field details"""

    def __init__(self, field: str, message: str, value: Any = None):
        self.field = field
        self.message = message
        self.value = value
        super().__init__(f"{field}: {message}")


class ValidationResult:
    """Result of validation with errors and cleaned data"""

    def __init__(self):
        self.is_valid = True
        self.errors: List[Dict[str, Any]] = []
        self.cleaned_data: Dict[str, Any] = {}

    def add_error(self, field: str, message: str, value: Any = None):
        """Add validation error"""
        self.is_valid = False
        self.errors.append({
            "field": field,
            "message": message,
            "value": value
        })

    def add_cleaned(self, field: str, value: Any):
        """Add cleaned data"""
        self.cleaned_data[field] = value

    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary format"""
        return {
            "is_valid": self.is_valid,
            "errors": self.errors if self.errors else None,
            "cleaned_data": self.cleaned_data
        }


# Regular expressions for validation
PHONE_REGEX = r'^\+?[1-9]\d{1,14}$'  # E.164 format
INDIAN_PHONE_REGEX = r'^(\+91[\-\s]?)?[6789]\d{9}$'
PINCODE_REGEX = r'^[1-9][0-9]{5}$'
NAME_REGEX = r'^[A-Za-z\s\.\'\-]+$'
USERNAME_REGEX = r'^[a-zA-Z0-9_\.\-]+$'
URL_REGEX = r'^https?://(?:[-\w.]|(?:%[\da-fA-F]{2}))+'
PRICE_REGEX = r'^\d+(\.\d{1,2})?$'
TIME_24H_REGEX = r'^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$'
DATE_REGEX = r'^\d{4}-\d{2}-\d{2}$'


def validate_required(value: Any, field: str, result: ValidationResult) -> bool:
    """Validate that field is not empty/null"""
    if value is None or (isinstance(value, str) and not value.strip()):
        result.add_error(field, "This field is required", value)
        return False
    return True


def validate_email_address(email: str, field: str = "email", result: Optional[ValidationResult] = None) -> Tuple[
    bool, Optional[str]]:
    """
    Validate email address format and domain

    Args:
        email: Email address to validate
        field: Field name for errors
        result: Optional ValidationResult to add errors to

    Returns:
        Tuple of (is_valid, normalized_email)
    """
    if not email or not isinstance(email, str):
        if result:
            result.add_error(field, "Email is required", email)
        return False, None

    email = email.strip().lower()

    try:
        # Validate email
        email_info = validate_email(email, check_deliverability=False)
        normalized_email = email_info.normalized

        # Additional business logic
        if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email):
            if result:
                result.add_error(field, "Invalid email format", email)
            return False, None

        # Check for disposable/temporary emails (basic check)
        disposable_domains = [
            'tempmail.com', 'guerrillamail.com', 'mailinator.com',
            '10minutemail.com', 'throwawaymail.com', 'yopmail.com'
        ]

        domain = email.split('@')[1]
        if any(disposable in domain for disposable in disposable_domains):
            if result:
                result.add_error(field, "Temporary email addresses are not allowed", email)
            return False, None

        return True, normalized_email

    except EmailNotValidError as e:
        if result:
            result.add_error(field, str(e), email)
        return False, None
    except Exception:
        if result:
            result.add_error(field, "Invalid email address", email)
        return False, None


def validate_phone_number(phone: str, field: str = "phone", country: str = "IN",
                          result: Optional[ValidationResult] = None) -> Tuple[bool, Optional[str]]:
    """
    Validate phone number format

    Args:
        phone: Phone number to validate
        field: Field name for errors
        country: Country code (default: IN for India)
        result: Optional ValidationResult to add errors to

    Returns:
        Tuple of (is_valid, formatted_phone)
    """
    if not phone:
        if result:
            result.add_error(field, "Phone number is required", phone)
        return False, None

    phone = str(phone).strip()

    try:
        # Parse phone number
        parsed = phonenumbers.parse(phone, country)

        if not phonenumbers.is_valid_number(parsed):
            if result:
                result.add_error(field, "Invalid phone number", phone)
            return False, None

        # Format in E.164 format
        formatted = phonenumbers.format_number(parsed, phonenumbers.PhoneNumberFormat.E164)

        # Additional validation for Indian numbers
        if country.upper() == "IN":
            if not re.match(INDIAN_PHONE_REGEX, phone.replace("+91", "").replace(" ", "").replace("-", "")):
                if result:
                    result.add_error(field, "Invalid Indian phone number format", phone)
                return False, None

        return True, formatted

    except NumberParseException as e:
        if result:
            result.add_error(field, f"Invalid phone number format: {str(e)}", phone)
        return False, None
    except Exception:
        if result:
            result.add_error(field, "Invalid phone number", phone)
        return False, None


def validate_name(name: str, field: str = "name", min_length: int = 2, max_length: int = 100,
                  result: Optional[ValidationResult] = None) -> Tuple[bool, Optional[str]]:
    """
    Validate person or business name

    Args:
        name: Name to validate
        field: Field name for errors
        min_length: Minimum length
        max_length: Maximum length
        result: Optional ValidationResult to add errors to

    Returns:
        Tuple of (is_valid, cleaned_name)
    """
    if not name:
        if result:
            result.add_error(field, "Name is required", name)
        return False, None

    name = str(name).strip()

    # Length validation
    if len(name) < min_length:
        if result:
            result.add_error(field, f"Name must be at least {min_length} characters", name)
        return False, None

    if len(name) > max_length:
        if result:
            result.add_error(field, f"Name must be at most {max_length} characters", name)
        return False, None

    # Format validation
    if not re.match(NAME_REGEX, name):
        if result:
            result.add_error(field, "Name can only contain letters, spaces, dots, hyphens and apostrophes", name)
        return False, None

    # Check for inappropriate content (basic)
    inappropriate_words = ["admin", "root", "system", "null", "undefined"]
    if name.lower() in inappropriate_words:
        if result:
            result.add_error(field, "Name contains inappropriate content", name)
        return False, None

    # Capitalize name
    cleaned = " ".join([word.capitalize() for word in name.split()])

    return True, cleaned


def validate_password(password: str, field: str = "password", result: Optional[ValidationResult] = None) -> Tuple[
    bool, Optional[str]]:
    """
    Validate password strength

    Args:
        password: Password to validate
        field: Field name for errors
        result: Optional ValidationResult to add errors to

    Returns:
        Tuple of (is_valid, None) - never returns password for security
    """
    if not password:
        if result:
            result.add_error(field, "Password is required", None)
        return False, None

    password = str(password)

    # Length check
    if len(password) < 8:
        if result:
            result.add_error(field, "Password must be at least 8 characters long", None)
        return False, None

    if len(password) > 128:
        if result:
            result.add_error(field, "Password must be at most 128 characters long", None)
        return False, None

    # Complexity checks
    errors = []

    if not re.search(r'[A-Z]', password):  # Uppercase
        errors.append("at least one uppercase letter")

    if not re.search(r'[a-z]', password):  # Lowercase
        errors.append("at least one lowercase letter")

    if not re.search(r'\d', password):  # Digit
        errors.append("at least one number")

    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):  # Special char
        errors.append("at least one special character")

    # Check for common passwords (basic)
    common_passwords = [
        "password", "12345678", "qwerty123", "admin123", "welcome123",
        "password123", "letmein", "monkey", "sunshine", "iloveyou"
    ]

    if password.lower() in common_passwords:
        errors.append("too common")

    # Check for sequential characters
    if re.search(r'(.)\1{3,}', password):  # Same char repeated 4+ times
        errors.append("too many repeated characters")

    if errors:
        if result:
            error_msg = f"Password must contain {', '.join(errors)}"
            result.add_error(field, error_msg, None)
        return False, None

    return True, None


def validate_url(url: str, field: str = "url", require_https: bool = False,
                 result: Optional[ValidationResult] = None) -> Tuple[bool, Optional[str]]:
    """
    Validate URL format

    Args:
        url: URL to validate
        field: Field name for errors
        require_https: Require HTTPS
        result: Optional ValidationResult to add errors to

    Returns:
        Tuple of (is_valid, normalized_url)
    """
    if not url:
        if result:
            result.add_error(field, "URL is required", url)
        return False, None

    url = str(url).strip()

    # Add protocol if missing
    if not url.startswith(('http://', 'https://')):
        url = 'https://' + url

    # Validate format
    try:
        # Basic regex validation
        if not re.match(URL_REGEX, url):
            if result:
                result.add_error(field, "Invalid URL format", url)
            return False, None

        # Require HTTPS for security
        if require_https and not url.startswith('https://'):
            if result:
                result.add_error(field, "URL must use HTTPS", url)
            return False, None

        # Check for valid domain (basic)
        domain = url.split('://')[1].split('/')[0]
        if '.' not in domain or len(domain) < 3:
            if result:
                result.add_error(field, "Invalid domain in URL", url)
            return False, None

        return True, url

    except Exception:
        if result:
            result.add_error(field, "Invalid URL", url)
        return False, None


def validate_date(date_str: str, field: str = "date", result: Optional[ValidationResult] = None) -> Tuple[
    bool, Optional[date]]:
    """
    Validate date string and convert to date object

    Args:
        date_str: Date string in YYYY-MM-DD format
        field: Field name for errors
        result: Optional ValidationResult to add errors to

    Returns:
        Tuple of (is_valid, date_object)
    """
    if not date_str:
        if result:
            result.add_error(field, "Date is required", date_str)
        return False, None

    try:
        # Check format
        if not re.match(DATE_REGEX, str(date_str)):
            if result:
                result.add_error(field, "Date must be in YYYY-MM-DD format", date_str)
            return False, None

        # Parse date
        date_obj = datetime.strptime(date_str, "%Y-%m-%d").date()

        # Check if date is not in the past (for bookings)
        if date_obj < datetime.now().date():
            if result:
                result.add_error(field, "Date cannot be in the past", date_str)
            return False, None

        # Check if date is not too far in the future (e.g., 1 year max)
        max_future_date = datetime.now().date() + timedelta(days=365)
        if date_obj > max_future_date:
            if result:
                result.add_error(field, "Date cannot be more than 1 year in the future", date_str)
            return False, None

        return True, date_obj

    except ValueError as e:
        if result:
            result.add_error(field, f"Invalid date: {str(e)}", date_str)
        return False, None
    except Exception:
        if result:
            result.add_error(field, "Invalid date format", date_str)
        return False, None


def validate_time(time_str: str, field: str = "time", result: Optional[ValidationResult] = None) -> Tuple[
    bool, Optional[time]]:
    """
    Validate time string and convert to time object

    Args:
        time_str: Time string in HH:MM or HH:MM:SS format
        field: Field name for errors
        result: Optional ValidationResult to add errors to

    Returns:
        Tuple of (is_valid, time_object)
    """
    if not time_str:
        if result:
            result.add_error(field, "Time is required", time_str)
        return False, None

    try:
        # Check format
        if not re.match(TIME_24H_REGEX, str(time_str)):
            if result:
                result.add_error(field, "Time must be in HH:MM or HH:MM:SS 24-hour format", time_str)
            return False, None

        # Parse time
        if len(time_str.split(':')) == 2:
            time_obj = datetime.strptime(time_str, "%H:%M").time()
        else:
            time_obj = datetime.strptime(time_str, "%H:%M:%S").time()

        # Business hours validation (9 AM to 6 PM)
        if time_obj < time(9, 0) or time_obj > time(18, 0):
            if result:
                result.add_error(field, "Time must be between 9:00 AM and 6:00 PM", time_str)
            return False, None

        return True, time_obj

    except ValueError as e:
        if result:
            result.add_error(field, f"Invalid time: {str(e)}", time_str)
        return False, None
    except Exception:
        if result:
            result.add_error(field, "Invalid time format", time_str)
        return False, None


def validate_price(price: Union[str, float, int], field: str = "price", min_price: float = 0, max_price: float = 100000,
                   result: Optional[ValidationResult] = None) -> Tuple[bool, Optional[float]]:
    """
    Validate price amount

    Args:
        price: Price to validate
        field: Field name for errors
        min_price: Minimum allowed price
        max_price: Maximum allowed price
        result: Optional ValidationResult to add errors to

    Returns:
        Tuple of (is_valid, price_as_float)
    """
    if price is None:
        if result:
            result.add_error(field, "Price is required", price)
        return False, None

    try:
        # Convert to string and clean
        price_str = str(price).strip()

        # Check format
        if not re.match(PRICE_REGEX, price_str):
            if result:
                result.add_error(field, "Price must be a valid number with up to 2 decimal places", price)
            return False, None

        # Convert to float
        price_float = float(price_str)

        # Range validation
        if price_float < min_price:
            if result:
                result.add_error(field, f"Price must be at least {min_price}", price)
            return False, None

        if price_float > max_price:
            if result:
                result.add_error(field, f"Price must be at most {max_price}", price)
            return False, None

        # Round to 2 decimal places
        price_float = round(price_float, 2)

        return True, price_float

    except ValueError:
        if result:
            result.add_error(field, "Price must be a valid number", price)
        return False, None
    except Exception:
        if result:
            result.add_error(field, "Invalid price", price)
        return False, None


def validate_coordinates_input(lat: Union[str, float], lng: Union[str, float], field_prefix: str = "location",
                               result: Optional[ValidationResult] = None) -> Tuple[bool, Optional[Tuple[float, float]]]:
    """
    Validate latitude and longitude coordinates

    Args:
        lat: Latitude
        lng: Longitude
        field_prefix: Prefix for field names
        result: Optional ValidationResult to add errors to

    Returns:
        Tuple of (is_valid, (lat, lng))
    """
    try:
        # Convert to float
        lat_float = float(lat) if lat is not None else None
        lng_float = float(lng) if lng is not None else None

        # Check if within valid ranges
        if lat_float is None or not (-90 <= lat_float <= 90):
            if result:
                result.add_error(f"{field_prefix}_lat", "Latitude must be between -90 and 90", lat)
            return False, None

        if lng_float is None or not (-180 <= lng_float <= 180):
            if result:
                result.add_error(f"{field_prefix}_lng", "Longitude must be between -180 and 180", lng)
            return False, None

        # Check if within Guwahati area (using geolocation utility)
        if not is_within_guwahati(lat_float, lng_float):
            if result:
                result.add_error(field_prefix, "Location must be within Guwahati area", (lat_float, lng_float))
            return False, None

        return True, (lat_float, lng_float)

    except (ValueError, TypeError):
        if result:
            result.add_error(field_prefix, "Invalid coordinates format", (lat, lng))
        return False, None
    except Exception:
        if result:
            result.add_error(field_prefix, "Invalid coordinates", (lat, lng))
        return False, None


def validate_duration_minutes(duration: Union[str, int], field: str = "duration", min_minutes: int = 30,
                              max_minutes: int = 240, result: Optional[ValidationResult] = None) -> Tuple[
    bool, Optional[int]]:
    """
    Validate duration in minutes

    Args:
        duration: Duration in minutes
        field: Field name for errors
        min_minutes: Minimum duration
        max_minutes: Maximum duration
        result: Optional ValidationResult to add errors to

    Returns:
        Tuple of (is_valid, duration_as_int)
    """
    if duration is None:
        if result:
            result.add_error(field, "Duration is required", duration)
        return False, None

    try:
        # Convert to integer
        duration_int = int(duration)

        # Validate range
        if duration_int < min_minutes:
            if result:
                result.add_error(field, f"Duration must be at least {min_minutes} minutes", duration)
            return False, None

        if duration_int > max_minutes:
            if result:
                result.add_error(field, f"Duration must be at most {max_minutes} minutes", duration)
            return False, None

        # Check if divisible by 15 (quarter hours)
        if duration_int % 15 != 0:
            if result:
                result.add_error(field, "Duration should be in 15-minute increments", duration)
            return False, None

        return True, duration_int

    except (ValueError, TypeError):
        if result:
            result.add_error(field, "Duration must be a valid number", duration)
        return False, None


def validate_group_size(size: Union[str, int], field: str = "group_size", min_size: int = 1, max_size: int = 20,
                        result: Optional[ValidationResult] = None) -> Tuple[bool, Optional[int]]:
    """
    Validate group size

    Args:
        size: Group size
        field: Field name for errors
        min_size: Minimum group size
        max_size: Maximum group size
        result: Optional ValidationResult to add errors to

    Returns:
        Tuple of (is_valid, size_as_int)
    """
    if size is None:
        if result:
            result.add_error(field, "Group size is required", size)
        return False, None

    try:
        # Convert to integer
        size_int = int(size)

        # Validate range
        if size_int < min_size:
            if result:
                result.add_error(field, f"Group size must be at least {min_size}", size)
            return False, None

        if size_int > max_size:
            if result:
                result.add_error(field, f"Group size must be at most {max_size}", size)
            return False, None

        return True, size_int

    except (ValueError, TypeError):
        if result:
            result.add_error(field, "Group size must be a valid number", size)
        return False, None


def validate_list_items(items: List[Any], field: str = "items", min_items: int = 0, max_items: int = 20,
                        result: Optional[ValidationResult] = None) -> Tuple[bool, Optional[List[Any]]]:
    """
    Validate list of items

    Args:
        items: List to validate
        field: Field name for errors
        min_items: Minimum number of items
        max_items: Maximum number of items
        result: Optional ValidationResult to add errors to

    Returns:
        Tuple of (is_valid, validated_list)
    """
    if items is None:
        items = []

    if not isinstance(items, list):
        if result:
            result.add_error(field, "Must be a list", items)
        return False, None

    # Check length
    if len(items) < min_items:
        if result:
            result.add_error(field, f"Must have at least {min_items} items", items)
        return False, None

    if len(items) > max_items:
        if result:
            result.add_error(field, f"Must have at most {max_items} items", items)
        return False, None

    # Clean items (remove empty strings, strip whitespace)
    cleaned_items = []
    for item in items:
        if isinstance(item, str):
            item = item.strip()
            if item:  # Only add non-empty strings
                cleaned_items.append(item)
        else:
            cleaned_items.append(item)

    return True, cleaned_items


def validate_uuid(uuid_str: str, field: str = "id", result: Optional[ValidationResult] = None) -> Tuple[
    bool, Optional[str]]:
    """
    Validate UUID format

    Args:
        uuid_str: UUID string to validate
        field: Field name for errors
        result: Optional ValidationResult to add errors to

    Returns:
        Tuple of (is_valid, normalized_uuid)
    """
    if not uuid_str:
        if result:
            result.add_error(field, "ID is required", uuid_str)
        return False, None

    uuid_str = str(uuid_str).strip()

    try:
        # Try to parse as UUID
        uuid_obj = uuid.UUID(uuid_str)
        normalized = str(uuid_obj)

        # Additional format check
        uuid_pattern = r'^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
        if not re.match(uuid_pattern, normalized, re.IGNORECASE):
            if result:
                result.add_error(field, "Invalid ID format", uuid_str)
            return False, None

        return True, normalized.lower()

    except (ValueError, AttributeError):
        if result:
            result.add_error(field, "Invalid ID format", uuid_str)
        return False, None


def validate_user_registration(data: Dict[str, Any]) -> ValidationResult:
    """
    Validate user registration data

    Args:
        data: Registration data

    Returns:
        ValidationResult with errors and cleaned data
    """
    result = ValidationResult()

    # Required fields
    required_fields = ["email", "password", "full_name"]
    for field in required_fields:
        validate_required(data.get(field), field, result)

    if not result.is_valid:
        return result

    # Email validation
    is_valid_email, cleaned_email = validate_email_address(data["email"], "email", result)
    if is_valid_email:
        result.add_cleaned("email", cleaned_email)

    # Password validation
    is_valid_password, _ = validate_password(data["password"], "password", result)

    # Full name validation
    is_valid_name, cleaned_name = validate_name(data["full_name"], "full_name", result=result)
    if is_valid_name:
        result.add_cleaned("full_name", cleaned_name)

    # Optional phone validation
    if data.get("phone"):
        is_valid_phone, cleaned_phone = validate_phone_number(data["phone"], "phone", result=result)
        if is_valid_phone:
            result.add_cleaned("phone", cleaned_phone)

    return result


def validate_itinerary_creation(data: Dict[str, Any]) -> ValidationResult:
    """
    Validate itinerary creation data

    Args:
        data: Itinerary data

    Returns:
        ValidationResult with errors and cleaned data
    """
    result = ValidationResult()

    # Required fields
    required_fields = ["title", "description", "duration_minutes", "price_per_person", "meeting_address"]
    for field in required_fields:
        validate_required(data.get(field), field, result)

    if not result.is_valid:
        return result

    # Title validation
    title = data["title"]
    if len(title) < 10:
        result.add_error("title", "Title must be at least 10 characters", title)
    elif len(title) > 200:
        result.add_error("title", "Title must be at most 200 characters", title)
    else:
        result.add_cleaned("title", title.strip())

    # Description validation
    description = data["description"]
    if len(description) < 50:
        result.add_error("description", "Description must be at least 50 characters", description)
    elif len(description) > 2000:
        result.add_error("description", "Description must be at most 2000 characters", description)
    else:
        result.add_cleaned("description", description.strip())

    # Duration validation
    is_valid_duration, cleaned_duration = validate_duration_minutes(
        data["duration_minutes"],
        "duration_minutes",
        result=result
    )
    if is_valid_duration:
        result.add_cleaned("duration_minutes", cleaned_duration)

    # Price validation
    is_valid_price, cleaned_price = validate_price(
        data["price_per_person"],
        "price_per_person",
        min_price=100,  # Minimum ₹100
        max_price=10000,  # Maximum ₹10,000
        result=result
    )
    if is_valid_price:
        result.add_cleaned("price_per_person", cleaned_price)

    # Meeting address validation
    address = data["meeting_address"]
    if len(address) < 10:
        result.add_error("meeting_address", "Address must be at least 10 characters", address)
    else:
        result.add_cleaned("meeting_address", address.strip())

    # Optional coordinates validation
    if data.get("meeting_point"):
        meeting_point = data["meeting_point"]
        if isinstance(meeting_point, dict) and "lat" in meeting_point and "lng" in meeting_point:
            is_valid_coords, cleaned_coords = validate_coordinates_input(
                meeting_point["lat"],
                meeting_point["lng"],
                "meeting_point",
                result=result
            )
            if is_valid_coords:
                result.add_cleaned("meeting_point", {
                    "lat": cleaned_coords[0],
                    "lng": cleaned_coords[1]
                })

    # Optional category validation
    if data.get("category"):
        valid_categories = ["spiritual", "nature", "cultural", "culinary", "historical", "adventure"]
        category = data["category"].lower()
        if category not in valid_categories:
            result.add_error("category", f"Category must be one of: {', '.join(valid_categories)}", category)
        else:
            result.add_cleaned("category", category)

    # Optional group size validation
    if data.get("max_group_size"):
        is_valid_size, cleaned_size = validate_group_size(
            data["max_group_size"],
            "max_group_size",
            min_size=1,
            max_size=50,
            result=result
        )
        if is_valid_size:
            result.add_cleaned("max_group_size", cleaned_size)

    # Optional highlights validation
    if data.get("highlights"):
        is_valid_highlights, cleaned_highlights = validate_list_items(
            data["highlights"],
            "highlights",
            min_items=3,
            max_items=10,
            result=result
        )
        if is_valid_highlights:
            result.add_cleaned("highlights", cleaned_highlights)

    return result


def validate_booking_creation(data: Dict[str, Any]) -> ValidationResult:
    """
    Validate booking creation data

    Args:
        data: Booking data

    Returns:
        ValidationResult with errors and cleaned data
    """
    result = ValidationResult()

    # Required fields
    required_fields = ["itinerary_id", "booking_date", "start_time", "number_of_people"]
    for field in required_fields:
        validate_required(data.get(field), field, result)

    if not result.is_valid:
        return result

    # Itinerary ID validation
    is_valid_uuid, cleaned_itinerary_id = validate_uuid(data["itinerary_id"], "itinerary_id", result)
    if is_valid_uuid:
        result.add_cleaned("itinerary_id", cleaned_itinerary_id)

    # Date validation
    is_valid_date, cleaned_date = validate_date(data["booking_date"], "booking_date", result)
    if is_valid_date:
        result.add_cleaned("booking_date", cleaned_date)

    # Time validation
    is_valid_time, cleaned_time = validate_time(data["start_time"], "start_time", result)
    if is_valid_time:
        result.add_cleaned("start_time", cleaned_time)

    # Group size validation
    is_valid_size, cleaned_size = validate_group_size(
        data["number_of_people"],
        "number_of_people",
        min_size=1,
        max_size=20,
        result=result
    )
    if is_valid_size:
        result.add_cleaned("number_of_people", cleaned_size)

    # Optional special requests validation
    if data.get("special_requests"):
        requests = data["special_requests"]
        if len(requests) > 500:
            result.add_error("special_requests", "Special requests must be at most 500 characters", requests)
        else:
            result.add_cleaned("special_requests", requests.strip())

    return result


def validate_vendor_profile(data: Dict[str, Any]) -> ValidationResult:
    """
    Validate vendor profile data

    Args:
        data: Vendor profile data

    Returns:
        ValidationResult with errors and cleaned data
    """
    result = ValidationResult()

    # Required fields
    required_fields = ["business_name", "description"]
    for field in required_fields:
        validate_required(data.get(field), field, result)

    if not result.is_valid:
        return result

    # Business name validation
    is_valid_name, cleaned_name = validate_name(
        data["business_name"],
        "business_name",
        min_length=3,
        max_length=100,
        result=result
    )
    if is_valid_name:
        result.add_cleaned("business_name", cleaned_name)

    # Description validation
    description = data["description"]
    if len(description) < 50:
        result.add_error("description", "Description must be at least 50 characters", description)
    elif len(description) > 1000:
        result.add_error("description", "Description must be at most 1000 characters", description)
    else:
        result.add_cleaned("description", description.strip())

    # Optional hourly rate validation
    if data.get("hourly_rate"):
        is_valid_rate, cleaned_rate = validate_price(
            data["hourly_rate"],
            "hourly_rate",
            min_price=100,
            max_price=5000,
            result=result
        )
        if is_valid_rate:
            result.add_cleaned("hourly_rate", cleaned_rate)

    # Optional experience years validation
    if data.get("experience_years"):
        try:
            years = int(data["experience_years"])
            if years < 0:
                result.add_error("experience_years", "Experience years cannot be negative", years)
            elif years > 60:
                result.add_error("experience_years", "Experience years cannot exceed 60", years)
            else:
                result.add_cleaned("experience_years", years)
        except (ValueError, TypeError):
            result.add_error("experience_years", "Experience years must be a valid number", data["experience_years"])

    # Optional expertise validation
    if data.get("expertise"):
        is_valid_expertise, cleaned_expertise = validate_list_items(
            data["expertise"],
            "expertise",
            min_items=1,
            max_items=10,
            result=result
        )
        if is_valid_expertise:
            result.add_cleaned("expertise", cleaned_expertise)

    # Optional languages validation
    if data.get("languages"):
        is_valid_languages, cleaned_languages = validate_list_items(
            data["languages"],
            "languages",
            min_items=1,
            max_items=10,
            result=result
        )
        if is_valid_languages:
            result.add_cleaned("languages", cleaned_languages)

    return result


def sanitize_input(input_data: Union[str, Dict, List]) -> Union[str, Dict, List]:
    """
    Sanitize input data to prevent XSS and injection attacks

    Args:
        input_data: Input data to sanitize

    Returns:
        Sanitized data
    """
    if isinstance(input_data, str):
        # Remove HTML tags and dangerous characters
        import html
        sanitized = html.escape(input_data)

        # Remove SQL injection patterns (basic)
        sql_patterns = [
            r"(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|EXEC|ALTER|CREATE|TRUNCATE)\b)",
            r"(--|\#|\/\*)",
            r"(\b(OR|AND)\b\s+\d+\s*=\s*\d+)"
        ]

        for pattern in sql_patterns:
            sanitized = re.sub(pattern, "", sanitized, flags=re.IGNORECASE)

        # Remove script tags and event handlers
        script_patterns = [
            r"<script.*?>.*?</script>",
            r"javascript:",
            r"on\w+\s*="
        ]

        for pattern in script_patterns:
            sanitized = re.sub(pattern, "", sanitized, flags=re.IGNORECASE)

        return sanitized.strip()

    elif isinstance(input_data, dict):
        return {key: sanitize_input(value) for key, value in input_data.items()}

    elif isinstance(input_data, list):
        return [sanitize_input(item) for item in input_data]

    else:
        return input_data


def validate_payment_amount(amount: Union[str, float, int], currency: str = "INR",
                            result: Optional[ValidationResult] = None) -> Tuple[bool, Optional[float]]:
    """
    Validate payment amount for specific currency

    Args:
        amount: Payment amount
        currency: Currency code
        result: Optional ValidationResult to add errors to

    Returns:
        Tuple of (is_valid, amount_in_smallest_unit)
    """
    # First validate as price
    is_valid_price, cleaned_amount = validate_price(
        amount,
        "amount",
        min_price=1,  # Minimum ₹1
        max_price=100000,  # Maximum ₹100,000
        result=result
    )

    if not is_valid_price:
        return False, None

    # Convert to smallest unit (paise for INR, cents for USD)
    if currency.upper() == "INR":
        # Razorpay expects amount in paise
        amount_in_paise = int(cleaned_amount * 100)
        return True, amount_in_paise
    elif currency.upper() == "USD":
        # Stripe expects amount in cents
        amount_in_cents = int(cleaned_amount * 100)
        return True, amount_in_cents
    else:
        if result:
            result.add_error("currency", f"Unsupported currency: {currency}", currency)
        return False, None


# Helper functions for common validation patterns
def validate_rating(rating: Union[str, float, int], field: str = "rating", result: Optional[ValidationResult] = None) -> \
Tuple[bool, Optional[float]]:
    """Validate rating between 1-5"""
    try:
        rating_float = float(rating)
        if 1 <= rating_float <= 5:
            return True, round(rating_float, 1)
        else:
            if result:
                result.add_error(field, "Rating must be between 1 and 5", rating)
            return False, None
    except (ValueError, TypeError):
        if result:
            result.add_error(field, "Rating must be a number", rating)
        return False, None


def validate_availability_status(status: str, field: str = "status", result: Optional[ValidationResult] = None) -> \
Tuple[bool, Optional[str]]:
    """Validate availability status"""
    valid_statuses = ["available", "unavailable", "busy", "on_leave"]
    if status.lower() in valid_statuses:
        return True, status.lower()
    else:
        if result:
            result.add_error(field, f"Status must be one of: {', '.join(valid_statuses)}", status)
        return False, None


def validate_verification_status(status: str, field: str = "verification_status",
                                 result: Optional[ValidationResult] = None) -> Tuple[bool, Optional[str]]:
    """Validate verification status"""
    valid_statuses = ["pending", "verified", "rejected", "under_review"]
    if status.lower() in valid_statuses:
        return True, status.lower()
    else:
        if result:
            result.add_error(field, f"Verification status must be one of: {', '.join(valid_statuses)}", status)
        return False, None


# Export key functions and classes
__all__ = [
    'ValidationError',
    'ValidationResult',
    'validate_required',
    'validate_email_address',
    'validate_phone_number',
    'validate_name',
    'validate_password',
    'validate_url',
    'validate_date',
    'validate_time',
    'validate_price',
    'validate_coordinates_input',
    'validate_duration_minutes',
    'validate_group_size',
    'validate_list_items',
    'validate_uuid',
    'validate_user_registration',
    'validate_itinerary_creation',
    'validate_booking_creation',
    'validate_vendor_profile',
    'sanitize_input',
    'validate_payment_amount',
    'validate_rating',
    'validate_availability_status',
    'validate_verification_status'
]
