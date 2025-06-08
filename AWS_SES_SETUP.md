# AWS SES SMTP Setup Guide

## 🚀 **Quick Setup for Newsletter Email Functionality**

### **1. AWS SES Configuration**

1. **Login to AWS Console** → Navigate to **Simple Email Service (SES)**

2. **Verify Your Domain** (Recommended) or **Email Address**:
   - Go to "Verified identities" 
   - Click "Create identity"
   - Choose "Domain" and enter `vibecodingaward.com`
   - Follow DNS verification steps

3. **Create SMTP Credentials**:
   - Go to "SMTP settings" in the left sidebar
   - Click "Create SMTP credentials"
   - Enter IAM user name: `vibe-coding-award-smtp`
   - Download the credentials CSV file

4. **Request Production Access** (Important!):
   - By default, SES is in sandbox mode (can only send to verified emails)
   - Go to "Account dashboard" → "Request production access"
   - Fill out the request form explaining your newsletter use case

### **2. Environment Variables**

Add these to your `.env.local` file:

```bash
# AWS SES SMTP Configuration
AWS_SES_SMTP_HOST=email-smtp.us-east-1.amazonaws.com
AWS_SES_SMTP_USERNAME=your_smtp_username_from_csv
AWS_SES_SMTP_PASSWORD=your_smtp_password_from_csv
FROM_EMAIL=hello@vibecodingaward.com
```

**Note**: Replace `us-east-1` with your AWS region if different.

### **3. Test Email Functionality**

After setup, test the newsletter signup on your website:

1. Visit your homepage
2. Enter an email in the newsletter form
3. Check the email inbox for confirmation
4. Verify the email was stored in your Neon database

### **4. Deployment Environment Variables**

For Vercel deployment, add these environment variables:
- `AWS_SES_SMTP_HOST`
- `AWS_SES_SMTP_USERNAME` 
- `AWS_SES_SMTP_PASSWORD`
- `FROM_EMAIL`

### **5. Troubleshooting**

**Common Issues**:

- **"Email not verified"**: Ensure your FROM_EMAIL domain is verified in SES
- **"Sandbox mode"**: Request production access to send to any email
- **"Authentication failed"**: Double-check SMTP credentials
- **"Rate limits"**: SES has sending limits - check your dashboard

**Testing in Sandbox Mode**:
- You can only send emails to verified email addresses
- Add test email addresses in SES "Verified identities"

### **6. Email Templates**

The confirmation email includes:
- Welcome message with brand styling
- Dark theme consistent with your website
- Call-to-action button
- Professional footer

Ready to go! 🎉 