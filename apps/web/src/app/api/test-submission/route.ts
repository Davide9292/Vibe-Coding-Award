import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createSafePrismaClient, isBuildTime } from "@/lib/prisma-safe";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    console.log("=== DEBUG: Starting submission test ===");
    
    // Check build time
    if (isBuildTime()) {
      console.log("DEBUG: Build time detected");
      return NextResponse.json({ 
        error: "Database not available during build",
        step: "build_check"
      }, { status: 503 });
    }

    // Check session
    console.log("DEBUG: Checking session...");
    const session = await auth();
    
    if (!session?.user?.id) {
      console.log("DEBUG: No session found");
      return NextResponse.json(
        { error: "Authentication required", step: "auth_check" },
        { status: 401 }
      );
    }
    
    console.log("DEBUG: Session found:", { userId: session.user.id, email: session.user.email });

    // Check prisma client
    console.log("DEBUG: Creating Prisma client...");
    let prisma: any;
    try {
      prisma = await createSafePrismaClient();
      console.log("DEBUG: Prisma client created successfully");
    } catch (error: any) {
      console.log("DEBUG: Prisma client creation failed:", error);
      return NextResponse.json({ 
        error: "Database client not available",
        step: "prisma_client",
        details: error?.message || String(error)
      }, { status: 503 });
    }

    // Test basic database connectivity
    console.log("DEBUG: Testing database connectivity...");
    try {
      // @ts-ignore
      const userCount = await prisma.user.count();
      console.log("DEBUG: Database connection successful, user count:", userCount);
    } catch (dbError: any) {
      console.log("DEBUG: Database connection failed:", dbError);
      await prisma.$disconnect();
      return NextResponse.json({
        error: "Database connection failed",
        step: "db_connection",
        details: dbError?.message || String(dbError)
      }, { status: 500 });
    }

    // Check if user exists in database
    console.log("DEBUG: Checking if user exists in database...");
    try {
      // @ts-ignore
      let user = await prisma.user.findUnique({
        where: { id: session.user.id }
      });
      
      if (!user) {
        console.log("DEBUG: User not found in database, creating user...");
        // @ts-ignore
        user = await prisma.user.create({
          data: {
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.name || null,
            image: session.user.image || null,
          }
        });
        console.log("DEBUG: User created successfully:", user.id);
      } else {
        console.log("DEBUG: User found in database:", user.id);
      }
    } catch (userError: any) {
      console.log("DEBUG: User check/creation failed:", userError);
      await prisma.$disconnect();
      return NextResponse.json({
        error: "User validation failed",
        step: "user_validation",
        details: userError?.message || String(userError)
      }, { status: 500 });
    }

    // Test parsing request body
    console.log("DEBUG: Parsing request body...");
    let body;
    try {
      body = await request.json();
      console.log("DEBUG: Request body parsed:", Object.keys(body));
    } catch (parseError: any) {
      console.log("DEBUG: Request body parsing failed:", parseError);
      await prisma.$disconnect();
      return NextResponse.json({
        error: "Invalid request body",
        step: "body_parsing",
        details: parseError?.message || String(parseError)
      }, { status: 400 });
    }

    // Validate required fields
    const { title, description, vibeNarrative } = body;
    
    if (!title || !description || !vibeNarrative) {
      console.log("DEBUG: Missing required fields:", { title: !!title, description: !!description, vibeNarrative: !!vibeNarrative });
      await prisma.$disconnect();
      return NextResponse.json({
        error: "Missing required fields",
        step: "validation",
        details: { title: !!title, description: !!description, vibeNarrative: !!vibeNarrative }
      }, { status: 400 });
    }

    // Test project creation
    console.log("DEBUG: Attempting to create project...");
    try {
      const now = new Date();
      const submissionMonth = now.getMonth() + 1;
      const submissionYear = now.getFullYear();

      // @ts-ignore
      const project = await prisma.project.create({
        data: {
          title,
          description,
          vibeNarrative,
          category: body.category || null,
          tags: body.tags || [],
          demoUrl: body.demoUrl || null,
          repoUrl: body.repoUrl || null,
          videoUrl: body.videoUrl || null,
          downloadUrl: body.downloadUrl || null,
          aiTools: body.aiTools || [],
          aiGeneratedPercent: body.aiGeneratedPercent || 0,
          aiRefactoredPercent: body.aiRefactoredPercent || 0,
          humanWrittenPercent: body.humanWrittenPercent || 100,
          learnings: body.learnings || null,
          challenges: body.challenges || null,
          submissionMonth,
          submissionYear,
          status: "SUBMITTED",
          submittedAt: new Date(),
          userId: session.user.id,
          teamMembers: {
            create: (body.teamMembers || []).map((member: any) => ({
              name: member.name,
              role: member.role || null,
              email: member.email || null,
              github: member.github || null,
            }))
          }
        }
      });

      console.log("DEBUG: Project created successfully:", project.id);
      await prisma.$disconnect();
      
      return NextResponse.json({
        success: true,
        step: "completed",
        projectId: project.id
      });

    } catch (createError: any) {
      console.log("DEBUG: Project creation failed:", createError);
      await prisma.$disconnect();
      return NextResponse.json({
        error: "Project creation failed",
        step: "project_creation",
        details: createError?.message || String(createError)
      }, { status: 500 });
    }

  } catch (error: any) {
    console.log("DEBUG: Unexpected error:", error);
    return NextResponse.json({
      error: "Unexpected error",
      step: "unexpected",
      details: error?.message || String(error)
    }, { status: 500 });
  }
} 