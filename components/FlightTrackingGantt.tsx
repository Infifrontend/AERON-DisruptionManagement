'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Checkbox } from './ui/checkbox'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Alert, AlertDescription } from './ui/alert'
import { Slider } from './ui/slider'
import { 
  Calendar,
  Filter,
  Search,
  Plane,
  Clock,
  MapPin,
  Users,
  Fuel,
  Wrench,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Play,
  Pause,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Settings,
  Download,
  RefreshCw,
  Eye,
  EyeOff,
  MoreHorizontal,
  Timer,
  UserCheck,
  Building,
  Gauge,
  Layers,
  Filter as FilterIcon,
  X,
  Hash
} from 'lucide-react'

// Enhanced mock aircraft data for Flydubai with 25+ aircraft and comprehensive flight schedules
const aircraftFleet = [
  {
    id: 'AC001',
    tailNumber: 'A6-FDX',
    type: 'B737-800',
    capacity: 189,
    currentLocation: 'DXB',
    status: 'active',
    utilization: 87,
    nextMaintenance: '2025-01-15',
    age: 8.5,
    crew: 'Crew Alpha',
    gate: 'T2-B12',
    flights: [
      { id: 'FZ215', departure: { time: '08:30', airport: 'DXB' }, arrival: { time: '13:15', airport: 'BOM' }, duration: 4.75, passengers: 189, status: 'on-time', delay: 0, route: 'DXB-BOM', priority: 'high' },
      { id: 'FZ216', departure: { time: '18:15', airport: 'BOM' }, arrival: { time: '21:30', airport: 'DXB' }, duration: 4.25, passengers: 175, status: 'delayed', delay: 45, route: 'BOM-DXB', priority: 'medium' }
    ]
  },
  {
    id: 'AC002',
    tailNumber: 'A6-FDY',
    type: 'B737 MAX 8',
    capacity: 195,
    currentLocation: 'DEL',
    status: 'active',
    utilization: 92,
    nextMaintenance: '2025-01-20',
    age: 3.2,
    crew: 'Crew Beta',
    gate: 'T3-A15',
    flights: [
      { id: 'FZ001', departure: { time: '10:15', airport: 'DEL' }, arrival: { time: '12:45', airport: 'DXB' }, duration: 3.5, passengers: 185, status: 'on-time', delay: 0, route: 'DEL-DXB', priority: 'high' },
      { id: 'FZ147', departure: { time: '21:30', airport: 'DXB' }, arrival: { time: '03:15+1', airport: 'IST' }, duration: 4.75, passengers: 189, status: 'on-time', delay: 0, route: 'DXB-IST', priority: 'medium' }
    ]
  },
  {
    id: 'AC003',
    tailNumber: 'A6-FDZ',
    type: 'B737-800',
    capacity: 189,
    currentLocation: 'KHI',
    status: 'maintenance',
    utilization: 0,
    nextMaintenance: '2025-01-08',
    age: 6.8,
    crew: null,
    gate: 'MNT-01',
    flights: []
  },
  {
    id: 'AC004',
    tailNumber: 'A6-FEA',
    type: 'B737 MAX 8',
    capacity: 195,
    currentLocation: 'COK',
    status: 'active',
    utilization: 78,
    nextMaintenance: '2025-01-25',
    age: 2.1,
    crew: 'Crew Gamma',
    gate: 'T3-B5',
    flights: [
      { id: 'FZ525', departure: { time: '23:45', airport: 'COK' }, arrival: { time: '02:30+1', airport: 'DXB' }, duration: 3.75, passengers: 175, status: 'boarding', delay: 0, route: 'COK-DXB', priority: 'high' }
    ]
  },
  {
    id: 'AC005',
    tailNumber: 'A6-FEB',
    type: 'B737-800',
    capacity: 189,
    currentLocation: 'CMB',
    status: 'active',
    utilization: 94,
    nextMaintenance: '2025-01-12',
    age: 9.3,
    crew: 'Crew Delta',
    gate: 'T1-3',
    flights: [
      { id: 'FZ413', departure: { time: '06:00', airport: 'CMB' }, arrival: { time: '09:30', airport: 'DXB' }, duration: 4.5, passengers: 181, status: 'departed', delay: 15, route: 'CMB-DXB', priority: 'high' }
    ]
  },
  {
    id: 'AC006',
    tailNumber: 'A6-FEC',
    type: 'B737 MAX 8',
    capacity: 195,
    currentLocation: 'BCN',
    status: 'active',
    utilization: 85,
    nextMaintenance: '2025-01-18',
    age: 1.7,
    crew: 'Crew Echo',
    gate: 'T1-B23',
    flights: [
      { id: 'FZ047', departure: { time: '13:25', airport: 'BCN' }, arrival: { time: '20:15', airport: 'DXB' }, duration: 6.83, passengers: 189, status: 'cancelled', delay: 0, route: 'BCN-DXB', priority: 'low' }
    ]
  },
  {
    id: 'AC007',
    tailNumber: 'A6-FED',
    type: 'B737-800',
    capacity: 189,
    currentLocation: 'DXB',
    status: 'active',
    utilization: 91,
    nextMaintenance: '2025-01-22',
    age: 7.2,
    crew: 'Crew Foxtrot',
    gate: 'T2-A15',
    flights: [
      { id: 'FZ125', departure: { time: '02:45', airport: 'DXB' }, arrival: { time: '06:30', airport: 'TBZ' }, duration: 2.75, passengers: 165, status: 'departed', delay: 0, route: 'DXB-TBZ', priority: 'high' },
      { id: 'FZ126', departure: { time: '12:15', airport: 'TBZ' }, arrival: { time: '15:45', airport: 'DXB' }, duration: 2.5, passengers: 179, status: 'on-time', delay: 0, route: 'TBZ-DXB', priority: 'high' }
    ]
  },
  {
    id: 'AC008',
    tailNumber: 'A6-FEE',
    type: 'B737 MAX 8',
    capacity: 195,
    currentLocation: 'PRG',
    status: 'active',
    utilization: 89,
    nextMaintenance: '2025-01-28',
    age: 2.1,
    crew: 'Crew Golf',
    gate: 'T2-15',
    flights: [
      { id: 'FZ384', departure: { time: '01:25', airport: 'PRG' }, arrival: { time: '07:45', airport: 'DXB' }, duration: 5.33, passengers: 182, status: 'departed', delay: 0, route: 'PRG-DXB', priority: 'medium' },
      { id: 'FZ123', departure: { time: '14:30', airport: 'DXB' }, arrival: { time: '18:45', airport: 'KHI' }, duration: 2.25, passengers: 189, status: 'on-time', delay: 0, route: 'DXB-KHI', priority: 'medium' },
      { id: 'FZ124', departure: { time: '21:15', airport: 'KHI' }, arrival: { time: '23:45', airport: 'DXB' }, duration: 2.5, passengers: 175, status: 'on-time', delay: 0, route: 'KHI-DXB', priority: 'medium' }
    ]
  },
  {
    id: 'AC009',
    tailNumber: 'A6-FEF',
    type: 'B737-800',
    capacity: 189,
    currentLocation: 'SLL',
    status: 'active',
    utilization: 82,
    nextMaintenance: '2025-02-05',
    age: 8.6,
    crew: 'Crew Hotel',
    gate: 'T1-5',
    flights: [
      { id: 'FZ149', departure: { time: '09:40', airport: 'SLL' }, arrival: { time: '12:25', airport: 'DXB' }, duration: 1.75, passengers: 165, status: 'on-time', delay: 0, route: 'SLL-DXB', priority: 'medium' },
      { id: 'FZ412', departure: { time: '22:50', airport: 'DXB' }, arrival: { time: '07:15+1', airport: 'BEG' }, duration: 5.42, passengers: 189, status: 'on-time', delay: 0, route: 'DXB-BEG', priority: 'high' }
    ]
  },
  {
    id: 'AC010',
    tailNumber: 'A6-FEG',
    type: 'B737 MAX 8',
    capacity: 195,
    currentLocation: 'BEG',
    status: 'active',
    utilization: 76,
    nextMaintenance: '2025-01-30',
    age: 1.8,
    crew: 'Crew India',
    gate: 'T2-A5',
    flights: [
      { id: 'FZ235', departure: { time: '16:20', airport: 'BEG' }, arrival: { time: '21:45', airport: 'DXB' }, duration: 4.42, passengers: 175, status: 'on-time', delay: 0, route: 'BEG-DXB', priority: 'high' }
    ]
  },
  {
    id: 'AC011',
    tailNumber: 'A6-FEH',
    type: 'B737-800',
    capacity: 189,
    currentLocation: 'SKP',
    status: 'active',
    utilization: 88,
    nextMaintenance: '2025-01-16',
    age: 10.4,
    crew: 'Crew Juliet',
    gate: 'T1-B2',
    flights: [
      { id: 'FZ073', departure: { time: '11:30', airport: 'SKP' }, arrival: { time: '16:15', airport: 'DXB' }, duration: 3.75, passengers: 182, status: 'on-time', delay: 0, route: 'SKP-DXB', priority: 'high' }
    ]
  },
  {
    id: 'AC012',
    tailNumber: 'A6-FEI',
    type: 'B737 MAX 8',
    capacity: 195,
    currentLocation: 'AUH',
    status: 'active',
    utilization: 71,
    nextMaintenance: '2025-02-10',
    age: 0.9,
    crew: 'Crew Kilo',
    gate: 'T3-12',
    flights: [
      { id: 'FZ927', departure: { time: '06:15', airport: 'AUH' }, arrival: { time: '07:30', airport: 'DXB' }, duration: 1.25, passengers: 155, status: 'on-time', delay: 0, route: 'AUH-DXB', priority: 'medium' },
      { id: 'FZ565', departure: { time: '15:45', airport: 'DXB' }, arrival: { time: '19:20', airport: 'BOM' }, duration: 4.58, passengers: 189, status: 'on-time', delay: 0, route: 'DXB-BOM', priority: 'medium' },
      { id: 'FZ566', departure: { time: '21:10', airport: 'BOM' }, arrival: { time: '23:35', airport: 'DXB' }, duration: 3.42, passengers: 175, status: 'on-time', delay: 0, route: 'BOM-DXB', priority: 'medium' }
    ]
  },
  {
    id: 'AC013',
    tailNumber: 'A6-FEJ',
    type: 'B737-800',
    capacity: 189,
    currentLocation: 'IST',
    status: 'active',
    utilization: 79,
    nextMaintenance: '2025-01-19',
    age: 11.7,
    crew: 'Crew Lima',
    gate: 'ISG-15',
    flights: [
      { id: 'FZ185', departure: { time: '14:50', airport: 'IST' }, arrival: { time: '20:25', airport: 'DXB' }, duration: 4.58, passengers: 179, status: 'on-time', delay: 0, route: 'IST-DXB', priority: 'medium' }
    ]
  },
  {
    id: 'AC014',
    tailNumber: 'A6-FEK',
    type: 'B737 MAX 8',
    capacity: 195,
    currentLocation: 'TBS',
    status: 'active',
    utilization: 93,
    nextMaintenance: '2025-01-14',
    age: 2.9,
    crew: 'Crew Mike',
    gate: 'T2-5',
    flights: [
      { id: 'FZ343', departure: { time: '04:20', airport: 'TBS' }, arrival: { time: '07:25', airport: 'DXB' }, duration: 3.08, passengers: 182, status: 'departed', delay: 0, route: 'TBS-DXB', priority: 'medium' },
      { id: 'FZ505', departure: { time: '10:15', airport: 'DXB' }, arrival: { time: '12:45', airport: 'DOH' }, duration: 1.5, passengers: 165, status: 'on-time', delay: 0, route: 'DXB-DOH', priority: 'medium' },
      { id: 'FZ506', departure: { time: '16:30', airport: 'DOH' }, arrival: { time: '19:15', airport: 'DXB' }, duration: 1.75, passengers: 175, status: 'delayed', delay: 25, route: 'DOH-DXB', priority: 'medium' }
    ]
  },
  {
    id: 'AC015',
    tailNumber: 'A6-FEL',
    type: 'B737-800',
    capacity: 189,
    currentLocation: 'KWI',
    status: 'active',
    utilization: 84,
    nextMaintenance: '2025-02-02',
    age: 9.1,
    crew: 'Crew November',
    gate: 'T4-12',
    flights: [
      { id: 'FZ085', departure: { time: '13:40', airport: 'KWI' }, arrival: { time: '16:55', airport: 'DXB' }, duration: 2.25, passengers: 172, status: 'on-time', delay: 0, route: 'KWI-DXB', priority: 'medium' }
    ]
  },
  {
    id: 'AC016',
    tailNumber: 'A6-FEM',
    type: 'B737 MAX 8',
    capacity: 195,
    currentLocation: 'DAM',
    status: 'active',
    utilization: 77,
    nextMaintenance: '2025-02-08',
    age: 1.4,
    crew: 'Crew Oscar',
    gate: 'T2-8',
    flights: [
      { id: 'FZ261', departure: { time: '07:30', airport: 'DAM' }, arrival: { time: '11:15', airport: 'DXB' }, duration: 2.75, passengers: 165, status: 'on-time', delay: 0, route: 'DAM-DXB', priority: 'high' }
    ]
  },
  {
    id: 'AC017',
    tailNumber: 'A6-FEN',
    type: 'B737-800',
    capacity: 189,
    currentLocation: 'BGW',
    status: 'active',
    utilization: 90,
    nextMaintenance: '2025-01-21',
    age: 7.8,
    crew: 'Crew Papa',
    gate: 'T1-12',
    flights: [
      { id: 'FZ053', departure: { time: '15:25', airport: 'BGW' }, arrival: { time: '17:50', airport: 'DXB' }, duration: 1.42, passengers: 175, status: 'on-time', delay: 0, route: 'BGW-DXB', priority: 'high' }
    ]
  },
  {
    id: 'AC018',
    tailNumber: 'A6-FEO',
    type: 'B737 MAX 8',
    capacity: 195,
    currentLocation: 'EBL',
    status: 'active',
    utilization: 86,
    nextMaintenance: '2025-01-27',
    age: 2.2,
    crew: 'Crew Quebec',
    gate: 'T1-8',
    flights: [
      { id: 'FZ385', departure: { time: '00:30', airport: 'EBL' }, arrival: { time: '02:45', airport: 'DXB' }, duration: 2.25, passengers: 155, status: 'departed', delay: 0, route: 'EBL-DXB', priority: 'medium' },
      { id: 'FZ627', departure: { time: '08:20', airport: 'DXB' }, arrival: { time: '13:15', airport: 'DEL' }, duration: 3.92, passengers: 189, status: 'on-time', delay: 0, route: 'DXB-DEL', priority: 'medium' },
      { id: 'FZ628', departure: { time: '15:45', airport: 'DEL' }, arrival: { time: '18:30', airport: 'DXB' }, duration: 3.75, passengers: 175, status: 'on-time', delay: 0, route: 'DEL-DXB', priority: 'medium' }
    ]
  },
  {
    id: 'AC019',
    tailNumber: 'A6-FEP',
    type: 'B737-800',
    capacity: 189,
    currentLocation: 'ALA',
    status: 'active',
    utilization: 81,
    nextMaintenance: '2025-01-24',
    age: 12.1,
    crew: 'Crew Romeo',
    gate: 'T2-3',
    flights: [
      { id: 'FZ323', departure: { time: '03:15', airport: 'ALA' }, arrival: { time: '06:50', airport: 'DXB' }, duration: 4.58, passengers: 165, status: 'departed', delay: 0, route: 'ALA-DXB', priority: 'high' },
      { id: 'FZ771', departure: { time: '22:35', airport: 'DXB' }, arrival: { time: '04:20+1', airport: 'ALA' }, duration: 4.75, passengers: 189, status: 'on-time', delay: 0, route: 'DXB-ALA', priority: 'high' }
    ]
  },
  {
    id: 'AC020',
    tailNumber: 'A6-FEQ',
    type: 'B737 MAX 8',
    capacity: 195,
    currentLocation: 'CCJ',
    status: 'active',
    utilization: 88,
    nextMaintenance: '2025-02-01',
    age: 1.6,
    crew: 'Crew Sierra',
    gate: 'T1-15',
    flights: [
      { id: 'FZ507', departure: { time: '05:40', airport: 'CCJ' }, arrival: { time: '07:55', airport: 'DXB' }, duration: 2.25, passengers: 175, status: 'departed', delay: 0, route: 'CCJ-DXB', priority: 'medium' },
      { id: 'FZ131', departure: { time: '16:20', airport: 'DXB' }, arrival: { time: '21:35', airport: 'BOM' }, duration: 4.25, passengers: 189, status: 'on-time', delay: 0, route: 'DXB-BOM', priority: 'medium' },
      { id: 'FZ132', departure: { time: '23:15', airport: 'BOM' }, arrival: { time: '02:25+1', airport: 'DXB' }, duration: 4.17, passengers: 165, status: 'on-time', delay: 0, route: 'BOM-DXB', priority: 'medium' }
    ]
  }
]

export function FlightTrackingGantt() {
  // State management
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [timeRange, setTimeRange] = useState('24h') // 24h, 48h, 7d
  const [viewMode, setViewMode] = useState('timeline') // timeline, schedule
  const [zoomLevel, setZoomLevel] = useState(1) // 0.5x to 3x
  const [selectedTailNumbers, setSelectedTailNumbers] = useState([])
  const [showInactive, setShowInactive] = useState(false)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [filters, setFilters] = useState({
    aircraftType: 'all',
    status: 'all',
    route: 'all',
    search: ''
  }))

  // Auto-refresh timer
  const [autoRefresh, setAutoRefresh] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const ganttRef = useRef(null)
  
  // Filter aircraft based on current filters
  const filteredAircraft = aircraftFleet.filter(aircraft => {
    if (!showInactive && aircraft.status === 'maintenance') return false
    if (filters.aircraftType !== 'all' && aircraft.type !== filters.aircraftType) return false
    if (filters.status !== 'all' && aircraft.status !== filters.status) return false
    if (filters.search && !aircraft.tailNumber.toLowerCase().includes(filters.search.toLowerCase()) &&
        !aircraft.type.toLowerCase().includes(filters.search.toLowerCase())) return false
    return true
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-time': return 'bg-green-500'
      case 'delayed': return 'bg-yellow-500'
      case 'cancelled': return 'bg-red-500'
      case 'boarding': return 'bg-blue-500'
      case 'departed': return 'bg-purple-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusTextColor = (status) => {
    switch (status) {
      case 'on-time': return 'text-green-700'
      case 'delayed': return 'text-yellow-700'
      case 'cancelled': return 'text-red-700'
      case 'boarding': return 'text-blue-700'
      case 'departed': return 'text-purple-700'
      default: return 'text-gray-700'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Flight Tracking Gantt</h2>
          <p className="text-gray-600">Real-time aircraft and flight visualization</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={isPlaying ? "default" : "outline"}
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Aircraft Type</label>
              <Select value={filters.aircraftType} onValueChange={(value) => setFilters(prev => ({ ...prev, aircraftType: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="B737-800">B737-800</SelectItem>
                  <SelectItem value="B737 MAX 8">B737 MAX 8</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Search</label>
              <Input
                placeholder="Search aircraft..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              />
            </div>
            <div className="flex items-center gap-2 pt-6">
              <Checkbox 
                checked={showInactive} 
                onCheckedChange={setShowInactive}
                id="show-inactive"
              />
              <label htmlFor="show-inactive" className="text-sm">Show Maintenance</label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Aircraft List */}
      <div className="space-y-4">
        {filteredAircraft.map(aircraft => (
          <Card key={aircraft.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <Plane className="h-5 w-5 text-gray-500" />
                  <div>
                    <h3 className="font-semibold">{aircraft.tailNumber}</h3>
                    <p className="text-sm text-gray-600">{aircraft.type}</p>
                  </div>
                  <Badge variant={aircraft.status === 'active' ? 'default' : 'secondary'}>
                    {aircraft.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Utilization: {aircraft.utilization}%</span>
                  <span>Location: {aircraft.currentLocation}</span>
                </div>
              </div>
              
              {aircraft.flights.length > 0 && (
                <div className="space-y-2">
                  {aircraft.flights.map(flight => (
                    <div key={flight.id} className="flex items-center gap-4 p-2 bg-gray-50 rounded">
                      <Badge className={getStatusColor(flight.status)}>
                        {flight.id}
                      </Badge>
                      <div className="flex-1 grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium">{flight.departure.time}</span>
                          <span className="text-gray-600 ml-1">{flight.departure.airport}</span>
                        </div>
                        <div>
                          <span className="font-medium">{flight.arrival.time}</span>
                          <span className="text-gray-600 ml-1">{flight.arrival.airport}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Pax: {flight.passengers}</span>
                        </div>
                        <div className={getStatusTextColor(flight.status)}>
                          {flight.status} {flight.delay > 0 && `(+${flight.delay}m)`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
