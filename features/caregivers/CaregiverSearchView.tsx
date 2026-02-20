/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Search,
  Filter,
  MapPin,
  Star,
  Clock,
  DollarSign,
  Calendar,
  Heart,
  MessageSquare,
  Phone,
  Shield,
  Award,
  Users,
  SlidersHorizontal
} from "lucide-react"
import CaregiverDetailModal from "./CaregiverDetailModal"
import CaregiverBookingModal from "./CaregiverBookingModal"

// Mock caregivers data
const caregivers = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/avatars/sarah.jpg",
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 25,
    location: "New York, NY",
    distance: "2.3 miles",
    experience: 5,
    specialties: ["Personal Care", "Companionship", "Medication Management"],
    certifications: ["CPR Certified", "First Aid", "CNA License"],
    bio: "Experienced caregiver with 5 years of experience in elderly care. Passionate about providing compassionate and professional care.",
    availability: "Full-time",
    languages: ["English", "Spanish"],
    backgroundCheck: true,
    insurance: true,
    responseTime: "Usually responds within 2 hours",
    completedJobs: 89,
    repeatClients: 78,
    schedule: {
      monday: { available: true, slots: ["9:00 AM", "2:00 PM", "6:00 PM"] },
      tuesday: { available: true, slots: ["10:00 AM", "3:00 PM"] },
      wednesday: { available: true, slots: ["9:00 AM", "1:00 PM", "5:00 PM"] },
      thursday: { available: false, slots: [] },
      friday: { available: true, slots: ["11:00 AM", "4:00 PM"] },
      saturday: { available: true, slots: ["10:00 AM", "2:00 PM"] },
      sunday: { available: false, slots: [] }
    }
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "/avatars/michael.jpg",
    rating: 4.8,
    reviewCount: 89,
    hourlyRate: 22,
    location: "Brooklyn, NY",
    distance: "4.1 miles",
    experience: 3,
    specialties: ["Personal Care", "Transportation", "Light Housekeeping"],
    certifications: ["CPR Certified", "Defensive Driving"],
    bio: "Dedicated caregiver specializing in mobility assistance and transportation services.",
    availability: "Part-time",
    languages: ["English", "Mandarin"],
    backgroundCheck: true,
    insurance: true,
    responseTime: "Usually responds within 1 hour",
    completedJobs: 65,
    repeatClients: 82,
    schedule: {
      monday: { available: true, slots: ["8:00 AM", "1:00 PM"] },
      tuesday: { available: true, slots: ["9:00 AM", "2:00 PM", "7:00 PM"] },
      wednesday: { available: false, slots: [] },
      thursday: { available: true, slots: ["10:00 AM", "3:00 PM"] },
      friday: { available: true, slots: ["9:00 AM", "4:00 PM"] },
      saturday: { available: true, slots: ["11:00 AM"] },
      sunday: { available: true, slots: ["2:00 PM", "6:00 PM"] }
    }
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    avatar: "/avatars/emily.jpg",
    rating: 4.9,
    reviewCount: 203,
    hourlyRate: 28,
    location: "Manhattan, NY",
    distance: "1.8 miles",
    experience: 7,
    specialties: ["Personal Care", "Companionship", "Meal Preparation", "Medication Management"],
    certifications: ["CPR Certified", "First Aid", "RN License", "Dementia Care"],
    bio: "Registered nurse with extensive experience in home healthcare and dementia care.",
    availability: "Full-time",
    languages: ["English", "Spanish", "Portuguese"],
    backgroundCheck: true,
    insurance: true,
    responseTime: "Usually responds within 30 minutes",
    completedJobs: 156,
    repeatClients: 91,
    schedule: {
      monday: { available: true, slots: ["7:00 AM", "12:00 PM", "5:00 PM"] },
      tuesday: { available: true, slots: ["8:00 AM", "1:00 PM", "6:00 PM"] },
      wednesday: { available: true, slots: ["9:00 AM", "2:00 PM"] },
      thursday: { available: true, slots: ["7:00 AM", "3:00 PM"] },
      friday: { available: true, slots: ["10:00 AM", "4:00 PM"] },
      saturday: { available: false, slots: [] },
      sunday: { available: false, slots: [] }
    }
  },
  {
    id: "4",
    name: "David Thompson",
    avatar: "/avatars/david.jpg",
    rating: 4.6,
    reviewCount: 45,
    hourlyRate: 20,
    location: "Queens, NY",
    distance: "6.2 miles",
    experience: 2,
    specialties: ["Personal Care", "Companionship"],
    certifications: ["CPR Certified"],
    bio: "New to professional caregiving but passionate about helping others. Recently completed caregiver training program.",
    availability: "Full-time",
    languages: ["English"],
    backgroundCheck: true,
    insurance: true,
    responseTime: "Usually responds within 3 hours",
    completedJobs: 23,
    repeatClients: 65,
    schedule: {
      monday: { available: true, slots: ["9:00 AM", "2:00 PM"] },
      tuesday: { available: true, slots: ["10:00 AM", "4:00 PM"] },
      wednesday: { available: true, slots: ["8:00 AM", "1:00 PM", "6:00 PM"] },
      thursday: { available: true, slots: ["11:00 AM", "3:00 PM"] },
      friday: { available: false, slots: [] },
      saturday: { available: true, slots: ["9:00 AM", "5:00 PM"] },
      sunday: { available: true, slots: ["10:00 AM", "2:00 PM"] }
    }
  },
  {
    id: "5",
    name: "Lisa Wang",
    avatar: "/avatars/lisa.jpg",
    rating: 4.7,
    reviewCount: 156,
    hourlyRate: 24,
    location: "Bronx, NY",
    distance: "8.5 miles",
    experience: 4,
    specialties: ["Personal Care", "Light Housekeeping", "Meal Preparation"],
    certifications: ["CPR Certified", "First Aid", "Food Safety"],
    bio: "Experienced caregiver with a focus on maintaining client independence and dignity.",
    availability: "Part-time",
    languages: ["English", "Mandarin", "Cantonese"],
    backgroundCheck: true,
    insurance: true,
    responseTime: "Usually responds within 1 hour",
    completedJobs: 98,
    repeatClients: 75,
    schedule: {
      monday: { available: false, slots: [] },
      tuesday: { available: true, slots: ["9:00 AM", "3:00 PM"] },
      wednesday: { available: true, slots: ["10:00 AM", "2:00 PM", "7:00 PM"] },
      thursday: { available: true, slots: ["8:00 AM", "4:00 PM"] },
      friday: { available: true, slots: ["11:00 AM", "5:00 PM"] },
      saturday: { available: false, slots: [] },
      sunday: { available: true, slots: ["1:00 PM", "6:00 PM"] }
    }
  }
]

export default function CaregiverSearchView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [serviceFilter, setServiceFilter] = useState("all")
  const [availabilityFilter, setAvailabilityFilter] = useState("all")
  const [priceRange, setPriceRange] = useState([15, 35])
  const [ratingFilter, setRatingFilter] = useState(0)
  const [experienceFilter, setExperienceFilter] = useState(0)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCaregiver, setSelectedCaregiver] = useState<any>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [sortBy, setSortBy] = useState("rating")

  const filteredCaregivers = caregivers.filter(caregiver => {
    const matchesSearch = caregiver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caregiver.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      caregiver.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesLocation = !locationFilter || caregiver.location.toLowerCase().includes(locationFilter.toLowerCase())
    const matchesService = serviceFilter === "all" || caregiver.specialties.includes(serviceFilter)
    const matchesAvailability = availabilityFilter === "all" || caregiver.availability === availabilityFilter
    const matchesPrice = caregiver.hourlyRate >= priceRange[0] && caregiver.hourlyRate <= priceRange[1]
    const matchesRating = caregiver.rating >= ratingFilter
    const matchesExperience = caregiver.experience >= experienceFilter

    return matchesSearch && matchesLocation && matchesService && matchesAvailability && 
           matchesPrice && matchesRating && matchesExperience
  }).sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "price-low":
        return a.hourlyRate - b.hourlyRate
      case "price-high":
        return b.hourlyRate - a.hourlyRate
      case "experience":
        return b.experience - a.experience
      case "distance":
        return parseFloat(a.distance) - parseFloat(b.distance)
      default:
        return 0
    }
  })

  const handleViewDetails = (caregiver: any) => {
    setSelectedCaregiver(caregiver)
    setShowDetailModal(true)
  }

  const handleBookNow = (caregiver: any) => {
    setSelectedCaregiver(caregiver)
    setShowBookingModal(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Find Your Perfect Caregiver
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Browse through our network of qualified, background-checked caregivers and find the perfect match for your needs.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search by name, service, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Enter your location..."
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="h-12 px-6"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            {showFilters && (
              <div className="border-t pt-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Service Type</label>
                    <Select value={serviceFilter} onValueChange={setServiceFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Services</SelectItem>
                        <SelectItem value="Personal Care">Personal Care</SelectItem>
                        <SelectItem value="Companionship">Companionship</SelectItem>
                        <SelectItem value="Medication Management">Medication Management</SelectItem>
                        <SelectItem value="Transportation">Transportation</SelectItem>
                        <SelectItem value="Light Housekeeping">Light Housekeeping</SelectItem>
                        <SelectItem value="Meal Preparation">Meal Preparation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Availability</label>
                    <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Availability</SelectItem>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 flex items-center justify-center">
                      Hourly Rate: ₦{priceRange[0]} - ₦{priceRange[1]}
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={50}
                      min={15}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Sort By</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="experience">Most Experienced</SelectItem>
                        <SelectItem value="distance">Nearest First</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Minimum Rating: {ratingFilter > 0 ? `${ratingFilter}+ stars` : 'Any rating'}
                    </label>
                    <Slider
                      value={[ratingFilter]}
                      onValueChange={(value) => setRatingFilter(value[0])}
                      max={5}
                      min={0}
                      step={0.5}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Minimum Experience: {experienceFilter > 0 ? `${experienceFilter}+ years` : 'Any experience'}
                    </label>
                    <Slider
                      value={[experienceFilter]}
                      onValueChange={(value) => setExperienceFilter(value[0])}
                      max={10}
                      min={0}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {filteredCaregivers.length} Caregivers Available
          </h2>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing results sorted by {sortBy.replace('-', ' ')}
          </div>
        </div>

        {/* Caregivers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCaregivers.map((caregiver) => (
            <Card key={caregiver.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={caregiver.avatar} alt={caregiver.name} />
                    <AvatarFallback className="text-lg">
                      {caregiver.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {caregiver.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{caregiver.rating}</span>
                        <span className="text-sm text-gray-500">({caregiver.reviewCount})</span>
                      </div>
                      {caregiver.backgroundCheck && (
                        <Shield className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <MapPin className="h-3 w-3" />
                      <span>{caregiver.location} • {caregiver.distance}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="h-3 w-3" />
                      <span>{caregiver.experience} years experience</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                    ₦{caregiver.hourlyRate}
                    </div>
                    <div className="text-sm text-gray-500">per hour</div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {caregiver.bio}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {caregiver.specialties.slice(0, 3).map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                  {caregiver.specialties.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{caregiver.specialties.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <Users className="h-3 w-3" />
                  <span>{caregiver.completedJobs} jobs completed</span>
                  <span>•</span>
                  <span>{caregiver.repeatClients}% repeat clients</span>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(caregiver)}
                    className="flex-1"
                  >
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleBookNow(caregiver)}
                    className="flex-1"
                  >
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCaregivers.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Search className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No caregivers found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search criteria or filters to find more caregivers.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modals */}
      <CaregiverDetailModal
        caregiver={selectedCaregiver}
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false)
          setSelectedCaregiver(null)
        }}
        onBook={() => {
          setShowDetailModal(false)
          setShowBookingModal(true)
        }}
      />

      <CaregiverBookingModal
        caregiver={selectedCaregiver}
        isOpen={showBookingModal}
        onClose={() => {
          setShowBookingModal(false)
          setSelectedCaregiver(null)
        }}
      />
    </div>
  )
}