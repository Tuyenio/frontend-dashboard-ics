'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Target, Heart, Users, DollarSign, Package, ShoppingCart, Brain } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ServicesSection() {
  const { t } = useLanguage();

  const services = [
    { icon: TrendingUp, title: t('services.sales.title'), desc: t('services.sales.desc'), color: 'from-blue-500 to-cyan-500' },
    { icon: Target, title: t('services.marketing.title'), desc: t('services.marketing.desc'), color: 'from-purple-500 to-pink-500' },
    { icon: Heart, title: t('services.healthcare.title'), desc: t('services.healthcare.desc'), color: 'from-red-500 to-orange-500' },
    { icon: Users, title: t('services.hr.title'), desc: t('services.hr.desc'), color: 'from-green-500 to-emerald-500' },
    { icon: DollarSign, title: t('services.finance.title'), desc: t('services.finance.desc'), color: 'from-yellow-500 to-amber-500' },
    { icon: Package, title: t('services.logistics.title'), desc: t('services.logistics.desc'), color: 'from-indigo-500 to-blue-500' },
    { icon: ShoppingCart, title: t('services.ecommerce.title'), desc: t('services.ecommerce.desc'), color: 'from-pink-500 to-rose-500' },
    { icon: Brain, title: t('services.analytics.title'), desc: t('services.analytics.desc'), color: 'from-violet-500 to-purple-500' },
  ];

  return (
    <section id="services" className="py-24 bg-white dark:bg-black relative overflow-hidden transition-colors duration-500">
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
            {t('services.title')}
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-transparent hover:shadow-2xl transition-all duration-300"
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-300`}></div>
              
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-full h-full text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${service.color} transition-all duration-300">
                {service.title}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {service.desc}
              </p>

              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl`}></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
