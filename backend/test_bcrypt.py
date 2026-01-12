#!/usr/bin/env python3
"""
Test bcrypt functionality directly
"""
from passlib.context import CryptContext

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def test_bcrypt():
    print("Testing bcrypt directly...")

    # Test with a short password
    short_password = "ValidPass123"
    try:
        hashed = pwd_context.hash(short_password)
        print(f"✓ Short password hashed successfully")
    except Exception as e:
        print(f"✗ Error with short password: {e}")
        return False

    # Test with a long password (73 characters, over the limit)
    long_password = "A" * 73  # 73 characters, which is over bcrypt's 72 character limit
    try:
        hashed = pwd_context.hash(long_password)
        print(f"✓ Long password hashed successfully")
    except ValueError as e:
        if "72 bytes" in str(e):
            print(f"✗ Long password failed as expected: {e}")
            # This is expected behavior, so we need to handle it
        else:
            print(f"✗ Unexpected error with long password: {e}")
            return False
    except Exception as e:
        print(f"✗ Unexpected error with long password: {e}")
        return False

    # Test with a 72-character password (at the limit)
    max_password = "A" * 72  # 72 characters, at the bcrypt limit
    try:
        hashed = pwd_context.hash(max_password)
        print(f"✓ Max-length password hashed successfully")
    except Exception as e:
        print(f"✗ Error with max-length password: {e}")
        return False

    return True

if __name__ == "__main__":
    test_bcrypt()