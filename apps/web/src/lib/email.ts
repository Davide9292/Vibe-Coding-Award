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
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; color: #000000;">
        <h2 style="color: #2563eb; background-color: transparent;">Thank you for your submission!</h2>
        <p style="color: #000000;">Hi ${userName},</p>
        <p style="color: #000000;">We've received your submission for <strong>${projectTitle}</strong> to the Vibe Coding Award.</p>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; color: #000000;">
          <h3 style="margin-top: 0; color: #000000;">What happens next?</h3>
          <ul style="margin: 10px 0; color: #000000;">
            <li>Your project is now in the review queue</li>
            <li>Our judging panel will evaluate submissions</li>
            <li>Community voting opens during the judging period</li>
            <li>Winners are announced at the end of the month</li>
          </ul>
        </div>

        <p style="color: #000000;">You can track your submission and view the current leaderboard in your <a href="${process.env.NEXTAUTH_URL}/dashboard" style="color: #2563eb; text-decoration: none;">dashboard</a>.</p>
        
        <p style="color: #000000;">Good luck!</p>
        <p style="color: #000000;">The Vibe Coding Award Team</p>
        
        <!-- Footer -->
        <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; text-align: center;">
          <p style="color: #6b7280; font-size: 12px; margin: 0 0 10px 0;">
            <a href="https://www.linkedin.com/company/vibe-coding-award/" style="color: #2563eb; text-decoration: none;">Follow us on LinkedIn</a> | 
            <a href="mailto:hello@vibecodingaward.com" style="color: #2563eb; text-decoration: none;">hello@vibecodingaward.com</a>
          </p>
          <p style="color: #6b7280; font-size: 12px; margin: 0;">
            © 2025 Vibe Coding Award
          </p>
        </div>
      </div>
    `
  }),

  winnerNotification: (projectTitle: string, userName: string, awardType: string, month: string) => ({
    subject: `🎉 Congratulations! You've won the ${awardType}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; color: #000000;">
        <h1 style="color: #2563eb; text-align: center; background-color: transparent;">🎉 Congratulations!</h1>
        <p style="color: #000000;">Hi ${userName},</p>
        <p style="color: #000000;">We're thrilled to announce that your project <strong>${projectTitle}</strong> has won the <strong>${awardType}</strong> for ${month}!</p>
        
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; padding: 30px; border-radius: 12px; margin: 20px 0; text-align: center;">
          <h2 style="margin: 0 0 10px 0; color: #ffffff;">${awardType}</h2>
          <h3 style="margin: 0; font-weight: normal; color: #ffffff;">${projectTitle}</h3>
        </div>

        <h3 style="color: #000000;">Your achievements:</h3>
        <ul style="color: #000000;">
          <li>Featured on the Vibe Coding Award homepage</li>
          <li>Permanent entry in the Winners Archive</li>
          <li>Digital winner badge and certificate</li>
          <li>Promotion across our social media channels</li>
        </ul>

        <p style="color: #000000;">Your project will be featured prominently on our <a href="${process.env.NEXTAUTH_URL}" style="color: #2563eb; text-decoration: none;">homepage</a> and in our monthly newsletter.</p>
        
        <p style="color: #000000;">Thank you for being part of the vibe coding community!</p>
        <p style="color: #000000;">The Vibe Coding Award Team</p>
        
        <!-- Footer -->
        <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; text-align: center;">
          <p style="color: #6b7280; font-size: 12px; margin: 0 0 10px 0;">
            <a href="https://www.linkedin.com/company/vibe-coding-award/" style="color: #2563eb; text-decoration: none;">Follow us on LinkedIn</a> | 
            <a href="mailto:hello@vibecodingaward.com" style="color: #2563eb; text-decoration: none;">hello@vibecodingaward.com</a>
          </p>
          <p style="color: #6b7280; font-size: 12px; margin: 0;">
            © 2025 Vibe Coding Award
          </p>
        </div>
      </div>
    `
  }),

  newsletterWelcome: (logoUrl: string) => ({
    subject: "Welcome to the Vibe Coding Award Inner Circle! 🚀",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; color: #000000;">
        <!-- Header with logo on white background -->
        <div style="background-color: #ffffff; padding: 40px 20px; text-align: center; border-bottom: 1px solid #e5e7eb;">
          <img src="${logoUrl}" alt="Vibe Coding Award" style="height: 80px; width: auto; margin-bottom: 20px;" />
          <h1 style="color: #111827; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.025em;">
            Welcome to the Inner Circle!
          </h1>
          <p style="color: #6b7280; font-size: 18px; margin: 10px 0 0 0; font-weight: 400;">
            You're now part of something special
          </p>
        </div>
        
        <!-- Main content -->
        <div style="padding: 40px 20px; background-color: #ffffff;">
          <div style="background: linear-gradient(135deg, #f3f4f6 0%, #ffffff 100%); padding: 30px; border-radius: 12px; margin-bottom: 30px; border: 1px solid #e5e7eb;">
            <p style="font-size: 18px; line-height: 1.6; margin: 0 0 20px 0; color: #374151;">
              Thank you for joining the <strong>Vibe Coding Award</strong> community! 🚀
            </p>
            <p style="line-height: 1.6; margin: 0; color: #6b7280; font-size: 16px;">
              You're now part of a movement celebrating the most creative and innovative builders who are redefining what it means to create with AI.
            </p>
          </div>
          
          <!-- What's next section -->
          <div style="margin: 30px 0;">
            <h2 style="color: #111827; font-size: 24px; font-weight: 600; margin: 0 0 20px 0;">What's Next?</h2>
            <div style="background-color: #f9fafb; padding: 25px; border-radius: 8px; border-left: 4px solid #8b5cf6;">
              <div style="margin-bottom: 15px;">
                <span style="color: #374151; font-weight: 500;">🏆 Monthly winner announcements and celebrations</span>
              </div>
              <div style="margin-bottom: 15px;">
                <span style="color: #374151; font-weight: 500;">✨ Featured project showcases and insights</span>
              </div>
              <div style="margin-bottom: 15px;">
                <span style="color: #374151; font-weight: 500;">🤝 Exclusive community updates and networking</span>
              </div>
              <div>
                <span style="color: #374151; font-weight: 500;">🚀 Early access to platform features and events</span>
              </div>
            </div>
          </div>

          <!-- CTA Button -->
          <div style="text-align: center; margin: 40px 0;">
            <a href="https://vibecodingaward.com" 
               style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
              Visit Vibe Coding Award
            </a>
          </div>
          
          <!-- Footer -->
          <div style="border-top: 1px solid #e5e7eb; padding-top: 30px; margin-top: 40px; text-align: center;">
            <p style="color: #6b7280; font-size: 12px; margin: 0 0 10px 0;">
              <a href="https://www.linkedin.com/company/vibe-coding-award/" style="color: #2563eb; text-decoration: none;">Follow us on LinkedIn</a> | 
              <a href="mailto:hello@vibecodingaward.com" style="color: #2563eb; text-decoration: none;">hello@vibecodingaward.com</a>
            </p>
            <p style="color: #6b7280; font-size: 12px; margin: 0 0 10px 0;">
              You're receiving this because you subscribed to the Vibe Coding Award newsletter.
            </p>
            <p style="color: #6b7280; font-size: 12px; margin: 0;">
              © 2025 Vibe Coding Award
            </p>
          </div>
        </div>
      </div>
    `
  }),

  monthlyNewsletter: (monthYear: string, winners: any[], featuredProjects: any[]) => ({
    subject: `Vibe Coding Award - ${monthYear} Winners & Community Update`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; color: #000000;">
        <h1 style="color: #2563eb; text-align: center; background-color: transparent;">Vibe Coding Award</h1>
        <h2 style="text-align: center; color: #4b5563;">${monthYear} Winners & Community Update</h2>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; color: #000000;">
          <h3 style="margin-top: 0; color: #000000;">🏆 This Month's Winners</h3>
          ${winners.map(winner => `
            <div style="margin: 15px 0; padding: 15px; background-color: #ffffff; border-radius: 6px; border: 1px solid #e5e7eb;">
              <h4 style="margin: 0 0 5px 0; color: #2563eb;">${winner.award}</h4>
              <p style="margin: 0; font-weight: bold; color: #000000;">${winner.projectTitle}</p>
              <p style="margin: 5px 0 0 0; color: #6b7280;">by ${winner.author}</p>
            </div>
          `).join('')}
        </div>

        ${featuredProjects.length > 0 ? `
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; color: #000000;">
            <h3 style="margin-top: 0; color: #000000;">✨ Featured Projects</h3>
            ${featuredProjects.map(project => `
              <div style="margin: 10px 0;">
                <strong style="color: #000000;">${project.title}</strong> <span style="color: #000000;">by ${project.author}</span>
                <p style="margin: 5px 0; color: #6b7280; font-size: 14px;">${project.description}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXTAUTH_URL}/submit" style="background-color: #2563eb; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Submit Your Project</a>
        </div>

        <!-- Footer -->
        <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; text-align: center;">
          <p style="color: #6b7280; font-size: 12px; margin: 0 0 10px 0;">
            <a href="https://www.linkedin.com/company/vibe-coding-award/" style="color: #2563eb; text-decoration: none;">Follow us on LinkedIn</a> | 
            <a href="mailto:hello@vibecodingaward.com" style="color: #2563eb; text-decoration: none;">hello@vibecodingaward.com</a>
          </p>
          <p style="color: #6b7280; font-size: 12px; margin: 0 0 10px 0;">
            You're receiving this because you subscribed to the Vibe Coding Award newsletter.
          </p>
          <p style="color: #6b7280; font-size: 12px; margin: 0;">
            © 2025 Vibe Coding Award | <a href="${process.env.NEXTAUTH_URL}/unsubscribe" style="color: #6b7280; text-decoration: none;">Unsubscribe</a>
          </p>
        </div>
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

export async function sendNewsletterWelcome(userEmail: string) {
  const logoUrl = "https://vibecodingaward.com/VCA%20Logo.png";
  const template = emailTemplates.newsletterWelcome(logoUrl);
  return sendEmail({
    to: userEmail,
    from: "Vibe Coding Award <hello@vibecodingaward.com>",
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