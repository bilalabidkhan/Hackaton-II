# Quickstart Guide: Phase I In-Memory Python Console Todo App

## Prerequisites
- Python 3.13+ installed
- UV package manager (optional, for environment management)

## Setup
1. Clone the repository
2. Navigate to the project directory
3. Ensure Python 3.13+ is available in your environment

## Running the Application
```bash
# Direct execution
python todo_main.py

# Or if using UV
uv run todo_main.py
```

## Basic Usage
1. Run the application to see the main menu
2. Select options 1-5 to perform todo operations:
   - Option 1: Add a new todo
   - Option 2: View all todos
   - Option 3: Update a todo description
   - Option 4: Delete a todo
   - Option 5: Mark a todo as complete/incomplete
3. Option 6: Exit the application

## Example Workflow
1. Start the application
2. Add a new todo item: "Buy groceries"
3. View all todos to confirm it was added
4. Mark the todo as complete
5. View all todos to see the status change
6. Exit the application

## Manual Testing Scenarios
- Add multiple todos and verify they appear in the list
- Update a todo description and verify the change
- Mark todos as complete and verify status changes
- Delete a todo and verify it's removed from the list
- Test error handling with invalid inputs