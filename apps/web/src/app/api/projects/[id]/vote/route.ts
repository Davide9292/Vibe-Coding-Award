import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";

// Create a direct Prisma client instance
const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const projectId = params.id;

    // Check if project exists
    const project = await prisma.project.findUnique({
      where: { id: projectId }
    });

    if (!project) {
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

    return NextResponse.json({
      success: true,
      voteCount,
      message: "Vote recorded successfully"
    });

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
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

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
      return NextResponse.json(
        { error: "Vote not found" },
        { status: 404 }
      );
    }

    // Get updated vote count
    const voteCount = await prisma.vote.count({
      where: { projectId }
    });

    return NextResponse.json({
      success: true,
      voteCount,
      message: "Vote removed successfully"
    });

  } catch (error) {
    console.error("Vote removal error:", error);
    return NextResponse.json(
      { error: "Failed to remove vote" },
      { status: 500 }
    );
  }
} 