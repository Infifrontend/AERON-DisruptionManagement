'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Alert, AlertDescription } from './ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { 
  CheckSquare, 
  Search, 
  Filter, 
  Calendar,
  TrendingUp,
  TrendingDown,
  Eye,
  Download,
  BarChart3,
  PieChart,
  Clock,
  DollarSign,
  Users,
  Plane,
  History,
  User,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowRight,
  FileText,
  Settings,
  CreditCard,
  Zap,
  Star
} from 'lucide-react'

// Enhanced recovery logs with detailed flight history and action tracking
const pastRecoveryLogs = [
  {
    id: 'SOL-2025-001',
    disruptionId: 'DIS-001',
    flightNumber: 'FZ215',
    route: 'DXB → BOM',
    origin: 'DXB',
    destination: 'BOM',
    aircraft: 'B737-800',
    registration: 'A6-FDB',
    disruptionType: 'ATC/weather delay',
    disruptionReason: 'Sandstorm at DXB',
    priority: 'High',
    dateCreated: '2025-01-10 13:45:00',
    dateExecuted: '2025-01-10 14:32:00',
    dateCompleted: '2025-01-10 16:47:00',
    duration: '3h 2m',
    status: 'Successful',
    affectedPassengers: 189,
    actualCost: 118000,
    estimatedCost: 125000,
    costVariance: -5.6,
    otpImpact: -1.8,
    solutionChosen: 'Option B - Delay with passenger services',
    totalOptions: 3,
    executedBy: 'sara.ahmed@flydubai.com',
    approvedBy: 'supervisor@flydubai.com',
    passengerSatisfaction: 8.2,
    rebookingSuccess: 94.5,
    categorization: 'ATC/weather delay',
    details: {
      description: 'Weather delay managed with enhanced passenger services',
      passengerRebookings: 8,
      hotelVouchers: 0,
      mealVouchers: 189,
      compensation: 15000,
      connectionsMissed: 8,
      vipPassengers: 4
    },
    actionHistory: [
      {
        timestamp: '2025-01-10 13:45:00',
        action: 'Disruption Detected',
        user: 'system.aeron',
        description: 'Sandstorm alert triggered automatic disruption detection',
        status: 'completed',
        duration: '2 minutes'
      },
      {
        timestamp: '2025-01-10 13:47:00',
        action: 'Initial Assessment',
        user: 'ops.controller@flydubai.com',
        description: 'Weather impact assessed, estimated 2-hour delay',
        status: 'completed',
        duration: '8 minutes'
      },
      {
        timestamp: '2025-01-10 13:55:00',
        action: 'Recovery Options Generated',
        user: 'system.aeron',
        description: '3 recovery options generated using AERON AI',
        status: 'completed',
        duration: '5 minutes'
      },
      {
        timestamp: '2025-01-10 14:00:00',
        action: 'Option Selection',
        user: 'sara.ahmed@flydubai.com',
        description: 'Option B selected - 2-hour delay with enhanced passenger services',
        status: 'completed',
        duration: '12 minutes'
      },
      {
        timestamp: '2025-01-10 14:12:00',
        action: 'Supervisor Approval',
        user: 'supervisor@flydubai.com',
        description: 'Recovery plan approved, execution authorized',
        status: 'completed',
        duration: '8 minutes'
      },
      {
        timestamp: '2025-01-10 14:20:00',
        action: 'Passenger Notifications',
        user: 'system.passenger',
        description: 'SMS and email notifications sent to all 189 passengers',
        status: 'completed',
        duration: '3 minutes'
      },
      {
        timestamp: '2025-01-10 14:23:00',
        action: 'Meal Voucher Distribution',
        user: 'ground.services@flydubai.com',
        description: '189 meal vouchers distributed at gate',
        status: 'completed',
        duration: '25 minutes'
      },
      {
        timestamp: '2025-01-10 14:48:00',
        action: 'Connection Passenger Management',
        user: 'transfer.desk@flydubai.com',
        description: '8 connecting passengers rebooked on alternative flights',
        status: 'completed',
        duration: '32 minutes'
      },
      {
        timestamp: '2025-01-10 15:20:00',
        action: 'Aircraft Ready',
        user: 'maintenance@flydubai.com',
        description: 'B737-800 A6-FDB cleared for departure post-weather',
        status: 'completed',
        duration: '15 minutes'
      },
      {
        timestamp: '2025-01-10 16:35:00',
        action: 'Departure Completed',
        user: 'flight.ops@flydubai.com',
        description: 'FZ215 departed DXB at 16:35, 2h 5m delay total',
        status: 'completed',
        duration: '12 minutes'
      },
      {
        timestamp: '2025-01-10 16:47:00',
        action: 'Solution Closed',
        user: 'system.aeron',
        description: 'Recovery solution marked as successful, metrics updated',
        status: 'completed',
        duration: '2 minutes'
      }
    ],
    auditTrail: {
      systemDecisions: 4,
      humanInterventions: 7,
      approvalLevels: 2,
      costAuthorizations: 3,
      complianceChecks: 5,
      totalActions: 11
    }
  },
  {
    id: 'SOL-2025-002',
    disruptionId: 'DIS-002',
    flightNumber: 'FZ181',
    route: 'DXB → COK',
    origin: 'DXB',
    destination: 'COK',
    aircraft: 'B737-800',
    registration: 'A6-FDC',
    disruptionType: 'Crew issue',
    disruptionReason: 'Captain duty time breach',
    priority: 'Medium',
    dateCreated: '2025-01-10 12:30:00',
    dateExecuted: '2025-01-10 13:45:00',
    dateCompleted: '2025-01-10 15:20:00',
    duration: '2h 50m',
    status: 'Successful',
    affectedPassengers: 175,
    actualCost: 45000,
    estimatedCost: 52000,
    costVariance: -13.5,
    otpImpact: -0.5,
    solutionChosen: 'Option A - Standby crew activation',
    totalOptions: 3,
    executedBy: 'crew.manager@flydubai.com',
    approvedBy: 'ops.supervisor@flydubai.com',
    passengerSatisfaction: 8.8,
    rebookingSuccess: 98.5,
    categorization: 'Crew issue (e.g., sick report, duty time breach)',
    details: {
      description: 'Standby crew activated successfully with minimal delay',
      passengerRebookings: 3,
      hotelVouchers: 0,
      mealVouchers: 175,
      compensation: 8000,
      connectionsMissed: 3,
      vipPassengers: 1
    },
    actionHistory: [
      {
        timestamp: '2025-01-10 12:30:00',
        action: 'Duty Time Alert',
        user: 'system.crew',
        description: 'Captain Al-Rashid duty time breach detected - 13.5/13.0 hours',
        status: 'completed',
        duration: '1 minute'
      },
      {
        timestamp: '2025-01-10 12:31:00',
        action: 'Crew Assessment',
        user: 'crew.manager@flydubai.com',
        description: 'Reviewed duty time logs and standby crew availability',
        status: 'completed',
        duration: '15 minutes'
      },
      {
        timestamp: '2025-01-10 12:46:00',
        action: 'Standby Crew Contact',
        user: 'crew.manager@flydubai.com',
        description: 'Captain Al-Zaabi contacted and confirmed availability',
        status: 'completed',
        duration: '8 minutes'
      },
      {
        timestamp: '2025-01-10 12:54:00',
        action: 'Recovery Options Generated',
        user: 'system.aeron',
        description: '3 crew-specific recovery options generated',
        status: 'completed',
        duration: '5 minutes'
      },
      {
        timestamp: '2025-01-10 12:59:00',
        action: 'Standby Activation',
        user: 'crew.manager@flydubai.com',
        description: 'Captain Al-Zaabi activated from standby duty',
        status: 'completed',
        duration: '20 minutes'
      },
      {
        timestamp: '2025-01-10 13:19:00',
        action: 'Crew Briefing',
        user: 'training@flydubai.com',
        description: 'Extended briefing completed for new captain pairing',
        status: 'completed',
        duration: '25 minutes'
      },
      {
        timestamp: '2025-01-10 13:44:00',
        action: 'Passenger Notification',
        user: 'ground.services@flydubai.com',
        description: 'Passengers informed of 30-minute delay for crew change',
        status: 'completed',
        duration: '5 minutes'
      },
      {
        timestamp: '2025-01-10 13:49:00',
        action: 'Flight Departure',
        user: 'flight.ops@flydubai.com',
        description: 'FZ181 departed with new crew, 29-minute delay',
        status: 'completed',
        duration: '1 minute'
      },
      {
        timestamp: '2025-01-10 15:20:00',
        action: 'Solution Success',
        user: 'system.aeron',
        description: 'Crew recovery completed successfully, metrics recorded',
        status: 'completed',
        duration: '1 minute'
      }
    ],
    auditTrail: {
      systemDecisions: 3,
      humanInterventions: 6,
      approvalLevels: 1,
      costAuthorizations: 2,
      complianceChecks: 4,
      totalActions: 9
    }
  },
  {
    id: 'SOL-2025-003',
    disruptionId: 'DIS-003',
    flightNumber: 'FZ147',
    route: 'IST → DXB',
    origin: 'IST',
    destination: 'DXB',
    aircraft: 'B737 MAX 8',
    registration: 'A6-FME',
    disruptionType: 'Aircraft Technical',
    disruptionReason: 'Engine maintenance check required',
    priority: 'Medium',
    dateCreated: '2025-01-10 09:15:00',
    dateExecuted: '2025-01-10 10:30:00',
    dateCompleted: '2025-01-10 13:45:00',
    duration: '4h 30m',
    status: 'Successful',
    affectedPassengers: 189,
    actualCost: 95000,
    estimatedCost: 89000,
    costVariance: 6.7,
    otpImpact: -2.3,
    solutionChosen: 'Option C - Aircraft swap with schedule adjustment',
    totalOptions: 4,
    executedBy: 'maintenance@flydubai.com',
    approvedBy: 'director@flydubai.com',
    passengerSatisfaction: 7.8,
    rebookingSuccess: 89.2,
    categorization: 'Aircraft issue (e.g., AOG)',
    details: {
      description: 'Aircraft technical issue resolved with replacement aircraft',
      passengerRebookings: 20,
      hotelVouchers: 0,
      mealVouchers: 189,
      compensation: 28000,
      connectionsMissed: 4,
      vipPassengers: 2
    },
    actionHistory: [
      {
        timestamp: '2025-01-10 09:15:00',
        action: 'Technical Alert',
        user: 'maintenance@flydubai.com',
        description: 'Engine parameter anomaly detected during pre-flight check',
        status: 'completed',
        duration: '5 minutes'
      },
      {
        timestamp: '2025-01-10 09:20:00',
        action: 'Engineering Assessment',
        user: 'chief.engineer@flydubai.com',
        description: 'Engine inspection required, aircraft grounded',
        status: 'completed',
        duration: '25 minutes'
      },
      {
        timestamp: '2025-01-10 09:45:00',
        action: 'Alternative Aircraft Search',
        user: 'fleet.manager@flydubai.com',
        description: 'B737 MAX 8 A6-FMF identified as replacement',
        status: 'completed',
        duration: '20 minutes'
      },
      {
        timestamp: '2025-01-10 10:05:00',
        action: 'Recovery Options Generated',
        user: 'system.aeron',
        description: '4 aircraft recovery options generated with cost analysis',
        status: 'completed',
        duration: '8 minutes'
      },
      {
        timestamp: '2025-01-10 10:13:00',
        action: 'Aircraft Swap Decision',
        user: 'ops.manager@flydubai.com',
        description: 'Option C selected - aircraft swap with 2-hour delay',
        status: 'completed',
        duration: '12 minutes'
      },
      {
        timestamp: '2025-01-10 10:25:00',
        action: 'Director Approval',
        user: 'director@flydubai.com',
        description: 'High-cost recovery plan approved by director',
        status: 'completed',
        duration: '5 minutes'
      },
      {
        timestamp: '2025-01-10 10:30:00',
        action: 'Replacement Aircraft Preparation',
        user: 'ground.ops@flydubai.com',
        description: 'A6-FMF prepared and positioned at IST gate',
        status: 'completed',
        duration: '45 minutes'
      },
      {
        timestamp: '2025-01-10 11:15:00',
        action: 'Passenger Transfer',
        user: 'ground.services@flydubai.com',
        description: '189 passengers transferred to replacement aircraft',
        status: 'completed',
        duration: '30 minutes'
      },
      {
        timestamp: '2025-01-10 11:45:00',
        action: 'Connection Rebooking',
        user: 'reservations@flydubai.com',
        description: '4 connecting passengers rebooked on later flights',
        status: 'completed',
        duration: '25 minutes'
      },
      {
        timestamp: '2025-01-10 12:10:00',
        action: 'Crew Briefing Update',
        user: 'flight.ops@flydubai.com',
        description: 'Crew briefed on replacement aircraft specifics',
        status: 'completed',
        duration: '15 minutes'
      },
      {
        timestamp: '2025-01-10 12:25:00',
        action: 'Departure Cleared',
        user: 'atc.istanbul',
        description: 'FZ147 cleared for departure on replacement aircraft',
        status: 'completed',
        duration: '5 minutes'
      },
      {
        timestamp: '2025-01-10 13:45:00',
        action: 'Recovery Completed',
        user: 'system.aeron',
        description: 'Aircraft swap recovery successfully completed',
        status: 'completed',
        duration: '2 minutes'
      }
    ],
    auditTrail: {
      systemDecisions: 2,
      humanInterventions: 10,
      approvalLevels: 3,
      costAuthorizations: 4,
      complianceChecks: 6,
      totalActions: 12
    }
  }
]

export function PastRecoveryLogs() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [disruptionTypeFilter, setDisruptionTypeFilter] = useState('all')
  const [dateRange, setDateRange] = useState('last7days')
  const [selectedLog, setSelectedLog] = useState(null)
  const [activeTab, setActiveTab] = useState('logs')
  const [selectedFlightHistory, setSelectedFlightHistory] = useState(null)

  const filteredLogs = pastRecoveryLogs.filter(log => {
    const matchesSearch = log.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.disruptionReason.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || log.status.toLowerCase().includes(statusFilter.toLowerCase())
    const matchesType = disruptionTypeFilter === 'all' || log.categorization === disruptionTypeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'Successful': return 'bg-green-100 text-green-700 border-green-200'
      case 'Partial Success': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'Failed': return 'bg-red-100 text-red-700 border-red-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-700 border-red-200'
      case 'High': return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'Low': return 'bg-green-100 text-green-700 border-green-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getActionStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'in_progress': return <Clock className="h-4 w-4 text-yellow-600" />
      case 'failed': return <XCircle className="h-4 w-4 text-red-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const calculateStats = () => {
    return {
      totalSolutions: pastRecoveryLogs.length,
      successRate: ((pastRecoveryLogs.filter(log => log.status === 'Successful').length / pastRecoveryLogs.length) * 100).toFixed(1),
      avgCostVariance: (pastRecoveryLogs.reduce((sum, log) => sum + log.costVariance, 0) / pastRecoveryLogs.length).toFixed(1),
      totalPassengers: pastRecoveryLogs.reduce((sum, log) => sum + log.affectedPassengers, 0),
      totalCost: pastRecoveryLogs.reduce((sum, log) => sum + log.actualCost, 0),
      avgSatisfaction: (pastRecoveryLogs.reduce((sum, log) => sum + log.passengerSatisfaction, 0) / pastRecoveryLogs.length).toFixed(1),
      avgRebookingSuccess: (pastRecoveryLogs.reduce((sum, log) => sum + log.rebookingSuccess, 0) / pastRecoveryLogs.length).toFixed(1),
      avgDuration: Math.round(pastRecoveryLogs.reduce((sum, log) => {
        const hours = parseInt(log.duration.split('h')[0])
        const minutes = parseInt(log.duration.split('h')[1].split('m')[0])
        return sum + (hours * 60 + minutes)
      }, 0) / pastRecoveryLogs.length),
      totalActions: pastRecoveryLogs.reduce((sum, log) => sum + log.auditTrail.totalActions, 0)
    }
  }

  const stats = calculateStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-flydubai-navy">Past Recovery Logs</h2>
          <p className="text-muted-foreground">Comprehensive flight history and recovery action tracking for audit purposes</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-flydubai-blue text-flydubai-blue hover:bg-blue-50">
            <Download className="h-4 w-4 mr-2" />
            Export Audit Report
          </Button>
          <Button variant="outline" className="border-flydubai-orange text-flydubai-orange hover:bg-orange-50">
            <BarChart3 className="h-4 w-4 mr-2" />
            Generate Analytics
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="logs" className="pb-3">
            Recovery Logs
          </TabsTrigger>
          <TabsTrigger value="flight-history" className="pb-3">
            Flight History
          </TabsTrigger>
          <TabsTrigger value="analytics" className="pb-3">
            Performance Analytics
          </TabsTrigger>
          <TabsTrigger value="audit-trail" className="pb-3">
            Audit Trail
          </TabsTrigger>
        </TabsList>

        <TabsContent value="logs" className="space-y-6 mt-3">
          {/* Enhanced Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckSquare className="h-4 w-4 text-green-600" />
                  <h4 className="text-sm font-medium">Success Rate</h4>
                </div>
                <p className="text-2xl font-semibold text-green-600">{stats.successRate}%</p>
                <p className="text-xs text-muted-foreground">Of all solutions</p>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <h4 className="text-sm font-medium">Avg Resolution</h4>
                </div>
                <p className="text-2xl font-semibold text-blue-600">{Math.floor(stats.avgDuration / 60)}h {stats.avgDuration % 60}m</p>
                <p className="text-xs text-muted-foreground">Time to resolve</p>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-orange-600" />
                  <h4 className="text-sm font-medium">Cost Efficiency</h4>
                </div>
                <p className={`text-2xl font-semibold ${parseFloat(stats.avgCostVariance) < 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stats.avgCostVariance}%
                </p>
                <p className="text-xs text-muted-foreground">vs estimated</p>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 text-purple-600" />
                  <h4 className="text-sm font-medium">Satisfaction</h4>
                </div>
                <p className="text-2xl font-semibold text-purple-600">{stats.avgSatisfaction}/10</p>
                <p className="text-xs text-muted-foreground">Average rating</p>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-flydubai-navy">
                <Filter className="h-5 w-5" />
                Filters & Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <Label htmlFor="search">Search Logs</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Flight, route, reason..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="successful">Successful</SelectItem>
                      <SelectItem value="partial">Partial Success</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="type">Disruption Type</Label>
                  <Select value={disruptionTypeFilter} onValueChange={setDisruptionTypeFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Aircraft issue (e.g., AOG)">Aircraft Issue</SelectItem>
                      <SelectItem value="Crew issue (e.g., sick report, duty time breach)">Crew Issue</SelectItem>
                      <SelectItem value="ATC/weather delay">ATC/Weather</SelectItem>
                      <SelectItem value="Airport curfew/ramp congestion">Airport/Curfew</SelectItem>
                      <SelectItem value="Rotation misalignment or maintenance hold">Rotation/Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="dateRange">Date Range</Label>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last7days">Last 7 Days</SelectItem>
                      <SelectItem value="last30days">Last 30 Days</SelectItem>
                      <SelectItem value="last90days">Last 90 Days</SelectItem>
                      <SelectItem value="lastyear">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button 
                    onClick={() => {
                      setSearchTerm('')
                      setStatusFilter('all')
                      setDisruptionTypeFilter('all')
                      setDateRange('last7days')
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Recovery Logs Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-flydubai-navy">Recovery History ({filteredLogs.length} records)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Solution ID</TableHead>
                    <TableHead>Flight Details</TableHead>
                    <TableHead>Disruption</TableHead>
                    <TableHead>Timeline</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Cost Impact</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map(log => (
                    <TableRow key={log.id} className="hover:bg-blue-50">
                      <TableCell className="font-mono text-sm">{log.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-flydubai-blue">{log.flightNumber}</p>
                          <p className="text-sm text-muted-foreground">{log.route}</p>
                          <p className="text-xs text-muted-foreground">{log.aircraft} • {log.registration}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <Badge className={getPriorityColor(log.priority)} variant="outline">
                            {log.priority}
                          </Badge>
                          <p className="text-sm mt-1">{log.disruptionReason}</p>
                          <p className="text-xs text-muted-foreground">{log.categorization}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="font-medium">{log.duration}</p>
                          <p className="text-muted-foreground">Created: {new Date(log.dateCreated).toLocaleTimeString()}</p>
                          <p className="text-muted-foreground">Completed: {new Date(log.dateCompleted).toLocaleTimeString()}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(log.status)}>
                          {log.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <span className={`font-medium ${log.costVariance < 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {log.costVariance > 0 ? '+' : ''}{log.costVariance}%
                          </span>
                          <p className="text-xs text-muted-foreground">AED {log.actualCost.toLocaleString()}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>Satisfaction: <span className="font-medium">{log.passengerSatisfaction}/10</span></p>
                          <p>Rebooking: <span className="font-medium text-green-600">{log.rebookingSuccess}%</span></p>
                          <p className="text-xs text-muted-foreground">{log.affectedPassengers} pax</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => setSelectedLog(log)}>
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setSelectedFlightHistory(log)} className="text-flydubai-blue">
                            <History className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flight-history" className="space-y-6">
          {selectedFlightHistory ? (
            <div className="space-y-6">
              {/* Flight Overview */}
              <Card className="border-flydubai-blue">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-flydubai-navy">Flight History - {selectedFlightHistory.flightNumber}</CardTitle>
                      <p className="text-muted-foreground">{selectedFlightHistory.route} • {selectedFlightHistory.aircraft} {selectedFlightHistory.registration}</p>
                    </div>
                    <Button variant="outline" onClick={() => setSelectedFlightHistory(null)}>
                      Back to Selection
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-flydubai-blue font-medium">Disruption Type</p>
                      <p className="text-lg font-semibold">{selectedFlightHistory.categorization}</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <p className="text-sm text-flydubai-orange font-medium">Total Duration</p>
                      <p className="text-lg font-semibold">{selectedFlightHistory.duration}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-green-600 font-medium">Passengers Affected</p>
                      <p className="text-lg font-semibold">{selectedFlightHistory.affectedPassengers}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm text-purple-600 font-medium">Total Actions</p>
                      <p className="text-lg font-semibold">{selectedFlightHistory.auditTrail.totalActions}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Action Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-flydubai-navy">Action Timeline & History</CardTitle>
                  <p className="text-muted-foreground">Chronological record of all actions taken during the recovery process</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedFlightHistory.actionHistory.map((action, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-white rounded-lg border border-blue-100">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-flydubai-blue text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          {getActionStatusIcon(action.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-flydubai-navy">{action.action}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {action.duration}
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{action.description}</p>
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-4">
                              <span className="text-flydubai-blue font-medium bg-blue-100 px-2 py-1 rounded">
                                <User className="h-3 w-3 inline mr-1" />
                                {action.user}
                              </span>
                              <span className="text-gray-500">
                                {new Date(action.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <Badge className={action.status === 'completed' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-yellow-100 text-yellow-800 border-yellow-200'}>
                              {action.status.replace('_', ' ').toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Audit Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-flydubai-navy">Audit Summary</CardTitle>
                  <p className="text-muted-foreground">Compliance and decision tracking summary</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-flydubai-blue">{selectedFlightHistory.auditTrail.systemDecisions}</p>
                      <p className="text-sm text-flydubai-navy">System Decisions</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <p className="text-2xl font-bold text-flydubai-orange">{selectedFlightHistory.auditTrail.humanInterventions}</p>
                      <p className="text-sm text-flydubai-navy">Human Interventions</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{selectedFlightHistory.auditTrail.approvalLevels}</p>
                      <p className="text-sm text-flydubai-navy">Approval Levels</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">{selectedFlightHistory.auditTrail.costAuthorizations}</p>
                      <p className="text-sm text-flydubai-navy">Cost Authorizations</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <p className="text-2xl font-bold text-yellow-600">{selectedFlightHistory.auditTrail.complianceChecks}</p>
                      <p className="text-sm text-flydubai-navy">Compliance Checks</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-gray-600">{selectedFlightHistory.auditTrail.totalActions}</p>
                      <p className="text-sm text-flydubai-navy">Total Actions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Flight Selection Header */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-flydubai-navy">Select Flight for Detailed History</CardTitle>
                  <p className="text-muted-foreground">Choose any flight below to view its complete action history, timeline, and audit trail</p>
                </CardHeader>
              </Card>

              {/* Quick Stats for Flight History */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <h4 className="text-sm font-medium">Total Flights</h4>
                    </div>
                    <p className="text-2xl font-semibold text-green-600">{pastRecoveryLogs.length}</p>
                    <p className="text-xs text-muted-foreground">Recovery records</p>
                  </CardContent>
                </Card>

                <Card className="border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-4 w-4 text-blue-600" />
                      <h4 className="text-sm font-medium">Total Actions</h4>
                    </div>
                    <p className="text-2xl font-semibold text-blue-600">{stats.totalActions}</p>
                    <p className="text-xs text-muted-foreground">Tracked actions</p>
                  </CardContent>
                </Card>

                <Card className="border-orange-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="h-4 w-4 text-orange-600" />
                      <h4 className="text-sm font-medium">Human Actions</h4>
                    </div>
                    <p className="text-2xl font-semibold text-orange-600">
                      {pastRecoveryLogs.reduce((sum, log) => sum + log.auditTrail.humanInterventions, 0)}
                    </p>
                    <p className="text-xs text-muted-foreground">Manual interventions</p>
                  </CardContent>
                </Card>

                <Card className="border-purple-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Settings className="h-4 w-4 text-purple-600" />
                      <h4 className="text-sm font-medium">System Actions</h4>
                    </div>
                    <p className="text-2xl font-semibold text-purple-600">
                      {pastRecoveryLogs.reduce((sum, log) => sum + log.auditTrail.systemDecisions, 0)}
                    </p>
                    <p className="text-xs text-muted-foreground">Automated decisions</p>
                  </CardContent>
                </Card>
              </div>

              {/* Flight Selection Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-flydubai-navy">Available Flight Records</CardTitle>
                  <p className="text-muted-foreground">Click any flight to view its detailed action history and audit trail</p>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Flight Details</TableHead>
                          <TableHead>Timeline</TableHead>
                          <TableHead>Disruption</TableHead>
                          <TableHead>Actions</TableHead>
                          <TableHead>Performance</TableHead>
                          <TableHead>Audit Info</TableHead>
                          <TableHead>Select</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredLogs.map(flight => (
                          <TableRow 
                            key={flight.id} 
                            className="hover:bg-blue-50 cursor-pointer"
                            onClick={() => setSelectedFlightHistory(flight)}
                          >
                            <TableCell>
                              <div>
                                <p className="font-medium text-flydubai-blue">{flight.flightNumber}</p>
                                <p className="text-sm text-muted-foreground">{flight.route}</p>
                                <p className="text-xs text-muted-foreground">{flight.aircraft} • {flight.registration}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <p className="font-medium">{flight.duration}</p>
                                <p className="text-muted-foreground">
                                  {new Date(flight.dateCreated).toLocaleDateString()}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(flight.dateCreated).toLocaleTimeString()} - 
                                  {new Date(flight.dateCompleted).toLocaleTimeString()}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <Badge className={getPriorityColor(flight.priority)} variant="outline">
                                  {flight.priority}
                                </Badge>
                                <p className="text-sm mt-1">{flight.disruptionReason}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <p className="font-medium text-flydubai-blue">{flight.auditTrail.totalActions}</p>
                                <p className="text-xs text-muted-foreground">
                                  {flight.auditTrail.systemDecisions} system, {flight.auditTrail.humanInterventions} human
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <Badge className={getStatusColor(flight.status)}>
                                  {flight.status}
                                </Badge>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {flight.passengerSatisfaction}/10 satisfaction
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-xs">
                                <p>Approvals: <span className="font-medium">{flight.auditTrail.approvalLevels}</span></p>
                                <p>Compliance: <span className="font-medium">{flight.auditTrail.complianceChecks}</span></p>
                                <p>Cost Auth: <span className="font-medium">{flight.auditTrail.costAuthorizations}</span></p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedFlightHistory(flight)
                                }}
                                className="text-flydubai-blue border-flydubai-blue hover:bg-blue-50"
                              >
                                <History className="h-3 w-3 mr-1" />
                                View History
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* Helpful Instructions */}
              <Alert className="border-blue-200 bg-blue-50">
                <History className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>Flight History Guide:</strong> Select any flight above to view its complete action timeline, 
                  including detailed steps, user attributions, timestamps, and audit information. Each flight record 
                  contains chronological tracking of all recovery actions from initial disruption detection to final resolution.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-flydubai-navy">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Success Rate:</span>
                    <span className="font-medium text-green-600">{stats.successRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Average Resolution Time:</span>
                    <span className="font-medium text-blue-600">{Math.floor(stats.avgDuration / 60)}h {stats.avgDuration % 60}m</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Cost Efficiency:</span>
                    <span className={`font-medium ${parseFloat(stats.avgCostVariance) < 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stats.avgCostVariance}% vs budget
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Passenger Satisfaction:</span>
                    <span className="font-medium text-purple-600">{stats.avgSatisfaction}/10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Rebooking Success:</span>
                    <span className="font-medium text-green-600">{stats.avgRebookingSuccess}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Total Actions Tracked:</span>
                    <span className="font-medium text-gray-600">{stats.totalActions}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-flydubai-navy">Disruption Category Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    'ATC/weather delay',
                    'Crew issue (e.g., sick report, duty time breach)', 
                    'Aircraft issue (e.g., AOG)',
                    'Airport curfew/ramp congestion',
                    'Rotation misalignment or maintenance hold'
                  ].map(type => {
                    const count = pastRecoveryLogs.filter(log => log.categorization === type).length
                    const percentage = count > 0 ? ((count / pastRecoveryLogs.length) * 100).toFixed(1) : '0.0'
                    return (
                      <div key={type} className="flex items-center justify-between">
                        <span className="text-sm flex-1">{type}</span>
                        <div className="flex items-center gap-2 ml-4">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-flydubai-blue h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-12">{percentage}%</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-flydubai-navy">Key Performance Indicators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-600">{stats.totalSolutions}</p>
                  <p className="text-sm text-green-700">Total Solutions</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-600">{stats.totalPassengers.toLocaleString()}</p>
                  <p className="text-sm text-blue-700">Passengers Served</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <DollarSign className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-orange-600">AED {(stats.totalCost / 1000).toFixed(0)}K</p>
                  <p className="text-sm text-orange-700">Total Recovery Cost</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <Zap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-purple-600">{stats.totalActions}</p>
                  <p className="text-sm text-purple-700">Actions Executed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit-trail" className="space-y-6">
          <Alert className="border-blue-200 bg-blue-50">
            <AlertTriangle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Audit Compliance:</strong> All recovery actions are tracked and logged for regulatory compliance. 
              This trail provides complete accountability and transparency for operational decisions.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-flydubai-navy">
                  <Settings className="h-4 w-4" />
                  System vs Human Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                {pastRecoveryLogs.map(log => (
                  <div key={log.id} className="mb-4 p-3 bg-gray-50 rounded">
                    <p className="font-medium text-sm">{log.flightNumber}</p>
                    <div className="flex justify-between text-xs mt-1">
                      <span>System: {log.auditTrail.systemDecisions}</span>
                      <span>Human: {log.auditTrail.humanInterventions}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-flydubai-navy">
                  <CreditCard className="h-4 w-4" />
                  Cost Authorization Levels
                </CardTitle>
              </CardHeader>
              <CardContent>
                {pastRecoveryLogs.map(log => (
                  <div key={log.id} className="mb-4 p-3 bg-gray-50 rounded">
                    <p className="font-medium text-sm">{log.flightNumber}</p>
                    <div className="flex justify-between text-xs mt-1">
                      <span>Approvals: {log.auditTrail.approvalLevels}</span>
                      <span>Cost Auth: {log.auditTrail.costAuthorizations}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-flydubai-navy">
                  <FileText className="h-4 w-4" />
                  Compliance Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                {pastRecoveryLogs.map(log => (
                  <div key={log.id} className="mb-4 p-3 bg-gray-50 rounded">
                    <p className="font-medium text-sm">{log.flightNumber}</p>
                    <div className="flex justify-between text-xs mt-1">
                      <span>Checks: {log.auditTrail.complianceChecks}</span>
                      <span>Total: {log.auditTrail.totalActions}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Audit Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-flydubai-navy">Comprehensive Audit Summary</CardTitle>
              <p className="text-muted-foreground">Complete audit trail for regulatory compliance and operational review</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-flydubai-blue">
                    {pastRecoveryLogs.reduce((sum, log) => sum + log.auditTrail.systemDecisions, 0)}
                  </p>
                  <p className="text-sm text-flydubai-navy">System Decisions</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <p className="text-2xl font-bold text-flydubai-orange">
                    {pastRecoveryLogs.reduce((sum, log) => sum + log.auditTrail.humanInterventions, 0)}
                  </p>
                  <p className="text-sm text-flydubai-navy">Human Interventions</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">
                    {pastRecoveryLogs.reduce((sum, log) => sum + log.auditTrail.approvalLevels, 0)}
                  </p>
                  <p className="text-sm text-flydubai-navy">Approval Levels</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">
                    {pastRecoveryLogs.reduce((sum, log) => sum + log.auditTrail.costAuthorizations, 0)}
                  </p>
                  <p className="text-sm text-flydubai-navy">Cost Authorizations</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">
                    {pastRecoveryLogs.reduce((sum, log) => sum + log.auditTrail.complianceChecks, 0)}
                  </p>
                  <p className="text-sm text-flydubai-navy">Compliance Checks</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-600">{stats.totalActions}</p>
                  <p className="text-sm text-flydubai-navy">Total Actions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Detailed Log Modal */}
      {selectedLog && (
        <Card className="fixed inset-4 z-50 bg-background border shadow-lg overflow-auto">
          <CardHeader className="flex flex-row items-center justify-between bg-flydubai-blue text-white">
            <div>
              <CardTitle>Solution Details - {selectedLog.id}</CardTitle>
              <p className="text-blue-100">Flight {selectedLog.flightNumber} • {selectedLog.route} • {selectedLog.aircraft}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setSelectedLog(null)} className="text-flydubai-blue border-flydubai-blue">
              ×
            </Button>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3 text-flydubai-navy">Execution Summary</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span>Status:</span>
                      <Badge className={getStatusColor(selectedLog.status)}>
                        {selectedLog.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">{selectedLog.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Solution Chosen:</span>
                      <span className="font-medium text-flydubai-blue">{selectedLog.solutionChosen}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Executed By:</span>
                      <span className="text-flydubai-blue">{selectedLog.executedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Approved By:</span>
                      <span className="text-flydubai-blue">{selectedLog.approvedBy}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 text-flydubai-navy">Cost Analysis</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Estimated Cost:</span>
                      <span className="font-medium">AED {selectedLog.estimatedCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Actual Cost:</span>
                      <span className="font-medium">AED {selectedLog.actualCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Variance:</span>
                      <span className={`font-medium ${selectedLog.costVariance < 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedLog.costVariance > 0 ? '+' : ''}{selectedLog.costVariance}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>OTP Impact:</span>
                      <span className="font-medium text-red-600">{selectedLog.otpImpact}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3 text-flydubai-navy">Passenger Impact</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Affected Passengers:</span>
                      <span className="font-medium text-flydubai-blue">{selectedLog.affectedPassengers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rebookings:</span>
                      <span>{selectedLog.details.passengerRebookings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hotel Vouchers:</span>
                      <span>{selectedLog.details.hotelVouchers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Meal Vouchers:</span>
                      <span>{selectedLog.details.mealVouchers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Compensation:</span>
                      <span className="font-medium">AED {selectedLog.details.compensation.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Connections Missed:</span>
                      <span className="text-red-600">{selectedLog.details.connectionsMissed}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 text-flydubai-navy">Performance Metrics</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Passenger Satisfaction:</span>
                      <span className="font-medium text-purple-600">{selectedLog.passengerSatisfaction}/10</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rebooking Success:</span>
                      <span className="font-medium text-green-600">{selectedLog.rebookingSuccess}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Options Generated:</span>
                      <span className="font-medium">{selectedLog.totalOptions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>VIP Passengers:</span>
                      <span className="font-medium text-purple-600">{selectedLog.details.vipPassengers}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-3 text-flydubai-navy">Solution Description</h4>
              <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{selectedLog.details.description}</p>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedFlightHistory(selectedLog)} className="text-flydubai-blue border-flydubai-blue">
                <History className="h-4 w-4 mr-2" />
                View Action History
              </Button>
              <Button variant="outline" onClick={() => setSelectedLog(null)}>
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}