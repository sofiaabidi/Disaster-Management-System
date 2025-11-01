import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import {
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Eye,
  Thermometer,
  Droplets,
  AlertTriangle,
  RefreshCw,
  Search,
  MapPin,
  Clock
} from 'lucide-react';
import { mockWeatherData } from '../data/mockData';

export function WeatherMonitoring() {
  const [weatherData, setWeatherData] = useState(mockWeatherData);
  const [selectedLocation, setSelectedLocation] = useState('Delhi');
  const [searchLocation, setSearchLocation] = useState('');

  const locations = [
    'Delhi', 'Mumbai', 'Chennai', 'Kolkata', 'Bangalore', 'Hyderabad',
    'Ahmedabad', 'Pune', 'Jaipur', 'Lucknow'
  ];

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    // In a real app, this would fetch weather data for the selected location
    setWeatherData({
      ...weatherData,
      location: location,
      temperature: Math.floor(Math.random() * 20) + 20,
      humidity: Math.floor(Math.random() * 40) + 40,
      windSpeed: Math.floor(Math.random() * 25) + 5
    });
  };

  const handleRefresh = () => {
    // Simulate refreshing weather data
    setWeatherData({
      ...weatherData,
      temperature: Math.floor(Math.random() * 20) + 20,
      humidity: Math.floor(Math.random() * 40) + 40,
      windSpeed: Math.floor(Math.random() * 25) + 5
    });
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return Sun;
      case 'rainy':
      case 'rain':
        return CloudRain;
      case 'cloudy':
      case 'partly cloudy':
        return Cloud;
      default:
        return Cloud;
    }
  };

  const getAlertSeverity = (alert: string) => {
    if (alert.toLowerCase().includes('warning') || alert.toLowerCase().includes('severe')) {
      return 'high';
    } else if (alert.toLowerCase().includes('watch') || alert.toLowerCase().includes('advisory')) {
      return 'medium';
    }
    return 'low';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const WeatherIcon = getWeatherIcon(weatherData.condition);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900">Weather Monitoring</h1>
          <p className="text-gray-600">Real-time weather data and alerts for disaster preparedness</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <AlertTriangle className="w-4 h-4 mr-2" />
            Issue Alert
          </Button>
        </div>
      </div>

      {/* Location Selector */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search location..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {locations.map((location) => (
              <Button
                key={location}
                variant={selectedLocation === location ? "default" : "outline"}
                size="sm"
                onClick={() => handleLocationChange(location)}
              >
                {location}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Current Weather */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Weather Card */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl text-gray-900 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                {weatherData.location}
              </h2>
              <p className="text-gray-600 flex items-center mt-1">
                <Clock className="w-4 h-4 mr-1" />
                Last updated: {new Date().toLocaleTimeString()}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center">
                <WeatherIcon className="w-16 h-16 text-blue-500 mr-4" />
                <div>
                  <div className="text-4xl text-gray-900">{weatherData.temperature}°C</div>
                  <div className="text-gray-600">{weatherData.condition}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Droplets className="w-6 h-6 text-blue-500" />
              </div>
              <div className="text-2xl text-gray-900">{weatherData.humidity}%</div>
              <div className="text-sm text-gray-600">Humidity</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Wind className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-2xl text-gray-900">{weatherData.windSpeed} km/h</div>
              <div className="text-sm text-gray-600">Wind Speed</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Eye className="w-6 h-6 text-purple-500" />
              </div>
              <div className="text-2xl text-gray-900">{weatherData.visibility} km</div>
              <div className="text-sm text-gray-600">Visibility</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Thermometer className="w-6 h-6 text-orange-500" />
              </div>
              <div className="text-2xl text-gray-900">28°C</div>
              <div className="text-sm text-gray-600">Feels Like</div>
            </div>
          </div>
        </Card>

        {/* Weather Alerts */}
        <Card className="p-6">
          <h3 className="text-lg text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
            Active Alerts
          </h3>
          <div className="space-y-3">
            {weatherData.alerts.map((alert, index) => {
              const severity = getAlertSeverity(alert);
              return (
                <div key={index} className={`p-3 rounded-lg border ${getSeverityColor(severity)}`}>
                  <div className="flex items-center justify-between mb-1">
                    <Badge className={getSeverityColor(severity)}>
                      {severity.toUpperCase()}
                    </Badge>
                    <span className="text-xs">2 hours ago</span>
                  </div>
                  <p className="text-sm">{alert}</p>
                </div>
              );
            })}
            {weatherData.alerts.length === 0 && (
              <div className="text-center py-4">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
                <p className="text-sm text-gray-600">No active weather alerts</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Forecast */}
      <Card className="p-6">
        <h3 className="text-lg text-gray-900 mb-4">3-Day Forecast</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {weatherData.forecast.map((day, index) => {
            const DayIcon = getWeatherIcon(day.condition);
            return (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">
                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </div>
                  <DayIcon className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-sm text-gray-900 mb-1">{day.condition}</div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-900">{day.high}°</span>
                    <span className="text-gray-600">{day.low}°</span>
                  </div>
                  <div className="mt-2 text-xs text-blue-600">
                    {day.precipitation}% rain
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Additional Weather Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Air Quality */}
        <Card className="p-6">
          <h3 className="text-lg text-gray-900 mb-4">Air Quality Index</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>PM2.5</span>
                <span>45 µg/m³</span>
              </div>
              <Progress value={45} className="h-2" />
              <div className="text-xs text-gray-600 mt-1">Moderate</div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>PM10</span>
                <span>82 µg/m³</span>
              </div>
              <Progress value={65} className="h-2" />
              <div className="text-xs text-gray-600 mt-1">Unhealthy</div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Overall AQI</span>
                <span>92</span>
              </div>
              <Progress value={60} className="h-2" />
              <div className="text-xs text-gray-600 mt-1">Moderate</div>
            </div>
          </div>
        </Card>

        {/* UV Index & Solar Radiation */}
        <Card className="p-6">
          <h3 className="text-lg text-gray-900 mb-4">UV Index & Solar Data</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl text-gray-900">7</div>
                <div className="text-sm text-gray-600">UV Index</div>
              </div>
              <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                HIGH
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-600">Sunrise</div>
                <div className="text-gray-900">06:42 AM</div>
              </div>
              <div>
                <div className="text-gray-600">Sunset</div>
                <div className="text-gray-900">06:15 PM</div>
              </div>
            </div>
            <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded">
              ⚠️ High UV levels - protective measures recommended
            </div>
          </div>
        </Card>
      </div>

      {/* Weather Stations */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg text-gray-900">Nearby Weather Stations</h3>
          <Button variant="outline" size="sm">
            <MapPin className="w-4 h-4 mr-2" />
            View on Map
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2">Station</th>
                <th className="text-left py-2">Location</th>
                <th className="text-left py-2">Temp</th>
                <th className="text-left py-2">Humidity</th>
                <th className="text-left py-2">Wind</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Central Delhi', location: 'Connaught Place', temp: '28°C', humidity: '65%', wind: '15 km/h', status: 'online' },
                { name: 'South Delhi', location: 'Hauz Khas', temp: '27°C', humidity: '68%', wind: '12 km/h', status: 'online' },
                { name: 'North Delhi', location: 'Chandni Chowk', temp: '29°C', humidity: '62%', wind: '18 km/h', status: 'offline' },
                { name: 'East Delhi', location: 'Mayur Vihar', temp: '28°C', humidity: '66%', wind: '16 km/h', status: 'online' }
              ].map((station, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-2 text-gray-900">{station.name}</td>
                  <td className="py-2 text-gray-600">{station.location}</td>
                  <td className="py-2 text-gray-900">{station.temp}</td>
                  <td className="py-2 text-gray-900">{station.humidity}</td>
                  <td className="py-2 text-gray-900">{station.wind}</td>
                  <td className="py-2">
                    <Badge className={station.status === 'online' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                      {station.status.toUpperCase()}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}