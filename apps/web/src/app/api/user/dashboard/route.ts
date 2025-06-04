import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createSafePrismaClient, isBuildTime } from "@/lib/prisma-safe";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    console.log("=== Dashboard API called ===");
    
    // Return early if we're in build time
    if (isBuildTime()) {
      console.log("Build time detected, returning 503");
      return NextResponse.json({ 
        error: "Database not available during build" 
      }, { status: 503 });
    }

    console.log("Getting session...");
    const session = await auth();
    console.log("Session:", session ? { 
      userId: session.user?.id, 
      email: session.user?.email,
      name: session.user?.name 
    } : "No session");
    
    if (!session?.user?.id) {
      console.log("No valid session found");
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    console.log("Creating Prisma client...");
    let prisma: any;
    try {
      prisma = await createSafePrismaClient();
      console.log("Prisma client created successfully");
    } catch (error) {
      console.error("Failed to create Prisma client:", error);
      return NextResponse.json({ 
        error: "Database client not available" 
      }, { status: 503 });
    }

    try {
      console.log("Looking for user in database:", session.user.id);
      // Fetch user data
      // @ts-ignore
      let user = await prisma.user.findUnique({
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

      // If user doesn't exist, create them from session data
      if (!user) {
        console.log("User not found, creating new user from session:", session.user.id);
        try {
          // @ts-ignore
          user = await prisma.user.create({
            data: {
              id: session.user.id,
              email: session.user.email || '',
              name: session.user.name || null,
              image: session.user.image || null,
            },
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
          console.log("User created successfully:", user.id);
        } catch (createError) {
          console.error("Failed to create user:", createError);
          throw createError;
        }
      } else {
        console.log("User found in database:", user.id);
      }

      console.log("Fetching user projects...");
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
      console.log("Found projects:", projects.length);

      console.log("Fetching user votes...");
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
      console.log("Found votes:", votes.length);

      console.log("Calculating user stats...");
      // Calculate stats
      const totalVotes = projects.reduce((sum: number, project: any) => sum + project._count.votes, 0);
      const monthlyWins = projects.filter((p: any) => p.isWinner).length;
      const peoplesChoiceWins = projects.filter((p: any) => p.isPeoplesChoice).length;
      const standoutProjects = projects.filter((p: any) => p.isStandout).length;

      console.log("Stats calculated:", { 
        projectsSubmitted: projects.length, 
        totalVotes, 
        monthlyWins, 
        peoplesChoiceWins, 
        standoutProjects 
      });

      await prisma.$disconnect();
      console.log("Database disconnected");

      console.log("Returning dashboard data successfully");
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
      console.error("Database operation error:", dbError);
      await prisma.$disconnect();
      throw dbError;
    }

  } catch (error: any) {
    console.error("Dashboard data fetch error:", error);
    console.error("Error message:", error?.message);
    console.error("Error stack:", error?.stack);
    console.error("Error name:", error?.name);
    return NextResponse.json(
      { 
        error: "Failed to fetch dashboard data",
        message: error?.message,
        name: error?.name,
        details: process.env.NODE_ENV === 'development' ? {
          message: error?.message,
          stack: error?.stack,
          name: error?.name
        } : undefined
      },
      { status: 500 }
    );
  }
} 