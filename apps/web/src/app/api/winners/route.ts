import { NextRequest, NextResponse } from "next/server";
import { createSafePrismaClient, isBuildTime } from "@/lib/prisma-safe";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Return early if we're in build time
    if (isBuildTime()) {
      return NextResponse.json({
        winners: []
      });
    }

    let prisma: any;
    try {
      prisma = await createSafePrismaClient();
    } catch (error) {
      return NextResponse.json({
        winners: []
      });
    }

    try {
      // Get all unique months/years where we have winners
      // @ts-ignore
      const winnerMonths = await prisma.project.findMany({
        where: {
          OR: [
            { isWinner: true },
            { isPeoplesChoice: true },
            { isStandout: true }
          ]
        },
        select: {
          submissionMonth: true,
          submissionYear: true,
        },
        distinct: ['submissionMonth', 'submissionYear'],
        orderBy: [
          { submissionYear: 'desc' },
          { submissionMonth: 'desc' }
        ]
      });

      const winners = [];

      for (const monthYear of winnerMonths) {
        const { submissionMonth, submissionYear } = monthYear;
        
        // Get monthly winner
        // @ts-ignore
        const monthlyWinner = await prisma.project.findFirst({
          where: {
            isWinner: true,
            submissionMonth,
            submissionYear
          },
          include: {
            user: {
              select: {
                name: true,
                username: true,
              }
            },
            judgeScores: {
              select: {
                totalScore: true,
              }
            },
            _count: {
              select: {
                votes: true,
              }
            }
          }
        });

        // Get people's choice winner
        // @ts-ignore
        const peoplesChoice = await prisma.project.findFirst({
          where: {
            isPeoplesChoice: true,
            submissionMonth,
            submissionYear
          },
          include: {
            user: {
              select: {
                name: true,
                username: true,
              }
            },
            _count: {
              select: {
                votes: true,
              }
            }
          }
        });

        // Get standout projects
        // @ts-ignore
        const standouts = await prisma.project.findMany({
          where: {
            isStandout: true,
            submissionMonth,
            submissionYear
          },
          include: {
            user: {
              select: {
                name: true,
                username: true,
              }
            },
            _count: {
              select: {
                votes: true,
              }
            }
          }
        });

        const monthNames = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];

        winners.push({
          id: `${submissionYear}-${submissionMonth}`,
          month: monthNames[submissionMonth - 1],
          year: submissionYear,
          winner: monthlyWinner ? {
            id: monthlyWinner.id,
            title: monthlyWinner.title,
            description: monthlyWinner.description,
            author: monthlyWinner.user.name || monthlyWinner.user.username || 'Anonymous',
            demoUrl: monthlyWinner.demoUrl,
            repoUrl: monthlyWinner.repoUrl,
            aiTools: monthlyWinner.aiTools,
            score: monthlyWinner.judgeScores[0]?.totalScore || null,
            votes: monthlyWinner._count.votes,
            tags: monthlyWinner.tags,
          } : null,
          peoplesChoice: peoplesChoice ? {
            id: peoplesChoice.id,
            title: peoplesChoice.title,
            description: peoplesChoice.description,
            author: peoplesChoice.user.name || peoplesChoice.user.username || 'Anonymous',
            demoUrl: peoplesChoice.demoUrl,
            repoUrl: peoplesChoice.repoUrl,
            aiTools: peoplesChoice.aiTools,
            votes: peoplesChoice._count.votes,
            tags: peoplesChoice.tags,
          } : null,
          standouts: standouts.map((project: any) => ({
            id: project.id,
            title: project.title,
            description: project.description,
            author: project.user.name || project.user.username || 'Anonymous',
            demoUrl: project.demoUrl,
            repoUrl: project.repoUrl,
            aiTools: project.aiTools,
            votes: project._count.votes,
            tags: project.tags,
          }))
        });
      }

      await prisma.$disconnect();
      return NextResponse.json({
        winners
      });

    } catch (dbError) {
      await prisma.$disconnect();
      throw dbError;
    }

  } catch (error: any) {
    console.error("Winners fetch error:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch winners",
        winners: []
      },
      { status: 500 }
    );
  }
} 