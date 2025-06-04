"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Navigation from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthConfig {
  oauth: {
    google: boolean;
    github: boolean;
  };
  config: {
    nextAuthUrl: boolean;
    nextAuthSecret: boolean;
  };
  environment: string;
  timestamp: string;
}

export default function DebugAuthPage() {
  const { data: session, status } = useSession();
  const [authConfig, setAuthConfig] = useState<AuthConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthConfig = async () => {
      try {
        const response = await fetch('/api/auth-config');
        if (response.ok) {
          const config = await response.json();
          setAuthConfig(config);
        } else {
          setError('Failed to fetch auth configuration');
        }
      } catch (err) {
        setError('Error fetching auth configuration');
      } finally {
        setLoading(false);
      }
    };

    fetchAuthConfig();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Debug</CardTitle>
              <CardDescription>
                Debug information for authentication status and configuration
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div>
                  <strong>Session Status:</strong> {status}
                </div>
                
                <div>
                  <strong>Session Data:</strong>
                  <pre className="mt-2 p-3 bg-gray-100 rounded text-sm overflow-auto">
                    {JSON.stringify(session, null, 2)}
                  </pre>
                </div>

                <div>
                  <strong>OAuth Configuration:</strong>
                  {loading ? (
                    <p className="mt-2 text-gray-600">Loading...</p>
                  ) : error ? (
                    <p className="mt-2 text-red-600">{error}</p>
                  ) : authConfig ? (
                    <ul className="mt-2 space-y-1 text-sm">
                      <li className={authConfig.oauth.google ? "text-green-600" : "text-red-600"}>
                        ✓ Google OAuth: {authConfig.oauth.google ? "Configured" : "Not configured"}
                      </li>
                      <li className={authConfig.oauth.github ? "text-green-600" : "text-red-600"}>
                        ✓ GitHub OAuth: {authConfig.oauth.github ? "Configured" : "Not configured"}
                      </li>
                      <li className={authConfig.config.nextAuthUrl ? "text-green-600" : "text-red-600"}>
                        ✓ NEXTAUTH_URL: {authConfig.config.nextAuthUrl ? "Set" : "Not set"}
                      </li>
                      <li className={authConfig.config.nextAuthSecret ? "text-green-600" : "text-red-600"}>
                        ✓ NEXTAUTH_SECRET: {authConfig.config.nextAuthSecret ? "Set" : "Not set"}
                      </li>
                    </ul>
                  ) : null}
                </div>

                <div>
                  <strong>Environment:</strong> {authConfig?.environment || 'Unknown'}
                </div>

                <div>
                  <strong>Current URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'Server side'}
                </div>

                {authConfig && (
                  <div>
                    <strong>Last Check:</strong> {new Date(authConfig.timestamp).toLocaleString()}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 