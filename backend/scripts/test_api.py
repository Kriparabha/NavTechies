import requests
import json

BASE_URL = "http://localhost:8000/api/v1"


def test_auth():
    print("Testing Authentication...")

    # Test login with JSON endpoint
    login_data = {
        "email": "tourist@example.com",
        "password": "demo123"
    }

    response = requests.post(f"{BASE_URL}/auth/login-json", json=login_data)
    print(f"Login Status: {response.status_code}")

    if response.status_code == 200:
        data = response.json()
        print(f"✅ Login successful!")
        print(f"User: {data['user']['email']} ({data['user']['role']})")
        print(f"Token: {data['access_token'][:50]}...")

        token = data["access_token"]

        # Test getting current user
        headers = {"Authorization": f"Bearer {token}"}
        user_response = requests.get(f"{BASE_URL}/auth/me", headers=headers)
        print(f"\nUser Info Status: {user_response.status_code}")
        if user_response.status_code == 200:
            print(f"✅ User info retrieved successfully")

        return token
    else:
        print(f"❌ Login failed: {response.text}")
        return None


def test_itineraries():
    print("\n\nTesting Itineraries...")

    response = requests.get(f"{BASE_URL}/itineraries/")
    print(f"Itineraries Status: {response.status_code}")

    if response.status_code == 200:
        data = response.json()
        print(f"✅ Found {len(data)} itineraries")

        if data:
            # Display first itinerary
            first = data[0]
            print(f"\nFirst itinerary:")
            print(f"  Title: {first['title']}")
            print(f"  Category: {first['category']}")
            print(f"  Duration: {first['duration_minutes']} min")
            print(f"  Price: ₹{first['price_per_person']}")
            print(f"  Vendor: {first['vendor']['business_name']}")

            # Test with filters
            filtered = requests.get(f"{BASE_URL}/itineraries/?category=spiritual")
            if filtered.status_code == 200:
                spiritual = filtered.json()
                print(f"\n✅ Spiritual itineraries: {len(spiritual)} found")

            # Get single itinerary
            itinerary_id = first["id"]
            single = requests.get(f"{BASE_URL}/itineraries/{itinerary_id}")
            if single.status_code == 200:
                print(f"✅ Single itinerary retrieved successfully")
    else:
        print(f"❌ Error: {response.text}")


def test_support():
    print("\n\nTesting Support Features...")

    # Test phrasebook
    phrases = requests.get(f"{BASE_URL}/support/phrasebook")
    if phrases.status_code == 200:
        data = phrases.json()
        print(f"✅ Phrasebook: {len(data['phrases'])} phrases")
        for phrase in data["phrases"][:2]:
            print(f"  - {phrase['english_phrase']} → {phrase['assamese_phrase']}")

    # Test emergency contacts
    contacts = requests.get(f"{BASE_URL}/support/emergency-contacts")
    if contacts.status_code == 200:
        data = contacts.json()
        print(f"✅ Emergency contacts: {len(data['contacts'])} contacts")
        for contact in data["contacts"][:2]:
            print(f"  - {contact['name']}: {contact['phone']}")

    # Test translation
    translation = requests.get(f"{BASE_URL}/support/translate?text=hello")
    if translation.status_code == 200:
        data = translation.json()
        print(f"✅ Translation: '{data['original']}' → '{data['translated']}' ({data['phonetic']})")


def test_vendors():
    print("\n\nTesting Vendors...")

    response = requests.get(f"{BASE_URL}/vendors/")
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Vendors: {len(data)} vendors found")
        for vendor in data[:2]:
            print(f"  - {vendor['business_name']} ({vendor['rating']}★)")


def test_bookings(token):
    print("\n\nTesting Bookings...")

    if not token:
        print("❌ Skipping bookings test - no token")
        return

    headers = {"Authorization": f"Bearer {token}"}

    # Create a booking
    booking_data = {
        "itinerary_id": "itinerary_001",
        "vendor_id": "vendor_001",
        "booking_date": "2024-01-15",
        "start_time": "10:00:00",
        "number_of_people": 2,
        "total_amount": 2400,
        "special_requests": "Vegetarian food preference"
    }

    response = requests.post(f"{BASE_URL}/bookings/", json=booking_data, headers=headers)
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Booking created: {data['message']}")
        print(f"   Booking ID: {data['booking_id']}")

        # Get user bookings
        bookings = requests.get(f"{BASE_URL}/bookings/my-bookings?user_id=user_001", headers=headers)
        if bookings.status_code == 200:
            user_bookings = bookings.json()
            print(f"✅ User has {len(user_bookings)} bookings")
    else:
        print(f"❌ Booking failed: {response.text}")


if __name__ == "__main__":
    print("=" * 60)
    print("Testing Guwahati Heritage Experiences API")
    print("=" * 60)

    print("\nMake sure server is running: http://localhost:8000")
    print("Starting tests...\n")

    try:
        # Test authentication
        token = test_auth()

        # Test other endpoints
        test_itineraries()
        test_vendors()
        test_support()

        # Test bookings with token
        if token:
            test_bookings(token)

        print("\n" + "=" * 60)
        print("✅ All tests completed!")
        print("\n📚 API Documentation: http://localhost:8000/api/docs")
        print("\n🔑 Demo credentials:")
        print("  • tourist@example.com / demo123 (Tourist)")
        print("  • guide@example.com / demo123 (Vendor)")
        print("  • artisan@example.com / demo123 (Vendor)")
        print("  • admin@example.com / demo123 (Admin)")
        print("\n📱 Available endpoints:")
        print("  • GET /api/v1/itineraries/ - Browse experiences")
        print("  • GET /api/v1/vendors/ - View local guides")
        print("  • GET /api/v1/support/phrasebook - Assamese phrases")
        print("  • POST /api/v1/auth/login-json - Login")
        print("  • POST /api/v1/bookings/ - Book experience")
        print("=" * 60)

    except requests.exceptions.ConnectionError:
        print("\n❌ Cannot connect to server. Make sure it's running!")
        print("   Run: uvicorn app.main:app --reload --host 0.0.0.0 --port 8000")
    except Exception as e:
        print(f"\n❌ Error during testing: {e}")