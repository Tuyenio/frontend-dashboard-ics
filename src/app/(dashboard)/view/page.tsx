'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Eye, Home, BarChart3, TrendingUp, Activity
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ViewPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-black dark:via-slate-950 dark:to-black blue:from-slate-950 blue:via-slate-900 blue:to-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 dark:text-slate-400">Đang tải...</p>
        </div>
      </div>
    );
  }

  const stats = [
    { icon: BarChart3, label: 'Tổng Users', value: '500+', color: 'from-blue-500 to-cyan-500' },
    { icon: TrendingUp, label: 'Uptime', value: '99.9%', color: 'from-purple-500 to-pink-500' },
    { icon: Activity, label: 'Analytics', value: '24/7', color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-black dark:via-slate-950 dark:to-black blue:from-slate-950 blue:via-slate-900 blue:to-slate-950 transition-colors duration-500">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 blue:bg-slate-900 border-b border-slate-200 dark:border-slate-800 blue:border-slate-800 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image src="/logoics.png" alt="ICS Logo" fill className="object-contain" />
              </div>
              <div>
                <div className="text-xl font-black text-slate-900 dark:text-white">ICS View Dashboard</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Chế độ xem công khai</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span className="font-medium">Trang chủ</span>
              </Link>
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-colors"
              >
                <span className="font-medium">Đăng nhập</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center gap-3 mb-4 px-6 py-3 bg-blue-100 dark:bg-blue-900/20 blue:bg-blue-900/20 rounded-full">
            <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-blue-600 dark:text-blue-400 font-semibold">Chế độ xem công khai</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Tổng quan hệ thống ICS Dashboard
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Xem thống kê và thông tin tổng quan về hệ thống quản lý dashboard chuyên nghiệp của chúng tôi.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white dark:bg-slate-900 blue:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 blue:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4 mx-auto`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-black text-slate-900 dark:text-white mb-2 text-center">
                {stat.value}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 text-center font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-slate-900 blue:bg-slate-900 rounded-2xl p-8 md:p-12 border border-slate-200 dark:border-slate-800 blue:border-slate-800 shadow-xl mb-8"
        >
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 text-center">
            Tính năng nổi bật
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Dashboard Sale', desc: 'Theo dõi doanh số và KPI real-time', emoji: '📈' },
              { title: 'Dashboard Marketing', desc: 'Phân tích chiến dịch và ROI', emoji: '🎯' },
              { title: 'Dashboard Y tế', desc: 'Quản lý bệnh nhân và lịch hẹn', emoji: '🏥' },
              { title: 'Quản lý Nhân sự', desc: 'Theo dõi nhân viên và chấm công', emoji: '👥' },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-slate-50 dark:bg-slate-800 blue:bg-slate-800 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-3">{feature.emoji}</div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Sẵn sàng bắt đầu?
          </h2>
          <p className="text-xl mb-8 text-blue-50">
            Đăng nhập để truy cập đầy đủ tính năng dashboard chuyên nghiệp
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Đăng nhập ngay
            </Link>
            <Link
              href="/register"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              Đăng ký miễn phí
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
