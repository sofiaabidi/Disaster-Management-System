import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import {
  RefreshCw,
  Eye,
  Plus,
  Search,
  Filter,
  Play,
  Square,
  AlertTriangle,
  Home,
  Route
} from 'lucide-react';
import api from '../services/api';
import { EvacuationPlan } from '../types';

export function EvacuationPlans() {
  const [plans, setPlans] = useState<EvacuationPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isNewPlanOpen, setIsNewPlanOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<EvacuationPlan | null>(null);
  const [newPlan, setNewPlan] = useState<{ name: string; area: string; capacity: number }>({
    name: '',
    area: '',
    capacity: 0,
  });

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      setLoading(true);
      const data = await api.evacuationPlans.getAll();
      setPlans(data);
    } catch (err) {
      console.error('Failed to load plans:', err);
      alert('Error loading evacuation plans.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlan = async () => {
    try {
      const planData: EvacuationPlan = {
        id: `plan-${Date.now()}`,
        name: newPlan.name,
        area: newPlan.area,
        capacity: newPlan.capacity,
        shelters: [],
        routes: [],
        status: 'inactive',
        lastUpdated: new Date().toISOString(),
      };
      await api.evacuationPlans.create(planData);
      await loadPlans();
      setNewPlan({ name: '', area: '', capacity: 0 });
      setIsNewPlanOpen(false);
    } catch (err) {
      console.error('Create failed:', err);
      alert('Failed to create plan.');
    }
  };

  const handleUpdateStatus = async (planId: string, status: EvacuationPlan['status']) => {
    try {
      const plan = plans.find((p) => p.id === planId);
      if (!plan) return;
      await api.evacuationPlans.update(planId, {
        ...plan,
        status,
        lastUpdated: new Date().toISOString(),
      });
      await loadPlans();
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update status.');
    }
  };

  const handleDeletePlan = async (planId: string) => {
    if (!confirm('Delete this plan?')) return;
    try {
      await api.evacuationPlans.delete(planId);
      await loadPlans();
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete plan.');
    }
  };

  const filteredPlans = plans.filter((plan) => {
    const search =
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.area.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = filterStatus === 'all' || plan.status === filterStatus;
    return search && statusMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'under-review':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-700">
        <RefreshCw className="w-10 h-10 animate-spin mr-2" />
        Loading evacuation plans...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Evacuation Plans</h1>
          <p className="text-gray-600">Manage evacuation routes and shelters</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={loadPlans}>
            <RefreshCw className="w-4 h-4 mr-2" /> Refresh
          </Button>
          <Dialog open={isNewPlanOpen} onOpenChange={setIsNewPlanOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" /> Create Plan
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>New Evacuation Plan</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Plan Name"
                  value={newPlan.name}
                  onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                />
                <Input
                  placeholder="Coverage Area"
                  value={newPlan.area}
                  onChange={(e) => setNewPlan({ ...newPlan, area: e.target.value })}
                />
                <Input
                  type="number"
                  placeholder="Capacity"
                  value={newPlan.capacity}
                  onChange={(e) =>
                    setNewPlan({ ...newPlan, capacity: parseInt(e.target.value) || 0 })
                  }
                />
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsNewPlanOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreatePlan} disabled={!newPlan.name || !newPlan.area}>
                    Create
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search plans..."
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
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="under-review">Under Review</option>
          </select>
        </div>
      </Card>

      {/* Plans List */}
      {filteredPlans.length === 0 ? (
        <Card className="p-12 text-center">
          <AlertTriangle className="w-10 h-10 mx-auto text-gray-400 mb-2" />
          <p>No evacuation plans found.</p>
        </Card>
      ) : (
        <div className="space-y-6">
          {filteredPlans.map((plan) => (
            <Card key={plan.id} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                    <Badge className={getStatusColor(plan.status)}>{plan.status}</Badge>
                  </div>
                  <p className="text-gray-600">Area: {plan.area}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {/* 👁️ View Details Popup */}
                  <Dialog
                    open={selectedPlan?.id === plan.id}
                    onOpenChange={(open: boolean) => {
                      if (!open) setSelectedPlan(null);
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedPlan(plan)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{plan.name} — Details</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <p><strong>Coverage Area:</strong> {plan.area}</p>
                          <p><strong>Status:</strong> {plan.status}</p>
                          <p><strong>Capacity:</strong> {plan.capacity}</p>
                          <p><strong>Last Updated:</strong> {new Date(plan.lastUpdated).toLocaleString()}</p>
                        </div>

                        {/* Shelters Section */}
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center">
                            <Home className="w-4 h-4 mr-2" /> Shelters
                          </h4>
                          {plan.shelters && plan.shelters.length > 0 ? (
                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                              {plan.shelters.map((shelter, i) => (
                                <li key={i}>
                                  {shelter.name} — {shelter.status} ({shelter.capacity} people)
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-500 text-sm">No shelters defined.</p>
                          )}
                        </div>

                        {/* Routes Section */}
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center">
                            <Route className="w-4 h-4 mr-2" /> Routes
                          </h4>
                          {plan.routes && plan.routes.length > 0 ? (
                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                              {plan.routes.map((route, i) => (
                                <li key={i}>{route.name} — {route.status}</li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-500 text-sm">No routes defined.</p>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleUpdateStatus(plan.id, plan.status === 'inactive' ? 'active' : 'inactive')
                    }
                  >
                    {plan.status === 'inactive' ? (
                      <>
                        <Play className="w-4 h-4 mr-1" /> Activate
                      </>
                    ) : (
                      <>
                        <Square className="w-4 h-4 mr-1" /> Deactivate
                      </>
                    )}
                  </Button>

                  <Button variant="outline" size="sm" onClick={() => handleDeletePlan(plan.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
