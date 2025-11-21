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
  return `# Product Requirements Document: Clone ${startup.name}

## Executive Summary
This document outlines the requirements to build a clone of ${startup.name}, a ${startup.industry} startup generating $${(startup.revenue / 1000000).toFixed(1)}M in revenue.

---

## 1. Product Overview

### Vision
Replicate the core business model and technical architecture of ${startup.name} for a new market segment or geographical region.

### Market Opportunity
- **Base Model**: ${startup.name}
- **Annual Revenue**: $${(startup.revenue / 1000000).toFixed(1)}M
- **Monthly Revenue**: $${(startup.mrr / 1000000).toFixed(2)}M
- **Founder**: ${startup.founder}
- **Industry**: ${startup.industry}
- **Stage**: ${startup.stage}

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
4. Advanced features based on market research

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
- Community building

---

## 4. Technical Architecture

### Frontend
- Framework: Next.js 14+
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

## 5. Design & UX

- Responsive design (mobile-first)
- Accessibility compliance (WCAG 2.1)
- Performance optimization
- Dark mode support

---

## 6. Success Metrics

- User acquisition cost (CAC)
- Monthly recurring revenue (MRR)
- Customer retention rate
- Feature adoption rate
- Time to first value

---

## 7. Timeline & Milestones

- **Month 1**: MVP launch
- **Month 2-3**: Beta testing & feedback
- **Month 4**: Public launch
- **Month 5-6**: Growth & optimization
`;
}

export function generateMVP(startup: Startup): string {
  return `# Minimum Viable Product (MVP) Specification

## Goal
Launch a working clone of ${startup.name} within 4-8 weeks with core features only.

## Scope

### Must Have (Phase 1)
1. User sign-up & login
2. Main ${startup.industry} feature (core value prop)
3. Basic dashboard
4. Payment integration (Stripe)
5. Email notifications

### Nice to Have
1. Advanced search
2. Export data
3. API documentation

### Out of Scope
1. Mobile app
2. Advanced analytics
3. Admin features
4. Integrations

## Technical Stack
- Frontend: Next.js, Tailwind, React Hook Form
- Backend: Next.js API Routes, Prisma
- Database: PostgreSQL
- Auth: NextAuth.js
- Payments: Stripe

## Estimated Effort
- Design: 40 hours
- Frontend: 80 hours
- Backend: 60 hours
- Testing: 40 hours
- **Total: 220 hours (~5-6 weeks for one developer)**

## Milestones
- Week 1: Project setup, database schema, auth
- Week 2: Core features, payment integration
- Week 3: Testing, bug fixes
- Week 4: Launch
`;
}

export function generateTaskList(startup: Startup): string {
  return `# Development Task List for ${startup.name} Clone

## Setup (Week 1)
- [ ] Create project repository
- [ ] Set up Next.js 14+ project
- [ ] Configure Tailwind CSS
- [ ] Set up PostgreSQL database
- [ ] Configure environment variables
- [ ] Set up NextAuth.js authentication

## Backend Development (Week 2)
- [ ] Create database schema
- [ ] Build API endpoints for core features
- [ ] Implement user management
- [ ] Set up Stripe integration
- [ ] Configure email service
- [ ] Add error handling and logging

## Frontend Development (Week 2-3)
- [ ] Build authentication pages
- [ ] Create main dashboard
- [ ] Build core feature components
- [ ] Implement payment flow
- [ ] Add navigation and layouts
- [ ] Set up responsive design

## Testing (Week 3-4)
- [ ] Write unit tests
- [ ] Perform integration testing
- [ ] User acceptance testing
- [ ] Performance testing
- [ ] Security audit
- [ ] Fix bugs and issues

## Deployment (Week 4)
- [ ] Set up production environment
- [ ] Configure CI/CD pipeline
- [ ] Deploy to production
- [ ] Monitor and optimize
- [ ] Set up analytics
- [ ] Create documentation

## Post-Launch (Ongoing)
- [ ] Monitor user feedback
- [ ] Track key metrics
- [ ] Plan Phase 2 features
- [ ] Optimize based on data
`;
}

export function generateCursorPrompt(startup: Startup): string {
  return `# Cursor AI Prompt for Building ${startup.name} Clone

You are building a clone of ${startup.name}, a ${startup.industry} startup with $${(startup.revenue / 1000000).toFixed(1)}M in annual revenue.

## Project Context
- **Industry**: ${startup.industry}
- **Business Model**: Subscription-based
- **Target Audience**: ${startup.industry} professionals
- **Revenue**: $${(startup.revenue / 1000000).toFixed(1)}M annually ($${(startup.mrr / 1000000).toFixed(2)}M MRR)
- **Website**: ${startup.website || 'Research required'}

## Tech Stack
- Frontend: Next.js 14, React, Tailwind CSS
- Backend: Node.js, API Routes, PostgreSQL
- Auth: NextAuth.js
- Payments: Stripe
- Deployment: Vercel/Replit

## Implementation Guide

### 1. Authentication
- Implement NextAuth.js with email/password
- Create sign-up and login flows
- Add session management
- Secure API routes

### 2. Core Features
- Identify main value propositions from ${startup.name}
- Build MVP features first
- Keep UI simple and clean
- Focus on user experience

### 3. Payment Integration
- Set up Stripe
- Implement subscription logic
- Create pricing page
- Add billing dashboard

### 4. Database
- Design schema for users, subscriptions, data
- Implement Prisma ORM
- Set up migrations
- Add indexes for performance

### 5. Deployment
- Use Vercel or Replit
- Set up environment variables
- Configure CI/CD
- Monitor logs and errors

## Key Success Factors
1. Ship fast - MVP in 4-8 weeks
2. Focus on user acquisition
3. Measure key metrics (CAC, MRR)
4. Iterate based on feedback
`;
}
