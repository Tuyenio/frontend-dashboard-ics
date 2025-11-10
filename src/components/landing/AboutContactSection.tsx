'use client';

import { motion } from 'framer-motion';
import { Clock, Shield, Settings, Headphones, MapPin, Phone, Mail, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import VideoContainer from '@/components/common/VideoContainer';

export default function AboutContactSection() {
  const { t } = useLanguage();

  const features = [
    { icon: Clock, title: t('about.realtime'), desc: t('about.realtime_desc') },
    { icon: Shield, title: t('about.secure'), desc: t('about.secure_desc') },
    { icon: Settings, title: t('about.customizable'), desc: t('about.customizable_desc') },
    { icon: Headphones, title: t('about.support'), desc: t('about.support_desc') },
  ];

  const contactInfo = [
    { icon: MapPin, label: 'Địa chỉ', value: t('contact.address') },
    { icon: Phone, label: 'Hotline 1', value: t('contact.phone1') },
    { icon: Phone, label: 'Hotline 2', value: t('contact.phone2') },
    { icon: Mail, label: 'Email', value: t('contact.email') },
    { icon: Globe, label: 'Website', value: t('contact.website') },
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-black dark:via-slate-950 dark:to-black blue:from-slate-950 blue:via-slate-900 blue:to-slate-950 relative overflow-hidden transition-colors duration-500">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 dark:opacity-10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            {t('about.title')}
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </motion.div>

        {/* Features Grid - Full Width 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 p-2.5 mb-4">
                <feature.icon className="w-full h-full text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Video Container - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <VideoContainer
            title={t('about.video_title')}
            subtitle={t('about.video_subtitle')}
          />
        </motion.div>

        <div className="max-w-6xl mx-auto" id="contact">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Contact Info - Left Side */}
              <div className="p-8 md:p-12">
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-8">
                  {t('contact.title')}
                </h3>
                <div className="space-y-4 mb-8">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 5 }}
                      className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 p-2 flex-shrink-0">
                        <item.icon className="w-full h-full text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">{item.label}</div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-white break-words">{item.value}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <a
                    href="/login"
                    className="inline-block w-full text-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-xl shadow-2xl shadow-blue-500/50 dark:shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                  >
                    {t('about.cta')}
                  </a>
                </motion.div>
              </div>

              {/* Google Maps - Right Side */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="h-full min-h-[500px] lg:min-h-full relative"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.0938771374844!2d105.8333!3d20.9833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac800f0e0000%3A0x0!2zVFQzLTUgxJDhuqFpIEtpbSwgxJDhu4tuaCBDw7RuZywgSG_DoG5nIE1haSwgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                  title="Bản đồ vị trí ICS"
                ></iframe>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
