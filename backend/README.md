# Backend: Full-Stack Todo Web Application

## Overview
This is the backend API for the full-stack todo web application built with FastAPI and SQLModel.

## Features
- RESTful API endpoints for todo management
- User authentication and authorization with Better Auth
- PostgreSQL database with SQLModel ORM
- Secure session management

## Tech Stack
- Python 3.11+
- FastAPI
- SQLModel
- Better Auth
- PostgreSQL
- Uvicorn ASGI server

## Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your database connection details and Better Auth configuration
   ```

5. Run database migrations:
   ```bash
   python -m src.main migrate
   ```

6. Start the backend server:
   ```bash
   uvicorn src.main:app --reload --port 8000
   ```

## Environment Variables

- `DATABASE_URL`: PostgreSQL database connection string
- `BETTER_AUTH_SECRET`: Secret key for authentication
- `BETTER_AUTH_URL`: Base URL for the authentication service

## API Documentation

The API documentation is available at:
- OpenAPI UI: `http://localhost:8000/docs`
- Redoc: `http://localhost:8000/redoc`

## Endpoints

- `POST /api/auth/signup` - Create a new user account
- `POST /api/auth/signin` - Authenticate user
- `GET /api/todos` - Get all todos for the authenticated user
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/{id}` - Update an existing todo
- `DELETE /api/todos/{id}` - Delete a todo
- `PATCH /api/todos/{id}/complete` - Mark a todo as complete/incomplete