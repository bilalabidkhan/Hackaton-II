'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DashboardStats } from '@/types/dashboard';

interface StatsCardProps {
  stats: DashboardStats;
  isLoading?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ stats, isLoading = false }) => {
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

  // Loading skeleton component
  if (isLoading) {
    return (
      <motion.div
        className="glass p-6 rounded-2xl border border-white/10 shadow-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="h-6 bg-gray-700/50 rounded w-3/4 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="p-4">
              <div className="h-4 bg-gray-700/50 rounded w-1/2 mb-2"></div>
              <div className="h-6 bg-gray-700/50 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="glass p-6 rounded-2xl border border-white/10 shadow-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 className="text-xl font-bold text-white mb-6" variants={itemVariants}>
        Productivity Overview
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Completion Rate Card */}
        <motion.div className="text-center p-4" variants={itemVariants}>
          <div className="text-3xl font-bold text-white mb-1">
            {stats.completionRate}%
          </div>
          <div className="text-neutral-400 text-sm">Completion Rate</div>
          <div className="mt-3 w-full bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-primary-500 to-primary-600 h-2.5 rounded-full"
              style={{ width: `${stats.completionRate}%` }}
            ></div>
          </div>
        </motion.div>

        {/* Weekly Progress Card */}
        <motion.div className="text-center p-4" variants={itemVariants}>
          <div className={`text-3xl font-bold mb-1 ${
            stats.weeklyProgress >= 0 ? 'text-success-400' : 'text-error-400'
          }`}>
            {stats.weeklyProgress >= 0 ? '+' : ''}{stats.weeklyProgress}%
          </div>
          <div className="text-neutral-400 text-sm">Weekly Progress</div>
          <div className="mt-2 text-xs text-neutral-500">
            {stats.weeklyProgress >= 0
              ? '↑ Improved from last week'
              : '↓ Needs improvement'}
          </div>
        </motion.div>

        {/* Task Count Card */}
        <motion.div className="text-center p-4" variants={itemVariants}>
          <div className="text-3xl font-bold text-white mb-1">
            {stats.totalTasks}
          </div>
          <div className="text-neutral-400 text-sm">Total Tasks</div>
          <div className="mt-2 text-xs text-neutral-500">
            {stats.completedTasks} completed
          </div>
        </motion.div>
      </div>

      {/* Chart Visualization - Progress over time */}
      <motion.div className="mt-6 pt-4 border-t border-white/10" variants={itemVariants}>
        <h3 className="text-lg font-semibold text-white mb-4">Weekly Progress</h3>
        <div className="flex items-end h-24 gap-1 md:gap-2">
          {[...Array(7)].map((_, index) => {
            // Generate sample data - in a real app this would come from actual stats
            const dayProgress = Math.floor(Math.random() * 100); // Placeholder data
            const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className="w-full bg-gradient-to-t from-primary-500 to-primary-400 rounded-t-md min-h-[5px]"
                  style={{ height: `${dayProgress}%` }}
                ></div>
                <span className="text-xs text-neutral-400 mt-1">{dayLabels[index]}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Trending Tasks Section */}
      {stats.trendingTasks && stats.trendingTasks.length > 0 && (
        <motion.div className="mt-6 pt-4 border-t border-white/10" variants={itemVariants}>
          <h3 className="text-lg font-semibold text-white mb-3">Trending Tasks</h3>
          <ul className="space-y-2">
            {stats.trendingTasks.map((task, index) => (
              <li key={index} className="flex items-center text-neutral-300 text-sm">
                <span className="w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center text-xs mr-2">
                  {index + 1}
                </span>
                {task}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
};

export default StatsCard;