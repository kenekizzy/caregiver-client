"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/lib/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle, Mail, ArrowRight, RotateCcw } from "lucide-react";
import Link from "next/link";

type VerificationState = 'verifying' | 'success' | 'error' | 'missing-token';

export default function VerifyEmailPage() {
  const [verificationState, setVerificationState] = useState<VerificationState>('verifying');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const { verifyEmail, user, isAuthenticated } = useAuth();
  const { success, error: showError } = useToast();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setVerificationState('missing-token');
      setErrorMessage('Verification token is missing from the URL');
      return;
    }

    const performVerification = async () => {
      try {
        const result = await verifyEmail(token);
        
        if (result.success) {
          setVerificationState('success');
          success('Email verified successfully!', 'Your account has been activated.');
          
          // Redirect to appropriate dashboard after 3 seconds
          setTimeout(() => {
            setIsRedirecting(true);
            if (isAuthenticated && user) {
              // Redirect based on user role
              switch (user.role) {
                case 'ADMIN':
                  router.push('/admin');
                  break;
                case 'CAREGIVER':
                  router.push('/caregiver-dashboard');
                  break;
                case 'CLIENT':
                  router.push('/dashboard');
                  break;
                default:
                  router.push('/login');
              }
            } else {
              router.push('/login');
            }
          }, 3000);
        } else {
          setVerificationState('error');
          setErrorMessage(result.error || 'Email verification failed');
          showError('Verification failed', result.error || 'Please try again or contact support');
          
          // Redirect to register page after 5 seconds
          setTimeout(() => {
            setIsRedirecting(true);
            router.push('/register');
          }, 5000);
        }
      } catch (err) {
        setVerificationState('error');
        const errorMsg = 'An unexpected error occurred during verification';
        setErrorMessage(errorMsg);
        showError('Verification failed', errorMsg);
        
        // Redirect to register page after 5 seconds
        setTimeout(() => {
          setIsRedirecting(true);
          router.push('/register');
        }, 5000);
      }
    };

    performVerification();
  }, [searchParams, verifyEmail, success, showError, router, user, isAuthenticated]);

  const handleRetryVerification = () => {
    const token = searchParams.get('token');
    if (token) {
      setVerificationState('verifying');
      setErrorMessage('');
      // Trigger verification again
      window.location.reload();
    }
  };

  const renderContent = () => {
    switch (verificationState) {
      case 'verifying':
        return (
          <>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <Loader2 className="h-6 w-6 text-blue-600 dark:text-blue-400 animate-spin" />
              </div>
              <CardTitle className="text-2xl font-bold">Verifying Your Email</CardTitle>
              <CardDescription>
                Please wait while we verify your email address...
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm text-muted-foreground">Processing verification...</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  This should only take a few seconds
                </p>
              </div>
            </CardContent>
          </>
        );

      case 'success':
        return (
          <>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-green-700 dark:text-green-300">
                Email Verified Successfully!
              </CardTitle>
              <CardDescription>
                Your account has been activated and is ready to use
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-sm text-green-800 dark:text-green-200 mb-2">
                  ✓ Email address confirmed
                </p>
                <p className="text-sm text-green-800 dark:text-green-200">
                  ✓ Account activated successfully
                </p>
              </div>

              <div className="text-center">
                <Button 
                  disabled={isRedirecting}
                  onClick={() => {
                    setIsRedirecting(true);
                    if (isAuthenticated && user) {
                      switch (user.role) {
                        case 'ADMIN':
                          router.push('/admin');
                          break;
                        case 'CAREGIVER':
                          router.push('/caregiver-dashboard');
                          break;
                        case 'CLIENT':
                          router.push('/dashboard');
                          break;
                        default:
                          router.push('/login');
                      }
                    } else {
                      router.push('/login');
                    }
                  }}
                  className="w-full"
                >
                  {isRedirecting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Redirecting...
                    </>
                  ) : (
                    <>
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Continue to Dashboard
                    </>
                  )}
                </Button>
              </div>

              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  {isRedirecting ? 'Redirecting to your dashboard...' : 'Redirecting automatically in 3 seconds...'}
                </p>
              </div>
            </CardContent>
          </>
        );

      case 'error':
        return (
          <>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-red-700 dark:text-red-300">
                Verification Failed
              </CardTitle>
              <CardDescription>
                We couldn&apos;t verify your email address
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-800 dark:text-red-200 mb-2">
                  {errorMessage}
                </p>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={handleRetryVerification}
                  variant="outline"
                  className="w-full"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>

                <Button 
                  disabled={isRedirecting}
                  onClick={() => {
                    setIsRedirecting(true);
                    router.push('/register');
                  }}
                  className="w-full"
                >
                  {isRedirecting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Redirecting...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Register New Account
                    </>
                  )}
                </Button>
              </div>

              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  {isRedirecting ? 'Redirecting to registration...' : 'Redirecting to registration in 5 seconds...'}
                </p>
              </div>
            </CardContent>
          </>
        );

      case 'missing-token':
        return (
          <>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900">
                <Mail className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <CardTitle className="text-2xl font-bold">Invalid Verification Link</CardTitle>
              <CardDescription>
                The verification link appears to be incomplete or invalid
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  Please check your email for the correct verification link, or register for a new account.
                </p>
              </div>

              <div className="space-y-3">
                <Button asChild className="w-full">
                  <Link href="/register">
                    <Mail className="mr-2 h-4 w-4" />
                    Register New Account
                  </Link>
                </Button>

                <Button variant="outline" asChild className="w-full">
                  <Link href="/login">
                    Sign In Instead
                  </Link>
                </Button>
              </div>
            </CardContent>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        {renderContent()}
      </Card>
    </div>
  );
}