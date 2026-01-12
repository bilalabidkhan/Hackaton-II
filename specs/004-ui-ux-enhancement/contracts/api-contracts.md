# API Contracts: Frontend UI & UX Enhancement

## Overview
This document outlines the existing API contracts that remain unchanged during the UI/UX enhancement. All endpoints and data structures maintain the same contracts as before.

## Authentication Endpoints

### POST /api/auth/signup
**Description**: Create a new user account
**Request**:
```json
{
  "email": "string",
  "password": "string"
}
```
**Response**:
```json
{
  "id": "string (UUID)",
  "email": "string"
}
```

### POST /api/auth/signin
**Description**: Authenticate user and return token
**Request**:
```json
{
  "email": "string",
  "password": "string"
}
```
**Response**:
```json
{
  "access_token": "string",
  "token_type": "string"
}
```

## Todo Endpoints

### GET /api/todos
**Description**: Get all todos for the authenticated user
**Response**:
```json
{
  "todos": [
    {
      "id": "string (UUID)",
      "title": "string",
      "description": "string (optional)",
      "is_completed": "boolean",
      "created_at": "string (ISO date)",
      "updated_at": "string (ISO date)",
      "user_id": "string (UUID)"
    }
  ]
}
```

### POST /api/todos
**Description**: Create a new todo
**Request**:
```json
{
  "title": "string",
  "description": "string (optional)"
}
```
**Response**:
```json
{
  "id": "string (UUID)",
  "title": "string",
  "description": "string (optional)",
  "is_completed": "boolean",
  "created_at": "string (ISO date)",
  "updated_at": "string (ISO date)",
  "user_id": "string (UUID)"
}
```

### PUT /api/todos/{id}
**Description**: Update an existing todo
**Request**:
```json
{
  "title": "string",
  "description": "string (optional)",
  "is_completed": "boolean (optional)"
}
```
**Response**: Same as POST /api/todos

### DELETE /api/todos/{id}
**Description**: Delete a todo
**Response**:
```json
{
  "message": "Todo deleted successfully"
}
```

### PATCH /api/todos/{id}/complete
**Description**: Toggle completion status of a todo
**Request**:
```json
{
  "is_completed": "boolean"
}
```
**Response**: Same as POST /api/todos

## Authentication Requirements
- All /api/todos endpoints require valid JWT token in Authorization header
- Format: `Authorization: Bearer {token}`
- Auth endpoints (/api/auth/signup, /api/auth/signin) are public

## Error Responses
All endpoints may return:
```json
{
  "error": "error message"
}
```
With appropriate HTTP status codes (400, 401, 404, 500, etc.)