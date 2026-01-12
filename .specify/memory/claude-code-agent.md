# Full-Stack Todo Application Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-01-10

## Active Technologies

- Next.js 14+ (App Router)
- React 18+
- TypeScript
- Tailwind CSS
- FastAPI
- SQLModel
- PostgreSQL (Neon DB)
- JWT Authentication
- Vercel for hosting

## Project Structure

```text
backend/
├── src/
│   ├── api/
│   │   ├── auth.py
│   │   └── todos.py
│   ├── models/
│   │   ├── user.py
│   │   └── todo.py
│   ├── services/
│   │   └── todo_service.py
│   ├── database.py
│   └── main.py
frontend/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── todos/
│   │   └── page.tsx
│   ├── components/
│   │   ├── auth/
│   │   ├── todo-form.tsx
│   │   └── todo-list.tsx
│   ├── contexts/
│   │   └── auth-context.tsx
│   ├── lib/
│   │   ├── api.ts
│   │   └── token-access.ts
│   ├── utils/
│   │   └── token-utils.ts
│   └── middleware.ts
```

## Commands

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

### Backend
- `uvicorn src.main:app --reload --port 8000` - Start backend server
- `poetry run uvicorn src.main:app --reload --port 8000` - With poetry environment

## Code Style

### React/TypeScript
- Use functional components with hooks
- Follow Next.js 13+ App Router conventions
- Apply Tailwind CSS utility classes for styling
- Use TypeScript interfaces for props and data structures
- Follow semantic HTML structure for accessibility

### FastAPI
- Use Pydantic models for request/response validation
- Follow dependency injection patterns for database sessions
- Implement proper error handling with HTTPExceptions
- Use type hints throughout

## Recent Changes

### 004-ui-ux-enhancement: Frontend UI & UX Enhancement for Full-Stack Todo Application
- Enhanced global layout with professional navbar and footer
- Modernized authentication pages with card-based design
- Improved todo dashboard UI with better visual hierarchy
- Implemented responsive design for mobile, tablet, and desktop
- Added consistent styling using Tailwind CSS

### 003-fix-auth-redirect: Fix Authentication Redirect Loop
- Fixed redirect loop in authentication flow
- Improved middleware authentication handling
- Enhanced auth context state management

### 002-fullstack-todo-app: Full-Stack Todo Application
- Implemented complete full-stack todo application
- Added user authentication and authorization
- Created todo CRUD operations
- Established frontend-backend communication

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->