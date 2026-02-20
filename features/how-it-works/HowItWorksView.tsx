"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  UserCheck,
  Calendar,
  Heart,
  Shield,
  Star,
  Clock,
  CheckCircle,
  ArrowRight,
  Users,
  MessageSquare,
  CreditCard,
  Phone,
  MapPin,
  Award
} from "lucide-react"
import Link from "next/link"

const steps = [
  {
    number: "01",
    title: "Search & Browse",
    description: "Find the perfect caregiver for your needs",
    icon: Search,
    details: [
      "Browse our network of verified caregivers",
      "Filter by location, services, and availability",
      "Read reviews and ratings from other clients",
      "View detailed profiles and certifications"
    ],
    color: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
  },
  {
    number: "02",
    title: "Review & Select",
    description: "Choose your ideal caregiver match",
    icon: UserCheck,
    details: [
      "Compare caregiver profiles and qualifications",
      "Check availability and scheduling options",
      "Review background checks and certifications",
      "Contact caregivers directly with questions"
    ],
    color: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
  },
  {
    number: "03",
    title: "Book & Schedule",
    description: "Secure your care appointment",
    icon: Calendar,
    details: [
      "Select your preferred date and time",
      "Choose specific services needed",
      "Provide special instructions and preferences",
      "Confirm booking with secure payment"
    ],
    color: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800"
  },
  {
    number: "04",
    title: "Receive Care",
    description: "Enjoy professional, compassionate care",
    icon: Heart,
    details: [
      "Meet your caregiver at the scheduled time",
      "Receive personalized, professional care",
      "Communicate through our secure platform",
      "Rate and review your experience"
    ],
    color: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
  }
]

const userTypes = [
  {
    title: "For Individuals & Families",
    description: "Find trusted care for yourself or loved ones",
    icon: Users,
    features: [
      "Personal care assistance",
      "Companionship services",
      "Medical appointment transportation",
      "Medication management",
      "Light housekeeping",
      "Meal preparation"
    ],
    cta: "Find a Caregiver",
    link: "/caregivers"
  },
  {
    title: "For Professional Caregivers",
    description: "Join our network and grow your practice",
    icon: Award,
    features: [
      "Flexible scheduling",
      "Competitive compensation",
      "Professional development",
      "Client matching system",
      "Secure payment processing",
      "24/7 support"
    ],
    cta: "Become a Caregiver",
    link: "/register"
  }
]

const safetyFeatures = [
  {
    title: "Background Checks",
    description: "Comprehensive criminal and reference verification",
    icon: Shield
  },
  {
    title: "Insurance Coverage",
    description: "All caregivers carry liability and bonding insurance",
    icon: CheckCircle
  },
  {
    title: "24/7 Support",
    description: "Round-the-clock customer support and emergency assistance",
    icon: Clock
  },
  {
    title: "Quality Ratings",
    description: "Transparent review system with verified client feedback",
    icon: Star
  }
]

export default function HowItWorksView() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              How CareHomes Works
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Getting the care you need is simple, safe, and straightforward. 
              Follow these four easy steps to connect with qualified caregivers in your area.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/caregivers">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Get Started Now
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

      {/* Steps Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Four Simple Steps
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              From search to care delivery, our platform makes it easy to find and book the perfect caregiver for your needs.
            </p>
          </div>

          <div className="space-y-12">
            {steps.map((step, index) => {
              const IconComponent = step.icon
              const isEven = index % 2 === 1
              
              return (
                <div key={step.number} className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}>
                  {/* Content */}
                  <div className="flex-1">
                    <Card className={`hover:shadow-lg transition-shadow ${step.color}`}>
                      <CardHeader>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center justify-center w-16 h-16 bg-white dark:bg-gray-800 rounded-full shadow-lg">
                            <span className="text-2xl font-bold text-blue-600">{step.number}</span>
                          </div>
                          <div>
                            <CardTitle className="text-2xl text-gray-900 dark:text-white">
                              {step.title}
                            </CardTitle>
                            <CardDescription className="text-lg">
                              {step.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {step.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="p-8 bg-white dark:bg-gray-800 rounded-full shadow-xl">
                      <IconComponent className="h-16 w-16 text-blue-600" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              CareHomes for Everyone
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Whether you're seeking care or providing it, our platform connects you with the right opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {userTypes.map((userType, index) => {
              const IconComponent = userType.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <IconComponent className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-gray-900 dark:text-white">
                          {userType.title}
                        </CardTitle>
                        <CardDescription className="text-lg">
                          {userType.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {userType.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={userType.link}>
                      <Button className="w-full">
                        {userType.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Safety & Trust Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Your Safety is Our Priority
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We've built comprehensive safety measures and quality controls to ensure you receive the best possible care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {safetyFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                      <IconComponent className="h-10 w-10 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Details */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                What Happens After Booking?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Here's what you can expect once you've made your booking.
              </p>
            </div>

            <div className="space-y-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg flex-shrink-0">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        Immediate Confirmation
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        You'll receive instant confirmation of your booking request. The caregiver will be notified 
                        and will confirm their availability within 2 hours.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Email confirmation</Badge>
                        <Badge variant="outline">SMS updates</Badge>
                        <Badge variant="outline">Calendar integration</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg flex-shrink-0">
                      <MessageSquare className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        Pre-Visit Communication
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Your caregiver will reach out before the visit to introduce themselves, confirm details, 
                        and answer any questions you might have.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Secure messaging</Badge>
                        <Badge variant="outline">Phone calls</Badge>
                        <Badge variant="outline">Care plan review</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg flex-shrink-0">
                      <CreditCard className="h-8 w-8 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        Secure Payment Processing
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Payment is processed securely after your care session is completed. You'll receive 
                        a detailed invoice and can rate your experience.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Post-service billing</Badge>
                        <Badge variant="outline">Detailed invoices</Badge>
                        <Badge variant="outline">Multiple payment methods</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Experience Quality Care?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied clients who trust CareHomes for their care needs. 
            Get started today and find your perfect caregiver match.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/caregivers">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Find Caregivers Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                Become a Caregiver
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}