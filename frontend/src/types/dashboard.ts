// Dashboard-related TypeScript interfaces

export interface UserGreeting {
  
  timestamp: Date;
  productivityInsight: string;
}

export interface DashboardStats {
  completionRate: number;
  weeklyProgress: number;
  trendingTasks: string[];
  totalTasks: number;
  completedTasks: number;
}

export interface TodoCardProps {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  isEditing?: boolean;
}

export interface AnimationState {
  open: boolean;
  closed: boolean;
  transitioning: boolean;
}