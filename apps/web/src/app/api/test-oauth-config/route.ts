import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'https://vibecodingaward.vercel.app';
    
    const oauthConfig = {
      baseUrl,
      nextAuthCallbackUrl: `${baseUrl}/api/auth/callback/google`,
      gitHubCallbackUrl: `${baseUrl}/api/auth/callback/github`,
      signInUrl: `${baseUrl}/api/auth/signin`,
      signOutUrl: `${baseUrl}/api/auth/signout`,
      csrfUrl: `${baseUrl}/api/auth/csrf`,
      providersUrl: `${baseUrl}/api/auth/providers`,
      
      // What should be configured in Google Cloud Console
      googleOAuthSettings: {
        authorizedJavaScriptOrigins: [
          baseUrl
        ],
        authorizedRedirectURIs: [
          `${baseUrl}/api/auth/callback/google`
        ]
      },
      
      // What should be configured in GitHub OAuth App
      gitHubOAuthSettings: {
        homepageURL: baseUrl,
        authorizationCallbackURL: `${baseUrl}/api/auth/callback/github`
      }
    };
    
    return NextResponse.json({
      status: "success",
      message: "OAuth configuration URLs",
      config: oauthConfig,
      instructions: {
        google: "Add these URLs to your Google Cloud Console OAuth app",
        github: "Add these URLs to your GitHub OAuth app settings"
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 