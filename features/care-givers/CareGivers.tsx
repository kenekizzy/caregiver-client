"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  DollarSign, 
  Filter,
  Heart,
  MessageCircle,
  Calendar,
  Shield
} from "lucide-react"

// Mock data for caregivers
const mockCaregivers = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder-avatar.jpg",
    rating: 4.9,
    reviewCount: 127,
    location: "San Francisco, CA",
    distance: "2.3 miles",
    hourlyRate: 25,
    specialties: ["Elderly Care", "Alzheimer's", "Medication Management"],
    experience: "8 years",
    availability: "Available today",
    verified: true,
    description: "Compassionate caregiver with extensive experience in elderly care and dementia support.",
    responseTime: "Usually responds within 1 hour"
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/placeholder-avatar.jpg",
    rating: 4.8,
    reviewCount: 89,
    location: "Oakland, CA",
    distance: "5.1 miles",
    hourlyRate: 28,
    specialties: ["Child Care", "Special Needs", "Tutoring"],
    experience: "6 years",
    availability: "Available tomorrow",
    verified: true,
    description: "Dedicated childcare specialist with experience supporting children with special needs.",
    responseTime: "Usually responds within 2 hours"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "/placeholder-avatar.jpg",
    rating: 5.0,
    reviewCount: 203,
    location: "Berkeley, CA",
    distance: "7.8 miles",
    hourlyRate: 32,
    specialties: ["Disability Support", "Physical Therapy", "Companion Care"],
    experience: "12 years",
    availability: "Available this week",
    verified: true,
    description: "Licensed physical therapist providing comprehensive disability support and companion care.",
    responseTime: "Usually responds within 30 minutes"
  },
  {
    id: 4,
    name: "David Thompson",
    avatar: "/placeholder-avatar.jpg",
    rating: 4.7,
    reviewCount: 156,
    location: "San Jose, CA",
    distance: "12.4 miles",
    hourlyRate: 24,
    specialties: ["Respite Care", "Overnight Care", "Meal Preparation"],
    experience: "5 years",
    availability: "Available next week",
    verified: true,
    description: "Reliable overnight caregiver specializing in respite care for family caregivers.",
    responseTime: "Usually responds within 3 hours"
  }
]

const CareGivers = () => {
    const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const specialtyOptions = [
    "Elderly Care", "Child Care", "Disability Support", "Alzheimer's", 
    "Physical Therapy", "Companion Care", "Respite Care", "Special Needs"
  ]

  return (
    <div className="container px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Professional Caregivers</h1>
        <p className="text-muted-foreground">
          Connect with verified, experienced caregivers in your area
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by location, name, or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="md:w-auto">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Specialty Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {specialtyOptions.map((specialty) => (
            <Badge
              key={specialty}
              variant={selectedFilters.includes(specialty) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => {
                setSelectedFilters(prev =>
                  prev.includes(specialty)
                    ? prev.filter(f => f !== specialty)
                    : [...prev, specialty]
                )
              }}
            >
              {specialty}
            </Badge>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Showing {mockCaregivers.length} caregivers in your area
        </p>
      </div>

      {/* Caregivers Grid */}
      <div className="grid gap-6">
        {mockCaregivers.map((caregiver) => (
          <Card key={caregiver.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Avatar and Basic Info */}
                <div className="flex flex-col sm:flex-row gap-4 lg:w-1/3">
                  <Avatar className="h-20 w-20 mx-auto sm:mx-0">
                    <AvatarImage src={caregiver.avatar} alt={caregiver.name} />
                    <AvatarFallback>
                      {caregiver.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="text-center sm:text-left">
                    <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
                      <h3 className="text-xl font-semibold">{caregiver.name}</h3>
                      {caregiver.verified && (
                        <Shield className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1 justify-center sm:justify-start mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{caregiver.rating}</span>
                      <span className="text-muted-foreground">
                        ({caregiver.reviewCount} reviews)
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-muted-foreground justify-center sm:justify-start">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{caregiver.distance}</span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 space-y-4">
                  <p className="text-muted-foreground">{caregiver.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {caregiver.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{caregiver.experience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
                      ₦
                      <span>${caregiver.hourlyRate}/hour</span>
                    </div>
                    <div className="col-span-2 text-muted-foreground">
                      {caregiver.responseTime}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600 font-medium">
                      {caregiver.availability}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 lg:w-48">
                  <Button className="w-full">
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Now
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full">
                    <Heart className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <Button variant="outline" size="lg">
          Load More Caregivers
        </Button>
      </div>
    </div>
  )
}

export default CareGivers