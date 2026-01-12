'use client';

import React from 'react';
import TodoItem from './todo-item';

interface Todo {
  id: string;
  title: string;
  description?: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
}

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: string, isCompleted: boolean) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string, description?: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggleComplete,
  onDelete,
  onUpdate
}) => {
  const completedCount = todos.filter(todo => todo.is_completed).length;
  const pendingCount = todos.length - completedCount;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Your Todos</h2>
        <div className="flex space-x-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
            Pending: {pendingCount}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-success-100 text-success-800">
            Completed: {completedCount}
          </span>
        </div>
      </div>

      {todos.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No todos yet</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding a new todo.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li key={todo.id} className="group">
              <TodoItem
                todo={todo}
                onToggleComplete={onToggleComplete}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;