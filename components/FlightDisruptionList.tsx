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
      },
      crewMembers: [
        {
          id: 'CREW-001',
          name: 'Captain Sarah Johnson',
          role: 'Captain',
