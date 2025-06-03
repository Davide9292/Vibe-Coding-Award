import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createSafePrismaClient, isBuildTime } from "@/lib/prisma-safe";

export async function GET() {
  try {
    // Return early if we're in build time
    if (isBuildTime()) {
      return NextResponse.json({ 
        error: "Database not available during build" 
      }, { status: 503 });
    }

    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Admin check
    const adminEmails = ["admin@vibecodingaward.com", session.user.email];
    if (!adminEmails.some(email => email === session.user.email)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
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
      // Get current month/year
      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear();

      // Get submissions for current month
      // @ts-ignore - Dynamic Prisma client
      const submissions = await prisma.project.findMany({
        where: {
          submissionMonth: currentMonth,
          submissionYear: currentYear
        },
        include: {
          user: {
            select: {
              name: true,
              username: true,
              email: true
            }
          },
          _count: {
            select: {
              votes: true
            }
          }
        },
        orderBy: {
          submittedAt: "desc"
        }
      });

      const formattedSubmissions = submissions.map((submission: any) => ({
        id: submission.id,
        title: submission.title,
        description: submission.description,
        status: submission.status,
        author: submission.user.name || submission.user.username || "Anonymous",
        submittedAt: submission.submittedAt.toISOString(),
        voteCount: submission._count.votes
      }));

      await prisma.$disconnect();
      return NextResponse.json({ submissions: formattedSubmissions });

    } catch (dbError) {
      await prisma.$disconnect();
      throw dbError;
    }

  } catch (error) {
    console.error("Submissions fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch submissions" },
      { status: 500 }
    );
  }
} 