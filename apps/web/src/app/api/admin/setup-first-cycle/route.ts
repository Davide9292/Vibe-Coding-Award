import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createSafePrismaClient, isBuildTime } from "@/lib/prisma-safe";

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    // Return early if we're in build time
    if (isBuildTime()) {
      return NextResponse.json({ 
        error: "Database not available during build" 
      }, { status: 503 });
    }

    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Admin check - use ADMIN_EMAIL environment variable
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail || session.user.email !== adminEmail) {
      return NextResponse.json({ error: "Forbidden - Admin access required" }, { status: 403 });
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
      const results = {
        cycle: null as any,
        admin: null as any,
        templates: [] as any[],
        alreadyExists: false
      };

      // Get current date
      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear();

      // Check if cycle already exists
      // @ts-ignore - Dynamic Prisma client
      const existingCycle = await prisma.awardCycle.findFirst({
        where: {
          month: currentMonth,
          year: currentYear
        }
      });

      if (existingCycle) {
        results.alreadyExists = true;
        results.cycle = existingCycle;
        await prisma.$disconnect();
        return NextResponse.json({
          success: true,
          message: "Award cycle already exists for this month",
          results
        });
      }

      // Calculate important dates
      const submissionStart = new Date(currentYear, currentMonth - 1, 1);
      const submissionEnd = new Date(currentYear, currentMonth - 1, 20);
      const votingStart = new Date(currentYear, currentMonth - 1, 21);
      const votingEnd = new Date(currentYear, currentMonth - 1, 27);
      const judgingStart = new Date(currentYear, currentMonth - 1, 21);
      const judgingEnd = new Date(currentYear, currentMonth - 1, 29);
      const announcementDate = new Date(currentYear, currentMonth - 1, 30);

      // Create the award cycle
      // @ts-ignore - Dynamic Prisma client
      const cycle = await prisma.awardCycle.create({
        data: {
          month: currentMonth,
          year: currentYear,
          submissionStart,
          submissionEnd,
          votingStart,
          votingEnd,
          judgingStart,
          judgingEnd,
          announcementDate,
          status: 'SUBMISSION_OPEN',
          theme: 'Inaugural Launch',
          description: 'Welcome to the first Vibe Coding Award! Submit your AI-assisted projects and celebrate the future of collaborative development.'
        }
      });

      results.cycle = cycle;

      // Set up admin user
      // @ts-ignore - Dynamic Prisma client
      let adminUser = await prisma.user.findUnique({
        where: { email: adminEmail }
      });

      if (!adminUser) {
        // @ts-ignore - Dynamic Prisma client
        adminUser = await prisma.user.create({
          data: {
            email: adminEmail,
            role: 'ADMIN',
            name: 'Platform Admin',
            emailVerified: new Date()
          }
        });
      } else {
        // Update existing user to admin
        // @ts-ignore - Dynamic Prisma client
        adminUser = await prisma.user.update({
          where: { email: adminEmail },
          data: { role: 'ADMIN' }
        });
      }

      results.admin = adminUser;

      // Set up email templates
      const templates = [
        {
          name: 'submission_confirmation',
          subject: '🎉 Project Submitted to Vibe Coding Award!',
          content: 'Your project "{{projectTitle}}" has been successfully submitted to the {{month}} Vibe Coding Award. We\'ll notify you when voting begins!',
          type: 'SUBMISSION_CONFIRMATION'
        },
        {
          name: 'winner_notification', 
          subject: '🏆 Congratulations! You\'ve won the {{awardType}}',
          content: 'Amazing news! Your project "{{projectTitle}}" has won the {{awardType}} for {{month}}. You\'re now featured on our homepage!',
          type: 'WINNER_NOTIFICATION'
        },
        {
          name: 'voting_reminder',
          subject: '🗳️ Don\'t forget to vote - {{month}} Vibe Coding Award',
          content: 'Voting is now open for the {{month}} Vibe Coding Award! Check out the amazing AI-assisted projects and cast your vote.',
          type: 'REMINDER'
        }
      ];

      for (const template of templates) {
        // @ts-ignore - Dynamic Prisma client
        const existing = await prisma.emailTemplate.findUnique({
          where: { name: template.name }
        });

        if (!existing) {
          // @ts-ignore - Dynamic Prisma client
          const created = await prisma.emailTemplate.create({ data: template });
          results.templates.push(created);
        }
      }

      await prisma.$disconnect();
      
      return NextResponse.json({
        success: true,
        message: "First award cycle setup completed successfully!",
        results,
        timeline: {
          submissionStart,
          submissionEnd,
          votingStart,
          votingEnd,
          judgingStart,
          judgingEnd,
          announcementDate
        }
      });

    } catch (dbError) {
      await prisma.$disconnect();
      throw dbError;
    }

  } catch (error) {
    console.error("Setup first cycle error:", error);
    return NextResponse.json(
      { error: "Failed to setup first cycle", details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Get current cycle info
  try {
    if (isBuildTime()) {
      return NextResponse.json({ 
        error: "Database not available during build" 
      }, { status: 503 });
    }

    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Admin check
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail || session.user.email !== adminEmail) {
      return NextResponse.json({ error: "Forbidden - Admin access required" }, { status: 403 });
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
      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear();

      // @ts-ignore - Dynamic Prisma client
      const cycle = await prisma.awardCycle.findFirst({
        where: {
          month: currentMonth,
          year: currentYear
        }
      });

      // @ts-ignore - Dynamic Prisma client
      const templatesCount = await prisma.emailTemplate.count();

      await prisma.$disconnect();

      return NextResponse.json({
        currentMonth,
        currentYear,
        cycleExists: !!cycle,
        cycle,
        templatesCount,
        isSetup: !!cycle && templatesCount > 0
      });

    } catch (dbError) {
      await prisma.$disconnect();
      throw dbError;
    }

  } catch (error) {
    console.error("Check setup status error:", error);
    return NextResponse.json(
      { error: "Failed to check setup status" },
      { status: 500 }
    );
  }
} 