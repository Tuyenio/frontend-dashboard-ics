/**
 * AuthLayout Component
 * Reusable layout for all authentication pages
 */

'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Sun, Moon, Palette, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/hooks/useTheme';

interface AuthLayoutProps {
  children: ReactNode;
  backHref?: string;
  backLabel?: string;
}

export default function AuthLayout({ 
  children, 
  backHref = '/', 
  backLabel 
}: AuthLayoutProps) {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme, mounted } = useTheme();

  const toggleLanguage = () => {
    const newLang = language === 'vi' ? 'en' : 'vi';
    setLanguage(newLang);
  };

  if (!mounted) {
    return null; // Prevent flash of unstyled content
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 light:from-white light:via-slate-50 light:to-slate-100 dark:from-black dark:via-slate-950 dark:to-black blue:from-slate-950 blue:via-slate-900 blue:to-slate-950 flex items-center justify-center p-6 transition-colors duration-500">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 light:opacity-10"></div>

      {/* Logo Watermark */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 light:opacity-10 pointer-events-none z-0">
        <Image 
          src="/logoics.png" 
          alt="ICS" 
          width={400} 
          height={400} 
          className="object-contain" 
        />
      </div>

      {/* Top Controls */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
        {/* Back Button */}
        <Link
          href={backHref}
          className="flex items-center gap-2 text-slate-600 light:text-slate-700 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">
            {backLabel || t('common.backToHome') || 'Về trang chủ'}
          </span>
        </Link>

        {/* Theme + Language Controls */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="p-2 rounded-lg bg-white/80 light:bg-white light:shadow-md dark:bg-slate-800/80 blue:bg-slate-800/80 border border-slate-200 dark:border-slate-700 blue:border-slate-700 hover:bg-white dark:hover:bg-slate-700 blue:hover:bg-slate-700 transition-all"
            title={language === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
          >
            <Globe className="w-5 h-5 text-slate-600 light:text-slate-700 dark:text-slate-400" />
          </button>

          {/* Theme Toggles */}
          <button
            onClick={() => setTheme('light')}
            className={`p-2 rounded-lg border transition-all ${
              theme === 'light'
                ? 'bg-yellow-100 border-yellow-300 shadow-md'
                : 'bg-white/80 light:bg-white light:shadow-md dark:bg-slate-800/80 blue:bg-slate-800/80 border-slate-200 dark:border-slate-700 blue:border-slate-700'
            }`}
            title="Light Mode"
          >
            <Sun className="w-5 h-5 text-yellow-600" />
          </button>

          <button
            onClick={() => setTheme('dark')}
            className={`p-2 rounded-lg border transition-all ${
              theme === 'dark'
                ? 'bg-slate-700 border-slate-600'
                : 'bg-white/80 light:bg-white light:shadow-md dark:bg-slate-800/80 blue:bg-slate-800/80 border-slate-200 dark:border-slate-700 blue:border-slate-700'
            }`}
            title="Dark Mode"
          >
            <Moon className="w-5 h-5 text-slate-400 light:text-slate-600" />
          </button>

          <button
            onClick={() => setTheme('blue')}
            className={`p-2 rounded-lg border transition-all ${
              theme === 'blue'
                ? 'bg-blue-900 border-blue-700'
                : 'bg-white/80 light:bg-white light:shadow-md dark:bg-slate-800/80 blue:bg-slate-800/80 border-slate-200 dark:border-slate-700 blue:border-slate-700'
            }`}
            title="Blue Mode"
          >
            <Palette className="w-5 h-5 text-blue-400 light:text-blue-600" />
          </button>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md z-10"
      >
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 rounded-3xl blur-2xl opacity-20 light:opacity-10"></div>

        {/* Card */}
        <div className="relative bg-white light:bg-white light:shadow-2xl dark:bg-slate-900 blue:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 blue:border-slate-800 p-8 md:p-12">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
