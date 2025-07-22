
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
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="categorization">Disruption Category</Label>
                  <Select value={newFlight.categorization} onValueChange={(value) => setNewFlight(prev => ({ ...prev, categorization: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Aircraft issue (e.g., AOG)">Aircraft Issue</SelectItem>
                      <SelectItem value="Crew issue (e.g., sick report, duty time breach)">Crew Issue</SelectItem>
                      <SelectItem value="ATC/weather delay">ATC/Weather</SelectItem>
                      <SelectItem value="Airport curfew/ramp congestion">Airport/Curfew</SelectItem>
                      <SelectItem value="Rotation misalignment or maintenance hold">Rotation/Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="disruptionReason">Disruption Reason</Label>
                  <Textarea
                    id="disruptionReason"
                    value={newFlight.disruptionReason}
                    onChange={(e) => setNewFlight(prev => ({ ...prev, disruptionReason: e.target.value }))}
                    placeholder="Describe the specific reason for the disruption..."
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleAddFlight}>
                  <Save className="h-4 w-4 mr-2" />
                  Add Flight
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div>
              <Label htmlFor="search">Search Flights</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="search"
                  placeholder="Flight number..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Delayed">Delayed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                  <SelectItem value="On Time">On Time</SelectItem>
                  <SelectItem value="Boarding">Boarding</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select value={filters.priority} onValueChange={(value) => setFilters(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="origin">Origin</Label>
              <Select value={filters.origin} onValueChange={(value) => setFilters(prev => ({ ...prev, origin: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Origins</SelectItem>
                  <SelectItem value="DXB">DXB</SelectItem>
                  <SelectItem value="AUH">AUH</SelectItem>
                  <SelectItem value="SHJ">SHJ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="categorization">Category</Label>
              <Select value={filters.categorization} onValueChange={(value) => setFilters(prev => ({ ...prev, categorization: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Aircraft issue (e.g., AOG)">Aircraft Issue</SelectItem>
                  <SelectItem value="Crew issue (e.g., sick report, duty time breach)">Crew Issue</SelectItem>
                  <SelectItem value="ATC/weather delay">ATC/Weather</SelectItem>
                  <SelectItem value="Airport curfew/ramp congestion">Airport/Curfew</SelectItem>
                  <SelectItem value="Rotation misalignment or maintenance hold">Rotation/Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setFilters({
                  status: 'all',
                  priority: 'all',
                  origin: 'all',
                  categorization: 'all',
                  search: ''
                })}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Flights Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Affected Flights ({filteredFlights.length})</span>
            <div className="text-sm font-normal text-gray-600">
              Select a flight to generate recovery options
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Select</TableHead>
                  <TableHead>Flight</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Delay</TableHead>
                  <TableHead>Aircraft</TableHead>
                  <TableHead>PAX</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFlights.map((flight) => (
                  <TableRow 
                    key={flight.id}
                    className={selectedFlight?.id === flight.id ? "bg-blue-50" : ""}
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedFlight?.id === flight.id}
                        onCheckedChange={() => handleFlightSelect(flight)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Plane className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">{flight.flightNumber}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{flight.origin}</span>
                        <ArrowRight className="h-3 w-3 text-gray-400" />
                        <span>{flight.destination}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(flight.currentStatus)}>
                        {flight.currentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {flight.delay > 0 && <Timer className="h-3 w-3 text-orange-500" />}
                        <span className={flight.delay > 0 ? "text-orange-600 font-medium" : "text-gray-500"}>
                          {flight.delay > 0 ? `+${flight.delay}m` : 'On time'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{flight.aircraft}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-gray-500" />
                        <span>{flight.passengers}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs bg-gray-100 px-2 py-1 rounded max-w-32 truncate" title={flight.categorization}>
                        {flight.categorization}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getSeverityColor(flight.severity)}>
                        {flight.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleFlightSelect(flight)}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Selected Flight Details */}
      {selectedFlight && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plane className="h-5 w-5 text-blue-600" />
              Selected Flight: {selectedFlight.flightNumber}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="details" className="w-full">
              <TabsList>
                <TabsTrigger value="details">Flight Details</TabsTrigger>
                <TabsTrigger value="disruption">Disruption Info</TabsTrigger>
                <TabsTrigger value="impact">Impact Analysis</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Flight Information</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Flight:</span>
                        <span className="font-medium">{selectedFlight.flightNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Route:</span>
                        <span className="font-medium">{selectedFlight.origin} → {selectedFlight.destination}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Aircraft:</span>
                        <span className="font-medium">{selectedFlight.aircraft}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gate:</span>
                        <span className="font-medium">{selectedFlight.gate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Schedule</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Departure:</span>
                        <span className="font-medium">{new Date(selectedFlight.scheduledDeparture).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Arrival:</span>
                        <span className="font-medium">{new Date(selectedFlight.scheduledArrival).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <Badge className={getStatusColor(selectedFlight.currentStatus)}>
                          {selectedFlight.currentStatus}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Delay:</span>
                        <span className={selectedFlight.delay > 0 ? "text-orange-600 font-medium" : "text-green-600"}>
                          {selectedFlight.delay > 0 ? `+${selectedFlight.delay} mins` : 'On time'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Capacity</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Passengers:</span>
                        <span className="font-medium">{selectedFlight.passengers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Crew:</span>
                        <span className="font-medium">{selectedFlight.crew}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Connections:</span>
                        <span className="font-medium">{selectedFlight.connectionFlights}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">VIP Passengers:</span>
                        <span className="font-medium">{selectedFlight.vipPassengers}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="disruption" className="space-y-4">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-orange-900 mb-2">Disruption Details</h4>
                      <p className="text-orange-800 mb-3">{selectedFlight.disruptionReason}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-orange-700">Category:</span>
                          <div className="font-medium">{selectedFlight.categorization}</div>
                        </div>
                        <div>
                          <span className="text-orange-700">Type:</span>
                          <div className="font-medium capitalize">{selectedFlight.disruptionType}</div>
                        </div>
                        <div>
                          <span className="text-orange-700">Severity:</span>
                          <Badge className={getSeverityColor(selectedFlight.severity)}>
                            {selectedFlight.severity}
                          </Badge>
                        </div>
                        <div>
                          <span className="text-orange-700">Priority:</span>
                          <Badge variant="outline">{selectedFlight.priority}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="impact" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Operational Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Impact Description:</span>
                        </div>
                        <p className="text-sm bg-gray-50 p-3 rounded">{selectedFlight.impact}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Last Updated:</span>
                          <span className="font-medium">{selectedFlight.lastUpdate}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Next Steps</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Button className="w-full">
                          <Zap className="h-4 w-4 mr-2" />
                          Generate Recovery Options
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Users className="h-4 w-4 mr-2" />
                          Passenger Management
                        </Button>
                        <Button variant="outline" className="w-full">
                          <CalendarDays className="h-4 w-4 mr-2" />
                          Reschedule Flight
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
