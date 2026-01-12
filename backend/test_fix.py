#!/usr/bin/env python3
"""
Test script to verify the bcrypt password limit fix
"""
import sys
import traceback
from sqlmodel import Session
from src.database import get_session, engine
from src.models.user import UserCreate
from src.services.auth import create_user, validate_email, validate_password, get_password_hash

def test_password_hashing():
    print("Testing password hashing with various lengths...")

    # Test normal password
    normal_password = "ValidPass123"
    print(f"Testing normal password: {normal_password}")
    try:
        hashed = get_password_hash(normal_password)
        print(f"✓ Normal password hashed successfully")
    except Exception as e:
        print(f"✗ Error hashing normal password: {e}")
        return False

    # Test long password that should be truncated
    long_password = "A" * 80  # 80 characters, longer than bcrypt's 72 limit
    print(f"Testing long password: {len(long_password)} characters")
    try:
        hashed = get_password_hash(long_password)
        print(f"✓ Long password hashed successfully (should have been truncated)")
    except Exception as e:
        print(f"✗ Error hashing long password: {e}")
        return False

    # Test validation
    print("Testing validation...")
    is_valid_normal = validate_password(normal_password)
    print(f"Normal password validation: {is_valid_normal}")

    is_valid_long = validate_password(long_password)
    print(f"Long password validation: {is_valid_long}")

    # Test user creation with normal password
    print("Testing user creation...")
    try:
        # Get session using the generator
        session_gen = get_session()
        session = next(session_gen)
        try:
            user_create = UserCreate(email="test@example.com", password=normal_password)
            db_user = create_user(session, user_create)
            print(f"✓ User created successfully: {db_user.email}")
        finally:
            # Close the session
            session.close()
    except Exception as e:
        print(f"✗ Error creating user: {e}")
        traceback.print_exc()
        return False

    return True

if __name__ == "__main__":
    success = test_password_hashing()
    if success:
        print("\n✓ All tests passed!")
    else:
        print("\n✗ Some tests failed!")
        sys.exit(1)