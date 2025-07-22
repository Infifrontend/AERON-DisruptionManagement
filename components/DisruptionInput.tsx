
'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Alert, AlertDescription } from './ui/alert'
import { Checkbox } from './ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { 
  AlertTriangle, 
  Plane, 
  Users, 
  Clock, 
  MapPin, 
  Filter, 
  Search,
  ArrowRight,
  RefreshCw,
  Eye,
  Zap,
  TrendingUp,
  CalendarDays,
  Timer,
  Plus,
  Save,
  X
} from 'lucide-react'

// Mock flight data affected by disruptions
const affectedFlights = [
  {
    id: 'FL_001',
    flightNumber: 'FZ123',
    origin: 'DXB',
    destination: 'BOM',
    originCity: 'Dubai',
    destinationCity: 'Mumbai',
    scheduledDeparture: '2025-01-10T14:30:00',
    scheduledArrival: '2025-01-10T19:45:00',
    currentStatus: 'Delayed',
    delay: 120,
    aircraft: 'B737-800',
    gate: 'T2-A15',
    passengers: 189,
    crew: 6,
    disruptionType: 'technical',
    categorization: 'Aircraft issue (e.g., AOG)',
    disruptionReason: 'Engine maintenance check required',
    severity: 'high',
    impact: 'Flight departure delayed',
    lastUpdate: '5 mins ago',
    priority: 'High',
    connectionFlights: 8,
    vipPassengers: 2
  },
  {
    id: 'FL_002',
    flightNumber: 'FZ456',
    origin: 'DXB',
    destination: 'DEL',
    originCity: 'Dubai',
    destinationCity: 'Delhi',
    scheduledDeparture: '2025-01-10T08:15:00',
    scheduledArrival: '2025-01-10T12:30:00',
    currentStatus: 'Boarding',
    delay: 45,
    aircraft: 'B737 MAX 8',
    gate: 'T2-B08',
    passengers: 172,
    crew: 6,
    disruptionType: 'weather',
    categorization: 'ATC/weather delay',
    disruptionReason: 'Dense fog at destination airport',
    severity: 'medium',
    impact: 'ATC delays due to weather',
    lastUpdate: '2 mins ago',
    priority: 'Medium',
    connectionFlights: 5,
    vipPassengers: 1
  },
  {
    id: 'FL_003',
    flightNumber: 'FZ789',
    origin: 'DXB',
    destination: 'CCJ',
    originCity: 'Dubai',
    destinationCity: 'Calicut',
    scheduledDeparture: '2025-01-10T16:20:00',
    scheduledArrival: '2025-01-10T21:15:00',
    currentStatus: 'Cancelled',
    delay: 0,
    aircraft: 'B737-800',
    gate: 'T2-C05',
    passengers: 180,
    crew: 6,
    disruptionType: 'curfew',
    categorization: 'Airport curfew/ramp congestion',
    disruptionReason: 'Airport curfew restrictions',
    severity: 'high',
    impact: 'Flight cancelled due to curfew',
    lastUpdate: '1 hour ago',
    priority: 'High',
    connectionFlights: 12,
    vipPassengers: 4
  },
  {
    id: 'FL_004',
    flightNumber: 'FZ321',
    origin: 'DXB',
    destination: 'AMD',
    originCity: 'Dubai',
    destinationCity: 'Ahmedabad',
    scheduledDeparture: '2025-01-10T11:40:00',
    scheduledArrival: '2025-01-10T15:55:00',
    currentStatus: 'On Time',
    delay: 0,
    aircraft: 'B737 MAX 8',
    gate: 'T2-A18',
    passengers: 165,
    crew: 6,
    disruptionType: 'maintenance',
    categorization: 'Rotation misalignment or maintenance hold',
    disruptionReason: 'Preventive maintenance completed',
    severity: 'low',
    impact: 'No operational impact',
    lastUpdate: '10 mins ago',
    priority: 'Low',
    connectionFlights: 2,
    vipPassengers: 0
  },
  {
    id: 'FL_005',
    flightNumber: 'FZ654',
    origin: 'DXB',
    destination: 'COK',
    originCity: 'Dubai',
    destinationCity: 'Kochi',
    scheduledDeparture: '2025-01-10T13:55:00',
    scheduledArrival: '2025-01-10T19:10:00',
    currentStatus: 'Delayed',
    delay: 90,
    aircraft: 'B737-800',
    gate: 'T2-B12',
    passengers: 175,
    crew: 6,
    disruptionType: 'crew',
    categorization: 'Crew issue (e.g., sick report, duty time breach)',
    disruptionReason: 'Crew duty time breach',
    severity: 'medium',
    impact: 'Crew duty time limitation',
    lastUpdate: '15 mins ago',
    priority: 'Medium',
    connectionFlights: 3,
    vipPassengers: 1
  },
  {
    id: 'FL_006',
    flightNumber: 'FZ329',
    origin: 'DXB',
    destination: 'KHI',
    originCity: 'Dubai',
    destinationCity: 'Karachi',
    scheduledDeparture: '2025-01-10T09:15:00',
    scheduledArrival: '2025-01-10T11:30:00',
    currentStatus: 'Delayed',
    delay: 240,
    aircraft: 'B737 MAX 8',
    gate: 'T2-A22',
    passengers: 168,
    crew: 6,
    disruptionType: 'rotation',
    categorization: 'Rotation misalignment or maintenance hold',
    disruptionReason: 'Aircraft late from previous sector',
    severity: 'high',
    impact: 'Aircraft rotation schedule disrupted',
    lastUpdate: '3 mins ago',
    priority: 'High',
    connectionFlights: 6,
    vipPassengers: 3
  }
]

interface DisruptionInputProps {
  disruption?: any
  onSelectFlight?: (flight: any) => void
}

export function DisruptionInput({ disruption, onSelectFlight }: DisruptionInputProps) {
  const [selectedFlight, setSelectedFlight] = useState(null)
  const [flights, setFlights] = useState(affectedFlights)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    origin: 'all',
    categorization: 'all',
    search: ''
  })

  const [newFlight, setNewFlight] = useState({
    flightNumber: '',
    origin: '',
    destination: '',
    scheduledDeparture: '',
    scheduledArrival: '',
    aircraft: '',
    passengers: '',
    disruptionType: '',
    categorization: '',
    disruptionReason: '',
    severity: 'medium',
    priority: 'Medium'
  })

  // Filter flights based on current filters
  const filteredFlights = flights.filter(flight => {
    if (filters.status !== 'all' && flight.currentStatus !== filters.status) return false
    if (filters.priority !== 'all' && flight.priority !== filters.priority) return false
    if (filters.origin !== 'all' && flight.origin !== filters.origin) return false
    if (filters.categorization !== 'all' && flight.categorization !== filters.categorization) return false
    if (filters.search && !flight.flightNumber.toLowerCase().includes(filters.search.toLowerCase())) return false
    return true
  })

  const handleFlightSelect = (flight) => {
    setSelectedFlight(flight)
    if (onSelectFlight) {
      onSelectFlight(flight)
    }
  }

  const handleAddFlight = () => {
    if (newFlight.flightNumber && newFlight.origin && newFlight.destination) {
      const flight = {
        ...newFlight,
        id: `FL_${Date.now()}`,
        originCity: newFlight.origin,
        destinationCity: newFlight.destination,
        currentStatus: 'Delayed',
        delay: 0,
        gate: 'TBD',
        crew: 6,
        impact: 'Manual entry - requires assessment',
        lastUpdate: 'Just now',
        connectionFlights: 0,
        vipPassengers: 0,
        passengers: parseInt(newFlight.passengers) || 0
      }
      
      setFlights(prev => [...prev, flight])
      setNewFlight({
        flightNumber: '',
        origin: '',
        destination: '',
        scheduledDeparture: '',
        scheduledArrival: '',
        aircraft: '',
        passengers: '',
        disruptionType: '',
        categorization: '',
        disruptionReason: '',
        severity: 'medium',
        priority: 'Medium'
      })
      setIsAddDialogOpen(false)
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delayed': return 'bg-orange-100 text-orange-800'
      case 'Cancelled': return 'bg-red-100 text-red-800'
      case 'On Time': return 'bg-green-100 text-green-800'
      case 'Boarding': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Flight Disruption Input</h2>
          <p className="text-gray-600">Select affected flights and input disruption details</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Flight
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Affected Flight</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div>
                  <Label htmlFor="flightNumber">Flight Number</Label>
                  <Input
                    id="flightNumber"
                    value={newFlight.flightNumber}
                    onChange={(e) => setNewFlight(prev => ({ ...prev, flightNumber: e.target.value }))}
                    placeholder="FZ123"
                  />
                </div>
                <div>
                  <Label htmlFor="aircraft">Aircraft</Label>
                  <Input
                    id="aircraft"
                    value={newFlight.aircraft}
                    onChange={(e) => setNewFlight(prev => ({ ...prev, aircraft: e.target.value }))}
                    placeholder="B737-800"
                  />
                </div>
                <div>
                  <Label htmlFor="origin">Origin</Label>
                  <Input
                    id="origin"
                    value={newFlight.origin}
                    onChange={(e) => setNewFlight(prev => ({ ...prev, origin: e.target.value }))}
                    placeholder="DXB"
                  />
                </div>
                <div>
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    value={newFlight.destination}
                    onChange={(e) => setNewFlight(prev => ({ ...prev, destination: e.target.value }))}
                    placeholder="BOM"
                  />
                </div>
                <div>
                  <Label htmlFor="scheduledDeparture">Scheduled Departure</Label>
                  <Input
                    id="scheduledDeparture"
                    type="datetime-local"
                    value={newFlight.scheduledDeparture}
                    onChange={(e) => setNewFlight(prev => ({ ...prev, scheduledDeparture: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="scheduledArrival">Scheduled Arrival</Label>
                  <Input
                    id="scheduledArrival"
                    type="datetime-local"
                    value={newFlight.scheduledArrival}
                    onChange={(e) => setNewFlight(prev => ({ ...prev, scheduledArrival: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="passengers">Passengers</Label>
                  <Input
                    id="passengers"
                    type="number"
                    value={newFlight.passengers}
                    onChange={(e) => setNewFlight(prev => ({ ...prev, passengers: e.target.value }))}
                    placeholder="189"
                  />
                </div>
                <div>
                  <Label htmlFor="severity">Severity</Label>
                  <Select value={newFlight.severity} onValueChange={(value) => setNewFlight(prev => ({ ...prev, severity: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
