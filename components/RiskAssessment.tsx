'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Alert, AlertDescription } from './ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Activity, 
  CloudRain, 
  Wrench, 
  Radio,
  Users,
  Plane,
  Clock,
  MapPin,
  Thermometer,
  Wind,
  Zap,
  Download,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react'

export function RiskAssessment() {
  const [timeframe, setTimeframe] = useState('24h')
  const [riskCategory, setRiskCategory] = useState('all')

  // Mock risk assessment data
  const overallRiskScore = 7.3
  const riskTrend = 'increasing' // increasing, decreasing, stable

  const riskFactors = [
    {
      id: 'weather-dxb',
      name: 'Weather Conditions - DXB',
      category: 'Weather',
      severity: 'High',
      probability: 85,
      impact: 9.2,
      description: 'Sandstorm approaching Dubai with visibility < 1km expected',
      timeToImpact: '2.5 hours',
      affectedFlights: 18,
      mitigationStatus: 'Active',
      icon: CloudRain
    },
    {
      id: 'atc-delays',
      name: 'ATC Slot Restrictions',
      category: 'Air Traffic',
      severity: 'Medium',
      probability: 65,
      impact: 6.8,
      description: 'European airspace congestion affecting departure slots',
      timeToImpact: '4.2 hours',
      affectedFlights: 12,
      mitigationStatus: 'Monitoring',
      icon: Radio
    },
    {
      id: 'maintenance-737',
      name: 'Fleet Maintenance Window',
      category: 'Maintenance',
      severity: 'Medium',
      probability: 40,
      impact: 7.5,
      description: 'Scheduled A-checks reducing available aircraft',
      timeToImpact: '6.0 hours',
      affectedFlights: 8,
      mitigationStatus: 'Planned',
      icon: Wrench
    },
    {
      id: 'crew-shortage',
      name: 'Crew Availability',
      category: 'Crew',
      severity: 'Low',
      probability: 25,
      impact: 5.2,
      description: 'Limited crew reserves for extended operations',
      timeToImpact: '8.5 hours',
      affectedFlights: 4,
      mitigationStatus: 'Standby',
      icon: Users
    }
  ]

  const routeRisks = [
    { route: 'DXB-JFK', riskScore: 8.5, factors: ['Weather', 'ATC'], flights: 3 },
    { route: 'DXB-LHR', riskScore: 7.2, factors: ['ATC', 'Crew'], flights: 4 },
    { route: 'DXB-BOM', riskScore: 6.8, factors: ['Weather'], flights: 6 },
    { route: 'DXB-DEL', riskScore: 6.1, factors: ['Weather'], flights: 5 },
    { route: 'DXB-KHI', riskScore: 4.9, factors: ['Maintenance'], flights: 2 }
  ]

  const historicalTrends = [
    { date: '2025-01-10', riskScore: 7.3, incidents: 3 },
    { date: '2025-01-09', riskScore: 6.8, incidents: 2 },
    { date: '2025-01-08', riskScore: 5.9, incidents: 1 },
    { date: '2025-01-07', riskScore: 6.4, incidents: 2 },
    { date: '2025-01-06', riskScore: 7.1, incidents: 4 }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200'
      case 'Medium': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'Low': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getMitigationColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-blue-100 text-blue-800'
      case 'Monitoring': return 'bg-orange-100 text-orange-800'
      case 'Planned': return 'bg-green-100 text-green-800'
      case 'Standby': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-flydubai-navy">Risk Assessment</h2>
          <p className="text-muted-foreground">Real-time operational risk monitoring and mitigation</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Next 24h</SelectItem>
              <SelectItem value="48h">Next 48h</SelectItem>
              <SelectItem value="7d">Next 7 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button className="btn-flydubai-primary">
            <Download className="h-4 w-4 mr-2" />
            Risk Report
          </Button>
        </div>
      </div>

      {/* Overall Risk Score */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Shield className="h-12 w-12 text-orange-600" />
                <div className="absolute inset-0 bg-orange-600 rounded-full opacity-10 blur-sm"></div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-orange-800">Risk Score: {overallRiskScore}/10</h3>
                <p className="text-orange-700">
                  Current operational risk level - {overallRiskScore >= 8 ? 'High' : overallRiskScore >= 6 ? 'Medium' : 'Low'} Risk
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                {riskTrend === 'increasing' ? (
                  <ArrowUp className="h-4 w-4 text-red-600" />
                ) : riskTrend === 'decreasing' ? (
                  <ArrowDown className="h-4 w-4 text-green-600" />
                ) : (
                  <Minus className="h-4 w-4 text-gray-600" />
                )}
                <span className="text-sm font-medium capitalize text-orange-800">{riskTrend}</span>
              </div>
              <p className="text-sm text-orange-700">vs. 24h ago</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Risk Alerts */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Active Risk Factors</h3>
        {riskFactors.map((risk) => {
          const IconComponent = risk.icon
          return (
            <Alert key={risk.id} className={`${risk.severity === 'High' ? 'border-red-200 bg-red-50' : risk.severity === 'Medium' ? 'border-orange-200 bg-orange-50' : 'border-yellow-200 bg-yellow-50'}`}>
              <div className="flex items-start gap-4 w-full">
                <IconComponent className={`h-5 w-5 mt-0.5 ${risk.severity === 'High' ? 'text-red-600' : risk.severity === 'Medium' ? 'text-orange-600' : 'text-yellow-600'}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{risk.name}</h4>
                    <div className="flex items-center gap-2">
                      <Badge className={getSeverityColor(risk.severity)}>
                        {risk.severity} Risk
                      </Badge>
                      <Badge className={getMitigationColor(risk.mitigationStatus)}>
                        {risk.mitigationStatus}
                      </Badge>
                    </div>
                  </div>
                  <AlertDescription className="mb-3">
                    {risk.description}
                  </AlertDescription>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Probability:</span>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={risk.probability} className="w-16 h-2" />
                        <span className="font-medium">{risk.probability}%</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Impact:</span>
                      <p className="font-medium">{risk.impact}/10</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Time to Impact:</span>
                      <p className="font-medium">{risk.timeToImpact}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Affected Flights:</span>
                      <p className="font-medium">{risk.affectedFlights}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Alert>
          )
        })}
      </div>

      <Tabs defaultValue="routes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="routes">Route Risk Analysis</TabsTrigger>
          <TabsTrigger value="trends">Historical Trends</TabsTrigger>
          <TabsTrigger value="mitigation">Mitigation Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="routes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>High-Risk Routes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {routeRisks.map((route, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <Plane className="h-5 w-5 text-flydubai-blue" />
                      <div>
                        <h4 className="font-medium">{route.route}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          {route.factors.map((factor, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {factor}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <Progress value={route.riskScore * 10} className="w-20 h-2" />
                        <span className="font-medium">{route.riskScore}/10</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{route.flights} flights affected</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Risk Score Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {historicalTrends.map((trend, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border-b last:border-b-0">
                    <div>
                      <p className="font-medium">{trend.date}</p>
                      <p className="text-sm text-muted-foreground">{trend.incidents} incidents reported</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <Progress value={trend.riskScore * 10} className="w-20 h-2" />
                        <span className="font-medium">{trend.riskScore}/10</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mitigation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Mitigation Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert className="border-blue-200 bg-blue-50">
                  <Zap className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>Immediate Action:</strong> Activate weather contingency plans for DXB operations. 
                    Consider pre-positioning aircraft at alternate airports.
                  </AlertDescription>
                </Alert>

                <Alert className="border-orange-200 bg-orange-50">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    <strong>Within 2 hours:</strong> Coordinate with European ATC for alternative routing options. 
                    Notify passengers of potential delays.
                  </AlertDescription>
                </Alert>

                <Alert className="border-green-200 bg-green-50">
                  <Activity className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>Preventive:</strong> Review crew scheduling for next 48 hours. 
                    Consider repositioning reserves to high-risk stations.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}