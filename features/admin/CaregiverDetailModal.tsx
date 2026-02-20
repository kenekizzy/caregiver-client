"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Star, 
  Phone, 
  Mail, 
  Shield, 
  CheckCircle, 
  XCircle,
  Clock,
  Award,
  FileText,
  Users,
  Download,
  Eye,
  Upload,
  AlertTriangle
} from "lucide-react"

interface CaregiverDetailModalProps {
  caregiver: any
  isOpen: boolean
  onClose: () => void
}

interface Document {
  id: string
  name: string
  description: string
  required: boolean
  status: string
  uploadedDate: string | null
  expiryDate: string | null
  fileUrl: string | null
  adminNotes: string | null
}

// Mock documents data - in real app this would come from the caregiver prop
const mockDocuments: Document[] = [
  {
    id: "background_check",
    name: "Background Check",
    description: "Criminal background check report",
    required: true,
    status: "approved",
    uploadedDate: "2024-01-16",
    expiryDate: "2025-01-16",
    fileUrl: "/documents/background_check.pdf",
    adminNotes: "Background check cleared successfully"
  },
  {
    id: "cpr_certification",
    name: "CPR Certification",
    description: "Current CPR certification from recognized provider",
    required: true,
    status: "pending",
    uploadedDate: "2024-01-18",
    expiryDate: "2025-06-18",
    fileUrl: "/documents/cpr_cert.pdf",
    adminNotes: null
  },
  {
    id: "first_aid",
    name: "First Aid Certificate",
    description: "First aid training certificate",
    required: true,
    status: "rejected",
    uploadedDate: "2024-01-17",
    expiryDate: "2024-12-17",
    fileUrl: "/documents/first_aid.pdf",
    adminNotes: "Certificate appears to be expired. Please upload current certificate."
  },
  {
    id: "nursing_license",
    name: "Nursing License (CNA/RN)",
    description: "Professional nursing license if applicable",
    required: false,
    status: "approved",
    uploadedDate: "2024-01-16",
    expiryDate: "2025-12-31",
    fileUrl: "/documents/nursing_license.pdf",
    adminNotes: "Valid RN license verified"
  },
  {
    id: "references",
    name: "Professional References",
    description: "Contact information for 3 professional references",
    required: true,
    status: "not_uploaded",
    uploadedDate: null,
    expiryDate: null,
    fileUrl: null,
    adminNotes: null
  },
  {
    id: "insurance",
    name: "Liability Insurance",
    description: "Professional liability insurance certificate",
    required: true,
    status: "pending",
    uploadedDate: "2024-01-19",
    expiryDate: "2025-01-19",
    fileUrl: "/documents/insurance.pdf",
    adminNotes: null
  }
]

export default function CaregiverDetailModal({ caregiver, isOpen, onClose }: CaregiverDetailModalProps) {
  const [documents, setDocuments] = useState(mockDocuments)
  const [adminNotes, setAdminNotes] = useState("")

  if (!caregiver) return null

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Approved</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Rejected</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getDocumentStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Approved
        </Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
          <Clock className="h-3 w-3 mr-1" />
          Pending Review
        </Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
          <XCircle className="h-3 w-3 mr-1" />
          Rejected
        </Badge>
      case "not_uploaded":
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
          <Upload className="h-3 w-3 mr-1" />
          Not Uploaded
        </Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getDocumentStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "not_uploaded":
        return <Upload className="h-5 w-5 text-gray-400" />
      default:
        return <FileText className="h-5 w-5 text-gray-400" />
    }
  }

  const approveDocument = (documentId: string, notes: string = "") => {
    setDocuments(docs => docs.map(doc => 
      doc.id === documentId 
        ? { ...doc, status: "approved", adminNotes: notes || "Document approved" }
        : doc
    ))
  }

  const rejectDocument = (documentId: string, notes: string) => {
    if (!notes.trim()) {
      alert("Please provide a reason for rejection")
      return
    }
    setDocuments(docs => docs.map(doc => 
      doc.id === documentId 
        ? { ...doc, status: "rejected", adminNotes: notes }
        : doc
    ))
  }

  const calculateDocumentCompletion = () => {
    const requiredDocs = documents.filter(doc => doc.required)
    const approvedDocs = requiredDocs.filter(doc => doc.status === "approved")
    return Math.round((approvedDocs.length / requiredDocs.length) * 100)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={caregiver.avatar} alt={caregiver.name} />
              <AvatarFallback>
                {caregiver.name.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                {caregiver.name}
                {getStatusBadge(caregiver.status)}
              </div>
              <DialogDescription>
                Caregiver Profile Details
              </DialogDescription>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile Information</TabsTrigger>
            <TabsTrigger value="documents">Documents & Verification</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Basic Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{caregiver.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{caregiver.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{caregiver.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Joined {new Date(caregiver.joinDate).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Professional Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Professional Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Experience</label>
                        <p className="text-lg font-semibold">{caregiver.experience} years</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Hourly Rate</label>
                        <p className="text-lg font-semibold">${caregiver.hourlyRate}/hour</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Availability</label>
                        <p className="text-lg font-semibold">{caregiver.availability}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Rating</label>
                        <div className="flex items-center gap-1">
                          {caregiver.rating > 0 ? (
                            <>
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-lg font-semibold">{caregiver.rating}</span>
                              <span className="text-sm text-muted-foreground">({caregiver.reviewCount} reviews)</span>
                            </>
                          ) : (
                            <span className="text-muted-foreground">No reviews yet</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Services Offered */}
                <Card>
                  <CardHeader>
                    <CardTitle>Services Offered</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {caregiver.services.map((service: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-sm">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Certifications */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {caregiver.certifications.map((cert: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Bio */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Biography
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed">{caregiver.bio}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Status & Actions */}
              <div className="space-y-6">
                {/* Status Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Application Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      {getStatusBadge(caregiver.status)}
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Background Check</span>
                        <div className="flex items-center gap-1">
                          {caregiver.backgroundCheck === "Completed" ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : caregiver.backgroundCheck === "Issues Found" ? (
                            <XCircle className="h-4 w-4 text-red-600" />
                          ) : (
                            <Clock className="h-4 w-4 text-yellow-600" />
                          )}
                          <span className="text-sm">{caregiver.backgroundCheck}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">References</span>
                        <span className="text-sm font-medium">{caregiver.references} provided</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Application Date</span>
                        <span className="text-sm">{new Date(caregiver.joinDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                {caregiver.status === "pending" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve Application
                      </Button>
                      <Button variant="destructive" className="w-full">
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject Application
                      </Button>
                      <Button variant="outline" className="w-full">
                        Request More Information
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Profile Completeness</span>
                      <span className="text-sm font-medium">95%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '95%'}}></div>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm">Response Rate</span>
                      <span className="text-sm font-medium">98%</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm">On-time Rate</span>
                      <span className="text-sm font-medium">96%</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span>Profile updated</span>
                        <span className="text-muted-foreground ml-auto">2 days ago</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span>Background check completed</span>
                        <span className="text-muted-foreground ml-auto">5 days ago</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <span>Application submitted</span>
                        <span className="text-muted-foreground ml-auto">1 week ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            {/* Document Verification Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Document Verification Status
                </CardTitle>
                <CardDescription>
                  Review and approve caregiver documentation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Document Completion</span>
                    <span className="text-sm text-gray-500">{calculateDocumentCompletion()}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${calculateDocumentCompletion()}%` }}
                    ></div>
                  </div>
                  
                  {calculateDocumentCompletion() < 100 && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-yellow-800 dark:text-yellow-200">Incomplete Documentation</h4>
                          <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                            Some required documents are missing or need approval before this caregiver can be activated.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Documents List */}
            <div className="space-y-4">
              {documents.map((document) => (
                <Card key={document.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          {getDocumentStatusIcon(document.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {document.name}
                            </h3>
                            {document.required && (
                              <Badge variant="outline" className="text-xs">Required</Badge>
                            )}
                            {getDocumentStatusBadge(document.status)}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            {document.description}
                          </p>
                          
                          {document.uploadedDate && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>Uploaded: {new Date(document.uploadedDate).toLocaleDateString()}</span>
                              </div>
                              {document.expiryDate && (
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4" />
                                  <span>Expires: {new Date(document.expiryDate).toLocaleDateString()}</span>
                                </div>
                              )}
                            </div>
                          )}

                          {document.adminNotes && (
                            <div className={`p-3 rounded-lg text-sm mb-3 ${
                              document.status === "rejected" 
                                ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
                                : "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                            }`}>
                              <strong>Admin Notes:</strong> {document.adminNotes}
                            </div>
                          )}

                          {document.status === "pending" && (
                            <div className="space-y-3">
                              <Textarea
                                placeholder="Add notes for approval/rejection..."
                                value={adminNotes}
                                onChange={(e) => setAdminNotes(e.target.value)}
                                rows={2}
                              />
                              <div className="flex items-center gap-2">
                                <Button 
                                  size="sm" 
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => {
                                    approveDocument(document.id, adminNotes)
                                    setAdminNotes("")
                                  }}
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="destructive"
                                  onClick={() => {
                                    rejectDocument(document.id, adminNotes)
                                    setAdminNotes("")
                                  }}
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {document.fileUrl && (
                          <>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Overall Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Overall Application Actions</CardTitle>
                <CardDescription>
                  Actions for the entire caregiver application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Add overall notes for the caregiver application..."
                    rows={3}
                  />
                  <div className="flex items-center gap-3">
                    {calculateDocumentCompletion() === 100 ? (
                      <Button className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve Caregiver
                      </Button>
                    ) : (
                      <Button disabled>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve Caregiver (Complete docs first)
                      </Button>
                    )}
                    <Button variant="destructive">
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject Application
                    </Button>
                    <Button variant="outline">
                      Request Additional Documents
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}