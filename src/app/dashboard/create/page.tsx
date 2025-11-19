'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Save, Eye, Settings, BarChart3, PieChart, LineChart, 
  Table, Map, Calendar, Grid, Trash2, Copy, Edit2,
  Plus, Move
} from 'lucide-react';

interface Widget {
  id: string;
  type: string;
  title: string;
  iconName: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: any } = {
    'BarChart3': BarChart3,
    'PieChart': PieChart,
    'LineChart': LineChart,
    'Table': Table,
    'Map': Map,
    'Calendar': Calendar
  };
  return iconMap[iconName] || BarChart3;
};

export default function CreateDashboardPage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLDivElement>(null);
  
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const widgetLibrary = [
    { type: 'bar-chart', title: 'Bar Chart', icon: BarChart3, iconName: 'BarChart3', category: 'CHARTS' },
    { type: 'pie-chart', title: 'Pie Chart', icon: PieChart, iconName: 'PieChart', category: 'CHARTS' },
    { type: 'line-chart', title: 'Line Chart', icon: LineChart, iconName: 'LineChart', category: 'CHARTS' },
    { type: 'data-table', title: 'Data Table', icon: Table, iconName: 'Table', category: 'DATA' },
    { type: 'map-view', title: 'Map View', icon: Map, iconName: 'Map', category: 'DATA' },
    { type: 'calendar', title: 'Calendar', icon: Calendar, iconName: 'Calendar', category: 'DATA' },
  ];

  const handleWidgetDragStart = (e: React.DragEvent, widgetType: string, title: string, icon: any) => {
    const dragData = { widgetType, title, iconName: icon.name || widgetType };
    e.dataTransfer.setData('application/json', JSON.stringify(dragData));
  };

  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    try {
      const dragData = JSON.parse(e.dataTransfer.getData('application/json'));
      const canvasRect = canvasRef.current?.getBoundingClientRect();
      
      if (!canvasRect) return;
      
      const x = e.clientX - canvasRect.left;
      const y = e.clientY - canvasRect.top;
      
      // Find the widget config to get the correct iconName
      const widgetConfig = widgetLibrary.find(w => w.type === dragData.widgetType);
      if (!widgetConfig) return;
      
      const newWidget: Widget = {
        id: Date.now().toString(),
        type: dragData.widgetType,
        title: dragData.title,
        iconName: widgetConfig.iconName,
        x: Math.max(0, x - 100),
        y: Math.max(0, y - 75),
        width: 300,
        height: 200
      };
      
      setWidgets(prev => [...prev, newWidget]);
    } catch (error) {
      console.error('Error parsing drag data:', error);
    }
  };

  const handleCanvasDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleWidgetMouseDown = (e: React.MouseEvent, widgetId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    
    setSelectedWidget(widgetId);
    setIsDragging(true);
    setDragOffset({ x: offsetX, y: offsetY });
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const newX = e.clientX - canvasRect.left - offsetX;
      const newY = e.clientY - canvasRect.top - offsetY;
      
      setWidgets(prev => prev.map(widget => 
        widget.id === widgetId
          ? { ...widget, x: Math.max(0, newX), y: Math.max(0, newY) }
          : widget
      ));
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const deleteWidget = (widgetId: string) => {
    setWidgets(prev => prev.filter(w => w.id !== widgetId));
    setSelectedWidget(null);
  };

  const duplicateWidget = (widgetId: string) => {
    const widget = widgets.find(w => w.id === widgetId);
    if (!widget) return;
    
    const newWidget: Widget = {
      ...widget,
      id: Date.now().toString(),
      x: widget.x + 20,
      y: widget.y + 20
    };
    
    setWidgets(prev => [...prev, newWidget]);
  };

  const WidgetComponent = ({ widget }: { widget: Widget }) => {
    const Icon = getIconComponent(widget.iconName);
    const isSelected = selectedWidget === widget.id;
    
    return (
      <motion.div
        style={{
          position: 'absolute',
          left: widget.x,
          top: widget.y,
          width: widget.width,
          height: widget.height,
        }}
        className={`bg-white rounded-xl border-2 cursor-move transition-all duration-200 ${
          isSelected ? 'border-blue-500 shadow-lg' : 'border-gray-200 hover:border-gray-300'
        }`}
        onMouseDown={(e) => handleWidgetMouseDown(e, widget.id)}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Icon className="w-5 h-5 text-blue-600" />
              <h3 className="font-medium text-gray-800 text-sm">{widget.title}</h3>
            </div>
            
            {isSelected && (
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    duplicateWidget(widget.id);
                  }}
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Copy className="w-3 h-3 text-gray-500" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteWidget(widget.id);
                  }}
                  className="p-1.5 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <Trash2 className="w-3 h-3 text-red-500" />
                </button>
              </div>
            )}
          </div>
          
          <div className="flex-1 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-400">
              <Icon className="w-12 h-12 mx-auto mb-2" />
              <p className="text-xs">Chart Preview</p>
            </div>
          </div>
        </div>
        
        {/* Resize Handle */}
        {isSelected && (
          <div className="absolute bottom-1 right-1 w-3 h-3 bg-blue-500 rounded cursor-se-resize opacity-70 hover:opacity-100 transition-opacity">
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/dashboard/user')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">Custom Dashboard Builder</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
              <Eye className="w-4 h-4" />
              Preview
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-xl transition-colors">
              <Save className="w-4 h-4" />
              Save Dashboard
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Widget Library Sidebar */}
        <aside className="w-72 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Widget Library</h2>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto">
            {['CHARTS', 'DATA'].map(category => (
              <div key={category} className="mb-8">
                <h3 className="text-sm font-bold text-gray-800 mb-4">{category}</h3>
                <div className="space-y-2">
                  {widgetLibrary
                    .filter(widget => widget.category === category)
                    .map((widget) => {
                      const Icon = widget.icon;
                      return (
                        <div
                          key={widget.type}
                          draggable
                          onDragStart={(e) => handleWidgetDragStart(e, widget.type, widget.title, widget.iconName)}
                          className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-grab hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 active:cursor-grabbing"
                        >
                          <Icon className="w-5 h-5 text-gray-600" />
                          <span className="text-sm font-medium text-gray-700">{widget.title}</span>
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Canvas Area */}
        <main className="flex-1 relative">
          <div
            ref={canvasRef}
            className="w-full h-full relative overflow-auto bg-gray-100"
            onDrop={handleCanvasDrop}
            onDragOver={handleCanvasDragOver}
            onClick={() => setSelectedWidget(null)}
          >
            {widgets.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Plus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-600 mb-2">Start Building</h3>
                  <p className="text-gray-500">Drag widgets from the library to add them to your dashboard</p>
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full" style={{ minHeight: '100vh', minWidth: '100vw' }}>
                {widgets.map(widget => (
                  <WidgetComponent key={widget.id} widget={widget} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
