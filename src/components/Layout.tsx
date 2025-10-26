import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Home, 
  AlertTriangle, 
  Package, 
  FileText, 
  Users, 
  MapPin, 
  Cloud, 
  MessageSquare, 
  BarChart3,
  Settings,
  LogOut,
  Bell
} from 'lucide-react';
import govtLogo from 'figma:asset/41e57d94a0a11f07ecf591200122d730a7f7b6fe.png';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'alerts', label: 'Emergency Alerts', icon: AlertTriangle },
  { id: 'resources', label: 'Resource Management', icon: Package },
  { id: 'incidents', label: 'Incident Reporting', icon: FileText },
  { id: 'teams', label: 'Response Teams', icon: Users },
  { id: 'evacuation', label: 'Evacuation Plans', icon: MapPin },
  { id: 'weather', label: 'Weather Monitoring', icon: Cloud },
  { id: 'communication', label: 'Communication Center', icon: MessageSquare },
  { id: 'analytics', label: 'Reports & Analytics', icon: BarChart3 }
];

export function Layout({ children, currentPage, onPageChange }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden">
              <img src={govtLogo} alt="Government of India" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-xl text-gray-900">National Disaster Management System</h1>
              <p className="text-sm text-gray-600">Government of India</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 px-1 py-0 text-xs bg-red-500">3</Badge>
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-blue-800 border-r border-blue-900 min-h-[calc(100vh-73px)]">
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <li key={item.id}>
                    <Button
                      variant={currentPage === item.id ? "secondary" : "ghost"}
                      className={`w-full justify-start transition-all ${
                        currentPage === item.id 
                          ? "bg-white text-blue-600 hover:bg-gray-100" 
                          : "text-white hover:bg-blue-900 hover:text-white"
                      }`}
                      onClick={() => onPageChange(item.id)}
                    >
                      <IconComponent className="w-5 h-5 mr-3" />
                      {item.label}
                    </Button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}