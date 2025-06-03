"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Navigation from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { Chrome } from "lucide-react";

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  useEffect(() => {
    if (session) {
      router.push(callbackUrl as any);
    }
  }, [session, router, callbackUrl]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="w-8 h-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (session) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          <Card className="border shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
              <CardDescription>
                Sign in to submit your vibe coding projects and join the community
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Button
                  onClick={() => signIn("google", { callbackUrl })}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 h-12"
                >
                  <Chrome className="w-5 h-5" />
                  Sign in with Google
                </Button>
                
                <Button
                  onClick={() => signIn("github", { callbackUrl })}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 h-12"
                >
                  <Github className="w-5 h-5" />
                  Sign in with GitHub
                </Button>
              </div>
              
              <div className="pt-4 text-center text-sm text-gray-500">
                <p>
                  By signing in, you agree to our{" "}
                  <a href="/terms" className="text-blue-600 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              New to Vibe Coding Award?{" "}
              <a href="/about" className="text-blue-600 hover:underline font-medium">
                Learn more about our community
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 