"""
CLI interface for the todo application.
"""

from typing import Optional
from src.todo_app.services.todo_service import TodoService


class TodoCLI:
    """
    Command-line interface for the todo application.
    """

    def __init__(self):
        """Initialize the CLI with a todo service."""
        self.service = TodoService()

    def display_menu(self):
        """Display the main menu options."""
        print("\n" + "="*40)
        print("TODO APPLICATION")
        print("="*40)
        print("1. Add a new todo")
        print("2. View all todos")
        print("3. Mark todo as complete/incomplete")
        print("4. Update todo description")
        print("5. Delete a todo")
        print("6. Exit")
        print("="*40)

    def get_user_choice(self) -> int:
        """
        Get the user's menu choice.

        Returns:
            The user's choice as an integer
        """
        try:
            choice = int(input("Enter your choice (1-6): "))
            return choice
        except ValueError:
            print("Invalid input. Please enter a number between 1 and 6.")
            return -1

    def add_todo(self):
        """Add a new todo item."""
        description = input("Enter the todo description: ").strip()
        if not description:
            print("Error: Description cannot be empty.")
            return

        try:
            todo = self.service.add_todo(description)
            print(f"Successfully added todo: '{todo.description}' with ID {todo.id}")
        except ValueError as e:
            print(f"Error: {e}")

    def view_todos(self):
        """View all todo items."""
        todos = self.service.get_all_todos()
        if not todos:
            print("No todos found.")
            return

        print("\nYour todos:")
        for todo in todos:
            status = "✓" if todo.completed else "○"
            print(f"  [{status}] ID: {todo.id} - {todo.description}")

    def mark_todo_complete(self):
        """Mark a todo item as complete or incomplete."""
        if not self._has_todos():
            return

        try:
            item_id = int(input("Enter the ID of the todo to mark: "))
            current_todo = self.service.get_todo_by_id(item_id)
            if not current_todo:
                print(f"Error: No todo found with ID {item_id}")
                return

            # Toggle the status
            success = self.service.toggle_todo_status(item_id)
            if success:
                updated_todo = self.service.get_todo_by_id(item_id)
                status = "completed" if updated_todo.completed else "incomplete"
                print(f"Todo ID {item_id} marked as {status}")
            else:
                print(f"Error: Failed to update todo with ID {item_id}")
        except ValueError:
            print("Error: Please enter a valid ID number.")

    def update_todo(self):
        """Update a todo item's description."""
        if not self._has_todos():
            return

        try:
            item_id = int(input("Enter the ID of the todo to update: "))
            current_todo = self.service.get_todo_by_id(item_id)
            if not current_todo:
                print(f"Error: No todo found with ID {item_id}")
                return

            new_description = input(f"Enter new description (current: '{current_todo.description}'): ").strip()
            if not new_description:
                print("Error: Description cannot be empty.")
                return

            success = self.service.update_todo(item_id, new_description)
            if success:
                print(f"Successfully updated todo with ID {item_id}")
            else:
                print(f"Error: Failed to update todo with ID {item_id}")
        except ValueError:
            print("Error: Please enter a valid ID number.")

    def delete_todo(self):
        """Delete a todo item."""
        if not self._has_todos():
            return

        try:
            item_id = int(input("Enter the ID of the todo to delete: "))
            current_todo = self.service.get_todo_by_id(item_id)
            if not current_todo:
                print(f"Error: No todo found with ID {item_id}")
                return

            confirm = input(f"Are you sure you want to delete '{current_todo.description}'? (y/N): ")
            if confirm.lower() in ['y', 'yes']:
                success = self.service.delete_todo(item_id)
                if success:
                    print(f"Successfully deleted todo with ID {item_id}")
                else:
                    print(f"Error: Failed to delete todo with ID {item_id}")
            else:
                print("Deletion cancelled.")
        except ValueError:
            print("Error: Please enter a valid ID number.")

    def _has_todos(self) -> bool:
        """
        Check if there are any todos and display message if none found.

        Returns:
            True if there are todos, False otherwise
        """
        if not self.service.get_all_todos():
            print("No todos found. Please add some todos first.")
            return False
        return True

    def run(self):
        """Run the main application loop."""
        print("Welcome to the Todo Application!")
        while True:
            self.display_menu()
            choice = self.get_user_choice()

            if choice == 1:
                self.add_todo()
            elif choice == 2:
                self.view_todos()
            elif choice == 3:
                self.mark_todo_complete()
            elif choice == 4:
                self.update_todo()
            elif choice == 5:
                self.delete_todo()
            elif choice == 6:
                print("Thank you for using the Todo Application. Goodbye!")
                break
            else:
                print("Invalid choice. Please enter a number between 1 and 6.")

            # Pause to let user see the result before showing menu again
            input("\nPress Enter to continue...")