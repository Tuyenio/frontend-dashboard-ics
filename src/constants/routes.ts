/**
 * Application Routes
 * Centralized route paths
 */

export const ROUTES = {
  // Public routes
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  
  // Protected routes
  ADMIN: '/admin',
  USER: '/user',
  VIEW: '/view',
  
  // Landing sections (anchors)
  SECTIONS: {
    HERO: '#hero',
    SERVICES: '#services',
    ABOUT: '#about',
    CONTACT: '#contact',
  },
} as const;

export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.RESET_PASSWORD,
  ROUTES.VIEW,
] as const;

export const PROTECTED_ROUTES = [
  ROUTES.ADMIN,
  ROUTES.USER,
] as const;

export const ADMIN_ROUTES = [
  ROUTES.ADMIN,
] as const;
