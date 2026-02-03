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


```bash
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── GradientButton.jsx
│   │   │   └── Card.jsx
│   │   ├── layout/
│   │   │   ├── Layout.jsx
│   │   │   └── Container.jsx
│   │   ├── home/
│   │   │   ├── Hero.jsx
│   │   │   ├── FeaturedItineraries.jsx
│   │   │   └── Stats.jsx
│   │   ├── itineraries/
│   │   │   ├── ItineraryCard.jsx
│   │   │   ├── ItineraryFilter.jsx
│   │   │   └── ItineraryDetail.jsx
│   │   ├── booking/
│   │   │   ├── BookingForm.jsx
│   │   │   ├── BookingCard.jsx
│   │   │   └── BookingStatus.jsx
│   │   ├── vendor/
│   │   │   ├── VendorCard.jsx
│   │   │   ├── VendorProfile.jsx
│   │   │   └── OnboardingForm.jsx
│   │   └── support/
│   │       ├── Phrasebook.jsx
│   │       ├── Translator.jsx
│   │       └── SafetyMap.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Itineraries.jsx
│   │   ├── Booking.jsx
│   │   ├── VendorDashboard.jsx
│   │   ├── Support.jsx
│   │   └── Login.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── auth.js
│   │   └── utils.js
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useApi.js
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── BookingContext.jsx
│   ├── styles/
│   │   ├── index.css
│   │   └── animations.css
│   ├── App.jsx
│   ├── index.js
│   └── routes.js
├── tailwind.config.js
├── package.json
└── README.md

