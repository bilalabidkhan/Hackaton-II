/**
 * Glassmorphism utility functions for the dashboard
 */

// Type definitions
export interface GlassmorphismOptions {
  blur?: number; // Blur radius in pixels (default: 10)
  opacity?: number; // Background opacity (default: 0.1)
  borderColor?: string; // Border color (default: rgba(255, 255, 255, 0.2))
  borderRadius?: number; // Border radius in pixels (default: 12)
  borderWidth?: number; // Border width in pixels (default: 1)
  contrast?: number; // Contrast adjustment (default: 1)
  brightness?: number; // Brightness adjustment (default: 1)
}

// Default options for glassmorphism effect
const DEFAULT_GLASS_OPTIONS: GlassmorphismOptions = {
  blur: 10,
  opacity: 0.1,
  borderColor: 'rgba(255, 255, 255, 0.2)',
  borderRadius: 12,
  borderWidth: 1,
  contrast: 1,
  brightness: 1
};

/**
 * Generates CSS styles for a glassmorphism effect
 * @param options - Glassmorphism effect options
 * @returns CSS styles object
 */
export const getGlassmorphismStyles = (options?: GlassmorphismOptions): React.CSSProperties => {
  const mergedOptions = { ...DEFAULT_GLASS_OPTIONS, ...options };

  return {
    background: `rgba(255, 255, 255, ${mergedOptions.opacity})`,
    backdropFilter: `blur(${mergedOptions.blur}px)`,
    WebkitBackdropFilter: `blur(${mergedOptions.blur}px)`,
    border: `${mergedOptions.borderWidth}px solid ${mergedOptions.borderColor}`,
    borderRadius: `${mergedOptions.borderRadius}px`,
    boxShadow: `0 4px 30px rgba(0, 0, 0, 0.1)`,
    // Apply contrast and brightness adjustments if specified
    ...(mergedOptions.contrast !== 1 && { filter: `contrast(${mergedOptions.contrast}) brightness(${mergedOptions.brightness})` })
  };
};

/**
 * Generates CSS class names for glassmorphism effect
 * @param variant - Size variant ('sm', 'md', 'lg') - default is 'md'
 * @returns String of CSS class names
 */
export const getGlassmorphismClasses = (variant: 'sm' | 'md' | 'lg' = 'md'): string => {
  switch (variant) {
    case 'sm':
      return 'glass-sm';
    case 'lg':
      return 'glass-lg';
    case 'md':
    default:
      return 'glass';
  }
};

/**
 * Generates dark mode CSS styles for glassmorphism effect
 * @param options - Glassmorphism effect options
 * @returns CSS styles object for dark mode
 */
export const getDarkGlassmorphismStyles = (options?: GlassmorphismOptions): React.CSSProperties => {
  const mergedOptions = { ...DEFAULT_GLASS_OPTIONS, ...options };

  // Adjust default values for dark mode
  const darkOptions = {
    ...mergedOptions,
    opacity: mergedOptions.opacity !== DEFAULT_GLASS_OPTIONS.opacity
      ? mergedOptions.opacity
      : 0.05, // Lower default opacity for dark mode
    borderColor: mergedOptions.borderColor !== DEFAULT_GLASS_OPTIONS.borderColor
      ? mergedOptions.borderColor
      : 'rgba(255, 255, 255, 0.1)' // Softer border in dark mode
  };

  return {
    background: `rgba(255, 255, 255, ${darkOptions.opacity})`,
    backdropFilter: `blur(${darkOptions.blur}px)`,
    WebkitBackdropFilter: `blur(${darkOptions.blur}px)`,
    border: `${darkOptions.borderWidth}px solid ${darkOptions.borderColor}`,
    borderRadius: `${darkOptions.borderRadius}px`,
    boxShadow: `0 4px 30px rgba(0, 0, 0, 0.1)`
  };
};

/**
 * Checks if the user prefers reduced motion
 * @returns Boolean indicating if reduced motion is preferred
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return false;
};

/**
 * Gets appropriate glassmorphism styles based on dark mode preference
 * @param isDarkMode - Whether dark mode is active
 * @param options - Glassmorphism effect options
 * @returns CSS styles object
 */
export const getResponsiveGlassmorphismStyles = (
  isDarkMode: boolean,
  options?: GlassmorphismOptions
): React.CSSProperties => {
  return isDarkMode
    ? getDarkGlassmorphismStyles(options)
    : getGlassmorphismStyles(options);
};