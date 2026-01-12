'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TodoItem } from '@/utils/productivity-insights';

interface TodoItemCardProps {
  todo: TodoItem;
  onToggleComplete: (id: string, isCompleted: boolean) => void;
  onEdit: (id: string, title: string, description?: string) => void;
  onDelete: (id: string) => void;
  isEditing?: boolean;
}

const TodoItemCard: React.FC<TodoItemCardProps> = ({
  todo,
  onToggleComplete,
  onEdit,
  onDelete,
  isEditing = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check if user prefers reduced motion
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handler);

      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  const handleSaveEdit = () => {
    onEdit(todo.id, editTitle, editDescription);
    setEditMode(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setEditMode(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  // Animation variants for completion strikethrough effect
  const textVariants = {
    completed: {
      textDecoration: 'line-through',
      opacity: 0.7
    },
    active: {
      textDecoration: 'none',
      opacity: 1
    }
  };

  return (
    <motion.div
      className={`glass rounded-xl p-4 mb-3 border border-white/10 shadow-lg transition-all duration-300 ${
        todo.completed ? 'opacity-70' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={!prefersReducedMotion ? { y: -2, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.25), 0 10px 10px -5px rgba(0, 0, 0, 0.1)' } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex items-start">
        <div className="flex items-center h-5 mr-3">
          <input
            id={`todo-checkbox-${todo.id}`}
            type="checkbox"
            checked={todo.completed}
            onChange={(e) => onToggleComplete(todo.id, e.target.checked)}
            className="w-5 h-5 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2 cursor-pointer"
            aria-label={`Mark "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`}
          />
        </div>

        <div className="flex-1 min-w-0">
          {editMode ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-3 py-1 bg-black/30 border border-white/20 rounded text-white mb-2"
                aria-label="Edit task title"
                autoFocus
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-3 py-1 bg-black/30 border border-white/20 rounded text-white text-sm"
                aria-label="Edit task description"
                rows={2}
              />
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={handleSaveEdit}
                  className="px-3 py-1 text-xs bg-success-600 hover:bg-success-700 rounded text-white"
                  aria-label="Save changes"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-3 py-1 text-xs bg-neutral-600 hover:bg-neutral-700 rounded text-white"
                  aria-label="Cancel editing"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <motion.label
                htmlFor={`todo-checkbox-${todo.id}`}
                className={`text-base font-medium break-words cursor-pointer ${
                  todo.completed ? 'text-neutral-400' : 'text-white'
                }`}
                variants={textVariants}
                animate={todo.completed ? 'completed' : 'active'}
                transition={{ duration: 0.3 }}
                aria-label={todo.title}
              >
                {todo.title}
              </motion.label>

              {todo.description && (
                <p className={`text-sm mt-1 ${
                  todo.completed ? 'text-neutral-500' : 'text-neutral-400'
                }`}>
                  {todo.description}
                </p>
              )}
            </div>
          )}
        </div>

        {!editMode && (
          <div className="flex space-x-1 ml-2">
            <button
              onClick={() => setEditMode(true)}
              className={`p-1.5 rounded-full ${
                isHovered ? 'bg-neutral-700/50 text-white' : 'text-neutral-400'
              } hover:bg-neutral-700/50 hover:text-white transition-colors`}
              aria-label={`Edit task: ${todo.title}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>

            <button
              onClick={() => onDelete(todo.id)}
              className={`p-1.5 rounded-full ${
                isHovered ? 'bg-error-700/50 text-white' : 'text-neutral-400'
              } hover:bg-error-700/50 hover:text-white transition-colors`}
              aria-label={`Delete task: ${todo.title}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TodoItemCard;