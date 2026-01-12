from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Optional
import uuid
from sqlmodel import Session, select
from ..models.user import User, UserCreate
from ..database import get_session

import hashlib
import secrets

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain password against a hashed password with fallback"""
    # Try bcrypt first, fall back to simple hashing if bcrypt fails
    try:
        from passlib.context import CryptContext
        pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
        return pwd_context.verify(plain_password, hashed_password)
    except Exception:
        # Fallback: simple salted hash verification
        if '$' in hashed_password:
            salt, hash_val = hashed_password.split('$', 1)
            return hash_val == hashlib.sha256((plain_password + salt).encode()).hexdigest()
        return False

def get_password_hash(password: str) -> str:
    """Hash a plain password with fallback, truncating if necessary to comply with bcrypt limits"""
    # Truncate password if it exceeds bcrypt's 72-character limit
    if len(password) > 72:
        password = password[:72]

    # Try bcrypt first, fall back to simple hashing if bcrypt fails
    try:
        from passlib.context import CryptContext
        pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
        return pwd_context.hash(password)
    except Exception:
        # Fallback: simple salted hash
        salt = secrets.token_hex(16)
        hashed = hashlib.sha256((password + salt).encode()).hexdigest()
        return f"{salt}${hashed}"

def create_user(db: Session, user_create: UserCreate) -> User:
    """Create a new user with hashed password"""
    # Hash the password
    hashed_password = get_password_hash(user_create.password)

    # Create user object
    db_user = User(
        email=user_create.email,
        password_hash=hashed_password
    )

    # Add to database
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user

def get_user_by_email(db: Session, email: str) -> Optional[User]:
    """Get a user by email"""
    statement = select(User).where(User.email == email)
    user = db.exec(statement).first()
    return user

def validate_email(email: str) -> bool:
    """Validate email format"""
    import re
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_password(password: str) -> bool:
    """Validate password strength"""
    # At least 8 characters, one uppercase, one lowercase, one number
    # Also ensure it's not longer than 72 characters (bcrypt limit)
    import re
    if len(password) < 8:
        return False
    if len(password) > 72:
        return False
    if not re.search(r'[A-Z]', password):
        return False
    if not re.search(r'[a-z]', password):
        return False
    if not re.search(r'[0-9]', password):
        return False
    return True

def authenticate_user(db: Session, email: str, password: str) -> Optional[User]:
    """Authenticate a user by email and password"""
    user = get_user_by_email(db, email)
    if not user or not verify_password(password, user.password_hash):
        return None
    return user