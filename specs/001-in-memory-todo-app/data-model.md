# Data Model: Phase I In-Memory Python Console Todo App

## TodoItem Entity

### Attributes
- **id**: Integer (auto-generated unique identifier)
- **description**: String (non-empty text describing the task)
- **completed**: Boolean (status indicating if the task is completed)

### Validations
- Description must not be empty or contain only whitespace
- ID must be unique within the application session
- Completed status defaults to False when creating new items

### State Transitions
- New TodoItem: `completed = False`
- When marked complete: `completed = True`
- When marked incomplete: `completed = False`

## TodoCollection Entity

### Attributes
- **items**: List of TodoItem objects
- **next_id**: Integer (auto-incrementing counter for ID generation)

### Operations
- Add TodoItem to collection
- Remove TodoItem by ID
- Update TodoItem description by ID
- Mark TodoItem as complete/incomplete by ID
- Retrieve all TodoItems
- Retrieve TodoItem by ID

### Validations
- No duplicate IDs allowed
- Operations on non-existent IDs should return appropriate errors
- Empty collection should be handled gracefully