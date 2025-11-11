'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageDropdown from '@/components/common/LanguageDropdown';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const offset = 100; // Offset for fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: t('nav.home'), href: '#hero' },
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-b border-slate-200 dark:border-white/10 shadow-lg shadow-blue-500/5'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Left */}
          <motion.a
            href="#hero"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 group"
          >
            <div className="relative w-16 h-16 group-hover:scale-105 transition-transform duration-300">
              <Image src="/logoics.png" alt="ICS Logo" fill className="object-contain" priority />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                ICS
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Dashboard</div>
            </div>
          </motion.a>

          {/* Nav Links - Center */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2"
          >
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </motion.div>

          {/* Controls - Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex items-center gap-4"
          >
            {/* Language Dropdown */}
            <LanguageDropdown />

            {/* Theme Toggle - Light/Dark */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="Toggle theme"
              title={theme === 'light' ? 'Chuyển sang Tối' : 'Chuyển sang Sáng'}
            >
              {theme === 'light' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Login Button */}
            <a
              href="/login"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-black rounded-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 dark:shadow-blue-500/40 transition-all duration-300 hover:scale-105 border border-blue-400/20"
            >
              {t('nav.login')}
            </a>
          </motion.div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-6 space-y-4 border-t border-slate-200 dark:border-white/10">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-300 py-2"
              >
                {link.label}
              </a>
            ))}
            
            {/* Mobile Controls */}
            <div className="flex items-center gap-3 pt-4">
              <div className="flex-1">
                <LanguageDropdown />
              </div>
              
              <button
                onClick={toggleTheme}
                className="w-12 h-12 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                title={theme === 'light' ? 'Chuyển sang Tối' : 'Chuyển sang Sáng'}
              >
                {theme === 'light' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
            
            <a
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-black rounded-lg text-center shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 dark:shadow-blue-500/40 transition-all duration-300 border border-blue-400/20"
            >
              {t('nav.login')}
            </a>
          </div>
        </motion.div>
      </div>
    </nav>
  );
}
