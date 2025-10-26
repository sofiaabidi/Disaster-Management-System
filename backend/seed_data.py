from pymongo import MongoClient
from datetime import datetime

# MongoDB Configuration
MONGO_URI = 'mongodb://localhost:27017/'
client = MongoClient(MONGO_URI)
db = client['disaster_management']

# Clear existing data
db.alerts.delete_many({})
db.resources.delete_many({})
db.incidents.delete_many({})
db.teams.delete_many({})
db.evacuation_plans.delete_many({})
db.messages.delete_many({})
db.users.delete_many({})
db.weather.delete_many({})

print("Seeding database with initial data...")

# Seed Alerts
alerts = [
    {
        'title': 'Cyclone Biparjoy Approaching Gujarat Coast',
        'severity': 'critical',
        'type': 'natural',
        'location': 'Gujarat Coast',
        'description': 'Severe cyclonic storm with wind speeds up to 140 km/h expected to make landfall in 12 hours.',
        'status': 'active',
        'createdAt': '2024-12-15T08:00:00Z',
        'updatedAt': '2024-12-15T10:30:00Z'
    },
    {
        'title': 'Flash Flood Warning - Mumbai',
        'severity': 'high',
        'type': 'natural',
        'location': 'Mumbai, Maharashtra',
        'description': 'Heavy rainfall expected in next 6 hours. Low-lying areas at risk of flooding.',
        'status': 'active',
        'createdAt': '2024-12-15T09:00:00Z',
        'updatedAt': '2024-12-15T09:00:00Z'
    },
    {
        'title': 'Forest Fire Contained - Uttarakhand',
        'severity': 'medium',
        'type': 'natural',
        'location': 'Nainital, Uttarakhand',
        'description': 'Forest fire in Nainital district has been successfully contained. Monitoring continues.',
        'status': 'resolved',
        'createdAt': '2024-12-14T14:00:00Z',
        'updatedAt': '2024-12-15T06:00:00Z'
    }
]
db.alerts.insert_many(alerts)
print(f"✓ Seeded {len(alerts)} alerts")

# Seed Resources
resources = [
    {
        'name': 'NDRF Teams',
        'type': 'personnel',
        'quantity': 45,
        'available': 32,
        'location': 'Multiple Locations',
        'status': 'available'
    },
    {
        'name': 'Rescue Helicopters',
        'type': 'vehicle',
        'quantity': 8,
        'available': 5,
        'location': 'Delhi, Mumbai, Chennai',
        'status': 'available'
    },
    {
        'name': 'Emergency Medical Kits',
        'type': 'supplies',
        'quantity': 500,
        'available': 350,
        'location': 'State Warehouses',
        'status': 'available'
    },
    {
        'name': 'Inflatable Boats',
        'type': 'equipment',
        'quantity': 25,
        'available': 18,
        'location': 'Coastal States',
        'status': 'available'
    }
]
db.resources.insert_many(resources)
print(f"✓ Seeded {len(resources)} resources")

# Seed Incidents
incidents = [
    {
        'title': 'Building Collapse in Mumbai',
        'type': 'Structural Failure',
        'severity': 'critical',
        'location': 'Dharavi, Mumbai',
        'coordinates': {'lat': 19.0433, 'lng': 72.8654},
        'description': 'Four-story residential building collapsed. Rescue operations in progress.',
        'reportedBy': 'Mumbai Fire Brigade',
        'status': 'responding',
        'assignedTeam': 'NDRF Battalion 1',
        'createdAt': '2024-12-15T11:30:00Z',
        'updatedAt': '2024-12-15T12:00:00Z'
    },
    {
        'title': 'Landslide on NH-44',
        'type': 'Natural Disaster',
        'severity': 'high',
        'location': 'Jammu & Kashmir',
        'coordinates': {'lat': 33.7782, 'lng': 76.5762},
        'description': 'Highway blocked due to landslide. Traffic diverted to alternate routes.',
        'reportedBy': 'NHAI Control Room',
        'status': 'investigating',
        'createdAt': '2024-12-15T07:45:00Z',
        'updatedAt': '2024-12-15T08:15:00Z'
    }
]
db.incidents.insert_many(incidents)
print(f"✓ Seeded {len(incidents)} incidents")

# Seed Teams
teams = [
    {
        'name': 'NDRF Battalion 1',
        'type': 'rescue',
        'leader': 'Commandant Rajesh Kumar',
        'members': ['Inspector A. Sharma', 'Inspector B. Singh', 'Head Constable C. Verma'],
        'status': 'deployed',
        'location': 'Mumbai',
        'equipment': ['Rescue Equipment', 'Medical Supplies', 'Communication Devices'],
        'contact': '+91-9876543210'
    },
    {
        'name': 'Fire Response Team Alpha',
        'type': 'fire',
        'leader': 'Chief Fire Officer M. Patel',
        'members': ['Fire Officer D. Kumar', 'Fire Officer E. Yadav', 'Driver F. Shah'],
        'status': 'available',
        'location': 'Delhi',
        'equipment': ['Fire Trucks', 'Ladders', 'Breathing Apparatus'],
        'contact': '+91-9876543211'
    }
]
db.teams.insert_many(teams)
print(f"✓ Seeded {len(teams)} teams")

# Seed Evacuation Plans
evacuation_plans = [
    {
        'name': 'Mumbai Coastal Evacuation Plan',
        'area': 'Mumbai Coastal Areas',
        'capacity': 50000,
        'shelters': [
            {
                'id': 'shelter-1',
                'name': 'Nehru Stadium',
                'location': 'Mumbai',
                'capacity': 10000,
                'currentOccupancy': 0,
                'facilities': ['Food', 'Water', 'Medical Aid', 'Restrooms'],
                'contact': '+91-9876543212',
                'status': 'operational'
            }
        ],
        'routes': [
            {
                'id': 'route-1',
                'name': 'Coastal Route A',
                'from': 'Juhu Beach',
                'to': 'Nehru Stadium',
                'distance': '8.5 km',
                'estimatedTime': '25 minutes',
                'status': 'clear'
            }
        ],
        'status': 'active',
        'lastUpdated': '2024-12-10T00:00:00Z'
    }
]
db.evacuation_plans.insert_many(evacuation_plans)
print(f"✓ Seeded {len(evacuation_plans)} evacuation plans")

# Seed Messages
messages = [
    {
        'from': 'Control Room Delhi',
        'to': 'All Teams',
        'subject': 'Alert Status Update',
        'content': 'All teams please confirm your current status and location for the evening briefing.',
        'priority': 'high',
        'status': 'sent',
        'timestamp': '2024-12-15T14:30:00Z'
    },
    {
        'from': 'NDRF HQ',
        'to': 'Team Leaders',
        'subject': 'Equipment Maintenance Schedule',
        'content': 'Monthly equipment maintenance is scheduled for next week. Please prepare your inventories.',
        'priority': 'normal',
        'status': 'delivered',
        'timestamp': '2024-12-15T10:00:00Z'
    }
]
db.messages.insert_many(messages)
print(f"✓ Seeded {len(messages)} messages")

# Seed Users
users = [
    {
        'name': 'Dr. Arvind Kumar',
        'role': 'Disaster Management Coordinator',
        'department': 'NDMA',
        'contact': '+91-9876543213',
        'lastActive': '2024-12-15T12:00:00Z'
    },
    {
        'name': 'Priya Sharma',
        'role': 'Emergency Response Officer',
        'department': 'State Emergency',
        'contact': '+91-9876543214',
        'lastActive': '2024-12-15T11:45:00Z'
    }
]
db.users.insert_many(users)
print(f"✓ Seeded {len(users)} users")

# Seed Weather Data
weather_data = {
    'location': 'Delhi',
    'temperature': 28,
    'humidity': 65,
    'windSpeed': 15,
    'visibility': 8,
    'condition': 'Partly Cloudy',
    'alerts': ['Heat Wave Warning'],
    'forecast': [
        {'date': '2024-12-16', 'high': 32, 'low': 22, 'condition': 'Sunny', 'precipitation': 0},
        {'date': '2024-12-17', 'high': 30, 'low': 20, 'condition': 'Cloudy', 'precipitation': 10},
        {'date': '2024-12-18', 'high': 28, 'low': 18, 'condition': 'Rainy', 'precipitation': 80}
    ]
}
db.weather.insert_one(weather_data)
print("✓ Seeded weather data")

print("\n✅ Database seeding completed successfully!")