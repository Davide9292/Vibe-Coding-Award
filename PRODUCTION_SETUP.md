# 🚀 Production Environment Setup Guide

## Overview

This guide covers setting up the Vibe Coding Award platform for production deployment on Vercel with all necessary services and configurations.

## 🗄️ **Database Setup (Neon PostgreSQL)**

### 1. Create Neon Database

1. **Sign up at [Neon.tech](https://neon.tech)**
2. **Create a new project** named "vibe-coding-award"
3. **Copy your database URL** from the dashboard
4. **Note**: URL format: `postgresql://username:password@host/database?sslmode=require`

### 2. Set up Database Schema

```bash
# Run database migrations
cd packages/database
npx prisma db push --schema=./schema.prisma

# Verify schema
npx prisma studio --schema=./schema.prisma
```

## 🔐 **Environment Variables Configuration**

### Vercel Environment Variables Setup

Add these in your **Vercel Project Dashboard → Settings → Environment Variables**:

### **Database**
```env
DATABASE_URL=postgresql://username:password@host/database?sslmode=require
```

### **NextAuth.js**
```env
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-super-secret-32-char-string-here
```

### **OAuth Providers**

#### Google OAuth Setup:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add your domain to authorized origins

```env
GOOGLE_CLIENT_ID=your-google-client-id.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

#### GitHub OAuth Setup:
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create new OAuth App
3. Set Authorization callback URL: `https://your-domain.vercel.app/api/auth/callback/github`

```env
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

### **Email Service (Resend)**
1. Sign up at [Resend.com](https://resend.com)
2. Create API key
3. Verify your domain

```env
RESEND_API_KEY=re_your-resend-api-key
```

### **File Storage (Cloudinary)**
1. Sign up at [Cloudinary.com](https://cloudinary.com)
2. Get credentials from dashboard

```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### **Analytics (Google Analytics)**
1. Create GA4 property
2. Get Measurement ID

```env
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-YOUR-GA-ID
```

### **Admin Configuration**
```env
ADMIN_EMAIL=your-admin-email@domain.com
```

## 📧 **Email Template Setup**

### Configure Resend Domain

1. **Add your domain** in Resend dashboard
2. **Set DNS records** as provided by Resend
3. **Verify domain** is working

### Test Email Configuration

```bash
# Test email sending
curl -X POST "https://your-domain.vercel.app/api/test-email" \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

## 🔧 **Vercel Deployment Configuration**

### Update vercel.json (already configured)
```json
{
  "framework": "nextjs",
  "buildCommand": "cd ../.. && pnpm build --filter=@repo/web",
  "outputDirectory": ".next",
  "installCommand": "cd ../.. && pnpm install"
}
```

### Build Settings
- **Framework Preset**: Next.js
- **Root Directory**: `apps/web`
- **Build Command**: `pnpm build`
- **Output Directory**: `.next`
- **Install Command**: `pnpm install`

## 🛡️ **Security Configuration**

### CORS and Security Headers
Already configured in `next.config.js`:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

### Rate Limiting
Consider adding rate limiting for API endpoints:
```bash
npm install @upstash/ratelimit @upstash/redis
```

## 📊 **Monitoring & Analytics**

### Error Tracking (Sentry)
```env
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
SENTRY_ORG=your-org
SENTRY_PROJECT=your-project
SENTRY_AUTH_TOKEN=your-auth-token
```

### Performance Monitoring
- **Vercel Analytics**: Auto-enabled for Pro plans
- **Web Vitals**: Built into Next.js
- **Custom metrics**: Track submission rates, voting engagement

## 🧪 **Testing Production Setup**

### 1. Authentication Test
```bash
# Test Google OAuth
https://your-domain.vercel.app/auth/signin

# Test GitHub OAuth
https://your-domain.vercel.app/auth/signin
```

### 2. Database Connection Test
```bash
# Test database connectivity
https://your-domain.vercel.app/api/health
```

### 3. Email Test
```bash
# Submit a test project to verify email sending
https://your-domain.vercel.app/submit
```

### 4. Admin Panel Test
```bash
# Access admin dashboard
https://your-domain.vercel.app/admin
```

## 🎯 **Domain Configuration**

### Custom Domain Setup
1. **Add domain** in Vercel dashboard
2. **Update DNS** records as instructed
3. **Update environment variables** with new domain
4. **Update OAuth** redirect URLs

### SSL Certificate
- **Automatic**: Vercel handles SSL certificates
- **Verification**: Check https:// works correctly

## 📈 **Performance Optimization**

### Database Optimization
- **Connection pooling**: Enabled by default with Prisma
- **Query optimization**: Use Prisma Studio to monitor queries
- **Indexes**: Already optimized in schema

### CDN and Caching
- **Static assets**: Automatically cached by Vercel
- **API responses**: Consider adding cache headers
- **Images**: Use Next.js Image optimization

## 🚨 **Production Checklist**

### Pre-Launch
- [ ] All environment variables set
- [ ] Database schema deployed
- [ ] OAuth providers configured
- [ ] Email service working
- [ ] Admin access verified
- [ ] Custom domain configured
- [ ] SSL certificate active

### Post-Launch
- [ ] Error tracking enabled
- [ ] Analytics configured
- [ ] Performance monitoring active
- [ ] Backup strategy in place
- [ ] Monitoring alerts set up

## 🔄 **Backup and Recovery**

### Database Backups
- **Neon**: Automatic daily backups
- **Manual backup**: Use `pg_dump` for additional backups
- **Testing**: Regularly test backup restoration

### Code Backups
- **GitHub**: Primary repository
- **Vercel**: Automatic deployments from Git
- **Local**: Maintain local development environment

## 📞 **Support and Monitoring**

### Key Metrics to Monitor
- **User registrations**: Track growth
- **Project submissions**: Monthly totals
- **Voting engagement**: Participation rates
- **Email deliverability**: Open/click rates
- **Error rates**: Application stability

### Support Channels
- **Email**: Set up support email
- **Documentation**: Keep guides updated
- **Issue tracking**: Use GitHub Issues

---

## 🎉 **Production Launch Ready!**

Your Vibe Coding Award platform is now configured for production deployment. All core services are set up with proper security, monitoring, and scalability considerations.

**Next Steps:**
1. Deploy to production
2. Set up first award cycle
3. Test all functionality
4. Launch marketing campaign
5. Monitor initial usage

**The platform is ready to celebrate the future of AI-assisted development!** 🚀 