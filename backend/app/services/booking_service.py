from typing import List, Optional, Dict, Any
from datetime import datetime, date, time, timedelta
from supabase import create_client
from backend.app.core.config import settings
import uuid


class BookingService:
    def __init__(self):
        self.supabase = create_client(
            settings.SUPABASE_URL,
            settings.SUPABASE_KEY
        )

    async def create_booking(self, booking_data: dict) -> Optional[Dict[str, Any]]:
        """Create a new booking"""
        try:
            # Generate booking ID
            booking_id = str(uuid.uuid4())
            booking_data["id"] = booking_id
            booking_data["created_at"] = datetime.utcnow().isoformat()
            booking_data["status"] = "pending"
            booking_data["payment_status"] = "pending"
            booking_data["meeting_point_confirmed"] = False

            # Get itinerary price
            itinerary_response = self.supabase.table("itineraries") \
                .select("price_per_person") \
                .eq("id", booking_data["itinerary_id"]) \
                .single() \
                .execute()

            if itinerary_response.data:
                price_per_person = itinerary_response.data["price_per_person"]
                booking_data["total_amount"] = price_per_person * booking_data.get("number_of_people", 1)

            # Create booking
            response = self.supabase.table("bookings") \
                .insert(booking_data) \
                .execute()

            return response.data[0] if response.data else None
        except Exception as e:
            print(f"Error creating booking: {e}")
            return None

    async def get_booking_by_id(self, booking_id: str) -> Optional[Dict[str, Any]]:
        """Get booking by ID with details"""
        try:
            # Get booking with related data
            query = f"""
            SELECT b.*, 
                   i.title as itinerary_title, i.duration_minutes,
                   v.business_name as vendor_name,
                   u.full_name as customer_name, u.email as customer_email,
                   u.phone as customer_phone
            FROM bookings b
            LEFT JOIN itineraries i ON b.itinerary_id = i.id
            LEFT JOIN vendors v ON b.vendor_id = v.id
            LEFT JOIN users u ON b.user_id = u.id
            WHERE b.id = '{booking_id}';
            """

            response = self.supabase.rpc('exec_sql', {'query': query}).execute()
            return response.data[0] if response.data and len(response.data) > 0 else None
        except Exception as e:
            print(f"Error getting booking: {e}")
            return None

    async def get_user_bookings(self, user_id: str, limit: int = 20) -> List[Dict[str, Any]]:
        """Get all bookings for a user"""
        try:
            query = f"""
            SELECT b.*, 
                   i.title as itinerary_title, i.duration_minutes,
                   v.business_name as vendor_name, v.rating as vendor_rating
            FROM bookings b
            LEFT JOIN itineraries i ON b.itinerary_id = i.id
            LEFT JOIN vendors v ON b.vendor_id = v.id
            WHERE b.user_id = '{user_id}'
            ORDER BY b.booking_date DESC, b.start_time DESC
            LIMIT {limit};
            """

            response = self.supabase.rpc('exec_sql', {'query': query}).execute()
            return response.data if hasattr(response, 'data') else []
        except Exception as e:
            print(f"Error getting user bookings: {e}")
            return []

    async def get_vendor_bookings(self, vendor_id: str, limit: int = 20) -> List[Dict[str, Any]]:
        """Get all bookings for a vendor"""
        try:
            query = f"""
            SELECT b.*, 
                   i.title as itinerary_title, i.duration_minutes,
                   u.full_name as customer_name, u.phone as customer_phone
            FROM bookings b
            LEFT JOIN itineraries i ON b.itinerary_id = i.id
            LEFT JOIN users u ON b.user_id = u.id
            WHERE b.vendor_id = '{vendor_id}'
            ORDER BY b.booking_date DESC, b.start_time DESC
            LIMIT {limit};
            """

            response = self.supabase.rpc('exec_sql', {'query': query}).execute()
            return response.data if hasattr(response, 'data') else []
        except Exception as e:
            print(f"Error getting vendor bookings: {e}")
            return []

    async def update_booking_status(
            self,
            booking_id: str,
            status: str,
            vendor_id: Optional[str] = None
    ) -> bool:
        """Update booking status"""
        try:
            update_data = {"status": status}

            response = self.supabase.table("bookings") \
                .update(update_data) \
                .eq("id", booking_id) \
                .execute()

            return len(response.data) > 0
        except Exception as e:
            print(f"Error updating booking status: {e}")
            return False

    async def get_available_slots(
            self,
            vendor_id: str,
            booking_date: date
    ) -> List[str]:
        """Get available time slots for a vendor on specific date"""
        try:
            # Get vendor's working hours (simplified)
            working_hours = ["09:00", "11:00", "14:00", "16:00"]

            # Get booked slots
            booked_slots_response = self.supabase.table("bookings") \
                .select("start_time") \
                .eq("vendor_id", vendor_id) \
                .eq("booking_date", booking_date.isoformat()) \
                .eq("status", "confirmed") \
                .execute()

            booked_slots = []
            if booked_slots_response.data:
                booked_slots = [
                    booking["start_time"][:5]  # Extract HH:MM
                    for booking in booked_slots_response.data
                ]

            # Filter out booked slots
            available_slots = [
                slot for slot in working_hours
                if slot not in booked_slots
            ]

            return available_slots
        except Exception as e:
            print(f"Error getting available slots: {e}")
            return []