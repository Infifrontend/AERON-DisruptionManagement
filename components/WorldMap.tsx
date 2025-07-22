import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Alert, AlertDescription } from './ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { 
  Globe, 
  Plane, 
  MapPin, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Zap,
  Navigation,
  Radar,
  Layers,
  Filter,
  RefreshCw,
  Info
} from 'lucide-react'

export function WorldMap() {
  const [selectedView, setSelectedView] = useState('routes')
  const [isRealtime, setIsRealtime] = useState(true)

  // Helper function to convert lat/lng to SVG coordinates
  const latLngToXY = (lat, lng) => {
    const x = ((lng + 180) / 360) * 1000
    const y = ((90 - lat) / 180) * 500
    return { x, y }
  }

  // Helper function for status colors
  const getStatusColor = (status) => {
    switch (status) {
      case 'on-time': return 'text-green-600'
      case 'delayed': return 'text-flydubai-orange'
      case 'en-route': return 'text-flydubai-blue'
      case 'cancelled': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  // Enhanced sample data for Flydubai network
  const hubs = [
    { id: 'DXB', name: 'Dubai International', lat: 25.2532, lng: 55.3657, type: 'primary', flights: 34 }
  ]

