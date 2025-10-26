import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  MapPin, 
  Plus, 
  Search, 
  Filter,
  Users,
  Home,
  Route,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  Play,
  Square
} from 'lucide-react';
import { mockEvacuationPlans } from '../data/mockData';
import { EvacuationPlan, Shelter } from '../types';

export function EvacuationPlans() {
  const [plans, setPlans] = useState<EvacuationPlan[]>(mockEvacuationPlans);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPlan, setSelectedPlan] = useState<EvacuationPlan | null>(null);
  const [selectedShelter, setSelectedShelter] = useState<Shelter | null>(null);
  const [isNewPlanOpen, setIsNewPlanOpen] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: '',
    area: '',
    capacity: 0
  });

  const filteredPlans = plans.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.area.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || plan.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleCreatePlan = () => {
    const plan: EvacuationPlan = {
      id: `plan-${Date.now()}`,
      ...newPlan,
      shelters: [],
      routes: [],
      status: 'inactive',
      lastUpdated: new Date().toISOString()
    };
    
    setPlans([...plans, plan]);
    setNewPlan({
      name: '',
      area: '',
      capacity: 0
    });
    setIsNewPlanOpen(false);
  };

  const handleActivatePlan = (planId: string) => {
    setPlans(plans.map(plan => 
      plan.id === planId 
        ? { ...plan, status: 'active', lastUpdated: new Date().toISOString() }
        : plan
    ));
  };

  const handleDeactivatePlan = (planId: string) => {
    setPlans(plans.map(plan => 
      plan.id === planId 
        ? { ...plan, status: 'inactive', lastUpdated: new Date().toISOString() }
        : plan
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'under-review': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getShelterStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-700 border-green-200';
      case 'full': return 'bg-red-100 text-red-700 border-red-200';
      case 'maintenance': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getRouteStatusColor = (status: string) => {
    switch (status) {
      case 'clear': return 'bg-green-100 text-green-700 border-green-200';
      case 'blocked': return 'bg-red-100 text-red-700 border-red-200';
      case 'congested': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900">Evacuation Plans</h1>
          <p className="text-gray-600">Manage evacuation routes and shelter facilities</p>
        </div>
        <Dialog open={isNewPlanOpen} onOpenChange={setIsNewPlanOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Evacuation Plan</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-700 mb-1 block">Plan Name</label>
                <Input
                  value={newPlan.name}
                  onChange={(e) => setNewPlan({...newPlan, name: e.target.value})}
                  placeholder="Plan name"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-1 block">Coverage Area</label>
                <Input
                  value={newPlan.area}
                  onChange={(e) => setNewPlan({...newPlan, area: e.target.value})}
                  placeholder="Area covered by this plan"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-1 block">Total Capacity</label>
                <Input
                  type="number"
                  value={newPlan.capacity}
                  onChange={(e) => setNewPlan({...newPlan, capacity: parseInt(e.target.value) || 0})}
                  placeholder="0"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsNewPlanOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreatePlan}>
                  Create Plan
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Plans</p>
              <p className="text-2xl text-gray-900">{plans.length}</p>
            </div>
            <MapPin className="w-8 h-8 text-blue-500" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Plans</p>
              <p className="text-2xl text-gray-900">
                {plans.filter(p => p.status === 'active').length}
              </p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Shelters</p>
              <p className="text-2xl text-gray-900">
                {plans.reduce((acc, plan) => acc + plan.shelters.length, 0)}
              </p>
            </div>
            <Home className="w-8 h-8 text-purple-500" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Capacity</p>
              <p className="text-2xl text-gray-900">
                {plans.reduce((acc, plan) => acc + plan.capacity, 0).toLocaleString()}
              </p>
            </div>
            <Users className="w-8 h-8 text-orange-500" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search evacuation plans..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select 
              className="px-3 py-2 border border-gray-300 rounded-md"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="under-review">Under Review</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Plans List */}
      <div className="space-y-6">
        {filteredPlans.map((plan) => (
          <Card key={plan.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg text-gray-900">{plan.name}</h3>
                  <Badge className={getStatusColor(plan.status)}>
                    {plan.status.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-gray-600 mb-3">Coverage Area: {plan.area}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Total Capacity:</span>
                    <span className="text-gray-900 ml-1">{plan.capacity.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Shelters:</span>
                    <span className="text-gray-900 ml-1">{plan.shelters.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Routes:</span>
                    <span className="text-gray-900 ml-1">{plan.routes.length}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedPlan(plan)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                {plan.status === 'inactive' ? (
                  <Button 
                    size="sm"
                    onClick={() => handleActivatePlan(plan.id)}
                  >
                    <Play className="w-4 h-4 mr-1" />
                    Activate
                  </Button>
                ) : (
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeactivatePlan(plan.id)}
                  >
                    <Square className="w-4 h-4 mr-1" />
                    Deactivate
                  </Button>
                )}
              </div>
            </div>

            {/* Shelters and Routes Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {/* Shelters */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                  <Home className="w-4 h-4 mr-2" />
                  Shelters ({plan.shelters.length})
                </h4>
                <div className="space-y-2">
                  {plan.shelters.slice(0, 3).map((shelter) => (
                    <div 
                      key={shelter.id} 
                      className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                      onClick={() => setSelectedShelter(shelter)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-900">{shelter.name}</span>
                        <Badge className={getShelterStatusColor(shelter.status)} size="sm">
                          {shelter.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>{shelter.location}</span>
                        <span>{shelter.currentOccupancy}/{shelter.capacity}</span>
                      </div>
                      <Progress 
                        value={(shelter.currentOccupancy / shelter.capacity) * 100} 
                        className="h-1 mt-1" 
                      />
                    </div>
                  ))}
                  {plan.shelters.length > 3 && (
                    <Button variant="link" size="sm" className="p-0 h-auto">
                      View all {plan.shelters.length} shelters
                    </Button>
                  )}
                </div>
              </div>

              {/* Routes */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                  <Route className="w-4 h-4 mr-2" />
                  Evacuation Routes ({plan.routes.length})
                </h4>
                <div className="space-y-2">
                  {plan.routes.slice(0, 3).map((route) => (
                    <div key={route.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-900">{route.name}</span>
                        <Badge className={getRouteStatusColor(route.status)} size="sm">
                          {route.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600">
                        <div>{route.from} → {route.to}</div>
                        <div className="flex justify-between mt-1">
                          <span>{route.distance}</span>
                          <span>{route.estimatedTime}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {plan.routes.length > 3 && (
                    <Button variant="link" size="sm" className="p-0 h-auto">
                      View all {plan.routes.length} routes
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
              Last Updated: {new Date(plan.lastUpdated).toLocaleString()}
            </div>
          </Card>
        ))}
      </div>

      {/* Plan Details Dialog */}
      {selectedPlan && (
        <Dialog open={!!selectedPlan} onOpenChange={() => setSelectedPlan(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedPlan.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Coverage Area</label>
                  <p className="text-gray-900 mt-1">{selectedPlan.area}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Status</label>
                  <Badge className={`${getStatusColor(selectedPlan.status)} block w-fit mt-1`}>
                    {selectedPlan.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg text-gray-900 mb-4">Shelters</h4>
                  <div className="space-y-3">
                    {selectedPlan.shelters.map((shelter) => (
                      <Card key={shelter.id} className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-gray-900">{shelter.name}</h5>
                          <Badge className={getShelterStatusColor(shelter.status)}>
                            {shelter.status.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{shelter.location}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span>Capacity: {shelter.currentOccupancy}/{shelter.capacity}</span>
                          <span>Contact: {shelter.contact}</span>
                        </div>
                        <div className="mt-2">
                          <Progress value={(shelter.currentOccupancy / shelter.capacity) * 100} className="h-2" />
                        </div>
                        <div className="mt-2 text-xs text-gray-600">
                          Facilities: {shelter.facilities.join(', ')}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg text-gray-900 mb-4">Evacuation Routes</h4>
                  <div className="space-y-3">
                    {selectedPlan.routes.map((route) => (
                      <Card key={route.id} className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-gray-900">{route.name}</h5>
                          <Badge className={getRouteStatusColor(route.status)}>
                            {route.status.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>From: {route.from}</div>
                          <div>To: {route.to}</div>
                          <div className="flex justify-between">
                            <span>Distance: {route.distance}</span>
                            <span>Time: {route.estimatedTime}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedPlan(null)}>
                  Close
                </Button>
                <Button>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Plan
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Shelter Details Dialog */}
      {selectedShelter && (
        <Dialog open={!!selectedShelter} onOpenChange={() => setSelectedShelter(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedShelter.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Status</label>
                <Badge className={`${getShelterStatusColor(selectedShelter.status)} block w-fit mt-1`}>
                  {selectedShelter.status.toUpperCase()}
                </Badge>
              </div>
              <div>
                <label className="text-sm text-gray-600">Location</label>
                <p className="text-gray-900 mt-1">{selectedShelter.location}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Capacity</label>
                  <p className="text-gray-900 mt-1">{selectedShelter.capacity}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Current Occupancy</label>
                  <p className="text-gray-900 mt-1">{selectedShelter.currentOccupancy}</p>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Occupancy Rate</label>
                <Progress 
                  value={(selectedShelter.currentOccupancy / selectedShelter.capacity) * 100} 
                  className="h-3 mt-1" 
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Contact</label>
                <p className="text-gray-900 mt-1">{selectedShelter.contact}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Available Facilities</label>
                <div className="mt-1 flex flex-wrap gap-1">
                  {selectedShelter.facilities.map((facility, index) => (
                    <Badge key={index} variant="secondary">{facility}</Badge>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedShelter(null)}>
                  Close
                </Button>
                <Button>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Shelter
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {filteredPlans.length === 0 && (
        <Card className="p-12 text-center">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg text-gray-900 mb-2">No evacuation plans found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or create a new plan.</p>
        </Card>
      )}
    </div>
  );
}