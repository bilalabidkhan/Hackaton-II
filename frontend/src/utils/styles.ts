// Global styling utilities and helper classes

// Button variants
export const buttonVariants = {
  primary: 'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition duration-200',
  secondary: 'inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition duration-200',
  danger: 'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-error-600 hover:bg-error-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-error-500 transition duration-200',
  ghost: 'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition duration-200',
};

// Card styling
export const cardClasses = 'bg-white overflow-hidden shadow rounded-lg border border-neutral-200';

// Input styling
export const inputClasses = 'shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-neutral-300 rounded-md p-3';

// Form styling
export const formContainerClasses = 'bg-white p-6 rounded-lg shadow-sm border border-neutral-200 max-w-md mx-auto';

// Container styling
export const containerClasses = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';

// Typography classes
export const headingClasses = {
  h1: 'text-3xl font-extrabold text-gray-900 sm:text-4xl',
  h2: 'text-2xl font-bold text-gray-900',
  h3: 'text-xl font-semibold text-gray-900',
  h4: 'text-lg font-medium text-gray-900',
};

// Status badge variants
export const statusBadgeClasses = {
  success: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800',
  warning: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-100 text-warning-800',
  error: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-error-100 text-error-800',
  info: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800',
};

// Responsive classes
export const responsiveClasses = {
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  card: 'md:flex md:space-x-6',
  grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6',
};