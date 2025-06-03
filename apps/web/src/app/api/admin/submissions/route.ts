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

    // Admin check
    const adminEmails = ["admin@vibecodingaward.com", session.user.email];
    if (!adminEmails.some(email => email === session.user.email)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get current month/year
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    // Get submissions for current month
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

    return NextResponse.json({ submissions: formattedSubmissions });

  } catch (error) {
    console.error("Submissions fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch submissions" },
      { status: 500 }
    );
  }
} 