'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'blue';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('blue');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && ['light', 'dark', 'blue'].includes(savedTheme)) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Default to blue theme
      setTheme('blue');
      applyTheme('blue');
    }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const html = document.documentElement;
    console.log('Applying theme:', newTheme); // Debug log
    html.classList.remove('light', 'dark', 'blue');
    html.classList.add(newTheme);
    console.log('HTML classes:', html.className); // Debug log
  };

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme', theme);
      applyTheme(theme);
    }
  }, [theme, mounted]);

  const cycleTheme = () => {
    setTheme(prev => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'blue';
      return 'light';
    });
  };

  // Always render children, just don't apply theme until mounted
  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
