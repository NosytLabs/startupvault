import { calculateCloneability } from './cloneability';

interface Startup {
  name: string;
  description: string;
  revenue: number;
  mrr: number;
  founder: string;
  industry: string;
  stage: string;
  website?: string;
}

export function generatePRD(startup: Startup): string {
  const score = calculateCloneability(startup);

  return `# Product Requirements Document: Clone ${startup.name}

## Executive Summary
This document outlines the requirements to build a clone of ${startup.name}, a ${startup.industry} startup generating $${(startup.revenue / 1000000).toFixed(1)}M in revenue.

**Cloneability Score**: ${score.overall}/100 (${score.description})

---

## 1. Product Overview

### Vision
Replicate the core business model and technical architecture of ${startup.name} for a new market segment or geographical region.

### Market Opportunity
- **Base Model**: ${startup.name}
- **Annual Revenue**: $${(startup.revenue / 1000000).toFixed(1)}M
- **Monthly Revenue**: $${(startup.mrr / 1000).toFixed(0)}K
- **Founder**: ${startup.founder}
- **Industry**: ${startup.industry}

### Key Metrics
- **Business Model Clarity**: ${score.factors.businessModelClarity}/20
- **Market Traction**: ${score.factors.marketTraction}/20
- **Scalability**: ${score.factors.scalability}/20
- **Entry Barriers**: ${score.factors.barriers}/20

---

## 2. Core Features

### MVP Features (Phase 1)
1. User authentication & profiles
2. Core value proposition feature
3. Basic payment/monetization
4. Admin dashboard

### Phase 2 Features
1. Advanced filtering/search
2. Analytics dashboard
3. Export functionality
4. API endpoints

### Phase 3 Features
1. Integrations with third-party services
2. Real-time collaboration
3. Mobile app
4. Advanced AI features

---

## 3. Business Model

### Revenue Model
Based on ${startup.name}:
- **Primary**: Subscription/SaaS model
- **Pricing**: $[X-$Y/month]
- **Target Users**: ${startup.industry} professionals

### Customer Acquisition
- Content marketing
- Product Hunt launch
- Partnerships
- Paid advertising

---

## 4. Technical Architecture

### Frontend
- Framework: Next.js 14
- Styling: Tailwind CSS
- State Management: Zustand
- Form Handling: React Hook Form

### Backend
- Runtime: Node.js
- API: Next.js API Routes
- Database: PostgreSQL
- ORM: Prisma
- Authentication: NextAuth.js

### Infrastructure
- Hosting: Vercel / Replit
- Database: Neon / PostgreSQL
- Storage: AWS S3 / Supabase
- Email: SendGrid / Mailgun

---

## 5. Success Criteria

### MVP Success
- [ ] 100 signups in first month
- [ ] $1K MRR by month 3
- [ ] 90% uptime
- [ ] <2s page load time

### Scaling Success
- [ ] $10K MRR by month 6
- [ ] <1% churn rate
- [ ] 50% month-over-month growth
- [ ] 4.5+ Trustpilot rating

---

## 6. Recommendations from Analysis

${score.recommendations.map((rec) => `- **${rec}**`).join('\n')}

---

## Timeline

- **Week 1-2**: Setup, architecture, authentication
- **Week 3-4**: Core features MVP
- **Week 5-6**: Payment integration & testing
- **Week 7-8**: Beta launch, user feedback
- **Week 9+**: Scale and optimize

---

**Generated**: ${new Date().toISOString()}
**Model**: ${startup.name}
`;
}

export function generateMVP(startup: Startup): string {
  const score = calculateCloneability(startup);

  return `# MVP Implementation Checklist: ${startup.name} Clone

## Phase 1: Foundation (Weeks 1-2)

### Setup
- [ ] Initialize Next.js 14 project
- [ ] Configure Tailwind CSS
- [ ] Setup PostgreSQL database
- [ ] Configure environment variables
- [ ] Setup git repository

### Authentication
- [ ] Install NextAuth.js
- [ ] Create user schema
- [ ] Implement email signup
- [ ] Add OAuth integration (Google)
- [ ] Create user dashboard

### Database
- [ ] Create user table
- [ ] Create pricing/subscription table
- [ ] Create activity logs table
- [ ] Setup migrations
- [ ] Create indexes

---

## Phase 2: Core Features (Weeks 3-4)

### Main Feature Implementation
- [ ] Create core feature components
- [ ] Add feature configuration
- [ ] Implement real-time updates
- [ ] Add search/filtering
- [ ] Create user tutorial

### User Interface
- [ ] Responsive layout
- [ ] Dark/light mode
- [ ] Mobile optimization
- [ ] Accessibility compliance
- [ ] Performance optimization

### Data Management
- [ ] Data import/export
- [ ] CSV upload support
- [ ] Real-time sync
- [ ] Backup system
- [ ] Data retention policies

---

## Phase 3: Monetization (Weeks 5-6)

### Payment Integration
- [ ] Stripe setup
- [ ] Create pricing page
- [ ] Implement subscription logic
- [ ] Add invoice generation
- [ ] Handle refunds/cancellations

### Subscription Plans
- [ ] Free tier (3 projects)
- [ ] Pro tier ($29/month)
- [ ] Enterprise tier (custom)
- [ ] Annual discount (20%)

---

## Phase 4: Polish & Testing (Weeks 7-8)

### Testing
- [ ] Unit tests (Jest)
- [ ] Integration tests (Playwright)
- [ ] End-to-end tests
- [ ] Performance testing
- [ ] Security testing

### Documentation
- [ ] API documentation
- [ ] User guide
- [ ] Developer guide
- [ ] Troubleshooting guide
- [ ] Video tutorials

### Launch
- [ ] Beta email list
- [ ] Product Hunt launch
- [ ] Twitter announcement
- [ ] Newsletter launch
- [ ] Media outreach

---

## Key Technologies

\`\`\`
Frontend: Next.js 14, React, Tailwind CSS, Zustand
Backend: Node.js, Prisma ORM, PostgreSQL
Payments: Stripe
Email: SendGrid
Analytics: Vercel Analytics
Monitoring: Sentry
\`\`\`

---

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Email templates tested
- [ ] Payment gateway tested
- [ ] Analytics configured
- [ ] Error monitoring setup
- [ ] CDN configured
- [ ] SSL certificate valid
- [ ] Uptime monitoring active
- [ ] Backup system active

---

## Team Requirements

- **1x Founder/Product** (you)
- **1x Backend Developer** (can be AI-assisted)
- **1x Frontend Developer** (can be AI-assisted)

**With AI Assistants (Cursor, Claude)**: Solo founder can build this in 4-6 weeks.

---

**Cloneability Score: ${score.overall}/100**
**Effort Level**: ${score.overall >= 80 ? 'Low-Medium' : score.overall >= 60 ? 'Medium' : 'High'}
**Time to MVP**: ${score.overall >= 80 ? '2-3 weeks' : score.overall >= 60 ? '4-6 weeks' : '6-10 weeks'}
`;
}

export function generateCursorPrompt(startup: Startup): string {
  const score = calculateCloneability(startup);

  return `# Cursor AI Prompt: Build a Clone of ${startup.name}

## Context
You are an expert full-stack developer. Your task is to build a SaaS product that clones ${startup.name}.

**Reference**:
- Product: ${startup.name}
- Industry: ${startup.industry}
- Revenue: $${(startup.revenue / 1000000).toFixed(1)}M annual
- MRR: $${(startup.mrr / 1000).toFixed(0)}K monthly
- Cloneability Score: ${score.overall}/100

---

## Core Requirements

### 1. Tech Stack
Use this exact stack:
\`\`\`
- Frontend: Next.js 14 (App Router)
- UI: React with Tailwind CSS
- Database: PostgreSQL with Prisma ORM
- Auth: NextAuth.js
- Payments: Stripe
- State: Zustand
- Forms: React Hook Form + Zod validation
- Deployment: Vercel
\`\`\`

### 2. Project Structure
\`\`\`
src/
├── app/
│   ├── api/
│   ├── dashboard/
│   ├── auth/
│   └── public/
├── components/
│   ├── ui/
│   ├── forms/
│   └── layouts/
├── lib/
│   ├── db.ts
│   ├── auth.ts
│   └── utils.ts
├── types/
├── hooks/
└── styles/
\`\`\`

### 3. Database Schema
\`\`\`sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  plan VARCHAR,
  status VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Core data model (customize based on product)
CREATE TABLE projects (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name VARCHAR NOT NULL,
  data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

---

## Implementation Steps

### Step 1: Setup (1 hour)
1. Create Next.js 14 project
2. Install dependencies
3. Setup environment variables
4. Configure Tailwind CSS
5. Setup Git

### Step 2: Authentication (2 hours)
1. Setup NextAuth.js
2. Create login/signup pages
3. Implement database session storage
4. Add OAuth (Google)
5. Create user dashboard

### Step 3: Core Features (8 hours)
1. Create main feature components
2. Implement real-time updates
3. Add search/filtering
4. Create admin panel
5. Setup activity logging

### Step 4: Payments (3 hours)
1. Setup Stripe account
2. Create pricing page
3. Implement subscription logic
4. Add webhook handlers
5. Create billing portal

### Step 5: Polish (2 hours)
1. Add error handling
2. Implement logging
3. Setup analytics
4. Optimize performance
5. Add security headers

---

## Development Commands

\`\`\`bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run type-check   # Run TypeScript check
npm run lint         # Run ESLint
npm run test         # Run tests
\`\`\`

---

## Success Criteria

${score.recommendations.map((rec) => `- [ ] ${rec}`).join('\n')}

---

## Important Notes

1. **Copy the business model**, not the exact design
2. Start with MVP - ship fast, iterate often
3. Focus on user feedback, not feature creep
4. Test payment flows thoroughly before launch
5. Use Stripe test mode first

---

## Begin Implementation

Now, start building the project. Ask me for specific requirements or clarifications as you go.

**Start with**: \`npm create-next-app@latest my-app --typescript\`

Then follow the implementation steps above.
`;
}

export function generateTaskList(startup: Startup): string {
  const score = calculateCloneability(startup);

  return `# Development Task List: Build ${startup.name} Clone

## Sprint 1: Setup & Auth (Days 1-3)

### Day 1: Project Setup
- [ ] Create Next.js 14 project
- [ ] Install core dependencies (React, Tailwind, Prisma, NextAuth)
- [ ] Setup git repository
- [ ] Create .env.local with placeholders
- [ ] Configure TypeScript
- [ ] Setup ESLint and Prettier
- [ ] Deploy to Vercel (empty project)
- **Time**: 2 hours
- **Owner**: Dev
- **Status**: Pending

### Day 2: Database & Auth
- [ ] Create PostgreSQL database
- [ ] Design user schema
- [ ] Setup Prisma ORM
- [ ] Run initial migration
- [ ] Configure NextAuth.js
- [ ] Create auth pages (/auth/login, /auth/signup)
- [ ] Add email verification
- [ ] Test auth flow
- **Time**: 3 hours
- **Owner**: Dev
- **Status**: Pending

### Day 3: User Dashboard
- [ ] Create dashboard layout
- [ ] Add navigation
- [ ] Create user settings page
- [ ] Add profile management
- [ ] Setup user session
- [ ] Deploy to staging
- [ ] Test with real user flow
- **Time**: 2 hours
- **Owner**: Dev
- **Status**: Pending

---

## Sprint 2: Core Features (Days 4-6)

### Day 4: Main Feature - Part 1
- [ ] Design feature database schema
- [ ] Create API endpoints (GET, POST, PUT, DELETE)
- [ ] Implement CRUD operations
- [ ] Add data validation
- [ ] Create TypeScript types
- [ ] Write unit tests
- [ ] Update documentation
- **Time**: 3 hours
- **Owner**: Dev
- **Status**: Pending

### Day 5: Main Feature - Part 2
- [ ] Create feature UI components
- [ ] Implement feature page
- [ ] Add form validation
- [ ] Implement search/filter
- [ ] Add error handling
- [ ] Test UI flows
- [ ] Performance optimization
- **Time**: 3 hours
- **Owner**: Dev
- **Status**: Pending

### Day 6: Analytics & Admin
- [ ] Create admin dashboard
- [ ] Add user analytics
- [ ] Implement logging
- [ ] Create usage reports
- [ ] Setup monitoring
- [ ] Add email notifications
- [ ] Deploy to staging
- **Time**: 2 hours
- **Owner**: Dev
- **Status**: Pending

---

## Sprint 3: Monetization (Days 7-9)

### Day 7: Payment Setup
- [ ] Create Stripe account
- [ ] Setup product/pricing in Stripe
- [ ] Create pricing page UI
- [ ] Implement price display
- [ ] Add pricing toggle (annual/monthly)
- [ ] Write price logic
- [ ] Test Stripe integration
- **Time**: 2 hours
- **Owner**: Dev
- **Status**: Pending

### Day 8: Subscription Implementation
- [ ] Create checkout page
- [ ] Implement subscription creation
- [ ] Setup Stripe webhooks
- [ ] Handle subscription events
- [ ] Create billing portal
- [ ] Add invoicing
- [ ] Test payment flow
- **Time**: 3 hours
- **Owner**: Dev
- **Status**: Pending

### Day 9: Trial & Access Control
- [ ] Implement free trial logic
- [ ] Add feature access control
- [ ] Create upgrade prompts
- [ ] Add downgrade flow
- [ ] Handle cancellations
- [ ] Setup refund policy
- [ ] Test all payment scenarios
- **Time**: 2 hours
- **Owner**: Dev
- **Status**: Pending

---

## Sprint 4: Polish & Launch (Days 10-12)

### Day 10: Testing & QA
- [ ] Run full regression tests
- [ ] Test mobile experience
- [ ] Check accessibility
- [ ] Performance profiling
- [ ] Security audit
- [ ] Fix bugs
- [ ] Update documentation
- **Time**: 2 hours
- **Owner**: Dev
- **Status**: Pending

### Day 11: Marketing & Launch Prep
- [ ] Create landing page
- [ ] Write copy/description
- [ ] Create demo video
- [ ] Setup email list
- [ ] Create Product Hunt listing
- [ ] Write press release
- [ ] Schedule social posts
- **Time**: 2 hours
- **Owner**: Founder
- **Status**: Pending

### Day 12: Launch
- [ ] Final checks
- [ ] Launch Product Hunt
- [ ] Post on Twitter/LinkedIn
- [ ] Email launch list
- [ ] Monitor support emails
- [ ] Fix critical bugs
- [ ] Celebrate! 🎉
- **Time**: 1 hour
- **Owner**: Founder
- **Status**: Pending

---

## Ongoing Tasks

### Weekly
- [ ] Monitor user feedback
- [ ] Review analytics
- [ ] Fix reported bugs
- [ ] Respond to support emails
- [ ] Check infrastructure

### Monthly
- [ ] Review metrics
- [ ] Plan next features
- [ ] Update roadmap
- [ ] Communicate with users
- [ ] Optimize performance

---

## Resource Links

- **Docs**: https://docs.nextjs.org
- **Stripe**: https://stripe.com/docs
- **Prisma**: https://www.prisma.io/docs
- **Tailwind**: https://tailwindcss.com/docs
- **NextAuth**: https://next-auth.js.org

---

## Notes

- **Total Time**: ~24 development hours
- **With AI Assistance**: Can be done in 1-2 weeks part-time
- **Team Size**: 1 founder (with AI helpers) or 1-2 developers
- **Cloneability Score**: ${score.overall}/100

Last updated: ${new Date().toISOString()}
`;
}

export function generateMarkdownPrompt(startup: Startup): string {
  return `# Clone ${startup.name} - Complete Build Prompt

## OBJECTIVE
Build a fully functional ${startup.industry} SaaS product that clones the core business model of ${startup.name}.

## KEY METRICS
- Annual Revenue: $${(startup.revenue / 1000000).toFixed(1)}M
- Monthly Revenue: $${(startup.mrr / 1000).toFixed(0)}K
- Founder: ${startup.founder}
- Cloneability Score: 0-100 (${calculateCloneability(startup).overall})

## DELIVERABLES
1. Complete Next.js 14 SaaS application
2. PostgreSQL database with Prisma ORM
3. Stripe payment integration
4. NextAuth.js authentication
5. Responsive UI with Tailwind CSS
6. Admin dashboard
7. Analytics & user management

## TECHNICAL REQUIREMENTS
- Framework: Next.js 14 App Router
- Database: PostgreSQL
- ORM: Prisma
- Auth: NextAuth.js
- Payments: Stripe
- Deployment: Vercel

## BUSINESS MODEL
- Free tier with limited features
- Pro tier: $29/month
- Enterprise: Custom pricing
- Annual discount: 20% off

## SUCCESS CRITERIA
- [ ] MVP deployed and working
- [ ] 100+ users in first 2 weeks
- [ ] Stripe payments working
- [ ] <1s page load time
- [ ] 99.9% uptime

## ARCHITECTURE
Start with an opinionated Next.js setup using the latest best practices.

Now begin building the application following this specification.
`;
}
