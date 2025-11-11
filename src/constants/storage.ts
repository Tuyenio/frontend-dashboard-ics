/**
 * Storage Keys
 * Centralized localStorage/sessionStorage keys
 */

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

export const THEME_VALUES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export const LANGUAGE_VALUES = {
  VI: 'vi',
  EN: 'en',
} as const;
