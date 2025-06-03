# Authentication Setup Guide

## Quick Fix for Local Development

The 404 error after login is happening because OAuth providers aren't configured yet. Here's how to fix it:

### 1. Create Environment File

Create `apps/web/.env.local` with these variables:

```bash
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here-please-change-this

# Database URL (if using local Postgres)
DATABASE_URL="postgresql://username:password@localhost:5432/vibecodingaward?schema=public"

# Google OAuth (Get from Google Cloud Console)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth (Get from GitHub Developer Settings)
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Admin email
ADMIN_EMAIL=your-email@example.com
```

### 2. Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" > "Create Credentials" > "OAuth client ID"
5. Choose "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `http://localhost:3001/api/auth/callback/google` (for other ports)
   - `http://localhost:3002/api/auth/callback/google`
7. Copy Client ID and Client Secret to your `.env.local`

### 3. Set Up GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in:
   - Application name: "Vibe Coding Award (Dev)"
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Client Secret to your `.env.local`

### 4. Generate NextAuth Secret

Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```

Add the result to `NEXTAUTH_SECRET` in your `.env.local`

### 5. Restart Development Server

After setting up the environment variables:
```bash
pnpm dev
```

## Debug Pages

Visit these pages to debug authentication:
- `/debug-auth` - Shows authentication status and configuration
- `/auth/error` - Shows authentication error details

## Testing Authentication

1. Visit `http://localhost:3000/auth/signin`
2. Try signing in with Google or GitHub
3. You should be redirected to `/dashboard` after successful login

## Common Issues

### 404 After Login
- Check OAuth callback URLs are correct
- Ensure `NEXTAUTH_URL` matches your local development URL
- Verify OAuth apps are approved and active

### "Configuration Error"
- Check all required environment variables are set
- Ensure OAuth client secrets are correct
- Verify database connection if using custom database

### "Callback Error"
- OAuth redirect URIs must exactly match callback URL
- Check for typos in OAuth configuration
- Ensure OAuth apps are for the correct environment

## Temporary Workaround

If you want to test the app without OAuth setup, you can temporarily modify the auth configuration to skip authentication, but this is not recommended for development that involves user features. 