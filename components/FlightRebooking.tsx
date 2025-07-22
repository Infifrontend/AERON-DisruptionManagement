'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Alert, AlertDescription } from './ui/alert'
import { Separator } from './ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Checkbox } from './ui/checkbox'
import { 
  Plane, 
  Clock, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Calendar,
  MapPin,
  CreditCard,
  FileText
} from 'lucide-react'

export function FlightRebooking() {
  const [selectedFlight, setSelectedFlight] = useState('')
  const [selectedPassengers, setSelectedPassengers] = useState<string[]>([])

  const alternativeFlights = [
    {
      id: 'FZ125',
      route: 'DXB → BOM',
      departure: '08:30',
      arrival: '12:45',
      aircraft: 'Boeing 737-800',
      seatsAvailable: 45,
      price: 1250
    },
    {
      id: 'FZ127',
      route: 'DXB → BOM',
      departure: '14:15',
      arrival: '18:30',
      aircraft: 'Boeing 737-MAX',
      seatsAvailable: 32,
      price: 1380
    }
  ]

  const passengers = [
    { id: 'PAX001', name: 'Ahmed Al-Mansoori', originalSeat: '3A', class: 'Business' },
    { id: 'PAX002', name: 'Sarah Johnson', originalSeat: '15C', class: 'Economy' },
    { id: 'PAX003', name: 'Mohammed Hassan', originalSeat: '1A', class: 'First' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-flydubai-navy">Flight Rebooking</h2>
        <Badge variant="destructive" className="px-3 py-1">
          <AlertTriangle className="h-4 w-4 mr-1" />
          Flight FZ123 Cancelled
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plane className="h-5 w-5" />
              Alternative Flights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {alternativeFlights.map((flight) => (
              <div key={flight.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{flight.id}</h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      {flight.route}
                    </div>
                  </div>
                  <Badge variant="outline">{flight.aircraft}</Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Departure: {flight.departure}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Arrival: {flight.arrival}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{flight.seatsAvailable} seats available</span>
                  </div>
                  <div className="text-lg font-bold">AED {flight.price}</div>
                </div>
                
                <Button 
                  className="w-full" 
                  variant={selectedFlight === flight.id ? "default" : "outline"}
                  onClick={() => setSelectedFlight(flight.id)}
                >
                  {selectedFlight === flight.id ? 'Selected' : 'Select Flight'}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Passenger Selection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Select</TableHead>
                  <TableHead>Passenger</TableHead>
                  <TableHead>Original Seat</TableHead>
                  <TableHead>Class</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {passengers.map((passenger) => (
                  <TableRow key={passenger.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedPassengers.includes(passenger.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedPassengers([...selectedPassengers, passenger.id])
                          } else {
                            setSelectedPassengers(selectedPassengers.filter(id => id !== passenger.id))
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{passenger.name}</TableCell>
                    <TableCell>{passenger.originalSeat}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{passenger.class}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Separator />
            
            <div className="space-y-3">
              <h4 className="font-semibold">Rebooking Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Selected Passengers:</span>
                  <span className="font-medium">{selectedPassengers.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Selected Flight:</span>
                  <span className="font-medium">{selectedFlight || 'None'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Additional Cost:</span>
                  <span className="font-medium">AED 0</span>
                </div>
              </div>
            </div>

            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Passengers will receive SMS and email confirmation for new booking.
              </AlertDescription>
            </Alert>

            <Button 
              className="w-full bg-flydubai-navy hover:bg-flydubai-navy/90"
              disabled={!selectedFlight || selectedPassengers.length === 0}
            >
              <FileText className="h-4 w-4 mr-2" />
              Confirm Rebooking
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const availableFlights = [
  {
    id: 'ALT001',
    flightNumber: 'EK124',
    route: 'DXB → LHR',
    departure: '2025-06-07 10:30',
    arrival: '2025-06-07 14:45',
    aircraft: 'A380',
    availableSeats: {
      first: 8,
      business: 24,
      economy: 156
    },
    price: {
      first: 2500,
      business: 1200,
      economy: 450
    },
    status: 'Available'
  },
  {
    id: 'ALT002',
    flightNumber: 'EK125',
    route: 'DXB → LHR',
    departure: '2025-06-07 16:15',
    arrival: '2025-06-07 20:30',
    aircraft: 'B777',
    availableSeats: {
      first: 4,
      business: 18,
      economy: 89
    },
    price: {
      first: 2500,
      business: 1200,
      economy: 450
    },
    status: 'Available'
  },
  {
    id: 'PART001',
    flightNumber: 'BA115',
    route: 'DXB → LHR',
    departure: '2025-06-07 11:45',
    arrival: '2025-06-07 16:00',
    aircraft: 'A350',
    carrier: 'British Airways',
    availableSeats: {
      first: 2,
      business: 12,
      economy: 45
    },
    price: {
      first: 2800,
      business: 1350,
      economy: 520
    },
    status: 'Partner Flight',
    agreement: 'Codeshare Agreement'
  }
]

export function FlightRebooking({ selectedPassengers, passengers }) {
  const [rebookingOptions, setRebookingOptions] = useState({})
  const [showFIMOptions, setShowFIMOptions] = useState(false)
  const [selectedFlight, setSelectedFlight] = useState('')
  const [classPreference, setClassPreference] = useState('same')

  const selectedPassengerData = passengers.filter(p => selectedPassengers.includes(p.id))

  const handleRebookingOptionChange = (passengerId, option) => {
    setRebookingOptions(prev => ({
      ...prev,
      [passengerId]: option
    }))
  }

  const handleBulkRebook = () => {
    if (!selectedFlight) {
      alert('Please select a flight for rebooking')
      return
    }

    if (selectedPassengers.length === 0) {
      alert('Please select passengers to rebook')
      return
    }

    const flight = availableFlights.find(f => f.id === selectedFlight)
    alert(`Rebooking ${selectedPassengers.length} passengers to flight ${flight.flightNumber}`)
  }

  const getPassengerTypeInfo = (type) => {
    switch (type) {
      case 'Ticketed':
        return {
          description: 'Confirmed ticket with seat assignment',
          rebookingRules: 'Standard rebooking rules apply. No additional charges for same class.',
          color: 'bg-green-100 text-green-700 border-green-200'
        }
      case 'Ticketless':
        return {
          description: 'Booking without issued ticket',
          rebookingRules: 'Can be rebooked once ticket is issued. May require payment.',
          color: 'bg-orange-100 text-orange-700 border-orange-200'
        }
      case 'FIM':
        return {
          description: 'Flight Interruption Manifest - Partner airline agreement',
          rebookingRules: 'Subject to interline agreement terms. Authorization required.',
          color: 'bg-purple-100 text-purple-700 border-purple-200'
        }
      default:
        return {
          description: 'Unknown passenger type',
          rebookingRules: 'Contact customer service for assistance.',
          color: 'bg-gray-100 text-gray-700 border-gray-200'
        }
    }
  }

  return (
    <div className="space-y-6">
      {/* Rebooking Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plane className="h-5 w-5" />
            Flight Rebooking Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 bg-blue-50 rounded border border-blue-200">
              <p className="text-lg font-semibold text-blue-600">{selectedPassengers.length}</p>
              <p className="text-sm text-blue-700">Selected for Rebooking</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded border border-green-200">
              <p className="text-lg font-semibold text-green-600">{availableFlights.length}</p>
              <p className="text-sm text-green-700">Available Flights</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded border border-purple-200">
              <p className="text-lg font-semibold text-purple-600">
                {selectedPassengerData.filter(p => p.type === 'FIM').length}
              </p>
              <p className="text-sm text-purple-700">FIM Passengers</p>
            </div>
          </div>

          {/* Passenger Type Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Ticketed', 'Ticketless', 'FIM'].map(type => {
              const info = getPassengerTypeInfo(type)
              const count = selectedPassengerData.filter(p => p.type === type).length
              
              return (
                <Alert key={type} className={`border-2 ${info.color}`}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="space-y-1">
                      <p className="font-medium">{type} Passengers ({count})</p>
                      <p className="text-xs">{info.description}</p>
                      <p className="text-xs font-medium">{info.rebookingRules}</p>
                    </div>
                  </AlertDescription>
                </Alert>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Bulk Rebooking Options */}
      <Card>
        <CardHeader>
          <CardTitle>Bulk Rebooking Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="flight">Select Alternative Flight</Label>
              <Select value={selectedFlight} onValueChange={setSelectedFlight}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose flight..." />
                </SelectTrigger>
                <SelectContent>
                  {availableFlights.map(flight => (
                    <SelectItem key={flight.id} value={flight.id}>
                      {flight.flightNumber} - {flight.departure} ({flight.status})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="class">Class Preference</Label>
              <Select value={classPreference} onValueChange={setClassPreference}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="same">Same Class</SelectItem>
                  <SelectItem value="upgrade">Allow Upgrades</SelectItem>
                  <SelectItem value="downgrade">Allow Downgrades</SelectItem>
                  <SelectItem value="any">Any Available</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                onClick={handleBulkRebook} 
                className="w-full"
                disabled={!selectedFlight || selectedPassengers.length === 0}
              >
                Rebook All Selected
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Flights */}
      <Card>
        <CardHeader>
          <CardTitle>Available Alternative Flights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {availableFlights.map(flight => (
              <div key={flight.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Badge className={
                      flight.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }>
                      {flight.flightNumber}
                    </Badge>
                    <span className="font-medium">{flight.route}</span>
                    {flight.carrier && (
                      <Badge variant="outline">{flight.carrier}</Badge>
                    )}
                    {flight.agreement && (
                      <Badge className="bg-purple-100 text-purple-700 text-xs">
                        {flight.agreement}
                      </Badge>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Aircraft: {flight.aircraft}</p>
                    <Badge className={flight.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}>
                      {flight.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Departure</p>
                      <p className="text-sm text-muted-foreground">{flight.departure}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Arrival</p>
                      <p className="text-sm text-muted-foreground">{flight.arrival}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Available Seats</p>
                      <p className="text-sm text-muted-foreground">
                        F: {flight.availableSeats.first} | J: {flight.availableSeats.business} | Y: {flight.availableSeats.economy}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div className="p-2 bg-yellow-50 rounded border">
                    <p className="font-medium">First Class</p>
                    <p>Available: {flight.availableSeats.first}</p>
                    <p className="text-green-600">${flight.price.first}</p>
                  </div>
                  <div className="p-2 bg-blue-50 rounded border">
                    <p className="font-medium">Business Class</p>
                    <p>Available: {flight.availableSeats.business}</p>
                    <p className="text-green-600">${flight.price.business}</p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded border">
                    <p className="font-medium">Economy Class</p>
                    <p>Available: {flight.availableSeats.economy}</p>
                    <p className="text-green-600">${flight.price.economy}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Individual Passenger Rebooking */}
      {selectedPassengers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Individual Passenger Rebooking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedPassengerData.map(passenger => {
                const typeInfo = getPassengerTypeInfo(passenger.type)
                
                return (
                  <div key={passenger.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-medium">{passenger.name}</p>
                          <p className="text-sm text-muted-foreground">
                            PNR: {passenger.pnr} | Original: {passenger.flight}
                          </p>
                        </div>
                        <Badge className={typeInfo.color}>
                          {passenger.type}
                        </Badge>
                        {passenger.loyaltyTier && (
                          <Badge variant="outline">{passenger.loyaltyTier}</Badge>
                        )}
                      </div>
                    </div>

                    {passenger.type === 'FIM' && passenger.fimDetails && (
                      <Alert className="mb-3 border-purple-200 bg-purple-50">
                        <FileText className="h-4 w-4 text-purple-600" />
                        <AlertDescription className="text-purple-800">
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="font-medium">Original Carrier</p>
                              <p>{passenger.fimDetails.originalCarrier}</p>
                            </div>
                            <div>
                              <p className="font-medium">Agreement Code</p>
                              <p>{passenger.fimDetails.agreementCode}</p>
                            </div>
                            <div>
                              <p className="font-medium">Valid Until</p>
                              <p>{passenger.fimDetails.validUntil}</p>
                            </div>
                          </div>
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium mb-1">Original Class</p>
                        <p className="text-sm text-muted-foreground">{passenger.class}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Seat Preference</p>
                        <p className="text-sm text-muted-foreground">
                          {passenger.seat !== 'Unassigned' ? passenger.seat : 'No preference'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Special Requirements</p>
                        <p className="text-sm text-muted-foreground">
                          {passenger.specialNeeds.length > 0 ? passenger.specialNeeds.join(', ') : 'None'}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline">
                        Manual Rebooking
                      </Button>
                      <Button size="sm" variant="outline">
                        Contact Passenger
                      </Button>
                      {passenger.type === 'FIM' && (
                        <Button size="sm" variant="outline">
                          Verify Agreement
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedPassengers.length === 0 && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            Please select passengers from the Passenger Lookup tab to manage flight rebooking.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}