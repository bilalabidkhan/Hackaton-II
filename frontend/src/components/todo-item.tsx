'use client';

import React, { useState } from 'react';

interface Todo {
  id: string;
  title: string;
  description?: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
}

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string, isCompleted: boolean) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string, description?: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleComplete,
  onDelete,
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const handleUpdate = () => {
    onUpdate(todo.id, editTitle, editDescription);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setIsEditing(false);
  };

  return (
    <li className={`p-4 rounded-lg border transition duration-200 ${todo.is_completed ? 'bg-success-50 border-success-200' : 'bg-white border-neutral-200 hover:shadow-sm'}`}>
      {isEditing ? (
        <div className="mb-3 space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-neutral-300 rounded-md p-2"
            required
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-neutral-300 rounded-md p-2"
            rows={2}
          />
          <div className="flex space-x-2">
            <button
              onClick={handleUpdate}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-success-600 hover:bg-success-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-success-500 transition duration-200"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="inline-flex items-center px-3 py-1.5 border border-neutral-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={todo.is_completed}
              onChange={(e) => onToggleComplete(todo.id, e.target.checked)}
              className="mt-1 h-5 w-5 text-primary-600 rounded focus:ring-primary-500 border-neutral-300"
            />
            <div className="flex-1 min-w-0">
              <h3 className={`text-base font-medium ${todo.is_completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                {todo.title}
              </h3>
              {todo.description && (
                <p className={`mt-1 text-sm ${todo.is_completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                  {todo.description}
                </p>
              )}
              <div className="mt-2 flex items-center text-xs text-gray-500">
                <span>Created: {new Date(todo.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => setIsEditing(true)}
                className="text-primary-600 hover:text-primary-800 p-1 rounded hover:bg-primary-50 transition duration-200"
                title="Edit"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="text-error-600 hover:text-error-800 p-1 rounded hover:bg-error-50 transition duration-200"
                title="Delete"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default TodoItem;