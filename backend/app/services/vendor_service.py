from typing import List, Optional, Dict, Any
from supabase import create_client
from backend.app.core.config import settings


class VendorService:
    def __init__(self):
        self.supabase = create_client(
            settings.SUPABASE_URL,
            settings.SUPABASE_KEY
        )

    async def get_vendors(
            self,
            verified_only: bool = True,
            limit: int = 20,
            offset: int = 0
    ) -> List[Dict[str, Any]]:
        """Get list of vendors"""
        try:
            query = self.supabase.table("vendors").select("*")

            if verified_only:
                query = query.eq("verification_status", "verified")

            query = query.order("rating", desc=True)
            query = query.range(offset, offset + limit - 1)

            response = query.execute()
            return response.data
        except Exception as e:
            print(f"Error getting vendors: {e}")
            return []

    async def get_vendor_by_id(self, vendor_id: str) -> Optional[Dict[str, Any]]:
        """Get vendor by ID with user details"""
        try:
            # Get vendor
            vendor_response = self.supabase.table("vendors") \
                .select("*") \
                .eq("id", vendor_id) \
                .single() \
                .execute()

            if not vendor_response.data:
                return None

            vendor = vendor_response.data

            # Get user details if user_id exists
            if vendor.get("user_id"):
                user_response = self.supabase.table("users") \
                    .select("*") \
                    .eq("id", vendor["user_id"]) \
                    .single() \
                    .execute()

                if user_response.data:
                    vendor["user"] = user_response.data

            # Get vendor's itineraries
            itineraries_response = self.supabase.table("itineraries") \
                .select("*") \
                .eq("vendor_id", vendor_id) \
                .eq("is_active", True) \
                .execute()

            vendor["itineraries"] = itineraries_response.data if itineraries_response.data else []

            return vendor
        except Exception as e:
            print(f"Error getting vendor: {e}")
            return None

    async def create_vendor(self, vendor_data: dict) -> Optional[Dict[str, Any]]:
        """Create new vendor profile"""
        try:
            response = self.supabase.table("vendors").insert(vendor_data).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            print(f"Error creating vendor: {e}")
            return None

    async def update_vendor(
            self,
            vendor_id: str,
            update_data: dict
    ) -> Optional[Dict[str, Any]]:
        """Update vendor profile"""
        try:
            response = self.supabase.table("vendors") \
                .update(update_data) \
                .eq("id", vendor_id) \
                .execute()

            return response.data[0] if response.data else None
        except Exception as e:
            print(f"Error updating vendor: {e}")
            return None

    async def get_vendor_stats(self, vendor_id: str) -> Dict[str, Any]:
        """Get vendor statistics"""
        try:
            # Get total bookings
            bookings_query = f"""
            SELECT COUNT(*) as total_bookings,
                   SUM(total_amount) as total_revenue
            FROM bookings
            WHERE vendor_id = '{vendor_id}'
            AND status = 'completed';
            """

            bookings_response = self.supabase.rpc('exec_sql', {'query': bookings_query}).execute()

            # Get average rating
            rating_query = f"""
            SELECT rating, total_reviews
            FROM vendors
            WHERE id = '{vendor_id}';
            """

            rating_response = self.supabase.rpc('exec_sql', {'query': rating_query}).execute()

            stats = {
                "total_bookings": 0,
                "total_revenue": 0,
                "rating": 0,
                "total_reviews": 0
            }

            if bookings_response.data and len(bookings_response.data) > 0:
                stats["total_bookings"] = bookings_response.data[0].get("total_bookings", 0)
                stats["total_revenue"] = bookings_response.data[0].get("total_revenue", 0) or 0

            if rating_response.data and len(rating_response.data) > 0:
                stats["rating"] = rating_response.data[0].get("rating", 0)
                stats["total_reviews"] = rating_response.data[0].get("total_reviews", 0)

            return stats
        except Exception as e:
            print(f"Error getting vendor stats: {e}")
            return {}
