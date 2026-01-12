# Data Model: Full-Stack Todo Web Application

## User Entity

**Description**: Represents a registered user in the system

**Fields**:
- `id` (UUID/Integer): Unique identifier for the user
- `email` (String): User's email address (unique, required)
- `password_hash` (String): Hashed password (required, stored securely)
- `created_at` (DateTime): Timestamp when user account was created
- `updated_at` (DateTime): Timestamp when user account was last updated
- `is_active` (Boolean): Whether the user account is active (default: true)

**Validation Rules**:
- Email must be valid email format
- Email must be unique across all users
- Password must meet security requirements (handled by authentication system)
- Email cannot be empty

**Relationships**:
- One-to-Many: User has many Todos (user.todos)

## Todo Entity

**Description**: Represents a task item in the todo list

**Fields**:
- `id` (UUID/Integer): Unique identifier for the todo
- `title` (String): Title of the todo item (required)
- `description` (String): Optional description of the todo
- `is_completed` (Boolean): Whether the todo is completed (default: false)
- `created_at` (DateTime): Timestamp when todo was created
- `updated_at` (DateTime): Timestamp when todo was last updated
- `user_id` (UUID/Integer): Foreign key linking to the user who owns this todo

**Validation Rules**:
- Title cannot be empty or null
- Title must be between 1-255 characters
- Description can be empty but has max length of 1000 characters
- user_id must reference an existing user
- is_completed defaults to false

**State Transitions**:
- New todo: `is_completed` = false
- Completed: `is_completed` = true (via update operation)
- Can be toggled between completed/incomplete states

**Relationships**:
- Many-to-One: Todo belongs to one User (todo.user)

## Session Entity (Implicit)

**Description**: Represents an authenticated user session (managed by Better Auth)

**Fields** (handled by Better Auth):
- `session_token` (String): Unique session identifier
- `user_id` (UUID/Integer): Reference to the user
- `expires_at` (DateTime): Session expiration timestamp
- `created_at` (DateTime): Session creation timestamp

**Notes**:
- Session management is handled by Better Auth
- No direct CRUD operations on sessions
- Sessions are automatically validated on protected endpoints

## API Contract Structure

### Authentication Endpoints

**POST /api/auth/signup**
- Request: `{ "email": "user@example.com", "password": "secure_password" }`
- Response: `{ "user_id": "uuid", "email": "user@example.com", "message": "Account created successfully" }`
- Error: `{ "error": "reason" }`

**POST /api/auth/signin**
- Request: `{ "email": "user@example.com", "password": "secure_password" }`
- Response: `{ "user_id": "uuid", "email": "user@example.com", "token": "session_token" }`
- Error: `{ "error": "Invalid credentials" }`

### Todo Endpoints

**GET /api/todos**
- Headers: `Authorization: Bearer {token}`
- Response: `{ "todos": [{ "id": "uuid", "title": "Task", "description": "Desc", "is_completed": false, "created_at": "timestamp", "updated_at": "timestamp" }] }`
- Error: `{ "error": "reason" }`

**POST /api/todos**
- Headers: `Authorization: Bearer {token}`
- Request: `{ "title": "New Task", "description": "Optional description" }`
- Response: `{ "id": "uuid", "title": "New Task", "description": "Optional description", "is_completed": false, "created_at": "timestamp", "updated_at": "timestamp" }`
- Error: `{ "error": "reason" }`

**PUT /api/todos/{id}**
- Headers: `Authorization: Bearer {token}`
- Request: `{ "title": "Updated Task", "description": "Updated description", "is_completed": true }`
- Response: `{ "id": "uuid", "title": "Updated Task", "description": "Updated description", "is_completed": true, "created_at": "timestamp", "updated_at": "timestamp" }`

**DELETE /api/todos/{id}**
- Headers: `Authorization: Bearer {token}`
- Response: `{ "message": "Todo deleted successfully" }`

**PATCH /api/todos/{id}/complete**
- Headers: `Authorization: Bearer {token}`
- Request: `{ "is_completed": true }`
- Response: `{ "id": "uuid", "title": "Task", "description": "Desc", "is_completed": true, "updated_at": "timestamp" }`