'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, MoreVertical, Plus, Database, 
  Bell, User, ChevronDown, Settings, HelpCircle, LogOut,
  Grid3X3, List, Calendar, Clock, CheckCircle, AlertCircle,
  ExternalLink, Edit2, Trash2, Copy, Download,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import Image from 'next/image';

// Mock data for data sources
const dataSources = [
  {
    id: 1,
    name: 'Sales Analysis Database',
    description: 'PostgreSQL',
    owner: 'System Admin',
    dataType: 'PostgreSQL',
    lastModified: '10/29/2025 01:43 AM',
    status: 'Live Connection',
    dashboardsLinked: 1,
    rowLevelSecurity: true
  },
  {
    id: 2,
    name: 'School Performance Analytics',
    description: 'PostgreSQL',
    owner: 'System Admin',
    dataType: 'PostgreSQL',
    lastModified: '10/29/2025 01:43 AM',
    status: 'Live Connection',
    dashboardsLinked: 1,
    rowLevelSecurity: true
  },
  {
    id: 3,
    name: 'Policy Claims Dashboard',
    description: 'PostgreSQL',
    owner: 'System Admin',
    dataType: 'PostgreSQL',
    lastModified: '10/29/2025 01:43 AM',
    status: 'Live Connection',
    dashboardsLinked: 1,
    rowLevelSecurity: true
  },
  {
    id: 4,
    name: 'Google Ads Data',
    description: 'PostgreSQL',
    owner: 'System Admin',
    dataType: 'PostgreSQL',
    lastModified: '10/29/2025 01:43 AM',
    status: 'Live Connection',
    dashboardsLinked: 1,
    rowLevelSecurity: true
  },
  {
    id: 5,
    name: 'Supply Chain Analytics',
    description: 'PostgreSQL',
    owner: 'System Admin',
    dataType: 'PostgreSQL',
    lastModified: '10/29/2025 01:43 AM',
    status: 'Live Connection',
    dashboardsLinked: 1,
    rowLevelSecurity: true
  },
  {
    id: 6,
    name: 'School Activities Tracker',
    description: 'PostgreSQL',
    owner: 'System Admin',
    dataType: 'PostgreSQL',
    lastModified: '10/29/2025 01:43 AM',
    status: 'Live Connection',
    dashboardsLinked: 1,
    rowLevelSecurity: true
  }
];

const sidebarItems = [
  { icon: Grid3X3, label: 'Dashboards', active: false, href: '/dashboard/user' },
  { icon: Database, label: 'Data Sources', active: true, href: '/dashboard/data-sources' },
  { icon: Settings, label: 'Monitoring', active: false, href: '/dashboard/monitoring' },
];

interface User {
  fullName: string;
  email: string;
}

export default function DataSourcesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  
  const user: User = {
    fullName: 'John Doe',
    email: 'john@example.com'
  };

  const handleSelectAll = () => {
    if (selectedItems.length === dataSources.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(dataSources.map(ds => ds.id));
    }
  };

  const handleSelectItem = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
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

  function DataSourceRow({ dataSource }: { dataSource: typeof dataSources[0] }) {
    return (
      <tr className="border-b border-gray-100 hover:bg-sky-50 transition-all duration-200 group">
        <td className="px-6 py-4">
          <input 
            type="checkbox" 
            className="w-4 h-4 text-sky-600 rounded border-gray-300 transition-colors duration-200"
            checked={selectedItems.includes(dataSource.id)}
            onChange={() => handleSelectItem(dataSource.id)}
          />
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Database className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">{dataSource.name}</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {dataSource.dashboardsLinked}
                </span>
              </div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 text-gray-600">{dataSource.description}</td>
        <td className="px-6 py-4 text-gray-600">{dataSource.owner}</td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
              <Database className="w-3 h-3 text-blue-600" />
            </div>
            <span className="text-gray-600">{dataSource.dataType}</span>
          </div>
        </td>
        <td className="px-6 py-4 text-gray-600">{dataSource.lastModified}</td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">{dataSource.status}</span>
          </div>
        </td>
        <td className="px-6 py-4 text-center">
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button className="p-2 hover:bg-sky-50 hover:scale-105 rounded-lg transition-all duration-200">
              <ExternalLink className="w-4 h-4 text-gray-400 hover:text-sky-600 transition-colors duration-200" />
            </button>
            <button className="p-2 hover:bg-emerald-50 hover:scale-105 rounded-lg transition-all duration-200">
              <Edit2 className="w-4 h-4 text-gray-400 hover:text-emerald-500 transition-colors duration-200" />
            </button>
            <button className="p-2 hover:bg-sky-50 hover:scale-105 rounded-lg transition-all duration-200">
              <MoreVertical className="w-4 h-4 text-gray-400 hover:text-sky-600 transition-colors duration-200" />
            </button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-['Inter',system-ui,sans-serif]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Data Sources</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Free Tier Badge */}
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-2xl text-sm font-semibold shadow-lg">
              Free Tier
            </div>
            
            <button className="px-4 py-2.5 border border-gray-200 text-gray-600 bg-white rounded-2xl text-sm font-medium hover:bg-sky-50 hover:border-sky-200 hover:text-sky-600 hover:scale-105 transition-all duration-200">
              Quick Tour
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
        <main className="flex-1 p-6">
          <div className="bg-white rounded-2xl border border-gray-200">
            {/* Toolbar */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search data sources"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2.5 w-80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 bg-white text-gray-600 rounded-2xl text-sm hover:bg-sky-50 hover:border-sky-200 hover:text-sky-600 hover:scale-105 transition-all duration-200 font-medium">
                    My Connections
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-sky-400 to-cyan-500 text-white rounded-2xl text-sm hover:from-sky-500 hover:to-cyan-600 hover:scale-105 hover:shadow-lg transition-all duration-200 font-medium">
                    <Plus className="w-4 h-4" />
                    New Data Source
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-4 text-left">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-sky-600 rounded border-gray-300"
                        checked={selectedItems.length === dataSources.length}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                      Owner
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                      Data Type
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                      Last Modified
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                      Data Refresh Status
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-700 uppercase tracking-wider">
                      Row Level Security
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dataSources.map((dataSource) => (
                    <DataSourceRow key={dataSource.id} dataSource={dataSource} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  <Database className="w-4 h-4 inline mr-1" />
                  Total data sources linked with the dashboard
                </p>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-sky-50 hover:scale-105 rounded-lg transition-all duration-200">
                    <ChevronLeft className="w-4 h-4 text-gray-400 hover:text-sky-600" />
                  </button>
                  <span className="text-sm text-gray-600 font-medium">1 - 6 of 6</span>
                  <button className="p-2 hover:bg-sky-50 hover:scale-105 rounded-lg transition-all duration-200">
                    <ChevronRight className="w-4 h-4 text-gray-400 hover:text-sky-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}