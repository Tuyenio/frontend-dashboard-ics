'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, MoreVertical, Plus, Database, 
  Bell, User, ChevronDown, Settings, HelpCircle, LogOut,
  Grid3X3, List, Calendar, Clock, CheckCircle, AlertCircle,
  ExternalLink, Edit2, Trash2, Copy, Download, Activity,
  TrendingUp, TrendingDown, Zap, Server, Wifi, WifiOff,
  ChevronLeft, ChevronRight, RefreshCw, AlertTriangle,
  X, BarChart3, PieChart, LineChart, Table as TableIcon
} from 'lucide-react';

const sidebarItems = [
  { icon: Grid3X3, label: 'Dashboards', active: true, href: '/dashboard/user' },
  { icon: Database, label: 'Data Sources', active: false, href: '/dashboard/data-sources' },
  { icon: Activity, label: 'Monitoring', active: false, href: '/dashboard/monitoring' },
];

interface User {
  fullName: string;
  email: string;
}

export default function CreateDashboardPage() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [selectedWidgets, setSelectedWidgets] = useState<string[]>([]);
  
  const user: User = {
    fullName: 'John Doe',
    email: 'john@example.com'
  };

  const chartTypes = [
    { id: 'bar', name: 'Bar', icon: BarChart3, category: 'Comparison' },
    { id: 'column', name: 'Column', icon: BarChart3, category: 'Comparison' },
    { id: 'stacked-bar', name: 'Stacked Bar', icon: BarChart3, category: 'Comparison' },
    { id: 'stacked-column', name: 'Stacked Column', icon: BarChart3, category: 'Comparison' },
    { id: 'pie', name: 'Pie', icon: PieChart, category: 'Comparison' },
    { id: 'line', name: 'Line', icon: LineChart, category: 'Trend' },
    { id: 'area', name: 'Area', icon: LineChart, category: 'Trend' },
    { id: 'table', name: 'Table', icon: TableIcon, category: 'Relationship' }
  ];

  const relationshipCharts = [
    { id: 'map', name: 'Map', icon: Grid3X3 },
    { id: 'grid', name: 'Grid', icon: Grid3X3 }
  ];

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

  function ChartWidget({ chart, category }: { chart: any, category?: string }) {
    const { icon: Icon } = chart;
    
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white p-4 rounded-xl border border-gray-200 hover:border-sky-300 hover:shadow-md cursor-pointer transition-all duration-200 group"
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
          <h4 className="font-medium text-gray-900 text-sm mb-1">{chart.name}</h4>
          {category && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{category}</span>
          )}
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
            <h1 className="text-xl font-medium text-gray-800">Sales Analysis Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Actions */}
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Copy className="w-5 h-5 text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Download className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="h-6 w-px bg-gray-200"></div>

            <button className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
              Preview
            </button>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              PUBLISH
            </button>

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
      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Sidebar - Widget Library */}
        <aside className="w-64 bg-white border-r border-gray-200">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-6">
              <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg">
                DEFAULT
              </button>
              <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg">
                EXISTING
              </button>
            </div>

            <div className="mb-6">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search Widgets"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            {/* Widget Categories */}
            <div className="space-y-6">
              {/* Comparison */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Comparison</h3>
                <div className="grid grid-cols-2 gap-3">
                  {chartTypes.filter(chart => chart.category === 'Comparison').map((chart) => (
                    <ChartWidget key={chart.id} chart={chart} />
                  ))}
                </div>
              </div>

              {/* Relationship */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Relationship</h3>
                <div className="grid grid-cols-2 gap-3">
                  {relationshipCharts.map((chart) => (
                    <ChartWidget key={chart.id} chart={chart} />
                  ))}
                  <ChartWidget chart={chartTypes.find(c => c.id === 'table')} />
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Canvas */}
        <main className="flex-1 bg-gray-50">
          <div className="h-full flex flex-col">
            {/* Canvas Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <select className="border border-gray-200 rounded px-3 py-1 text-sm">
                    <option>Product</option>
                  </select>
                  <span className="text-sm text-gray-500">Quantity per Unit</span>
                  <span className="text-sm text-gray-500">Unit Price</span>
                  <span className="text-sm text-gray-500">Units Sold</span>
                  <span className="text-sm text-gray-500">Units in Stock</span>
                </div>
              </div>
            </div>

            {/* Canvas Content */}
            <div className="flex-1 p-6">
              {/* Sample Data Table */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-blue-400 text-white">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium">Product</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Quantity per Unit</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Unit Price</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Units Sold</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Units in Stock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm">Aniseed Syrup</td>
                      <td className="px-4 py-3 text-sm">12 - 550 ml bottles</td>
                      <td className="px-4 py-3 text-sm">$28</td>
                      <td className="px-4 py-3 text-sm">5,269</td>
                      <td className="px-4 py-3 text-sm">644</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm">Boysenberry Spread</td>
                      <td className="px-4 py-3 text-sm">12 - 8 oz jars</td>
                      <td className="px-4 py-3 text-sm">$16</td>
                      <td className="px-4 py-3 text-sm">3,032</td>
                      <td className="px-4 py-3 text-sm">1,920</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm">Cajun Seasoning</td>
                      <td className="px-4 py-3 text-sm">48 - 6 oz jars</td>
                      <td className="px-4 py-3 text-sm">$41</td>
                      <td className="px-4 py-3 text-sm">7,604</td>
                      <td className="px-4 py-3 text-sm">2,173</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm">Chai</td>
                      <td className="px-4 py-3 text-sm">10 boxes x 20 bags</td>
                      <td className="px-4 py-3 text-sm">$27</td>
                      <td className="px-4 py-3 text-sm">4,844</td>
                      <td className="px-4 py-3 text-sm">1,053</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm">Chang</td>
                      <td className="px-4 py-3 text-sm">24 - 12 oz bottles</td>
                      <td className="px-4 py-3 text-sm">$36</td>
                      <td className="px-4 py-3 text-sm">6,671</td>
                      <td className="px-4 py-3 text-sm">1,800</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Chart Placeholder */}
              <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Chart2</h3>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-300 rounded-lg mx-auto mb-4"></div>
                    <p className="text-gray-500">Drop a chart widget here</p>
                  </div>
                </div>
              </div>

              {/* Add Widget Button */}
              <div className="mt-6 flex justify-center">
                <button className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                  <Plus className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}