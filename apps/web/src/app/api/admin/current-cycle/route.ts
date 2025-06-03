import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    // Skip database operations during build time
    if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
      return NextResponse.json({ 
        error: "Database not available during build" 
      }, { status: 503 });
    }

    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // For now, simple admin check (you can enhance this)
    const adminEmails = ["admin@vibecodingaward.com", session.user.email];
    if (!adminEmails.some(email => email === session.user.email)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Dynamically import Prisma only when needed
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();

    try {
      // Get current month/year
      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear();

      // Find current award cycle
      const cycle = await prisma.awardCycle.findFirst({
        where: {
          month: currentMonth,
          year: currentYear
        },
        include: {
          _count: {
            select: {
              projects: true,
              votes: true
            }
          }
        }
      });

      await prisma.$disconnect();
      return NextResponse.json({ cycle });

    } catch (dbError) {
      await prisma.$disconnect();
      throw dbError;
    }

  } catch (error) {
    console.error("Current cycle fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch current cycle" },
      { status: 500 }
    );
  }
} 