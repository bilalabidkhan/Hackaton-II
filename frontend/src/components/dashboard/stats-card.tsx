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
      className="glass py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 className="text-xl font-bold text-white mb-6" variants={itemVariants}>
        Productivity Overview
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       {/* Completion Rate Card */}
        <motion.div
         className="text-center border rounded-2xl p-10 shadow-lg bg-gradient-to-br from-green-500 to-green-600 hover:scale-105 hover:shadow-2xl transition-transform duration-300"
         variants={itemVariants}>
          {/* Icon */}
           <div className="flex items-center justify-center mb-4">
            <span className="w-14 h-14 flex items-center justify-center rounded-full bg-white/20 text-white text-2xl shadow-lg">
             ✅
            </span>
           </div>
          {/* Percentage */}
           <div className="text-3xl font-bold text-white mb-2">{stats.completionRate}%</div>
            <div className="text-white/80 text-sm mb-3">Completion Rate</div>
            <div className="mt-3 w-full bg-white/20 rounded-full h-2.5">
             <div className="bg-blue-700 h-2.5 rounded-full" style={{ width: `${stats.completionRate}%` }}></div>
            </div>
        </motion.div>

       {/* Weekly Progress Card */}
        <motion.div
         className={`text-center border rounded-2xl p-10 shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 ${
         stats.weeklyProgress >= 0 ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gradient-to-br from-red-500 to-red-600'
         }`}
         variants={itemVariants}>
         {/* Icon */}
          <div className="flex items-center justify-center mb-4">
           <span className="w-14 h-14 flex items-center justify-center rounded-full bg-white/20 text-white text-2xl shadow-lg">
            {stats.weeklyProgress >= 0 ? '📈' : '📉'}
           </span>
          </div>
          <div className={`text-3xl font-bold mb-1 text-white`}>
           {stats.weeklyProgress >= 0 ? '+' : ''}{stats.weeklyProgress}%
          </div>
          <div className="text-white/80 text-sm mb-2">Weekly Progress</div>
          <div className="mt-2 text-xs text-white/70">
           {stats.weeklyProgress >= 0
            ? '↑ Improved from last week'
            : '↓ Needs improvement'}
          </div>
        </motion.div>

       {/* Task Count Card */}
        <motion.div
         className="text-center border rounded-2xl p-10 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 hover:scale-105 hover:shadow-2xl transition-transform duration-300"
         variants={itemVariants}>
          {/* Icon */}
           <div className="flex items-center justify-center mb-4">
            <span className="w-14 h-14 flex items-center justify-center rounded-full bg-white/20 text-white text-2xl shadow-lg">
             🗂️
            </span>
           </div>
           <div className="text-3xl font-bold text-white mb-1">{stats.totalTasks}</div>
           <div className="text-white/80 text-sm mb-2">Total Tasks</div>
           <div className="mt-2 text-xs text-white/70">
            {stats.completedTasks} completed
           </div>
        </motion.div>
      </div>

      {/* Trending Tasks Section */}
      {stats.trendingTasks && stats.trendingTasks.length > 0 && (
        <motion.div className="mt-16 pt-4 border-t border-white/10" variants={itemVariants}>
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