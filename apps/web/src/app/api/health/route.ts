import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    // Try to import Prisma safely
    let prisma;
    
    try {
      const { prisma: importedPrisma } = await import("@repo/database");
      prisma = importedPrisma;
    } catch (error) {
      return NextResponse.json({
        status: "error",
        message: "Failed to import Prisma client",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }

    // Test database connection
    try {
      await prisma.$queryRaw`SELECT 1`;
      
      // Test basic table access
      const userCount = await prisma.user.count();
      const projectCount = await prisma.project.count();
      const cycleCount = await prisma.awardCycle.count();
      
      return NextResponse.json({
        status: "healthy",
        database: "connected",
        tables: {
          users: userCount,
          projects: projectCount,
          cycles: cycleCount
        },
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
      });
      
    } catch (dbError) {
      return NextResponse.json({
        status: "error",
        message: "Database connection failed",
        error: dbError instanceof Error ? dbError.message : "Unknown database error",
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }
    
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Health check failed",
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 