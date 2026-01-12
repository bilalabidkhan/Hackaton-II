'use client';

import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start">
            <p className="text-sm text-neutral-600">
              &copy; {currentYear} Todo App. All rights reserved.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex justify-center space-x-6">
            <a
              href="#"
              className="text-neutral-400 hover:text-neutral-500 text-sm"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-neutral-400 hover:text-neutral-500 text-sm"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-neutral-400 hover:text-neutral-500 text-sm"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;