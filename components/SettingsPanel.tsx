'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Switch } from './ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Alert, AlertDescription } from './ui/alert'
import { Checkbox } from './ui/checkbox'
import { Slider } from './ui/slider'
import { Textarea } from './ui/textarea'
import { Separator } from './ui/separator'
import { 
  Settings, 
  Monitor, 
  Save, 
  RotateCcw, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  Users,
  Plus,
  Edit,
  Trash2,
  Shield,
  UserPlus,
  UserCheck,
  Lock,
  Unlock,
  Mail,
  Phone,
  Building,
  Globe,
  Brain,
  Zap,
  Clock,
  DollarSign,
  Target,
  AlertCircle,
  TrendingUp,
  Plane,
  Scale,
  ShieldCheck,
  ShieldAlert,
  Ban,
  CheckSquare,
  XCircle,
  FileCheck,
  Gavel
} from 'lucide-react'

export function SettingsPanel({ screenSettings, onScreenSettingsChange }) {
  const [localSettings, setLocalSettings] = useState(screenSettings)
  const [hasChanges, setHasChanges] = useState(false)
  const [showAddUserDialog, setShowAddUserDialog] = useState(false)
  
  const [recoveryConfig, setRecoveryConfig] = useState({
    aircraftSelection: {
      typeMatch: 85,
      proximity: 70,
      maintenanceOK: 95,
      fuelEfficiency: 60,
      utilization: 50,
      availability: 90,
      configurationMatch: 80
    },
    crewAssignment: {
      qualifications: 95,
      availability: 90,
      dutyTimeCompliance: 100,
      experienceLevel: 65,
      routeFamiliarity: 70,
      pairingHistory: 45,
      fatigueLevel: 85,
      baseLocation: 60
    },
    recoveryOptions: {
      costImpact: 75,
      timelineEfficiency: 80,
      passengerImpact: 85,
      networkEffect: 70,
      crewImpact: 75,
      revenueProtection: 65,
      complianceRisk: 95,
      customerSatisfaction: 80,
      rebookingComplexity: 55
    }
  })

  const [users, setUsers] = useState([
    {
      id: 'usr-001',
      name: 'John Smith',
      email: 'john.smith@flydubai.com',
      role: 'Operations Manager',
      department: 'Flight Operations',
      phone: '+971 (4) 212-4567',
      status: 'active',
      lastLogin: '2025-01-10 14:30',
      createdAt: '2025-05-15',
      assignedScreens: ['dashboard', 'flight-tracking', 'disruption', 'recovery', 'comparison', 'detailed', 'prediction-dashboard', 'flight-disruption-list', 'pending', 'past-logs', 'passengers', 'reports'],
      permissions: {
        canManageUsers: false,
        canModifySettings: true,
        canViewReports: true,
        canExecuteRecovery: true
      }
    },
    {
      id: 'usr-002',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@flydubai.com',
      role: 'System Administrator',
      department: 'IT Operations',
      phone: '+971 (4) 212-6543',
      status: 'active',
      lastLogin: '2025-01-10 13:45',
      createdAt: '2025-04-20',
      assignedScreens: ['dashboard', 'settings', 'audit', 'reports', 'maintenance', 'fuel-optimization', 'prediction-dashboard', 'prediction-analytics'],
      permissions: {
        canManageUsers: true,
        canModifySettings: true,
        canViewReports: true,
        canExecuteRecovery: false
      }
    }
  ])

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    phone: '',
    assignedScreens: [],
    permissions: {
      canManageUsers: false,
      canModifySettings: false,
      canViewReports: false,
      canExecuteRecovery: false
    }
  })

  const categories = {
    main: { name: 'Main', color: 'text-flydubai-blue' },
    operations: { name: 'Operations', color: 'text-flydubai-blue' },
    prediction: { name: 'Prediction', color: 'text-flydubai-navy' },
    monitoring: { name: 'Monitoring', color: 'text-flydubai-navy' },
    services: { name: 'Services', color: 'text-flydubai-blue' },
    analytics: { name: 'Analytics', color: 'text-flydubai-navy' },
    system: { name: 'System', color: 'text-gray-600' }
  }

  const handleSettingChange = (screenId, enabled) => {
    const newSettings = localSettings.map(screen => 
      screen.id === screenId ? { ...screen, enabled } : screen
    )
    setLocalSettings(newSettings)
    setHasChanges(true)
  }

  const handleSaveChanges = () => {
    onScreenSettingsChange(localSettings)
    setHasChanges(false)
  }

  const handleResetChanges = () => {
    setLocalSettings(screenSettings)
    setHasChanges(false)
  }

  const handleRecoveryConfigChange = (category, criterion, value) => {
    setRecoveryConfig(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [criterion]: value[0]
      }
    }))
    setHasChanges(true)
  }

  const resetRecoveryConfig = () => {
    setRecoveryConfig({
      aircraftSelection: {
        typeMatch: 85,
        proximity: 70,
        maintenanceOK: 95,
        fuelEfficiency: 60,
        utilization: 50,
        availability: 90,
        configurationMatch: 80
      },
      crewAssignment: {
        qualifications: 95,
        availability: 90,
        dutyTimeCompliance: 100,
        experienceLevel: 65,
        routeFamiliarity: 70,
        pairingHistory: 45,
        fatigueLevel: 85,
        baseLocation: 60
      },
      recoveryOptions: {
        costImpact: 75,
        timelineEfficiency: 80,
        passengerImpact: 85,
        networkEffect: 70,
        crewImpact: 75,
        revenueProtection: 65,
        complianceRisk: 95,
        customerSatisfaction: 80,
        rebookingComplexity: 55
      }
    })
    setHasChanges(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">System Settings</h2>
          <p className="text-muted-foreground">Configure AERON system preferences and user access</p>
        </div>
        
        {hasChanges && (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleResetChanges}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button onClick={handleSaveChanges}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <Tabs defaultValue="screens" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="screens" className="flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            Screen Management
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            User Management
          </TabsTrigger>
          <TabsTrigger value="recovery-config" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Recovery Configuration
          </TabsTrigger>
          <TabsTrigger value="passenger-priority" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            Passenger Priority
          </TabsTrigger>
          <TabsTrigger value="rules" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Rules Configuration
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            General
          </TabsTrigger>
        </TabsList>

        <TabsContent value="screens">
          <ScreenManagementTab
            localSettings={localSettings}
            categories={categories}
            onSettingChange={handleSettingChange}
          />
        </TabsContent>

        <TabsContent value="users">
          <UserManagementTab users={users} />
        </TabsContent>

        <TabsContent value="recovery-config">
          <RecoveryConfigurationTab
            recoveryConfig={recoveryConfig}
            onConfigChange={handleRecoveryConfigChange}
            onReset={resetRecoveryConfig}
          />
        </TabsContent>

        <TabsContent value="passenger-priority">
          <PassengerPriorityTab />
        </TabsContent>

        <TabsContent value="rules">
          <RulesConfigurationTab />
        </TabsContent>

        <TabsContent value="security">
          <SecurityTab />
        </TabsContent>

        <TabsContent value="general">
          <GeneralTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function RecoveryConfigurationTab({ recoveryConfig, onConfigChange, onReset }) {
  const criteriaDescriptions = {
    aircraftSelection: {
      typeMatch: "Prioritize same aircraft type (A320 → A320) for seamless operations",
      proximity: "Prefer aircraft at same airport or nearby locations",
      maintenanceOK: "Ensure aircraft maintenance status and airworthiness",
      fuelEfficiency: "Consider fuel consumption characteristics for route",
      utilization: "Balance aircraft utilization across fleet",
      availability: "Aircraft immediately available for assignment",
      configurationMatch: "Match seat configuration and cabin layout"
    },
    crewAssignment: {
      qualifications: "Crew certified for aircraft type and route requirements",
      availability: "Crew available within required timeframe",
      dutyTimeCompliance: "Adherence to flight duty time regulations",
      experienceLevel: "Crew experience on aircraft type and routes",
      routeFamiliarity: "Previous experience on specific route",
      pairingHistory: "Successful previous pairing combinations",
      fatigueLevel: "Current crew fatigue and rest compliance",
      baseLocation: "Crew base location and positioning costs"
    },
    recoveryOptions: {
      costImpact: "Total financial impact of recovery solution",
      timelineEfficiency: "Speed of implementation and resolution",
      passengerImpact: "Effect on passenger experience and satisfaction",
      networkEffect: "Impact on broader network operations",
      crewImpact: "Effect on crew schedules and compliance",
      revenueProtection: "Protection of revenue and seat sales",
      complianceRisk: "Regulatory and legal compliance risks",
      customerSatisfaction: "Long-term customer relationship impact",
      rebookingComplexity: "Difficulty of passenger reaccommodation"
    }
  }

  const formatCriterionName = (key) => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'aircraftSelection': return <Plane className="h-5 w-5" />
      case 'crewAssignment': return <Users className="h-5 w-5" />
      case 'recoveryOptions': return <Target className="h-5 w-5" />
      default: return <Settings className="h-5 w-5" />
    }
  }

  const getCategoryTitle = (category) => {
    switch (category) {
      case 'aircraftSelection': return 'Aircraft Selection Criteria'
      case 'crewAssignment': return 'Crew Assignment Criteria' 
      case 'recoveryOptions': return 'Recovery Options Ranking'
      default: return category
    }
  }

  const getCategoryDescription = (category) => {
    switch (category) {
      case 'aircraftSelection': return 'Configure how AERON prioritizes aircraft when selecting alternatives for recovery operations'
      case 'crewAssignment': return 'Set weightings for crew selection criteria to optimize crew assignments during disruptions'
      case 'recoveryOptions': return 'Define how recovery options are ranked and presented based on various impact factors'
      default: return ''
    }
  }

  const getWeightageColor = (value) => {
    if (value >= 80) return 'text-green-600'
    if (value >= 60) return 'text-blue-600'
    if (value >= 40) return 'text-yellow-600'
    return 'text-orange-600'
  }

  const getWeightageBackground = (value) => {
    if (value >= 80) return 'bg-green-50 border-green-200'
    if (value >= 60) return 'bg-blue-50 border-blue-200'
    if (value >= 40) return 'bg-yellow-50 border-yellow-200'
    return 'bg-orange-50 border-orange-200'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-flydubai-navy">Recovery Algorithm Configuration</h3>
          <p className="text-sm text-muted-foreground">
            Configure weightage algorithms for aircraft selection, crew assignment, and recovery option ranking
          </p>
        </div>
        <Button variant="outline" onClick={onReset} className="border-flydubai-orange text-flydubai-orange hover:bg-orange-50">
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset to Defaults
        </Button>
      </div>

      <Alert className="border-flydubai-blue bg-blue-50">
        <Info className="h-4 w-4 text-flydubai-blue" />
        <AlertDescription className="text-blue-800">
          <strong>Weightage System:</strong> Higher values (80-100) indicate critical importance, 
          medium values (40-79) show moderate importance, and lower values (0-39) represent minimal consideration.
          All criteria work together to determine the best recommendations.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        {Object.entries(recoveryConfig).map(([category, criteria]) => (
          <Card key={category} className="border-flydubai-blue">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-flydubai-navy">
                {getCategoryIcon(category)}
                {getCategoryTitle(category)}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {getCategoryDescription(category)}
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {Object.entries(criteria).map(([criterion, value]) => (
                  <div key={criterion} className={`p-4 rounded-lg border-2 ${getWeightageBackground(value)}`}>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h4 className="font-medium text-flydubai-navy">{formatCriterionName(criterion)}</h4>
                            <Badge className={`${getWeightageColor(value)} border-current bg-transparent`}>
                              {value >= 80 ? 'Critical' : value >= 60 ? 'High' : value >= 40 ? 'Medium' : 'Low'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {criteriaDescriptions[category][criterion]}
                          </p>
                        </div>
                        <div className="flex items-center gap-4 min-w-32">
                          <div className={`text-right ${getWeightageColor(value)}`}>
                            <div className="text-2xl font-bold">{value}</div>
                            <div className="text-xs">Weight</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Not Important</span>
                          <span>Critical</span>
                        </div>
                        <Slider
                          value={[value]}
                          onValueChange={(newValue) => onConfigChange(category, criterion, newValue)}
                          max={100}
                          min={0}
                          step={5}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>0</span>
                          <span>25</span>
                          <span>50</span>
                          <span>75</span>
                          <span>100</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-flydubai-navy mb-3">Configuration Summary</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">
                      {Object.values(criteria).filter(v => v >= 80).length}
                    </div>
                    <div className="text-muted-foreground">Critical</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">
                      {Object.values(criteria).filter(v => v >= 60 && v < 80).length}
                    </div>
                    <div className="text-muted-foreground">High</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-yellow-600">
                      {Object.values(criteria).filter(v => v >= 40 && v < 60).length}
                    </div>
                    <div className="text-muted-foreground">Medium</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">
                      {Object.values(criteria).filter(v => v < 40).length}
                    </div>
                    <div className="text-muted-foreground">Low</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-flydubai-light border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-flydubai-blue">
            <Brain className="h-5 w-5" />
            Algorithm Impact Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(recoveryConfig).map(([category, criteria]) => {
              const avgWeight = Math.round(Object.values(criteria).reduce((a, b) => a + b, 0) / Object.values(criteria).length)
              const criticalCount = Object.values(criteria).filter(v => v >= 80).length
              
              return (
                <div key={category} className="text-center p-4 bg-white rounded-lg border border-blue-200">
                  <div className="mb-3">{getCategoryIcon(category)}</div>
                  <h4 className="font-medium text-flydubai-navy mb-2">{getCategoryTitle(category)}</h4>
                  <div className="space-y-2">
                    <div>
                      <div className="text-2xl font-bold text-flydubai-blue">{avgWeight}</div>
                      <div className="text-xs text-muted-foreground">Avg Weight</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-green-600">{criticalCount}</div>
                      <div className="text-xs text-muted-foreground">Critical Factors</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          
          <Separator className="my-6" />
          
          <div className="text-center">
            <h4 className="font-medium text-flydubai-navy mb-2">Current Configuration Impact</h4>
            <p className="text-sm text-muted-foreground">
              Based on your weightage settings, AERON will prioritize{' '}
              <span className="font-medium text-flydubai-blue">
                {Object.entries(recoveryConfig).reduce((acc, [category, criteria]) => {
                  const topCriterion = Object.entries(criteria).reduce((a, b) => a[1] > b[1] ? a : b)
                  return [...acc, formatCriterionName(topCriterion[0])]
                }, []).join(', ')}
              </span>{' '}
              when generating recovery recommendations.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ScreenManagementTab({ localSettings, categories, onSettingChange }) {
  return (
    <div className="space-y-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Enable or disable specific screens for all users. Users can only be assigned to enabled screens.
          Required screens cannot be disabled.
        </AlertDescription>
      </Alert>

      {Object.entries(categories).map(([categoryKey, category]) => {
        const categoryScreens = localSettings.filter(screen => screen.category === categoryKey)
        
        return (
          <Card key={categoryKey}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${category.color}`}>
                {category.name} Screens
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryScreens.map(screen => {
                  const Icon = screen.icon
                  return (
                    <div key={screen.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{screen.name}</p>
                          <p className="text-sm text-muted-foreground capitalize">
                            {screen.category} • {screen.id}
                            {screen.required && ' • Required'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {screen.enabled && (
                          <Badge className="bg-green-100 text-green-700">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Enabled
                          </Badge>
                        )}
                        {!screen.enabled && (
                          <Badge variant="outline" className="text-muted-foreground">
                            Disabled
                          </Badge>
                        )}
                        <Switch 
                          checked={screen.enabled}
                          onCheckedChange={(checked) => onSettingChange(screen.id, checked)}
                          disabled={screen.required}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

function UserManagementTab({ users }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">User Accounts</h3>
          <p className="text-sm text-muted-foreground">
            Manage user accounts and their access permissions
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Add New User
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role & Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.role}</p>
                      <p className="text-sm text-muted-foreground">{user.department}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }>
                      {user.status === 'active' ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Active
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Inactive
                        </>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{user.lastLogin}</p>
                      <p className="text-xs text-muted-foreground">Created: {user.createdAt}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Lock className="h-4 w-4" />
                      </Button>
                    </div>
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

function PassengerPriorityTab() {
  return (
    <div className="space-y-6">
      <Alert>
        <UserCheck className="h-4 w-4" />
        <AlertDescription>
          Configure passenger prioritization rules and weighting factors. Changes affect how passengers are ranked during disruptions and rebooking scenarios.
        </AlertDescription>
      </Alert>
      <Card>
        <CardHeader>
          <CardTitle>Passenger Priority Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Passenger priority settings will be configured here.</p>
        </CardContent>
      </Card>
    </div>
  )
}

function RulesConfigurationTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Rules Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Business rules and constraints will be configured here.</p>
        </CardContent>
      </Card>
    </div>
  )
}

function SecurityTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Require 2FA for all users</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <Label>Session Timeout</Label>
              <p className="text-sm text-muted-foreground">Automatic logout after inactivity</p>
            </div>
            <Select defaultValue="30">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="240">4 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function GeneralTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>System Timezone</Label>
            <Select defaultValue="utc">
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                <SelectItem value="gmt">GMT (Greenwich Mean Time)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Default Language</Label>
            <Select defaultValue="en">
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}