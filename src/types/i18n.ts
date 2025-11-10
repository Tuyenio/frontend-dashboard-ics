/**
 * Supported languages
 */
export type Language = 'vi' | 'en';

/**
 * Translation keys structure
 */
export interface Translations {
  nav: {
    home: string;
    services: string;
    about: string;
    contact: string;
    login: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
    cta: {
      primary: string;
      secondary: string;
    };
    stats: {
      clients: string;
      uptime: string;
      support: string;
    };
  };
  services: {
    title: string;
    subtitle: string;
    sales: { title: string; desc: string };
    marketing: { title: string; desc: string };
    healthcare: { title: string; desc: string };
    hr: { title: string; desc: string };
    finance: { title: string; desc: string };
    logistics: { title: string; desc: string };
    ecommerce: { title: string; desc: string };
    analytics: { title: string; desc: string };
  };
  about: {
    title: string;
    subtitle: string;
    realtime: string;
    realtime_desc: string;
    secure: string;
    secure_desc: string;
    customizable: string;
    customizable_desc: string;
    support: string;
    support_desc: string;
    cta: string;
    video_title: string;
    video_subtitle: string;
  };
  contact: {
    title: string;
    address: string;
    phone1: string;
    phone2: string;
    email: string;
    website: string;
  };
  footer: {
    description: string;
    services: string;
    company: string;
    support: string;
    consulting: string;
    monitoring: string;
    encryption: string;
    protection: string;
    about: string;
    team: string;
    news: string;
    careers: string;
    docs: string;
    faqs: string;
    contact: string;
    helpCenter: string;
    privacy: string;
    terms: string;
    rights: string;
  };
  common: {
    scrollToTop: string;
    loading: string;
    error: string;
  };
}

/**
 * Language context interface
 */
export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translations: Translations;
}
