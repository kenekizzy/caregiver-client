"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  User,
  Upload,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Camera,
  Download,
  Eye,
  Edit,
  Save,
  Shield,
  Award,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Star
} from "lucide-react"

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

// Mock caregiver data
const caregiverData = {
  id: "CG001",
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  phone: "+1 (555) 123-4567",
  avatar: "/avatars/sarah.jpg",
  status: "pending_documents", // pending_documents, under_review, approved, rejected
  joinDate: "2024-01-15",
  location: "New York, NY",
  experience: 5,
  hourlyRate: 25,
  rating: 4.8,
  reviewCount: 127,
  bio: "Experienced caregiver with 5 years of experience in elderly care. Passionate about providing compassionate and professional care.",
  services: ["Personal Care", "Companionship", "Medication Management"],
  availability: "Full-time",
  profileCompletion: 75
}

const requiredDocuments: Document[] = [
  {
    id: "background_check",
    name: "Background Check",
    description: "Criminal background check report",
    required: true,
    status: "approved", // pending, approved, rejected, not_uploaded
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

export default function CaregiverProfileView() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState(caregiverData)
  const [documents, setDocuments] = useState(requiredDocuments)

  const getStatusBadge = (status: string) => {
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

  const getAccountStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          <CheckCircle className="h-4 w-4 mr-1" />
          Approved & Active
        </Badge>
      case "under_review":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          <Clock className="h-4 w-4 mr-1" />
          Under Review
        </Badge>
      case "pending_documents":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
          <AlertTriangle className="h-4 w-4 mr-1" />
          Pending Documents
        </Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
          <XCircle className="h-4 w-4 mr-1" />
          Application Rejected
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

  const calculateProfileCompletion = () => {
    const totalDocuments = documents.filter(doc => doc.required).length
    const completedDocuments = documents.filter(doc => doc.required && doc.status === "approved").length
    return Math.round((completedDocuments / totalDocuments) * 100)
  }

  const handleFileUpload = (documentId: string, file: File) => {
    // In a real app, this would upload the file to the server
    console.log(`Uploading ${file.name} for document ${documentId}`)
    
    // Update document status to pending
    setDocuments(docs => docs.map(doc => 
      doc.id === documentId 
        ? { ...doc, status: "pending", uploadedDate: new Date().toISOString().split('T')[0] }
        : doc
    ))
  }

  const saveProfile = () => {
    // In a real app, this would save to the server
    console.log("Saving profile:", profileData)
    setIsEditing(false)
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Profile & Documents
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your profile information and required documentation
            </p>
          </div>
          <div className="flex items-center gap-3">
            {getAccountStatusBadge(profileData.status)}
          </div>
        </div>
      </div>

      {/* Profile Completion */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Account Verification Status
          </CardTitle>
          <CardDescription>
            Complete your profile and upload required documents to get approved
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Profile Completion</span>
              <span className="text-sm text-gray-500">{calculateProfileCompletion()}%</span>
            </div>
            <Progress value={calculateProfileCompletion()} className="w-full" />
            
            {profileData.status === "pending_documents" && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800 dark:text-yellow-200">Action Required</h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                      Please upload all required documents to complete your verification process. 
                      Your account will be reviewed once all documents are submitted.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
          <TabsTrigger value="documents">Documents & Verification</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Personal Information</CardTitle>
                <Button 
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => isEditing ? saveProfile() : setIsEditing(true)}
                >
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profileData.avatar} alt={profileData.name} />
                    <AvatarFallback className="text-2xl">
                      {profileData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="icon"
                      variant="outline"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {profileData.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">ID: {profileData.id}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{profileData.rating}</span>
                    <span className="text-gray-500">({profileData.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Full Name</label>
                  <Input
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email Address</label>
                  <Input
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Phone Number</label>
                  <Input
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <Input
                    value={profileData.location}
                    onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Years of Experience</label>
                  <Input
                    type="number"
                    value={profileData.experience}
                    onChange={(e) => setProfileData({...profileData, experience: parseInt(e.target.value)})}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Hourly Rate ($)</label>
                  <Input
                    type="number"
                    value={profileData.hourlyRate}
                    onChange={(e) => setProfileData({...profileData, hourlyRate: parseInt(e.target.value)})}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="text-sm font-medium mb-2 block">Professional Bio</label>
                <Textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  disabled={!isEditing}
                  rows={4}
                  placeholder="Tell clients about your experience, specialties, and approach to caregiving..."
                />
              </div>

              {/* Services */}
              <div>
                <label className="text-sm font-medium mb-2 block">Services Offered</label>
                <div className="flex flex-wrap gap-2">
                  {profileData.services.map((service, index) => (
                    <Badge key={index} variant="outline">
                      {service}
                    </Badge>
                  ))}
                  {isEditing && (
                    <Button variant="outline" size="sm">
                      + Add Service
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Required Documents</CardTitle>
              <CardDescription>
                Upload and manage your verification documents. All required documents must be approved before you can start accepting bookings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
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
                              {getStatusBadge(document.status)}
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
                              <div className={`p-3 rounded-lg text-sm ${
                                document.status === "rejected" 
                                  ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
                                  : "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                              }`}>
                                <strong>Admin Notes:</strong> {document.adminNotes}
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
                          <Button 
                            variant={document.status === "not_uploaded" ? "default" : "outline"} 
                            size="sm"
                          >
                            <Upload className="h-4 w-4 mr-1" />
                            {document.status === "not_uploaded" ? "Upload" : "Replace"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upload Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Upload clear, high-quality scans or photos of your documents</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Accepted formats: PDF, JPG, PNG (max 10MB per file)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Ensure all text is readable and documents are not expired</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Documents are typically reviewed within 24-48 hours</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}