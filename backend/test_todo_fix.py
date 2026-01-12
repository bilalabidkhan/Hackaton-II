import requests
import json
from datetime import datetime
import uuid

# Configuration
BASE_URL = "http://127.0.0.1:8001/api"

def test_todo_crud_operations():
    """
    Test that all CRUD operations work properly with UUID handling
    """
    print("Testing Todo App CRUD operations...")

    # Step 1: Create a test user
    print("\n1. Creating test user...")
    signup_data = {
        "email": f"test_{int(datetime.now().timestamp())}@example.com",
        "password": "TestPass123!"
    }

    try:
        response = requests.post(f"{BASE_URL}/auth/signup", json=signup_data)
        if response.status_code != 200:
            print(f"[ERROR] Signup failed: {response.text}")
            return False

        user_response = response.json()
        user_id = user_response['id']
        print(f"[SUCCESS] User created successfully with ID: {user_id}")

        # Verify it's a valid UUID
        uuid.UUID(user_id)
        print(f"[SUCCESS] User ID is valid UUID: {user_id}")

    except Exception as e:
        print(f"[ERROR] Error creating user: {e}")
        return False

    # Step 2: Sign in to get token
    print("\n2. Signing in to get token...")
    signin_data = {
        "email": signup_data['email'],
        "password": signup_data['password']
    }

    try:
        response = requests.post(f"{BASE_URL}/auth/signin", json=signin_data)
        if response.status_code != 200:
            print(f"[ERROR] Signin failed: {response.text}")
            return False

        auth_response = response.json()
        token = auth_response['access_token']
        headers = {"Authorization": f"Bearer {token}"}
        print(f"[SUCCESS] Signed in successfully, token: {token[:20]}...")

    except Exception as e:
        print(f"[ERROR] Error signing in: {e}")
        return False

    # Step 3: Create a todo
    print("\n3. Creating a todo...")
    todo_data = {
        "title": "Test Todo",
        "description": "This is a test todo item"
    }

    try:
        response = requests.post(f"{BASE_URL}/todos", json=todo_data, headers=headers)
        if response.status_code != 200:
            print(f"[ERROR] Create todo failed: {response.text}")
            return False

        created_todo = response.json()
        todo_id = created_todo['id']
        print(f"[SUCCESS] Todo created successfully with ID: {todo_id}")

        # Verify it's a valid UUID
        uuid.UUID(todo_id)
        print(f"[SUCCESS] Todo ID is valid UUID: {todo_id}")

    except Exception as e:
        print(f"[ERROR] Error creating todo: {e}")
        return False

    # Step 4: Get all todos
    print("\n4. Getting all todos...")
    try:
        response = requests.get(f"{BASE_URL}/todos", headers=headers)
        if response.status_code != 200:
            print(f"[ERROR] Get todos failed: {response.text}")
            return False

        todos_response = response.json()
        print(f"[SUCCESS] Retrieved {len(todos_response['todos'])} todos")

        if len(todos_response['todos']) == 0:
            print("[ERROR] No todos found!")
            return False

        # Verify the todo we created is in the list
        found = False
        for todo in todos_response['todos']:
            if todo['id'] == todo_id:
                found = True
                print(f"[SUCCESS] Created todo found in the list: {todo['title']}")
                break

        if not found:
            print("[ERROR] Created todo not found in the list!")
            return False

    except Exception as e:
        print(f"[ERROR] Error getting todos: {e}")
        return False

    # Step 5: Update the todo
    print("\n5. Updating the todo...")
    update_data = {
        "title": "Updated Test Todo",
        "description": "This is an updated test todo item",
        "is_completed": True
    }

    try:
        response = requests.put(f"{BASE_URL}/todos/{todo_id}", json=update_data, headers=headers)
        if response.status_code != 200:
            print(f"[ERROR] Update todo failed: {response.text}")
            return False

        updated_todo = response.json()
        print(f"[SUCCESS] Todo updated successfully: {updated_todo['title']}")
        print(f"[SUCCESS] Todo is_completed: {updated_todo['is_completed']}")

    except Exception as e:
        print(f"[ERROR] Error updating todo: {e}")
        return False

    # Step 6: Toggle completion status
    print("\n6. Toggling completion status...")
    try:
        toggle_data = {"is_completed": False}
        response = requests.patch(f"{BASE_URL}/todos/{todo_id}/complete", json=toggle_data, headers=headers)
        if response.status_code != 200:
            print(f"[ERROR] Toggle completion failed: {response.text}")
            return False

        toggled_todo = response.json()
        print(f"[SUCCESS] Todo completion toggled successfully: {toggled_todo['title']}")
        print(f"[SUCCESS] Todo is_completed: {toggled_todo['is_completed']}")

    except Exception as e:
        print(f"[ERROR] Error toggling completion: {e}")
        return False

    # Step 7: Delete the todo
    print("\n7. Deleting the todo...")
    try:
        response = requests.delete(f"{BASE_URL}/todos/{todo_id}", headers=headers)
        if response.status_code != 200:
            print(f"[ERROR] Delete todo failed: {response.text}")
            return False

        delete_response = response.json()
        print(f"[SUCCESS] Todo deleted successfully: {delete_response['message']}")

    except Exception as e:
        print(f"[ERROR] Error deleting todo: {e}")
        return False

    # Step 8: Verify todo is gone
    print("\n8. Verifying todo is gone...")
    try:
        response = requests.get(f"{BASE_URL}/todos", headers=headers)
        if response.status_code != 200:
            print(f"[ERROR] Get todos failed: {response.text}")
            return False

        todos_response = response.json()
        print(f"[SUCCESS] Retrieved {len(todos_response['todos'])} todos after deletion")

        # Verify the deleted todo is not in the list
        found_deleted = False
        for todo in todos_response['todos']:
            if todo['id'] == todo_id:
                found_deleted = True
                break

        if found_deleted:
            print("[ERROR] Deleted todo still found in the list!")
            return False
        else:
            print("[SUCCESS] Deleted todo is no longer in the list")

    except Exception as e:
        print(f"[ERROR] Error verifying deletion: {e}")
        return False

    print("\n[SUCCESS] All tests passed! The UUID handling fix is working correctly.")
    return True

if __name__ == "__main__":
    success = test_todo_crud_operations()
    if success:
        print("\n[SUCCESS] All CRUD operations work correctly with UUID handling!")
    else:
        print("\n[ERROR] Some tests failed!")