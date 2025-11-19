'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, Star, Plus, Search, Filter, Calendar,
  User, FolderOpen, ExternalLink, Edit2, Share2, MoreVertical,
  X, Database
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UserDashboard() {
  const router = useRouter();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('created-desc');
  const [filterBy, setFilterBy] = useState('all');

  // Mock dashboards data
  const allDashboards = [
    {
      id: 1,
      name: 'Sales Analysis Dashboard',
      description: 'This dashboard visualizes data that provides a quick and easy way to monitor and analyze sales performance.',
      author: 'System Admin',
      category: 'Getting Started Tutorial',
      lastModified: '11/06/2025 01:25 PM',
      starred: false,
      tags: ['sales', 'analytics', 'performance']
    },
    {
      id: 2,
      name: 'Policy Claims Analysis Dashboard',
      description: 'Comprehensive analysis of policy claims data and trends.',
      author: 'System Admin', 
      category: 'Getting Started Tutorial',
      lastModified: '10/29/2025 01:43 AM',
      starred: false,
      tags: ['policy', 'claims', 'insurance']
    },
    {
      id: 3,
      name: 'School Performance Dashboard',
      description: 'Educational metrics and performance tracking dashboard.',
      author: 'System Admin',
      category: 'Getting Started Tutorial', 
      lastModified: '10/29/2025 01:43 AM',
      starred: false,
      tags: ['education', 'performance', 'metrics']
    },
    {
      id: 4,
      name: 'Google Ads Performance Dashboard',
      description: 'Track and analyze Google Ads campaign performance.',
      author: 'System Admin',
      category: 'Getting Started Tutorial', 
      lastModified: '10/29/2025 01:43 AM',
      starred: false,
      tags: ['google', 'ads', 'marketing', 'campaigns']
    },
    {
      id: 5,
      name: 'Supply Chain Performance Dashboard',
      description: 'Monitor supply chain metrics and KPIs.',
      author: 'System Admin',
      category: 'Getting Started Tutorial', 
      lastModified: '10/29/2025 01:43 AM',
      starred: false,
      tags: ['supply', 'chain', 'logistics', 'kpi']
    }
  ];

  // Filter and search logic
  const filteredDashboards = allDashboards.filter(dashboard => {
    const matchesSearch = searchTerm === '' || 
      dashboard.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dashboard.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dashboard.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterBy === 'all' || 
      (filterBy === 'starred' && dashboard.starred) ||
      (filterBy === 'recent' && new Date(dashboard.lastModified).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    return matchesSearch && matchesFilter;
  });

  // Sort logic
  const sortedDashboards = [...filteredDashboards].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'created-desc':
        return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
      case 'created-asc':
        return new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime();
      default:
        return 0;
    }
  });

  const dashboards = sortedDashboards;

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

  return (
    <div className="p-6">
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
                    placeholder="Search dashboards by name, description or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2.5 w-80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-200"
                >
                  <option value="created-desc">Created - Descending</option>
                  <option value="created-asc">Created - Ascending</option>
                  <option value="name-asc">Name - A to Z</option>
                  <option value="name-desc">Name - Z to A</option>
                </select>
                
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="px-4 py-2.5 border border-gray-200 bg-white text-gray-600 rounded-2xl text-sm hover:bg-sky-50 hover:border-sky-200 hover:text-sky-600 hover:scale-105 transition-all duration-200 font-medium"
                >
                  <option value="all">All Dashboards</option>
                  <option value="starred">Starred Only</option>
                  <option value="recent">Recent (7 days)</option>
                </select>
              </div>
              
              <span className="text-sm text-gray-500 font-medium">
                {searchTerm || filterBy !== 'all' 
                  ? `${dashboards.length} of ${allDashboards.length} dashboards`
                  : `1 - ${dashboards.length} of ${dashboards.length}`
                }
              </span>
            </div>

            <div className="space-y-2">
              {dashboards.map((dashboard) => (
                <DashboardTableRow key={dashboard.id} dashboard={dashboard} />
              ))}
            </div>
          </div>
        </div>
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
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}