"use client";

import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Navigation from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Chrome, AlertCircle } from "lucide-react";
import Link from "next/link";

interface AuthConfig {
  oauth: {
    google: boolean;
    github: boolean;
  };
  config: {
    nextAuthUrl: boolean;
    nextAuthSecret: boolean;
  };
}

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [authConfig, setAuthConfig] = useState<AuthConfig | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch OAuth configuration from server
  useEffect(() => {
    const fetchAuthConfig = async () => {
      try {
        const response = await fetch('/api/auth-config');
        if (response.ok) {
          const config = await response.json();
          setAuthConfig(config);
        }
      } catch (err) {
        console.error('Failed to fetch auth config:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthConfig();
  }, []);

  useEffect(() => {
    if (session) {
      router.push(callbackUrl as any);
    }
  }, [session, router, callbackUrl]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="w-8 h-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (session) {
    return null; // Will redirect via useEffect
  }

  const hasGoogleAuth = authConfig?.oauth.google || false;
  const hasGitHubAuth = authConfig?.oauth.github || false;
  const isOAuthConfigured = hasGoogleAuth || hasGitHubAuth;

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
              {!isOAuthConfigured && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">OAuth Not Configured</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        To enable sign-in, you need to set up OAuth providers. 
                        Check the <Link href="/debug-auth" className="underline">debug page</Link> or 
                        see AUTHENTICATION_SETUP.md for instructions.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <Button
                  onClick={() => signIn("google", { callbackUrl })}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 h-12"
                  disabled={!hasGoogleAuth}
                >
                  <Chrome className="w-5 h-5" />
                  Sign in with Google
                  {!hasGoogleAuth && <span className="text-xs text-gray-500">(Not configured)</span>}
                </Button>
                
                <Button
                  onClick={() => signIn("github", { callbackUrl })}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 h-12"
                  disabled={!hasGitHubAuth}
                >
                  <Github className="w-5 h-5" />
                  Sign in with GitHub
                  {!hasGitHubAuth && <span className="text-xs text-gray-500">(Not configured)</span>}
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

          {/* Development helper */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 text-center">
              <Link href="/debug-auth" className="text-sm text-gray-500 hover:text-blue-600">
                🔧 Debug Authentication
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 