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
    flightNumber: 'FZ215',
    origin: 'DXB',
    destination: 'BOM', 
    originCity: 'Dubai',
    destinationCity: 'Mumbai',
    scheduledDeparture: '2025-01-10T15:30:00',
    scheduledArrival: '2025-01-10T20:15:00',
    currentStatus: 'Delayed',
    delay: 120,
    aircraft: 'B737-800',
    gate: 'T2-B12',
    passengers: 189,
    crew: 6,
    disruptionType: 'weather',
    categorization: 'ATC/weather delay',
    disruptionReason: 'Sandstorm at DXB',
    severity: 'high',
    impact: 'Departure delayed due to sandstorm at DXB',
    lastUpdate: '2 mins ago',
    priority: 'High',
    connectionFlights: 8,
    vipPassengers: 4
  },
  {
    id: 'FL_002',
    flightNumber: 'FZ203',
    origin: 'DXB',
    destination: 'DEL',
    originCity: 'Dubai', 
    destinationCity: 'Delhi',
    scheduledDeparture: '2025-01-10T16:45:00',
    scheduledArrival: '2025-01-10T21:20:00',
    currentStatus: 'Cancelled',
    delay: null,
    aircraft: 'B737 MAX 8',
    gate: 'T2-A08',
    passengers: 195,
    crew: 6,
    disruptionType: 'weather',
    categorization: 'ATC/weather delay',
    disruptionReason: 'Dense fog at DEL',
    severity: 'high',
    impact: 'Flight cancelled due to severe fog at DEL',
    lastUpdate: '5 mins ago',
    priority: 'Critical',
    connectionFlights: 5,
    vipPassengers: 3
  },
  {
    id: 'FL_003',
    flightNumber: 'FZ235',
    origin: 'KHI',
    destination: 'DXB',
    originCity: 'Karachi',
    destinationCity: 'Dubai',
    scheduledDeparture: '2025-01-10T08:30:00',
    scheduledArrival: '2025-01-10T11:45:00',
    currentStatus: 'Diverted',
    delay: 180,
    aircraft: 'B737-800',
    gate: 'T2-C15',
    passengers: 181,
    crew: 6,
    disruptionType: 'airport',
    categorization: 'Airport curfew/ramp congestion',
    disruptionReason: 'DXB runway closure',
    severity: 'medium',
    impact: 'Diverted to AUH due to DXB closure',
    lastUpdate: '8 mins ago',
    priority: 'High',
    connectionFlights: 7,
    vipPassengers: 2
  },
  {
    id: 'FL_004',
    flightNumber: 'FZ147',
    origin: 'IST',
    destination: 'DXB',
    originCity: 'Istanbul',
    destinationCity: 'Dubai',
    scheduledDeparture: '2025-01-10T21:15:00',
    scheduledArrival: '2025-01-11T03:30:00',
    currentStatus: 'Delayed',
    delay: 45,
    aircraft: 'B737 MAX 8',
    gate: 'T2-A15',
    passengers: 189,
    crew: 6,
    disruptionType: 'technical',
    categorization: 'Aircraft issue (e.g., AOG)',
    disruptionReason: 'Engine maintenance check',
    severity: 'medium',
    impact: 'Aircraft maintenance check delay',
    lastUpdate: '12 mins ago',
    priority: 'Medium',
    connectionFlights: 4,
    vipPassengers: 2
  },
  {
    id: 'FL_005',
    flightNumber: 'FZ181',
    origin: 'DXB',
    destination: 'COK',
    originCity: 'Dubai',
    destinationCity: 'Kochi',
    scheduledDeparture: '2025-01-10T14:20:00',
    scheduledArrival: '2025-01-10T19:45:00',
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

export function DisruptionInput({ disruption, onSelectFlight }) {
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
