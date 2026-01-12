# Quickstart Guide: Fix Authentication Redirect Issue

## Overview
This guide provides step-by-step instructions to fix the authentication redirect issue where users are redirected to login even after successful signup/signin.

## Root Cause
The authentication middleware in `frontend/src/middleware.ts` looks for tokens in cookies, but the frontend stores tokens only in localStorage. This mismatch causes authentication failures.

## Implementation Steps

### Step 1: Install Cookie Utility Library
```bash
cd frontend
npm install js-cookie
# or
yarn add js-cookie
```

### Step 2: Update Auth Context
Modify `frontend/src/contexts/auth-context.tsx` to store tokens in both cookies and localStorage:

```typescript
import Cookies from 'js-cookie';

// In signin function:
const signin = async (email: string, password: string) => {
  try {
    const response = await apiClient.signin(email, password);
    const token = response.access_token;

    // Store in both cookie and localStorage
    Cookies.set('auth_token', token, {
      expires: 7, // 7 days expiry
      httpOnly: false, // Needs to be accessible by JS
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    localStorage.setItem('auth_token', token);

    setUser({ id: 'authenticated-user', email });
  } catch (error) {
    throw error;
  }
};

// In signup function:
const signup = async (email: string, password: string) => {
  try {
    const response = await apiClient.signup(email, password);
    const token = response.access_token;

    // Store in both cookie and localStorage
    Cookies.set('auth_token', token, {
      expires: 7, // 7 days expiry
      httpOnly: false, // Needs to be accessible by JS
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    localStorage.setItem('auth_token', token);

    setUser({ id: 'new-user', email });
  } catch (error) {
    throw error;
  }
};

// In signout function:
const signout = async () => {
  try {
    await apiClient.signout();
    Cookies.remove('auth_token');
    localStorage.removeItem('auth_token');
    setUser(null);
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

// In useEffect for initial load:
useEffect(() => {
  const tokenFromCookie = Cookies.get('auth_token');
  const tokenFromLocalStorage = localStorage.getItem('auth_token');

  // Use token from cookie if available, otherwise from localStorage
  const token = tokenFromCookie || tokenFromLocalStorage;

  if (token) {
    // Set token in both places to ensure consistency
    if (tokenFromLocalStorage && !tokenFromCookie) {
      Cookies.set('auth_token', tokenFromLocalStorage, {
        expires: 7,
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
    } else if (tokenFromCookie && !tokenFromLocalStorage) {
      localStorage.setItem('auth_token', tokenFromCookie);
    }

    setUser({ id: 'placeholder', email: 'user@example.com' });
  }
  setLoading(false);
}, []);
```

### Step 3: Update API Client (if needed)
The API client in `frontend/src/lib/api.ts` already handles tokens from localStorage, but you might want to enhance it to try cookies as well:

```typescript
private async request<T>(endpoint: string, config?: ApiConfig): Promise<T> {
  const url = `${this.baseUrl}${endpoint}`;

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Get token from localStorage first, then cookies
  let token = localStorage.getItem('auth_token');
  if (!token) {
    // For client-side, we can use a utility to read cookies
    token = typeof window !== 'undefined' ? Cookies.get('auth_token') : null;
  }

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  // ... rest of the function
}
```

### Step 4: Test the Fix
1. Clear existing tokens from localStorage: `localStorage.removeItem('auth_token')`
2. Restart your development server
3. Sign up or sign in to the application
4. Navigate to the `/todos` page - you should not be redirected to login
5. Verify that the token is stored in both cookies and localStorage

## Verification Checklist
- [ ] User can access /todos after successful authentication
- [ ] User is redirected to /auth/login when accessing /todos without authentication
- [ ] Token is stored in both cookies and localStorage
- [ ] Middleware correctly identifies authenticated users
- [ ] Signout properly removes tokens from both storage locations