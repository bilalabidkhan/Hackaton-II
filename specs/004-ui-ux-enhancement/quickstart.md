# Quickstart Guide: Frontend UI & UX Enhancement

## Project Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Python 3.9+ (for backend)
- Poetry (for backend dependency management)

### Frontend Setup
```bash
cd frontend
npm install
```

### Backend Setup
```bash
cd backend
poetry install
poetry shell
```

## Development Workflow

### Running the Application
1. **Start Backend**:
   ```bash
   cd backend
   poetry run uvicorn src.main:app --reload --port 8000
   ```

2. **Start Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

### UI Enhancement Development
1. **Component Location**: All UI components are in `frontend/src/components/`
2. **Page Routes**: Next.js pages are in `frontend/src/app/`
3. **Styling**: Tailwind CSS classes applied directly in components
4. **Global Styles**: Found in `frontend/src/app/globals.css`

## Key Files for UI Enhancement

### Global Layout
- `frontend/src/app/layout.tsx` - Main application layout
- Components to create: `frontend/src/components/navbar.tsx`, `footer.tsx`

### Authentication Pages
- `frontend/src/app/auth/login/page.tsx` - Login page
- `frontend/src/app/auth/register/page.tsx` - Register page
- `frontend/src/components/auth/login-form.tsx` - Login form component
- `frontend/src/components/auth/register-form.tsx` - Register form component

### Todo Dashboard
- `frontend/src/app/todos/page.tsx` - Todo dashboard page
- `frontend/src/components/todo-form.tsx` - Todo creation form
- `frontend/src/components/todo-list.tsx` - Todo list display component

## Tailwind Configuration
- Configuration file: `frontend/tailwind.config.js`
- Customize colors, spacing, typography in the config file
- Use existing classes where possible to maintain consistency

## Testing Changes
1. **Visual Testing**: Manually test UI changes across different pages
2. **Responsive Testing**: Test on different screen sizes using browser dev tools
3. **Functionality Testing**: Ensure all existing functionality still works
4. **Accessibility Testing**: Verify keyboard navigation and screen reader compatibility

## Deployment
- Frontend builds automatically with `npm run build`
- Backend deployment follows existing procedures
- Verify all UI enhancements render correctly in production