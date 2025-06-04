import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Test basic functionality
    const timestamp = new Date().toISOString();
    
    // Test environment variables
    const envCheck = {
      nodeEnv: process.env.NODE_ENV,
      hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID,
      hasGoogleClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
      hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
      hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
      nextAuthUrl: process.env.NEXTAUTH_URL, // Show actual value to debug
    };
    
    return NextResponse.json({
      status: "success",
      message: "Simple API route working",
      timestamp,
      environment: envCheck,
    });
    
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 