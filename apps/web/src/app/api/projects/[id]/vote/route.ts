import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@repo/database";

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

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

    // Check if project exists and is votable
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: {
        id: true,
        submissionMonth: true,
        submissionYear: true,
        status: true,
        userId: true,
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // Check if project is in votable status
    if (project.status !== 'SUBMITTED') {
      return NextResponse.json(
        { error: "Project is not available for voting" },
        { status: 400 }
      );
    }

    // Users cannot vote for their own projects
    if (project.userId === session.user.id) {
      return NextResponse.json(
        { error: "You cannot vote for your own project" },
        { status: 400 }
      );
    }

    // Check if user has already voted for this project in this cycle
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_projectId_month_year: {
          userId: session.user.id,
          projectId: projectId,
          month: project.submissionMonth,
          year: project.submissionYear,
        },
      },
    });

    if (existingVote) {
      return NextResponse.json(
        { error: "You have already voted for this project" },
        { status: 400 }
      );
    }

    // Create the vote
    const vote = await prisma.vote.create({
      data: {
        userId: session.user.id,
        projectId: projectId,
        month: project.submissionMonth,
        year: project.submissionYear,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      vote: vote,
      message: "Vote recorded successfully",
    });
  } catch (error) {
    console.error("Error recording vote:", error);
    return NextResponse.json(
      { error: "Internal server error" },
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