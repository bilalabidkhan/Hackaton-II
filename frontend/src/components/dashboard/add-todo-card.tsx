'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TodoItem } from '@/src/utils/productivity-insights';

interface AddTodoCardProps {
  onAddTodo: (title: string, description?: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const AddTodoCard: React.FC<AddTodoCardProps> = ({ onAddTodo, isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ title?: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { title?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Task title is required';
    } else if (title.trim().length > 200) {
      newErrors.title = 'Task title must be less than 200 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onAddTodo(title, description);
      setTitle('');
      setDescription('');
      setErrors({});
      onClose(); // Close the card after submitting
    }
  };

  // Animation variants for the card - implementing scale + fade with 300ms ease-out
  const cardVariants = {
    open: {
      scale: 1,
      opacity: 1,
      height: 'auto',
      transition: {
        type: 'tween',
        ease: 'easeOut',
        duration: 0.3 // 300ms as specified
      }
    },
    closed: {
      scale: 0.8,
      opacity: 0,
      height: 0,
      transition: {
        type: 'tween',
        ease: 'easeOut',
        duration: 0.3 // 300ms as specified
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.form
          onSubmit={handleSubmit}
          className="glass p-6 rounded-2xl mb-8 w-full border border-white/10 shadow-lg"
          variants={cardVariants}
          initial="closed"
          animate="open"
          exit="closed"
          style={{ overflow: 'hidden' }}
        >
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-neutral-300 mb-1">
              Task Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                // Clear error when user starts typing
                if (errors.title) {
                  setErrors({});
                }
              }}
              placeholder="What needs to be done?"
              className={`w-full px-4 py-3 bg-black/20 border ${
                errors.title ? 'border-error-500' : 'border-white/10'
              } rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
              autoFocus
            />
            {errors.title && (
              <p className="mt-1 text-sm text-error-400">{errors.title}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-neutral-300 mb-1">
              Description (Optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details..."
              className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={2}
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-neutral-300 bg-neutral-800/50 hover:bg-neutral-700/50 rounded-lg transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition duration-200"
            >
              Add Task
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
};

export default AddTodoCard;