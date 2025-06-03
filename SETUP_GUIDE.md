# 🚀 Vibe Coding Award Platform - Setup Guide

## Quick Start (5 minutes to running platform)

### 1. Database Setup with Neon (Free Tier)

1. **Sign up for Neon** (free tier includes 0.5GB storage, 190 compute hours/month):
   - Go to [console.neon.tech/signup](https://console.neon.tech/signup)
   - Sign up with GitHub, Google, or email
   - Create a new project called "vibe-coding-award"

2. **Get your database connection string**:
   - In Neon Console, go to your project dashboard
   - Click "Connect" or find the connection string in the sidebar
   - Copy the connection string (looks like: `postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require`)

### 2. Environment Configuration

1. **Create environment file**:
   ```bash
   cd apps/web
   cp .env.example .env.local
   ```

2. **Update `.env.local` with your values**:
   ```env
   # Database
   DATABASE_URL="your-neon-connection-string-here"
   
   # NextAuth.js
   NEXTAUTH_URL="http://localhost:3002"
   NEXTAUTH_SECRET="your-secret-key-here"
   
   # OAuth Providers (optional for initial testing)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   GITHUB_ID="your-github-client-id"
   GITHUB_SECRET="your-github-client-secret"
   ```

3. **Generate a secure NextAuth secret**:
   ```bash
   openssl rand -base64 32
   ```

### 3. Database Migration

1. **Install dependencies** (if not already done):
   ```bash
   pnpm install
   ```

2. **Generate Prisma client**:
   ```bash
   cd packages/database
   pnpm prisma generate
   ```

3. **Run database migrations**:
   ```bash
   pnpm prisma db push
   ```

### 4. Start the Platform

```bash
# From project root
pnpm dev
```

The platform will be available at: **http://localhost:3002**

---

## OAuth Setup (Optional - for full authentication)

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set authorized redirect URI: `http://localhost:3002/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env.local`

### GitHub OAuth Setup

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Set Authorization callback URL: `http://localhost:3002/api/auth/callback/github`
4. Copy Client ID and Client Secret to `.env.local`

---

## Platform Features Ready to Use

### ✅ Fully Functional
- **Homepage** - Modern landing page with vibe coding explanation
- **Project Submission** - 4-step form with database integration
- **Winners Showcase** - Timeline of monthly winners and standouts
- **Blog** - Categorized articles with featured content
- **About Page** - Comprehensive vibe coding philosophy
- **User Dashboard** - Project management and analytics
- **Voting System** - Community voting with fraud prevention
- **Authentication** - NextAuth.js with Google/GitHub OAuth

### 🎨 Design System
- Custom "vibe" and "electric" color palettes
- Glass morphism effects and smooth animations
- Responsive design with mobile-first approach
- Dark/light mode support (CSS variables ready)

### 🏗️ Technical Architecture
- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes with tRPC integration ready
- **Database**: PostgreSQL with Prisma ORM (15+ models)
- **Authentication**: NextAuth.js v5 with role-based access
- **Deployment Ready**: Optimized for Vercel deployment

---

## Development Workflow

### Adding New Features
```bash
# Create new branch for feature
git checkout -b feature/new-feature

# Make changes
# Test locally
pnpm dev

# Build to check for errors
pnpm build

# Commit and push
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
```

### Database Schema Changes
```bash
# Edit schema in packages/database/schema.prisma
# Generate new migration
cd packages/database
pnpm prisma db push

# Or create a migration file
pnpm prisma migrate dev --name your-migration-name
```

### Adding New UI Components
```bash
# Components are in packages/ui/src/
# Follow existing patterns for consistency
# Use class-variance-authority for variants
```

---

## Deployment to Production

### Vercel Deployment (Recommended)

1. **Connect to Vercel**:
   - Push code to GitHub
   - Import project in Vercel dashboard
   - Set environment variables in Vercel settings

2. **Environment Variables for Production**:
   ```env
   DATABASE_URL="your-production-neon-connection-string"
   NEXTAUTH_URL="https://your-domain.vercel.app"
   NEXTAUTH_SECRET="your-production-secret"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   GITHUB_ID="your-github-client-id"
   GITHUB_SECRET="your-github-client-secret"
   ```

3. **Update OAuth redirect URIs** to use production domain

### Database Scaling
- Neon Free Tier: 0.5GB storage, 190 compute hours/month
- Upgrade to Launch ($19/month): 10GB storage, 300 compute hours
- Auto-scaling available for traffic spikes

---

## Troubleshooting

### Common Issues

1. **NextAuth Secret Missing**:
   ```bash
   # Generate new secret
   openssl rand -base64 32
   # Add to .env.local as NEXTAUTH_SECRET
   ```

2. **Database Connection Issues**:
   - Verify DATABASE_URL is correct
   - Check Neon project is active
   - Ensure SSL mode is included: `?sslmode=require`

3. **OAuth Not Working**:
   - Check redirect URIs match exactly
   - Verify client IDs and secrets
   - Ensure OAuth apps are active

4. **Build Errors**:
   ```bash
   # Clear Next.js cache
   rm -rf .next
   
   # Reinstall dependencies
   rm -rf node_modules
   pnpm install
   
   # Regenerate Prisma client
   cd packages/database
   pnpm prisma generate
   ```

### Getting Help
- Check the [PROJECT_STATUS.md](./PROJECT_STATUS.md) for current feature status
- Review [FUNCTIONAL_REQUIREMENTS.md](./FUNCTIONAL_REQUIREMENTS.md) for detailed specifications
- Join our development Discord or create GitHub issues

---

## Next Steps

1. **Set up database** following steps above
2. **Configure OAuth** for full authentication
3. **Test all features** to ensure everything works
4. **Deploy to production** when ready
5. **Set up monitoring** and analytics
6. **Launch your first award cycle!**

The platform is production-ready and includes everything needed for a successful vibe coding award program. 🎉 