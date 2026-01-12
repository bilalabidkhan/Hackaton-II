'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient } from '@/lib/api';

interface User {
  id: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated on initial load
    const token = localStorage.getItem('auth_token');
    if (token) {
      // In a real implementation, we would verify the token here
      // For now, we'll just set a placeholder user
      // This would typically involve calling an API to validate the token
      try {
        // Decode the JWT token to get user info
        const tokenPayload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(tokenPayload));
        setUser({ id: decodedPayload.sub, email: decodedPayload.email || 'placeholder@example.com' });
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('auth_token');
      }
    }
    setLoading(false);
  }, []);

  const signin = async (email: string, password: string) => {
    try {
      const response = await apiClient.signin(email, password);
      localStorage.setItem('auth_token', response.access_token);
      // Decode the JWT token to get user info
      const tokenPayload = response.access_token.split('.')[1];
      const decodedPayload = JSON.parse(atob(tokenPayload));
      setUser({ id: decodedPayload.sub, email });
    } catch (error) {
      throw error;
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      const response = await apiClient.signup(email, password);
      localStorage.setItem('auth_token', response.access_token);
      // Decode the JWT token to get user info
      const tokenPayload = response.access_token.split('.')[1];
      const decodedPayload = JSON.parse(atob(tokenPayload));
      setUser({ id: decodedPayload.sub, email });
    } catch (error) {
      throw error;
    }
  };

  const signout = async () => {
    try {
      await apiClient.signout();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isAuthenticated = !!user;

  const value = {
    user,
    loading,
    signin,
    signup,
    signout,
    isAuthenticated
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};