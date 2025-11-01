import { Alert, Resource, Incident, Team, EvacuationPlan, WeatherData, Message, User } from '../types';

// API Service for Backend Communication
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Generic API call function
async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Network error' }));
        throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as T;
}

// ============= ALERTS API =============
export const alertsAPI = {
    getAll: () => apiCall<Alert[]>('/alerts'),
    getById: (id: string) => apiCall<Alert>(`/alerts/${id}`),
    create: (data: Omit<Alert, 'id'>) => apiCall<Alert>('/alerts', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    update: (id: string, data: Alert) => apiCall<Alert>(`/alerts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    delete: (id: string) => apiCall<void>(`/alerts/${id}`, {
        method: 'DELETE',
    }),
};

// ============= RESOURCES API =============
export const resourcesAPI = {
    getAll: () => apiCall<Resource[]>('/resources'),
    create: (data: Omit<Resource, 'id'>) => apiCall<Resource>('/resources', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    update: (id: string, data: Resource) => apiCall<Resource>(`/resources/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    delete: (id: string) => apiCall<void>(`/resources/${id}`, {
        method: 'DELETE',
    }),
};

// ============= INCIDENTS API =============
export const incidentsAPI = {
    getAll: () => apiCall<Incident[]>('/incidents'),
    create: (data: Omit<Incident, 'id'>) => apiCall<Incident>('/incidents', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    update: (id: string, data: Incident) => apiCall<Incident>(`/incidents/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    delete: (id: string) => apiCall<void>(`/incidents/${id}`, {
        method: 'DELETE',
    }),
};

// ============= TEAMS API =============
export const teamsAPI = {
    getAll: () => apiCall<Team[]>('/teams'),
    create: (data: Omit<Team, 'id'>) => apiCall<Team>('/teams', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    update: (id: string, data: Team) => apiCall<Team>(`/teams/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    delete: (id: string) => apiCall<void>(`/teams/${id}`, {
        method: 'DELETE',
    }),
};

// ============= EVACUATION PLANS API =============
export const evacuationPlansAPI = {
    getAll: () => apiCall<EvacuationPlan[]>('/evacuation-plans'),
    create: (data: Omit<EvacuationPlan, 'id'>) => apiCall<EvacuationPlan>('/evacuation-plans', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    update: (id: string, data: EvacuationPlan) => apiCall<EvacuationPlan>(`/evacuation-plans/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    delete: (id: string) => apiCall<void>(`/evacuation-plans/${id}`, {
        method: 'DELETE',
    }),
};

// ============= MESSAGES API =============
export const messagesAPI = {
    getAll: () => apiCall<Message[]>('/messages'),
    create: (data: Omit<Message, 'id'>) => apiCall<Message>('/messages', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
};

// ============= WEATHER API =============
export const weatherAPI = {
    getByLocation: (location: string) => apiCall<WeatherData>(`/weather/${location}`),
    update: (data: WeatherData) => apiCall<WeatherData>('/weather', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
};

// ============= ANALYTICS API =============
export const analyticsAPI = {
    getAll: () => apiCall<any>('/analytics'),
};

// ============= USERS API =============
export const usersAPI = {
    getAll: () => apiCall<User[]>('/users'),
};

export default {
    alerts: alertsAPI,
    resources: resourcesAPI,
    incidents: incidentsAPI,
    teams: teamsAPI,
    evacuationPlans: evacuationPlansAPI,
    messages: messagesAPI,
    weather: weatherAPI,
    analytics: analyticsAPI,
    users: usersAPI,
};
