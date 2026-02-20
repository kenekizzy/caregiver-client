// Common API types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface DateRange {
  start: Date;
  end: Date;
}

export interface AmountRange {
  min: number;
  max: number;
}

// User Management Types
export interface AdminUserView {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isVerified: boolean;
  isActive: boolean;
  registrationDate: Date;
  lastLogin: Date;
  bookingCount: number;
  totalSpent?: number;
  averageRating?: number;
}

export interface UserProfile {
  id: string;
  bio?: string;
  phone?: string;
  address?: string;
  profileImage?: string;
  preferences: Record<string, any>;
}

export interface UserFilters {
  role?: UserRole;
  isVerified?: boolean;
  isActive?: boolean;
  registrationDateRange?: DateRange;
  searchQuery?: string;
}

export enum UserRole {
  CLIENT = 'client',
  CAREGIVER = 'caregiver',
  ADMIN = 'admin'
}

export enum UserAction {
  VIEW_DETAILS = 'view_details',
  VERIFY = 'verify',
  SUSPEND = 'suspend',
  ACTIVATE = 'activate',
  DELETE = 'delete',
  SEND_MESSAGE = 'send_message'
}

// Caregiver Management Types
export interface CaregiverApplication {
  id: string;
  userId: string;
  applicantName: string;
  email: string;
  phone: string;
  bio: string;
  experience: number;
  services: ServiceApplication[];
  certifications: CertificationApplication[];
  availability: AvailabilitySlot[];
  submittedAt: Date;
  status: ApplicationStatus;
  reviewNotes?: string;
}

export interface ServiceApplication {
  id: string;
  name: string;
  description: string;
  hourlyRate: number;
}

export interface CertificationApplication {
  id: string;
  name: string;
  issuingBody: string;
  issueDate: Date;
  expiryDate?: Date;
  documentUrl: string;
  verificationStatus: VerificationStatus;
}

export interface AvailabilitySlot {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export enum ApplicationStatus {
  PENDING = 'pending',
  UNDER_REVIEW = 'under_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  MORE_INFO_REQUIRED = 'more_info_required'
}

export enum VerificationStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected'
}

// Booking Management Types
export interface AdminBookingView {
  id: string;
  clientName: string;
  caregiverName: string;
  serviceName: string;
  startTime: Date;
  endTime: Date;
  status: BookingStatus;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  hasDispute: boolean;
  createdAt: Date;
}

export interface BookingFilters {
  status?: BookingStatus;
  dateRange?: DateRange;
  serviceCategory?: ServiceCategory;
  hasDispute?: boolean;
  paymentStatus?: PaymentStatus;
  searchQuery?: string;
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}

export enum ServiceCategory {
  ELDERLY_CARE = 'elderly_care',
  CHILD_CARE = 'child_care',
  DISABILITY_SUPPORT = 'disability_support',
  COMPANIONSHIP = 'companionship'
}

// Payment Management Types
export interface AdminTransactionView {
  id: string;
  bookingId: string;
  clientName: string;
  caregiverName: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentMethod: string;
  transactionId?: string;
  processedAt?: Date;
  createdAt: Date;
  flags: TransactionFlag[];
}

export interface TransactionFilters {
  status?: PaymentStatus;
  dateRange?: DateRange;
  amountRange?: AmountRange;
  paymentMethod?: string;
  hasFraudFlag?: boolean;
  searchQuery?: string;
}

export interface TransactionFlag {
  id: string;
  type: FlagType;
  reason: string;
  severity: SeverityLevel;
}

// Content Moderation Types
export interface FlaggedContent {
  id: string;
  type: ContentType;
  content: string;
  authorId: string;
  authorName: string;
  reportedBy: string;
  reportReason: string;
  severity: SeverityLevel;
  createdAt: Date;
  flaggedAt: Date;
  status: ModerationStatus;
}

export enum ContentType {
  CHAT_MESSAGE = 'chat_message',
  REVIEW = 'review',
  PROFILE_BIO = 'profile_bio',
  SERVICE_DESCRIPTION = 'service_description'
}

export enum ModerationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REMOVED = 'removed',
  EDITED = 'edited'
}

export enum FlagType {
  INAPPROPRIATE_BEHAVIOR = 'inappropriate_behavior',
  FRAUD_SUSPICION = 'fraud_suspicion',
  POLICY_VIOLATION = 'policy_violation',
  SPAM = 'spam',
  SAFETY_CONCERN = 'safety_concern'
}

export enum SeverityLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

// Analytics Types
export interface PlatformMetrics {
  userMetrics: {
    totalUsers: number;
    newRegistrations: number;
    activeUsers: number;
    userRetention: number;
  };
  bookingMetrics: {
    totalBookings: number;
    completionRate: number;
    averageBookingValue: number;
    bookingGrowth: number;
  };
  caregiverMetrics: {
    totalCaregivers: number;
    verifiedCaregivers: number;
    averageRating: number;
    utilizationRate: number;
  };
  financialMetrics: {
    totalRevenue: number;
    platformFees: number;
    caregiverEarnings: number;
    refundedAmount: number;
    averageTransactionValue: number;
    transactionCount: number;
    revenueGrowth: number;
  };
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
  }[];
}