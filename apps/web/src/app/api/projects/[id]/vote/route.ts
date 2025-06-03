import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Skip database operations during build time
    if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
      return NextResponse.json({ 
        error: "Database not available during build" 
      }, { status: 503 });
    }

    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Dynamically import Prisma only when needed
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();

    try {
      const projectId = params.id;

      // Check if project exists
      const project = await prisma.project.findUnique({
        where: { id: projectId }
      });

      if (!project) {
        await prisma.$disconnect();
        return NextResponse.json(
          { error: "Project not found" },
          { status: 404 }
        );
      }

      // Get current month and year
      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear();

      // Check if user already voted for this project this month
      const existingVote = await prisma.vote.findUnique({
        where: {
          userId_projectId_month_year: {
            userId: session.user.id,
            projectId,
            month: currentMonth,
            year: currentYear,
          }
        }
      });

      if (existingVote) {
        await prisma.$disconnect();
        return NextResponse.json(
          { error: "You have already voted for this project this month" },
          { status: 400 }
        );
      }

      // Create the vote
      const vote = await prisma.vote.create({
        data: {
          userId: session.user.id,
          projectId,
          month: currentMonth,
          year: currentYear,
        }
      });

      // Get updated vote count
      const voteCount = await prisma.vote.count({
        where: { projectId }
      });

      await prisma.$disconnect();
      return NextResponse.json({
        success: true,
        voteCount,
        message: "Vote recorded successfully"
      });

    } catch (dbError) {
      await prisma.$disconnect();
      throw dbError;
    }

  } catch (error) {
    console.error("Voting error:", error);
    return NextResponse.json(
      { error: "Failed to record vote" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Skip database operations during build time
    if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
      return NextResponse.json({ 
        error: "Database not available during build" 
      }, { status: 503 });
    }

    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Dynamically import Prisma only when needed
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();

    try {
      const projectId = params.id;

      // Get current month and year
      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear();

      // Find and delete the vote
      const deletedVote = await prisma.vote.deleteMany({
        where: {
          userId: session.user.id,
          projectId,
          month: currentMonth,
          year: currentYear,
        }
      });

      if (deletedVote.count === 0) {
        await prisma.$disconnect();
        return NextResponse.json(
          { error: "Vote not found" },
          { status: 404 }
        );
      }

      // Get updated vote count
      const voteCount = await prisma.vote.count({
        where: { projectId }
      });

      await prisma.$disconnect();
      return NextResponse.json({
        success: true,
        voteCount,
        message: "Vote removed successfully"
      });

    } catch (dbError) {
      await prisma.$disconnect();
      throw dbError;
    }

  } catch (error) {
    console.error("Vote removal error:", error);
    return NextResponse.json(
      { error: "Failed to remove vote" },
      { status: 500 }
    );
  }
} 