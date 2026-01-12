'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient } from '@/lib/api';
import { getToken, storeToken, removeToken, syncTokens, isAuthenticated as isTokenAuthenticated } from '@/utils/token-utils';

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated on initial load
    // Sync tokens if needed to ensure consistency between cookie and localStorage
    const initializeAuth = async () => {
      syncTokens();

      const token = getToken();
      if (token) {
        try {
          // Fetch the current user from the backend to validate the token and get user info
          const userData = await apiClient.getCurrentUser();
          setUser({ id: userData.id, email: userData.email });
        } catch (error) {
          // If token is invalid or expired, clear it and set user to null
          removeToken();
          setUser(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const signin = async (email: string, password: string) => {
    try {
      const response = await apiClient.signin(email, password);
      // Store token in both cookie and localStorage for server-client synchronization
      storeToken(response.access_token);
      // Fetch the current user from the backend to get user info
      const userData = await apiClient.getCurrentUser();
      setUser({ id: userData.id, email: userData.email });
    } catch (error) {
      throw error;
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      const response = await apiClient.signup(email, password);
      // Store token in both cookie and localStorage for server-client synchronization
      storeToken(response.access_token);
      // Fetch the current user from the backend to get user info
      const userData = await apiClient.getCurrentUser();
      setUser({ id: userData.id, email: userData.email });
    } catch (error) {
      throw error;
    }
  };

  const signout = async () => {
    try {
      // Remove token from both cookie and localStorage
      removeToken();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isAuthenticated = !!user && isTokenAuthenticated();

  const value = {
    user,
    loading,
    signin,
    signup,
    signout,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};