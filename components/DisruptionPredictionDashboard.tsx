'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Alert, AlertDescription } from './ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  Brain, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  Plane, 
  CloudRain, 
  Wrench, 
  Users,
  Target,
  Activity,
  Zap,
  ArrowUp,
  ArrowDown,
  Calendar,
  RefreshCw
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
      description: 'Severe thunderstorms predicted at JFK, LGA',
