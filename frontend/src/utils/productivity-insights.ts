/**
 * Productivity insights calculation utilities
 */

// Define the structure for a todo item
export interface TodoItem {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  created_at: string; // ISO date string
  updated_at: string;
  user_id: string;
}

/**
 * Calculates the completion rate percentage
 * @param todos - Array of todo items
 * @returns Completion rate as a percentage (0-100)
 */
export const calculateCompletionRate = (todos: TodoItem[]): number => {
  if (todos.length === 0) {
    return 0;
  }

  const completedCount = todos.filter(todo => todo.completed).length;
  return Math.round((completedCount / todos.length) * 100);
};

/**
 * Calculates the weekly progress based on completion rate
 * @param currentWeekTodos - Todos from the current week
 * @param previousWeekTodos - Todos from the previous week
 * @returns Weekly progress as a percentage change (-100 to 100)
 */
export const calculateWeeklyProgress = (
  currentWeekTodos: TodoItem[],
  previousWeekTodos: TodoItem[]
): number => {
  const currentRate = calculateCompletionRate(currentWeekTodos);
  const previousRate = calculateCompletionRate(previousWeekTodos);

  if (previousRate === 0) {
    return currentRate > 0 ? 100 : 0;
  }

  return Math.round(((currentRate - previousRate) / previousRate) * 100);
};

/**
 * Gets the trending tasks based on creation or completion date
 * @param todos - Array of todo items
 * @param limit - Number of trending tasks to return (default: 3)
 * @returns Array of trending task titles
 */
export const getTrendingTasks = (todos: TodoItem[], limit: number = 3): string[] => {
  // Sort todos by creation date (newest first) and take the specified limit
  const sortedTodos = [...todos]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit);

  return sortedTodos.map(todo => todo.title);
};

/**
 * Generates a productivity insight string based on the user's todo data
 * @param todos - Array of todo items
 * @returns A string with a productivity insight
 */
export const generateProductivityInsight = (todos: TodoItem[]): string => {
  if (todos.length === 0) {
    return "It's a fresh start! Add your first task to begin your productivity journey.";
  }

  const completionRate = calculateCompletionRate(todos);
  const completedCount = todos.filter(todo => todo.completed).length;

  // Generate different insights based on completion rate
  if (completionRate >= 80) {
    return `Outstanding! You've completed ${completedCount} of ${todos.length} tasks with an ${completionRate}% completion rate. Keep up the excellent work!`;
  } else if (completionRate >= 60) {
    return `Great progress! You've completed ${completedCount} of ${todos.length} tasks with a ${completionRate}% completion rate. You're on the right track!`;
  } else if (completionRate >= 40) {
    return `Good effort! You've completed ${completedCount} of ${todos.length} tasks with a ${completionRate}% completion rate. Keep going!`;
  } else if (completionRate > 0) {
    return `You're making progress! You've completed ${completedCount} of ${todos.length} tasks with a ${completionRate}% completion rate. Every step counts!`;
  } else {
    return `It's time to take action! You have ${todos.length} tasks waiting. Start with the most important one today!`;
  }
};

/**
 * Gets productivity metrics for the dashboard
 * @param todos - Array of todo items
 * @param previousWeekTodos - Todos from the previous week for comparison
 * @returns Object containing productivity metrics
 */
export const getProductivityMetrics = (
  todos: TodoItem[],
  previousWeekTodos: TodoItem[] = []
) => {
  return {
    completionRate: calculateCompletionRate(todos),
    weeklyProgress: calculateWeeklyProgress(todos, previousWeekTodos),
    trendingTasks: getTrendingTasks(todos),
    totalTasks: todos.length,
    completedTasks: todos.filter(todo => todo.completed).length
  };
};

/**
 * Gets productivity insights for the current week
 * @param todos - Array of all todo items
 * @returns Productivity insights for the current week
 */
export const getWeeklyProductivityInsights = (todos: TodoItem[]) => {
  const now = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(now.getDate() - 7);

  const currentWeekTodos = todos.filter(todo => {
    const todoDate = new Date(todo.created_at);
    return todoDate >= oneWeekAgo && todoDate <= now;
  });

  // Get previous week todos for comparison
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(now.getDate() - 14);

  const previousWeekTodos = todos.filter(todo => {
    const todoDate = new Date(todo.created_at);
    return todoDate >= twoWeeksAgo && todoDate < oneWeekAgo;
  });

  return {
    currentWeekMetrics: getProductivityMetrics(currentWeekTodos),
    comparisonMetrics: getProductivityMetrics(previousWeekTodos),
    insightMessage: generateProductivityInsight(currentWeekTodos)
  };
};