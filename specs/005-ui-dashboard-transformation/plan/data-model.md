# Data Model Specification: Premium Todo Dashboard UI

## Key Entities

### DashboardStats
- **Properties**:
  - completionRate: number (percentage of completed tasks)
  - weeklyProgress: number (trend indicator)
  - trendingTasks: Todo[] (recently added or completed tasks)
  - totalTasks: number (total count of tasks)
  - completedTasks: number (count of completed tasks)

### UserGreeting
- **Properties**:
  - message: string (personalized greeting text)
  - timestamp: Date (time of access for dynamic greeting)
  - productivityInsight: string (brief insight about user's productivity)

### TodoCardProps
- **Properties**:
  - id: string (unique identifier)
  - title: string (task title)
  - description?: string (optional task details)
  - completed: boolean (completion status)
  - createdAt: string (creation timestamp)
  - updatedAt: string (last update timestamp)
  - isEditing?: boolean (editing state flag)

### AnimationState
- **Properties**:
  - open: boolean (open/closed state for expandable components)
  - closed: boolean (opposite of open)
  - transitioning: boolean (in transition state)

### GlassmorphismStyle
- **Properties**:
  - backdropBlur: string (blur intensity)
  - backgroundColor: string (semi-transparent background)
  - border: string (glass-like border)
  - boxShadow: string (subtle shadow for depth)

## Component Props Interfaces

### WelcomePanelProps
- **Properties**:
  - user: User (authenticated user object)
  - greeting: UserGreeting (dynamic greeting data)
  - stats: DashboardStats (productivity statistics)

### AddTodoCardProps
- **Properties**:
  - isOpen: boolean (visibility state)
  - onAddTodo: Function (callback for adding new todo)
  - onClose: Function (callback for closing card)

### StatsCardProps
- **Properties**:
  - stats: DashboardStats (statistics to display)
  - isLoading: boolean (loading state indicator)

### TodoItemCardProps
- **Properties**:
  - todo: Todo (todo item data)
  - onToggleComplete: Function (callback for completion toggle)
  - onEdit: Function (callback for editing)
  - onDelete: Function (callback for deletion)
  - isEditing?: boolean (editing state)