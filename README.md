# NavTechies
Hacakthon Projects 

```bash
backend/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── core/
│   │   ├── config.py
│   │   ├── security.py
│   │   └── dependencies.py
│   ├── api/
│   │   ├── v1/
│   │   │   ├── __init__.py
│   │   │   ├── endpoints/
│   │   │   │   ├── auth.py
│   │   │   │   ├── itineraries.py
│   │   │   │   ├── vendors.py
│   │   │   │   ├── bookings.py
│   │   │   │   ├── transactions.py
│   │   │   │   └── support.py
│   │   │   └── api.py
│   ├── models/
│   │   ├── user.py
│   │   ├── itinerary.py
│   │   ├── vendor.py
│   │   ├── booking.py
│   │   └── transaction.py
│   ├── schemas/
│   │   ├── user.py
│   │   ├── itinerary.py
│   │   ├── vendor.py
│   │   ├── booking.py
│   │   └── transaction.py
│   ├── services/
│   │   ├── auth_service.py
│   │   ├── itinerary_service.py
│   │   ├── booking_service.py
│   │   ├── payment_service.py
│   │   └── translation_service.py
│   └── utils/
│       ├── geolocation.py
│       ├── validation.py
│       └── helpers.py
├── tests/
├── requirements.txt
├── Dockerfile
└── .env
