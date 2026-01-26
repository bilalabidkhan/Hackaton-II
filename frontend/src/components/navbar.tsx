'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, signout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    try {
      await signout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav role="navigation" aria-label="Main navigation" className="bg-white shadow-sm border-b border-neutral-200">
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
       {/* Logo / Links */}
        <Link href="/" className="flex items-center gap-1 font-serif text-2xl font-semibold text-blue-500">
          TaskMaster
        </Link>
         
         {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
           <Link href="/todos" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-serif font-semibold text-blue-500 hover:underline hover:underline-offset-2">
              Dashboard
            </span>
           </Link>
            {isAuthenticated ? (
            <>
             <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 rounded-md text-white font-medium bg-red-500 hover:bg-red-600 transition duration-200"
              aria-label="Sign out">
              Logout
             </button>
            </>
            ) : (
            <>
             <Link
              href="/auth/login"
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200"
              aria-label="Sign in">
              Sign In
             </Link>
             <Link
              href="/auth/register"
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200"
              aria-label="Sign up">
              Sign Up
             </Link>
            </>
            )}
          </div>

         {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
           <button
            onClick={toggleMenu}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close main menu" : "Open main menu"}>
             <svg
              className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
             </svg>
             <svg
              className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
             </svg>
           </button>
          </div>
      </div>
     </div>

      {/* Mobile Menu */}
       <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu" role="region" aria-labelledby="mobile-menu-label">
        <div className="mx-4 gap-5">
         <Link href="/todos" className="flex-shrink-0 flex items-center mt-3" aria-label="Todo App dashboard">
          <span className="text-xl font-bold text-primary-600">Dashboard</span>
         </Link>
        </div>
        <div className="pt-2 pb-2 space-y-2 mx-4">
         {isAuthenticated ? (
          <button onClick={handleSignOut}
           className="w-full text-left px-4 py-2 rounded-md text-white font-medium bg-red-500 hover:bg-red-600 transition duration-200">
           Logout
          </button>
        ) : (
        <>
         <Link
          href="/auth/login"
          className="block w-full text-left px-4 py-2 border border-primary-600 rounded-md text-primary-600 font-medium hover:bg-primary-50 hover:border-primary-500 transition duration-200">
           Sign In
         </Link>
         <Link
          href="/auth/register"
          className="block w-full text-left px-4 py-2 border border-primary-600 rounded-md text-white bg-primary-600 font-medium hover:bg-primary-700 hover:border-primary-500 transition duration-200">
          Sign Up
         </Link>
        </>
        )}
      </div>
     </div>
    </nav>
  );
};

export default Navbar;