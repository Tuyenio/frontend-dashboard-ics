'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Activity } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRef } from 'react';

export default function HeroSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  // Fixed positions for particles to avoid hydration mismatch
  const particles = useRef(
    Array.from({ length: 50 }, (_, i) => ({
      left: (i * 7.3) % 100,
      top: (i * 13.7) % 100,
      duration: 3 + (i % 3),
      delay: (i % 5) * 0.4
    }))
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-black dark:via-slate-950 dark:to-black pt-20 transition-colors duration-500">
      {/* Animated background particles */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 overflow-hidden" suppressHydrationWarning>
        {particles.current.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 dark:bg-blue-500/10 rounded-full"
            style={{ left: `${particle.left}%`, top: `${particle.top}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: particle.duration, repeat: Infinity, delay: particle.delay }}
          />
        ))}
      </motion.div>

      {/* Floating icons with parallax */}
      {[
        { Icon: BarChart3, x: '10%', y: '20%', delay: 0 },
        { Icon: TrendingUp, x: '85%', y: '15%', delay: 0.5 },
        { Icon: Users, x: '15%', y: '70%', delay: 1 },
        { Icon: Activity, x: '80%', y: '65%', delay: 1.5 },
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 0.5, delay: item.delay }}
          className="absolute"
          style={{ left: item.x, top: item.y }}
        >
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <item.Icon className="w-16 h-16 text-blue-500/30 dark:text-blue-400/20" />
          </motion.div>
        </motion.div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-white/50 dark:from-slate-950/50 to-transparent" />

      <motion.div style={{ scale, opacity }} className="container mx-auto px-6 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto text-center"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                🚀 {t('hero.subtitle')}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight antialiased">
              <span className="gradient-text animate-gradient block" style={{ 
                fontFeatureSettings: '"kern" 1, "liga" 1',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                textRendering: 'optimizeLegibility'
              }}>
                {t('hero.title')}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed mb-6 px-4">
              {t('hero.description')}
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 text-sm text-slate-500 dark:text-slate-500">
              <span className="px-3 py-1 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
                �� Sales Analytics
              </span>
              <span className="px-3 py-1 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
                📈 Marketing Insights
              </span>
              <span className="px-3 py-1 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
                🏥 Healthcare Management
              </span>
              <span className="px-3 py-1 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
                👥 HR Dashboard
              </span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="/register" className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-black rounded-xl shadow-2xl shadow-blue-500/50 dark:shadow-blue-500/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1 border border-blue-400/20">
              <span className="flex items-center justify-center gap-2 text-shadow-sm">
                {t('hero.cta.primary')}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
            <a href="#about" className="group px-8 py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-300 font-black rounded-xl border-2 border-blue-600 dark:border-blue-400 shadow-lg dark:shadow-xl dark:shadow-blue-500/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
              <span className="flex items-center justify-center gap-2">
                {t('hero.cta.secondary')}
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { label: t('hero.stats.clients'), value: '500+', icon: '👥' },
              { label: t('hero.stats.uptime'), value: '99.9%', icon: '⚡' },
              { label: t('hero.stats.support'), value: '24/7', icon: '🛡️' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-8 rounded-2xl glass card-glow"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-2">{stat.value}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-blue-600 dark:border-blue-400 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
