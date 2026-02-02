from typing import List, Optional, Dict, Any
from datetime import datetime
from supabase import create_client
from backend.app.core.config import settings
import json

# In itinerary_service.py
from backend.app.utils.geolocation import calculate_distance, get_safe_meeting_points




class ItineraryService:
    def __init__(self):
        self.supabase = create_client(
            settings.SUPABASE_URL,
            settings.SUPABASE_KEY
        )

    def get_nearby_itineraries(self, lat: float, lng: float, radius_km: float = 5):
        """Get itineraries within radius"""
        nearby = []
        for itinerary in self.itineraries:
            distance = calculate_distance(
                (lat, lng),
                (itinerary["meeting_point"]["lat"], itinerary["meeting_point"]["lng"])
            )
            if distance <= radius_km:
                itinerary["distance_km"] = round(distance, 2)
                nearby.append(itinerary)

        return sorted(nearby, key=lambda x: x["distance_km"])


    async def get_itineraries(
            self,
            category: Optional[str] = None,
            duration_min: Optional[int] = None,
            duration_max: Optional[int] = None,
            price_max: Optional[float] = None,
            latitude: Optional[float] = None,
            longitude: Optional[float] = None,
            radius_km: float = 5,
            search: Optional[str] = None,
            limit: int = 10,
            offset: int = 0
    ) -> List[Dict[str, Any]]:
        """Get filtered itineraries"""
        query = self.supabase.table("itineraries").select("*")

        # Apply filters
        query = query.eq("is_active", True)

        if category:
            query = query.eq("category", category)
        if duration_min:
            query = query.gte("duration_minutes", duration_min)
        if duration_max:
            query = query.lte("duration_minutes", duration_max)
        if price_max:
            query = query.lte("price_per_person", price_max)
        if search:
            query = query.ilike("title", f"%{search}%")

        # Apply location filter if coordinates provided
        if latitude and longitude:
            # Use PostGIS for location-based search
            location_query = f"""
            SELECT *, 
                ST_Distance(
                    meeting_point::geography,
                    ST_SetSRID(ST_MakePoint({longitude}, {latitude}), 4326)::geography
                ) / 1000 as distance_km
            FROM itineraries
            WHERE ST_DWithin(
                meeting_point::geography,
                ST_SetSRID(ST_MakePoint({longitude}, {latitude}), 4326)::geography,
                {radius_km * 1000}
            )
            AND is_active = true
            ORDER BY distance_km
            LIMIT {limit} OFFSET {offset};
            """

            response = self.supabase.rpc('exec_sql', {'query': location_query}).execute()
            return response.data if hasattr(response, 'data') else []

        # Apply pagination
        query = query.order("created_at", desc=True)
        query = query.range(offset, offset + limit - 1)

        response = query.execute()
        return response.data

    async def get_itinerary_by_id(self, itinerary_id: str) -> Optional[Dict[str, Any]]:
        """Get itinerary by ID with stops and vendor details"""
        try:
            # Get itinerary
            itinerary_response = self.supabase.table("itineraries") \
                .select("*") \
                .eq("id", itinerary_id) \
                .single() \
                .execute()

            if not itinerary_response.data:
                return None

            itinerary = itinerary_response.data

            # Get stops
            stops_response = self.supabase.table("itinerary_stops") \
                .select("*") \
                .eq("itinerary_id", itinerary_id) \
                .order("stop_order") \
                .execute()

            # Get vendor details
            vendor_response = self.supabase.table("vendors") \
                .select("*") \
                .eq("id", itinerary["vendor_id"]) \
                .single() \
                .execute()

            itinerary["stops"] = stops_response.data if stops_response.data else []
            itinerary["vendor"] = vendor_response.data if vendor_response.data else {}

            return itinerary
        except Exception as e:
            print(f"Error getting itinerary: {e}")
            return None

    async def create_itinerary(self, itinerary_data: dict, vendor_id: str) -> Optional[Dict[str, Any]]:
        """Create new itinerary"""
        try:
            itinerary_data["vendor_id"] = vendor_id
            itinerary_data["created_at"] = datetime.utcnow().isoformat()
            itinerary_data["is_active"] = True

            response = self.supabase.table("itineraries") \
                .insert(itinerary_data) \
                .execute()

            return response.data[0] if response.data else None
        except Exception as e:
            print(f"Error creating itinerary: {e}")
            return None

    async def update_itinerary(
            self,
            itinerary_id: str,
            update_data: dict
    ) -> Optional[Dict[str, Any]]:
        """Update itinerary"""
        try:
            response = self.supabase.table("itineraries") \
                .update(update_data) \
                .eq("id", itinerary_id) \
                .execute()

            return response.data[0] if response.data else None
        except Exception as e:
            print(f"Error updating itinerary: {e}")
            return None

    async def get_categories(self) -> List[str]:
        """Get distinct itinerary categories"""
        query = """
        SELECT DISTINCT category 
        FROM itineraries 
        WHERE is_active = true 
        AND category IS NOT NULL
        ORDER BY category;
        """

        try:
            response = self.supabase.rpc('exec_sql', {'query': query}).execute()
            if hasattr(response, 'data'):
                return [item["category"] for item in response.data]
            return []
        except Exception:
            return ["spiritual", "nature", "cultural", "culinary", "historical"]

    async def get_featured_itineraries(self, limit: int = 6) -> List[Dict[str, Any]]:
        """Get featured itineraries"""
        try:
            # Get itineraries with highest ratings
            query = f"""
            SELECT i.*, v.business_name, v.rating as vendor_rating,
                   v.avatar_url as vendor_avatar
            FROM itineraries i
            JOIN vendors v ON i.vendor_id = v.id
            WHERE i.is_active = true
            ORDER BY v.rating DESC, v.total_reviews DESC
            LIMIT {limit};
            """

            response = self.supabase.rpc('exec_sql', {'query': query}).execute()
            return response.data if hasattr(response, 'data') else []
        except Exception:
            # Fallback to simple query
            response = self.supabase.table("itineraries") \
                .select("*") \
                .eq("is_active", True) \
                .limit(limit) \
                .order("created_at", desc=True) \
                .execute()

            return response.data

