'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogOut, Bell, Settings, Home, Database, Activity, ChevronDown, ChevronLeft, Menu, User
} from 'lucide-react';
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<UserData | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleSidebar = () => {
    setIsTransitioning(true);
    setSidebarCollapsed(!sidebarCollapsed);
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  };

  const sidebarItems = [
    { icon: Home, label: 'Dashboards', href: '/dashboard/user' },
    { icon: Database, label: 'Data Sources', href: '/dashboard/data-sources' },
    { icon: Activity, label: 'Monitoring', href: '/dashboard/monitoring' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' }
  ];

  useEffect(() => {
    loadUserData();
  }, []);

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

  function SidebarItem({ icon: Icon, label, href, collapsed }: { icon: any, label: string, href: string, collapsed: boolean }) {
    const isActive = typeof window !== 'undefined' && window.location.pathname === href;
    
    return (
      <div className="relative group">
        <motion.a
          href={href}
          whileHover={{ x: collapsed ? 0 : 6, scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          className={`group relative flex items-center gap-4 px-4 py-3 mx-1 rounded-xl text-sm font-medium transition-all duration-300 no-underline select-none ${
            isActive 
              ? 'bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 text-blue-600 border border-blue-200/30' 
              : 'text-gray-600 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50'
          } ${collapsed ? 'justify-center' : ''}`}
          style={{ textDecoration: 'none' }}
          title={collapsed ? label : ''}
        >
          {/* Icon */}
          <div className={`relative z-10 transition-all duration-300 ${
            isActive 
              ? 'text-blue-600' 
              : 'text-gray-500 group-hover:text-blue-600'
          }`}>
            <Icon className="w-5 h-5" />
          </div>
          
          {/* Label */}
          <div className={`relative z-10 font-medium tracking-wide transition-all duration-400 overflow-hidden whitespace-nowrap ${
            isActive 
              ? 'text-blue-600' 
              : 'text-gray-700 group-hover:text-blue-600'
          } ${collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
            {label}
          </div>
          
          {/* Active Indicator */}
          {isActive && !collapsed && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="absolute right-3 w-2 h-2 bg-blue-600 rounded-full"
            />
          )}
        </motion.a>
        
        {/* Tooltip for collapsed state */}
        {collapsed && (
          <div className="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
            {label}
          </div>
        )}
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
      {/* Sidebar - Fixed Full Height */}
      {/* Sidebar - Fixed Full Height */}
      <aside 
        className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 border-r border-slate-200/50 shadow-xl flex flex-col z-30 transition-all duration-400 ease-out ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-200/50">
          <div className="flex flex-col items-center gap-3">
            {/* Logo */}
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 hover:rotate-3 transition-all duration-300">
              <span className="text-white font-bold text-lg font-serif">ICS</span>
            </div>
            
            {/* Title */}
            <div className={`text-center transition-all duration-400 overflow-hidden ${
              sidebarCollapsed ? 'h-0 opacity-0' : 'h-auto opacity-100'
            }`}>
              <h2 className="text-sm font-light text-gray-700 tracking-wider uppercase">Dashboard</h2>
              <p className="text-xs text-gray-500 mt-1">Analytics Platform</p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex-1 px-3 py-6">
          <nav className="space-y-1">
            {sidebarItems.map((item, index) => (
              <SidebarItem key={index} {...item} collapsed={sidebarCollapsed} />
            ))}
          </nav>
        </div>
        
        {/* Footer */}
        <div className={`p-4 border-t border-slate-200/50 transition-all duration-400 overflow-hidden ${
          sidebarCollapsed ? 'h-0 opacity-0 p-0' : 'h-auto opacity-100'
        }`}>
          <div className="text-center">
            <p className="text-xs text-gray-400">v2.1.0</p>
          </div>
        </div>
      </aside>

      {/* Header */}
      <header 
        className={`bg-white border-b border-gray-200 sticky top-0 z-40 transition-all duration-400 ease-out ${
          sidebarCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            {/* Sidebar Toggle Button */}
            <button
              onClick={toggleSidebar}
              disabled={isTransitioning}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            
            <h1 className="text-xl font-medium text-gray-800">
              {pathname === '/dashboard/user' && 'All Dashboards (5 dashboards)'}
              {pathname === '/dashboard/data-sources' && 'DATA SOURCES (6)'}
              {pathname === '/dashboard/monitoring' && 'System Monitoring'}
              {pathname === '/dashboard/create' && 'Dashboard Builder'}
              {pathname === '/dashboard/settings' && 'Settings'}
            </h1>
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
                        <User className="w-4 h-4" />
                        View Profile
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors">
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors">
                        <Database className="w-4 h-4" />
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
      <main 
        className={`min-h-screen transition-all duration-400 ease-out ${
          sidebarCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        {children}
      </main>
    </div>
  );
}