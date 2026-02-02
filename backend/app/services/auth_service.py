from typing import Optional, Dict, Any
from datetime import datetime, timedelta
import jwt
from backend.app.core.config import settings
from passlib.context import CryptContext


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

class AuthService:
    def __init__(self):
        # For demo, we'll use mock data
        pass

    def authenticate_user(self, email: str, password: str) -> Optional[Dict[str, Any]]:
        """Authenticate user with email and password"""
        # Mock users for demo
        demo_users = {
            "tourist@example.com": {
                "id": "user_001",
                "email": "tourist@example.com",
                "full_name": "Raj Sharma",
                "role": "tourist",
                "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=Raj",
                "created_at": "2024-01-01T00:00:00",
                "updated_at": "2024-01-01T00:00:00"
            },
            "guide@example.com": {
                "id": "user_002",
                "email": "guide@example.com",
                "full_name": "Arun Das",
                "role": "vendor",
                "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=Arun",
                "created_at": "2024-01-01T00:00:00",
                "updated_at": "2024-01-01T00:00:00"
            },
            "artisan@example.com": {
                "id": "user_003",
                "email": "artisan@example.com",
                "full_name": "Priya Devi",
                "role": "vendor",
                "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
                "created_at": "2024-01-01T00:00:00",
                "updated_at": "2024-01-01T00:00:00"
            },
            "admin@example.com": {
                "id": "user_004",
                "email": "admin@example.com",
                "full_name": "Admin User",
                "role": "admin",
                "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
                "created_at": "2024-01-01T00:00:00",
                "updated_at": "2024-01-01T00:00:00"
            }
        }

        # Demo password for all users
        if email in demo_users and password == "demo123":
            return demo_users[email]

        return None

    def get_user_by_id(self, user_id: str) -> Optional[Dict[str, Any]]:
        """Get user by ID"""
        # Mock users for demo
        users = {
            "user_001": {
                "id": "user_001",
                "email": "tourist@example.com",
                "full_name": "Raj Sharma",
                "role": "tourist",
                "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=Raj",
                "created_at": "2024-01-01T00:00:00",
                "updated_at": "2024-01-01T00:00:00"
            },
            "user_002": {
                "id": "user_002",
                "email": "guide@example.com",
                "full_name": "Arun Das",
                "role": "vendor",
                "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=Arun",
                "created_at": "2024-01-01T00:00:00",
                "updated_at": "2024-01-01T00:00:00"
            },
            "user_003": {
                "id": "user_003",
                "email": "artisan@example.com",
                "full_name": "Priya Devi",
                "role": "vendor",
                "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
                "created_at": "2024-01-01T00:00:00",
                "updated_at": "2024-01-01T00:00:00"
            },
            "user_004": {
                "id": "user_004",
                "email": "admin@example.com",
                "full_name": "Admin User",
                "role": "admin",
                "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
                "created_at": "2024-01-01T00:00:00",
                "updated_at": "2024-01-01T00:00:00"
            }
        }

        return users.get(user_id)

    def create_access_token_for_user(self, user: Dict[str, Any]) -> str:
        """Create JWT token for user"""
        # Token expires in 7 days
        expire = datetime.utcnow() + timedelta(days=7)

        token_data = {
            "sub": user["id"],
            "email": user["email"],
            "role": user.get("role", "tourist"),
            "name": user.get("full_name", ""),
            "exp": expire
        }

        # Create JWT token
        token = jwt.encode(
            token_data,
            settings.SECRET_KEY,
            algorithm=settings.ALGORITHM
        )

        return token

    def verify_token(self, token: str) -> Optional[Dict[str, Any]]:
        """Verify JWT token"""
        try:
            payload = jwt.decode(
                token,
                settings.SECRET_KEY,
                algorithms=[settings.ALGORITHM]
            )
            return payload
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None