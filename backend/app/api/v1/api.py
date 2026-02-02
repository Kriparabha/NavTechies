from fastapi import APIRouter
from .endpoints import auth, itineraries, vendors, bookings, support  # Relative imports

api_router = APIRouter()

# Include all routers
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(itineraries.router, prefix="/itineraries", tags=["itineraries"])
api_router.include_router(vendors.router, prefix="/vendors", tags=["vendors"])
api_router.include_router(bookings.router, prefix="/bookings", tags=["bookings"])
api_router.include_router(support.router, prefix="/support", tags=["support"])