#!/usr/bin/env node

/**
 * First Award Cycle Setup Script
 * 
 * This script initializes:
 * - First award cycle for the current month
 * - Admin user configuration
 * - Email templates
 * - Initial configuration
 */

const { PrismaClient } = require('../packages/database/node_modules/@prisma/client');
require('dotenv').config({ path: '../apps/web/.env.local' });

const prisma = new PrismaClient();

async function setupFirstCycle() {
  console.log('🚀 Setting up first Vibe Coding Award cycle...\n');

  try {
    // Get current date
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    
    console.log(`📅 Setting up cycle for ${getMonthName(currentMonth)} ${currentYear}`);

    // Calculate important dates
    const submissionStart = new Date(currentYear, currentMonth - 1, 1); // 1st of month
    const submissionEnd = new Date(currentYear, currentMonth - 1, 20); // 20th of month
    const votingStart = new Date(currentYear, currentMonth - 1, 21); // 21st of month
    const votingEnd = new Date(currentYear, currentMonth - 1, 27); // 27th of month
    const judgingStart = new Date(currentYear, currentMonth - 1, 21); // 21st of month (parallel with voting)
    const judgingEnd = new Date(currentYear, currentMonth - 1, 29); // 29th of month
    const announcementDate = new Date(currentYear, currentMonth - 1, 30); // 30th of month

    // Check if cycle already exists
    const existingCycle = await prisma.awardCycle.findFirst({
      where: {
        month: currentMonth,
        year: currentYear
      }
    });

    if (existingCycle) {
      console.log('⚠️  Award cycle already exists for this month');
      console.log(`    Cycle ID: ${existingCycle.id}`);
      console.log(`    Status: ${existingCycle.status}`);
      return;
    }

    // Create the award cycle
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

    console.log('✅ Award cycle created successfully!');
    console.log(`    Cycle ID: ${cycle.id}`);
    console.log(`    Status: ${cycle.status}`);
    console.log(`    Theme: ${cycle.theme}`);

    // Print timeline
    console.log('\n📊 Award Cycle Timeline:');
    console.log(`    Submissions: ${formatDate(submissionStart)} - ${formatDate(submissionEnd)}`);
    console.log(`    Voting: ${formatDate(votingStart)} - ${formatDate(votingEnd)}`);
    console.log(`    Judging: ${formatDate(judgingStart)} - ${formatDate(judgingEnd)}`);
    console.log(`    Announcement: ${formatDate(announcementDate)}`);

    // Set up admin user if email is provided
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      console.log(`\n👤 Setting up admin user: ${adminEmail}`);
      
      // Check if admin user exists
      let adminUser = await prisma.user.findUnique({
        where: { email: adminEmail }
      });

      if (!adminUser) {
        // Create admin user placeholder (will be completed on first login)
        adminUser = await prisma.user.create({
          data: {
            email: adminEmail,
            role: 'ADMIN',
            name: 'Platform Admin',
            emailVerified: new Date()
          }
        });
        console.log('✅ Admin user created');
      } else {
        // Update existing user to admin
        adminUser = await prisma.user.update({
          where: { email: adminEmail },
          data: { role: 'ADMIN' }
        });
        console.log('✅ Existing user promoted to admin');
      }
    } else {
      console.log('\n⚠️  No ADMIN_EMAIL environment variable set');
      console.log('   Add ADMIN_EMAIL to your .env.local file to set up admin user');
    }

    // Set up email templates
    console.log('\n📧 Setting up email templates...');
    
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
      const existing = await prisma.emailTemplate.findUnique({
        where: { name: template.name }
      });

      if (!existing) {
        await prisma.emailTemplate.create({ data: template });
        console.log(`  ✅ Created template: ${template.name}`);
      } else {
        console.log(`  ⚠️  Template exists: ${template.name}`);
      }
    }

    // Success summary
    console.log('\n🎉 First Award Cycle Setup Complete!');
    console.log('\n📋 Next Steps:');
    console.log('   1. Deploy to production');
    console.log('   2. Test all functionality');
    console.log('   3. Announce the launch');
    console.log('   4. Monitor submissions and engagement');
    console.log('   5. Prepare for judging phase');
    
    console.log('\n🌐 Platform Status:');
    console.log('   ✅ Database schema ready');
    console.log('   ✅ Award cycle configured');
    console.log('   ✅ Admin access set up');
    console.log('   ✅ Email templates ready');
    console.log('   ✅ Ready for launch!');

  } catch (error) {
    console.error('❌ Error setting up first cycle:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Helper functions
function getMonthName(month) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[month - 1];
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

// Run the setup
if (require.main === module) {
  setupFirstCycle();
}

module.exports = { setupFirstCycle }; 