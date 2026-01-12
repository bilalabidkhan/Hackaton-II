# Quickstart Guide: Full-Stack Todo Web Application

## Prerequisites

- Node.js 18+ for frontend development
- Python 3.11+ for backend development
- PostgreSQL (or access to Neon Serverless PostgreSQL)
- Git

## Setup Instructions

### 1. Clone and Navigate to Project

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Backend Setup (FastAPI)

1. Navigate to backend directory:
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

### 3. Frontend Setup (Next.js)

1. Navigate to frontend directory:
   ```bash
   cd frontend  # from project root
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your backend API URL and Better Auth configuration
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/todo_app
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:8000
```

## Running the Application

1. Start the backend server (port 8000)
2. Start the frontend server (port 3000)
3. Access the application at `http://localhost:3000`

## API Documentation

The API documentation is available at:
- OpenAPI UI: `http://localhost:8000/docs`
- Redoc: `http://localhost:8000/redoc`

## Database Migrations

To create a new migration:
```bash
# In backend directory
alembic revision --autogenerate -m "migration description"
```

To apply migrations:
```bash
# In backend directory
alembic upgrade head
```

## Testing

### Backend Tests
```bash
# In backend directory
pytest
```

### Frontend Tests
```bash
# In frontend directory
npm run test
```