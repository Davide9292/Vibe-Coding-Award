import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      category,
      tags,
      demoUrl,
      repoUrl,
      videoUrl,
      downloadUrl,
      vibeNarrative,
      aiTools,
      customAiTool,
      aiGeneratedPercent,
      aiRefactoredPercent,
      humanWrittenPercent,
      learnings,
      challenges,
      teamMembers,
      email // We'll require email in the form for now
    } = body;

    // Validate required fields
    if (!title || !description || !vibeNarrative || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: title, description, vibeNarrative, and email are required' },
        { status: 400 }
      );
    }

    // Find or create user by email
    let user = await prisma.user.findUnique({
      where: { email: email }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: email,
          name: teamMembers?.[0]?.name || 'Anonymous',
        }
      });
    }

    // Get current date for submission
    const now = new Date();
    const submissionMonth = now.getMonth() + 1;
    const submissionYear = now.getFullYear();

    // Create the project
    const project = await prisma.project.create({
      data: {
        title,
        description,
        category: category || null,
        tags: tags || [],
        demoUrl: demoUrl || null,
        repoUrl: repoUrl || null,
        videoUrl: videoUrl || null,
        downloadUrl: downloadUrl || null,
        vibeNarrative,
        aiTools: aiTools || [],
        aiGeneratedPercent: aiGeneratedPercent || 0,
        aiRefactoredPercent: aiRefactoredPercent || 0,
        humanWrittenPercent: humanWrittenPercent || 100,
        learnings: learnings || null,
        challenges: challenges || null,
        submissionMonth,
        submissionYear,
        status: 'SUBMITTED',
        submittedAt: now,
        userId: user.id,
        teamMembers: {
          create: (teamMembers || []).map((member: any) => ({
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
            email: true,
          }
        },
        teamMembers: true,
      }
    });

    console.log(`Project "${title}" submitted by ${email}`);

    return NextResponse.json({
      success: true,
      project: {
        id: project.id,
        title: project.title,
        status: project.status,
        submittedAt: project.submittedAt,
      }
    });

  } catch (error) {
    console.error('Project submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit project. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    const projects = await prisma.project.findMany({
      where: {
        status: 'SUBMITTED'
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          }
        },
        _count: {
          select: {
            votes: true,
          }
        }
      },
      orderBy: {
        submittedAt: 'desc'
      },
      take: limit,
      skip: offset,
    });

    return NextResponse.json({
      projects,
      total: await prisma.project.count({
        where: { status: 'SUBMITTED' }
      })
    });

  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
} 