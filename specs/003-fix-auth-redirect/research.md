# Research: Authentication Infrastructure Analysis

## Objective
Identify and analyze the current authentication implementation in the frontend to understand the token handling, validation, and redirect logic issues.

## Research Tasks Performed

### Task 1: Locate Authentication Middleware Implementation

**Finding**: Examined the frontend directory structure to identify authentication middleware components.

**Result**:
- Located Next.js App Router middleware at `frontend/src/middleware.ts`
- Found the middleware protects routes `/todos` and `/profile`
- The middleware checks for auth token in cookies or Authorization header
- Redirects to `/auth/login` if no token is found on protected routes

### Task 2: Determine Token Storage Mechanism

**Finding**: Investigated how tokens are currently stored after authentication.

**Result**:
- Tokens are stored in localStorage under the key 'auth_token'
- The API client adds the token to Authorization header for authenticated requests
- Both signup and signin functions store the token in localStorage
- Signout removes the token from localStorage

### Task 3: Identify Token Validation Approach

**Finding**: Looked for token validation logic in route protection.

**Result**:
- Server-side validation happens in middleware.ts (line 12-13)
- Token is checked from cookies ('auth_token') or Authorization header
- Client-side validation happens in auth-context (line 32)
- The auth context checks for token existence in localStorage on initial load

### Task 4: Examine Protected Route Components

**Finding**: Located implementation of protected routes.

**Result**:
- The /todos page makes API calls to fetch todos without checking auth state first
- The auth pages (login/register) redirect to /todos if already authenticated
- No client-side route protection exists - relies solely on server-side middleware
- The issue occurs because the server-side middleware checks for tokens in cookies, but tokens are stored in localStorage

## Root Cause Analysis

### The Problem Identified:
The authentication middleware in `frontend/src/middleware.ts` looks for tokens in cookies (`request.cookies.get('auth_token')`) but the frontend implementation stores tokens in localStorage. This mismatch causes the middleware to never find the authentication token, resulting in redirects to the login page even after successful authentication.

**Lines 12-13 in middleware.ts**:
```typescript
const token = request.cookies.get('auth_token')?.value ||
              request.headers.get('Authorization')?.replace('Bearer ', '');
```

**Comparison with auth-context.tsx line 32**:
```typescript
const token = localStorage.getItem('auth_token');
```

## Decision Points & Rationale

### Decision: Token Storage Location Consistency
**Rationale**: The frontend stores tokens in localStorage but the middleware looks for tokens in cookies. We need to align these approaches for consistent authentication.

**Options**:
- Change frontend to store tokens in cookies (recommended)
- Modify middleware to check localStorage (not possible - localStorage is client-side only)
- Send token in Authorization header consistently (already partially implemented)

### Decision: Authentication Flow
**Rationale**: Need to ensure tokens are available server-side for middleware validation while maintaining client-side functionality.

**Approach**: Store tokens in cookies for server-side access while keeping localStorage as backup or for client-side operations.

## Key Unknowns Resolved

1. **Authentication Library**: Custom implementation using React Context and localStorage
2. **Middleware Location**: Located at `frontend/src/middleware.ts`
3. **Token Format**: Simple token stored as string in localStorage
4. **State Management**: Using React Context API in `auth-context.tsx`
5. **API Response Format**: Backend returns `access_token` in response
6. **Root Cause**: Middleware looks for tokens in cookies but frontend stores in localStorage

## Next Steps
1. Update the authentication implementation to store tokens in cookies for server-side access
2. Ensure tokens are available both server-side (cookies) and client-side (localStorage)
3. Test the complete authentication flow after the fix