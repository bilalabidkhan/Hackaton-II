from fastapi import APIRouter, Depends, HTTPException, status, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlmodel import Session, select
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
import uuid
from ..database import get_session
from ..models.user import User, UserCreate, UserRead
from ..services.auth import create_user, authenticate_user, get_user_by_email, validate_email, validate_password
from ..api.models import TokenResponse, UserResponse
import os

router = APIRouter()

# Security scheme for Bearer token
security = HTTPBearer()

# Get secret key from environment
SECRET_KEY = os.getenv("BETTER_AUTH_SECRET", "your-default-secret-key-for-development")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Create a JWT access token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_session)):
    """Get the current user from the token"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception

        # Convert the string user_id to UUID to match the database field type
        try:
            user_uuid = uuid.UUID(user_id)
        except ValueError:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    # Fetch the user from the database
    statement = select(User).where(User.id == user_uuid)
    user = db.exec(statement).first()
    if user is None:
        raise credentials_exception
    return user

@router.post("/auth/signup", response_model=UserResponse)
def signup(user_create: UserCreate, db: Session = Depends(get_session)):
    """Create a new user account"""
    # Validate email format
    if not validate_email(user_create.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid email format"
        )

    # Validate password strength
    if not validate_password(user_create.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 8 characters with uppercase, lowercase, and number"
        )

    # Check if user already exists
    existing_user = get_user_by_email(db, user_create.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Create the new user
    db_user = create_user(db, user_create)
    return UserResponse(id=str(db_user.id), email=db_user.email)

from pydantic import BaseModel

class SigninRequest(BaseModel):
    email: str
    password: str

@router.post("/auth/signin", response_model=TokenResponse)
def signin(signin_data: SigninRequest, db: Session = Depends(get_session)):
    """Authenticate user and return token"""
    email = signin_data.email
    password = signin_data.password

    if not email or not password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email and password required"
        )

    user = authenticate_user(db, email, password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )

    # Create access token
    access_token = create_access_token(data={"sub": str(user.id)})
    return TokenResponse(access_token=access_token, token_type="bearer")


@router.get("/auth/me", response_model=UserResponse)
def get_current_user_info(current_user: User = Depends(get_current_user)):
    """Get current user information"""
    return UserResponse(id=str(current_user.id), email=current_user.email)