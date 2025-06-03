# Vibe Coding Award 🏆

> Celebrating excellence in AI-driven development and human-AI collaboration

The Vibe Coding Award is a monthly recognition platform that discovers, celebrates, and showcases innovative software projects developed using the "vibe coding" methodology - where developers leverage AI as a collaborative partner in the creative process.

## 🌟 Project Vision

**Mission**: To discover, celebrate, and showcase innovative software projects developed using the "vibe coding" methodology, thereby giving a platform to creators who leverage AI in novel ways for rapid development and creative problem-solving.

**Vision**: To become the premier global recognition for excellence and innovation in AI-driven "vibe coding," fostering a vibrant community, defining best practices, and inspiring a new generation of developers and creators.

## 🚀 Features

### Core Platform Features
- **Monthly Award Cycles**: Regular recognition of outstanding vibe-coded projects
- **Project Submissions**: Rich submission system with vibe narratives and process documentation
- **Community Voting**: "People's Vibe" award decided by community votes
- **Expert Judging**: Panel of industry experts evaluating submissions
- **Project Showcase**: Beautiful gallery of winning and featured projects
- **User Profiles**: Personal profiles with submission history and achievements

### Advanced Features
- **Real-time Updates**: Live voting and notification system
- **Rich Media Support**: Video demos, screenshots, and repository integration
- **Search & Discovery**: Advanced filtering and search capabilities
- **Newsletter System**: Monthly updates and community highlights
- **Blog Platform**: Educational content and winner interviews
- **Analytics Dashboard**: Comprehensive insights and reporting

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Headless UI
- **State Management**: Zustand + TanStack Query
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion

### Backend
- **API**: Next.js API Routes + tRPC
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: NextAuth.js v5
- **File Storage**: Cloudinary
- **Email**: Resend + React Email
- **Real-time**: Pusher

### Infrastructure
- **Hosting**: Vercel (Frontend) + Railway (Database)
- **Monitoring**: Sentry + Vercel Analytics
- **CI/CD**: GitHub Actions
- **Package Manager**: pnpm

## 📁 Project Structure

```
vibe-coding-award/
├── apps/
│   └── web/                 # Next.js frontend application
├── packages/
│   ├── ui/                  # Shared UI components
│   ├── database/            # Prisma schema and utilities
│   ├── auth/                # Authentication utilities
│   ├── email/               # Email templates and utilities
│   └── config/              # Shared configuration
├── docs/                    # Project documentation
└── tools/                   # Development tools and scripts
```

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18.17.0 or higher
- pnpm 8.0.0 or higher
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/vibe-coding-award.git
   cd vibe-coding-award
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp apps/web/.env.example apps/web/.env.local
   # Edit the .env.local file with your configuration
   ```

4. **Set up the database**
   ```bash
   pnpm db:push
   pnpm db:generate
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create a `.env.local` file in the `apps/web` directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/vibe_coding_award"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Email
RESEND_API_KEY="your-resend-api-key"

# File Storage
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"

# Real-time
PUSHER_APP_ID="your-pusher-app-id"
PUSHER_KEY="your-pusher-key"
PUSHER_SECRET="your-pusher-secret"
PUSHER_CLUSTER="your-pusher-cluster"
```

## 📚 Development

### Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript checks
pnpm test         # Run tests
pnpm format       # Format code with Prettier

# Database
pnpm db:generate  # Generate Prisma client
pnpm db:push      # Push schema to database
pnpm db:migrate   # Run database migrations
pnpm db:studio    # Open Prisma Studio
```

### Development Workflow

1. **Feature Development**
   - Create a new branch for your feature
   - Make your changes
   - Run tests and linting
   - Submit a pull request

2. **Database Changes**
   - Update the Prisma schema
   - Run `pnpm db:generate` to update the client
   - Create and run migrations for production

3. **Testing**
   - Write unit tests for new functionality
   - Run integration tests
   - Test in different browsers and devices

## 🎨 Design System

The project uses a custom design system built with Tailwind CSS:

- **Colors**: Custom color palette optimized for accessibility
- **Typography**: Modern font stack with proper scaling
- **Components**: Reusable UI components with consistent styling
- **Animations**: Smooth transitions and micro-interactions
- **Responsive**: Mobile-first responsive design

## 📖 Documentation

- [Functional Requirements](./FUNCTIONAL_REQUIREMENTS.md)
- [Tech Stack Details](./TECH_STACK.md)
- [Project Roadmap](./PROJECT_ROADMAP.md)
- [API Documentation](./docs/api.md) (Coming Soon)
- [Deployment Guide](./docs/deployment.md) (Coming Soon)

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guide](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Development Setup for Contributors

1. Fork the repository
2. Clone your fork
3. Create a new branch for your feature
4. Make your changes
5. Run tests and linting
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the "vibe coding" methodology discussed by Andrej Karpathy and Simon Willison
- Built with modern web technologies and best practices
- Designed to celebrate the future of human-AI collaboration in software development

## 📞 Contact

- **Website**: [vibecodingaward.com](https://vibecodingaward.com) (Coming Soon)
- **Email**: hello@vibecodingaward.com
- **Twitter**: [@vibecodingaward](https://twitter.com/vibecodingaward)

---

**Made with ❤️ for the vibe coding community** 