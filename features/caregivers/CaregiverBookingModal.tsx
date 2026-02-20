"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Star,
  CreditCard,
  Shield,
  AlertCircle,
  CheckCircle
} from "lucide-react"

interface CaregiverBookingModalProps {
  caregiver: any
  isOpen: boolean
  onClose: () => void
}

export default function CaregiverBookingModal({ caregiver, isOpen, onClose }: CaregiverBookingModalProps) {
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [duration, setDuration] = useState("2")
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [specialInstructions, setSpecialInstructions] = useState("")
  const [clientAddress, setClientAddress] = useState("")
  const [emergencyContact, setEmergencyContact] = useState("")
  const [emergencyPhone, setEmergencyPhone] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [step, setStep] = useState(1)

  if (!caregiver) return null

  const calculateTotal = () => {
    const hours = parseFloat(duration)
    const baseRate = caregiver.hourlyRate * hours
    const serviceFee = baseRate * 0.1 // 10% service fee
    const tax = (baseRate + serviceFee) * 0.08 // 8% tax
    return {
      baseRate,
      serviceFee,
      tax,
      total: baseRate + serviceFee + tax
    }
  }

  const pricing = calculateTotal()

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    )
  }

  const handleBooking = () => {
    // In a real app, this would submit the booking to the backend
    console.log("Booking submitted:", {
      caregiverId: caregiver.id,
      date: selectedDate,
      time: selectedTime,
      duration,
      services: selectedServices,
      specialInstructions,
      clientAddress,
      emergencyContact,
      emergencyPhone,
      total: pricing.total
    })
    
    // Show success message and close modal
    alert("Booking request submitted successfully! The caregiver will be notified and will respond within 24 hours.")
    onClose()
  }

  const getAvailableSlots = () => {
    if (!selectedDate) return []
    
    const dayOfWeek = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
    const schedule = caregiver.schedule[dayOfWeek]
    
    return schedule?.available ? schedule.slots : []
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Book Caregiver</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Caregiver Info */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={caregiver.avatar} alt={caregiver.name} />
                  <AvatarFallback className="text-lg">
                    {caregiver.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{caregiver.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{caregiver.rating}</span>
                      <span className="text-sm text-gray-500">({caregiver.reviewCount})</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{caregiver.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{caregiver.experience} years exp.</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    ${caregiver.hourlyRate}
                  </div>
                  <div className="text-sm text-gray-500">per hour</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {step === 1 && (
            <div className="space-y-6">
              {/* Date and Time Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Select Date & Time
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Available Time Slots</Label>
                      <Select value={selectedTime} onValueChange={setSelectedTime}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {getAvailableSlots().map((slot: string) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="duration">Duration (hours)</Label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="2">2 hours</SelectItem>
                        <SelectItem value="3">3 hours</SelectItem>
                        <SelectItem value="4">4 hours</SelectItem>
                        <SelectItem value="6">6 hours</SelectItem>
                        <SelectItem value="8">8 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Services Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Select Services</CardTitle>
                  <CardDescription>
                    Choose the services you need from {caregiver.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {caregiver.specialties.map((service: string) => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox
                          id={service}
                          checked={selectedServices.includes(service)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleServiceToggle(service)
                            } else {
                              handleServiceToggle(service)
                            }
                          }}
                        />
                        <Label htmlFor={service} className="text-sm font-medium">
                          {service}
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Service Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label htmlFor="address">Full Address</Label>
                    <Textarea
                      id="address"
                      placeholder="Enter the complete address where care will be provided..."
                      value={clientAddress}
                      onChange={(e) => setClientAddress(e.target.value)}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button onClick={() => setStep(2)} disabled={!selectedDate || !selectedTime || selectedServices.length === 0}>
                  Continue to Details
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              {/* Emergency Contact */}
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contact</CardTitle>
                  <CardDescription>
                    Required for safety purposes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="emergency-contact">Contact Name</Label>
                      <Input
                        id="emergency-contact"
                        placeholder="Emergency contact name"
                        value={emergencyContact}
                        onChange={(e) => setEmergencyContact(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergency-phone">Phone Number</Label>
                      <Input
                        id="emergency-phone"
                        placeholder="Emergency contact phone"
                        value={emergencyPhone}
                        onChange={(e) => setEmergencyPhone(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Special Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle>Special Instructions</CardTitle>
                  <CardDescription>
                    Any specific needs, preferences, or important information for the caregiver
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Please provide any special instructions, medical conditions, preferences, or other important information the caregiver should know..."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    rows={4}
                  />
                </CardContent>
              </Card>

              {/* Booking Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {/* <DollarSign className="h-5 w-5" /> */}
                    ₦
                    Booking Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Date & Time:</span>
                      <span className="font-medium">{selectedDate} at {selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">{duration} hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Services:</span>
                      <span className="font-medium">{selectedServices.join(", ")}</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Base Rate ({duration} hours × ${caregiver.hourlyRate}):</span>
                      <span>${pricing.baseRate.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Service Fee (10%):</span>
                      <span>${pricing.serviceFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Tax (8%):</span>
                      <span>${pricing.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                      <span>Total:</span>
                      <span>${pricing.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Terms and Conditions */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={agreeToTerms}
                      onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed">
                      I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and 
                      <a href="#" className="text-blue-600 hover:underline ml-1">Privacy Policy</a>. 
                      I understand that payment will be processed after the service is completed and confirmed.
                    </Label>
                  </div>
                </CardContent>
              </Card>

              {/* Important Notice */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                      Booking Request Process
                    </p>
                    <p className="text-blue-800 dark:text-blue-200">
                      This is a booking request. The caregiver will be notified and will confirm availability within 24 hours. 
                      You will receive an email confirmation once the booking is accepted.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button 
                  onClick={handleBooking} 
                  disabled={!agreeToTerms || !emergencyContact || !emergencyPhone}
                  className="flex-1"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Submit Booking Request
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}