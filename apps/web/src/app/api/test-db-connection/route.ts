import { NextRequest, NextResponse } from "next/server";
import { createSafePrismaClient } from "@/lib/prisma-safe";

export async function GET(request: NextRequest) {
  try {
    console.log("=== Testing Database Connection ===");
    
    // Check if DATABASE_URL exists
    const dbUrl = process.env.DATABASE_URL;
    console.log("DATABASE_URL exists:", !!dbUrl);
    console.log("DATABASE_URL starts with:", dbUrl?.substring(0, 20) + "...");
    
    let prisma: any;
    try {
      console.log("Creating Prisma client...");
      prisma = await createSafePrismaClient();
      console.log("Prisma client created successfully");
    } catch (error) {
      console.error("Failed to create Prisma client:", error);
      return NextResponse.json({ 
        error: "Failed to create Prisma client",
        details: error
      }, { status: 500 });
    }

    try {
      console.log("Testing database connection with simple query...");
      // @ts-ignore
      const result = await prisma.$queryRaw`SELECT 1 as test`;
      console.log("Database query result:", result);
      
      console.log("Testing user table access...");
      // @ts-ignore
      const userCount = await prisma.user.count();
      console.log("Total users in database:", userCount);
      
      await prisma.$disconnect();
      console.log("Database connection test successful");
      
      return NextResponse.json({
        success: true,
        message: "Database connection successful",
        userCount,
        hasUrl: !!dbUrl
      });
      
    } catch (dbError) {
      console.error("Database query error:", dbError);
      await prisma.$disconnect();
      
      return NextResponse.json({ 
        error: "Database query failed",
        details: dbError
      }, { status: 500 });
    }

  } catch (error: any) {
    console.error("Database connection test error:", error);
    return NextResponse.json(
      { 
        error: "Database connection test failed",
        details: error?.message
      },
      { status: 500 }
    );
  }
} 