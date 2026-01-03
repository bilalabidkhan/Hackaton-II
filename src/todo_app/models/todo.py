"""
Todo data models for the in-memory todo application.
"""

from typing import List, Optional


class TodoItem:
    """
    Represents a single todo item with id, description, and completion status.
    """

    def __init__(self, id: int, description: str, completed: bool = False):
        """
        Initialize a TodoItem.

        Args:
            id: Unique identifier for the todo item
            description: Description of the task
            completed: Whether the task is completed (defaults to False)
        """
        if not description or not description.strip():
            raise ValueError("Description cannot be empty or contain only whitespace")

        self.id = id
        self.description = description.strip()
        self.completed = completed

    def __str__(self):
        """String representation of the todo item."""
        status = "X" if self.completed else "O"
        return f"[{status}] {self.id}: {self.description}"

    def __repr__(self):
        """Developer-friendly representation of the todo item."""
        return f"TodoItem(id={self.id}, description='{self.description}', completed={self.completed})"


class TodoCollection:
    """
    Manages a collection of TodoItem objects in memory.
    """

    def __init__(self):
        """Initialize an empty todo collection."""
        self.items: List[TodoItem] = []
        self.next_id = 1

    def add_item(self, description: str) -> TodoItem:
        """
        Add a new todo item to the collection.

        Args:
            description: Description of the task

        Returns:
            The newly created TodoItem
        """
        if not description or not description.strip():
            raise ValueError("Description cannot be empty or contain only whitespace")

        todo_item = TodoItem(id=self.next_id, description=description)
        self.items.append(todo_item)
        self.next_id += 1
        return todo_item

    def get_all_items(self) -> List[TodoItem]:
        """
        Get all todo items in the collection.

        Returns:
            List of all TodoItems
        """
        return self.items.copy()

    def get_item_by_id(self, item_id: int) -> Optional[TodoItem]:
        """
        Get a todo item by its ID.

        Args:
            item_id: ID of the todo item to retrieve

        Returns:
            The TodoItem if found, None otherwise
        """
        for item in self.items:
            if item.id == item_id:
                return item
        return None

    def update_item(self, item_id: int, new_description: str) -> bool:
        """
        Update the description of a todo item.

        Args:
            item_id: ID of the todo item to update
            new_description: New description for the todo item

        Returns:
            True if the item was updated, False if item was not found
        """
        if not new_description or not new_description.strip():
            raise ValueError("Description cannot be empty or contain only whitespace")

        for item in self.items:
            if item.id == item_id:
                item.description = new_description.strip()
                return True
        return False

    def mark_complete(self, item_id: int, completed: bool = True) -> bool:
        """
        Mark a todo item as complete or incomplete.

        Args:
            item_id: ID of the todo item to update
            completed: Whether the item should be marked as completed (defaults to True)

        Returns:
            True if the item was updated, False if item was not found
        """
        for item in self.items:
            if item.id == item_id:
                item.completed = completed
                return True
        return False

    def delete_item(self, item_id: int) -> bool:
        """
        Delete a todo item from the collection.

        Args:
            item_id: ID of the todo item to delete

        Returns:
            True if the item was deleted, False if item was not found
        """
        for i, item in enumerate(self.items):
            if item.id == item_id:
                del self.items[i]
                return True
        return False