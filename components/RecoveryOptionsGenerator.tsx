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
        return getCurfewCongestionRecovery()
      case 'Rotation misalignment or maintenance hold':
        return getRotationMisalignmentRecovery()
      default:
        return getAircraftIssueRecovery() // Default fallback
    }
  }

  // Aircraft Issue Recovery - 8-Step Process
  const getAircraftIssueRecovery = () => {
    return {
      title: 'Aircraft Issue Recovery (AOG)',
      description: 'A6-FDB hydraulics failure - Ground Stop Required',
      icon: Wrench,
      priority: 'CRITICAL',
      estimatedTime: '4-6 hours',
      steps: [
        {
          step: 1,
          title: 'Ground Alert Triggered in AMOS',
          status: 'completed',
          timestamp: '14:15:00',
          system: 'AMOS MRO System',
          details: 'Hydraulic system warning detected - Aircraft A6-FDB grounded',
          data: {
            alertType: 'Hydraulic System Failure',
            severity: 'Ground Stop Required',
            amosRef: 'AMOS-2025-0110-FDB-001',
            location: 'DXB Gate A12'
          }
        },
        {
          step: 2,
          title: 'Assess Estimated Repair Time',
          status: 'completed',
          timestamp: '14:18:00',
          system: 'Maintenance Planning',
          details: 'ETA from maintenance: 4-6 hours, parts available',
          data: {
            estimatedRepair: '4-6 hours',
            partsAvailable: 'Yes - In stock at DXB',
            engineerAssigned: 'Lead Hydraulics Specialist',
            completionETA: '20:30 GST'
          }
        },
        {
          step: 3,
          title: 'Generate Rotation Impact Tree',
          status: 'completed',
          timestamp: '14:20:00',
          system: 'AERON Analytics',
          details: 'Analyzing downstream flights and overnight implications',
          data: {
            affectedFlights: 3,
            totalPassengers: 456,
            revenueImpact: 'AED 890K',
            curfewBreaches: 'None identified',
            overnightImplications: 'DEL turnaround affected'
          }
        },
        {
          step: 4,
          title: 'Identify Alternative Aircraft',
          status: 'completed',
          timestamp: '14:22:00',
          system: 'Aircraft Optimizer',
          details: 'Same type & config, available and ferryable aircraft found',
          data: {
            sameType: 'A320-200 (3 available)',
            bestOption: 'A6-FDC - Available at Gate A8',
            secondOption: 'A6-FDH - Arriving 15:45',
            compatibility: '100% passenger configuration match'
          }
        },
        {
          step: 5,
          title: 'Evaluate Options',
          status: 'completed',
          timestamp: '14:25:00',
          system: 'Decision Engine',
          details: 'Swap aircraft vs delay vs cancel analysis complete',
          data: {
            swapCost: 'AED 45,000 (Recommended)',
            delayCost: 'AED 180,000',
            cancelCost: 'AED 520,000',
            recommendation: 'Aircraft Swap - A6-FDC'
          }
        },
        {
          step: 6,
          title: 'Adjust Crew Pairing',
          status: 'completed',
          timestamp: '14:27:00',
          system: 'Crew Management',
          details: 'Crew readiness verified for replacement aircraft',
          data: {
            crewAction: 'Transfer to A6-FDC',
            briefingRequired: '15 minutes',
            dutyTimeImpact: '+1.25 hours (within limits)',
            positioning: 'Gate A12 → A8'
          }
        },
        {
          step: 7,
          title: 'Notify Stakeholders',
          status: 'completed',
          timestamp: '14:30:00',
          system: 'Communication Hub',
          details: 'All stakeholders notified and passenger communications sent',
          data: {
            crewNotified: '✓ CrewApp + SMS',
            stationsNotified: '✓ DXB Ops, DEL Station',
            pssNotified: '✓ Amadeus, DCS Updated',
            passengersNotified: '456 passengers - 75min delay'
          }
        },
        {
          step: 8,
          title: 'Recalculate Rotations',
          status: 'completed',
          timestamp: '14:35:00',
          system: 'Network Optimizer',
          details: 'Downstream rotations and maintenance status updated',
          data: {
            rotationImpact: 'Minimal network disruption',
            maintenanceUpdated: 'A6-FDC schedule adjusted',
            costSavings: '88% vs cancellation',
            networkOptimization: 'Complete'
          }
        }
      ],
      options: [
        {
          id: 'SWAP_A6FDC',
          title: 'Aircraft Swap - A6-FDC',
          description: 'Immediate tail swap with available A320',
          cost: 'AED 45,000',
          timeline: '75 minutes',
          confidence: 95,
          impact: 'Minimal passenger disruption',
          status: 'recommended',
          rotationPlan: {
            originalPlan: [
              { flight: 'FZ445', aircraft: 'A6-FDB', time: '15:30-19:15', status: 'affected' },
              { flight: 'FZ446', aircraft: 'A6-FDB', time: '20:45-00:30+1', status: 'affected' },
              { flight: 'FZ447', aircraft: 'A6-FDB', time: '02:15+1-06:00+1', status: 'affected' }
            ],
            newPlan: [
              { flight: 'FZ445', aircraft: 'A6-FDC', time: '16:45-20:30', status: 'swapped' },
              { flight: 'FZ446', aircraft: 'A6-FDC', time: '22:00-01:45+1', status: 'swapped' },
              { flight: 'FZ447', aircraft: 'A6-FDC', time: '03:30+1-07:15+1', status: 'swapped' }
            ],
            advantages: [
              'Same aircraft type - no passenger impact',
              'A6-FDC available immediately',
              'Maintains 97% of schedule integrity',
              'No overnight accommodation needed'
            ],
            considerations: [
              'A6-FDC delayed for its next flight by 60 minutes',
              'Crew briefing required for aircraft change',
              'Passenger transfer time: 30 minutes'
            ]
          }
        },
        {
          id: 'DELAY_REPAIR',
          title: 'Delay for Repair Completion',
          description: 'Wait for A6-FDB hydraulics system repair',
          cost: 'AED 180,000',
          timeline: '4-6 hours',
          confidence: 45,
          impact: 'Significant passenger disruption',
          status: 'caution',
          rotationPlan: {
            originalPlan: [
              { flight: 'FZ445', aircraft: 'A6-FDB', time: '15:30-19:15', status: 'affected' },
              { flight: 'FZ446', aircraft: 'A6-FDB', time: '20:45-00:30+1', status: 'affected' },
              { flight: 'FZ447', aircraft: 'A6-FDB', time: '02:15+1-06:00+1', status: 'affected' }
            ],
            newPlan: [
              { flight: 'FZ445', aircraft: 'A6-FDB', time: '20:30-00:15+1', status: 'delayed' },
              { flight: 'FZ446', aircraft: 'A6-FDB', time: '01:45+1-05:30+1', status: 'delayed' },
              { flight: 'FZ447', aircraft: 'A6-FDB', time: '07:15+1-11:00+1', status: 'delayed' }
            ],
            advantages: [
              'Original aircraft maintained',
              'No aircraft swap complexity',
              'Lower immediate operational costs'
            ],
            considerations: [
              'Repair ETA uncertain (4-6 hours)',
              'Massive passenger accommodation needed',
              'Cascade delays to next day operations',
              'Crew rest period management required'
            ]
          }
        },
        {
          id: 'CANCEL_REBOOK',
          title: 'Cancel and Rebook',
          description: 'Cancel FZ445 and rebook on partner airlines',
          cost: 'AED 520,000',
          timeline: 'Immediate',
          confidence: 75,
          impact: 'Complete route cancellation',
          status: 'warning',
          rotationPlan: {
            originalPlan: [
              { flight: 'FZ445', aircraft: 'A6-FDB', time: '15:30-19:15', status: 'affected' },
              { flight: 'FZ446', aircraft: 'A6-FDB', time: '20:45-00:30+1', status: 'affected' },
              { flight: 'FZ447', aircraft: 'A6-FDB', time: '02:15+1-06:00+1', status: 'affected' }
            ],
            newPlan: [
              { flight: 'FZ445', aircraft: 'CANCELLED', time: 'CANCELLED', status: 'cancelled' },
              { flight: 'FZ446', aircraft: 'A6-FDB', time: '20:45-00:30+1', status: 'normal' },
              { flight: 'FZ447', aircraft: 'A6-FDB', time: '02:15+1-06:00+1', status: 'normal' }
            ],
            advantages: [
              'Stops cascade disruption immediately',
              'Preserves downstream rotation',
              'Quick passenger rebooking process',
              'No crew duty time issues'
            ],
            considerations: [
              'Complete revenue loss for sector',
              'High passenger compensation costs',
              'Customer satisfaction impact',
              'Network connectivity gap'
            ]
          }
        }
      ]
    }
  }

  // Crew Issue Recovery - 6-Step Process
  const getCrewIssueRecovery = () => {
    return {
      title: 'Crew Issue Recovery',
      description: `${flight?.flightNumber} - Crew duty time breach - Unable to operate`,
      icon: Users,
      priority: 'HIGH',
      estimatedTime: '15-30 minutes',
      steps: [
        {
          step: 1,
          title: 'Crew Control Notified via AIMS',
          status: 'completed',
          timestamp: '13:45:00',
          system: 'AIMS Crew System',
          details: `Crew duty time breach detected for ${flight?.flightNumber}`,
          data: {
            flightNumber: flight?.flightNumber,
            crewMember: 'Capt. Ahmed Al-Rashid',
            reason: 'Duty Time Breach - FDP Limit Exceeded',
            dutyStart: '14:00:00',
            reportTime: '13:45:00',
            currentFDP: '13.5 hours',
            maxFDP: '13.0 hours'
          }
        },
        {
          step: 2,
          title: 'System Checks Available Resources',
          status: 'completed',
          timestamp: '13:47:00',
          system: 'Crew Availability Engine',
          details: 'Standby crew, reserve crew, and deadhead options analyzed',
          data: {
            standbyAvailable: 'Capt. Mohammed Al-Zaabi (B737 qualified)',
            reserveAvailable: 'Capt. Sarah Thompson (B737 qualified)',
            deadheadOptions: 'Capt. Ali Ahmed (AUH base - 90 min positioning)',
            fdpLegality: 'All options within FDP limits',
            aircraftType: flight?.aircraft || 'B737-800',
            routeRequirements: `${flight?.origin}-${flight?.destination} qualified`
          }
        },
        {
          step: 3,
          title: 'Evaluate Crew Swap Options',
          status: 'completed',
          timestamp: '13:50:00',
          system: 'Crew Optimizer',
          details: 'Crew pairing compatibility and legal requirements assessed',
          data: {
            selectedCrew: 'Capt. Mohammed Al-Zaabi',
            pairingCompatibility: 'Excellent with F/O Hassan',
            legalCompliance: 'Full FDP compliance',
            experience: `3,250 hours ${flight?.aircraft || 'B737'}`,
            qualifications: 'ETOPS, Cat III, PBN qualified',
            lastRoute: `Last flown: ${flight?.origin}-BOM (similar route)`
          }
        },
        {
          step: 4,
          title: 'Update Crew Roster in AIMS',
          status: 'completed',
          timestamp: '13:52:00',
          system: 'AIMS Crew Management',
          details: 'Roster updated and notifications sent',
          data: {
            rosterUpdate: `Capt. Al-Zaabi → ${flight?.flightNumber}`,
            notifications: 'Crew notified via CrewApp',
            briefingTime: '13:55 (Extended for crew change)',
            dutyTime: '9.2 hours remaining FDP',
            originalCrew: 'Capt. Al-Rashid - duty time exceeded',
            newCrew: 'Capt. Al-Zaabi - fresh duty period'
          }
        },
        {
          step: 5,
          title: 'Backup Options Ready',
          status: 'standby',
          timestamp: '13:54:00',
          system: 'Contingency Planning',
          details: 'Alternative solutions prepared if primary fails',
          data: {
            backupOption1: 'Deadhead Capt. from AUH (90 min)',
            backupOption2: 'Delay flight 3 hours for crew rest',
            backupOption3: 'Partner airline crew (Emirates)',
            backupOption4: 'Crew discretion extension (if applicable)',
            contingencyDelay: '90-180 minutes maximum',
            regulatoryCompliance: 'All options GCAA compliant'
          }
        },
        {
          step: 6,
          title: 'Record Incident Impact',
          status: 'completed',
          timestamp: '14:00:00',
          system: 'Operations Log',
          details: 'Incident logged with minimal operational impact',
          data: {
            operationalImpact: 'Minimal - 30-minute delay',
            costImpact: 'AED 8,500 - Standby crew pay',
            passengerImpact: `${flight?.passengers} passengers - 30min delay`,
            regulatoryReport: 'FDP breach reported to GCAA',
            lessonsLearned: 'Crew rostering review required',
            connectionImpact: `${flight?.connectionFlights} connections protected`
          }
        }
      ],
      options: [
        {
          id: 'STANDBY_CREW',
          title: 'Assign Standby Crew',
          description: 'Capt. Mohammed Al-Zaabi from standby roster',
          cost: 'AED 8,500',
          timeline: '30 minutes',
          confidence: 92,
          impact: 'Minimal operational disruption',
          status: 'recommended',
          rotationPlan: {
            originalPlan: [
              { flight: flight?.flightNumber, crew: 'Capt. Al-Rashid + F/O Hassan', time: flight?.scheduledDeparture, status: 'crew_duty_breach' }
            ],
            newPlan: [
              { flight: flight?.flightNumber, crew: 'Capt. Al-Zaabi + F/O Hassan', time: flight?.scheduledDeparture, status: 'crew_swapped' }
            ],
            crewOfficerActions: [
              {
                action: 'Immediate Standby Crew Activation',
                timeline: '13:45-13:50 (5 minutes)',
                details: 'Contact Capt. Al-Zaabi via CrewApp emergency notification',
                responsibility: 'Duty Crew Manager',
                status: 'completed'
              },
              {
                action: 'Original Crew Duty Time Recording',
                timeline: '13:45-13:47 (2 minutes)',
                details: 'Log Capt. Al-Rashid FDP breach in AIMS - 13.5/13.0 hours',
                responsibility: 'Crew Administrator',
                status: 'completed'
              },
              {
                action: 'Cascade Analysis - Al-Zaabi Next Assignment',
                timeline: '13:47-13:52 (5 minutes)',
                details: 'Check standby crew next 48-hour schedule conflicts',
                responsibility: 'Crew Scheduler',
                status: 'completed'
              },
              {
                action: 'Rest Period Management',
                timeline: '13:52-13:55 (3 minutes)',
                details: 'Schedule Al-Rashid mandatory 12-hour rest period',
                responsibility: 'Crew Administrator',
                status: 'completed'
              },
              {
                action: 'Crew Positioning & Briefing',
                timeline: '13:55-14:15 (20 minutes)',
                details: 'Al-Zaabi crew room briefing + aircraft familiarization',
                responsibility: 'Training Coordinator',
                status: 'in_progress'
              },
              {
                action: 'Future Schedule Protection',
                timeline: '14:00-14:10 (10 minutes)',
                details: 'Protect Al-Zaabi 48-hour rotation from conflicts',
                responsibility: 'Senior Crew Planner',
                status: 'in_progress'
              }
            ],
            cascadeAnalysis: {
              affectedCrewMembers: [
                {
                  name: 'Capt. Al-Rashid',
                  currentStatus: 'Duty time exceeded - requires rest',
                  nextAssignment: 'FZ567 DXB-KHI tomorrow 08:00',
                  impact: 'Protected - sufficient rest period',
                  action: 'No further changes required'
                },
                {
                  name: 'Capt. Al-Zaabi (Standby)',
                  currentStatus: 'Activated from standby',
                  nextAssignment: 'FZ203 DXB-DEL tomorrow 16:45',
                  impact: 'Potential fatigue - monitor closely',
                  action: 'Consider backup crew for tomorrow'
                },
                {
                  name: 'F/O Hassan',
                  currentStatus: 'Continues with new captain',
                  nextAssignment: 'FZ182 COK-DXB tomorrow 20:30',
                  impact: 'No change - schedule maintained',
                  action: 'Monitor for pairing comfort'
                }
              ],
              downstreamEffects: {
                today: 'Zero additional disruptions',
                tomorrow: '1 potential crew shortage for FZ203',
                dayAfter: 'Al-Rashid returns to normal roster',
                weeklyImpact: 'Minimal - contained within 48 hours'
              }
            },
            costBreakdown: {
              standbyActivation: 'AED 2,500',
              briefingOvertimeCosts: 'AED 800',
              crewPositioning: 'AED 0 (local)',
              potentialBackupCrew: 'AED 5,200',
              totalImpact: 'AED 8,500',
              savings: 'AED 170,000 vs delay option'
            },
            advantages: [
              'Standby crew immediately available at DXB',
              `${flight?.aircraft} qualified and current ratings`,
              'Excellent pairing history with F/O Hassan',
              'Within all regulatory duty time limits',
              'ETOPS and route qualified for COK sector',
              'Minimal impact on future crew schedules'
            ],
            considerations: [
              'Extended briefing required (20 minutes)',
              'Standby crew pay activation costs',
              'AIMS roster update and notifications',
              '30-minute departure delay for crew change',
              'Original captain requires mandatory rest',
              'Monitor replacement crew fatigue levels'
            ]
          }
        },
        {
          id: 'DEADHEAD_CREW',
          title: 'Deadhead Crew from AUH',
          description: 'Position qualified Captain from Abu Dhabi',
          cost: 'AED 25,000',
          timeline: '120 minutes',
          confidence: 85,
          impact: 'Moderate schedule delay',
          status: 'caution',
          rotationPlan: {
            originalPlan: [
              { flight: flight?.flightNumber, crew: 'Capt. Al-Rashid + F/O Hassan', time: flight?.scheduledDeparture, status: 'crew_duty_breach' }
            ],
            newPlan: [
              { flight: flight?.flightNumber, crew: 'Capt. Ali Ahmed + F/O Hassan', time: '16:30-21:15', status: 'delayed_crew_positioning' }
            ],
            crewOfficerActions: [
              {
                action: 'AUH Crew Activation & Deadhead Arrangement',
                timeline: '13:45-13:55 (10 minutes)',
                details: 'Contact Capt. Ali Ahmed + arrange DXB positioning flight',
                responsibility: 'AUH Crew Base Manager',
                status: 'completed'
              },
              {
                action: 'Positioning Flight Coordination',
                timeline: '13:55-14:05 (10 minutes)',
                details: 'Book FZ1681 AUH-DXB 14:30 for crew positioning',
                responsibility: 'Crew Travel Coordinator',
                status: 'completed'
              },
              {
                action: 'Original Crew Schedule Protection',
                timeline: '14:05-14:15 (10 minutes)',
                details: 'Protect Al-Rashid tomorrow schedule + rest period',
                responsibility: 'Crew Administrator',
                status: 'completed'
              },
              {
                action: 'AUH Base Coverage Analysis',
                timeline: '14:15-14:25 (10 minutes)',
                details: 'Check AUH operations impact of Ali Ahmed removal',
                responsibility: 'AUH Crew Scheduler',
                status: 'in_progress'
              },
              {
                action: 'Passenger Connection Protection',
                timeline: '14:25-14:35 (10 minutes)',
                details: 'Rebook 12 tight connections on EK/AI flights',
                responsibility: 'Passenger Services',
                status: 'in_progress'
              },
              {
                action: 'Extended Crew Brief & Check-in',
                timeline: '15:45-16:15 (30 minutes)',
                details: 'Ali Ahmed DXB arrival + crew briefing + security',
                responsibility: 'DXB Crew Services',
                status: 'scheduled'
              }
            ],
            cascadeAnalysis: {
              affectedCrewMembers: [
                {
                  name: 'Capt. Al-Rashid',
                  currentStatus: 'Duty time exceeded - requires rest',
                  nextAssignment: 'FZ567 DXB-KHI tomorrow 08:00',
                  impact: 'Protected - sufficient rest period',
                  action: 'No further changes required'
                },
                {
                  name: 'Capt. Ali Ahmed (AUH Base)',
                  currentStatus: 'Deadheading DXB for positioning',
                  nextAssignment: 'FZ1234 AUH-BOM tomorrow 10:30',
                  impact: 'Potential fatigue from positioning',
                  action: 'Assign local AUH backup for tomorrow'
                },
                {
                  name: 'F/O Hassan',
                  currentStatus: 'Continues with repositioned captain',
                  nextAssignment: 'FZ182 COK-DXB tomorrow 20:30',
                  impact: 'Slight delay but schedule maintained',
                  action: 'Monitor for new pairing comfort'
                }
              ],
              baseOperationsImpact: {
                dxb: '120-minute delay contained to single flight',
                auh: 'Need backup captain for tomorrow FZ1234',
                cok: 'Ground handling extended for late arrival',
                networkEffect: 'Moderate - 2 bases affected'
              },
              downstreamEffects: {
                today: '1 flight delayed, positioning costs incurred',
                tomorrow: 'AUH requires backup crew arrangement',
                dayAfter: 'All crew return to normal schedules',
                weeklyImpact: 'Moderate - 48-72 hour adjustment period'
              }
            },
            costBreakdown: {
              deadheadFlight: 'AED 8,500 (FZ1681 AUH-DXB)',
              crewPositioning: 'AED 2,800 (ground transport)',
              overtimeCosts: 'AED 3,200 (extended duty)',
              auhBackupCrew: 'AED 6,500 (tomorrow coverage)',
              passengerReprotection: 'AED 4,000 (12 connections)',
              totalImpact: 'AED 25,000',
              savings: 'AED 155,000 vs delay option'
            },
            advantages: [
              'Qualified backup crew available in AUH base',
              'Maintains original aircraft and F/O Hassan',
              `${flight?.aircraft} qualified captain with COK experience`,
              'Route experience and ETOPS qualifications',
              'Positioning flight readily available'
            ],
            considerations: [
              '120-minute departure delay impact',
              'Crew positioning costs (AUH-DXB deadhead)',
              `${flight?.connectionFlights} passenger connections at risk`,
              'AUH base operations require backup coverage',
              'Extended crew duty time monitoring required',
              'Ground transport coordination at both bases'
            ]
          }
        },
        {
          id: 'DELAY_COMPLIANCE',
          title: 'Delay for Crew Rest Completion',
          description: 'Wait for original crew mandatory rest period',
          cost: 'AED 45,000',
          timeline: '3 hours',
          confidence: 65,
          impact: 'Significant passenger disruption',
          status: 'warning',
          rotationPlan: {
            originalPlan: [
              { flight: flight?.flightNumber, crew: 'Capt. Al-Rashid + F/O Hassan', time: flight?.scheduledDeparture, status: 'crew_duty_breach' }
            ],
            newPlan: [
              { flight: flight?.flightNumber, crew: 'Capt. Al-Rashid + F/O Hassan', time: '17:20-22:45', status: 'delayed_crew_rest' }
            ],
            crewOfficerActions: [
              {
                action: 'Mandatory Rest Period Calculation',
                timeline: '13:45-13:50 (5 minutes)',
                details: 'Calculate 12-hour rest period from last duty end',
                responsibility: 'Crew Administrator',
                status: 'completed'
              },
              {
                action: 'Crew Accommodation Arrangement',
                timeline: '13:50-14:00 (10 minutes)',
                details: 'Book crew rest facility at DXB for 3-hour period',
                responsibility: 'Crew Services',
                status: 'completed'
              },
              {
                action: 'Passenger Accommodation Planning',
                timeline: '14:00-14:20 (20 minutes)',
                details: 'Arrange meal vouchers + lounge access for 175 passengers',
                responsibility: 'Passenger Services Manager',
                status: 'in_progress'
              },
              {
                action: 'Connection Passenger Analysis',
                timeline: '14:20-14:35 (15 minutes)',
                details: 'Identify and rebook 3 tight connections at COK',
                responsibility: 'Rebooking Specialist',
                status: 'in_progress'
              },
              {
                action: 'Crew Medical/Fatigue Assessment',
                timeline: '14:35-14:45 (10 minutes)',
                details: 'Medical clearance for extended rest compliance',
                responsibility: 'Flight Safety Officer',
                status: 'scheduled'
              },
              {
                action: 'Tomorrow Schedule Impact Review',
                timeline: '14:45-15:00 (15 minutes)',
                details: 'Check crew next-day schedule for conflicts',
                responsibility: 'Senior Crew Planner',
                status: 'scheduled'
              }
            ],
            cascadeAnalysis: {
              affectedCrewMembers: [
                {
                  name: 'Capt. Al-Rashid',
                  currentStatus: 'Extended rest period - regulatory compliance',
                  nextAssignment: 'FZ567 DXB-KHI tomorrow 08:00',
                  impact: 'At risk - insufficient turnaround time',
                  action: 'Assign backup crew for tomorrow FZ567'
                },
                {
                  name: 'F/O Hassan',
                  currentStatus: 'Extended rest with captain',
                  nextAssignment: 'FZ182 COK-DXB tomorrow 20:30',
                  impact: 'Protected - sufficient recovery time',
                  action: 'Monitor fatigue levels closely'
                }
              ],
              networkImpact: {
                today: 'Single flight 3-hour delay',
                tonight: 'COK late arrival affects ground ops',
                tomorrow: 'Need backup crew for FZ567 morning',
                passengerFlow: '175 passengers + 3 connections disrupted'
              },
              downstreamEffects: {
                today: 'Significant passenger disruption',
                tomorrow: 'Crew fatigue monitoring required',
                dayAfter: 'Normal schedule resumes',
                weeklyImpact: 'High - 72-hour recovery period'
              }
            },
            costBreakdown: {
              crewRestFacility: 'AED 1,200 (3-hour booking)',
              passengerMeals: 'AED 8,750 (175 passengers)',
              loungeAccess: 'AED 5,250 (175 passengers)',
              connectionRebooking: 'AED 4,500 (3 passengers)',
              backupCrewTomorrow: 'AED 12,000 (FZ567 coverage)',
              compensationLiability: 'AED 13,300 (EU261 equivalent)',
              totalImpact: 'AED 45,000',
              additionalRisks: 'Potential reputation damage'
            },
            advantages: [
              'Uses original qualified crew - no retraining',
              'Full GCAA regulatory compliance guaranteed',
              'No crew change complexity or briefing time',
              'Familiar aircraft type and route knowledge',
              'Maintains crew pairing stability',
              'No additional crew qualification requirements'
            ],
            considerations: [
              '3-hour minimum delay for mandatory rest period',
              `${flight?.passengers} passengers require accommodation`,
              `${flight?.connectionFlights} connections missed at ${flight?.destination}`,
              'Potential curfew issues at COK destination',
              'Crew hotel accommodation and meal costs',
              'High passenger compensation liability',
              'Tomorrow schedule requires backup crew',
              'Significant reputation and customer impact'
            ]
          }
        }
      ]
    }
  }

  // Weather Delay Recovery - 6-Step Process
  const getWeatherDelayRecovery = () => {
    return {
      title: 'Weather Delay Recovery',
      description: 'Heavy thunderstorms at DEL - Low visibility 800m',
      icon: CloudRain,
      priority: 'MEDIUM',
      estimatedTime: '2-4 hours',
      steps: [
        {
          step: 1,
          title: 'Weather Trigger Received',
          status: 'completed',
          timestamp: '12:30:00',
          system: 'Weather Monitoring',
          details: 'ATC holding all arrivals due to severe weather',
          data: {
            weatherType: 'Thunderstorms + Low Visibility',
            visibility: '800m (Required: 1200m)',
            atcStatus: 'All arrivals on hold',
            forecast: 'Improvement expected 16:00-17:00'
          }
        },
        {
          step: 2,
          title: 'Assess Impact on Operations',
          status: 'completed',
          timestamp: '12:35:00',
          system: 'Operations Control',
          details: 'Holding time, EOBT, and curfew risk evaluation',
          data: {
            holdingTime: '2-4 hours estimated',
            eobtImpact: 'Departure delayed to 17:30',
            curfewRisk: 'None - within DEL operating hours',
            fuelConsideration: 'Additional 800kg required'
          }
        },
        {
          step: 3,
          title: 'Evaluate Recovery Actions',
          status: 'completed',
          timestamp: '12:40:00',
          system: 'Recovery Engine',
          details: 'Multiple recovery options assessed',
          data: {
            delayOption: 'Delay within legal/curfew limits',
            swapOption: 'No aircraft swap required',
            rerouteOption: 'Via PNQ possible with ground transport',
            crewImpact: 'Within FDP limits'
          }
        },
        {
          step: 4,
          title: 'Connecting Passenger Analysis',
          status: 'completed',
          timestamp: '12:45:00',
          system: 'Passenger Services',
          details: 'Connection impacts and rebooking options',
          data: {
            connectingPax: '47 passengers with connections',
            mctBreaches: '12 passengers - tight connections',
            rebookingOptions: 'EK/AI flights available',
            accommodation: 'Not required - same day arrival'
          }
        },
        {
          step: 5,
          title: 'Adjust Crew Patterns',
          status: 'completed',
          timestamp: '12:50:00',
          system: 'Crew Management',
          details: 'Crew duty time and rest periods updated',
          data: {
            dutyAdjustment: '+3 hours within FDP limits',
            restPeriod: 'Maintained - no overnight impact',
            crewNotification: 'Updated via CrewApp',
            checkoutTime: 'Revised to 22:15 DEL'
          }
        },
        {
          step: 6,
          title: 'Calculate OTP Impact',
          status: 'completed',
          timestamp: '12:55:00',
          system: 'Performance Analytics',
          details: 'On-time performance impact logged',
          data: {
            otpImpact: 'Weather delay - excluded from OTP',
            causeCode: 'WX - Severe Weather DEL',
            networkImpact: 'Minimal - isolated incident',
            costImpact: 'AED 25,000 (fuel + handling)'
          }
        }
      ],
      options: [
        {
          id: 'DELAY_WEATHER',
          title: 'Delay for Weather Clearance',
          description: 'Wait for weather improvement at DEL',
          cost: 'AED 25,000',
          timeline: '2-3 hours',
          confidence: 90,
          impact: 'Managed schedule delay',
          status: 'recommended',
          rotationPlan: {
            originalPlan: [
              { flight: 'FZ445', route: 'DXB-DEL', time: '15:30-19:15', status: 'affected' }
            ],
            newPlan: [
              { flight: 'FZ445', route: 'DXB-DEL', time: '17:30-21:15', status: 'weather_delayed' }
            ],
            advantages: [
              'Weather forecast shows improvement',
              'All connections protected',
              'No aircraft swap required',
              'Fuel sufficient for extended holding'
            ],
            considerations: [
              'Dependent on weather improvement',
              'Crew duty time monitoring',
              'Passenger notification required'
            ]
          }
        },
        {
          id: 'REROUTE_PNQ',
          title: 'Reroute via Pune',
          description: 'Divert to PNQ with ground transport',
          cost: 'AED 45,000',
          timeline: '4 hours total',
          confidence: 75,
          impact: 'Extended travel time',
          status: 'caution',
          rotationPlan: {
            originalPlan: [
              { flight: 'FZ445', route: 'DXB-DEL', time: '15:30-19:15', status: 'affected' }
            ],
            newPlan: [
              { flight: 'FZ445', route: 'DXB-PNQ+Bus', time: '15:30-20:30+2h bus', status: 'rerouted' }
            ],
            advantages: [
              'PNQ weather conditions good',
              'Ground transport available',
              'Passengers reach destination same day'
            ],
            considerations: [
              'Additional 2.5-hour bus journey',
              'Ground transport coordination',
              'Passenger comfort during transfer'
            ]
          }
        },
        {
          id: 'CANCEL_WEATHER',
          title: 'Cancel Due to Weather',
          description: 'Cancel flight and rebook passengers',
          cost: 'AED 180,000',
          timeline: 'Immediate',
          confidence: 60,
          impact: 'Complete sector cancellation',
          status: 'warning',
          rotationPlan: {
            originalPlan: [
              { flight: 'FZ445', route: 'DXB-DEL', time: '15:30-19:15', status: 'affected' }
            ],
            newPlan: [
              { flight: 'FZ445', route: 'CANCELLED', time: 'CANCELLED', status: 'cancelled' }
            ],
            advantages: [
              'Immediate resolution',
              'Aircraft available for other routes',
              'Weather exemption from compensation'
            ],
            considerations: [
              'Complete revenue loss',
              'Customer dissatisfaction',
              'Rebooking complexity'
            ]
          }
        }
      ]
    }
  }

  // Airport Curfew Recovery - 6-Step Process
  const getCurfewCongestionRecovery = () => {
    return {
      title: 'Airport Curfew Recovery',
      description: 'BOM curfew breach - ETA 23:15 (15 min past curfew)',
      icon: Building,
      priority: 'HIGH',
      estimatedTime: '45 minutes',
      steps: [
        {
          step: 1,
          title: 'Determine Curfew Parameters',
          status: 'completed',
          timestamp: '21:45:00',
          system: 'Airport Operations',
          details: 'BOM curfew 23:00-06:00, current ETA 23:15',
          data: {
            curfewStart: '23:00 local time',
            curfewEnd: '06:00 local time',
            currentETA: '23:15 (15 min past curfew)',
            curfewType: 'Noise restriction - strict enforcement'
          }
        },
        {
          step: 2,
          title: 'Evaluate Delay Impact',
          status: 'completed',
          timestamp: '21:47:00',
          system: 'Flight Planning',
          details: 'Arrival time vs curfew window analysis',
          data: {
            delayDuration: '15 minutes past curfew',
            alternativeETA: '06:15 next day (post-curfew)',
            operationalImpact: 'Overnight accommodation required',
            costImplication: 'AED 185,000 accommodation'
          }
        },
        {
          step: 3,
          title: 'Assess Recovery Options',
          status: 'completed',
          timestamp: '21:50:00',
          system: 'Operations Planning',
          details: 'Priority handling, delays, swaps, and rerouting evaluated',
          data: {
            priorityHandling: 'Not available - strict curfew',
            delayOption: 'Until 06:00 next day',
            swapOption: 'Earlier departure with FZ201',
            rerouteOption: 'Via PNQ with ground transport'
          }
        },
        {
          step: 4,
          title: 'Optimize Aircraft Rotation',
          status: 'completed',
          timestamp: '21:52:00',
          system: 'Network Planning',
          details: 'Ensure aircraft returns to maintenance hub',
          data: {
            rotationImpact: 'Minimal with aircraft swap',
            maintenanceHub: 'DXB - return maintained',
            nextDayOperations: 'Protected with swap option',
            utilization: 'Optimal with FZ201 swap'
          }
        },
        {
          step: 5,
          title: 'Crew Rest Calculations',
          status: 'completed',
          timestamp: '21:55:00',
          system: 'Crew Management',
          details: 'Crew duty time and rest requirements updated',
          data: {
            currentDuty: '6.5 hours (within limits)',
            restRequirement: '12 hours minimum',
            accommodation: 'Crew hotel arranged if needed',
            nextDutyStart: '10:00 next day'
          }
        },
        {
          step: 6,
          title: 'Notify Stakeholders',
          status: 'completed',
          timestamp: '21:58:00',
          system: 'Communication Hub',
          details: 'All relevant parties notified of curfew solution',
          data: {
            airportOps: '✓ BOM Ground Handling',
            stationControl: '✓ DXB + BOM Stations',
            passengers: '178 passengers notified',
            crewNotified: '✓ Gate change to B7'
          }
        }
      ],
      options: [
        {
          id: 'SWAP_EARLY',
          title: 'Aircraft Swap for Earlier Departure',
          description: 'Swap with FZ201 for 22:15 departure',
          cost: 'AED 45,000',
          timeline: '45 minutes',
          confidence: 92,
          impact: 'Beat curfew timing',
          status: 'recommended',
          rotationPlan: {
            originalPlan: [
              { flight: 'FZ445', route: 'DXB-BOM', time: '22:30-23:15', status: 'curfew_breach' }
            ],
            newPlan: [
              { flight: 'FZ445', route: 'DXB-BOM', time: '22:15-22:45', status: 'curfew_compliant' }
            ],
            advantages: [
              'Depart 22:15, arrive 22:45 (before curfew)',
              'Zero passenger rebooking',
              'Significant cost savings vs overnight',
              'Maintains schedule integrity'
            ],
            considerations: [
              'FZ201 delayed by 60 minutes',
              'Quick crew coordination needed',
              'Gate change from B3 to B7'
            ]
          }
        },
        {
          id: 'DIVERT_PNQ',
          title: 'Divert to Pune',
          description: 'Land at PNQ with ground transport',
          cost: 'AED 180,000',
          timeline: '4 hours total',
          confidence: 80,
          impact: 'Extended journey',
          status: 'caution',
          rotationPlan: {
            originalPlan: [
              { flight: 'FZ445', route: 'DXB-BOM', time: '22:30-23:15', status: 'curfew_breach' }
            ],
            newPlan: [
              { flight: 'FZ445', route: 'DXB-PNQ+Bus', time: '22:30-22:45+2h bus', status: 'diverted' }
            ],
            advantages: [
              'PNQ no curfew restrictions',
              'Bus transport available',
              'Same day arrival'
            ],
            considerations: [
              '2-hour bus journey to BOM',
              'Ground transport coordination',
              'Passenger comfort concerns'
            ]
          }
        },
        {
          id: 'OVERNIGHT_DELAY',
          title: 'Overnight Delay',
          description: 'Delay until 06:00 curfew end',
          cost: 'AED 320,000',
          timeline: '7 hours',
          confidence: 65,
          impact: 'Overnight accommodation',
          status: 'warning',
          rotationPlan: {
            originalPlan: [
              { flight: 'FZ445', route: 'DXB-BOM', time: '22:30-23:15', status: 'curfew_breach' }
            ],
            newPlan: [
              { flight: 'FZ445', route: 'DXB-BOM', time: '06:00+1-06:45+1', status: 'overnight_delay' }
            ],
            advantages: [
              'Original route maintained',
              'No aircraft swap complexity',
              'Crew gets proper rest'
            ],
            considerations: [
              'High accommodation costs',
              'Passenger dissatisfaction',
              '7-hour delay impact'
            ]
          }
        }
      ]
    }
  }

  // Rotation Misalignment Recovery - 7-Step Process
  const getRotationMisalignmentRecovery = () => {
    return {
      title: 'Rotation Misalignment Recovery',
      description: 'A6-FDJ maintenance overrun - Line check extended 3 hours',
      icon: RotateCw,
      priority: 'MEDIUM',
      estimatedTime: '90 minutes',
      steps: [
        {
          step: 1,
          title: 'AMOS Maintenance Hold Flag',
          status: 'completed',
          timestamp: '11:30:00',
          system: 'AMOS Maintenance',
          details: 'A6-FDJ line check extended by 3 hours',
          data: {
            aircraft: 'A6-FDJ',
            maintenanceType: 'Line Check',
            originalETA: '11:30:00',
            revisedETA: '14:30:00',
            delay: '3 hours extension'
          }
        },
        {
          step: 2,
          title: 'Recalculate Available Time',
          status: 'completed',
          timestamp: '11:32:00',
          system: 'Fleet Management',
          details: 'Aircraft availability pushed to 14:30',
          data: {
            originalAvailable: '11:30:00',
            newAvailable: '14:30:00',
            impactedFlights: 'FZ567 (13:00 departure)',
            bufferTime: '1 hour 30 minutes lost'
          }
        },
        {
          step: 3,
          title: 'Evaluate Next Rotation Legs',
          status: 'completed',
          timestamp: '11:35:00',
          system: 'Schedule Analyzer',
          details: 'Downstream flight impact assessment',
          data: {
            nextFlight: 'FZ567 DXB-KHI 13:00',
            subsequentFlight: 'FZ568 KHI-DXB 16:30',
            curfewImpact: 'None - within operating hours',
            crewImpact: 'FDP extension required'
          }
        },
        {
          step: 4,
          title: 'Maintenance Requirement Review',
          status: 'completed',
          timestamp: '11:38:00',
          system: 'Maintenance Planning',
          details: 'Maintenance window flexibility assessed',
          data: {
            maintenanceType: 'Scheduled line check',
            flexibility: 'Limited - safety critical',
            canDelay: 'No - must complete',
            nextMaintenance: '150 flight hours'
          }
        },
        {
          step: 5,
          title: 'Optimizer Solution',
          status: 'completed',
          timestamp: '11:40:00',
          system: 'AERON Optimizer',
          details: 'Rebuild tail assignment with minimal disruption',
          data: {
            recommendedAction: 'Aircraft swap with A6-FDL',
            alternativeAircraft: 'A6-FDL available for FZ567',
            optimalSolution: 'Swap assignment - minimal cost',
            networkImpact: 'Contained to single day'
          }
        },
        {
          step: 6,
          title: 'Evaluate Crew Impact',
          status: 'completed',
          timestamp: '11:42:00',
          system: 'Crew Operations',
          details: 'Crew assignments and overnight impacts assessed',
          data: {
            crewImpact: 'Minimal - same aircraft type',
            overnightCrew: 'No impact - day return',
            dutyTime: 'Within normal limits',
            briefingRequired: 'Standard - same A320 type'
          }
        },
        {
          step: 7,
          title: 'Push Updated Plan',
          status: 'completed',
          timestamp: '11:45:00',
          system: 'Operations Control',
          details: 'Updated plan distributed to all stakeholders',
          data: {
            aimsUpdate: '✓ Crew assignments updated',
            occNotified: '✓ Operations Control Center',
            maintenanceNotified: '✓ A6-FDJ maintenance team',
            crewNotified: '✓ FZ567 crew - aircraft change'
          }
        }
      ],
      options: [
        {
          id: 'SWAP_A6FDL',
          title: 'Aircraft Swap with A6-FDL',
          description: 'Assign A6-FDL to FZ567, A6-FDJ resumes later',
          cost: 'AED 75,000',
          timeline: '90 minutes',
          confidence: 88,
          impact: 'Minimal network disruption',
          status: 'recommended',
          rotationPlan: {
            originalPlan: [
              { flight: 'FZ567', aircraft: 'A6-FDJ', time: '13:00-15:45', status: 'maintenance_delayed' },
              { flight: 'FZ568', aircraft: 'A6-FDJ', time: '16:30-19:15', status: 'affected' }
            ],
            newPlan: [
              { flight: 'FZ567', aircraft: 'A6-FDL', time: '13:00-15:45', status: 'aircraft_swapped' },
              { flight: 'FZ568', aircraft: 'A6-FDL', time: '16:30-19:15', status: 'aircraft_swapped' }
            ],
            advantages: [
              'A6-FDL available immediately',
              'Same A320 type - no complexity',
              'Zero passenger impact',
              'Network disruption contained'
            ],
            considerations: [
              'A6-FDL flight FZ405 delayed 60 minutes',
              'Crew briefing for aircraft change',
              'A6-FDJ returns to service 14:30'
            ]
          }
        },
        {
          id: 'ACCEPT_DELAYS',
          title: 'Accept Cascade Delays',
          description: 'Wait for A6-FDJ maintenance completion',
          cost: 'AED 150,000',
          timeline: '3 hours',
          confidence: 70,
          impact: 'Multiple flight delays',
          status: 'caution',
          rotationPlan: {
            originalPlan: [
              { flight: 'FZ567', aircraft: 'A6-FDJ', time: '13:00-15:45', status: 'maintenance_delayed' },
              { flight: 'FZ568', aircraft: 'A6-FDJ', time: '16:30-19:15', status: 'affected' }
            ],
            newPlan: [
              { flight: 'FZ567', aircraft: 'A6-FDJ', time: '16:00-18:45', status: 'delayed' },
              { flight: 'FZ568', aircraft: 'A6-FDJ', time: '19:30-22:15', status: 'delayed' }
            ],
            advantages: [
              'Original aircraft maintained',
              'No swap complexity',
              'Maintenance completed properly'
            ],
            considerations: [
              '3-hour delay cascade',
              '456 passengers affected',
              'Connection impacts at KHI'
            ]
          }
        },
        {
          id: 'PARTIAL_CANCEL',
          title: 'Cancel Selected Legs',
          description: 'Cancel FZ567, maintain rest of rotation',
          cost: 'AED 200,000',
          timeline: '2 hours',
          confidence: 75,
          impact: 'Strategic cancellation',
          status: 'warning',
          rotationPlan: {
            originalPlan: [
              { flight: 'FZ567', aircraft: 'A6-FDJ', time: '13:00-15:45', status: 'maintenance_delayed' },
              { flight: 'FZ568', aircraft: 'A6-FDJ', time: '16:30-19:15', status: 'affected' }
            ],
            newPlan: [
              { flight: 'FZ567', aircraft: 'CANCELLED', time: 'CANCELLED', status: 'cancelled' },
              { flight: 'FZ568', aircraft: 'A6-FDJ', time: '16:30-19:15', status: 'normal' }
            ],
            advantages: [
              'Stops delay propagation',
              'Preserves return sector',
              'Quick passenger rebooking'
            ],
            considerations: [
              'Complete sector revenue loss',
              '234 passengers require rebooking',
              'Network gap created'
            ]
          }
        }
      ]
    }
  }

  const scenarioData = getScenarioData(flight?.categorization)

  // Generate Schedule Impact Analysis based on recovery option type
  const generateScheduleImpactAnalysis = (option) => {
    // Dynamic analysis based on recovery option type
    const optionType = option.type || 'aircraft-swap' // Extract from option ID or description
    
    if (optionType === 'aircraft-swap' || option.id?.includes('SWAP') || option.title?.toLowerCase().includes('swap')) {
      return generateAircraftSwapImpactAnalysis(option)
    } else if (optionType === 'crew-assignment' || option.id?.includes('CREW') || option.title?.toLowerCase().includes('crew')) {
      return generateCrewAssignmentImpactAnalysis(option)
    } else if (optionType === 'delay' || option.id?.includes('DELAY') || option.title?.toLowerCase().includes('delay')) {
      return generateDelayImpactAnalysis(option)
    } else if (optionType === 'cancellation' || option.id?.includes('CANCEL') || option.title?.toLowerCase().includes('cancel')) {
      return generateCancellationImpactAnalysis(option)
    } else if (optionType === 'route-change' || option.id?.includes('REROUTE') || option.title?.toLowerCase().includes('reroute') || option.title?.toLowerCase().includes('divert')) {
      return generateRouteChangeImpactAnalysis(option)
    } else {
      // Default to aircraft swap analysis for backward compatibility
      return generateAircraftSwapImpactAnalysis(option)
    }
  }

  // Aircraft Swap Impact Analysis
  const generateAircraftSwapImpactAnalysis = (option) => {
    const aircraftSwapAnalysis = {
      analysisType: 'Aircraft Swap Impact',
      primaryFocus: 'Aircraft Scheduling & Maintenance',
      
      impactedAircraft: [
        {
          id: 'A6-FDB',
          registrationNumber: 'A6-FDB',
          aircraftType: 'A320-200',
          currentStatus: 'Grounded - Technical Issue',
          role: 'Originally Assigned Aircraft',
          
          upcomingSchedule: [
            {
              flightNumber: 'FZ445',
              route: 'DXB-BOM',
              scheduledDeparture: '15:30',
              scheduledArrival: '19:15',
              status: 'GROUNDED',
              impact: 'Critical',
              conflictReason: 'Aircraft unavailable due to hydraulic system failure',
              passengerCount: 167,
              revenue: 'AED 125,200'
            },
            {
              flightNumber: 'FZ677',
              route: 'DXB-KHI',
              scheduledDeparture: '08:30+1',
              scheduledArrival: '10:45+1',
              status: 'AT_RISK',
              impact: 'High',
              conflictReason: 'Dependent on repair completion by 06:00+1',
              passengerCount: 156,
              revenue: 'AED 89,400'
            },
            {
              flightNumber: 'FZ234',
              route: 'KHI-DXB',
              scheduledDeparture: '12:30+1',
              scheduledArrival: '14:45+1',
              status: 'PROTECTED',
              impact: 'None',
              conflictReason: 'Sufficient time after repair completion',
              passengerCount: 142,
              revenue: 'AED 78,600'
            }
          ],
          
          maintenanceImpact: {
            currentMaintenance: 'Hydraulic System Repair',
            estimatedCompletion: '20:30 Today',
            nextScheduledMaintenance: 'A-Check in 150 flight hours',
            maintenanceWindow: 'Protected - no conflict with scheduled maintenance'
          }
        },
        
        {
          id: 'A6-FDC',
          registrationNumber: 'A6-FDC',
          aircraftType: 'A320-200',
          currentStatus: 'Available at Gate A8',
          role: 'Replacement Aircraft',
          
          upcomingSchedule: [
            {
              flightNumber: 'FZ405',
              route: 'DXB-DEL',
              scheduledDeparture: '17:45',
              scheduledArrival: '22:30',
              status: 'DELAYED',
              impact: 'Medium',
              conflictReason: 'Delayed by 75 minutes due to aircraft reassignment',
              passengerCount: 178,
              revenue: 'AED 134,000'
            },
            {
              flightNumber: 'FZ406',
              route: 'DEL-DXB',
              scheduledDeparture: '00:15+1',
              scheduledArrival: '03:30+1',
              status: 'DELAYED',
              impact: 'Medium',
              conflictReason: 'Cascade delay from FZ405',
              passengerCount: 165,
              revenue: 'AED 98,500'
            },
            {
              flightNumber: 'FZ122',
              route: 'DXB-BOM',
              scheduledDeparture: '06:00+1',
              scheduledArrival: '09:45+1',
              status: 'PROTECTED',
              impact: 'None',
              conflictReason: 'Adequate turnaround time maintained',
              passengerCount: 159,
              revenue: 'AED 118,700'
            }
          ],
          
          maintenanceImpact: {
            currentMaintenance: 'None - Available',
            estimatedCompletion: 'N/A',
            nextScheduledMaintenance: 'Line Check in 25 flight hours',
            maintenanceWindow: 'At risk - may need rescheduling to accommodate new rotation'
          }
        }
      ],
      
      networkImpactSummary: {
        totalFlightsAffected: 6,
        totalPassengersAffected: 967,
        totalRevenueAtRisk: 'AED 644,400',
        criticalConflicts: 1,
        managableConflicts: 3,
        protectedFlights: 2,
        
        recommendedMitigations: [
          {
            priority: 1,
            action: 'Execute aircraft swap A6-FDB → A6-FDC immediately',
            impact: 'Resolves critical grounding, minimal passenger delay (75 min)',
            cost: 'AED 45,000',
            timeline: '75 minutes implementation'
          },
          {
            priority: 2,
            action: 'Notify passengers on FZ405/FZ406 of delay',
            impact: 'Proactive communication reduces compensation claims',
            cost: 'AED 8,500',
            timeline: '15 minutes notification'
          },
          {
            priority: 3,
            action: 'Reschedule A6-FDC line check maintenance',
            impact: 'Maintains aircraft airworthiness compliance',
            cost: 'AED 3,200',
            timeline: '2 hours coordination'
          }
        ]
      },
      
      maintenanceAnalysis: {
        affectedMaintenanceWindows: 2,
        reschedulingRequired: 1,
        complianceRisk: 'Low',
        additionalMaintenanceCosts: 'AED 3,200',
        
        maintenanceConflicts: [
          {
            aircraft: 'A6-FDC',
            maintenanceType: 'Line Check',
            originalSchedule: 'Tomorrow 14:00-16:00',
            conflict: 'Aircraft will be 2 hours behind schedule',
            resolution: 'Reschedule to 18:00-20:00 tomorrow'
          }
        ]
      },
      
      operationalCompliance: {
        aircraftUtilization: 'Within limits - 8.2 hours daily average',
        routeCompliance: 'Full compliance - same aircraft type',
        curfewViolations: 0,
        airportSlotIssues: 0,
        totalComplianceScore: 92,
        
        riskMitigation: [
          {
            risk: 'A6-FDC maintenance window conflict',
            mitigation: 'Coordinate with maintenance team for evening slot',
            probability: 'Low',
            impact: 'Low'
          }
        ]
      },
      
      fuelAndRouteImpact: {
        additionalFuelRequired: '450 kg',
        routeChanges: 'None - same route maintained',
        flightTimeVariance: '+5 minutes (different aircraft performance)',
        fuelCostImpact: 'AED 1,800 additional fuel costs'
      },
      
      costBenefitAnalysis: {
        currentOption: {
          directCost: option.cost,
          cascadeDisruptionCost: 'AED 178,000',
          passengerCompensation: 'AED 45,600',
          totalCost: 'AED 268,600'
        },
        recommendedOption: {
          directCost: 'AED 2,500',
          cascadeDisruptionCost: 'AED 0',
          passengerCompensation: 'AED 0',
          totalCost: 'AED 2,500'
        },
        netSavings: 'AED 456,800',
        roi: '1,015%'
      }
    }
    
    return aircraftSwapAnalysis
  }

  // Crew Assignment Impact Analysis
  const generateCrewAssignmentImpactAnalysis = (option) => {
    return {
      analysisType: 'Crew Assignment Impact',
      primaryFocus: 'Crew Scheduling & Duty Time Compliance',
      
      impactedCrewMembers: [
        {
          id: 'CR2401',
          name: 'Capt. Mohammed Al-Zaabi',
          role: 'Captain',
          currentAssignment: option.id,
          currentDutyStart: '14:00',
          currentDutyEnd: '22:30',
          
          upcomingSchedule: [
            {
              flightNumber: 'FZ203',
              route: 'DXB-DEL',
              scheduledDeparture: '16:45+1',
              scheduledArrival: '21:30+1',
              aircraft: 'B737-800',
              status: 'CONFLICT',
              restPeriod: '18h 15m',
              minRequiredRest: '12h 00m',
              conflictReason: 'Insufficient turnaround time if assigned to current disruption',
              impact: 'High',
              passengerCount: 154,
              revenue: 'AED 89,400'
            }
          ],
          
          alternatives: [
            {
              id: 'ALT_CR2420',
              name: 'Capt. Hassan Al-Ahmed',
              role: 'Captain - Standby',
              availability: 'Immediate',
              qualifications: ['B737-800', 'A320', 'ETOPS'],
              nextAssignment: 'FZ567 DXB-KHI (Tomorrow 14:30)',
              conflicts: 'None',
              cost: 'AED 2,500 (Standby activation)',
              advantages: ['No schedule conflicts', 'Same aircraft type qualified', 'Fresh duty period']
            }
          ],
          
          recommendedAction: {
            action: 'Use Alternative Crew - Capt. Hassan Al-Ahmed',
            reason: 'Prevents 3 downstream flight disruptions',
            costSaving: 'AED 156,000 (avoided passenger compensation)',
            implementation: 'Immediate - standby crew activation'
          }
        }
      ],
      
      networkImpactSummary: {
        totalFlightsAtRisk: 4,
        totalPassengersAffected: 434,
        totalRevenueAtRisk: 'AED 324,400',
        criticalConflicts: 2,
        managableConflicts: 2,
        protectedFlights: 2,
        
        recommendedMitigations: [
          {
            priority: 1,
            action: 'Assign standby Capt. Hassan Al-Ahmed to current disruption',
            impact: 'Eliminates all critical conflicts',
            cost: 'AED 2,500',
            timeline: '15 minutes implementation'
          },
          {
            priority: 2,
            action: 'Monitor F/O Johnson rest periods for FZ182',
            impact: 'Ensures regulatory compliance',
            cost: 'AED 0',
            timeline: 'Ongoing monitoring'
          },
          {
            priority: 3,
            action: 'Pre-position backup crew for FZ203 tomorrow',
            impact: 'Contingency protection',
            cost: 'AED 5,000',
            timeline: '24-hour advance notice'
          }
        ]
      },
      
      complianceAnalysis: {
        dutyTimeViolations: 0,
        restPeriodViolations: 1,
        routeQualificationIssues: 0,
        medicalExpiryRisks: 0,
        trainingRequirements: 0,
        totalComplianceScore: 85,
        
        riskMitigation: [
          {
            risk: 'F/O Johnson marginal rest for FZ182',
            mitigation: 'Monitor fatigue levels, backup F/O on standby',
            probability: 'Low',
            impact: 'Medium'
          }
        ]
      },
      
      fuelAndRouteImpact: {
        additionalFuelRequired: '450 kg',
        routeChanges: 'None - same route maintained',
        flightTimeVariance: '+5 minutes (different aircraft performance)',
        fuelCostImpact: 'AED 1,800 additional fuel costs'
      },
      
      costBenefitAnalysis: {
        currentOption: {
          directCost: option.cost,
          cascadeDisruptionCost: 'AED 178,000',
          passengerCompensation: 'AED 45,600',
          totalCost: 'AED 268,600'
        },
        recommendedOption: {
          directCost: 'AED 2,500',
          cascadeDisruptionCost: 'AED 0',
          passengerCompensation: 'AED 0',
          totalCost: 'AED 2,500'
        },
        netSavings: 'AED 456,800',
        roi: '1,015%'
      }
    }
    
    return aircraftSwapAnalysis
  }

  // Delay Impact Analysis
  const generateDelayImpactAnalysis = (option) => {
    return {
      analysisType: 'Flight Delay Impact',
      primaryFocus: 'Passenger Connections & Network Flow',
      
      passengerImpact: [
        {
          category: 'Connecting Passengers',
          affectedCount: 47,
          description: 'Passengers with tight connections at destination',
          
          connectionDetails: [
            {
              connectionFlight: 'EK504 BOM-LHR',
              passengerCount: 12,
              minimumConnectionTime: '90 minutes',
              availableTime: '45 minutes',
              status: 'MISSED',
              rebookingOptions: ['EK506 (Next day 14:30)', 'AI131 (Same day 23:45)'],
              compensationCost: 'AED 18,000'
            },
            {
              connectionFlight: 'AI645 DEL-BLR',
              passengerCount: 8,
              minimumConnectionTime: '60 minutes',
              availableTime: '35 minutes',
              status: 'AT_RISK',
              rebookingOptions: ['AI647 (+2 hours)', 'SG8195 (+4 hours)'],
              compensationCost: 'AED 8,500'
            }
          ]
        },
        
        {
          category: 'Local Passengers',
          affectedCount: 120,
          description: 'Point-to-point passengers affected by delay',
          
          accommodationRequirements: {
            meals: { required: true, cost: 'AED 6,000', duration: '3 hours+' },
            lounge: { required: false, cost: 'AED 0', reason: 'Under 4 hours' },
            hotel: { required: false, cost: 'AED 0', reason: 'Under 8 hours' }
          }
        }
      ],
      
      networkImpactSummary: {
        totalFlightsAffected: 3,
        totalPassengersAffected: 167,
        totalRevenueAtRisk: 'AED 125,200',
        criticalConflicts: 1,
        managableConflicts: 2,
        downstreamDelays: 2,
        
        recommendedMitigations: [
          {
            priority: 1,
            action: 'Proactive passenger rebooking for missed connections',
            impact: 'Reduces compensation liability by 60%',
            cost: 'AED 12,000',
            timeline: '45 minutes coordination'
          }
        ]
      },
      
      airportOperationalImpact: {
        gateUtilization: 'Gate A12 extended by 3 hours',
        groundHandling: '+AED 2,800 extended ground time',
        airportFees: '+AED 1,500 additional charges',
        curfewRisk: 'None - within operating hours'
      },
      
      costBenefitAnalysis: {
        currentOption: { totalCost: 'AED 45,000' },
        alternativeOption: { totalCost: 'AED 180,000' },
        netSavings: 'AED 135,000',
        roi: '300%'
      }
    }
  }

  // Cancellation Impact Analysis
  const generateCancellationImpactAnalysis = (option) => {
    return {
      analysisType: 'Flight Cancellation Impact',
      primaryFocus: 'Revenue Loss & Passenger Reaccommodation',
      
      revenueImpact: {
        directRevenueLoss: 'AED 125,200',
        refundLiability: 'AED 98,400',
        compensationPayments: 'AED 67,800',
        totalFinancialImpact: 'AED 291,400'
      },
      
      passengerReaccommodation: [
        {
          category: 'Same Day Options',
          passengerCount: 89,
          options: [
            { flight: 'FZ567 (19:30)', seats: 45, cost: 'AED 0 - own metal' },
            { flight: 'EK502 (21:15)', seats: 44, cost: 'AED 22,000 - partner airline' }
          ]
        },
        {
          category: 'Next Day Options',
          passengerCount: 78,
          accommodationRequired: true,
          hotelCost: 'AED 31,200',
          mealVouchers: 'AED 7,800',
          options: [
            { flight: 'FZ445 (08:15+1)', seats: 78, cost: 'AED 0 - own metal' }
          ]
        }
      ],
      
      networkImpactSummary: {
        totalFlightsAffected: 1,
        totalPassengersAffected: 167,
        totalRevenueAtRisk: 'AED 291,400',
        criticalConflicts: 0,
        networkGapCreated: true,
        competitorAdvantage: 'High - market share loss potential',
        
        recommendedMitigations: [
          {
            priority: 1,
            action: 'Immediate passenger reaccommodation on partner airlines',
            impact: 'Maintains customer satisfaction, reduces compensation',
            cost: 'AED 53,000',
            timeline: '2 hours coordination'
          }
        ]
      },
      
      operationalBenefits: {
        aircraftAvailability: 'Aircraft freed for other routes',
        crewAvailability: 'Crew released for other assignments',
        maintenanceOpportunity: 'Extended maintenance window available',
        fuelSavings: 'AED 8,500 fuel cost avoided'
      },
      
      costBenefitAnalysis: {
        currentOption: { totalCost: 'AED 291,400' },
        alternativeOption: { totalCost: 'AED 45,000' },
        netLoss: 'AED 246,400',
        roi: '-549%'
      }
    }
  }

  // Route Change Impact Analysis
  const generateRouteChangeImpactAnalysis = (option) => {
    return {
      analysisType: 'Route Change Impact',
      primaryFocus: 'Regulatory Compliance & Operational Complexity',
      
      routeChangeDetails: {
        originalRoute: 'DXB-BOM',
        newRoute: 'DXB-PNQ',
        alternativeTransport: 'Ground transport PNQ to BOM (3.5 hours)',
        routeDistance: '+127 km total journey',
        flightTimeChange: '-15 minutes flight, +3.5 hours ground'
      },
      
      crewQualificationImpact: [
        {
          crewMember: 'Capt. Ahmed Al-Mansoori',
          role: 'Captain',
          currentQualifications: ['DXB-BOM qualified', 'ETOPS certified'],
          requiredQualifications: ['DXB-PNQ qualified', 'Emergency diversion trained'],
          status: 'QUALIFIED',
          additionalTraining: 'None required - emergency authorization applies',
          complianceRisk: 'Low'
        },
        {
          crewMember: 'F/O Sarah Johnson',
          role: 'First Officer',
          currentQualifications: ['DXB-BOM qualified', 'PBN certified'],
          requiredQualifications: ['DXB-PNQ qualified'],
          status: 'REQUIRES_BRIEF',
          additionalTraining: 'Route briefing required (30 minutes)',
          complianceRisk: 'Medium'
        }
      ],
      
      passengerServiceImpact: {
        totalPassengers: 167,
        groundTransportRequired: true,
        transportArrangements: [
          {
            transportType: 'Chartered Buses',
            capacity: '50 passengers each',
            required: 4,
            cost: 'AED 12,000',
            travelTime: '3.5 hours'
          }
        ],
        additionalServices: {
          refreshments: 'AED 5,000',
          insurance: 'AED 2,000',
          coordination: 'AED 3,500'
        }
      },
      
      airportOperationalImpact: {
        pnqAirportFees: 'AED 8,500',
        additionalHandling: 'AED 4,200',
        fuelUplift: '+200kg for PNQ approach',
        groundSupport: 'Confirmed available'
      },
      
      networkImpactSummary: {
        totalFlightsAffected: 1,
        totalPassengersAffected: 167,
        totalRevenueAtRisk: 'AED 0 - passengers reach destination',
        criticalConflicts: 0,
        additionalComplexity: 'High - multimodal transport coordination',
        
        recommendedMitigations: [
          {
            priority: 1,
            action: 'Coordinate ground transport and crew route briefing',
            impact: 'Ensures smooth multimodal journey completion',
            cost: 'AED 25,000',
            timeline: '90 minutes coordination'
          }
        ]
      },
      
      regulatoryCompliance: {
        atcApproval: 'Required and obtained',
        airportLandingRights: 'PNQ confirmed available',
        customsArrangements: 'Same country - no impact',
        insuranceCoverage: 'Extended to ground transport',
        totalComplianceScore: 88
      },
      
      costBenefitAnalysis: {
        currentOption: { totalCost: 'AED 45,000' },
        alternativeOption: { totalCost: 'AED 180,000' },
        netSavings: 'AED 135,000',
        roi: '300%'
      }
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'recommended': return 'bg-green-100 text-green-800 border-green-200'
      case 'caution': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'warning': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'recommended': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'caution': return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'warning': return <AlertCircle className="h-4 w-4 text-red-600" />
      default: return <Info className="h-4 w-4 text-gray-600" />
    }
  }

  const getStepStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'completed_with_cautions': return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'standby': return <Clock className="h-4 w-4 text-blue-600" />
      default: return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const handleExecuteOption = (option) => {
    setSelectedOption(option)
    setIsExecuting(true)
    // Simulate execution process
    setTimeout(() => {
      setIsExecuting(false)
      onSelectPlan && onSelectPlan({ ...option, flight: flight })
    }, 2000)
  }

  const handleViewRotationPlan = (option) => {
    setSelectedRotationData(option)
    const scheduleImpact = generateScheduleImpactAnalysis(option)
    setScheduleImpactData(scheduleImpact)
    setShowRotationPlan(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-flydubai-blue">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-flydubai-blue rounded-lg">
                {React.createElement(scenarioData.icon, { className: "h-6 w-6 text-white" })}
              </div>
              <div>
                <CardTitle className="text-flydubai-navy">{scenarioData.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{scenarioData.description}</p>
                <div className="flex items-center gap-4 mt-2">
                  <Badge className={`priority-${scenarioData.priority.toLowerCase()}`}>
                    {scenarioData.priority} PRIORITY
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Timer className="h-4 w-4" />
                    Est. Resolution: {scenarioData.estimatedTime}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {flight?.categorization}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Flight Information</div>
              <div className="font-medium">{flight?.flightNumber} • {flight?.origin}-{flight?.destination}</div>
              <div className="text-sm text-muted-foreground">{flight?.aircraft} • {flight?.passengers} passengers</div>
              <div className="text-xs text-blue-600 mt-1">
                Debug: {flight?.categorization}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Recovery Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Workflow className="h-5 w-5 text-flydubai-blue" />
            Recovery Steps ({scenarioData.steps.length}-Step Process)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {scenarioData.steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-flydubai-blue text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {step.step}
                  </div>
                  {index < scenarioData.steps.length - 1 && (
                    <div className="w-0.5 h-8 bg-gray-300 mt-2"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getStepStatusIcon(step.status)}
                    <h4 className="font-medium">{step.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {step.timestamp}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{step.details}</p>
                  <div className="text-xs text-flydubai-blue">
                    System: {step.system}
                  </div>
                  {step.data && (
                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(step.data).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-600">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recovery Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-flydubai-blue" />
            Recovery Options
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scenarioData.options.map((option, index) => (
              <Card key={option.id} className={`transition-all hover:shadow-md ${selectedOption?.id === option.id ? 'border-flydubai-blue bg-blue-50' : ''}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center">
                        {getStatusIcon(option.status)}
                        <div className="text-xs font-medium mt-1">
                          {option.confidence}%
                        </div>
                      </div>
                      <div>
                        <CardTitle className="text-flydubai-navy">{option.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                        <div className="flex items-center gap-6 mt-2 text-sm">
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span>{option.cost}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{option.timeline}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Activity className="h-4 w-4 text-muted-foreground" />
                            <span>{option.impact}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(option.status)}>
                        {option.status.toUpperCase()}
                      </Badge>
                      <div className="text-right">
                        <div className="text-lg font-bold text-flydubai-blue">{option.confidence}%</div>
                        <div className="text-xs text-muted-foreground">Confidence</div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    <Button 
                      onClick={() => handleExecuteOption(option)}
                      disabled={isExecuting}
                      className={option.status === 'recommended' ? 'btn-flydubai-primary' : 'btn-flydubai-secondary'}
                    >
                      {isExecuting && selectedOption?.id === option.id ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Executing...
                        </>
                      ) : (
                        <>
                          <PlayCircle className="h-4 w-4 mr-2" />
                          Execute Option
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={() => handleViewRotationPlan(option)}
                      className="border-flydubai-blue text-flydubai-blue hover:bg-blue-50"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Rotation Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rotation Plan Dialog */}
      <Dialog open={showRotationPlan} onOpenChange={setShowRotationPlan}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <RotateCw className="h-5 w-5 text-flydubai-blue" />
              Rotation Plan - {selectedRotationData?.title}
            </DialogTitle>
            <DialogDescription>
              Detailed rotation impact analysis and optimization plan
            </DialogDescription>
          </DialogHeader>
          
          {selectedRotationData?.rotationPlan && (
            <div className="space-y-6">
              <Tabs defaultValue="comparison" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="comparison">Plan Comparison</TabsTrigger>
                  <TabsTrigger value="schedule-impact">Schedule Impact Analysis</TabsTrigger>
                  <TabsTrigger value="actions">Crew Actions</TabsTrigger>
                  <TabsTrigger value="advantages">Advantages</TabsTrigger>
                  <TabsTrigger value="considerations">Considerations</TabsTrigger>
                </TabsList>
                
                <TabsContent value="comparison" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-red-600">Original Plan</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {selectedRotationData.rotationPlan.originalPlan.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2 bg-red-50 rounded">
                              <div>
                                <div className="font-medium">{item.flight}</div>
                                <div className="text-sm text-muted-foreground">{item.crew || item.aircraft}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm">{item.time}</div>
                                <Badge variant="outline" className="text-xs">
                                  {item.status}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-green-600">Optimized Plan</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {selectedRotationData.rotationPlan.newPlan.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2 bg-green-50 rounded">
                              <div>
                                <div className="font-medium">{item.flight}</div>
                                <div className="text-sm text-muted-foreground">{item.crew || item.aircraft}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm">{item.time}</div>
                                <Badge variant="outline" className="text-xs">
                                  {item.status}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Crew Officer Actions */}
                  {selectedRotationData.rotationPlan.crewOfficerActions && (
                    <Card className="mt-4">
                      <CardHeader>
                        <CardTitle className="text-flydubai-navy">Crew Officer Action Plan</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {selectedRotationData.rotationPlan.crewOfficerActions.map((action, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                              <div className="w-6 h-6 bg-flydubai-blue text-white rounded-full flex items-center justify-center text-xs font-medium mt-1">
                                {idx + 1}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="font-medium text-flydubai-navy">{action.action}</h4>
                                  <Badge variant="outline" className="text-xs">
                                    {action.timeline}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{action.details}</p>
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-flydubai-blue font-medium">{action.responsibility}</span>
                                  <Badge className={action.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                                   action.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' : 
                                                   'bg-gray-100 text-gray-800'}>
                                    {action.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Cascade Analysis */}
                  {selectedRotationData.rotationPlan.cascadeAnalysis && (
                    <Card className="mt-4">
                      <CardHeader>
                        <CardTitle className="text-yellow-600">Cascade Impact Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Affected Crew Members</h4>
                            <div className="space-y-2">
                              {selectedRotationData.rotationPlan.cascadeAnalysis.affectedCrewMembers.map((crew, idx) => (
                                <div key={idx} className="p-3 bg-yellow-50 rounded border border-yellow-200">
                                  <div className="font-medium text-yellow-800">{crew.name}</div>
                                  <div className="text-sm text-yellow-700 mt-1">{crew.currentStatus}</div>
                                  <div className="text-xs text-muted-foreground mt-1">
                                    Next: {crew.nextAssignment} - {crew.impact}
                                  </div>
                                  <div className="text-xs font-medium text-yellow-600 mt-1">
                                    Action: {crew.action}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="schedule-impact" className="space-y-4">
                  {scheduleImpactData && (
                    <div className="space-y-6">
                      {/* Analysis Type Header */}
                      <Card className="border-flydubai-blue bg-blue-50">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-flydubai-blue">
                            <Activity className="h-5 w-5" />
                            {scheduleImpactData.analysisType}
                          </CardTitle>
                          <p className="text-sm text-blue-700">
                            Focus: {scheduleImpactData.primaryFocus}
                          </p>
                        </CardHeader>
                      </Card>

                      {/* Network Impact Summary - Universal */}
                      <Card className="border-flydubai-orange bg-orange-50">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-flydubai-orange">
                            <Network className="h-5 w-5" />
                            {scheduleImpactData.analysisType?.includes('Aircraft') ? 'Aircraft Network Impact' :
                             scheduleImpactData.analysisType?.includes('Crew') ? 'Crew Network Impact' :
                             scheduleImpactData.analysisType?.includes('Delay') ? 'Passenger Network Impact' :
                             scheduleImpactData.analysisType?.includes('Cancellation') ? 'Revenue & Passenger Impact' :
                             scheduleImpactData.analysisType?.includes('Route') ? 'Route Change Impact' :
                             'Network Impact Summary'}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-3 bg-white rounded border border-orange-200">
                              <div className="text-2xl font-bold text-red-600">
                                {scheduleImpactData.networkImpactSummary?.totalFlightsAffected || 
                                 scheduleImpactData.networkImpactSummary?.totalFlightsAtRisk || 0}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {scheduleImpactData.analysisType?.includes('Aircraft') ? 'Aircraft Affected' : 'Flights Affected'}
                              </div>
                            </div>
                            <div className="text-center p-3 bg-white rounded border border-orange-200">
                              <div className="text-2xl font-bold text-orange-600">
                                {scheduleImpactData.networkImpactSummary?.totalPassengersAffected || 0}
                              </div>
                              <div className="text-sm text-muted-foreground">Passengers Affected</div>
                            </div>
                            <div className="text-center p-3 bg-white rounded border border-orange-200">
                              <div className="text-2xl font-bold text-flydubai-orange">
                                {scheduleImpactData.networkImpactSummary?.totalRevenueAtRisk || 
                                 scheduleImpactData.revenueImpact?.totalFinancialImpact || 'AED 0'}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {scheduleImpactData.analysisType?.includes('Cancellation') ? 'Financial Impact' : 'Revenue at Risk'}
                              </div>
                            </div>
                            <div className="text-center p-3 bg-white rounded border border-orange-200">
                              <div className="text-2xl font-bold text-red-600">
                                {scheduleImpactData.networkImpactSummary?.criticalConflicts || 0}
                              </div>
                              <div className="text-sm text-muted-foreground">Critical Issues</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Dynamic Content Based on Analysis Type */}
                      {scheduleImpactData.analysisType?.includes('Aircraft') && scheduleImpactData.impactedAircraft && (
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-flydubai-navy">
                              <Plane className="h-5 w-5" />
                              Aircraft Schedule Conflicts Analysis
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-6">
                              {scheduleImpactData.impactedAircraft.map((aircraft, index) => (
                                <Card key={aircraft.id} className="border-yellow-200 bg-yellow-50">
                                  <CardHeader>
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-flydubai-blue text-white rounded-full flex items-center justify-center">
                                          <Plane className="h-5 w-5" />
                                        </div>
                                        <div>
                                          <CardTitle className="text-flydubai-navy">{aircraft.registrationNumber}</CardTitle>
                                          <p className="text-sm text-muted-foreground">{aircraft.aircraftType} - {aircraft.role}</p>
                                        </div>
                                      </div>
                                      <Badge className={`${
                                        aircraft.currentStatus?.includes('Grounded') ? 'bg-red-100 text-red-800 border-red-200' :
                                        aircraft.currentStatus?.includes('Available') ? 'bg-green-100 text-green-800 border-green-200' :
                                        'bg-yellow-100 text-yellow-800 border-yellow-200'
                                      }`}>
                                        {aircraft.currentStatus}
                                      </Badge>
                                    </div>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-4">
                                      {/* Aircraft Schedule Conflicts */}
                                      <div>
                                        <h4 className="font-medium text-flydubai-navy mb-3">Schedule Impact</h4>
                                        <div className="space-y-3">
                                          {aircraft.upcomingSchedule.map((flight, flightIndex) => (
                                            <div key={flightIndex} className={`p-3 rounded-lg border ${
                                              flight.status === 'GROUNDED' || flight.status === 'DELAYED' ? 'bg-red-50 border-red-200' :
                                              flight.status === 'AT_RISK' ? 'bg-yellow-50 border-yellow-200' :
                                              'bg-green-50 border-green-200'
                                            }`}>
                                              <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-3">
                                                  <Badge className="bg-flydubai-blue text-white">
                                                    {flight.flightNumber}
                                                  </Badge>
                                                  <div>
                                                    <div className="font-medium">{flight.route}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                      {flight.scheduledDeparture} - {flight.scheduledArrival}
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="text-right">
                                                  <Badge className={`${
                                                    flight.status === 'GROUNDED' || flight.status === 'DELAYED' ? 'bg-red-100 text-red-700 border-red-200' :
                                                    flight.status === 'AT_RISK' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                                                    'bg-green-100 text-green-700 border-green-200'
                                                  }`}>
                                                    {flight.status}
                                                  </Badge>
                                                  <div className="text-sm font-medium mt-1">{flight.impact} Impact</div>
                                                </div>
                                              </div>
                                              <div className="text-sm">
                                                <span className="text-muted-foreground">Reason:</span>
                                                <span className="ml-1 text-gray-700">{flight.conflictReason}</span>
                                              </div>
                                              <div className="flex items-center gap-4 text-sm mt-2">
                                                <span><strong>Passengers:</strong> {flight.passengerCount}</span>
                                                <span><strong>Revenue:</strong> <span className="text-flydubai-orange font-medium">{flight.revenue}</span></span>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>

                                      {/* Maintenance Impact */}
                                      {aircraft.maintenanceImpact && (
                                        <div className="p-4 bg-blue-50 rounded border border-blue-200">
                                          <h4 className="font-medium text-flydubai-blue mb-2">Maintenance Impact</h4>
                                          <div className="space-y-2 text-sm">
                                            <div><strong>Current:</strong> {aircraft.maintenanceImpact.currentMaintenance}</div>
                                            <div><strong>Completion:</strong> {aircraft.maintenanceImpact.estimatedCompletion}</div>
                                            <div><strong>Next Scheduled:</strong> {aircraft.maintenanceImpact.nextScheduledMaintenance}</div>
                                            <div><strong>Window Status:</strong> {aircraft.maintenanceImpact.maintenanceWindow}</div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Crew Analysis - Only show for crew-related impacts */}
                      {scheduleImpactData.analysisType?.includes('Crew') && scheduleImpactData.impactedCrewMembers && (
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-flydubai-navy">
                              <Users className="h-5 w-5" />
                              Crew Schedule Conflicts Analysis
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-6">
                              {scheduleImpactData.impactedCrewMembers.map((crewMember, index) => (
                              <Card key={crewMember.id} className="border-yellow-200 bg-yellow-50">
                                <CardHeader>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 bg-flydubai-blue text-white rounded-full flex items-center justify-center">
                                        <Users className="h-5 w-5" />
                                      </div>
                                      <div>
                                        <CardTitle className="text-flydubai-navy">{crewMember.name}</CardTitle>
                                        <p className="text-sm text-muted-foreground">{crewMember.role}</p>
                                      </div>
                                    </div>
                                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                                      Current Assignment: {crewMember.currentAssignment}
                                    </Badge>
                                  </div>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-4">
                                    {/* Current Duty Period */}
                                    <div className="p-3 bg-blue-50 rounded border border-blue-200">
                                      <h4 className="font-medium text-flydubai-navy mb-2">Current Duty Period</h4>
                                      <div className="flex items-center gap-4 text-sm">
                                        <span><strong>Start:</strong> {crewMember.currentDutyStart}</span>
                                        <span><strong>End:</strong> {crewMember.currentDutyEnd}</span>
                                      </div>
                                    </div>

                                    {/* Upcoming Schedule Conflicts */}
                                    <div>
                                      <h4 className="font-medium text-flydubai-navy mb-3">Upcoming Schedule Conflicts</h4>
                                      <div className="space-y-3">
                                        {crewMember.upcomingSchedule.map((flight, flightIndex) => (
                                          <div key={flightIndex} className={`p-3 rounded-lg border ${
                                            flight.status === 'CONFLICT' ? 'bg-red-50 border-red-200' :
                                            flight.status === 'AT_RISK' ? 'bg-yellow-50 border-yellow-200' :
                                            'bg-green-50 border-green-200'
                                          }`}>
                                            <div className="flex items-center justify-between mb-2">
                                              <div className="flex items-center gap-3">
                                                <Badge className="bg-flydubai-blue text-white">
                                                  {flight.flightNumber}
                                                </Badge>
                                                <div>
                                                  <div className="font-medium">{flight.route}</div>
                                                  <div className="text-sm text-muted-foreground">
                                                    {flight.scheduledDeparture} - {flight.scheduledArrival}
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="text-right">
                                                <Badge className={`${
                                                  flight.status === 'CONFLICT' ? 'bg-red-100 text-red-700 border-red-200' :
                                                  flight.status === 'AT_RISK' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                                                  'bg-green-100 text-green-700 border-green-200'
                                                }`}>
                                                  {flight.status}
                                                </Badge>
                                                <div className="text-sm font-medium mt-1">{flight.impact} Impact</div>
                                              </div>
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                              <div>
                                                <span className="text-muted-foreground">Rest Period:</span>
                                                <span className={`ml-1 font-medium ${
                                                  flight.status === 'CONFLICT' ? 'text-red-600' :
                                                  flight.status === 'AT_RISK' ? 'text-yellow-600' :
                                                  'text-green-600'
                                                }`}>
                                                  {flight.restPeriod}
                                                </span>
                                                <span className="text-muted-foreground ml-1">(Min: {flight.minRequiredRest})</span>
                                              </div>
                                              <div>
                                                <span className="text-muted-foreground">Revenue Risk:</span>
                                                <span className="ml-1 font-medium text-flydubai-orange">{flight.revenue}</span>
                                              </div>
                                            </div>
                                            
                                            <div className="mt-2 text-sm">
                                              <span className="text-muted-foreground">Conflict Reason:</span>
                                              <span className="ml-1 text-gray-700">{flight.conflictReason}</span>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Alternative Crew Options */}
                                    <div>
                                      <h4 className="font-medium text-green-700 mb-3">Alternative Crew Options</h4>
                                      <div className="space-y-3">
                                        {crewMember.alternatives.map((alternative, altIndex) => (
                                          <div key={altIndex} className="p-3 bg-green-50 rounded border border-green-200">
                                            <div className="flex items-center justify-between mb-2">
                                              <div>
                                                <div className="font-medium text-green-800">{alternative.name}</div>
                                                <div className="text-sm text-muted-foreground">{alternative.role}</div>
                                              </div>
                                              <div className="text-right">
                                                <Badge className="bg-green-100 text-green-700 border-green-200">
                                                  {alternative.availability}
                                                </Badge>
                                                <div className="text-sm font-medium text-flydubai-orange mt-1">{alternative.cost}</div>
                                              </div>
                                            </div>
                                            
                                            <div className="text-sm mb-2">
                                              <span className="text-muted-foreground">Qualifications:</span>
                                              <span className="ml-1">{alternative.qualifications.join(', ')}</span>
                                            </div>
                                            
                                            <div className="text-sm mb-2">
                                              <span className="text-muted-foreground">Next Assignment:</span>
                                              <span className="ml-1">{alternative.nextAssignment}</span>
                                            </div>
                                            
                                            <div className="text-sm">
                                              <span className="text-muted-foreground">Advantages:</span>
                                              <ul className="ml-1 mt-1">
                                                {alternative.advantages.map((advantage, advIndex) => (
                                                  <li key={advIndex} className="flex items-start gap-2">
                                                    <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                                                    <span className="text-xs">{advantage}</span>
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Recommended Action */}
                                    <div className="p-4 bg-blue-50 rounded border border-blue-200">
                                      <h4 className="font-medium text-flydubai-blue mb-2">Recommended Action</h4>
                                      <div className="space-y-2 text-sm">
                                        <div><strong>Action:</strong> {crewMember.recommendedAction.action}</div>
                                        <div><strong>Reason:</strong> {crewMember.recommendedAction.reason}</div>
                                        <div><strong>Cost Saving:</strong> <span className="text-green-600 font-medium">{crewMember.recommendedAction.costSaving}</span></div>
                                        <div><strong>Implementation:</strong> {crewMember.recommendedAction.implementation}</div>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                      )}

                      {/* Passenger Impact Analysis - For delay and cancellation */}
                      {(scheduleImpactData.analysisType?.includes('Delay') || scheduleImpactData.analysisType?.includes('Cancellation')) && scheduleImpactData.passengerImpact && (
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-flydubai-navy">
                              <Users className="h-5 w-5" />
                              Passenger Impact Analysis
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-6">
                              {scheduleImpactData.passengerImpact.map((category, index) => (
                                <Card key={index} className="border-orange-200 bg-orange-50">
                                  <CardHeader>
                                    <CardTitle className="text-flydubai-orange">{category.category}</CardTitle>
                                    <p className="text-sm text-orange-700">{category.description}</p>
                                    <div className="text-lg font-semibold text-flydubai-navy">
                                      {category.affectedCount} passengers affected
                                    </div>
                                  </CardHeader>
                                  <CardContent>
                                    {category.connectionDetails && (
                                      <div className="space-y-3">
                                        <h4 className="font-medium">Connection Details</h4>
                                        {category.connectionDetails.map((connection, connIndex) => (
                                          <div key={connIndex} className="p-3 bg-white rounded border">
                                            <div className="flex items-center justify-between mb-2">
                                              <div>
                                                <span className="font-medium">{connection.connectionFlight}</span>
                                                <span className="text-sm text-muted-foreground ml-2">
                                                  {connection.passengerCount} passengers
                                                </span>
                                              </div>
                                              <Badge className={`${
                                                connection.status === 'MISSED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                              }`}>
                                                {connection.status}
                                              </Badge>
                                            </div>
                                            <div className="text-sm space-y-1">
                                              <div>MCT Required: {connection.minimumConnectionTime} | Available: {connection.availableTime}</div>
                                              <div>Rebooking: {connection.rebookingOptions.join(', ')}</div>
                                              <div className="font-medium text-flydubai-orange">Cost: {connection.compensationCost}</div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                    
                                    {category.accommodationRequirements && (
                                      <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                                        <h4 className="font-medium text-flydubai-blue mb-2">Accommodation Requirements</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                                          {Object.entries(category.accommodationRequirements).map(([service, details]) => (
                                            <div key={service} className="p-2 bg-white rounded">
                                              <div className="font-medium capitalize">{service}</div>
                                              <div>Required: {details.required ? 'Yes' : 'No'}</div>
                                              <div className="text-flydubai-orange font-medium">{details.cost}</div>
                                              {details.reason && <div className="text-xs text-muted-foreground">{details.reason}</div>}
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Route Change Analysis - For route changes */}
                      {scheduleImpactData.analysisType?.includes('Route') && (
                        <div className="space-y-6">
                          {/* Route Change Details */}
                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2 text-flydubai-navy">
                                <Route className="h-5 w-5" />
                                Route Change Details
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                  <h4 className="font-medium text-red-700">Original Route</h4>
                                  <div className="p-3 bg-red-50 rounded border border-red-200">
                                    <div className="font-medium">{scheduleImpactData.routeChangeDetails?.originalRoute}</div>
                                  </div>
                                </div>
                                <div className="space-y-3">
                                  <h4 className="font-medium text-green-700">New Route</h4>
                                  <div className="p-3 bg-green-50 rounded border border-green-200">
                                    <div className="font-medium">{scheduleImpactData.routeChangeDetails?.newRoute}</div>
                                    <div className="text-sm text-muted-foreground mt-1">
                                      + {scheduleImpactData.routeChangeDetails?.alternativeTransport}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>Distance Change: {scheduleImpactData.routeChangeDetails?.routeDistance}</div>
                                <div>Time Change: {scheduleImpactData.routeChangeDetails?.flightTimeChange}</div>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Crew Qualification Impact */}
                          {scheduleImpactData.crewQualificationImpact && (
                            <Card>
                              <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-flydubai-navy">
                                  <Shield className="h-5 w-5" />
                                  Crew Qualification Impact
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-3">
                                  {scheduleImpactData.crewQualificationImpact.map((crew, index) => (
                                    <div key={index} className="p-3 bg-blue-50 rounded border border-blue-200">
                                      <div className="flex items-center justify-between mb-2">
                                        <div>
                                          <div className="font-medium">{crew.crewMember}</div>
                                          <div className="text-sm text-muted-foreground">{crew.role}</div>
                                        </div>
                                        <Badge className={`${
                                          crew.status === 'QUALIFIED' ? 'bg-green-100 text-green-700' :
                                          crew.status === 'REQUIRES_BRIEF' ? 'bg-yellow-100 text-yellow-700' :
                                          'bg-red-100 text-red-700'
                                        }`}>
                                          {crew.status}
                                        </Badge>
                                      </div>
                                      <div className="text-sm space-y-1">
                                        <div><strong>Current:</strong> {crew.currentQualifications.join(', ')}</div>
                                        <div><strong>Required:</strong> {crew.requiredQualifications.join(', ')}</div>
                                        <div><strong>Action:</strong> {crew.additionalTraining}</div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </div>
                      )}

                      {/* Additional Analysis Sections based on type */}
                      {scheduleImpactData.maintenanceAnalysis && (
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-flydubai-navy">
                              <Wrench className="h-5 w-5" />
                              Maintenance Impact Analysis
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                              <div className="text-center p-3 bg-gray-50 rounded">
                                <div className="text-lg font-bold text-orange-600">{scheduleImpactData.maintenanceAnalysis.affectedMaintenanceWindows}</div>
                                <div className="text-sm text-muted-foreground">Windows Affected</div>
                              </div>
                              <div className="text-center p-3 bg-gray-50 rounded">
                                <div className="text-lg font-bold text-red-600">{scheduleImpactData.maintenanceAnalysis.reschedulingRequired}</div>
                                <div className="text-sm text-muted-foreground">Require Rescheduling</div>
                              </div>
                              <div className="text-center p-3 bg-gray-50 rounded">
                                <div className="text-lg font-bold text-green-600">{scheduleImpactData.maintenanceAnalysis.complianceRisk}</div>
                                <div className="text-sm text-muted-foreground">Compliance Risk</div>
                              </div>
                              <div className="text-center p-3 bg-gray-50 rounded">
                                <div className="text-lg font-bold text-flydubai-orange">{scheduleImpactData.maintenanceAnalysis.additionalMaintenanceCosts}</div>
                                <div className="text-sm text-muted-foreground">Additional Costs</div>
                              </div>
                            </div>
                            
                            {scheduleImpactData.maintenanceAnalysis.maintenanceConflicts && (
                              <div>
                                <h4 className="font-medium mb-3">Maintenance Conflicts</h4>
                                <div className="space-y-2">
                                  {scheduleImpactData.maintenanceAnalysis.maintenanceConflicts.map((conflict, index) => (
                                    <div key={index} className="p-3 bg-yellow-50 rounded border border-yellow-200">
                                      <div className="flex items-center justify-between mb-1">
                                        <span className="font-medium">{conflict.aircraft} - {conflict.maintenanceType}</span>
                                        <Badge className="bg-yellow-100 text-yellow-700 text-xs">Conflict</Badge>
                                      </div>
                                      <div className="text-sm space-y-1">
                                        <div><strong>Original:</strong> {conflict.originalSchedule}</div>
                                        <div><strong>Issue:</strong> {conflict.conflict}</div>
                                        <div><strong>Resolution:</strong> <span className="text-green-600">{conflict.resolution}</span></div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      )}

                      {/* Recommended Mitigations */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-green-700">
                            <Shield className="h-5 w-5" />
                            Recommended Mitigations
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {scheduleImpactData.networkImpactSummary.recommendedMitigations.map((mitigation, index) => (
                              <div key={index} className="flex items-start gap-4 p-4 bg-green-50 rounded border border-green-200">
                                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                  {mitigation.priority}
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium text-green-800 mb-1">{mitigation.action}</h4>
                                  <p className="text-sm text-gray-700 mb-2">{mitigation.impact}</p>
                                  <div className="flex items-center gap-4 text-xs">
                                    <span><strong>Cost:</strong> <span className="text-green-600">{mitigation.cost}</span></span>
                                    <span><strong>Timeline:</strong> {mitigation.timeline}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Compliance Analysis */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-flydubai-navy">
                            <CheckSquare className="h-5 w-5" />
                            Regulatory Compliance Analysis
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                            <div className="text-center p-3 bg-gray-50 rounded">
                              <div className="text-lg font-bold text-red-600">{scheduleImpactData.complianceAnalysis.dutyTimeViolations}</div>
                              <div className="text-sm text-muted-foreground">Duty Time Violations</div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded">
                              <div className="text-lg font-bold text-yellow-600">{scheduleImpactData.complianceAnalysis.restPeriodViolations}</div>
                              <div className="text-sm text-muted-foreground">Rest Period Violations</div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded">
                              <div className="text-lg font-bold text-green-600">{scheduleImpactData.complianceAnalysis.totalComplianceScore}%</div>
                              <div className="text-sm text-muted-foreground">Compliance Score</div>
                            </div>
                          </div>

                          {scheduleImpactData.complianceAnalysis.riskMitigation.length > 0 && (
                            <div>
                              <h4 className="font-medium mb-3">Risk Mitigation Plan</h4>
                              <div className="space-y-2">
                                {scheduleImpactData.complianceAnalysis.riskMitigation.map((risk, index) => (
                                  <div key={index} className="p-3 bg-yellow-50 rounded border border-yellow-200">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="font-medium text-yellow-800">{risk.risk}</span>
                                      <div className="flex gap-2">
                                        <Badge className="bg-yellow-100 text-yellow-700 text-xs">{risk.probability} Probability</Badge>
                                        <Badge className="bg-orange-100 text-orange-700 text-xs">{risk.impact} Impact</Badge>
                                      </div>
                                    </div>
                                    <p className="text-sm text-gray-700">{risk.mitigation}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      {/* Cost-Benefit Analysis */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-flydubai-orange">
                            <DollarSign className="h-5 w-5" />
                            Cost-Benefit Analysis
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                              <h4 className="font-medium text-red-700">Current Option Impact</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Direct Cost:</span>
                                  <span className="font-medium text-red-600">{scheduleImpactData.costBenefitAnalysis.currentOption.directCost}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Cascade Disruption:</span>
                                  <span className="font-medium text-red-600">{scheduleImpactData.costBenefitAnalysis.currentOption.cascadeDisruptionCost}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Passenger Compensation:</span>
                                  <span className="font-medium text-red-600">{scheduleImpactData.costBenefitAnalysis.currentOption.passengerCompensation}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-bold">
                                  <span>Total Cost:</span>
                                  <span className="text-red-600">{scheduleImpactData.costBenefitAnalysis.currentOption.totalCost}</span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <h4 className="font-medium text-green-700">Recommended Option</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Direct Cost:</span>
                                  <span className="font-medium text-green-600">{scheduleImpactData.costBenefitAnalysis.recommendedOption.directCost}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Cascade Disruption:</span>
                                  <span className="font-medium text-green-600">{scheduleImpactData.costBenefitAnalysis.recommendedOption.cascadeDisruptionCost}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Passenger Compensation:</span>
                                  <span className="font-medium text-green-600">{scheduleImpactData.costBenefitAnalysis.recommendedOption.passengerCompensation}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-bold">
                                  <span>Total Cost:</span>
                                  <span className="text-green-600">{scheduleImpactData.costBenefitAnalysis.recommendedOption.totalCost}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-bold text-green-800">Net Savings with Recommended Option</h4>
                                <p className="text-sm text-green-700">Return on Investment: {scheduleImpactData.costBenefitAnalysis.roi}</p>
                              </div>
                              <div className="text-2xl font-bold text-green-600">
                                {scheduleImpactData.costBenefitAnalysis.netSavings}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="actions" className="space-y-4">
                  {selectedRotationData.rotationPlan.crewOfficerActions && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-flydubai-navy">Detailed Crew Officer Actions</CardTitle>
                        <p className="text-sm text-muted-foreground">Step-by-step actions to minimize cascading effects</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {selectedRotationData.rotationPlan.crewOfficerActions.map((action, idx) => (
                            <div key={idx} className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-white">
                              <div className="flex items-start gap-4">
                                <div className="w-8 h-8 bg-flydubai-blue text-white rounded-full flex items-center justify-center text-sm font-bold">
                                  {idx + 1}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-flydubai-navy">{action.action}</h4>
                                    <Badge variant="outline" className="text-xs font-medium">
                                      {action.timeline}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-gray-700 mb-3">{action.details}</p>
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs text-flydubai-blue font-medium bg-blue-100 px-2 py-1 rounded">
                                      {action.responsibility}
                                    </span>
                                    <Badge className={
                                      action.status === 'completed' ? 'bg-green-100 text-green-800 border-green-200' : 
                                      action.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : 
                                      'bg-gray-100 text-gray-800 border-gray-200'
                                    }>
                                      {action.status.replace('_', ' ').toUpperCase()}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Cascade Impact Matrix */}
                  {selectedRotationData.rotationPlan.cascadeAnalysis && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-yellow-600">Cascade Impact Matrix</CardTitle>
                        <p className="text-sm text-muted-foreground">Analysis of all affected crew and operations</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Affected Crew Analysis */}
                          <div>
                            <h4 className="font-medium mb-3 text-flydubai-navy">Crew Impact Analysis</h4>
                            <div className="grid gap-3">
                              {selectedRotationData.rotationPlan.cascadeAnalysis.affectedCrewMembers.map((crew, idx) => (
                                <div key={idx} className="border rounded-lg p-3 bg-gradient-to-r from-yellow-50 to-white">
                                  <div className="flex items-start justify-between mb-2">
                                    <h5 className="font-semibold text-yellow-800">{crew.name}</h5>
                                    <Badge variant="outline" className="text-xs">
                                      {crew.currentStatus.includes('rest') ? 'REST' : 
                                       crew.currentStatus.includes('standby') ? 'STANDBY' : 'ACTIVE'}
                                    </Badge>
                                  </div>
                                  <div className="space-y-1 text-sm">
                                    <div><span className="font-medium">Status:</span> {crew.currentStatus}</div>
                                    <div><span className="font-medium">Next Assignment:</span> {crew.nextAssignment}</div>
                                    <div><span className="font-medium">Impact:</span> <span className={crew.impact.includes('risk') ? 'text-red-600' : 'text-green-600'}>{crew.impact}</span></div>
                                    <div><span className="font-medium">Action Required:</span> <span className="text-flydubai-blue">{crew.action}</span></div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Network Effects */}
                          {(selectedRotationData.rotationPlan.cascadeAnalysis.baseOperationsImpact || selectedRotationData.rotationPlan.cascadeAnalysis.networkImpact) && (
                            <div>
                              <h4 className="font-medium mb-3 text-flydubai-navy">Network Operations Impact</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {Object.entries(selectedRotationData.rotationPlan.cascadeAnalysis.baseOperationsImpact || selectedRotationData.rotationPlan.cascadeAnalysis.networkImpact || {}).map(([location, impact], idx) => (
                                  <div key={idx} className="p-3 bg-blue-50 rounded border border-blue-200">
                                    <div className="font-medium text-flydubai-blue uppercase">{location}</div>
                                    <div className="text-sm text-gray-700 mt-1">{impact}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                
                <TabsContent value="advantages" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-green-600">Key Advantages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedRotationData.rotationPlan.advantages.map((advantage, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{advantage}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Cost Breakdown */}
                  {selectedRotationData.rotationPlan.costBreakdown && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-flydubai-blue">Cost Impact Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {Object.entries(selectedRotationData.rotationPlan.costBreakdown).map(([key, value], idx) => (
                            <div key={idx} className="flex items-center justify-between p-2 bg-blue-50 rounded">
                              <span className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                              <span className="text-sm font-bold text-flydubai-blue">{value}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                
                <TabsContent value="considerations" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-yellow-600">Important Considerations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedRotationData.rotationPlan.considerations.map((consideration, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{consideration}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Downstream Effects Timeline */}
                  {selectedRotationData.rotationPlan.cascadeAnalysis?.downstreamEffects && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-orange-600">Downstream Effects Timeline</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {Object.entries(selectedRotationData.rotationPlan.cascadeAnalysis.downstreamEffects).map(([timeframe, effect], idx) => (
                            <div key={idx} className="flex items-start gap-3 p-3 bg-orange-50 rounded border-l-4 border-orange-200">
                              <div className="font-medium text-orange-800 capitalize min-w-20">{timeframe}:</div>
                              <div className="text-sm text-orange-700">{effect}</div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Action Summary */}
      <Card className="bg-gradient-flydubai-light border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <TrendingUp className="h-6 w-6 text-flydubai-blue" />
              <div>
                <h3 className="font-medium text-flydubai-navy">Recovery Impact Summary</h3>
                <p className="text-sm text-muted-foreground">
                  Best option saves AED {parseInt(scenarioData.options[2]?.cost.replace(/[^\d]/g, '')) - parseInt(scenarioData.options[0]?.cost.replace(/[^\d]/g, ''))}K vs worst case scenario
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onCompare && onCompare()} className="border-flydubai-blue text-flydubai-blue hover:bg-blue-50">
                <RefreshCw className="h-4 w-4 mr-2" />
                Compare Options
              </Button>
              <Button 
                onClick={() => handleExecuteOption(scenarioData.options[0])}
                className="btn-flydubai-primary"
              >
                <Target className="h-4 w-4 mr-2" />
                Execute Recommended
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface RecoveryOptionsGeneratorProps {
  selectedFlight: any
  onSelectPlan: (plan: any) => void
  onCompare: () => void
}

export function RecoveryOptionsGenerator({ selectedFlight, onSelectPlan, onCompare }: RecoveryOptionsGeneratorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recovery Options Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Recovery options generator component</p>
      </CardContent>
    </Card>
  )
}
