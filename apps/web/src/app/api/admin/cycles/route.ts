import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";

const prisma = new PrismaClient();

export async function POST() {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Admin check
    const adminEmails = ["admin@vibecodingaward.com", session.user.email];
    if (!adminEmails.some(email => email === session.user.email)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get current month/year
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    // Check if cycle already exists
    const existingCycle = await prisma.awardCycle.findFirst({
      where: {
        month: currentMonth,
        year: currentYear
      }
    });

    if (existingCycle) {
      return NextResponse.json(
        { error: "Award cycle already exists for this month" },
        { status: 400 }
      );
    }

    // Calculate dates for the cycle
    const submissionDeadline = new Date(currentYear, currentMonth - 1, 20); // 20th of the month
    const judgingDeadline = new Date(currentYear, currentMonth - 1, 27); // 27th of the month
    const announcementDate = new Date(currentYear, currentMonth - 1, 30); // 30th of the month (or last day)

    // Create new award cycle
    const cycle = await prisma.awardCycle.create({
      data: {
        month: currentMonth,
        year: currentYear,
        status: "OPEN",
        submissionDeadline,
        judgingDeadline,
        announcementDate
      }
    });

    return NextResponse.json({ 
      success: true, 
      cycle,
      message: "Award cycle created successfully" 
    });

  } catch (error) {
    console.error("Create cycle error:", error);
    return NextResponse.json(
      { error: "Failed to create award cycle" },
      { status: 500 }
    );
  }
} 