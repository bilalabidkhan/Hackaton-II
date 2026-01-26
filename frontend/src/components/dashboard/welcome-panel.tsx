'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserGreeting } from '@/types/dashboard';

interface WelcomePanelProps {
  user: {
    email?: string;
    name?: string;
  };
  greeting: UserGreeting;
  stats?: {
    completionRate: number;
    weeklyProgress: number;
  };
}

  const handleSignOut = async () => {
    try {
      await signout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

const WelcomePanel: React.FC<WelcomePanelProps> = ({
  user,
  greeting,
  stats
}) => {
  // Animation variants for entrance
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="glass mb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h1 className='text-4xl font-medium'>
          Dashboard
        </h1>
        
        <motion.div variants={itemVariants}>
          <p className="text-green-600 mt-1 font-semibold py-">
            Welcome back, {user.name || user.email || 'there'}!
          </p>

          <button
                   onClick={handleSignOut}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-error-600 hover:bg-error-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-error-500 transition duration-200 mt-2"
                  aria-label="Sign out"
               >
                  Logout          
               </button>
        </motion.div>

        
      </div>

      <motion.div variants={itemVariants}>
        <p className="text-neutral-300 italic py-2">
          "{greeting.productivityInsight}"
        </p>
      </motion.div>
    </motion.div>
  );
};

export default WelcomePanel;