'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon, Palette } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeTest() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [htmlClass, setHtmlClass] = useState('');

  useEffect(() => {
    setMounted(true);
    setHtmlClass(document.documentElement.className);
  }, [theme]);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-4 right-4 p-4 rounded-lg shadow-xl z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
      <div className="mb-2 text-sm font-bold">
        Current Theme: <span className="text-blue-600">{theme}</span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setTheme('light')}
          className={`p-2 rounded ${theme === 'light' ? 'bg-yellow-100' : 'bg-gray-100'}`}
          title="Light"
        >
          <Sun className="w-5 h-5" />
        </button>
        <button
          onClick={() => setTheme('dark')}
          className={`p-2 rounded ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
          title="Dark"
        >
          <Moon className="w-5 h-5" />
        </button>
        <button
          onClick={() => setTheme('blue')}
          className={`p-2 rounded ${theme === 'blue' ? 'bg-blue-700 text-white' : 'bg-gray-100'}`}
          title="Blue"
        >
          <Palette className="w-5 h-5" />
        </button>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        HTML class: {htmlClass}
      </div>
    </div>
  );
}
