# Disaster Management System

A comprehensive web application for managing emergency responses, resources, and disaster preparedness. This system provides real-time monitoring, resource tracking, incident management, and communication tools for disaster management teams.

**Original Design**: [Figma Design](https://www.figma.com/design/KJLBIlHHZzNX3Huuvww0f7/Disaster-Management-Webpage)

## 🚀 Features

- **Real-time Data Management**: Full CRUD operations with instant updates
- **Weather Monitoring**: Dynamic weather data with AQI, UV index, and sunrise/sunset times
- **Resource Tracking**: Manage personnel, equipment, supplies, and vehicles
- **Incident Management**: Report, track, and manage emergency incidents
- **Team Coordination**: Deploy and manage response teams
- **Communication Center**: Internal messaging system
- **Analytics Dashboard**: Comprehensive insights and statistics

## 📋 Prerequisites

- Node.js (v18 or higher)
- Python 3.8 or higher
- MongoDB (local or cloud instance)
- OpenWeatherMap API key (optional, for real-time weather data)

## 🛠️ Installation & Setup

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or the port specified by Vite).

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
   - Create a `.env` file (optional) or set environment variables:
   - `MONGO_URI`: MongoDB connection string (default: `mongodb://localhost:27017/`)
   - `OPENWEATHER_API_KEY`: OpenWeatherMap API key (optional)

4. Start the backend server:
```bash
python app.py
```

The backend will run on `http://localhost:5000`

## 📱 Main Functionalities

### 1. **Login Page**
- Secure authentication system
- User registration on first login (auto-create account)
- Password visibility toggle (eye icon)
- Session management
- Password validation with security requirements

**Features:**
- Username/password authentication
- Show/hide password functionality
- Auto-account creation for new users
- Session persistence

### 2. **Dashboard**
- Overview of all critical information
- Real-time statistics and metrics
- Quick access to all modules
- Visual summaries with charts and cards

**Features:**
- Total alerts, resources, and incidents count
- Active incidents status
- Resource utilization metrics
- Recent alerts and incidents display
- Quick navigation to other pages
- Analytics integration

### 3. **Emergency Alerts**
- Create, view, update, and delete emergency alerts
- Filter alerts by severity and status
- Search functionality
- Real-time alert management

**Features:**
- Create alerts with title, severity, type, location, and description
- Filter by severity (critical, high, medium, low)
- Filter by status (active, resolved, monitoring)
- Search alerts by title or location
- Update alert status
- Delete alerts
- Alert details view

### 4. **Resource Management**
- Manage emergency response resources
- Track resource availability and deployment
- Resource categorization and filtering

**Features:**
- Add resources (personnel, equipment, supplies, vehicles)
- Edit resource details (name, quantity, location, status)
- Delete resources
- Deploy resources to incidents
- Filter by type (personnel, equipment, supplies, vehicle)
- Filter by status (available, deployed, maintenance)
- Search resources by name or location
- Resource utilization tracking
- Availability metrics

### 5. **Incident Reporting**
- Report and manage emergency incidents
- Track incident status and progress
- Assign teams to incidents

**Features:**
- Create incident reports with details (title, type, severity, location, description)
- Update incident status (reported, investigating, responding, resolved)
- Filter incidents by severity and status
- Search incidents by title or location
- View incident details
- Track incident timeline
- Assign response teams

### 6. **Response Teams**
- Manage emergency response teams
- Deploy teams to locations
- Track team status and availability

**Features:**
- Create response teams (fire, medical, police, rescue, evacuation)
- Deploy teams to specific locations
- Recall deployed teams
- Filter teams by type and status
- Search teams by name or leader
- View team details (members, equipment, contact)
- Team status tracking (available, deployed, training)

### 7. **Evacuation Plans**
- Create and manage evacuation plans
- Track evacuation routes and shelters
- Activate/deactivate evacuation plans

**Features:**
- Create evacuation plans with coverage area and capacity
- View plan details (shelters, routes)
- Activate/deactivate plans
- Delete plans
- Filter plans by status (active, inactive, under-review)
- Search plans by name or area
- Track plan capacity and resources

### 8. **Weather Monitoring**
- Real-time weather data for multiple cities
- Air Quality Index (AQI) monitoring
- UV Index tracking
- Sunrise/sunset times

**Features:**
- View weather data for major Indian cities
- Real-time temperature, humidity, wind speed, visibility
- Air Quality Index with PM2.5 and PM10 readings
- UV Index with safety recommendations
- Sunrise and sunset times (city-specific)
- Weather forecast (3-day outlook)
- Weather alerts (heat waves, cold waves, rainfall)
- Search custom locations
- Fallback data when API is unavailable
- Dynamic data updates per city

### 9. **Communication Center**
- Internal messaging system
- Send messages between team members
- Message history and tracking

**Features:**
- Send messages to team members
- View message history
- Message filtering and search
- Priority levels (urgent, high, normal, low)
- Message status tracking (sent, delivered, read)
- Timestamp tracking

### 10. **Analytics** (Embedded in Dashboard)
- Comprehensive statistics and insights
- Incident trends and patterns
- Resource utilization analytics
- Performance metrics

**Features:**
- Total incidents count
- Resolved vs active incidents
- Average response time
- Resource utilization percentage
- Monthly incident trends
- Incidents by type breakdown
- Visual charts and graphs

## 🗄️ Database

The application uses MongoDB to store:
- User accounts and authentication data
- Emergency alerts
- Resources
- Incidents
- Response teams
- Evacuation plans
- Messages
- Weather data cache

## 🔧 Technologies Used

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Radix UI** - UI components
- **Lucide React** - Icons
- **Recharts** - Data visualization

### Backend
- **Flask** - Web framework
- **Python** - Backend language
- **MongoDB** - Database
- **PyMongo** - MongoDB driver
- **Flask-CORS** - Cross-origin resource sharing
- **OpenWeatherMap API** - Weather data

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - User login/registration

### Alerts
- `GET /api/alerts` - Get all alerts
- `GET /api/alerts/<id>` - Get alert by ID
- `POST /api/alerts` - Create alert
- `PUT /api/alerts/<id>` - Update alert
- `DELETE /api/alerts/<id>` - Delete alert

### Resources
- `GET /api/resources` - Get all resources
- `POST /api/resources` - Create resource
- `PUT /api/resources/<id>` - Update resource
- `DELETE /api/resources/<id>` - Delete resource

### Incidents
- `GET /api/incidents` - Get all incidents
- `POST /api/incidents` - Create incident
- `PUT /api/incidents/<id>` - Update incident
- `DELETE /api/incidents/<id>` - Delete incident

### Teams
- `GET /api/teams` - Get all teams
- `POST /api/teams` - Create team
- `PUT /api/teams/<id>` - Update team
- `DELETE /api/teams/<id>` - Delete team

### Evacuation Plans
- `GET /api/evacuation-plans` - Get all plans
- `POST /api/evacuation-plans` - Create plan
- `PUT /api/evacuation-plans/<id>` - Update plan
- `DELETE /api/evacuation-plans/<id>` - Delete plan

### Weather
- `GET /api/weather/<location>` - Get weather data for location

### Messages
- `GET /api/messages` - Get all messages
- `POST /api/messages` - Send message

### Analytics
- `GET /api/analytics` - Get analytics data

## 📝 Environment Variables

Create a `.env` file in the backend directory (optional):

```env
MONGO_URI=mongodb://localhost:27017/
OPENWEATHER_API_KEY=your_api_key_here
```

## 🎨 Key Features

- **Real-time Updates**: Data updates immediately without page refresh
- **City-specific Weather Data**: AQI, UV index, and sun times vary by city
- **Fallback Data**: Works without API keys using city-specific fallback data
- **Responsive Design**: Works on desktop and mobile devices
- **Search & Filter**: Advanced search and filtering across all modules
- **Visual Analytics**: Charts and graphs for better insights
- **Session Management**: Persistent login sessions
- **Password Security**: Password validation and visibility toggle

## 🔒 Security Features

- Password validation (8+ chars, uppercase, lowercase, number, special char)
- Session-based authentication
- CORS protection
- Input validation
- Secure password handling

## 📊 Data Management

- All CRUD operations are fully functional
- Data persists in MongoDB
- Real-time state updates in the frontend
- Error handling and fallback mechanisms
- Data validation on both frontend and backend

## 🤝 Contributing

This is a disaster management system project. Feel free to contribute improvements and new features.


---

**Note**: Make sure MongoDB is running before starting the backend server. The application will create the necessary database and collections automatically on first use.
