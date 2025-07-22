'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Progress } from './ui/progress'
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Clock, 
  Target, 
  AlertTriangle,
  CheckCircle,
  Download,
  RefreshCw,
  BarChart3,
  Calendar,
  DollarSign
} from 'lucide-react'

export function PredictionAnalytics() {
  const [timeframe, setTimeframe] = useState('7d')
  const [metric, setMetric] = useState('accuracy')

  const performanceMetrics = {
    totalPredictions: 1247,
    accuracyRate: 92.4,
    falsePositives: 3.2,
    falseNegatives: 4.4,
    avgLeadTime: 6.8,
    costSavings: 2340000
  }

  const causeAnalysis = [
    { cause: 'Weather', predictions: 456, accuracy: 94.2, impact: 'Very High', trend: 'increasing' },
    { cause: 'Maintenance', predictions: 298, accuracy: 91.7, impact: 'High', trend: 'stable' },
    { cause: 'Air Traffic Control', predictions: 223, accuracy: 89.4, impact: 'Medium', trend: 'decreasing' },
    { cause: 'Crew Issues', predictions: 145, accuracy: 87.8, impact: 'Medium', trend: 'stable' },
    { cause: 'Ground Operations', predictions: 89, accuracy: 85.3, impact: 'Low', trend: 'increasing' },
    { cause: 'Technical Issues', predictions: 67, accuracy: 90.1, impact: 'High', trend: 'stable' }
  ]

  const routePerformance = [
    { route: 'JFK-DXB', predictions: 45, accuracy: 95.6, avgLeadTime: 7.2, costSaved: 245000 },
    { route: 'LHR-DXB', predictions: 38, accuracy: 92.1, avgLeadTime: 6.8, costSaved: 198000 },
    { route: 'LAX-DXB', predictions: 31, accuracy: 89.7, avgLeadTime: 5.9, costSaved: 167000 },
    { route: 'DXB-SIN', predictions: 28, accuracy: 94.3, avgLeadTime: 6.4, costSaved: 145000 },
    { route: 'FRA-DXB', predictions: 24, accuracy: 88.9, avgLeadTime: 5.5, costSaved: 123000 }
  ]

  const timePerformance = [
    { timeSlot: '00:00-06:00', predictions: 89, accuracy: 94.4, avgDelay: 45 },
    { timeSlot: '06:00-12:00', predictions: 198, accuracy: 91.2, avgDelay: 67 },
    { timeSlot: '12:00-18:00', predictions: 234, accuracy: 90.8, avgDelay: 72 },
    { timeSlot: '18:00-24:00', predictions: 156, accuracy: 93.6, avgDelay: 58 }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-flydubai-navy">Prediction Analytics</h2>
          <p className="text-muted-foreground">AI model performance and disruption prediction insights</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button className="btn-flydubai-primary">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-flydubai-blue" />
              <h4 className="text-sm font-medium">Total Predictions</h4>
            </div>
            <p className="text-2xl font-semibold">{performanceMetrics.totalPredictions.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Last {timeframe}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <h4 className="text-sm font-medium">Accuracy Rate</h4>
            </div>
            <p className="text-2xl font-semibold">{performanceMetrics.accuracyRate}%</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">+2.1%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <h4 className="text-sm font-medium">False Positives</h4>
            </div>
            <p className="text-2xl font-semibold">{performanceMetrics.falsePositives}%</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingDown className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">-0.8%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-red-600" />
              <h4 className="text-sm font-medium">False Negatives</h4>
            </div>
            <p className="text-2xl font-semibold">{performanceMetrics.falseNegatives}%</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingDown className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">-1.2%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-flydubai-blue" />
              <h4 className="text-sm font-medium">Avg Lead Time</h4>
            </div>
            <p className="text-2xl font-semibold">{performanceMetrics.avgLeadTime}h</p>
            <p className="text-xs text-muted-foreground">Before disruption</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              <h4 className="text-sm font-medium">Cost Savings</h4>
            </div>
            <p className="text-2xl font-semibold">AED {(performanceMetrics.costSavings / 1000000).toFixed(1)}M</p>
            <p className="text-xs text-muted-foreground">From predictions</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="causes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="causes">Disruption Causes</TabsTrigger>
          <TabsTrigger value="routes">Route Performance</TabsTrigger>
          <TabsTrigger value="time">Time Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="causes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Prediction Accuracy by Disruption Cause</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cause</TableHead>
                    <TableHead>Predictions</TableHead>
                    <TableHead>Accuracy</TableHead>
                    <TableHead>Impact Level</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {causeAnalysis.map((cause, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{cause.cause}</TableCell>
                      <TableCell>{cause.predictions}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={cause.accuracy} className="w-16 h-2" />
                          <span className="text-sm">{cause.accuracy}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          cause.impact === 'Very High' ? 'bg-red-100 text-red-800' :
                          cause.impact === 'High' ? 'bg-orange-100 text-orange-800' :
                          cause.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }>
                          {cause.impact}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {cause.trend === 'increasing' ? (
                            <TrendingUp className="h-4 w-4 text-red-600" />
                          ) : cause.trend === 'decreasing' ? (
                            <TrendingDown className="h-4 w-4 text-green-600" />
                          ) : (
                            <Activity className="h-4 w-4 text-gray-600" />
                          )}
                          <span className="text-sm capitalize">{cause.trend}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Route-Specific Prediction Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Route</TableHead>
                    <TableHead>Predictions</TableHead>
                    <TableHead>Accuracy</TableHead>
                    <TableHead>Avg Lead Time</TableHead>
                    <TableHead>Cost Saved</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {routePerformance.map((route, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{route.route}</TableCell>
                      <TableCell>{route.predictions}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={route.accuracy} className="w-16 h-2" />
                          <span className="text-sm">{route.accuracy}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{route.avgLeadTime}h</TableCell>
                      <TableCell className="font-medium text-green-600">
                        AED {(route.costSaved / 1000).toFixed(0)}K
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="time" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Time-Based Prediction Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time Slot</TableHead>
                    <TableHead>Predictions</TableHead>
                    <TableHead>Accuracy</TableHead>
                    <TableHead>Avg Delay</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timePerformance.map((slot, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{slot.timeSlot}</TableCell>
                      <TableCell>{slot.predictions}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={slot.accuracy} className="w-16 h-2" />
                          <span className="text-sm">{slot.accuracy}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{slot.avgDelay} min</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}