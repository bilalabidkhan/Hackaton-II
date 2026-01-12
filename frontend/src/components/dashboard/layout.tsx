'use client';

import React from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 to-black text-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <main className="flex-grow">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;