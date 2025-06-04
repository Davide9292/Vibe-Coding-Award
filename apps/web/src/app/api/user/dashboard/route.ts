import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createSafePrismaClient, isBuildTime } from "@/lib/prisma-safe";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Return early if we're in build time
    if (isBuildTime()) {
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

    let prisma: any;
    try {
      prisma = await createSafePrismaClient();
    } catch (error) {
      return NextResponse.json({ 
        error: "Database client not available" 
      }, { status: 503 });
    }

    try {
      // Fetch user data
      // @ts-ignore
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          createdAt: true,
          bio: true,
          location: true,
          website: true,
          github: true,
        }
      });

      if (!user) {
        await prisma.$disconnect();
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        );
      }

      // Fetch user's projects
      // @ts-ignore
      const projects = await prisma.project.findMany({
        where: { userId: session.user.id },
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          submittedAt: true,
          category: true,
          isWinner: true,
          isPeoplesChoice: true,
          isStandout: true,
          demoUrl: true,
          repoUrl: true,
          _count: {
            select: {
              votes: true,
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });

      // Fetch user's voting history
      // @ts-ignore
      const votes = await prisma.vote.findMany({
        where: { userId: session.user.id },
        select: {
          id: true,
          createdAt: true,
          project: {
            select: {
              title: true,
              submissionMonth: true,
              submissionYear: true,
              user: {
                select: {
                  name: true,
                  username: true,
                }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 20
      });

      // Calculate stats
      const totalVotes = projects.reduce((sum: number, project: any) => sum + project._count.votes, 0);
      const monthlyWins = projects.filter((p: any) => p.isWinner).length;
      const peoplesChoiceWins = projects.filter((p: any) => p.isPeoplesChoice).length;
      const standoutProjects = projects.filter((p: any) => p.isStandout).length;

      await prisma.$disconnect();

      return NextResponse.json({
        profile: {
          name: user.name,
          username: user.username,
          email: user.email,
          joinedAt: user.createdAt,
          bio: user.bio,
          location: user.location,
          website: user.website,
          github: user.github,
        },
        stats: {
          projectsSubmitted: projects.length,
          totalVotes,
          monthlyWins,
          peoplesChoiceWins,
          standoutProjects,
        },
        projects: projects.map((project: any) => ({
          id: project.id,
          title: project.title,
          description: project.description,
          status: project.status,
          submittedAt: project.submittedAt,
          category: project.category,
          votes: project._count.votes,
          isWinner: project.isWinner,
          isPeoplesChoice: project.isPeoplesChoice,
          demoUrl: project.demoUrl,
          repoUrl: project.repoUrl,
        })),
        votingHistory: votes.map((vote: any) => ({
          id: vote.id,
          projectTitle: vote.project.title,
          projectAuthor: vote.project.user.name || vote.project.user.username || 'Anonymous',
          votedAt: vote.createdAt,
          month: vote.project.submissionMonth,
          year: vote.project.submissionYear,
        }))
      });

    } catch (dbError) {
      await prisma.$disconnect();
      throw dbError;
    }

  } catch (error: any) {
    console.error("Dashboard data fetch error:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch dashboard data",
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 }
    );
  }
} 