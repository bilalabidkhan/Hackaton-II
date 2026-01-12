# Frontend: Full-Stack Todo Web Application

## Overview
This is the frontend for the full-stack todo web application built with Next.js 16+ and React 19.

## Features
- Responsive web interface for todo management
- User authentication and authorization
- Real-time todo operations (CRUD)
- Modern UI with clean design

## Tech Stack
- Next.js 16+ (App Router)
- React 19
- TypeScript
- Better Auth for authentication
- Tailwind CSS for styling

## Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your backend API URL and Better Auth configuration
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Environment Variables

- `NEXT_PUBLIC_API_URL`: Base URL for the backend API
- `NEXT_PUBLIC_BETTER_AUTH_URL`: Base URL for the authentication service

## Project Structure

- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - Reusable React components
- `src/lib/` - Utility functions and API clients
- `src/types/` - TypeScript type definitions

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linting
- `npm run test` - Run tests

## Pages

- `/` - Landing page
- `/todos` - Todo management dashboard
- `/auth/login` - User login page
- `/auth/register` - User registration page