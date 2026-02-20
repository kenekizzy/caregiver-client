"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useToast } from "@/lib/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, User, DollarSign, Clock } from "lucide-react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function CaregiverSetupPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { success, error: showError } = useToast();
  const [formData, setFormData] = useState({
    bio: "",
    experience: "",
    hourlyRate: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/caregivers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify({
          userId: user?.id,
          bio: formData.bio,
          experience: parseInt(formData.experience),
          hourlyRate: parseFloat(formData.hourlyRate),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create caregiver profile');
      }

      success('Profile created successfully!', 'Welcome to the caregiver community!');
      // Redirect to caregiver dashboard
      router.push('/caregiver-dashboard');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create profile';
      setError(errorMessage);
      showError('Profile creation failed', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <ProtectedRoute requiredRole="CAREGIVER" redirectTo="/login">
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Set Up Your Caregiver Profile</CardTitle>
            <CardDescription>
              Complete your profile to start receiving care service bookings
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-6" variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Bio Section */}
              <div className="space-y-2">
                <Label htmlFor="bio" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  About You
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Tell clients about your experience, approach to care, and what makes you special..."
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={4}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  A compelling bio helps clients understand your caregiving style and experience.
                </p>
              </div>

              {/* Experience Section */}
              <div className="space-y-2">
                <Label htmlFor="experience" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Years of Experience
                </Label>
                <Input
                  id="experience"
                  type="number"
                  placeholder="e.g., 5"
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  min="0"
                  max="50"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Include all relevant caregiving experience, including professional and personal care.
                </p>
              </div>

              {/* Hourly Rate Section */}
              <div className="space-y-2">
                <Label htmlFor="hourlyRate" className="flex items-center gap-2">
                  {/* <DollarSign className="h-4 w-4" /> */}
                  ₦
                  Hourly Rate (NGN)
                </Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  placeholder="e.g., 25.00"
                  value={formData.hourlyRate}
                  onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                  min="10"
                  max="200"
                  step="0.50"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Set a competitive rate based on your experience and local market rates.
                </p>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Profile...
                  </>
                ) : (
                  'Create Caregiver Profile'
                )}
              </Button>
            </form>

            {/* Additional Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">What happens next?</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Your profile will be reviewed by our team</li>
                <li>• You&apos;ll receive verification instructions via email</li>
                <li>• Once verified, you can start receiving bookings</li>
                <li>• You can always update your profile later</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}