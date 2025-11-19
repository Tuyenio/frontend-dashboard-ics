'use client';

import { useState } from 'react';
import { 
  BarChart3, PieChart, LineChart, Table, Map, Calendar, 
  Plus, Save, Eye, Undo, Redo, Settings
} from 'lucide-react';

export default function CreateDashboardPage() {
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);
  
  const widgetCategories = [
    {
      title: 'Charts',
      widgets: [
        { id: 'bar', name: 'Bar Chart', icon: BarChart3 },
        { id: 'pie', name: 'Pie Chart', icon: PieChart },
        { id: 'line', name: 'Line Chart', icon: LineChart }
      ]
    },
    {
      title: 'Data',
      widgets: [
        { id: 'table', name: 'Data Table', icon: Table },
        { id: 'map', name: 'Map View', icon: Map },
        { id: 'calendar', name: 'Calendar', icon: Calendar }
      ]
    }
  ];

  const sampleData = [
    { id: 1, product: 'iPhone 14', sales: 1250, revenue: '$1,875,000', growth: '+12%' },
    { id: 2, product: 'Samsung Galaxy S23', sales: 980, revenue: '$1,470,000', growth: '+8%' },
    { id: 3, product: 'Google Pixel 7', sales: 750, revenue: '$562,500', growth: '+15%' },
    { id: 4, product: 'OnePlus 11', sales: 620, revenue: '$465,000', growth: '+5%' },
    { id: 5, product: 'Xiaomi 13', sales: 540, revenue: '$405,000', growth: '+20%' }
  ];

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Left Sidebar - Widget Library */}
      <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-6">Widget Library</h2>
          
          <div className="space-y-6">
            {widgetCategories.map((category) => (
              <div key={category.title}>
                <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-3">
                  {category.title}
                </h3>
                <div className="space-y-2">
                  {category.widgets.map((widget) => {
                    const Icon = widget.icon;
                    return (
                      <div
                        key={widget.id}
                        onClick={() => setSelectedWidget(widget.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          selectedWidget === widget.id
                            ? 'border-blue-200 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">{widget.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-medium text-gray-800">Custom Dashboard Builder</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <Undo className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <Redo className="w-4 h-4 text-gray-600" />
              </button>
              
              <div className="w-px h-6 bg-gray-200 mx-2" />
              
              <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <Eye className="w-4 h-4" />
                Preview
              </button>
              <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <Save className="w-4 h-4" />
                Save Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 h-full">
            {selectedWidget === 'table' ? (
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-800">Product Sales Data</h3>
                  <p className="text-gray-600">Sample data table showing product performance</p>
                </div>
                
                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Product</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Units Sold</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Revenue</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Growth</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {sampleData.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{item.product}</td>
                          <td className="py-3 px-4 text-gray-600">{item.sales.toLocaleString()}</td>
                          <td className="py-3 px-4 text-gray-600">{item.revenue}</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {item.growth}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Start Building</h3>
                  <p className="text-gray-600 max-w-sm">
                    Select a widget from the library on the left to add it to your dashboard
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}