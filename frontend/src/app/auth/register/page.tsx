'use client';

import React from 'react';
import { useAuth } from '@/contexts/auth-context';
import RegisterForm from '@/components/auth/register-form';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const { signup, isAuthenticated } = useAuth();
  const router = useRouter();

  // If already authenticated, redirect to todos page
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/todos');
    }
  }, [isAuthenticated, router]);

  const handleRegister = async (email: string, password: string) => {
    try {
      await signup(email, password);
      router.push('/todos'); // Redirect to todos page after successful registration
    } catch (error: any) {
      throw error; // Let the form handle the error
    }
  };

  const handleSwitchToLogin = () => {
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <RegisterForm
        onRegister={handleRegister}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </div>
  );
};

export default RegisterPage;