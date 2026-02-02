from fastapi import APIRouter, HTTPException, status
from datetime import datetime, timedelta
import jwt
from backend.app.core.config import settings

router = APIRouter()

# Demo users
DEMO_USERS = {
    "tourist@example.com": {
        "id": "user_001",
        "email": "tourist@example.com",
        "full_name": "Raj Sharma",
        "role": "tourist",
        "password": "demo123",
        "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=Raj"
    },
    "guide@example.com": {
        "id": "user_002",
        "email": "guide@example.com",
        "full_name": "Arun Das",
        "role": "vendor",
        "password": "demo123",
        "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=Arun"
    },
    "admin@example.com": {
        "id": "user_003",
        "email": "admin@example.com",
        "full_name": "Admin User",
        "role": "admin",
        "password": "demo123",
        "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
    }
}


@router.post("/login")
async def login(email: str, password: str):
    """Login endpoint"""

    if email not in DEMO_USERS:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found. Use demo credentials: tourist@example.com, guide@example.com, admin@example.com"
        )

    user = DEMO_USERS[email]

    if user["password"] != password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password. Use 'demo123' for demo users"
        )

    # Create JWT token
    token_data = {
        "sub": user["id"],
        "email": user["email"],
        "role": user["role"],
        "name": user["full_name"],
        "exp": datetime.utcnow() + timedelta(days=7)
    }

    token = jwt.encode(
        token_data,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )

    # Remove password from response
    user_response = user.copy()
    del user_response["password"]

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user_response
    }


@router.post("/login-json")
async def login_json(data: dict):
    """Login with JSON body"""
    email = data.get("email", "")
    password = data.get("password", "")
    return await login(email, password)


@router.get("/demo-credentials")
async def demo_credentials():
    """Get demo credentials"""
    credentials = []
    for email, user in DEMO_USERS.items():
        credentials.append({
            "email": email,
            "password": user["password"],
            "role": user["role"],
            "name": user["full_name"]
        })

    return {
        "message": "Demo credentials for testing",
        "credentials": credentials
    }