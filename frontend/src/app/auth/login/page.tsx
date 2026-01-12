'use client';

import React from 'react';
import { useAuth } from '@/contexts/auth-context';
import LoginForm from '@/components/auth/login-form';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const { signin, isAuthenticated } = useAuth();
  const router = useRouter();

  // If already authenticated, redirect to todos page
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/todos');
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (email: string, password: string) => {
    try {
      await signin(email, password);
      router.push('/todos'); // Redirect to todos page after successful login
    } catch (error: any) {
      throw error; // Let the form handle the error
    }
  };

  const handleSwitchToRegister = () => {
    router.push('/auth/register');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <LoginForm
        onLogin={handleLogin}
        onSwitchToRegister={handleSwitchToRegister}
      />
    </div>
  );
};

export default LoginPage;