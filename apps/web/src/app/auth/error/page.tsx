"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Navigation from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

const errors: Record<string, string> = {
  Signin: "Try signing in with a different account.",
  OAuthSignin: "Try signing in with a different account.",
  OAuthCallback: "Try signing in with a different account.",
  OAuthCreateAccount: "Try signing in with a different account.",
  EmailCreateAccount: "Try signing in with a different account.",
  Callback: "Try signing in with a different account.",
  OAuthAccountNotLinked: "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "The e-mail could not be sent.",
  CredentialsSignin: "Sign in failed. Check the details you provided are correct.",
  SessionRequired: "Please sign in to access this page.",
  default: "Unable to sign in."
};

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          <Card className="border shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-red-600">
                Authentication Error
              </CardTitle>
              <CardDescription>
                {error ? errors[error] || errors.default : "An error occurred during authentication"}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {error && (
                <div className="p-3 bg-gray-100 rounded-md">
                  <p className="text-sm text-gray-600">
                    <strong>Error code:</strong> {error}
                  </p>
                </div>
              )}
              
              <div className="space-y-3">
                <Button asChild className="w-full">
                  <Link href="/auth/signin">
                    Try Again
                  </Link>
                </Button>
                
                <Button variant="outline" asChild className="w-full">
                  <Link href="/">
                    Go Home
                  </Link>
                </Button>
              </div>
              
              <div className="pt-4 text-center text-sm text-gray-500">
                <p>
                  If this problem persists, please contact support.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 