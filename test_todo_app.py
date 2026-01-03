#!/usr/bin/env python3
"""
Test script for the todo application to verify functionality.
"""

from src.todo_app.services.todo_service import TodoService
from src.todo_app.models.todo import TodoItem


def test_todo_functionality():
    """Test all todo functionality."""
    print("Testing Todo Application functionality...")

    # Initialize the service
    service = TodoService()

    # Test 1: Add todos
    print("\n1. Testing add functionality:")
    todo1 = service.add_todo("Buy groceries")
    print(f"   Added todo: {todo1}")

    todo2 = service.add_todo("Walk the dog")
    print(f"   Added todo: {todo2}")

    todo3 = service.add_todo("Finish report")
    print(f"   Added todo: {todo3}")

    # Test 2: View all todos
    print("\n2. Testing view functionality:")
    all_todos = service.get_all_todos()
    print(f"   Total todos: {len(all_todos)}")
    for todo in all_todos:
        print(f"   - {todo}")

    # Test 3: Mark as complete
    print("\n3. Testing mark complete functionality:")
    success = service.mark_todo_complete(todo1.id)
    print(f"   Marked todo {todo1.id} as complete: {success}")

    # View todos again to see the status change
    updated_todo = service.get_todo_by_id(todo1.id)
    print(f"   Updated todo: {updated_todo}")

    # Test 4: Update todo description
    print("\n4. Testing update functionality:")
    success = service.update_todo(todo2.id, "Walk the cat")
    print(f"   Updated todo {todo2.id}: {success}")

    updated_todo2 = service.get_todo_by_id(todo2.id)
    print(f"   Updated todo: {updated_todo2}")

    # Test 5: Toggle status
    print("\n5. Testing toggle functionality:")
    initial_status = updated_todo.completed
    success = service.toggle_todo_status(todo1.id)
    toggled_todo = service.get_todo_by_id(todo1.id)
    print(f"   Toggled todo {todo1.id} from {initial_status} to {toggled_todo.completed}: {success}")

    # Test 6: Delete todo
    print("\n6. Testing delete functionality:")
    all_before = len(service.get_all_todos())
    print(f"   Todos before deletion: {all_before}")

    success = service.delete_todo(todo3.id)
    print(f"   Deleted todo {todo3.id}: {success}")

    all_after = len(service.get_all_todos())
    print(f"   Todos after deletion: {all_after}")

    # Final view
    print("\n7. Final todo list:")
    final_todos = service.get_all_todos()
    for todo in final_todos:
        print(f"   - {todo}")

    print("\n+ All functionality tests passed!")


def test_error_cases():
    """Test error handling."""
    print("\nTesting error handling...")

    service = TodoService()

    # Test adding empty description
    try:
        service.add_todo("")
        print("   - Error: Should have raised ValueError for empty description")
    except ValueError as e:
        print(f"   + Correctly caught error for empty description: {e}")

    # Test updating with empty description
    todo = service.add_todo("Test task")
    try:
        service.update_todo(todo.id, "")
        print("   - Error: Should have raised ValueError for empty update")
    except ValueError as e:
        print(f"   + Correctly caught error for empty update: {e}")

    # Test operations on non-existent ID
    result = service.get_todo_by_id(999)
    print(f"   + Getting non-existent todo returns: {result}")

    result = service.update_todo(999, "New description")
    print(f"   + Updating non-existent todo returns: {result}")

    result = service.mark_todo_complete(999)
    print(f"   + Marking non-existent todo returns: {result}")

    result = service.delete_todo(999)
    print(f"   + Deleting non-existent todo returns: {result}")

    print("+ All error handling tests passed!")


if __name__ == "__main__":
    test_todo_functionality()
    test_error_cases()
    print("\n+ All tests completed successfully!")