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
      className="glass p-6 rounded-2xl mb-8 border border-white/10 shadow-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb- gap-4 sm:gap-0">
        <motion.div variants={itemVariants}>
          <p className="text-green-600 mt-1 font-semibold">
            Welcome back, {user.name || user.email || 'there'}!
          </p>
        </motion.div>

        {stats && (
          <motion.div
            className="mt-4 sm:mt-0 glass-sm p-3 rounded-lg backdrop-blur-sm"
            variants={itemVariants}
          >
            <div className="flex space-x-6 text-sm">
              <div>
                <p className="text-neutral-400">Completion Rate</p>
                <p className="text-white font-semibold">{stats.completionRate}%</p>
              </div>
              <div>
                <p className="text-neutral-400">Weekly Progress</p>
                <p className="text-white font-semibold">{stats.weeklyProgress}%</p>
              </div>
            </div>
          </motion.div>
        )}
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