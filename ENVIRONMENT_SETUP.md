# 🔧 Environment Configuration Guide

## 📋 **Complete .env.local Template**

Copy this template to `apps/web/.env.local` and fill in your values:

```env
# =============================================================================
# REQUIRED CONFIGURATION
# =============================================================================

# Database (REQUIRED)
# Get from: https://console.neon.tech
DATABASE_URL="postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"

# NextAuth.js (REQUIRED)
# For local: http://localhost:3000 (or your port)
# For production: https://your-domain.vercel.app
NEXTAUTH_URL="http://localhost:3000"

# Generate with: openssl rand -base64 32
NEXTAUTH_SECRET="your-nextauth-secret-key-here"

# =============================================================================
# OAUTH PROVIDERS (OPTIONAL - for social login)
# =============================================================================

# Google OAuth
# Setup: https://console.cloud.google.com
# Redirect URI: http://localhost:3000/api/auth/callback/google
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# GitHub OAuth
# Setup: https://github.com/settings/developers
# Callback URL: http://localhost:3000/api/auth/callback/github
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"

# =============================================================================
# EMAIL SERVICES (OPTIONAL - for notifications)
# =============================================================================

# Resend (Recommended)
# Setup: https://resend.com
RESEND_API_KEY="re_your-resend-api-key"
FROM_EMAIL="noreply@your-domain.com"

# SendGrid (Alternative)
SENDGRID_API_KEY="SG.your-sendgrid-api-key"

# Gmail SMTP (Alternative)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"

# =============================================================================
# FILE STORAGE (OPTIONAL - for project media)
# =============================================================================

# Cloudinary (Recommended)
# Setup: https://cloudinary.com
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# AWS S3 (Alternative)
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="your-bucket-name"

# Vercel Blob (Alternative)
BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"

# =============================================================================
# ANALYTICS & MONITORING (OPTIONAL)
# =============================================================================

# Vercel Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID="your-analytics-id"

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"

# Sentry (Error tracking)
SENTRY_DSN="https://your-sentry-dsn@sentry.io/project-id"
SENTRY_ORG="your-org"
SENTRY_PROJECT="your-project"

# PostHog (Product analytics)
NEXT_PUBLIC_POSTHOG_KEY="phc_your-posthog-key"
NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"

# =============================================================================
# EXTERNAL APIS (OPTIONAL)
# =============================================================================

# OpenAI (for AI features)
OPENAI_API_KEY="sk-your-openai-api-key"

# GitHub API (for repo analysis)
GITHUB_TOKEN="ghp_your-github-personal-access-token"

# =============================================================================
# DEPLOYMENT & FEATURES (OPTIONAL)
# =============================================================================

# App URL
NEXT_PUBLIC_APP_URL="https://your-domain.vercel.app"

# Environment
NODE_ENV="development"

# Feature flags
NEXT_PUBLIC_ENABLE_VOTING="true"
NEXT_PUBLIC_ENABLE_COMMENTS="true"
NEXT_PUBLIC_ENABLE_NEWSLETTER="true"
NEXT_PUBLIC_ENABLE_ANALYTICS="true"

# Rate limiting (Upstash Redis)
UPSTASH_REDIS_REST_URL="https://your-redis-url.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-redis-token"

# Webhooks
DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/your-webhook-url"
SLACK_WEBHOOK_URL="https://hooks.slack.com/services/your-webhook-url"
```

---

## 🎯 **Quick Setup (Minimum Required)**

For immediate testing, you only need these 3 variables:

```env
# Minimum required for local development
DATABASE_URL="your-neon-connection-string"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-generated-secret"
```

---

## 🔐 **OAuth Setup Instructions**

### Google OAuth (5 minutes)
1. **Go to**: [Google Cloud Console](https://console.cloud.google.com)
2. **Create/Select Project** → APIs & Services → Credentials
3. **Create OAuth 2.0 Client ID**:
   - Application type: Web application
   - Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
   - For production: `https://your-domain.vercel.app/api/auth/callback/google`
4. **Copy Client ID & Secret** to your `.env.local`

### GitHub OAuth (3 minutes)
1. **Go to**: [GitHub Developer Settings](https://github.com/settings/developers)
2. **New OAuth App**:
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
   - For production: `https://your-domain.vercel.app/api/auth/callback/github`
3. **Copy Client ID & Secret** to your `.env.local`

---

## 📧 **Email Setup (Optional)**

### Resend (Recommended - Free tier)
1. **Sign up**: [resend.com](https://resend.com)
2. **Get API key** from dashboard
3. **Add to .env.local**:
   ```env
   RESEND_API_KEY="re_your-api-key"
   FROM_EMAIL="noreply@your-domain.com"
   ```

### Gmail SMTP (Free alternative)
1. **Enable 2FA** on your Gmail account
2. **Generate App Password**: Google Account → Security → App passwords
3. **Add to .env.local**:
   ```env
   EMAIL_SERVER_HOST="smtp.gmail.com"
   EMAIL_SERVER_PORT="587"
   EMAIL_SERVER_USER="your-email@gmail.com"
   EMAIL_SERVER_PASSWORD="your-app-password"
   ```

---

## 📁 **File Storage Setup (Optional)**

### Cloudinary (Recommended - Free tier)
1. **Sign up**: [cloudinary.com](https://cloudinary.com)
2. **Get credentials** from dashboard
3. **Add to .env.local**:
   ```env
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   ```

---

## 📊 **Analytics Setup (Optional)**

### Vercel Analytics (Free with Vercel)
1. **Deploy to Vercel**
2. **Enable Analytics** in project settings
3. **Add to .env.local**:
   ```env
   NEXT_PUBLIC_VERCEL_ANALYTICS_ID="your-analytics-id"
   ```

### Google Analytics (Free)
1. **Create GA4 property**: [analytics.google.com](https://analytics.google.com)
2. **Get Measurement ID**
3. **Add to .env.local**:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
   ```

---

## 🚀 **Production Deployment**

### Environment Variables for Production
When deploying to Vercel/Railway/etc., set these variables:

```env
# Production URLs
DATABASE_URL="your-production-neon-url"
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="different-production-secret"

# Update OAuth redirect URIs to production domain
GOOGLE_CLIENT_ID="same-as-dev"
GOOGLE_CLIENT_SECRET="same-as-dev"
GITHUB_ID="same-as-dev"
GITHUB_SECRET="same-as-dev"
```

### Security Checklist
- ✅ **Different NEXTAUTH_SECRET** for production
- ✅ **Update OAuth redirect URIs** to production domain
- ✅ **Use production database** (separate from development)
- ✅ **Enable SSL/HTTPS** (automatic with Vercel)
- ✅ **Set proper CORS origins**

---

## 🔧 **Troubleshooting**

### Common Issues

1. **Database Connection Failed**
   - Check DATABASE_URL format
   - Ensure Neon project is active
   - Verify SSL mode: `?sslmode=require`

2. **OAuth Not Working**
   - Check redirect URIs match exactly
   - Verify client IDs and secrets
   - Test with incognito/private browsing

3. **NextAuth Errors**
   - Ensure NEXTAUTH_SECRET is set
   - Check NEXTAUTH_URL matches your domain
   - Verify environment file is loaded

### Generate Secure Secrets
```bash
# Generate NextAuth secret
openssl rand -base64 32

# Generate random string
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 📝 **Notes**

- **Never commit** `.env.local` to version control
- **Use different secrets** for development and production
- **Test OAuth flows** in incognito mode
- **Monitor usage** of third-party services
- **Keep API keys secure** and rotate regularly

**Your platform will work with just the minimum required variables, and you can add optional services as needed!** 🎉 