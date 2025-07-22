
'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Progress } from './ui/progress'
import { Alert, AlertDescription } from './ui/alert'
import { 
  FileText, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Plane, 
  Wrench, 
  UserCheck,
  Hotel,
  Fuel,
  TrendingUp,
  Download,
  RefreshCw
} from 'lucide-react'

export function ComparisonMatrix({ selectedFlight, onSelectPlan }: any) {
  const recoveryOptions = [
    {
      id: 'option-a',
      name: 'Option A - Quick Turnaround',
      cost: 15000,
      delay: 45,
      passengerImpact: 'Low',
      feasibility: 95,
      riskLevel: 'Low'
    },
    {
      id: 'option-b', 
      name: 'Option B - Aircraft Swap',
      cost: 28000,
      delay: 120,
      passengerImpact: 'Medium',
      feasibility: 85,
      riskLevel: 'Medium'
    },
    {
      id: 'option-c',
      name: 'Option C - Route Modification',
      cost: 45000,
      delay: 30,
      passengerImpact: 'High',
      feasibility: 70,
      riskLevel: 'High'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-flydubai-navy">Recovery Options Comparison</h2>
          <p className="text-muted-foreground">Compare and evaluate recovery strategies</p>
        </div>
        <Button className="btn-flydubai-primary">
          <Download className="h-4 w-4 mr-2" />
          Export Comparison
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recovery Options Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Option</TableHead>
                <TableHead>Cost (AED)</TableHead>
                <TableHead>Delay (min)</TableHead>
                <TableHead>Passenger Impact</TableHead>
                <TableHead>Feasibility</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recoveryOptions.map((option) => (
                <TableRow key={option.id}>
                  <TableCell className="font-medium">{option.name}</TableCell>
                  <TableCell>AED {option.cost.toLocaleString()}</TableCell>
                  <TableCell>{option.delay} min</TableCell>
                  <TableCell>
                    <Badge className={
                      option.passengerImpact === 'Low' ? 'bg-green-100 text-green-800' :
                      option.passengerImpact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }>
                      {option.passengerImpact}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={option.feasibility} className="w-16 h-2" />
                      <span className="text-sm">{option.feasibility}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={
                      option.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
                      option.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }>
                      {option.riskLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" onClick={() => onSelectPlan(option)}>
                      Select
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export function DetailedRecoveryPlan({ plan, flight }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-flydubai-navy">Detailed Recovery Plan</h2>
          <p className="text-muted-foreground">Implementation timeline and resource allocation</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Plan
          </Button>
          <Button className="btn-flydubai-primary">
            Execute Plan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plane className="h-5 w-5" />
              Flight Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-sm text-muted-foreground">Flight:</span>
              <p className="font-medium">FZ {flight?.number || '123'}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Route:</span>
              <p className="font-medium">{flight?.route || 'DXB-BOM'}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Aircraft:</span>
              <p className="font-medium">{flight?.aircraft || 'B737-800'}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Passengers:</span>
              <p className="font-medium">{flight?.passengers || '156'}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Plan Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-sm text-muted-foreground">Selected Option:</span>
              <p className="font-medium">{plan?.name || 'Option A - Quick Turnaround'}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Total Cost:</span>
              <p className="font-medium">AED {plan?.cost?.toLocaleString() || '15,000'}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Expected Delay:</span>
              <p className="font-medium">{plan?.delay || '45'} minutes</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Success Rate:</span>
              <p className="font-medium">{plan?.successRate || '95'}%</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-sm text-muted-foreground">Start Time:</span>
              <p className="font-medium">14:30 GST</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Completion:</span>
              <p className="font-medium">15:15 GST</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Duration:</span>
              <p className="font-medium">45 minutes</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Status:</span>
              <Badge className="bg-blue-100 text-blue-800">Ready to Execute</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Implementation Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { step: 1, action: 'Notify ground crew and prepare aircraft', time: '5 min', status: 'pending' },
              { step: 2, action: 'Complete passenger boarding process', time: '15 min', status: 'pending' },
              { step: 3, action: 'Finalize fuel calculations and loading', time: '10 min', status: 'pending' },
              { step: 4, action: 'ATC clearance and pushback', time: '10 min', status: 'pending' },
              { step: 5, action: 'Departure and route monitoring', time: '5 min', status: 'pending' }
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="flex items-center justify-center w-8 h-8 bg-flydubai-blue text-white rounded-full text-sm font-medium">
                  {item.step}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.action}</p>
                  <p className="text-sm text-muted-foreground">Estimated time: {item.time}</p>
                </div>
                <Badge className="bg-gray-100 text-gray-800">
                  {item.status === 'pending' ? 'Pending' : 'Complete'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function PendingSolutions() {
  const pendingSolutions = [
    {
      id: 'PS-001',
      flight: 'FZ123',
      route: 'DXB-BOM',
      issue: 'Weather delay',
      priority: 'High',
      created: '14:25 GST',
      eta: '15:30 GST',
      status: 'In Progress'
    },
    {
      id: 'PS-002', 
      flight: 'FZ456',
      route: 'DXB-DEL',
      issue: 'Technical check',
      priority: 'Medium',
      created: '13:45 GST',
      eta: '16:00 GST',
      status: 'Pending Approval'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-flydubai-navy">Pending Solutions</h2>
          <p className="text-muted-foreground">Recovery plans awaiting implementation</p>
        </div>
        <Button className="btn-flydubai-primary">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Status
        </Button>
      </div>

      <div className="grid gap-4">
        {pendingSolutions.map((solution) => (
          <Card key={solution.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Clock className="h-5 w-5 text-flydubai-blue" />
                  <div>
                    <h4 className="font-medium">{solution.flight} - {solution.route}</h4>
                    <p className="text-sm text-muted-foreground">{solution.issue}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={
                    solution.priority === 'High' ? 'bg-red-100 text-red-800' :
                    solution.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }>
                    {solution.priority}
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800">
                    {solution.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function AircraftMaintenance() {
  const maintenanceSchedule = [
    {
      aircraft: 'A6-FDB',
      type: 'A-Check',
      status: 'In Progress',
      location: 'DXB Hangar 3',
      startTime: '08:00 GST',
      estimatedCompletion: '18:00 GST',
      technician: 'Ahmed Al-Rashid'
    },
    {
      aircraft: 'A6-FDC',
      type: 'Line Maintenance',
      status: 'Scheduled',
      location: 'DXB Gate A12',
      startTime: '16:30 GST',
      estimatedCompletion: '17:15 GST',
      technician: 'Sarah Johnson'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-flydubai-navy">Aircraft Maintenance</h2>
          <p className="text-muted-foreground">Current maintenance operations and schedule</p>
        </div>
        <Button className="btn-flydubai-primary">
          <Wrench className="h-4 w-4 mr-2" />
          Schedule Maintenance
        </Button>
      </div>

      <div className="grid gap-4">
        {maintenanceSchedule.map((maintenance, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Wrench className="h-5 w-5 text-flydubai-blue" />
                  <div>
                    <h4 className="font-medium">{maintenance.aircraft} - {maintenance.type}</h4>
                    <p className="text-sm text-muted-foreground">{maintenance.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={
                    maintenance.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }>
                    {maintenance.status}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">
                    {maintenance.startTime} - {maintenance.estimatedCompletion}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function PassengerRebooking() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-flydubai-navy">Passenger Services</h2>
          <p className="text-muted-foreground">Rebooking and passenger care management</p>
        </div>
        <Button className="btn-flydubai-primary">
          <UserCheck className="h-4 w-4 mr-2" />
          New Rebooking
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Affected Passengers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-semibold text-flydubai-blue">156</p>
              <p className="text-muted-foreground">Total passengers</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Rebooked
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-semibold text-green-600">142</p>
              <p className="text-muted-foreground">Successfully rebooked</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-semibold text-orange-600">14</p>
              <p className="text-muted-foreground">Awaiting rebooking</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export function HOTACManagement() {
  const hotelBookings = [
    {
      id: 'HOTAC-001',
      passenger: 'Ahmed Al-Mansoori',
      flight: 'FZ123',
      hotel: 'Dubai International Hotel',
      checkIn: '20:00 GST',
      checkOut: '08:00 GST',
      status: 'Confirmed',
      cost: 'AED 450'
    },
    {
      id: 'HOTAC-002',
      passenger: 'Sarah Johnson', 
      flight: 'FZ456',
      hotel: 'Airport Transit Hotel',
      checkIn: '22:30 GST',
      checkOut: '06:00 GST',
      status: 'Pending',
      cost: 'AED 320'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-flydubai-navy">HOTAC Management</h2>
          <p className="text-muted-foreground">Hotel accommodation and transportation coordination</p>
        </div>
        <Button className="btn-flydubai-primary">
          <Hotel className="h-4 w-4 mr-2" />
          New Booking
        </Button>
      </div>

      <div className="grid gap-4">
        {hotelBookings.map((booking) => (
          <Card key={booking.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Hotel className="h-5 w-5 text-flydubai-blue" />
                  <div>
                    <h4 className="font-medium">{booking.passenger} - {booking.flight}</h4>
                    <p className="text-sm text-muted-foreground">{booking.hotel}</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.checkIn} - {booking.checkOut}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={
                    booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }>
                    {booking.status}
                  </Badge>
                  <p className="text-sm font-medium mt-1">{booking.cost}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function FuelOptimization() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-flydubai-navy">Fuel Optimization</h2>
          <p className="text-muted-foreground">Smart fuel planning and cost optimization</p>
        </div>
        <Button className="btn-flydubai-primary">
          <Fuel className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Fuel className="h-5 w-5" />
              Today's Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-semibold text-green-600">12.1%</p>
              <p className="text-muted-foreground">Fuel efficiency gain</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Monthly Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-semibold text-flydubai-blue">AED 2.8M</p>
              <p className="text-muted-foreground">Cost reduction</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plane className="h-5 w-5" />
              Optimized Flights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-semibold text-flydubai-orange">247</p>
              <p className="text-muted-foreground">This month</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-semibold text-green-600">94.3%</p>
              <p className="text-muted-foreground">Optimization accuracy</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
