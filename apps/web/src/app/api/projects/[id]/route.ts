import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@repo/database";

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id;

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
            website: true,
            github: true,
          },
        },
        teamMembers: {
          select: {
            id: true,
            name: true,
            role: true,
            email: true,
            github: true,
          },
        },
        media: {
          select: {
            id: true,
            type: true,
            url: true,
            caption: true,
            order: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
        votes: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        judgeScores: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
              },
            },
          },
          where: {
            isComplete: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        comments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
              },
            },
          },
          where: {
            approved: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // Check if project is publicly viewable
    const isOwner = request.headers.get('user-id') === project.userId;
    const isPublic = project.status !== 'DRAFT' || isOwner;

    if (!isPublic) {
      return NextResponse.json(
        { error: "Project not available" },
        { status: 403 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 