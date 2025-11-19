'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogOut, User, Mail, Shield, Calendar, Search, Bell, Settings,
  BarChart3, TrendingUp, Activity, CheckCircle, X, Menu, Home,
  Database, FolderOpen, Star, Plus, ChevronDown,
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
  const [showCreateModal, setShowCreateModal] = useState(false);

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
    },
    {
      id: 4,
      name: 'Google Ads Performance Dashboard',
      description: 'Track and analyze Google Ads campaign performance.',
      author: 'System Admin',
      category: 'Getting Started Tutorial', 
      lastModified: '10/29/2025 01:43 AM',
      starred: false
    },
    {
      id: 5,
      name: 'Supply Chain Performance Dashboard',
      description: 'Monitor supply chain metrics and KPIs.',
      author: 'System Admin',
      category: 'Getting Started Tutorial', 
      lastModified: '10/29/2025 01:43 AM',
      starred: false
    }
  ];

  const sidebarItems = [
    { icon: Home, label: 'Dashboards', active: true, href: '/dashboard/user' },
    { icon: Database, label: 'Data Sources', active: false, href: '/dashboard/data-sources' },
    { icon: Activity, label: 'Monitoring', active: false, href: '/dashboard/monitoring' },
    { icon: Settings, label: 'Settings', active: false, href: '/dashboard/settings' }
  ];

  useEffect(() => {
    // Kiểm tra nếu có thông báo đăng nhập thành công
    if (searchParams.get('loginSuccess') === 'true') {
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
      router.replace('/dashboard/user');
    }
    loadUserData();
  }, [searchParams, router]);

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('access_token');
      const storedUser = localStorage.getItem('user');
      
      if (!token) {
        console.log('No access token found, redirecting to login');
        router.push('/login');
        return;
      }

      // Nếu có user data trong localStorage, sử dụng luôn để tăng tốc độ loading
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        } catch (e) {
          console.error('Error parsing stored user data:', e);
        }
      }

      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.ME}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const result = await response.json();
        const userData = result.data || result.user || result;
        setUser(userData);
        // Cập nhật user data trong localStorage
        localStorage.setItem('user', JSON.stringify(userData));
      } else if (response.status === 401) {
        console.log('Token expired or invalid, redirecting to login');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        router.push('/login');
      } else {
        console.error('Error loading user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      // Nếu có lỗi network và có user data trong localStorage, vẫn tiếp tục
      const storedUser = localStorage.getItem('user');
      if (storedUser && !user) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        } catch (e) {
          console.error('Error parsing stored user data:', e);
          router.push('/login');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  function SidebarItem({ icon: Icon, label, active, href }: { icon: any, label: string, active: boolean, href: string }) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${
          active 
            ? 'bg-gray-100 border-2 border-gray-300 text-gray-700 shadow-md' 
            : 'text-gray-600 hover:bg-sky-50 hover:text-sky-600 transition-all duration-200'
        }`}
      >
        <Icon className="w-5 h-5" />
        {label}
      </motion.a>
    );
  }

  function DashboardCard({ dashboard }: { dashboard: typeof dashboards[0] }) {
    return (
      <div className="bg-white p-5 rounded-2xl border border-gray-200 hover:bg-sky-50 hover:scale-105 hover:border-sky-200 transition-all duration-200 cursor-pointer group">
        <div className="flex items-start justify-between mb-4">
          <BarChart3 className="w-8 h-8 text-gray-600 group-hover:scale-125 group-hover:text-gray-700 transition-all duration-300" />
          <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Star className="w-4 h-4 text-gray-400 hover:text-yellow-400" />
          </button>
        </div>
        <h3 className="font-medium text-gray-800 text-sm mb-2 line-clamp-1 group-hover:text-gray-700 transition-colors duration-300">
          {dashboard.name}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2 font-medium leading-relaxed group-hover:text-gray-600 transition-colors duration-300">
          {dashboard.description}
        </p>
        <div className="flex items-center justify-between mt-3 text-xs text-gray-400 font-medium">
          <span>{dashboard.author}</span>
          <span>{dashboard.lastModified}</span>
        </div>
      </div>
    );
  }

  function DashboardTableRow({ dashboard }: { dashboard: typeof dashboards[0] }) {
    return (
      <div className="p-5 hover:bg-sky-50 hover:scale-[1.01] transition-all duration-200 group rounded-xl mx-2 hover:border-sky-200 border border-transparent">
        <div className="flex items-center gap-5">
          <input type="checkbox" className="w-4 h-4 text-sky-600 rounded border-gray-300 transition-colors duration-200" />
          <button className="p-1.5 hover:bg-sky-100 hover:scale-110 rounded-xl transition-all duration-200">
            <Star className="w-4 h-4 text-gray-400 hover:text-yellow-400 transition-colors duration-300" />
          </button>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-gray-800 group-hover:text-gray-700 transition-colors duration-300 text-sm">{dashboard.name}</h3>
            </div>
            <p className="text-sm text-gray-500 line-clamp-1 font-medium mt-1 group-hover:text-gray-600 transition-colors duration-300">
              {dashboard.description}
            </p>
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-400 font-medium">
              <span className="flex items-center gap-1.5">
                <User className="w-3 h-3" />
                {dashboard.author}
              </span>
              <span className="flex items-center gap-1.5">
                <FolderOpen className="w-3 h-3" />
                {dashboard.category}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                {dashboard.lastModified}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button className="p-2.5 hover:bg-sky-50 hover:scale-105 rounded-xl transition-all duration-200">
              <ExternalLink className="w-4 h-4 text-gray-400 hover:text-sky-600 transition-colors duration-200" />
            </button>
            <button className="p-2.5 hover:bg-emerald-50 hover:scale-105 rounded-xl transition-all duration-200">
              <Edit2 className="w-4 h-4 text-gray-400 hover:text-emerald-500 transition-colors duration-200" />
            </button>
            <button className="p-2.5 hover:bg-violet-50 hover:scale-105 rounded-xl transition-all duration-200">
              <Share2 className="w-4 h-4 text-gray-400 hover:text-violet-500 transition-colors duration-200" />
            </button>
            <button className="p-2.5 hover:bg-sky-50 hover:scale-105 rounded-xl transition-all duration-200">
              <MoreVertical className="w-4 h-4 text-gray-400 hover:text-sky-600 transition-colors duration-200" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-['Inter',system-ui,sans-serif]">
      {/* Success Message */}
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Đăng nhập thành công!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-medium text-gray-800">All Dashboards (5 dashboards)</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Free Tier Badge */}
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-2xl text-sm font-semibold shadow-lg">
              Free Tier
            </div>
            
            <button className="px-4 py-2.5 border border-gray-200 text-gray-600 bg-white rounded-2xl text-sm font-medium hover:bg-sky-50 hover:border-sky-200 hover:text-sky-600 hover:scale-105 transition-all duration-200">
              Quick Tour
            </button>

            <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {user?.fullName?.charAt(0) || 'U'}
                </div>
                <span className="text-sm font-medium text-gray-700">User</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
              
              {/* User Dropdown Menu */}
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50"
                  >
                    <div className="px-4 py-3 border-b border-slate-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {user?.fullName?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user?.fullName}</p>
                          <p className="text-sm text-gray-500">{user?.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="py-2">
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors">
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors">
                        <HardDrive className="w-4 h-4" />
                        Help & Support
                      </button>
                    </div>
                    
                    <div className="border-t border-slate-200 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <nav className="space-y-2">
              {sidebarItems.map((item, index) => (
                <SidebarItem key={index} {...item} />
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Dashboard Cards Grid */}
            <div className="grid grid-cols-6 gap-5">
              {/* Create New Dashboard Card */}
              <div 
                onClick={() => setShowCreateModal(true)}
                className="bg-white p-6 rounded-2xl border-2 border-dashed border-gray-200 hover:border-sky-300 hover:bg-sky-50 hover:scale-105 transition-all duration-200 cursor-pointer group"
              >
                <div className="h-32 flex flex-col items-center justify-center text-gray-500 group-hover:text-sky-600 transition-colors duration-200">
                  <div className="w-14 h-14 rounded-full bg-gray-100 group-hover:bg-sky-100 group-hover:scale-110 flex items-center justify-center mb-3 transition-all duration-200">
                    <Plus className="w-7 h-7 text-gray-500 group-hover:text-sky-600 transition-colors duration-200" />
                  </div>
                  <span className="text-sm font-medium">Tạo mới</span>
                </div>
              </div>
              
              {/* Existing Dashboard Cards */}
              {dashboards.slice(0, 5).map((dashboard) => (
                <DashboardCard key={dashboard.id} dashboard={dashboard} />
              ))}
            </div>

            {/* All Dashboards Table */}
            <div className="bg-white rounded-2xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-800">All Dashboards</h3>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search dashboards..."
                        className="pl-10 pr-4 py-2.5 w-80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      />
                    </div>
                    
                    <select className="px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500">
                      <option>Created - Descending</option>
                    </select>
                    
                    <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 bg-white text-gray-600 rounded-2xl text-sm hover:bg-sky-50 hover:border-sky-200 hover:text-sky-600 hover:scale-105 transition-all duration-200 font-medium">
                      <Filter className="w-4 h-4" />
                      All
                    </button>
                  </div>
                  
                  <span className="text-sm text-gray-500 font-medium">1 - 5 of 5</span>
                </div>

                <div className="space-y-2">
                  {dashboards.map((dashboard) => (
                    <DashboardTableRow key={dashboard.id} dashboard={dashboard} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Create Dashboard Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium text-gray-900">Create Dashboard</h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Start from Scratch */}
                  <div 
                    onClick={() => router.push('/dashboard/create')}
                    className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:bg-sky-50 hover:border-sky-300 cursor-pointer transition-all duration-200 group"
                  >
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100">
                      <div className="w-8 h-8 bg-white rounded border-2 border-dashed border-blue-300 flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-sm"></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">Start from Scratch</h3>
                      <p className="text-sm text-gray-600">Create a dashboard from scratch</p>
                    </div>
                  </div>

                  {/* Multi-Tabbed Dashboard */}
                  <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-all duration-200 group">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100">
                      <div className="flex gap-1">
                        <div className="w-3 h-4 bg-blue-500 rounded-sm"></div>
                        <div className="w-3 h-4 bg-blue-300 rounded-sm"></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">Multi-Tabbed Dashboard</h3>
                      <p className="text-sm text-gray-600">Create a multi-tabbed dashboard by adding two or more dashboards</p>
                    </div>
                  </div>

                  {/* Data Sources - Highlighted */}
                  <div className="flex items-center gap-4 p-4 border-2 border-blue-200 bg-blue-50 rounded-xl cursor-pointer transition-all duration-200 group">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200">
                      <Database className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">Data Sources</h3>
                      <p className="text-sm text-gray-600">Import your data from popular connectors</p>
                    </div>
                  </div>

                  {/* Slideshow */}
                  <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-all duration-200 group">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100">
                      <div className="w-8 h-6 bg-gradient-to-r from-blue-500 to-blue-300 rounded-sm flex items-center justify-center">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">Slideshow</h3>
                      <p className="text-sm text-gray-600">Create slideshow</p>
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-all duration-200 group">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100">
                      <Calendar className="w-6 h-6 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">Schedule</h3>
                      <p className="text-sm text-gray-600">Monitor your data to spot emerging trends</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}