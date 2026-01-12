# UI Patterns Documentation

## Overview
This document describes the UI patterns and components used in the Todo application after the UI/UX enhancement.

## Color Palette
- **Primary**: Blue shades (primary-500: #0ea5e9, primary-600: #0284c7, etc.)
- **Secondary**: Purple shades for accents
- **Success**: Green shades for positive actions
- **Warning**: Amber shades for warnings
- **Error**: Red shades for errors and destructive actions
- **Neutral**: Gray shades for backgrounds and text

## Component Patterns

### 1. Card-based Layout
Used throughout the application for forms, lists, and content sections.
- Rounded corners: `rounded-2xl` or `rounded-lg`
- Shadows: `shadow-lg` or `shadow-sm`
- Borders: `border border-neutral-200`

### 2. Form Elements
- Inputs: `shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-neutral-300 rounded-md p-3`
- Buttons: Use consistent button variants from `buttonVariants` in `src/utils/styles.ts`

### 3. Navigation
- Navbar: Responsive with mobile hamburger menu
- Links: Consistent hover states with color transitions
- Active states: Underlined or highlighted based on context

### 4. Lists and Data Display
- Todo items: Clear visual distinction between completed and pending items
- Empty states: Consistent illustration and messaging
- Loading states: Spinners with appropriate labels

### 5. Accessibility Features
- ARIA labels for interactive elements
- Proper contrast ratios (>4.5:1)
- Keyboard navigation support
- Screen reader compatibility

## Responsive Design
- Mobile-first approach using Tailwind's responsive prefixes
- Breakpoints: sm, md, lg, xl, 2xl
- Flexible layouts that adapt to screen size

## Typography
- Consistent font sizes using Tailwind's scale
- Proper line heights and spacing
- Clear visual hierarchy with headings and body text

## Interactions
- Smooth transitions for hover and focus states
- Loading feedback for asynchronous operations
- Clear visual feedback for user actions