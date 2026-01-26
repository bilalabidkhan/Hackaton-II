'use client';
import React, { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';
import { useAuth } from '@/contexts/auth-context';
import DashboardLayout from '@/components/dashboard/layout';
import WelcomePanel from '@/components/dashboard/welcome-panel';
import AddTodoCard from '@/components/dashboard/add-todo-card';
import TodoItemCard from '@/components/dashboard/todo-item-card';
import StatsCard from '@/components/dashboard/stats-card';
import { UserGreeting } from '@/types/dashboard';
import { TodoItem, getProductivityMetrics, generateProductivityInsight, getWeeklyProductivityInsights } from '@/utils/productivity-insights';
import { getTimeBasedGreeting } from '@/utils/time-greeting';
import { useRouter } from 'next/navigation';

interface Todo {
  id: string;
  title: string;
  description?: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
}

const TodoDashboard = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddTodo, setShowAddTodo] = useState(false);
  const { user, signout, loading: authLoading } = useAuth();

  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated]);

  // Load todos on component mount, only when auth is loaded
  useEffect(() => {
    if (!authLoading) {
      fetchTodos();
    }
  }, [authLoading]);

  const fetchTodos = async () => {
    try {
      setPageLoading(true);
      const todosData: Todo[] = await apiClient.getTodos();
      setTodos(todosData);
      setError(null);
    } catch (err) {
      setError('Failed to load todos. Please try again later.');
      console.error('Error fetching todos:', err);
    } finally {
      setPageLoading(false);
    }
  };

  const handleAddTodo = async (title: string, description?: string) => {
    try {
      const newTodo: Todo = await apiClient.createTodo(title, description);
      setTodos([newTodo, ...todos]);
      setShowAddTodo(false); // Close the form after adding
    } catch (err) {
      setError('Failed to add todo. Please try again.');
      console.error('Error adding todo:', err);
    }
  };

  const handleUpdateTodo = async (id: string, title: string, description?: string) => {
    try {
      const updatedTodo: Todo = await apiClient.updateTodo(id, title, description);
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
    } catch (err) {
      setError('Failed to update todo. Please try again.');
      console.error('Error updating todo:', err);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await apiClient.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo. Please try again.');
      console.error('Error deleting todo:', err);
    }
  };

  const handleToggleComplete = async (id: string, isCompleted: boolean) => {
    try {
      const updatedTodo: Todo = await apiClient.toggleTodoComplete(id, isCompleted);
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
    } catch (err) {
      setError('Failed to update todo status. Please try again.');
      console.error('Error toggling todo:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await signout();
    } catch (err) {
      setError('Failed to log out. Please try again.');
      console.error('Error logging out:', err);
    }
  };

  // Helper function to map Todo to TodoItem
  const mapTodoToTodoItem = (todo: Todo): TodoItem => ({
    id: todo.id,
    title: todo.title,
    description: todo.description,
    completed: todo.is_completed, // Map is_completed to completed
    created_at: todo.created_at,
    updated_at: todo.updated_at,
    user_id: todo.user_id
  });

  // Generate greeting data
  const greeting: UserGreeting = {
    message: getTimeBasedGreeting(),
    timestamp: new Date(),
    productivityInsight: generateProductivityInsight(todos.map(mapTodoToTodoItem))
  };

  // Generate stats data
  const stats = getProductivityMetrics(todos.map(mapTodoToTodoItem));

  if (pageLoading || authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mb-4"></div>
          <p className="text-white">Loading your todos...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Panel */}
        <WelcomePanel
          user={{ email: user?.email, name: user?.name }}
          greeting={greeting}
          stats={{
            completionRate: stats.completionRate,
            weeklyProgress: stats.weeklyProgress
          }}
        />

        {/* Stats Card */}
        <StatsCard
          stats={stats}
          isLoading={pageLoading}
        />

        {/* Add Todo Section */}
        <div className="mb-8">
          <button
            onClick={() => setShowAddTodo(!showAddTodo)}
            className="w-full py-4 px-6 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
          >
            {showAddTodo ? 'Cancel Adding Task' : '+ Add New Task'}
          </button>

          <AddTodoCard
            onAddTodo={handleAddTodo}
            isOpen={showAddTodo}
            onClose={() => setShowAddTodo(false)}
          />
        </div>

        {/* Todo List */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Your Tasks</h2>

          {todos.length === 0 ? (
            <div className="glass rounded-2xl p-12 text-center border border-white/10">
              <svg className="mx-auto h-12 w-12 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-white">No tasks yet</h3>
              <p className="mt-1 text-neutral-400">Get started by adding a new task above.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {todos.map(todo => (
                <TodoItemCard
                  key={todo.id}
                  todo={mapTodoToTodoItem(todo)}
                  onToggleComplete={handleToggleComplete}
                  onEdit={handleUpdateTodo}
                  onDelete={handleDeleteTodo}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="fixed bottom-4 right-4 bg-error-500 text-white p-4 rounded-lg shadow-lg">
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-4 text-white underline"
          >
            Dismiss
          </button>
        </div>
      )}
    </DashboardLayout>
  );
};

export default TodoDashboard;