import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Heart, 
  Shield, 
  Clock, 
  Users, 
  Star, 
  CheckCircle, 
  Search,
  Calendar,
  CreditCard,
  MessageCircle,
  ArrowRight,
  Play
} from "lucide-react"

export default function Homepage() {
  return (
    <div className="flex flex-col">
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-blue-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
        <div className="px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 animate-slide-up text-center lg:text-left">
                <div className="space-y-6">
                  <Badge variant="secondary" className="w-fit mx-auto lg:mx-0 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Trusted by 10,000+ families
                  </Badge>
                  <h1 className="text-4xl lg:text-6xl font-bold tracking-tight leading-tight">
                    Find trusted care for your{" "}
                    <span className="text-primary bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                      loved ones
                    </span>
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                    Connect with verified, professional caregivers in your area. 
                    Quality care you can depend on, when you need it most.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" className="text-lg px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                    <Link href="/caregivers">
                      Find Caregivers
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 dark:border-blue-800 dark:hover:border-blue-700 dark:hover:bg-blue-950" asChild>
                    <Link href="/become-caregiver">
                      <Play className="mr-2 h-5 w-5" />
                      Become a Caregiver
                    </Link>
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-8 pt-8 max-w-md mx-auto lg:mx-0">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">4.9</div>
                    <div className="flex items-center justify-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">Average rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">50K+</div>
                    <div className="text-sm text-muted-foreground">Happy families</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">24/7</div>
                    <div className="text-sm text-muted-foreground">Support</div>
                  </div>
                </div>
              </div>

              <div className="relative animate-fade-in flex justify-center">
                <div className="relative">
                  <div className="w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-blue-100 via-blue-50 to-white dark:from-blue-900 dark:via-blue-800 dark:to-slate-800 rounded-3xl flex items-center justify-center shadow-2xl border border-blue-100 dark:border-blue-800">
                    <div className="text-center space-y-6">
                      <div className="relative">
                        <Heart className="h-24 w-24 text-blue-600 dark:text-blue-400 mx-auto drop-shadow-lg" />
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                          <CheckCircle className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <div>
                        <p className="text-xl font-semibold text-blue-800 dark:text-blue-200">Professional Care</p>
                        <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">Verified & Trusted</p>
                      </div>
                    </div>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-200 dark:bg-blue-800 rounded-full opacity-60 animate-pulse"></div>
                  <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-blue-300 dark:bg-blue-700 rounded-full opacity-40 animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-white to-blue-50/50 dark:from-slate-800 dark:to-slate-900">
        <div className="px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-6 mb-20">
              <Badge variant="outline" className="border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-300">
                Simple Process
              </Badge>
              <h2 className="text-3xl lg:text-5xl font-bold">How CareConnect Works</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Getting quality care is simple with our streamlined process designed for your peace of mind
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center group">
                <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <CardHeader className="pb-4">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Search className="h-10 w-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-bold">
                        1
                      </div>
                    </div>
                    <CardTitle className="text-xl text-blue-800 dark:text-blue-200">Search & Filter</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      Browse verified caregivers by location, services, availability, and ratings
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center group">
                <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <CardHeader className="pb-4">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <MessageCircle className="h-10 w-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-bold">
                        2
                      </div>
                    </div>
                    <CardTitle className="text-xl text-blue-800 dark:text-blue-200">Connect & Chat</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      Message caregivers directly to discuss your needs and ask questions
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center group">
                <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <CardHeader className="pb-4">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Calendar className="h-10 w-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-bold">
                        3
                      </div>
                    </div>
                    <CardTitle className="text-xl text-blue-800 dark:text-blue-200">Book & Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      Schedule appointments that work for your family&apos;s needs and timeline
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center group">
                <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <CardHeader className="pb-4">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <CreditCard className="h-10 w-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-bold">
                        4
                      </div>
                    </div>
                    <CardTitle className="text-xl text-blue-800 dark:text-blue-200">Secure Payment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      Pay securely through our platform with transparent pricing and receipts
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-slate-800">
        <div className="px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-6 mb-20">
              <Badge variant="outline" className="border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-300">
                Why Choose Us
              </Badge>
              <h2 className="text-3xl lg:text-5xl font-bold">Why Choose CareConnect?</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                We&lsquo;re committed to providing the highest quality care experience with cutting-edge technology and human compassion
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="group hover:shadow-xl transition-all duration-300 border-blue-100 dark:border-blue-900 hover:border-blue-200 dark:hover:border-blue-800">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-blue-800 dark:text-blue-200">Verified Caregivers</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    All caregivers undergo thorough background checks, credential verification, 
                    and skills assessments before joining our platform.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 border-blue-100 dark:border-blue-900 hover:border-blue-200 dark:hover:border-blue-800">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-blue-800 dark:text-blue-200">24/7 Availability</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    Find care when you need it most. Our caregivers are available around 
                    the clock for emergency and scheduled care.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 border-blue-100 dark:border-blue-900 hover:border-blue-200 dark:hover:border-blue-800">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-blue-800 dark:text-blue-200">Personalized Matching</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    Our smart matching system connects you with caregivers who specialize 
                    in your specific care needs and preferences.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 border-blue-100 dark:border-blue-900 hover:border-blue-200 dark:hover:border-blue-800">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-blue-800 dark:text-blue-200">Quality Assurance</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    Regular quality checks, family feedback, and continuous caregiver 
                    training ensure consistently excellent care.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 border-blue-100 dark:border-blue-900 hover:border-blue-200 dark:hover:border-blue-800">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-blue-800 dark:text-blue-200">Insurance Coverage</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    All services are fully insured and bonded for your peace of mind 
                    and financial protection.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 border-blue-100 dark:border-blue-900 hover:border-blue-200 dark:hover:border-blue-800">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-blue-800 dark:text-blue-200">Real-time Communication</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    Stay connected with your caregiver through our secure messaging 
                    system and receive regular updates.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="space-y-6">
              <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                <Heart className="w-4 h-4 mr-2" />
                Start Your Journey
              </Badge>
              <h2 className="text-3xl lg:text-5xl font-bold leading-tight">
                Ready to find the perfect caregiver?
              </h2>
              <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
                Join thousands of families who trust CareConnect for their caregiving needs. 
                Get started today and experience the difference quality care makes.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="text-lg px-10 py-4 bg-white text-blue-700 hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105" asChild>
                <Link href="/register">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-10 py-4 bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300" asChild>
                <Link href="/contact">
                  Contact Sales
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold mb-2">99.9%</div>
                <div className="text-blue-100">Satisfaction Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold mb-2">&lt;2min</div>
                <div className="text-blue-100">Average Setup</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}