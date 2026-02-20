// API configuration and utilities
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const API_PREFIX = '/api/v1';

export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    isVerified: boolean;
  };
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'CLIENT' | 'CAREGIVER' | 'ADMIN';
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  dateOfBirth?: string;
  gender?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
}

export interface RegisterResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    isVerified: boolean;
  };
  verificationLink?: string;
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL + API_PREFIX;
    // Get token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          error: data.message || `HTTP error! status: ${response.status}`,
        };
      }

      return { data };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Network error occurred',
      };
    }
  }

  // Auth endpoints
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: RegisterRequest): Promise<ApiResponse<RegisterResponse>> {
    return this.request<RegisterResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async verifyEmail(token: string): Promise<ApiResponse<any>> {
    return this.request(`/auth/verify-email?token=${token}`);
  }

  async refreshToken(refreshToken: string): Promise<ApiResponse<{ access_token: string }>> {
    return this.request<{ access_token: string }>('/auth/refresh-token', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
  }

  // Admin endpoints
  async getAdminProfile(): Promise<ApiResponse<any>> {
    return this.request('/admin/profile');
  }

  async getPendingCaregivers(): Promise<ApiResponse<any[]>> {
    return this.request('/admin/caregivers/pending');
  }

  async approveCaregiver(caregiverId: string): Promise<ApiResponse<any>> {
    return this.request(`/admin/caregivers/${caregiverId}/approve`, {
      method: 'POST',
      body: JSON.stringify({ approved: true }),
    });
  }

  async rejectCaregiver(caregiverId: string): Promise<ApiResponse<any>> {
    return this.request(`/admin/caregivers/${caregiverId}/approve`, {
      method: 'POST',
      body: JSON.stringify({ approved: false }),
    });
  }

  // Caregiver Dashboard endpoints
  async getCaregiverDashboard(caregiverId: string): Promise<ApiResponse<any>> {
    return this.request(`/caregivers/${caregiverId}/dashboard`);
  }

  async getCaregiverBookings(
    caregiverId: string,
    params?: { status?: string; page?: number; limit?: number }
  ): Promise<ApiResponse<any>> {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    
    const query = queryParams.toString();
    return this.request(`/caregivers/${caregiverId}/bookings${query ? `?${query}` : ''}`);
  }

  async getCaregiverEarnings(
    caregiverId: string,
    period?: 'week' | 'month' | 'year'
  ): Promise<ApiResponse<any>> {
    const query = period ? `?period=${period}` : '';
    return this.request(`/caregivers/${caregiverId}/earnings${query}`);
  }

  async getCaregiverReviews(
    caregiverId: string,
    params?: { page?: number; limit?: number }
  ): Promise<ApiResponse<any>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    
    const query = queryParams.toString();
    return this.request(`/caregivers/${caregiverId}/reviews${query ? `?${query}` : ''}`);
  }

  async getCaregiverSchedule(
    caregiverId: string,
    params?: { startDate?: string; endDate?: string }
  ): Promise<ApiResponse<any>> {
    const queryParams = new URLSearchParams();
    if (params?.startDate) queryParams.append('startDate', params.startDate);
    if (params?.endDate) queryParams.append('endDate', params.endDate);
    
    const query = queryParams.toString();
    return this.request(`/caregivers/${caregiverId}/schedule${query ? `?${query}` : ''}`);
  }

  async setCaregiverAvailability(
    caregiverId: string,
    availability: {
      dayOfWeek: string;
      startTime: string;
      endTime: string;
      isAvailable: boolean;
    }[]
  ): Promise<ApiResponse<any>> {
    return this.request(`/caregivers/${caregiverId}/availability`, {
      method: 'POST',
      body: JSON.stringify(availability),
    });
  }

  async getCaregiverClients(caregiverId: string): Promise<ApiResponse<any>> {
    return this.request(`/caregivers/${caregiverId}/clients`);
  }

  async getCaregiverNotifications(
    caregiverId: string,
    unread?: boolean
  ): Promise<ApiResponse<any>> {
    const query = unread ? '?unread=true' : '';
    return this.request(`/caregivers/${caregiverId}/notifications${query}`);
  }

  async updateCaregiverProfile(
    caregiverId: string,
    profileData: {
      bio?: string;
      experience?: number;
      hourlyRate?: number;
    }
  ): Promise<ApiResponse<any>> {
    return this.request(`/caregivers/${caregiverId}`, {
      method: 'PATCH',
      body: JSON.stringify(profileData),
    });
  }

  async getCaregiverProfileCompletion(caregiverId: string): Promise<ApiResponse<any>> {
    return this.request(`/caregivers/${caregiverId}/profile-completion`, {
      method: 'PATCH',
    });
  }

  // Booking endpoints for caregivers
  async updateBookingStatus(
    bookingId: string,
    status: string
  ): Promise<ApiResponse<unknown>> {
    return this.request(`/bookings/${bookingId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  async getBookingDetails(bookingId: string): Promise<ApiResponse<unknown>> {
    return this.request(`/bookings/${bookingId}`);
  }

  // Get caregiver profile by user ID
  async getCaregiverByUserId(userId: string): Promise<ApiResponse<{ id: string; userId: string; bio: string; experience: number; hourlyRate: number; rating: number; reviewCount: number; isVerified: boolean; }>> {
    return this.request(`/caregivers/user/${userId}`);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);