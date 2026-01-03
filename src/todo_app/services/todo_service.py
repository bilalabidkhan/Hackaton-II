"""
Todo service layer for business logic operations.
"""

from typing import List, Optional
from src.todo_app.models.todo import TodoItem, TodoCollection


class TodoService:
    """
    Service layer for todo operations, implementing business logic.
    """

    def __init__(self):
        """Initialize the todo service with an empty collection."""
        self.collection = TodoCollection()

    def add_todo(self, description: str) -> TodoItem:
        """
        Add a new todo item.

        Args:
            description: Description of the task

        Returns:
            The newly created TodoItem

        Raises:
            ValueError: If description is empty or contains only whitespace
        """
        if not description or not description.strip():
            raise ValueError("Description cannot be empty or contain only whitespace")

        return self.collection.add_item(description)

    def get_all_todos(self) -> List[TodoItem]:
        """
        Get all todo items.

        Returns:
            List of all TodoItems
        """
        return self.collection.get_all_items()

    def get_todo_by_id(self, item_id: int) -> Optional[TodoItem]:
        """
        Get a todo item by its ID.

        Args:
            item_id: ID of the todo item to retrieve

        Returns:
            The TodoItem if found, None otherwise
        """
        return self.collection.get_item_by_id(item_id)

    def update_todo(self, item_id: int, new_description: str) -> bool:
        """
        Update the description of a todo item.

        Args:
            item_id: ID of the todo item to update
            new_description: New description for the todo item

        Returns:
            True if the item was updated, False if item was not found

        Raises:
            ValueError: If new_description is empty or contains only whitespace
        """
        if not new_description or not new_description.strip():
            raise ValueError("Description cannot be empty or contain only whitespace")

        return self.collection.update_item(item_id, new_description)

    def mark_todo_complete(self, item_id: int, completed: bool = True) -> bool:
        """
        Mark a todo item as complete or incomplete.

        Args:
            item_id: ID of the todo item to update
            completed: Whether the item should be marked as completed (defaults to True)

        Returns:
            True if the item was updated, False if item was not found
        """
        return self.collection.mark_complete(item_id, completed)

    def delete_todo(self, item_id: int) -> bool:
        """
        Delete a todo item.

        Args:
            item_id: ID of the todo item to delete

        Returns:
            True if the item was deleted, False if item was not found
        """
        return self.collection.delete_item(item_id)

    def toggle_todo_status(self, item_id: int) -> bool:
        """
        Toggle the completion status of a todo item.

        Args:
            item_id: ID of the todo item to toggle

        Returns:
            True if the item status was toggled, False if item was not found
        """
        item = self.collection.get_item_by_id(item_id)
        if item:
            # Toggle the completion status
            return self.collection.mark_complete(item_id, not item.completed)
        return False