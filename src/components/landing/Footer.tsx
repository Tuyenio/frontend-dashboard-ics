'use client';

import { motion } from 'framer-motion';
import { BarChart3, Facebook, Linkedin, Twitter, Youtube } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: t('footer.services'),
      links: [
        { label: t('footer.consulting'), href: '#' },
        { label: t('footer.monitoring'), href: '#' },
        { label: t('footer.encryption'), href: '#' },
        { label: t('footer.protection'), href: '#' },
      ],
    },
    {
      title: t('footer.company'),
      links: [
        { label: t('footer.about'), href: '#' },
        { label: t('footer.team'), href: '#' },
        { label: t('footer.news'), href: '#' },
        { label: t('footer.careers'), href: '#' },
      ],
    },
    {
      title: t('footer.support'),
      links: [
        { label: t('footer.docs'), href: '#' },
        { label: t('footer.faqs'), href: '#' },
        { label: t('footer.contact'), href: '#' },
        { label: t('footer.helpCenter'), href: '#' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-700' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:bg-red-600' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 to-slate-950 dark:from-black dark:to-slate-950 blue:from-slate-900 blue:to-slate-950 border-t border-white/10 transition-colors duration-500">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12">
                  <Image src="/logoics.png" alt="ICS Logo" fill className="object-contain" />
                </div>
                <div>
                  <div className="text-2xl font-black text-white">ICS</div>
                  <div className="text-xs text-slate-400">Dashboard Solutions</div>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                {t('footer.description')}
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 rounded-lg bg-white/5 ${social.color} border border-white/10 hover:border-white/30 flex items-center justify-center transition-all duration-300`}
                  >
                    <social.icon className="w-5 h-5 text-slate-400 hover:text-white transition-colors" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {footerLinks.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-bold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-blue-400 text-sm transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm text-center md:text-left">
              © {currentYear} ICS Dashboard. {t('footer.rights')}
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
                {t('footer.privacy')}
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
                {t('footer.terms')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
