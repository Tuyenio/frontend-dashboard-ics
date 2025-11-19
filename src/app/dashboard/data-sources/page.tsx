'use client';

import { Search, Filter, Plus, MoreVertical, Database, Wifi, X } from 'lucide-react';
import { useState } from 'react';

export default function DataSourcesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All Types');
  
  const dataSources = [
    {
      id: 1,
      name: 'PostgreSQL Database',
      type: 'Database',
      status: 'Connected',
      lastSync: '2 minutes ago',
      records: '1,234,567'
    },
    {
      id: 2,
      name: 'Sales API',
      type: 'API', 
      status: 'Connected',
      lastSync: '5 minutes ago',
      records: '45,123'
    },
    {
      id: 3,
      name: 'Analytics CSV',
      type: 'File',
      status: 'Disconnected',
      lastSync: '1 hour ago',
      records: '789'
    },
    {
      id: 4,
      name: 'MongoDB Cluster',
      type: 'Database',
      status: 'Connected',
      lastSync: '10 minutes ago',
      records: '2,567,890'
    },
    {
      id: 5,
      name: 'Google Sheets',
      type: 'Cloud',
      status: 'Connected', 
      lastSync: '15 minutes ago',
      records: '1,234'
    },
    {
      id: 6,
      name: 'REST API v2',
      type: 'API',
      status: 'Connected',
      lastSync: '3 minutes ago',
      records: '67,891'
    }
  ];

  // Filter data sources based on search term and type
  const filteredDataSources = dataSources.filter(source => {
    const matchesSearch = source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         source.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All Types' || source.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search data sources by name, type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10 py-2.5 w-full border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>All Types</option>
              <option>Database</option>
              <option>API</option>
              <option>File</option>
              <option>Cloud</option>
            </select>
            
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 bg-white text-gray-600 rounded-xl text-sm hover:bg-gray-50 transition-colors duration-200">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        {/* Data Sources Table */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Data Source</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Type</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Status</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Last Sync</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Records</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDataSources.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-500">
                      <Database className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No data sources found</p>
                      {searchTerm && (
                        <p className="text-sm mt-2">Try adjusting your search or filters</p>
                      )}
                    </td>
                  </tr>
                ) : (
                  filteredDataSources.map((source) => (
                  <tr key={source.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                          {source.type === 'Database' ? (
                            <Database className="w-5 h-5 text-blue-600" />
                          ) : (
                            <Wifi className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{source.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {source.type}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          source.status === 'Connected'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            source.status === 'Connected' ? 'bg-green-400' : 'bg-red-400'
                          }`}
                        />
                        {source.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">{source.lastSync}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{source.records}</td>
                    <td className="py-4 px-6">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}