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
      from: from || process.env.FROM_EMAIL || "Vibe Coding Award <noreply@vibecodingaward.com>",
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

// Newsletter welcome template
export const newsletterWelcomeTemplate = (logoUrl: string) => ({
  subject: "Welcome to Vibe Coding Award!",
  html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f172a; color: #e2e8f0; border-radius: 8px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
        <img src="${logoUrl}" alt="Vibe Coding Award" style="height: 60px; margin-bottom: 20px;" />
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Welcome to Vibe Coding Award!</h1>
      </div>
      
      <div style="padding: 30px;">
        <p style="font-size: 18px; line-height: 1.6; margin-bottom: 20px;">
          Thank you for joining our community of passionate developers! 🚀
        </p>
        
        <p style="line-height: 1.6; margin-bottom: 20px;">
          You're now part of an exclusive community that celebrates outstanding coding projects and innovative development practices. Here's what you can expect:
        </p>
        
        <div style="background-color: #1e293b; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #3b82f6; margin-top: 0;">What's Next?</h3>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li style="margin: 8px 0;">Monthly winner announcements</li>
            <li style="margin: 8px 0;">Featured project showcases</li>
            <li style="margin: 8px 0;">Community updates and insights</li>
            <li style="margin: 8px 0;">Exclusive developer content</li>
          </ul>
        </div>

        <p style="line-height: 1.6;">
          Stay tuned for our monthly updates showcasing the most innovative and impactful projects in the coding community.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://vibecodingaward.com" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
            Visit Vibe Coding Award
          </a>
        </div>
        
        <p style="color: #64748b; font-size: 14px; text-align: center; margin-top: 40px;">
          You're receiving this because you subscribed to the Vibe Coding Award newsletter.
        </p>
      </div>
    </div>
  `
});

// Helper function for newsletter welcome email
export async function sendNewsletterWelcome(userEmail: string) {
  const logoUrl = "https://vibecodingaward.com/vibe-coding-award-logo.png";
  const template = newsletterWelcomeTemplate(logoUrl);
  return sendEmail({
    to: userEmail,
    ...template
  });
} 