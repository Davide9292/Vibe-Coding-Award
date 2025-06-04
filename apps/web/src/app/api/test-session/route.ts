import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    console.log("=== Testing Session ===");
    
    const session = await auth();
    console.log("Session result:", session);
    console.log("Session user:", session?.user);
    console.log("Session user ID:", session?.user?.id);
    console.log("Session user email:", session?.user?.email);
    console.log("Session user name:", session?.user?.name);
    
    return NextResponse.json({
      success: true,
      hasSession: !!session,
      hasUser: !!session?.user,
      hasUserId: !!session?.user?.id,
      user: session?.user ? {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        image: session.user.image
      } : null
    });
    
  } catch (error: any) {
    console.error("Session test error:", error);
    return NextResponse.json(
      { 
        error: "Session test failed",
        details: error?.message
      },
      { status: 500 }
    );
  }
} 