"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Heart,
  Users,
  Shield,
  Award,
  Target,
  Globe,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Star,
  Clock,
  Handshake
} from "lucide-react"
import Link from "next/link"

const stats = [
  {
    number: "10,000+",
    label: "Satisfied Clients",
    icon: Users
  },
  {
    number: "2,500+",
    label: "Verified Caregivers",
    icon: Shield
  },
  {
    number: "50,000+",
    label: "Care Hours Delivered",
    icon: Clock
  },
  {
    number: "4.9/5",
    label: "Average Rating",
    icon: Star
  }
]

const values = [
  {
    title: "Compassion First",
    description: "Every interaction is guided by empathy, kindness, and genuine care for human dignity.",
    icon: Heart,
    color: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
  },
  {
    title: "Trust & Safety",
    description: "Rigorous background checks, insurance coverage, and continuous quality monitoring.",
    icon: Shield,
    color: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
  },
  {
    title: "Professional Excellence",
    description: "Only certified, experienced caregivers who meet our highest standards join our network.",
    icon: Award,
    color: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
  },
  {
    title: "Personalized Care",
    description: "Tailored care plans that respect individual needs, preferences, and cultural backgrounds.",
    icon: Target,
    color: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
  }
]

const team = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Founder & CEO",
    bio: "Former nurse practitioner with 15 years in healthcare. Passionate about improving access to quality care.",
    avatar: "/avatars/sarah-mitchell.jpg",
    credentials: ["RN", "MSN", "Healthcare Leadership"]
  },
  {
    name: "Michael Rodriguez",
    role: "Chief Technology Officer",
    bio: "Tech entrepreneur focused on healthcare innovation. Previously built platforms serving millions of users.",
    avatar: "/avatars/michael-rodriguez.jpg",
    credentials: ["MS Computer Science", "Healthcare Tech", "Platform Architecture"]
  },
  {
    name: "Dr. Emily Chen",
    role: "Chief Medical Officer",
    bio: "Geriatrician and healthcare quality expert. Ensures all care meets the highest medical standards.",
    avatar: "/avatars/emily-chen.jpg",
    credentials: ["MD", "Geriatrics", "Quality Assurance"]
  },
  {
    name: "James Thompson",
    role: "Head of Operations",
    bio: "Operations leader with expertise in scaling healthcare services while maintaining quality and safety.",
    avatar: "/avatars/james-thompson.jpg",
    credentials: ["MBA", "Healthcare Operations", "Process Optimization"]
  }
]

const milestones = [
  {
    year: "2020",
    title: "Company Founded",
    description: "CareHomes was born from a vision to make quality care accessible to everyone."
  },
  {
    year: "2021",
    title: "First 1,000 Caregivers",
    description: "Reached our first major milestone with 1,000 verified caregivers on the platform."
  },
  {
    year: "2022",
    title: "National Expansion",
    description: "Expanded services to 25 major metropolitan areas across the United States."
  },
  {
    year: "2023",
    title: "Quality Recognition",
    description: "Received the Healthcare Innovation Award for excellence in care delivery."
  },
  {
    year: "2024",
    title: "10,000+ Clients Served",
    description: "Proud to have served over 10,000 clients with compassionate, professional care."
  }
]

export default function AboutView() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              About CareHomes
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              We're on a mission to transform how people access and receive care. 
              By connecting families with trusted, professional caregivers, we're building 
              a world where everyone can age with dignity and independence.
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
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                      <IconComponent className="h-10 w-10 text-blue-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                To empower individuals and families by providing access to trusted, professional caregivers 
                who deliver compassionate care that enhances quality of life and promotes independence. 
                We believe everyone deserves to receive care with dignity, respect, and personalized attention.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <Heart className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Compassionate Care
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Every caregiver in our network is committed to providing care with empathy, patience, and genuine concern for wellbeing.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="p-4 bg-green-100 dark:bg-green-900 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <Handshake className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Trusted Relationships
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We facilitate meaningful connections between caregivers and clients built on trust, respect, and mutual understanding.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <Globe className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Accessible Platform
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our technology makes it easy to find, book, and manage care services, removing barriers to accessing quality care.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              These principles guide everything we do and shape how we serve our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <Card key={index} className={`hover:shadow-lg transition-shadow ${value.color}`}>
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-lg flex-shrink-0">
                        <IconComponent className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                          {value.title}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Leadership Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our diverse team brings together expertise in healthcare, technology, and operations 
              to deliver the best possible experience for our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="text-lg">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {member.bio}
                  </p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {member.credentials.map((credential, credIndex) => (
                      <Badge key={credIndex} variant="secondary" className="text-xs">
                        {credential}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              From a small startup to a trusted platform serving thousands, here are the key milestones in our story.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                          {milestone.year}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Get in Touch
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Have questions about our services or want to learn more about joining our team? We'd love to hear from you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <Phone className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Call Us
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Speak with our team
                  </p>
                  <p className="text-lg font-semibold text-blue-600">
                    (555) 123-4567
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="p-4 bg-green-100 dark:bg-green-900 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <Mail className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Email Us
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Send us a message
                  </p>
                  <p className="text-lg font-semibold text-green-600">
                    hello@carehomes.com
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Visit Us
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Our headquarters
                  </p>
                  <p className="text-lg font-semibold text-purple-600">
                    New York, NY
                  </p>
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
            Join the CareHomes Community
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you're seeking care or looking to provide it, we're here to help you make meaningful connections 
            that improve lives and strengthen communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/caregivers">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Find Care Now
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