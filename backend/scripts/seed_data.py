import sys
import os
from pathlib import Path
from supabase import create_client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


class DemoDataSeeder:
    def __init__(self):
        # Use SERVICE ROLE KEY to bypass RLS
        self.supabase = create_client(
            os.getenv("SUPABASE_URL"),
            os.getenv("SUPABASE_SERVICE_ROLE_KEY")  # CRITICAL: Use service role
        )
        print("Connected to Supabase with service role key")

    def seed_users(self):
        """Seed demo users"""
        print("\n=== Seeding Users ===")

        # First, create auth users (if using Supabase Auth)
        # Note: You need to use Supabase Auth API for creating users with password
        # For demo, we'll insert directly into users table

        demo_users = [
            {
                "email": "tourist@example.com",
                "phone": "+919876543210",
                "full_name": "Raj Sharma",
                "role": "tourist"
            },
            {
                "email": "guide@example.com",
                "phone": "+919876543211",
                "full_name": "Arun Das",
                "role": "vendor"
            },
            {
                "email": "artisan@example.com",
                "phone": "+919876543212",
                "full_name": "Priya Devi",
                "role": "vendor"
            },
            {
                "email": "admin@example.com",
                "phone": "+919876543213",
                "full_name": "Admin User",
                "role": "admin"
            }
        ]

        user_ids = []
        for user in demo_users:
            try:
                # Check if user exists
                existing = self.supabase.table("users") \
                    .select("id") \
                    .eq("email", user["email"]) \
                    .execute()

                if existing.data:
                    print(f"✓ User already exists: {user['email']}")
                    user_ids.append(existing.data[0]["id"])
                else:
                    response = self.supabase.table("users").insert(user).execute()
                    if response.data:
                        user_ids.append(response.data[0]["id"])
                        print(f"✓ Created user: {user['email']}")
            except Exception as e:
                print(f"✗ Error creating user {user['email']}: {e}")

        return user_ids

    def seed_vendors(self, user_ids):
        """Seed demo vendors"""
        print("\n=== Seeding Vendors ===")

        DEMO_VENDORS = [
            {
                "user_id": user_ids[1] if len(user_ids) > 1 else None,
                "business_name": "Heritage Walks Assam",
                "description": "Certified heritage guide with 8+ years experience specializing in temple tours and historical walks.",
                "expertise": ["spiritual", "historical", "cultural"],
                "languages": ["English", "Hindi", "Assamese"],
                "experience_years": 8,
                "hourly_rate": 800,
                "rating": 4.8,
                "total_reviews": 124,
                "verification_status": "verified",
                "is_available": True
            },
            {
                "user_id": user_ids[2] if len(user_ids) > 2 else None,
                "business_name": "River Brahmaputra Experiences",
                "description": "Local boat operator and river guide with deep knowledge of Brahmaputra ecosystems.",
                "expertise": ["nature", "adventure", "photography"],
                "languages": ["Assamese", "English"],
                "experience_years": 12,
                "hourly_rate": 600,
                "rating": 4.9,
                "total_reviews": 89,
                "verification_status": "verified",
                "is_available": True
            }
        ]

        vendor_ids = []
        for vendor in DEMO_VENDORS:
            try:
                response = self.supabase.table("vendors").insert(vendor).execute()
                if response.data:
                    vendor_ids.append(response.data[0]["id"])
                    print(f"✓ Created vendor: {vendor['business_name']}")
            except Exception as e:
                print(f"✗ Error creating vendor: {e}")

        return vendor_ids

    def seed_itineraries(self, vendor_ids):
        """Seed demo itineraries"""
        print("\n=== Seeding Itineraries ===")

        DEMO_ITINERARIES = [
            {
                "title": "Kamakhya Temple Heritage Walk",
                "description": "Explore the sacred Kamakhya Temple with panoramic views.",
                "duration_minutes": 120,
                "category": "spiritual",
                "price_per_person": 800,
                "max_group_size": 6,
                "meeting_point": "POINT(91.7065 26.1665)",
                "meeting_address": "Kamakhya Temple Main Gate",
                "highlights": ["Temple tour", "River views", "Prasad tasting"],
                "vendor_id": vendor_ids[0] if vendor_ids else None,
                "is_active": True
            },
            {
                "title": "Brahmaputra River Experience",
                "description": "Boat ride to Umananda Island with riverfront walk.",
                "duration_minutes": 90,
                "category": "nature",
                "price_per_person": 600,
                "max_group_size": 4,
                "meeting_point": "POINT(91.7464 26.1839)",
                "meeting_address": "Kachari Ghat, Guwahati",
                "highlights": ["Boat ride", "Island temple", "Sunset views"],
                "vendor_id": vendor_ids[1] if len(vendor_ids) > 1 else None,
                "is_active": True
            }
        ]

        itinerary_ids = []
        for itinerary in DEMO_ITINERARIES:
            try:
                response = self.supabase.table("itineraries").insert(itinerary).execute()
                if response.data:
                    itinerary_ids.append(response.data[0]["id"])
                    print(f"✓ Created itinerary: {itinerary['title']}")
            except Exception as e:
                print(f"✗ Error creating itinerary: {e}")

        return itinerary_ids

    def run_seed(self):
        """Run complete seeding process"""
        print("🚀 Starting demo data seeding...")

        try:
            # Seed in order (respecting foreign keys)
            user_ids = self.seed_users()
            vendor_ids = self.seed_vendors(user_ids)
            itinerary_ids = self.seed_itineraries(vendor_ids)

            print("\n" + "=" * 50)
            print("✅ DEMO DATA SEEDED SUCCESSFULLY!")
            print(f"   Users: {len(user_ids)}")
            print(f"   Vendors: {len(vendor_ids)}")
            print(f"   Itineraries: {len(itinerary_ids)}")
            print("=" * 50)

        except Exception as e:
            print(f"\n❌ ERROR: {str(e)}")
            import traceback
            traceback.print_exc()


def main():
    """Main function"""
    print("Guwahati Heritage Experiences - Data Seeder")
    print("=" * 50)

    # Check environment variables
    required_vars = ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"]
    missing_vars = [var for var in required_vars if not os.getenv(var)]

    if missing_vars:
        print(f"❌ Missing environment variables: {', '.join(missing_vars)}")
        print("Please create a .env file with:")
        print("SUPABASE_URL=your-project-url")
        print("SUPABASE_SERVICE_ROLE_KEY=your-service-role-key")
        return

    # Run seeder
    seeder = DemoDataSeeder()
    seeder.run_seed()


if __name__ == "__main__":
    main()