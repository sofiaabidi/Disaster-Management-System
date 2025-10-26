import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  AlertTriangle, 
  Users, 
  Package, 
  Activity,
  TrendingUp,
  MapPin,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { mockAlerts, mockResources, mockIncidents, mockAnalytics } from '../data/mockData';

interface DashboardProps {
  onPageChange: (page: string) => void;
}

export function Dashboard({ onPageChange }: DashboardProps) {
  const activeAlerts = mockAlerts.filter(alert => alert.status === 'active');
  const criticalIncidents = mockIncidents.filter(incident => incident.severity === 'critical');
  const availableResources = mockResources.reduce((acc, resource) => acc + resource.available, 0);
  const totalResources = mockResources.reduce((acc, resource) => acc + resource.quantity, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-gray-900">Disaster Management Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            System Status: Online
          </Badge>
          <Button size="sm" onClick={() => onPageChange('alerts')}>
            View All Alerts
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Alerts</p>
              <p className="text-2xl text-gray-900">{activeAlerts.length}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4">
            <Button 
              variant="link" 
              size="sm" 
              className="p-0 h-auto text-red-600"
              onClick={() => onPageChange('alerts')}
            >
              View Details →
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Response Teams</p>
              <p className="text-2xl text-gray-900">42</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <Button 
              variant="link" 
              size="sm" 
              className="p-0 h-auto text-blue-600"
              onClick={() => onPageChange('teams')}
            >
              Manage Teams →
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Available Resources</p>
              <p className="text-2xl text-gray-900">{availableResources}/{totalResources}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <Button 
              variant="link" 
              size="sm" 
              className="p-0 h-auto text-green-600"
              onClick={() => onPageChange('resources')}
            >
              View Resources →
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Response Time</p>
              <p className="text-2xl text-gray-900">{mockAnalytics.averageResponseTime}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <Button 
              variant="link" 
              size="sm" 
              className="p-0 h-auto text-purple-600"
              onClick={() => onPageChange('analytics')}
            >
              View Analytics →
            </Button>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg text-gray-900">Recent Alerts</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onPageChange('alerts')}
            >
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {activeAlerts.slice(0, 3).map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.severity === 'critical' ? 'bg-red-500' :
                  alert.severity === 'high' ? 'bg-orange-500' :
                  alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{alert.title}</p>
                  <p className="text-xs text-gray-600 mt-1">{alert.location}</p>
                  <div className="flex items-center mt-2">
                    <Badge 
                      variant="secondary"
                      className={`text-xs ${
                        alert.severity === 'critical' ? 'bg-red-100 text-red-700' :
                        alert.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {alert.severity.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-gray-500 ml-2">
                      {new Date(alert.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Resource Status */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg text-gray-900">Resource Status</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onPageChange('resources')}
            >
              Manage
            </Button>
          </div>
          <div className="space-y-4">
            {mockResources.map((resource) => {
              const utilization = ((resource.quantity - resource.available) / resource.quantity) * 100;
              return (
                <div key={resource.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-900">{resource.name}</span>
                    <span className="text-sm text-gray-600">
                      {resource.available}/{resource.quantity}
                    </span>
                  </div>
                  <Progress value={utilization} className="h-2" />
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-lg text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => onPageChange('incidents')}
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Report New Incident
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => onPageChange('teams')}
            >
              <Users className="w-4 h-4 mr-2" />
              Deploy Team
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => onPageChange('evacuation')}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Activate Evacuation
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => onPageChange('communication')}
            >
              <Activity className="w-4 h-4 mr-2" />
              Send Alert
            </Button>
          </div>
        </Card>

        {/* System Status */}
        <Card className="p-6">
          <h3 className="text-lg text-gray-900 mb-4">System Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Communication Systems</span>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Weather Monitoring</span>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">GPS Tracking</span>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Database Sync</span>
              <XCircle className="w-5 h-5 text-orange-500" />
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="text-lg text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-900">Team deployed to Mumbai</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-900">Weather alert issued</p>
                <p className="text-xs text-gray-500">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-900">Incident resolved</p>
                <p className="text-xs text-gray-500">6 hours ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}