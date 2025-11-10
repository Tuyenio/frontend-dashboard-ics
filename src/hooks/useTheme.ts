/**
 * useTheme Hook
 * Theme management with persistence
 */

'use client';

import { useState, useEffect } from 'react';
import { STORAGE_KEYS, THEME_VALUES } from '@/constants';

export type Theme = 'light' | 'dark' | 'blue';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('blue');
  const [mounted, setMounted] = useState(false);

  /**
   * Initialize theme from localStorage
   */
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) as Theme;
    
    if (savedTheme && Object.values(THEME_VALUES).includes(savedTheme)) {
      setThemeState(savedTheme as Theme);
      applyTheme(savedTheme as Theme);
    } else {
      // Default to blue theme
      setThemeState('blue');
      applyTheme('blue');
    }
  }, []);

  /**
   * Apply theme to document
   */
  const applyTheme = (newTheme: Theme) => {
    if (typeof document === 'undefined') return;
    
    const html = document.documentElement;
    html.classList.remove('light', 'dark', 'blue');
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
   * Cycle through themes
   */
  const cycleTheme = () => {
    setThemeState((prev: Theme) => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'blue';
      return 'light';
    });
    
    // Apply the cycled theme
    const newTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'blue' : 'light';
    localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
    applyTheme(newTheme);
  };

  return {
    theme,
    setTheme,
    cycleTheme,
    mounted,
  };
}
