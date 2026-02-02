from fastapi import APIRouter, Query
from typing import List, Optional

router = APIRouter()

# Mock itineraries data
ITINERARIES = [
    {
        "id": "it_001",
        "title": "Kamakhya Temple Heritage Walk",
        "description": "Explore the sacred Kamakhya Temple, one of the oldest Shakti Peethas with panoramic views of Guwahati and the Brahmaputra River.",
        "duration_minutes": 120,
        "category": "spiritual",
        "difficulty": "easy",
        "price_per_person": 800,
        "max_group_size": 8,
        "meeting_point": {"lat": 26.1665, "lng": 91.7065},
        "meeting_address": "Kamakhya Temple Main Gate, Nilachal Hill, Guwahati",
        "highlights": [
            "Guided temple tour with historical insights",
            "Panoramic river view from Nilachal Hill",
            "Traditional Assamese prasad tasting"
        ],
        "vendor": {
            "id": "vendor_001",
            "business_name": "Heritage Walks Assam",
            "rating": 4.8,
            "total_reviews": 124
        },
        "is_active": True,
        "created_at": "2024-01-01T09:00:00",
        "image_url": "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?w=800"
    },
    {
        "id": "it_002",
        "title": "Brahmaputra Riverfront Experience",
        "description": "A serene boat ride to Umananda Island followed by a walk along the Brahmaputra riverfront, witnessing local life and sunset views.",
        "duration_minutes": 90,
        "category": "nature",
        "difficulty": "easy",
        "price_per_person": 600,
        "max_group_size": 6,
        "meeting_point": {"lat": 26.1839, "lng": 91.7464},
        "meeting_address": "Brahmaputra Riverfront near Kachari Ghat, Guwahati",
        "highlights": [
            "Traditional boat ride on Brahmaputra",
            "Visit to Umananda Temple",
            "Golden langur spotting"
        ],
        "vendor": {
            "id": "vendor_002",
            "business_name": "River Brahmaputra Experiences",
            "rating": 4.9,
            "total_reviews": 89
        },
        "is_active": True,
        "created_at": "2024-01-01T10:00:00",
        "image_url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"
    },
    {
        "id": "it_003",
        "title": "Assamese Silk Weaving Demonstration",
        "description": "Visit a local weaver's home to witness traditional Muga and Pat silk weaving, try basic weaving, and shop authentic handicrafts.",
        "duration_minutes": 60,
        "category": "cultural",
        "difficulty": "easy",
        "price_per_person": 400,
        "max_group_size": 4,
        "meeting_point": {"lat": 26.1700, "lng": 91.7500},
        "meeting_address": "Sualkuchi Silk Village",
        "vendor": {
            "id": "vendor_003",
            "business_name": "Silk Weavers Collective",
            "rating": 4.7,
            "total_reviews": 67
        },
        "is_active": True,
        "created_at": "2024-01-01T11:00:00",
        "image_url": "https://images.unsplash.com/photo-1566206091558-7f218b696731?w=800"
    }
]


@router.get("/")
async def get_itineraries(
        category: Optional[str] = Query(None),
        search: Optional[str] = Query(None),
        limit: int = Query(10, le=50),
        offset: int = Query(0, ge=0)
):
    """Get itineraries with filters"""
    filtered = ITINERARIES.copy()

    if category:
        filtered = [i for i in filtered if i["category"] == category]

    if search:
        search_lower = search.lower()
        filtered = [
            i for i in filtered
            if search_lower in i["title"].lower() or search_lower in i["description"].lower()
        ]

    # Apply pagination
    start = offset
    end = offset + limit
    return filtered[start:end]


@router.get("/featured")
async def get_featured_itineraries(limit: int = Query(6, le=20)):
    """Get featured itineraries"""
    return ITINERARIES[:limit]


@router.get("/{itinerary_id}")
async def get_itinerary(itinerary_id: str):
    """Get itinerary by ID"""
    for itinerary in ITINERARIES:
        if itinerary["id"] == itinerary_id:
            return itinerary

    return {"error": "Itinerary not found", "id": itinerary_id}


@router.get("/categories")
async def get_categories():
    """Get list of itinerary categories"""
    categories = list(set([i["category"] for i in ITINERARIES]))
    return {"categories": categories}