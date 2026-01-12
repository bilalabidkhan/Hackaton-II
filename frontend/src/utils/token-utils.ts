import Cookies from 'js-cookie';

// Constants
const TOKEN_KEY = 'auth_token';
const TOKEN_EXPIRY_DAYS = 7;

/**
 * Store token in both cookie and localStorage for server-client synchronization
 */
export const storeToken = (token: string): void => {
  // Store in cookie for server-side access (middleware)
  Cookies.set(TOKEN_KEY, token, {
    expires: TOKEN_EXPIRY_DAYS,
    httpOnly: false, // Needs to be accessible by JS
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  // Store in localStorage for client-side operations
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Get token from both cookie and localStorage
 * Priority: cookie > localStorage
 */
export const getToken = (): string | null => {
  // Try to get from cookie first (server-side accessible)
  let token = Cookies.get(TOKEN_KEY) || null;

  if (!token && typeof window !== 'undefined') {
    // Fallback to localStorage
    token = localStorage.getItem(TOKEN_KEY);

    // If found in localStorage but not in cookie, sync to cookie
    if (token) {
      Cookies.set(TOKEN_KEY, token, {
        expires: TOKEN_EXPIRY_DAYS,
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
    }
  } else if (token && typeof window !== 'undefined') {
    // If found in cookie but not in localStorage, sync to localStorage
    const localStorageToken = localStorage.getItem(TOKEN_KEY);
    if (!localStorageToken) {
      localStorage.setItem(TOKEN_KEY, token);
    }
  }

  return token;
};

/**
 * Remove token from both cookie and localStorage
 */
export const removeToken = (): void => {
  Cookies.remove(TOKEN_KEY);
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * Check if user is authenticated by checking for token existence
 */
export const isAuthenticated = (): boolean => {
  return !!getToken();
};

/**
 * Synchronize token between cookie and localStorage if only one exists
 */
export const syncTokens = (): void => {
  const cookieToken = Cookies.get(TOKEN_KEY);
  const localStorageToken = typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;

  // If cookie has token but localStorage doesn't, sync to localStorage
  if (cookieToken && !localStorageToken && typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, cookieToken);
  }

  // If localStorage has token but cookie doesn't, sync to cookie
  if (localStorageToken && !cookieToken) {
    Cookies.set(TOKEN_KEY, localStorageToken, {
      expires: TOKEN_EXPIRY_DAYS,
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  }
};