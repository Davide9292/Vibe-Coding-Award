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
      from: from || process.env.FROM_EMAIL || "Vibe Coding Award <hello@vibecodingaward.com>",
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

// Newsletter welcome template - Modern design matching production site
export const newsletterWelcomeTemplate = (logoUrl: string) => ({
  subject: "Welcome to the Vibe Coding Award Inner Circle! 🚀",
  html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
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
              <div style="display: inline-block; width: 20px; height: 20px; background-color: #8b5cf6; border-radius: 50%; text-align: center; margin-right: 10px;">
                <span style="color: white; font-size: 12px; line-height: 20px;">🏆</span>
              </div>
              <span style="color: #374151; font-weight: 500;">Monthly winner announcements and celebrations</span>
            </div>
            <div style="margin-bottom: 15px;">
              <div style="display: inline-block; width: 20px; height: 20px; background-color: #8b5cf6; border-radius: 50%; text-align: center; margin-right: 10px;">
                <span style="color: white; font-size: 12px; line-height: 20px;">✨</span>
              </div>
              <span style="color: #374151; font-weight: 500;">Featured project showcases and insights</span>
            </div>
            <div style="margin-bottom: 15px;">
              <div style="display: inline-block; width: 20px; height: 20px; background-color: #8b5cf6; border-radius: 50%; text-align: center; margin-right: 10px;">
                <span style="color: white; font-size: 12px; line-height: 20px;">🤝</span>
              </div>
              <span style="color: #374151; font-weight: 500;">Exclusive community updates and networking</span>
            </div>
            <div>
              <div style="display: inline-block; width: 20px; height: 20px; background-color: #8b5cf6; border-radius: 50%; text-align: center; margin-right: 10px;">
                <span style="color: white; font-size: 12px; line-height: 20px;">🚀</span>
              </div>
              <span style="color: #374151; font-weight: 500;">Early access to platform features and events</span>
            </div>
          </div>
        </div>
        
        <!-- CTA Button -->
        <div style="text-align: center; margin: 40px 0;">
          <a href="https://vibecodingaward.com" 
             style="display: inline-block; background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            Visit Vibe Coding Award
          </a>
        </div>
        
        <!-- Footer -->
        <div style="border-top: 1px solid #e5e7eb; padding-top: 30px; margin-top: 40px; text-align: center;">
          <p style="color: #9ca3af; font-size: 14px; margin: 0 0 10px 0;">
            You're receiving this because you subscribed to the Vibe Coding Award newsletter.
          </p>
          <p style="color: #9ca3af; font-size: 14px; margin: 0;">
            © 2025 Vibe Coding Award • <a href="mailto:hello@vibecodingaward.com" style="color: #8b5cf6; text-decoration: none;">hello@vibecodingaward.com</a>
          </p>
        </div>
      </div>
    </div>
  `
});

// Helper function for newsletter welcome email
export async function sendNewsletterWelcome(userEmail: string) {
  const logoUrl = "https://vibecodingaward.com/VCA%20Logo.png";
  const template = newsletterWelcomeTemplate(logoUrl);
  return sendEmail({
    to: userEmail,
    from: "Vibe Coding Award <hello@vibecodingaward.com>",
    ...template
  });
}

// Project submission confirmation template
export const submissionConfirmationTemplate = (projectTitle: string, userName: string, logoUrl: string) => ({
  subject: `🎉 Project "${projectTitle}" submitted successfully!`,
  html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
      <!-- Header -->
      <div style="background-color: #ffffff; padding: 40px 20px; text-align: center; border-bottom: 1px solid #e5e7eb;">
        <img src="${logoUrl}" alt="Vibe Coding Award" style="height: 80px; width: auto; margin-bottom: 20px;" />
        <h1 style="color: #111827; margin: 0; font-size: 28px; font-weight: 700;">
          Submission Confirmed! 🎉
        </h1>
      </div>
      
      <!-- Main content -->
      <div style="padding: 40px 20px; background-color: #ffffff;">
        <p style="font-size: 18px; line-height: 1.6; margin: 0 0 20px 0; color: #374151;">
          Hi ${userName},
        </p>
        
        <div style="background: linear-gradient(135deg, #f3f4f6 0%, #ffffff 100%); padding: 30px; border-radius: 12px; margin-bottom: 30px; border: 1px solid #e5e7eb;">
          <p style="font-size: 16px; line-height: 1.6; margin: 0 0 15px 0; color: #374151;">
            Your project <strong>"${projectTitle}"</strong> has been successfully submitted to the Vibe Coding Award! 
          </p>
          <p style="font-size: 16px; line-height: 1.6; margin: 0; color: #6b7280;">
            We're excited to review your innovative work and see how you've leveraged AI in your development process.
          </p>
        </div>
        
        <!-- Next steps -->
        <div style="background-color: #f9fafb; padding: 25px; border-radius: 8px; border-left: 4px solid #8b5cf6; margin: 30px 0;">
          <h2 style="color: #111827; font-size: 20px; font-weight: 600; margin: 0 0 15px 0;">What happens next?</h2>
          <div style="margin-bottom: 12px;">
            <span style="color: #8b5cf6; font-weight: 600;">1.</span>
            <span style="color: #374151; margin-left: 8px;">Initial review and eligibility check</span>
          </div>
          <div style="margin-bottom: 12px;">
            <span style="color: #8b5cf6; font-weight: 600;">2.</span>
            <span style="color: #374151; margin-left: 8px;">Community voting phase begins</span>
          </div>
          <div style="margin-bottom: 12px;">
            <span style="color: #8b5cf6; font-weight: 600;">3.</span>
            <span style="color: #374151; margin-left: 8px;">Expert judging and evaluation</span>
          </div>
          <div>
            <span style="color: #8b5cf6; font-weight: 600;">4.</span>
            <span style="color: #374151; margin-left: 8px;">Winner announcement at month end</span>
          </div>
        </div>
        
        <div style="text-align: center; margin: 40px 0;">
          <a href="https://vibecodingaward.com/dashboard" 
             style="display: inline-block; background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            View Your Dashboard
          </a>
        </div>
        
        <!-- Footer -->
        <div style="border-top: 1px solid #e5e7eb; padding-top: 30px; margin-top: 40px; text-align: center;">
          <p style="color: #9ca3af; font-size: 14px; margin: 0;">
            Good luck! • <a href="mailto:hello@vibecodingaward.com" style="color: #8b5cf6; text-decoration: none;">hello@vibecodingaward.com</a>
          </p>
        </div>
      </div>
    </div>
  `
});

// Winner notification template
export const winnerNotificationTemplate = (projectTitle: string, userName: string, awardType: string, logoUrl: string) => ({
  subject: `🏆 Congratulations! You've won the ${awardType}!`,
  html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); padding: 40px 20px; text-align: center;">
        <img src="${logoUrl}" alt="Vibe Coding Award" style="height: 80px; width: auto; margin-bottom: 20px; filter: brightness(0) invert(1);" />
        <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700;">
          🏆 Congratulations!
        </h1>
        <p style="color: rgba(255,255,255,0.9); font-size: 18px; margin: 10px 0 0 0;">
          You're a Vibe Coding Award winner!
        </p>
      </div>
      
      <!-- Main content -->
      <div style="padding: 40px 20px; background-color: #ffffff;">
        <p style="font-size: 18px; line-height: 1.6; margin: 0 0 30px 0; color: #374151;">
          Hi ${userName},
        </p>
        
        <div style="background: linear-gradient(135deg, #fef3c7 0%, #fbbf24 20%, #f59e0b 100%); padding: 30px; border-radius: 12px; margin-bottom: 30px; text-align: center;">
          <h2 style="color: #92400e; margin: 0 0 10px 0; font-size: 24px; font-weight: 700;">
            ${awardType}
          </h2>
          <p style="color: #b45309; margin: 0; font-size: 20px; font-weight: 600;">
            "${projectTitle}"
          </p>
        </div>
        
        <p style="font-size: 16px; line-height: 1.6; margin: 0 0 30px 0; color: #374151;">
          Your innovative project has been selected as a winner! Your work showcases exactly what we're looking for - creative AI-assisted development that pushes boundaries while maintaining human creativity at its core.
        </p>
        
        <!-- Winner benefits -->
        <div style="background-color: #f9fafb; padding: 25px; border-radius: 8px; border-left: 4px solid #fbbf24; margin: 30px 0;">
          <h3 style="color: #111827; font-size: 20px; font-weight: 600; margin: 0 0 15px 0;">Your Winner Benefits:</h3>
          <div style="margin-bottom: 12px;">✨ Featured on the Vibe Coding Award homepage</div>
          <div style="margin-bottom: 12px;">🏆 Permanent entry in our Winners Archive</div>
          <div style="margin-bottom: 12px;">📱 Promotion across our social media channels</div>
          <div>🎖️ Digital winner badge and certificate</div>
        </div>
        
        <div style="text-align: center; margin: 40px 0;">
          <a href="https://vibecodingaward.com" 
             style="display: inline-block; background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            See Your Feature
          </a>
        </div>
        
        <!-- Footer -->
        <div style="border-top: 1px solid #e5e7eb; padding-top: 30px; margin-top: 40px; text-align: center;">
          <p style="color: #9ca3af; font-size: 14px; margin: 0;">
            Thank you for being part of the vibe coding community! • <a href="mailto:hello@vibecodingaward.com" style="color: #8b5cf6; text-decoration: none;">hello@vibecodingaward.com</a>
          </p>
        </div>
      </div>
    </div>
  `
});

// Helper function for submission confirmation email
export async function sendSubmissionConfirmation(userEmail: string, userName: string, projectTitle: string) {
  const logoUrl = "https://vibecodingaward.com/VCA%20Logo.png";
  const template = submissionConfirmationTemplate(projectTitle, userName, logoUrl);
  return sendEmail({
    to: userEmail,
    from: "Vibe Coding Award <hello@vibecodingaward.com>",
    ...template
  });
}

// Helper function for winner notification email
export async function sendWinnerNotification(userEmail: string, userName: string, projectTitle: string, awardType: string) {
  const logoUrl = "https://vibecodingaward.com/VCA%20Logo.png";
  const template = winnerNotificationTemplate(projectTitle, userName, awardType, logoUrl);
  return sendEmail({
    to: userEmail,
    from: "Vibe Coding Award <hello@vibecodingaward.com>",
    ...template
  });
} 