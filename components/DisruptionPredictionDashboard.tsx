'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Alert, AlertDescription } from './ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { 
  TrendingUp, 
  TrendingDown, 
  Brain,
  Zap,
  Activity,
  ArrowUp,
  ArrowDown,
  Calendar,
  RefreshCw,
  DollarSign
} from 'lucide-react'

export function DisruptionPredictionDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h')

  // Mock prediction data
  const predictionStats = {
    totalPredictions: 47,
    highRisk: 18,
    mediumRisk: 19,
    lowRisk: 10,
    accuracy: 92.4,
    avgLeadTime: 6.2,
    preventedDisruptions: 23,
    costSavings: 1.2
  }

  const riskFactors = [
    { 
      id: 1, 
      name: 'Weather Conditions', 
      impact: 'High', 
      affected: 28, 
      trend: 'up',
      description: 'Severe thunderstorms predicted at JFK, LGA'
    },
    { 
      id: 2, 
      name: 'Aircraft Maintenance', 
      impact: 'Medium', 
      affected: 15, 
      trend: 'down',
      description: 'Routine maintenance schedule adjustments'
    },
    { 
      id: 3, 
      name: 'Crew Availability', 
      impact: 'Low', 
      affected: 8, 
      trend: 'stable',
      description: 'Minor crew scheduling conflicts'
    }
  ]

  const upcomingPredictions = [
    {
      id: 1,
      flightNumber: 'FZ101',
      route: 'DXB → LHR',
      riskLevel: 'High',
      probability: 85,
      predictedDelay: 45,
      category: 'Weather',
      description: 'Heavy fog expected at LHR during arrival window'
    },
    {
      id: 2,
      flightNumber: 'FZ205',
      route: 'DXB → BOM',
      riskLevel: 'Medium',
      probability: 62,
      predictedDelay: 25,
      category: 'ATC',
      description: 'ATC congestion during peak hours'
    }
  ]

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200'
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <ArrowUp className="h-4 w-4 text-red-500" />
      case 'down': return <ArrowDown className="h-4 w-4 text-green-500" />
      default: return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Disruption Prediction Dashboard</h2>
          <p className="text-gray-600">AI-powered disruption forecasting and risk analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">24 Hours</SelectItem>
              <SelectItem value="48h">48 Hours</SelectItem>
              <SelectItem value="7d">7 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Prediction Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Predictions</p>
                <p className="text-2xl font-bold">{predictionStats.totalPredictions}</p>
              </div>
              <Brain className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Risk</p>
                <p className="text-2xl font-bold text-red-600">{predictionStats.highRisk}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Accuracy</p>
                <p className="text-2xl font-bold text-green-600">{predictionStats.accuracy}%</p>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cost Savings</p>
                <p className="text-2xl font-bold text-blue-600">${predictionStats.costSavings}M</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Factors and Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Factors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Current Risk Factors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {riskFactors.map((factor) => (
              <div key={factor.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{factor.name}</h4>
                  <div className="flex items-center gap-2">
                    <Badge className={getRiskColor(factor.impact)}>
                      {factor.impact}
                    </Badge>
                    {getTrendIcon(factor.trend)}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{factor.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Affected Flights:</span>
                  <span className="font-medium">{factor.affected}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Predictions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Upcoming Predictions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingPredictions.map((prediction) => (
              <div key={prediction.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Plane className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{prediction.flightNumber}</span>
                    <span className="text-gray-500">({prediction.route})</span>
                  </div>
                  <Badge className={getRiskColor(prediction.riskLevel)}>
                    {prediction.riskLevel}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{prediction.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Probability:</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress value={prediction.probability} className="flex-1" />
                      <span className="font-medium">{prediction.probability}%</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Predicted Delay:</span>
                    <div className="font-medium mt-1">{prediction.predictedDelay} min</div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Prediction Analytics */}
      <Tabs defaultValue="trends" className="w-full">
        <TabsList>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Prediction Trends (Last 30 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">94.2%</div>
                    <div className="text-sm text-blue-800">Average Accuracy</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">6.2h</div>
                    <div className="text-sm text-green-800">Average Lead Time</div>
                  </div>
                </div>
                <Alert>
                  <TrendingUp className="h-4 w-4" />
                  <AlertDescription>
                    Prediction accuracy has improved by 3.2% this month due to enhanced weather data integration.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Model Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Weather Predictions</span>
                      <span className="text-sm font-medium">96.1%</span>
                    </div>
                    <Progress value={96.1} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Technical Issues</span>
                      <span className="text-sm font-medium">89.3%</span>
                    </div>
                    <Progress value={89.3} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">ATC Delays</span>
                      <span className="text-sm font-medium">91.7%</span>
                    </div>
                    <Progress value={91.7} />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Crew Issues</span>
                      <span className="text-sm font-medium">88.2%</span>
                    </div>
                    <Progress value={88.2} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Airport Congestion</span>
                      <span className="text-sm font-medium">93.4%</span>
                    </div>
                    <Progress value={93.4} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Maintenance</span>
                      <span className="text-sm font-medium">85.9%</span>
                    </div>
                    <Progress value={85.9} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="space-y-3">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>High Risk:</strong> Severe weather system approaching LHR - 12 flights at risk in next 6 hours
              </AlertDescription>
            </Alert>
            <Alert>
              <Zap className="h-4 w-4" />
              <AlertDescription>
                <strong>Medium Risk:</strong> ATC staffing shortage at JFK - potential delays for evening departures
              </AlertDescription>
            </Alert>
            <Alert>
              <Activity className="h-4 w-4" />
              <AlertDescription>
                <strong>Info:</strong> Model retraining completed - improved accuracy expected for next 24h predictions
              </AlertDescription>
            </Alert>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}