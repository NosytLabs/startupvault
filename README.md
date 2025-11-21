# StartupVault

A comprehensive platform for startup analysis, cloning, and automation with AI-powered features. Built with Next.js 14, TypeScript, Tailwind CSS, and modern web technologies.

## 🚀 Features

- **Startup Analysis**: Deep analysis of startup metrics, market positioning, and competitive landscape
- **AI-Powered Cloning**: Clone and analyze successful startup models with AI assistance
- **Automation Tools**: Automated workflows for startup research and validation
- **Modern UI/UX**: Responsive design with dark mode support
- **Type Safety**: Full TypeScript implementation with Zod validation
- **Database Integration**: Prisma ORM with PostgreSQL/SQLite support
- **Authentication**: NextAuth.js with multiple providers
- **Rate Limiting**: Built-in API protection with Upstash Redis
- **Testing**: Comprehensive E2E testing with Playwright

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3 with custom design system
- **Database**: Prisma ORM with PostgreSQL/SQLite
- **Authentication**: NextAuth.js
- **State Management**: Zustand
- **API**: RESTful APIs with Zod validation
- **Testing**: Playwright for E2E testing
- **Deployment**: Vercel-ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NosytLabs/startupvault.git
   cd startupvault
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/startupvault"
   
   # Authentication
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   
   # Optional: OAuth providers
   GOOGLE_CLIENT_ID=""
   GOOGLE_CLIENT_SECRET=""
   
   # Redis (for rate limiting)
   UPSTASH_REDIS_REST_URL=""
   UPSTASH_REDIS_REST_TOKEN=""
   
   # Supabase (optional)
   SUPABASE_URL=""
   SUPABASE_ANON_KEY=""
   ```

4. **Set up the database**
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

Run the test suite:
```bash
npm run test:e2e
```

Run tests in UI mode:
```bash
npm run test:ui
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add your environment variables
4. Deploy!

### Other Platforms

The application is configured to work with any Node.js hosting platform that supports Next.js 14.

## 📁 Project Structure

```
startupvault/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── (auth)/            # Authentication pages
│   │   ├── (dashboard)/       # Dashboard pages
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   ├── features/              # Feature-specific modules
│   │   ├── startups/          # Startup analysis features
│   │   ├── auth/              # Authentication features
│   │   └── dashboard/         # Dashboard features
│   ├── lib/                   # Utility libraries
│   ├── shared/                # Shared utilities and types
│   └── types/                 # TypeScript type definitions
├── prisma/                    # Database schema
├── public/                    # Static assets
└── scripts/                   # Utility scripts
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, please open an issue on GitHub or contact the maintainers.

---

Built with ❤️ by [NosytLabs](https://github.com/NosytLabs)