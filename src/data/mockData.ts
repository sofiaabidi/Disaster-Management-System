import { Alert, Resource, Incident, Team, EvacuationPlan, Shelter, Route, WeatherData, Message, User } from '../types';

export const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    title: 'Cyclone Biparjoy Approaching Gujarat Coast',
    severity: 'critical',
    type: 'natural',
    location: 'Gujarat Coast',
    description: 'Severe cyclonic storm with wind speeds up to 140 km/h expected to make landfall in 12 hours.',
    status: 'active',
    createdAt: '2024-12-15T08:00:00Z',
    updatedAt: '2024-12-15T10:30:00Z'
  },
  {
    id: 'alert-2',
    title: 'Flash Flood Warning - Mumbai',
    severity: 'high',
    type: 'natural',
    location: 'Mumbai, Maharashtra',
    description: 'Heavy rainfall expected in next 6 hours. Low-lying areas at risk of flooding.',
    status: 'active',
    createdAt: '2024-12-15T09:00:00Z',
    updatedAt: '2024-12-15T09:00:00Z'
  },
  {
    id: 'alert-3',
    title: 'Forest Fire Contained - Uttarakhand',
    severity: 'medium',
    type: 'natural',
    location: 'Nainital, Uttarakhand',
    description: 'Forest fire in Nainital district has been successfully contained. Monitoring continues.',
    status: 'resolved',
    createdAt: '2024-12-14T14:00:00Z',
    updatedAt: '2024-12-15T06:00:00Z'
  }
];

export const mockResources: Resource[] = [
  {
    id: 'res-1',
    name: 'NDRF Teams',
    type: 'personnel',
    quantity: 45,
    available: 32,
    location: 'Multiple Locations',
    status: 'available'
  },
  {
    id: 'res-2',
    name: 'Rescue Helicopters',
    type: 'vehicle',
    quantity: 8,
    available: 5,
    location: 'Delhi, Mumbai, Chennai',
    status: 'available'
  },
  {
    id: 'res-3',
    name: 'Emergency Medical Kits',
    type: 'supplies',
    quantity: 500,
    available: 350,
    location: 'State Warehouses',
    status: 'available'
  },
  {
    id: 'res-4',
    name: 'Inflatable Boats',
    type: 'equipment',
    quantity: 25,
    available: 18,
    location: 'Coastal States',
    status: 'available'
  }
];

export const mockIncidents: Incident[] = [
  {
    id: 'inc-1',
    title: 'Building Collapse in Mumbai',
    type: 'Structural Failure',
    severity: 'critical',
    location: 'Dharavi, Mumbai',
    coordinates: { lat: 19.0433, lng: 72.8654 },
    description: 'Four-story residential building collapsed. Rescue operations in progress.',
    reportedBy: 'Mumbai Fire Brigade',
    status: 'responding',
    assignedTeam: 'team-1',
    createdAt: '2024-12-15T11:30:00Z',
    updatedAt: '2024-12-15T12:00:00Z'
  },
  {
    id: 'inc-2',
    title: 'Landslide on NH-44',
    type: 'Natural Disaster',
    severity: 'high',
    location: 'Jammu & Kashmir',
    coordinates: { lat: 33.7782, lng: 76.5762 },
    description: 'Highway blocked due to landslide. Traffic diverted to alternate routes.',
    reportedBy: 'NHAI Control Room',
    status: 'investigating',
    createdAt: '2024-12-15T07:45:00Z',
    updatedAt: '2024-12-15T08:15:00Z'
  }
];

export const mockTeams: Team[] = [
  {
    id: 'team-1',
    name: 'NDRF Battalion 1',
    type: 'rescue',
    leader: 'Commandant Rajesh Kumar',
    members: ['Inspector A. Sharma', 'Inspector B. Singh', 'Head Constable C. Verma'],
    status: 'deployed',
    location: 'Mumbai',
    equipment: ['Rescue Equipment', 'Medical Supplies', 'Communication Devices'],
    contact: '+91-9876543210'
  },
  {
    id: 'team-2',
    name: 'Fire Response Team Alpha',
    type: 'fire',
    leader: 'Chief Fire Officer M. Patel',
    members: ['Fire Officer D. Kumar', 'Fire Officer E. Yadav', 'Driver F. Shah'],
    status: 'available',
    location: 'Delhi',
    equipment: ['Fire Trucks', 'Ladders', 'Breathing Apparatus'],
    contact: '+91-9876543211'
  }
];

export const mockEvacuationPlans: EvacuationPlan[] = [
  {
    id: 'plan-1',
    name: 'Mumbai Coastal Evacuation Plan',
    area: 'Mumbai Coastal Areas',
    capacity: 50000,
    shelters: [
      {
        id: 'shelter-1',
        name: 'Nehru Stadium',
        location: 'Mumbai',
        capacity: 10000,
        currentOccupancy: 0,
        facilities: ['Food', 'Water', 'Medical Aid', 'Restrooms'],
        contact: '+91-9876543212',
        status: 'operational'
      }
    ],
    routes: [
      {
        id: 'route-1',
        name: 'Coastal Route A',
        from: 'Juhu Beach',
        to: 'Nehru Stadium',
        distance: '8.5 km',
        estimatedTime: '25 minutes',
        status: 'clear'
      }
    ],
    status: 'active',
    lastUpdated: '2024-12-10T00:00:00Z'
  }
];

export const mockWeatherData: WeatherData = {
  location: 'Delhi',
  temperature: 28,
  humidity: 65,
  windSpeed: 15,
  visibility: 8,
  condition: 'Partly Cloudy',
  alerts: ['Heat Wave Warning'],
  forecast: [
    { date: '2024-12-16', high: 32, low: 22, condition: 'Sunny', precipitation: 0 },
    { date: '2024-12-17', high: 30, low: 20, condition: 'Cloudy', precipitation: 10 },
    { date: '2024-12-18', high: 28, low: 18, condition: 'Rainy', precipitation: 80 }
  ]
};

export const mockMessages: Message[] = [
  {
    id: 'msg-1',
    from: 'Control Room Delhi',
    to: 'All Teams',
    subject: 'Alert Status Update',
    content: 'All teams please confirm your current status and location for the evening briefing.',
    priority: 'high',
    status: 'sent',
    timestamp: '2024-12-15T14:30:00Z'
  },
  {
    id: 'msg-2',
    from: 'NDRF HQ',
    to: 'Team Leaders',
    subject: 'Equipment Maintenance Schedule',
    content: 'Monthly equipment maintenance is scheduled for next week. Please prepare your inventories.',
    priority: 'normal',
    status: 'delivered',
    timestamp: '2024-12-15T10:00:00Z'
  }
];

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Dr. Arvind Kumar',
    role: 'Disaster Management Coordinator',
    department: 'NDMA',
    contact: '+91-9876543213',
    lastActive: '2024-12-15T12:00:00Z'
  },
  {
    id: 'user-2',
    name: 'Priya Sharma',
    role: 'Emergency Response Officer',
    department: 'State Emergency',
    contact: '+91-9876543214',
    lastActive: '2024-12-15T11:45:00Z'
  }
];

// Analytics data
export const mockAnalytics = {
  totalIncidents: 156,
  resolvedIncidents: 142,
  activeIncidents: 14,
  averageResponseTime: '18 minutes',
  resourceUtilization: 78,
  monthlyIncidents: [
    { month: 'Jan', incidents: 12 },
    { month: 'Feb', incidents: 8 },
    { month: 'Mar', incidents: 15 },
    { month: 'Apr', incidents: 22 },
    { month: 'May', incidents: 18 },
    { month: 'Jun', incidents: 25 }
  ],
  incidentsByType: [
    { type: 'Natural Disaster', count: 45 },
    { type: 'Fire', count: 32 },
    { type: 'Medical Emergency', count: 28 },
    { type: 'Accident', count: 25 },
    { type: 'Other', count: 26 }
  ]
};