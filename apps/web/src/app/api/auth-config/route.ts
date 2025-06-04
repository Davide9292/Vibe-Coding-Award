import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Check server-side OAuth configuration
    const hasGoogleOAuth = !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
    const hasGitHubOAuth = !!(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET);
    const hasNextAuthUrl = !!process.env.NEXTAUTH_URL;
    const hasNextAuthSecret = !!process.env.NEXTAUTH_SECRET;

    return NextResponse.json({
      oauth: {
        google: hasGoogleOAuth,
        github: hasGitHubOAuth,
      },
      config: {
        nextAuthUrl: hasNextAuthUrl,
        nextAuthSecret: hasNextAuthSecret,
      },
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      error: "Failed to check auth configuration",
      message: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
} 