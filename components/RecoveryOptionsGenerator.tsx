'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Separator } from './ui/separator'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Alert, AlertDescription } from './ui/alert'
import { 
  Plane, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users, 
  Calendar, 
  Wrench,
  Target,
  ArrowRight,
  Eye,
  PlayCircle,
  Settings,
  RotateCw,
  AlertCircle,
  Info,
  Timer,
  Building,
  PhoneCall,
  FileText,
  Zap,
  TrendingUp,
  DollarSign,
  Shield,
  Activity,
  CloudRain,
  Wind,
  Navigation,
  Route,
  Gauge,
  CheckSquare,
  XCircle,
  GitBranch,
  Network,
  Workflow,
  RefreshCw,
  Bell,
  Upload,
  Download,
  Share,
  MapPin,
  Car,
  UserX
} from 'lucide-react'

export function RecoveryOptionsGenerator({ selectedFlight, onSelectPlan, onCompare }) {
  const [selectedOption, setSelectedOption] = useState(null)
  const [showDetails, setShowDetails] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isExecuting, setIsExecuting] = useState(false)
  const [showRotationPlan, setShowRotationPlan] = useState(false)
  const [selectedRotationData, setSelectedRotationData] = useState(null)
  const [scheduleImpactData, setScheduleImpactData] = useState(null)

  // Handle both array and single flight selection
  const flight = Array.isArray(selectedFlight) ? selectedFlight[0] : selectedFlight

  // Early return if no flight is selected
  if (!flight) {
    return (
      <div className="space-y-6">
        <Card className="border-flydubai-blue">
          <CardContent className="p-8 text-center">
            <Plane className="h-12 w-12 text-flydubai-blue mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-flydubai-navy mb-2">No Flight Selected</h3>
            <p className="text-muted-foreground">
              Please select a flight from the Affected Flights screen to generate recovery options.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Debug log to see what we're receiving
  console.log('Selected Flight Data:', flight)
  console.log('Flight Categorization:', flight?.categorization)

  // Get scenario-specific recovery data
  const getScenarioData = (categorization) => {
    switch (categorization) {
      case 'Aircraft issue (e.g., AOG)':
        return getAircraftIssueRecovery()
      case 'Crew issue (e.g., sick report, duty time breach)':
        return getCrewIssueRecovery()
      case 'ATC/weather delay':
        return getWeatherDelayRecovery()
      case 'Airport curfew/ramp congestion':
