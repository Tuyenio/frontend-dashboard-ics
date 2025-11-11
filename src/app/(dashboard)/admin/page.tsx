'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LogOut, User, Mail, Shield, Calendar, Clock,
  TrendingUp, Users, Activity, BarChart3
} from 'lucide-react';
import Image from 'next/image';

interface UserData {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
  role: string;
  status: string;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          localStorage.removeItem('access_token');
          localStorage.removeItem('user');
          router.push('/login');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-black dark:via-slate-950 dark:to-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 dark:text-slate-400">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const stats = [
    { icon: Users, label: 'Tổng Users', value: '500+', color: 'from-blue-500 to-cyan-500' },
    { icon: TrendingUp, label: 'Doanh thu', value: '$1.2M', color: 'from-green-500 to-emerald-500' },
    { icon: Activity, label: 'Uptime', value: '99.9%', color: 'from-purple-500 to-pink-500' },
    { icon: BarChart3, label: 'Analytics', value: '24/7', color: 'from-orange-500 to-red-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-black dark:via-slate-950 dark:to-black transition-colors duration-500">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image src="/logoics.png" alt="ICS Logo" fill className="object-contain" />
              </div>
              <div>
                <div className="text-xl font-black text-slate-900 dark:text-white">ICS Admin Panel</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Quản trị hệ thống</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-medium">Đăng xuất</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2">
            Xin chào, Admin {user.fullName}! 👋
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Chào mừng bạn đến với trang quản trị. Quản lý toàn bộ hệ thống từ đây.
          </p>
        </motion.div>

        {/* User Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-xl">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Thông tin tài khoản
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Họ và tên</div>
                  <div className="text-lg font-semibold text-slate-900 dark:text-white">{user.fullName}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Email</div>
                  <div className="text-lg font-semibold text-slate-900 dark:text-white">{user.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Vai trò</div>
                  <div className="text-lg font-semibold text-slate-900 dark:text-white capitalize">
                    {user.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Ngày tham gia</div>
                  <div className="text-lg font-semibold text-slate-900 dark:text-white">
                    {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6 md:p-8"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-900 dark:text-green-300 mb-2">
                Kết nối thành công! 🎉
              </h3>
              <p className="text-green-700 dark:text-green-400 mb-4">
                Frontend đã kết nối thành công với Backend API. Tất cả chức năng authentication đang hoạt động hoàn hảo.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-500/20 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                  ✅ Đăng nhập
                </span>
                <span className="px-3 py-1 bg-green-500/20 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                  ✅ JWT Authentication
                </span>
                <span className="px-3 py-1 bg-green-500/20 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                  ✅ Profile Management
                </span>
                <span className="px-3 py-1 bg-green-500/20 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                  ✅ Google OAuth Ready
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
