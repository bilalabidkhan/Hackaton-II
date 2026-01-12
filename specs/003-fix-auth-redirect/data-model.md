# Data Model: Authentication System

## Overview
This document describes the authentication data model for the Todo application, focusing on the token management and user session structures needed to fix the redirect issue.

## Authentication Token

### Properties
- **name**: `auth_token`
- **type**: string
- **storage**: cookies (server-side access) and localStorage (client-side access)
- **format**: JWT token or session token
- **purpose**: Verify user identity and authorization
- **lifespan**: Session-based or time-limited validity

### Validation Rules
- Must be present to access protected routes (`/todos`, `/profile`)
- Must be valid (not expired or revoked)
- Must correspond to an active user account

## User Session

### Properties
- **id**: string (unique identifier)
- **email**: string (user's email address)
- **authenticated**: boolean (indicates authentication status)
- **token**: string (reference to auth_token)

### State Transitions
1. **Unauthenticated State**: No token present, user = null
2. **Authenticating State**: Credentials submitted, awaiting validation
3. **Authenticated State**: Valid token present, user populated
4. **Logged Out State**: Token removed, returning to unauthenticated

## API Response Format

### Signin/Signup Response
```typescript
{
  "access_token": string,  // JWT or session token to be stored
  "user": {
    "id": string,
    "email": string
  }
}
```

### Expected Behavior
- Token must be stored in both cookies (for server-side access) and localStorage (for client-side operations)
- Authentication state must be synchronized between server and client
- Session must persist across page reloads

## Security Considerations

### Token Storage
- Store in HTTP-only cookies when possible for security
- Fallback to localStorage if server-side access not required
- Implement proper token expiration and refresh mechanisms
- Secure tokens against XSS and CSRF attacks

### Session Management
- Proper cleanup of tokens on logout
- Token validation on sensitive operations
- Session timeout handling