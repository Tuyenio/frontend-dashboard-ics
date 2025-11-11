/**
 * useTheme Hook
 * Theme management with persistence
 */

'use client';

import { useState, useEffect } from 'react';
import { STORAGE_KEYS, THEME_VALUES } from '@/constants';

export type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  /**
   * Initialize theme from localStorage
   */
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) as Theme;
    
    if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
      setThemeState(savedTheme as Theme);
      applyTheme(savedTheme as Theme);
    } else {
      // Default to dark theme (premium deep blue)
      setThemeState('dark');
      applyTheme('dark');
    }
  }, []);

  /**
   * Apply theme to document
   */
  const applyTheme = (newTheme: Theme) => {
    if (typeof document === 'undefined') return;
    
    const html = document.documentElement;
    html.classList.remove('light', 'dark');
    html.classList.add(newTheme);
  };

  /**
   * Set theme and persist
   */
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
    applyTheme(newTheme);
  };

  /**
   * Toggle between light and dark themes
   */
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
    applyTheme(newTheme);
  };

  return {
    theme,
    setTheme,
    toggleTheme,
    mounted,
  };
}
