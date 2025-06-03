"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Navigation from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DebugAuthPage() {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Debug</CardTitle>
              <CardDescription>
                Debug information for authentication status
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div>
                  <strong>Status:</strong> {status}
                </div>
                
                <div>
                  <strong>Session:</strong>
                  <pre className="mt-2 p-3 bg-gray-100 rounded text-sm overflow-auto">
                    {JSON.stringify(session, null, 2)}
                  </pre>
                </div>

                <div>
                  <strong>Environment Check:</strong>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>NEXTAUTH_URL: {process.env.NEXT_PUBLIC_NEXTAUTH_URL || "Not set"}</li>
                    <li>Google OAuth: {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ? "Configured" : "Not configured"}</li>
                    <li>GitHub OAuth: {process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ? "Configured" : "Not configured"}</li>
                  </ul>
                </div>

                <div>
                  <strong>Current URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'Server side'}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 