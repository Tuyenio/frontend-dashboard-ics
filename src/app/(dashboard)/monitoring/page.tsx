'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, MoreVertical, Plus, Database, 
  Bell, User, ChevronDown, Settings, HelpCircle, LogOut,
  Grid3X3, List, Calendar, Clock, CheckCircle, AlertCircle,
  ExternalLink, Edit2, Trash2, Copy, Download, Activity,
  TrendingUp, TrendingDown, Zap, Server, Wifi, WifiOff,
  ChevronLeft, ChevronRight, RefreshCw, AlertTriangle
} from 'lucide-react';

// Mock data for monitoring
const systemMetrics = [
  {
    id: 1,
    title: 'CPU Usage',
    value: '67%',
    trend: '+2.3%',
    status: 'normal',
    color: 'blue',
    icon: Activity
  },
  {
    id: 2,
    title: 'Memory Usage',
    value: '43%',
    trend: '+1.2%',
    status: 'normal',
    color: 'green',
    icon: Server
  },
  {
    id: 3,
    title: 'Network I/O',
    value: '2.1 GB/s',
    trend: '-0.5%',
    status: 'warning',
    color: 'orange',
    icon: Wifi
  },
  {
    id: 4,
    title: 'Active Connections',
    value: '1,247',
    trend: '+12.3%',
    status: 'good',
    color: 'emerald',
    icon: Zap
  }
];

const recentAlerts = [
  {
    id: 1,
    type: 'warning',
    title: 'High Memory Usage',
    description: 'Database server memory usage exceeded 80%',
    timestamp: '2 minutes ago',
    status: 'active'
  },
  {
    id: 2,
    type: 'info',
    title: 'Scheduled Maintenance',
    description: 'System maintenance scheduled for tomorrow 3:00 AM',
    timestamp: '1 hour ago',
    status: 'scheduled'
  },
  {
    id: 3,
    type: 'success',
    title: 'Backup Completed',
    description: 'Daily database backup completed successfully',
    timestamp: '3 hours ago',
    status: 'resolved'
  },
  {
    id: 4,
    type: 'error',
    title: 'Connection Failed',
    description: 'Failed to connect to external API service',
    timestamp: '4 hours ago',
    status: 'resolved'
  }
];

const performanceData = [
  { name: 'Mon', cpu: 65, memory: 45, network: 2.3 },
  { name: 'Tue', cpu: 72, memory: 52, network: 2.8 },
  { name: 'Wed', cpu: 58, memory: 41, network: 1.9 },
  { name: 'Thu', cpu: 67, memory: 43, network: 2.1 },
  { name: 'Fri', cpu: 73, memory: 48, network: 2.5 },
  { name: 'Sat', cpu: 45, memory: 35, network: 1.6 },
  { name: 'Sun', cpu: 52, memory: 38, network: 1.8 }
];

const sidebarItems = [
  { icon: Grid3X3, label: 'Dashboards', active: false, href: '/dashboard/user' },
  { icon: Database, label: 'Data Sources', active: false, href: '/dashboard/data-sources' },
  { icon: Activity, label: 'Monitoring', active: true, href: '/dashboard/monitoring' },
];

interface User {
  fullName: string;
  email: string;
}

export default function MonitoringPage() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [timeRange, setTimeRange] = useState('24h');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const user: User = {
    fullName: 'John Doe',
    email: 'john@example.com'
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => setIsRefreshing(false), 2000);
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

  function MetricCard({ metric }: { metric: typeof systemMetrics[0] }) {
    const { icon: Icon } = metric;
    
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'good': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
        case 'warning': return 'text-orange-600 bg-orange-50 border-orange-200';
        case 'error': return 'text-red-600 bg-red-50 border-red-200';
        default: return 'text-blue-600 bg-blue-50 border-blue-200';
      }
    };

    const getTrendColor = (trend: string) => {
      return trend.startsWith('+') ? 'text-emerald-600' : 'text-red-600';
    };

    return (
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        className={`p-6 rounded-2xl border-2 ${getStatusColor(metric.status)} transition-all duration-200 cursor-pointer`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl ${getStatusColor(metric.status).replace('border-', 'bg-').replace('-200', '-100')} flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${getStatusColor(metric.status).split(' ')[0]}`} />
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getTrendColor(metric.trend)} bg-white`}>
            {metric.trend}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
          <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
        </div>
      </motion.div>
    );
  }

  function AlertItem({ alert }: { alert: typeof recentAlerts[0] }) {
    const getAlertColor = (type: string) => {
      switch (type) {
        case 'error': return 'text-red-600 bg-red-50';
        case 'warning': return 'text-orange-600 bg-orange-50';
        case 'success': return 'text-emerald-600 bg-emerald-50';
        default: return 'text-blue-600 bg-blue-50';
      }
    };

    const getAlertIcon = (type: string) => {
      switch (type) {
        case 'error': return AlertTriangle;
        case 'warning': return AlertCircle;
        case 'success': return CheckCircle;
        default: return CheckCircle;
      }
    };

    const Icon = getAlertIcon(alert.type);

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors duration-200"
      >
        <div className={`w-10 h-10 rounded-full ${getAlertColor(alert.type)} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-medium text-gray-900">{alert.title}</h4>
            <span className="text-xs text-gray-500">{alert.timestamp}</span>
          </div>
          <p className="text-sm text-gray-600">{alert.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-sky-50 hover:scale-105 rounded-lg transition-all duration-200">
            <ExternalLink className="w-4 h-4 text-gray-400 hover:text-sky-600 transition-colors duration-200" />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-['Inter',system-ui,sans-serif]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">System Monitoring</h1>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              System Healthy
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Time Range Selector */}
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>

            {/* Refresh Button */}
            <button 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-600 bg-white rounded-2xl text-sm font-medium hover:bg-sky-50 hover:border-sky-200 hover:text-sky-600 hover:scale-105 transition-all duration-200 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>

            {/* Free Tier Badge */}
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-2xl text-sm font-semibold shadow-lg">
              Free Tier
            </div>

            {/* Notifications */}
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
                  {user.fullName?.charAt(0) || 'U'}
                </div>
                <span className="text-sm font-medium text-gray-700">User</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
              
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
                          {user.fullName?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.fullName}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="py-2">
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors">
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors">
                        <HelpCircle className="w-4 h-4" />
                        Help & Support
                      </button>
                    </div>
                    
                    <div className="border-t border-slate-200 pt-2">
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
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

        {/* Content Area */}
        <main className="flex-1 p-6 space-y-6">
          {/* System Metrics */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6">System Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {systemMetrics.map((metric) => (
                <MetricCard key={metric.id} metric={metric} />
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Chart */}
            <section className="bg-white p-6 rounded-2xl border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Performance Trends</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">CPU</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span className="text-gray-600">Memory</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-600">Network</span>
                  </div>
                </div>
              </div>
              
              {/* Simple Chart Simulation */}
              <div className="h-64 flex items-end justify-between gap-2">
                {performanceData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex flex-col justify-end h-48">
                      <div 
                        className="bg-blue-500 rounded-t mb-1"
                        style={{ height: `${(data.cpu / 100) * 100}%` }}
                      ></div>
                      <div 
                        className="bg-emerald-500 rounded-t mb-1"
                        style={{ height: `${(data.memory / 100) * 100}%` }}
                      ></div>
                      <div 
                        className="bg-orange-500 rounded-t"
                        style={{ height: `${(data.network / 5) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 font-medium">{data.name}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Alerts */}
            <section className="bg-white p-6 rounded-2xl border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Recent Alerts</h3>
                <button className="text-sm text-sky-600 hover:text-sky-700 font-medium">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <AlertItem key={alert.id} alert={alert} />
                ))}
              </div>
            </section>
          </div>

          {/* System Status */}
          <section className="bg-white p-6 rounded-2xl border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-6">System Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Database</p>
                  <p className="text-sm text-emerald-600">Operational</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Wifi className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">API Services</p>
                  <p className="text-sm text-emerald-600">Operational</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl border border-orange-200">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">External APIs</p>
                  <p className="text-sm text-orange-600">Partial Outage</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}