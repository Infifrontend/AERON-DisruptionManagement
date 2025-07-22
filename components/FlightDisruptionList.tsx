
'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Alert, AlertDescription } from './ui/alert'
import { Progress } from './ui/progress'
import { Separator } from './ui/separator'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  AlertTriangle, 
  Plane, 
  Users, 
  Clock, 
  MapPin, 
  DollarSign,
  Filter,
  Search,
  Eye,
  Settings,
  CheckCircle,
  XCircle,
  Timer,
  Fuel,
  CloudRain,
  Wrench,
  Activity,
  TrendingUp,
  TrendingDown,
  Phone,
  Mail,
  Calendar,
  FileText,
  Shield,
  Target,
  Zap,
  BarChart3,
  Send,
  RefreshCw,
  ArrowRight,
  Info,
  Star,
  ThumbsUp
} from 'lucide-react'

export function FlightDisruptionList() {
  const [selectedDisruption, setSelectedDisruption] = useState(null)
  const [filters, setFilters] = useState({
    severity: 'all',
    type: 'all',
    status: 'all',
    airport: 'all',
    search: ''
  })

  // Enhanced mock data with comprehensive disruption information
  const disruptions = [
    {
      id: 'DISR-2025-001',
      flightNumber: 'EK123',
      route: 'JFK → DXB',
      aircraft: 'A321-001',
      aircraftType: 'Airbus A321-200',
      scheduledDeparture: '2025-06-06 14:30',
      estimatedDeparture: '2025-06-06 16:45',
      delay: 135,
      passengers: 158,
      crew: 8,
      gate: 'B12',
      terminal: '4',
      severity: 'High',
      type: 'Technical',
      status: 'Active',
      confidence: 94.2,
      disruptionReason: 'Engine warning light - hydraulic system check required',
      detailedDescription: 'Aircraft A321-001 experiencing intermittent hydraulic pressure warning during pre-flight checks. Maintenance team investigating. Passenger boarding suspended pending technical resolution.',
      impact: {
        passengers: 158,
        connectingFlights: 12,
        estimatedCost: 45200,
        revenueAtRisk: 125000,
        compensationRequired: 28000
      },
      weather: {
        condition: 'Clear',
        visibility: '10+ miles',
        wind: '8 knots NE',
        temperature: '72°F'
      }
    },
    {
      id: 'DISR-2025-002',
      flightNumber: 'FZ456',
      route: 'DXB → LHR',
      aircraft: 'B777-300',
      aircraftType: 'Boeing 777-300ER',
      scheduledDeparture: '2025-06-06 08:15',
      estimatedDeparture: '2025-06-06 11:30',
      delay: 195,
      passengers: 396,
      crew: 14,
      gate: 'A23',
      terminal: '3',
      severity: 'Critical',
      type: 'Weather',
      status: 'Active',
      confidence: 98.7,
      disruptionReason: 'Severe thunderstorms at destination - holding pattern required',
      detailedDescription: 'Multiple aircraft in holding pattern due to severe weather conditions at LHR. Air traffic control implementing extended delays.',
      impact: {
        passengers: 396,
        connectingFlights: 28,
        estimatedCost: 89500,
        revenueAtRisk: 245000,
        compensationRequired: 67000
      },
      weather: {
        condition: 'Thunderstorms',
        visibility: '2 miles',
        wind: '25 knots gusting 40',
        temperature: '58°F'
      }
    }
  ]

  const filteredDisruptions = disruptions.filter(disruption => {
    if (filters.severity !== 'all' && disruption.severity !== filters.severity) return false
    if (filters.type !== 'all' && disruption.type !== filters.type) return false
    if (filters.status !== 'all' && disruption.status !== filters.status) return false
    if (filters.search && !disruption.flightNumber.toLowerCase().includes(filters.search.toLowerCase())) return false
    return true
  })

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-red-100 text-red-800'
      case 'monitoring': return 'bg-yellow-100 text-yellow-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Flight Disruption Monitor</h2>
          <p className="text-gray-600">Real-time tracking of flight disruptions and operational impacts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
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
              <Label htmlFor="severity">Severity</Label>
              <Select value={filters.severity} onValueChange={(value) => setFilters(prev => ({ ...prev, severity: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="type">Type</Label>
              <Select value={filters.type} onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Technical">Technical</SelectItem>
                  <SelectItem value="Weather">Weather</SelectItem>
                  <SelectItem value="Crew">Crew</SelectItem>
                  <SelectItem value="ATC">ATC</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Monitoring">Monitoring</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button variant="outline" className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disruptions List */}
      <div className="grid gap-4">
        {filteredDisruptions.map((disruption) => (
          <Card key={disruption.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <Plane className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold text-lg">{disruption.flightNumber}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{disruption.route}</span>
                    <Badge className={getSeverityColor(disruption.severity)}>
                      {disruption.severity}
                    </Badge>
                    <Badge className={getStatusColor(disruption.status)}>
                      {disruption.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">Scheduled</div>
                        <div className="font-medium">{disruption.scheduledDeparture}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Timer className="h-4 w-4 text-orange-500" />
                      <div>
                        <div className="text-sm text-gray-500">Estimated</div>
                        <div className="font-medium text-orange-600">{disruption.estimatedDeparture}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">Passengers</div>
                        <div className="font-medium">{disruption.passengers}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">Gate</div>
                        <div className="font-medium">{disruption.gate}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-900">{disruption.disruptionReason}</div>
                        <div className="text-sm text-gray-600 mt-1">{disruption.detailedDescription}</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-900">Impact</span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div>Passengers: {disruption.impact.passengers}</div>
                        <div>Connections: {disruption.impact.connectingFlights}</div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-900">Financial</span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div>Est. Cost: ${disruption.impact.estimatedCost.toLocaleString()}</div>
                        <div>Revenue Risk: ${disruption.impact.revenueAtRisk.toLocaleString()}</div>
                      </div>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <CloudRain className="h-4 w-4 text-orange-600" />
                        <span className="font-medium text-orange-900">Weather</span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div>{disruption.weather.condition}</div>
                        <div>Visibility: {disruption.weather.visibility}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <Button 
                    size="sm" 
                    onClick={() => setSelectedDisruption(disruption)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <Zap className="h-4 w-4 mr-2" />
                    Recovery Options
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Disruption Dialog */}
      {selectedDisruption && (
        <Dialog open={!!selectedDisruption} onOpenChange={() => setSelectedDisruption(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Plane className="h-5 w-5" />
                Flight {selectedDisruption.flightNumber} - Detailed Analysis
              </DialogTitle>
              <DialogDescription>
                Comprehensive disruption information and recovery tracking
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="impact">Impact Analysis</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="actions">Actions</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Flight Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Flight Number:</span>
                        <span className="font-medium">{selectedDisruption.flightNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Route:</span>
                        <span className="font-medium">{selectedDisruption.route}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Aircraft:</span>
                        <span className="font-medium">{selectedDisruption.aircraft}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">{selectedDisruption.aircraftType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gate:</span>
                        <span className="font-medium">{selectedDisruption.gate}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Disruption Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Severity:</span>
                        <Badge className={getSeverityColor(selectedDisruption.severity)}>
                          {selectedDisruption.severity}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Status:</span>
                        <Badge className={getStatusColor(selectedDisruption.status)}>
                          {selectedDisruption.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">{selectedDisruption.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Confidence:</span>
                        <span className="font-medium">{selectedDisruption.confidence}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Delay:</span>
                        <span className="font-medium text-orange-600">{selectedDisruption.delay} minutes</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Disruption Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                        <div>
                          <div className="font-medium text-orange-900 mb-2">{selectedDisruption.disruptionReason}</div>
                          <div className="text-orange-800">{selectedDisruption.detailedDescription}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="impact" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Passenger Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Total Passengers</span>
                          <span className="text-2xl font-bold text-blue-600">{selectedDisruption.impact.passengers}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Connecting Flights</span>
                          <span className="text-2xl font-bold text-orange-600">{selectedDisruption.impact.connectingFlights}</span>
                        </div>
                        <Progress value={75} className="w-full" />
                        <p className="text-sm text-gray-600">75% of passengers require rebooking assistance</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Financial Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Estimated Cost</span>
                          <span className="text-xl font-bold text-red-600">${selectedDisruption.impact.estimatedCost.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Revenue at Risk</span>
                          <span className="text-xl font-bold text-orange-600">${selectedDisruption.impact.revenueAtRisk.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Compensation Required</span>
                          <span className="text-xl font-bold text-yellow-600">${selectedDisruption.impact.compensationRequired.toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="timeline" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Event Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <div>
                          <div className="font-medium">14:30 - Scheduled Departure</div>
                          <div className="text-sm text-gray-600">Original flight schedule</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                        <div>
                          <div className="font-medium">14:15 - Issue Detected</div>
                          <div className="text-sm text-gray-600">Hydraulic system warning during pre-flight</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                        <div>
                          <div className="font-medium">14:25 - Boarding Suspended</div>
                          <div className="text-sm text-gray-600">Passengers held in gate area</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                        <div>
                          <div className="font-medium">16:45 - New Estimated Departure</div>
                          <div className="text-sm text-gray-600">Maintenance team working on resolution</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="actions" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Available Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button className="w-full justify-start">
                        <Zap className="h-4 w-4 mr-2" />
                        Generate Recovery Options
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Users className="h-4 w-4 mr-2" />
                        Manage Passenger Rebooking
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Phone className="h-4 w-4 mr-2" />
                        Contact Crew Manager
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Wrench className="h-4 w-4 mr-2" />
                        Coordinate with Maintenance
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Maintenance team notified</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Passengers informed of delay</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Timer className="h-4 w-4 text-orange-600" />
                          <span className="text-sm">Awaiting technical inspection</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
