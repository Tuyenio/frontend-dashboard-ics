'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogOut, User, Mail, Shield, Calendar, Search, Bell, Settings,
  BarChart3, TrendingUp, Activity, CheckCircle, X, Menu, Home,
  Database, FolderOpen, Star, Plus, ChevronLeft, ChevronRight,
  HardDrive, PieChart, Users, MoreVertical, Edit2, ExternalLink,
  Share2, Filter
} from 'lucide-react';
import Image from 'next/image';
import { API_BASE_URL, API_ENDPOINTS } from '@/constants/api';

interface UserData {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
  role: string;
  status: string;
  createdAt: string;
}

export default function UserDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Mock data cho thống kê
  const stats = {
    dashboards: 5,
    storage: '2.4 GB',
    databases: 3
  };

  // Mock dashboards data
  const dashboards = [
    {
      id: 1,
      name: 'Sales Analysis Dashboard',
      description: 'This dashboard visualizes data that provides a quick and easy way to monitor and analyze sales performance.',
      author: 'System Admin',
      category: 'Getting Started Tutorial',
      lastModified: '11/06/2025 01:25 PM',
      starred: false
    },
    {
      id: 2,
      name: 'Policy Claims Analysis Dashboard',
      description: 'Comprehensive analysis of policy claims data and trends.',
      author: 'System Admin', 
      category: 'Getting Started Tutorial',
      lastModified: '10/29/2025 01:43 AM',
      starred: false
    },
    {
      id: 3,
      name: 'School Performance Dashboard',
      description: 'Educational metrics and performance tracking dashboard.',
      author: 'System Admin',
      category: 'Getting Started Tutorial', 
      lastModified: '10/29/2025 01:43 AM',
      starred: false
    }
  ];

  useEffect(() => {
    // Kiểm tra nếu có thông báo đăng nhập thành công
    if (searchParams.get('loginSuccess') === 'true') {
      setShowSuccessMessage(true);
      // Tự động ẩn thông báo sau 5 giây
      setTimeout(() => setShowSuccessMessage(false), 5000);
      // Xóa query param khỏi URL
      router.replace('/user');
    }
  }, [searchParams, router]);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.ME}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          
          // Redirect admin to admin panel
          if (userData.role === 'admin') {
            router.push('/admin');
          }
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
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 dark:text-slate-400">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      {/* Sidebar */}
      <motion.div
        initial={{ width: sidebarCollapsed ? 80 : 280 }}
        animate={{ width: sidebarCollapsed ? 80 : 280 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col"
      >
        {/* Logo & Toggle */}
        <div className="p-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image src="/logoics.png" alt="ICS Logo" fill className="object-contain" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-slate-900 dark:text-white">ICS</h1>
                <p className="text-xs text-slate-500">Dashboard</p>
              </div>
            </div>
          )}
          {sidebarCollapsed && (
            <div className="relative w-8 h-8 mx-auto">
              <Image src="/logoics.png" alt="ICS Logo" fill className="object-contain" />
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <SidebarItem icon={Home} label="Dashboards" active collapsed={sidebarCollapsed} />
            <SidebarItem icon={FolderOpen} label="Data Sources" collapsed={sidebarCollapsed} />
            <SidebarItem icon={Star} label="Starred" collapsed={sidebarCollapsed} />
            <SidebarItem icon={Database} label="Data Hub" collapsed={sidebarCollapsed} />
            <SidebarItem icon={Activity} label="Monitoring" collapsed={sidebarCollapsed} />
          </div>
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
              <User className="w-4 h-4" />
              <span>Signed in as {user.role}</span>
            </div>
          )}
          {sidebarCollapsed && (
            <div className="flex justify-center">
              <User className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </div>
          )}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">All Dashboards (5 dashboards)</h1>
            </div>
            
            {/* Header Actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search dashboards"
                  className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-700 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
              </div>

              {/* Quick Actions */}
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Free Tier
              </button>
              <button className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                Quick Tour
              </button>

              {/* Notifications */}
              <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors relative">
                <Bell className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </button>

              {/* User Avatar & Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user.fullName?.charAt(0) || 'U'}
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {user.fullName || 'User'}
                  </span>
                </button>

                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-50"
                    >
                      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {user.fullName?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-white">{user.fullName}</p>
                            <p className="text-sm text-slate-500">{user.email}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="py-2">
                        <UserMenuItem icon={User} label="Thông tin cá nhân" />
                        <UserMenuItem icon={Settings} label="Cài đặt" />
                        <UserMenuItem icon={Shield} label="Bảo mật" />
                        <div className="border-t border-slate-200 dark:border-slate-700 my-2"></div>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Đăng xuất
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Success Message */}
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="mx-6 mt-4"
          >
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-green-800 dark:text-green-300">
                  Đăng nhập thành công!
                </h3>
                <p className="text-green-700 dark:text-green-400 text-sm">
                  Chào mừng bạn đến với dashboard. Bạn đã đăng nhập thành công.
                </p>
              </div>
              <button
                onClick={() => setShowSuccessMessage(false)}
                className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Stats Cards */}
        <div className="p-6">
          <div className="grid grid-cols-3 gap-6 mb-6">
            <StatsCard 
              icon={BarChart3}
              value={stats.dashboards}
              label="Dashboards"
              color="blue"
            />
            <StatsCard 
              icon={HardDrive}
              value={stats.storage}
              label="Storage Used"
              color="green"
            />
            <StatsCard 
              icon={Database}
              value={stats.databases}
              label="Databases"
              color="purple"
            />
          </div>

          {/* Recent Section */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Recent</h2>
            
            {/* Dashboard Cards Grid */}
            <div className="grid grid-cols-5 gap-4 mb-8">
              {dashboards.slice(0, 5).map((dashboard) => (
                <DashboardCard key={dashboard.id} dashboard={dashboard} />
              ))}
            </div>
          </div>

          {/* All Dashboards Table */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <select className="px-3 py-2 bg-slate-100 dark:bg-slate-700 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Modified - Descending</option>
                    <option>Name - Ascending</option>
                    <option>Created - Descending</option>
                  </select>
                  <button className="flex items-center gap-2 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    <Filter className="w-4 h-4" />
                    All
                  </button>
                </div>
                <span className="text-sm text-slate-500">1 - 5 of 5</span>
              </div>
            </div>

            {/* Table Content */}
            <div className="divide-y divide-slate-200 dark:divide-slate-700">
              {dashboards.map((dashboard) => (
                <DashboardTableRow key={dashboard.id} dashboard={dashboard} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
      icon: TrendingUp, 
      title: 'Theo dõi tiến độ', 
      desc: 'Giám sát hoạt động và KPIs',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      icon: Activity, 
      title: 'Analytics', 
      desc: 'Phân tích dữ liệu chi tiết',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      icon: Settings, 
      title: 'Cài đặt', 
      desc: 'Quản lý thông tin cá nhân',
      color: 'from-orange-500 to-red-500'
    },
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
                <div className="text-xl font-black text-slate-900 dark:text-white">ICS User Dashboard</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Trang cá nhân</div>
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

      {/* Success Message */}
      {showSuccessMessage && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="container mx-auto px-6 py-4"
        >
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-green-800 dark:text-green-300">
                Đăng nhập thành công!
              </h3>
              <p className="text-green-700 dark:text-green-400 text-sm">
                Chào mừng bạn đến với dashboard cá nhân. Bạn đã đăng nhập thành công bằng Google.
              </p>
            </div>
            <button
              onClick={() => setShowSuccessMessage(false)}
              className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2">
            Xin chào, {user.fullName}! 👋
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Chào mừng bạn trở lại. Đây là dashboard cá nhân của bạn.
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
                  <div className="text-lg font-semibold text-slate-900 dark:text-white break-all">{user.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Vai trò</div>
                  <div className="text-lg font-semibold text-slate-900 dark:text-white">Người dùng</div>
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

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Info Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 md:p-8"
        >
          <h3 className="text-xl font-bold text-blue-900 dark:text-blue-300 mb-2">
            Dashboard người dùng 📊
          </h3>
          <p className="text-blue-700 dark:text-blue-400">
            Đây là trang dashboard dành cho người dùng thông thường. Bạn có thể xem thông tin cá nhân, theo dõi hoạt động và quản lý tài khoản của mình tại đây.
          </p>
        </motion.div>
      </main>
    </div>
  );
}

// Sidebar Item Component
interface SidebarItemProps {
  icon: any;
  label: string;
  active?: boolean;
  collapsed: boolean;
  onClick?: () => void;
}

function SidebarItem({ icon: Icon, label, active, collapsed, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
        active 
          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
      }`}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      {!collapsed && <span className="font-medium">{label}</span>}
    </button>
  );
}

// User Menu Item Component
interface UserMenuItemProps {
  icon: any;
  label: string;
  onClick?: () => void;
}

function UserMenuItem({ icon: Icon, label, onClick }: UserMenuItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}

// Stats Card Component
interface StatsCardProps {
  icon: any;
  value: string | number;
  label: string;
  color: 'blue' | 'green' | 'purple';
}

function StatsCard({ icon: Icon, value, label, color }: StatsCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">{value}</div>
          <div className="text-sm text-slate-500 dark:text-slate-400">{label}</div>
        </div>
      </div>
    </div>
  );
}

// Dashboard Card Component
interface DashboardCardProps {
  dashboard: {
    id: number;
    name: string;
    description: string;
  };
}

function DashboardCard({ dashboard }: DashboardCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow cursor-pointer">
      <div className="h-32 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg mb-3 flex items-center justify-center">
        <BarChart3 className="w-8 h-8 text-blue-500" />
      </div>
      <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-1 line-clamp-1">
        {dashboard.name}
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
        {dashboard.description}
      </p>
    </div>
  );
}

// Dashboard Table Row Component
interface DashboardTableRowProps {
  dashboard: {
    id: number;
    name: string;
    description: string;
    author: string;
    category: string;
    lastModified: string;
    starred: boolean;
  };
}

function DashboardTableRow({ dashboard }: DashboardTableRowProps) {
  return (
    <div className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
      <div className="flex items-center gap-4">
        <input type="checkbox" className="w-4 h-4 text-blue-600" />
        <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded">
          <Star className="w-4 h-4 text-slate-400" />
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-slate-900 dark:text-white">{dashboard.name}</h3>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">
            {dashboard.description}
          </p>
          <div className="flex items-center gap-4 mt-1 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {dashboard.author}
            </span>
            <span className="flex items-center gap-1">
              <FolderOpen className="w-3 h-3" />
              {dashboard.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {dashboard.lastModified}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg">
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </button>
          <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg">
            <Edit2 className="w-4 h-4 text-slate-400" />
          </button>
          <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg">
            <Share2 className="w-4 h-4 text-slate-400" />
          </button>
          <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg">
            <MoreVertical className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
