#!/usr/bin/env python3
"""
Debug script to test the auth functionality and identify the error
"""
import sys
import traceback
from sqlmodel import Session
from src.database import get_session, engine
from src.models.user import UserCreate
from src.services.auth import create_user, validate_email, validate_password

def test_auth_functionality():
    print("Testing auth functionality...")

    # Test email validation
    print("Testing email validation...")
    test_email = "test@example.com"
    is_valid_email = validate_email(test_email)
    print(f"Email {test_email} is valid: {is_valid_email}")

    # Test password validation
    print("Testing password validation...")
    test_password = "TestPass123"
    is_valid_password = validate_password(test_password)
    print(f"Password {test_password} is valid: {is_valid_password}")

    # Test a long password to verify the limit
    long_password = "A" * 80  # This should fail validation
    is_valid_long = validate_password(long_password)
    print(f"Long password (80 chars) is valid: {is_valid_long}")

    # Test user creation with a valid password
    print("Testing user creation...")
    try:
        # Get session using the generator
        session_gen = get_session()
        session = next(session_gen)
        try:
            # Use a valid password for user creation
            valid_password = "ValidPass123"
            user_create = UserCreate(email=test_email, password=valid_password)
            db_user = create_user(session, user_create)
            print(f"User created successfully: {db_user.email}")
        finally:
            # Close the session
            session.close()
    except Exception as e:
        print(f"Error creating user: {e}")
        traceback.print_exc()
        return False

    return True

if __name__ == "__main__":
    test_auth_functionality()