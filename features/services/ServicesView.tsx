"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Users,
  Car,
  Pill,
  Home,
  Utensils,
  Shield,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  Phone,
  MessageSquare
} from "lucide-react"
import Link from "next/link"

const services = [
  {
    id: "personal-care",
    title: "Personal Care",
    icon: Heart,
    description: "Comprehensive assistance with daily living activities to maintain dignity and independence.",
    features: [
      "Bathing and grooming assistance",
      "Dressing and undressing help",
      "Mobility and transfer support",
      "Toileting and incontinence care",
      "Skin care and hygiene maintenance",
      "Exercise and physical therapy support"
    ],
    pricing: "Starting at ₦25/hour",
    duration: "2-12 hours",
    availability: "24/7 available",
    certifications: ["CNA", "HHA", "CPR Certified"],
    color: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
  },
  {
    id: "companionship",
    title: "Companionship",
    icon: Users,
    description: "Social interaction and emotional support to combat loneliness and enhance quality of life.",
    features: [
      "Friendly conversation and social interaction",
      "Reading and storytelling",
      "Games, puzzles, and recreational activities",
      "Accompaniment to social events",
      "Emotional support and active listening",
      "Technology assistance and video calls"
    ],
    pricing: "Starting at ₦20/hour",
    duration: "2-8 hours",
    availability: "Flexible scheduling",
    certifications: ["Background Check", "References"],
    color: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
  },
  {
    id: "transportation",
    title: "Transportation",
    icon: Car,
    description: "Safe and reliable transportation services for medical appointments and daily errands.",
    features: [
      "Medical appointment transportation",
      "Grocery shopping assistance",
      "Pharmacy visits",
      "Social outings and events",
      "Airport transfers",
      "Wheelchair accessible vehicles available"
    ],
    pricing: "Starting at ₦18/hour",
    duration: "1-6 hours",
    availability: "Advance booking required",
    certifications: ["Valid License", "Insurance", "Clean Driving Record"],
    color: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800"
  },
  {
    id: "medication-management",
    title: "Medication Management",
    icon: Pill,
    description: "Professional medication administration and monitoring for complex health conditions.",
    features: [
      "Medication reminders and administration",
      "Pill organization and sorting",
      "Prescription pickup and management",
      "Health monitoring and vital signs",
      "Communication with healthcare providers",
      "Emergency medication protocols"
    ],
    pricing: "Starting at ₦30/hour",
    duration: "1-4 hours",
    availability: "Scheduled visits",
    certifications: ["Licensed Nurse", "Medication Aide", "CPR Certified"],
    color: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
  },
  {
    id: "light-housekeeping",
    title: "Light Housekeeping",
    icon: Home,
    description: "Maintaining a clean and safe living environment with gentle housekeeping services.",
    features: [
      "Light cleaning and tidying",
      "Laundry and linen changes",
      "Dishwashing and kitchen maintenance",
      "Organizing and decluttering",
      "Trash removal and recycling",
      "Basic home safety checks"
    ],
    pricing: "Starting at ₦22/hour",
    duration: "2-6 hours",
    availability: "Weekly or bi-weekly",
    certifications: ["Background Check", "Bonded", "Insured"],
    color: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
  },
  {
    id: "meal-preparation",
    title: "Meal Preparation",
    icon: Utensils,
    description: "Nutritious meal planning and preparation tailored to dietary needs and preferences.",
    features: [
      "Meal planning and grocery shopping",
      "Fresh meal preparation and cooking",
      "Special diet accommodation",
      "Kitchen cleanup and organization",
      "Nutrition monitoring and support",
      "Feeding assistance when needed"
    ],
    pricing: "Starting at $24/hour",
    duration: "2-4 hours",
    availability: "Daily or weekly",
    certifications: ["Food Safety", "Nutrition Training", "Dietary Restrictions"],
    color: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800"
  }
]

const additionalServices = [
  {
    title: "Respite Care",
    description: "Temporary relief for family caregivers",
    icon: Clock
  },
  {
    title: "Overnight Care",
    description: "24-hour supervision and assistance",
    icon: Shield
  },
  {
    title: "Specialized Care",
    description: "Dementia, Alzheimer's, and chronic condition care",
    icon: Star
  }
]

export default function ServicesView() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Comprehensive Care Services
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Professional, compassionate care tailored to your unique needs. Our certified caregivers 
              provide a full range of services to help you or your loved ones live independently and comfortably.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/caregivers">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Find a Caregiver
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Phone className="mr-2 h-5 w-5" />
                Call (555) 123-4567
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Each service is delivered by trained, background-checked professionals who are passionate about providing exceptional care.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon
              return (
                <Card key={service.id} className={`hover:shadow-lg transition-shadow ${service.color}`}>
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                        <IconComponent className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-gray-900 dark:text-white">
                          {service.title}
                        </CardTitle>
                        <CardDescription className="text-lg">
                          {service.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Features */}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">What's Included:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Service Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">Pricing</div>
                        <div className="text-lg font-bold text-green-600">{service.pricing}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">Duration</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{service.duration}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">Availability</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{service.availability}</div>
                      </div>
                    </div>

                    {/* Certifications */}
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Required Certifications:</div>
                      <div className="flex flex-wrap gap-2">
                        {service.certifications.map((cert, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4">
                      <Link href="/caregivers">
                        <Button className="w-full">
                          Find {service.title} Caregivers
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Specialized Care Options
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We also offer specialized services for unique care situations and complex needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => {
              const IconComponent = service.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                      <IconComponent className="h-10 w-10 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {service.description}
                    </p>
                    <Button variant="outline">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Quality You Can Trust
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Every caregiver in our network meets our rigorous standards for professionalism, safety, and compassion.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="p-4 bg-green-100 dark:bg-green-900 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Background Checked</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Comprehensive background verification for all caregivers</p>
              </div>
              <div className="text-center">
                <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Star className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Highly Rated</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">4.8+ average rating from thousands of satisfied clients</p>
              </div>
              <div className="text-center">
                <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Certified Professionals</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Licensed and certified healthcare professionals</p>
              </div>
              <div className="text-center">
                <div className="p-4 bg-orange-100 dark:bg-orange-900 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">24/7 Support</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Round-the-clock support for emergencies and questions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Find the perfect caregiver for your needs today. Our team is here to help you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/caregivers">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Browse Caregivers
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
              <MessageSquare className="mr-2 h-5 w-5" />
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}