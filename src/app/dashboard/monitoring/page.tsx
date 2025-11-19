'use client';

import { Activity, TrendingUp, AlertTriangle, CheckCircle, Clock, Users } from 'lucide-react';

export default function MonitoringPage() {
  const metrics = [
    {
      title: 'System Health',
      value: '99.9%',
      change: '+0.2%',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Response Time',
      value: '125ms',
      change: '-15ms',
      trend: 'down',
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Users',
      value: '2,847',
      change: '+156',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Error Rate',
      value: '0.1%',
      change: '+0.05%',
      trend: 'up',
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const alerts = [
    {
      id: 1,
      type: 'warning',
      message: 'Database connection pool is 85% full',
      time: '5 minutes ago'
    },
    {
      id: 2,
      type: 'info',
      message: 'System backup completed successfully',
      time: '1 hour ago'
    },
    {
      id: 3,
      type: 'error',
      message: 'API endpoint /users experiencing high latency',
      time: '2 hours ago'
    }
  ];

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${metric.bgColor} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {metric.change}
                  </span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                  <div className="text-sm text-gray-600">{metric.title}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Chart */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Performance Trends</h3>
            <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <Activity className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Performance chart placeholder</p>
              </div>
            </div>
          </div>

          {/* Traffic Chart */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Traffic Overview</h3>
            <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Traffic chart placeholder</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white rounded-2xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-800">Recent Alerts</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {alerts.map((alert) => (
              <div key={alert.id} className="p-6 flex items-center gap-4">
                <div
                  className={`w-2 h-2 rounded-full ${
                    alert.type === 'error'
                      ? 'bg-red-500'
                      : alert.type === 'warning'
                      ? 'bg-yellow-500'
                      : 'bg-blue-500'
                  }`}
                />
                <div className="flex-1">
                  <p className="text-gray-900">{alert.message}</p>
                  <p className="text-sm text-gray-500 mt-1">{alert.time}</p>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}