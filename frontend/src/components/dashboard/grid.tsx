'use client';

import React from 'react';

interface GridContainerProps {
  children: React.ReactNode;
  className?: string;
  gap?: 'sm' | 'md' | 'lg' | 'xl'; // Gap size options
  cols?: number; // Number of columns for desktop
  colsTablet?: number; // Number of columns for tablet
  colsMobile?: number; // Number of columns for mobile
}

const GridContainer: React.FC<GridContainerProps> = ({
  children,
  className = '',
  gap = 'md',
  cols = 1,
  colsTablet = 1,
  colsMobile = 1
}) => {
  // Map gap sizes to Tailwind classes
  const gapClass = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12'
  }[gap];

  // Determine grid column classes based on responsive props
  const gridClass = `grid grid-cols-${cols} gap-6 md:grid-cols-${colsTablet} sm:grid-cols-${colsMobile}`;

  return (
    <div className={`${gridClass} ${gapClass} ${className}`}>
      {children}
    </div>
  );
};

interface GridItemProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: number; // How many columns this item spans
  rowSpan?: number; // How many rows this item spans
  alignSelf?: 'start' | 'center' | 'end' | 'stretch'; // Vertical alignment
  justifySelf?: 'start' | 'center' | 'end' | 'stretch'; // Horizontal alignment
}

const GridItem: React.FC<GridItemProps> = ({
  children,
  className = '',
  colSpan,
  rowSpan,
  alignSelf,
  justifySelf
}) => {
  const colSpanClass = colSpan ? `col-span-${colSpan}` : '';
  const rowSpanClass = rowSpan ? `row-span-${rowSpan}` : '';

  const alignSelfClass = alignSelf ? `self-${alignSelf}` : '';
  const justifySelfClass = justifySelf ? `justify-self-${justifySelf}` : '';

  return (
    <div className={`${colSpanClass} ${rowSpanClass} ${alignSelfClass} ${justifySelfClass} ${className}`}>
      {children}
    </div>
  );
};

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  breakpoints?: {
    mobile?: number; // Columns on mobile
    tablet?: number; // Columns on tablet
    desktop?: number; // Columns on desktop
  };
}

const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  className = '',
  gap = 'md',
  breakpoints = { mobile: 1, tablet: 2, desktop: 3 }
}) => {
  const gapClass = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12'
  }[gap];

  // Construct responsive grid classes
  const gridClass = `grid ${gapClass} grid-cols-${breakpoints.mobile} sm:grid-cols-${breakpoints.tablet} lg:grid-cols-${breakpoints.desktop}`;

  return (
    <div className={`${gridClass} ${className}`}>
      {children}
    </div>
  );
};

export { GridContainer, GridItem, ResponsiveGrid };