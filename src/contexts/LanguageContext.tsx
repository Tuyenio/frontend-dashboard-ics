'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { Language, LanguageContextType, Translations } from '@/types/i18n';

// Import JSON translations
import viTranslations from '@/locales/vi.json';
import enTranslations from '@/locales/en.json';

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation map
const translationsMap: Record<Language, Translations> = {
  vi: viTranslations as Translations,
  en: enTranslations as Translations,
};

/**
 * Language Provider Component
 * Manages language state and provides translation function
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('vi');
  const [mounted, setMounted] = useState(false);

  // Load saved language on mount
  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'vi' || savedLang === 'en')) {
      setLanguageState(savedLang);
    }
  }, []);

  // Save language to localStorage when changed
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('language', language);
      // Update HTML lang attribute for accessibility
      document.documentElement.lang = language;
    }
  }, [language, mounted]);

  /**
   * Change language
   */
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  /**
   * Get translation by key (supports nested keys with dot notation)
   * @param key - Translation key (e.g., 'nav.home', 'hero.title')
   * @returns Translated string or key if not found
   */
  const t = (key: string): string => {
    try {
      const keys = key.split('.');
      let result: any = translationsMap[language];
      
      for (const k of keys) {
        if (result && typeof result === 'object' && k in result) {
          result = result[k];
        } else {
          console.warn(`Translation key not found: ${key}`);
          return key;
        }
      }
      
      return typeof result === 'string' ? result : key;
    } catch (error) {
      console.error(`Error getting translation for key: ${key}`, error);
      return key;
    }
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    translations: translationsMap[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Hook to use language context
 * Must be used within LanguageProvider
 */
export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
