from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# MongoDB Configuration
MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/')
client = MongoClient(MONGO_URI)
db = client['disaster_management']

# Collections
alerts_collection = db['alerts']
resources_collection = db['resources']
incidents_collection = db['incidents']
teams_collection = db['teams']
evacuation_plans_collection = db['evacuation_plans']
messages_collection = db['messages']
users_collection = db['users']
weather_collection = db['weather']

# Helper function to convert ObjectId to string
def serialize_doc(doc):
    if doc and '_id' in doc:
        doc['id'] = str(doc['_id'])
        del doc['_id']
    return doc

# ============= ALERTS ENDPOINTS =============
@app.route('/api/alerts', methods=['GET'])
def get_alerts():
    try:
        alerts = list(alerts_collection.find())
        return jsonify([serialize_doc(alert) for alert in alerts]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/alerts/<alert_id>', methods=['GET'])
def get_alert(alert_id):
    try:
        alert = alerts_collection.find_one({'_id': ObjectId(alert_id)})
        if alert:
            return jsonify(serialize_doc(alert)), 200
        return jsonify({'error': 'Alert not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/alerts', methods=['POST'])
def create_alert():
    try:
        data = request.json
        data['createdAt'] = datetime.utcnow().isoformat() + 'Z'
        data['updatedAt'] = datetime.utcnow().isoformat() + 'Z'
        result = alerts_collection.insert_one(data)
        data['id'] = str(result.inserted_id)
        return jsonify(data), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/alerts/<alert_id>', methods=['PUT'])
def update_alert(alert_id):
    try:
        data = request.json
        data['updatedAt'] = datetime.utcnow().isoformat() + 'Z'
        result = alerts_collection.update_one(
            {'_id': ObjectId(alert_id)},
            {'$set': data}
        )
        if result.matched_count:
            return jsonify({'message': 'Alert updated successfully'}), 200
        return jsonify({'error': 'Alert not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/alerts/<alert_id>', methods=['DELETE'])
def delete_alert(alert_id):
    try:
        result = alerts_collection.delete_one({'_id': ObjectId(alert_id)})
        if result.deleted_count:
            return jsonify({'message': 'Alert deleted successfully'}), 200
        return jsonify({'error': 'Alert not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ============= RESOURCES ENDPOINTS =============
@app.route('/api/resources', methods=['GET'])
def get_resources():
    try:
        resources = list(resources_collection.find())
        return jsonify([serialize_doc(resource) for resource in resources]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/resources', methods=['POST'])
def create_resource():
    try:
        data = request.json
        result = resources_collection.insert_one(data)
        data['id'] = str(result.inserted_id)
        return jsonify(data), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/resources/<resource_id>', methods=['PUT'])
def update_resource(resource_id):
    try:
        data = request.json
        result = resources_collection.update_one(
            {'_id': ObjectId(resource_id)},
            {'$set': data}
        )
        if result.matched_count:
            return jsonify({'message': 'Resource updated successfully'}), 200
        return jsonify({'error': 'Resource not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/resources/<resource_id>', methods=['DELETE'])
def delete_resource(resource_id):
    try:
        result = resources_collection.delete_one({'_id': ObjectId(resource_id)})
        if result.deleted_count:
            return jsonify({'message': 'Resource deleted successfully'}), 200
        return jsonify({'error': 'Resource not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ============= INCIDENTS ENDPOINTS =============
@app.route('/api/incidents', methods=['GET'])
def get_incidents():
    try:
        incidents = list(incidents_collection.find())
        return jsonify([serialize_doc(incident) for incident in incidents]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/incidents', methods=['POST'])
def create_incident():
    try:
        data = request.json
        data['createdAt'] = datetime.utcnow().isoformat() + 'Z'
        data['updatedAt'] = datetime.utcnow().isoformat() + 'Z'
        result = incidents_collection.insert_one(data)
        data['id'] = str(result.inserted_id)
        return jsonify(data), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/incidents/<incident_id>', methods=['PUT'])
def update_incident(incident_id):
    try:
        data = request.json
        data['updatedAt'] = datetime.utcnow().isoformat() + 'Z'
        result = incidents_collection.update_one(
            {'_id': ObjectId(incident_id)},
            {'$set': data}
        )
        if result.matched_count:
            return jsonify({'message': 'Incident updated successfully'}), 200
        return jsonify({'error': 'Incident not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/incidents/<incident_id>', methods=['DELETE'])
def delete_incident(incident_id):
    try:
        result = incidents_collection.delete_one({'_id': ObjectId(incident_id)})
        if result.deleted_count:
            return jsonify({'message': 'Incident deleted successfully'}), 200
        return jsonify({'error': 'Incident not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ============= TEAMS ENDPOINTS =============
@app.route('/api/teams', methods=['GET'])
def get_teams():
    try:
        teams = list(teams_collection.find())
        return jsonify([serialize_doc(team) for team in teams]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/teams', methods=['POST'])
def create_team():
    try:
        data = request.json
        result = teams_collection.insert_one(data)
        data['id'] = str(result.inserted_id)
        return jsonify(data), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/teams/<team_id>', methods=['PUT'])
def update_team(team_id):
    try:
        data = request.json
        result = teams_collection.update_one(
            {'_id': ObjectId(team_id)},
            {'$set': data}
        )
        if result.matched_count:
            return jsonify({'message': 'Team updated successfully'}), 200
        return jsonify({'error': 'Team not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/teams/<team_id>', methods=['DELETE'])
def delete_team(team_id):
    try:
        result = teams_collection.delete_one({'_id': ObjectId(team_id)})
        if result.deleted_count:
            return jsonify({'message': 'Team deleted successfully'}), 200
        return jsonify({'error': 'Team not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ============= EVACUATION PLANS ENDPOINTS =============
@app.route('/api/evacuation-plans', methods=['GET'])
def get_evacuation_plans():
    try:
        plans = list(evacuation_plans_collection.find())
        return jsonify([serialize_doc(plan) for plan in plans]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/evacuation-plans', methods=['POST'])
def create_evacuation_plan():
    try:
        data = request.json
        data['lastUpdated'] = datetime.utcnow().isoformat() + 'Z'
        result = evacuation_plans_collection.insert_one(data)
        data['id'] = str(result.inserted_id)
        return jsonify(data), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/evacuation-plans/<plan_id>', methods=['PUT'])
def update_evacuation_plan(plan_id):
    try:
        data = request.json
        data['lastUpdated'] = datetime.utcnow().isoformat() + 'Z'
        result = evacuation_plans_collection.update_one(
            {'_id': ObjectId(plan_id)},
            {'$set': data}
        )
        if result.matched_count:
            return jsonify({'message': 'Evacuation plan updated successfully'}), 200
        return jsonify({'error': 'Evacuation plan not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/evacuation-plans/<plan_id>', methods=['DELETE'])
def delete_evacuation_plan(plan_id):
    try:
        result = evacuation_plans_collection.delete_one({'_id': ObjectId(plan_id)})
        if result.deleted_count:
            return jsonify({'message': 'Evacuation plan deleted successfully'}), 200
        return jsonify({'error': 'Evacuation plan not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ============= MESSAGES ENDPOINTS =============
@app.route('/api/messages', methods=['GET'])
def get_messages():
    try:
        messages = list(messages_collection.find().sort('timestamp', -1))
        return jsonify([serialize_doc(message) for message in messages]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/messages', methods=['POST'])
def create_message():
    try:
        data = request.json
        data['timestamp'] = datetime.utcnow().isoformat() + 'Z'
        result = messages_collection.insert_one(data)
        data['id'] = str(result.inserted_id)
        return jsonify(data), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ============= WEATHER ENDPOINTS =============
@app.route('/api/weather/<location>', methods=['GET'])
def get_weather(location):
    try:
        weather = weather_collection.find_one({'location': location})
        if weather:
            return jsonify(serialize_doc(weather)), 200
        return jsonify({'error': 'Weather data not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/weather', methods=['POST'])
def update_weather():
    try:
        data = request.json
        location = data.get('location')
        result = weather_collection.update_one(
            {'location': location},
            {'$set': data},
            upsert=True
        )
        return jsonify({'message': 'Weather data updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ============= ANALYTICS ENDPOINT =============
@app.route('/api/analytics', methods=['GET'])
def get_analytics():
    try:
        total_incidents = incidents_collection.count_documents({})
        resolved_incidents = incidents_collection.count_documents({'status': 'resolved'})
        active_incidents = incidents_collection.count_documents({'status': {'$ne': 'resolved'}})
        
        analytics = {
            'totalIncidents': total_incidents,
            'resolvedIncidents': resolved_incidents,
            'activeIncidents': active_incidents,
            'averageResponseTime': '18 minutes',
            'resourceUtilization': 78,
            'monthlyIncidents': [
                {'month': 'Jan', 'incidents': 12},
                {'month': 'Feb', 'incidents': 8},
                {'month': 'Mar', 'incidents': 15},
                {'month': 'Apr', 'incidents': 22},
                {'month': 'May', 'incidents': 18},
                {'month': 'Jun', 'incidents': 25}
            ],
            'incidentsByType': [
                {'type': 'Natural Disaster', 'count': 45},
                {'type': 'Fire', 'count': 32},
                {'type': 'Medical Emergency', 'count': 28},
                {'type': 'Accident', 'count': 25},
                {'type': 'Other', 'count': 26}
            ]
        }
        return jsonify(analytics), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ============= USERS ENDPOINTS =============
@app.route('/api/users', methods=['GET'])
def get_users():
    try:
        users = list(users_collection.find())
        return jsonify([serialize_doc(user) for user in users]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Health check endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok', 'message': 'Server is running'}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)