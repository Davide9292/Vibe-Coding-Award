interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({ to, subject, html, from }: EmailOptions) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn("No RESEND_API_KEY found, email not sent");
      return { success: false, error: "Email service not configured" };
    }

    // Dynamically import and create Resend instance only when needed
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    const result = await resend.emails.send({
      from: from || process.env.FROM_EMAIL || "noreply@vibecodingaward.com",
      to,
      subject,
      html,
    });

    return { success: true, data: result };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

// Email Templates
export const emailTemplates = {
  submissionConfirmation: (projectTitle: string, userName: string) => ({
    subject: `Submission Confirmed: ${projectTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Thank you for your submission!</h2>
        <p>Hi ${userName},</p>
        <p>We've received your submission for <strong>${projectTitle}</strong> to the Vibe Coding Award.</p>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">What happens next?</h3>
          <ul style="margin: 10px 0;">
            <li>Your project is now in the review queue</li>
            <li>Our judging panel will evaluate submissions</li>
            <li>Community voting opens during the judging period</li>
            <li>Winners are announced at the end of the month</li>
          </ul>
        </div>

        <p>You can track your submission and view the current leaderboard in your <a href="${process.env.NEXTAUTH_URL}/dashboard" style="color: #2563eb;">dashboard</a>.</p>
        
        <p>Good luck!</p>
        <p>The Vibe Coding Award Team</p>
      </div>
    `
  }),

  winnerNotification: (projectTitle: string, userName: string, awardType: string, month: string) => ({
    subject: `🎉 Congratulations! You've won the ${awardType}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb; text-align: center;">🎉 Congratulations!</h1>
        <p>Hi ${userName},</p>
        <p>We're thrilled to announce that your project <strong>${projectTitle}</strong> has won the <strong>${awardType}</strong> for ${month}!</p>
        
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 12px; margin: 20px 0; text-align: center;">
          <h2 style="margin: 0 0 10px 0;">${awardType}</h2>
          <h3 style="margin: 0; font-weight: normal;">${projectTitle}</h3>
        </div>

        <h3>Your achievements:</h3>
        <ul>
          <li>Featured on the Vibe Coding Award homepage</li>
          <li>Permanent entry in the Winners Archive</li>
          <li>Digital winner badge and certificate</li>
          <li>Promotion across our social media channels</li>
        </ul>

        <p>Your project will be featured prominently on our <a href="${process.env.NEXTAUTH_URL}" style="color: #2563eb;">homepage</a> and in our monthly newsletter.</p>
        
        <p>Thank you for being part of the vibe coding community!</p>
        <p>The Vibe Coding Award Team</p>
      </div>
    `
  }),

  monthlyNewsletter: (monthYear: string, winners: any[], featuredProjects: any[]) => ({
    subject: `Vibe Coding Award - ${monthYear} Winners & Community Update`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb; text-align: center;">Vibe Coding Award</h1>
        <h2 style="text-align: center; color: #4b5563;">${monthYear} Winners & Community Update</h2>
        
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">🏆 This Month's Winners</h3>
          ${winners.map(winner => `
            <div style="margin: 15px 0; padding: 15px; background: white; border-radius: 6px;">
              <h4 style="margin: 0 0 5px 0; color: #2563eb;">${winner.award}</h4>
              <p style="margin: 0; font-weight: bold;">${winner.projectTitle}</p>
              <p style="margin: 5px 0 0 0; color: #6b7280;">by ${winner.author}</p>
            </div>
          `).join('')}
        </div>

        ${featuredProjects.length > 0 ? `
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">✨ Featured Projects</h3>
            ${featuredProjects.map(project => `
              <div style="margin: 10px 0;">
                <strong>${project.title}</strong> by ${project.author}
                <p style="margin: 5px 0; color: #6b7280; font-size: 14px;">${project.description}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXTAUTH_URL}/submit" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Submit Your Project</a>
        </div>

        <p style="text-align: center; color: #6b7280; font-size: 12px;">
          You're receiving this because you subscribed to the Vibe Coding Award newsletter.
          <br>
          <a href="${process.env.NEXTAUTH_URL}/unsubscribe" style="color: #6b7280;">Unsubscribe</a>
        </p>
      </div>
    `
  })
};

// Helper functions for common email scenarios
export async function sendSubmissionConfirmation(userEmail: string, userName: string, projectTitle: string) {
  const template = emailTemplates.submissionConfirmation(projectTitle, userName);
  return sendEmail({
    to: userEmail,
    ...template
  });
}

export async function sendWinnerNotification(userEmail: string, userName: string, projectTitle: string, awardType: string, month: string) {
  const template = emailTemplates.winnerNotification(projectTitle, userName, awardType, month);
  return sendEmail({
    to: userEmail,
    ...template
  });
}

export async function sendMonthlyNewsletter(subscriberEmail: string, monthYear: string, winners: any[], featuredProjects: any[] = []) {
  const template = emailTemplates.monthlyNewsletter(monthYear, winners, featuredProjects);
  return sendEmail({
    to: subscriberEmail,
    ...template
  });
} 