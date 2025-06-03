import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // For now, simple admin check (you can enhance this)
    const adminEmails = ["admin@vibecodingaward.com", session.user.email];
    if (!adminEmails.some(email => email === session.user.email)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

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

    return NextResponse.json({ cycle });

  } catch (error) {
    console.error("Current cycle fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch current cycle" },
      { status: 500 }
    );
  }
} 