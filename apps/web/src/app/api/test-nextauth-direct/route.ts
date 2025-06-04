import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Try to import the auth handlers
    const { handlers } = await import("@/lib/auth-jwt");
    
    // Test if handlers exist
    const handlersInfo = {
      handlersExist: !!handlers,
      handlersType: typeof handlers,
      hasGET: !!(handlers as any)?.GET,
      hasGETType: typeof (handlers as any)?.GET,
      hasPOST: !!(handlers as any)?.POST,
      hasPOSTType: typeof (handlers as any)?.POST,
    };
    
    return NextResponse.json({
      status: "success",
      message: "NextAuth handlers imported successfully",
      handlersInfo,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      errorName: error instanceof Error ? error.name : undefined,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 