/**
 * Time-based greeting utility functions
 */

/**
 * Gets a time-based greeting message based on the current hour
 * @param hour - The hour of the day (0-23). If not provided, uses current hour
 * @returns A greeting string appropriate for the time of day
 */
export const getTimeBasedGreeting = (hour?: number): string => {
  const currentHour = hour !== undefined ? hour : new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return 'Good Morning';
  } else if (currentHour >= 12 && currentHour < 17) {
    return 'Good Afternoon';
  } else if (currentHour >= 17 && currentHour < 21) {
    return 'Good Evening';
  } else {
    return 'Good Night';
  }
};

/**
 * Gets a contextual greeting based on time and day of week
 * @returns A greeting string with additional contextual information
 */
export const getContextualGreeting = (): string => {
  const hour = new Date().getHours();
  const dayOfWeek = new Date().getDay(); // 0 (Sunday) to 6 (Saturday)

  // Days of the week
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  const baseGreeting = getTimeBasedGreeting(hour);
  const dayName = days[dayOfWeek];

  // Add context based on the day
  switch (dayOfWeek) {
    case 1: // Monday
      return `${baseGreeting}, it's ${dayName}. Great start to the week!`;
    case 5: // Friday
      return `${baseGreeting}, it's ${dayName}! Weekend is almost here.`;
    case 6: // Saturday
    case 0: // Sunday
      return `${baseGreeting}, it's ${dayName}. Enjoy your weekend!`;
    default:
      return `${baseGreeting}, it's ${dayName}. Make the most of your day!`;
  }
};

/**
 * Generates a personalized greeting with time and date information
 * @param userName - Optional user name to include in the greeting
 * @returns A personalized greeting string
 */
export const getPersonalizedGreeting = (userName?: string): string => {
  const contextualGreeting = getContextualGreeting();
  const namePart = userName ? `, ${userName}` : '';

  return `${contextualGreeting}${namePart}`;
};

/**
 * Gets the appropriate greeting message based on various factors
 * @param userName - Optional user name to include in the greeting
 * @param hourOverride - Optional hour to use instead of current hour (for testing)
 * @returns A complete greeting message
 */
export const getFullGreeting = (userName?: string, hourOverride?: number): string => {
  if (hourOverride !== undefined) {
    const baseGreeting = getTimeBasedGreeting(hourOverride);
    const namePart = userName ? `, ${userName}` : '';
    return `${baseGreeting}${namePart}`;
  }

  return getPersonalizedGreeting(userName);
};