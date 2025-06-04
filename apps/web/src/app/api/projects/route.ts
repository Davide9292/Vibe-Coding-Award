import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { sendSubmissionConfirmation } from "@/lib/email";
import { createSafePrismaClient, isBuildTime } from "@/lib/prisma-safe";

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    console.log("=== Project submission started ===");
    
    // Return early if we're in build time
    if (isBuildTime()) {
      console.log("Build time detected, returning early");
      return NextResponse.json({ 
        error: "Database not available during build" 
      }, { status: 503 });
    }

    console.log("Checking authentication...");
    const session = await auth();
    
    if (!session?.user?.id) {
      console.log("No session found");
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    console.log("Session found:", session.user.id);

    console.log("Creating Prisma client...");
    let prisma: any;
    try {
      prisma = await createSafePrismaClient();
      console.log("Prisma client created successfully");
    } catch (error) {
      console.error("Prisma client creation failed:", error);
      return NextResponse.json({ 
        error: "Database client not available" 
      }, { status: 503 });
    }

    try {
      console.log("Parsing request body...");
      const body = await request.json();
      console.log("Request body parsed, keys:", Object.keys(body));
      
      // Validate required fields
      const {
        title,
        description,
        vibeNarrative,
        category,
        tags = [],
        demoUrl,
        repoUrl,
        videoUrl,
        downloadUrl,
        aiTools = [],
        customAiTool,
        aiGeneratedPercent = 0,
        aiRefactoredPercent = 0,
        humanWrittenPercent = 100,
        learnings,
        challenges,
        teamMembers = []
      } = body;

      console.log("Validating required fields...");
      if (!title || !description || !vibeNarrative) {
        console.log("Missing required fields:", { title: !!title, description: !!description, vibeNarrative: !!vibeNarrative });
        await prisma.$disconnect();
        return NextResponse.json(
          { error: "Title, description, and vibe narrative are required" },
          { status: 400 }
        );
      }

      console.log("Checking if user exists in database...");
      // Check if user exists in database, create if not
      // @ts-ignore
      let user = await prisma.user.findUnique({
        where: { id: session.user.id }
      });
      
      if (!user) {
        console.log("Creating user in database:", session.user.id);
        // @ts-ignore
        user = await prisma.user.create({
          data: {
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.name || null,
            image: session.user.image || null,
          }
        });
        console.log("User created successfully");
      } else {
        console.log("User already exists in database");
      }

      console.log("Preparing project data...");
      // Get current month and year for submission
      const now = new Date();
      const submissionMonth = now.getMonth() + 1;
      const submissionYear = now.getFullYear();

      // Prepare AI tools array
      const allAiTools = [...aiTools];
      if (aiTools.includes("Other") && customAiTool) {
        allAiTools.push(customAiTool);
      }

      console.log("Creating project...");
      // Create project with team members
      // @ts-ignore - Dynamic Prisma client
      const project = await prisma.project.create({
        data: {
          title,
          description,
          vibeNarrative,
          category: category || null,
          tags,
          demoUrl: demoUrl || null,
          repoUrl: repoUrl || null,
          videoUrl: videoUrl || null,
          downloadUrl: downloadUrl || null,
          aiTools: allAiTools,
          aiGeneratedPercent,
          aiRefactoredPercent,
          humanWrittenPercent,
          learnings: learnings || null,
          challenges: challenges || null,
          submissionMonth,
          submissionYear,
          status: "SUBMITTED",
          submittedAt: new Date(),
          userId: session.user.id,
          teamMembers: {
            create: teamMembers.map((member: any) => ({
              name: member.name,
              role: member.role || null,
              email: member.email || null,
              github: member.github || null,
            }))
          }
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              username: true,
              email: true,
            }
          },
          teamMembers: true,
        }
      });

      console.log("Project created successfully:", project.id);

      await prisma.$disconnect();
      console.log("=== Project submission completed successfully ===");
      
      return NextResponse.json({
        success: true,
        project: {
          id: project.id,
          title: project.title,
          description: project.description,
          status: project.status,
          submittedAt: project.submittedAt,
        }
      });

    } catch (dbError) {
      console.error("Database error:", dbError);
      await prisma.$disconnect();
      throw dbError;
    }

  } catch (error: any) {
    console.error("Project submission error:", error);
    return NextResponse.json(
      { 
        error: "Failed to submit project",
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Return early if we're in build time
    if (isBuildTime()) {
      return NextResponse.json({
        projects: [],
        total: 0,
        hasMore: false,
      });
    }

    let prisma: any;
    try {
      prisma = await createSafePrismaClient();
    } catch (error) {
      return NextResponse.json({
        projects: [],
        total: 0,
        hasMore: false,
      });
    }

    try {
      const { searchParams } = new URL(request.url);
      const category = searchParams.get("category");
      const search = searchParams.get("search");
      const sortBy = searchParams.get("sortBy") || "newest";
      const limit = parseInt(searchParams.get("limit") || "20");
      const offset = parseInt(searchParams.get("offset") || "0");

      // Build where clause
      const where: any = {
        status: "SUBMITTED"
      };

      if (category && category !== "All Categories") {
        where.category = category;
      }

      if (search) {
        where.OR = [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
          { tags: { hasSome: [search] } }
        ];
      }

      // Build orderBy clause
      let orderBy: any = { createdAt: "desc" };
      
      if (sortBy === "oldest") {
        orderBy = { createdAt: "asc" };
      } else if (sortBy === "popular") {
        orderBy = { votes: { _count: "desc" } };
      }

      // @ts-ignore - Dynamic Prisma client
      const projects = await prisma.project.findMany({
        where,
        orderBy,
        take: limit,
        skip: offset,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              username: true,
            }
          },
          votes: {
            select: {
              id: true,
            }
          },
          _count: {
            select: {
              votes: true,
            }
          }
        }
      });

      // @ts-ignore - Dynamic Prisma client
      const total = await prisma.project.count({ where });

      await prisma.$disconnect();
      return NextResponse.json({
        projects: projects.map((project: any) => ({
          id: project.id,
          title: project.title,
          description: project.description,
          category: project.category,
          tags: project.tags,
          author: project.user.name || project.user.username || "Anonymous",
          submissionDate: project.submittedAt,
          demoUrl: project.demoUrl,
          repoUrl: project.repoUrl,
          aiTools: project.aiTools,
          isWinner: project.isWinner,
          isPeoplesChoice: project.isPeoplesChoice,
          votes: project._count.votes,
        })),
        total,
        hasMore: offset + limit < total,
      });

    } catch (dbError) {
      await prisma.$disconnect();
      throw dbError;
    }

  } catch (error) {
    console.error("Projects fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
} 