'use client';

import React from 'react';
import { AuthProvider } from '@/contexts/auth-context';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow">
            <div className=''>
              {children}
            </div>
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}