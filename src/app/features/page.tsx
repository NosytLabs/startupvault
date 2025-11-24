'use client';
import { Footer } from '@/components/layout/footer';
import Link from 'next/link';

export default function FeaturesPage() {
  const features = [
    {
      icon: '📊',
      title: '149 Verified Startups',
      description: 'Browse real companies with authenticated revenue and MRR data from TrustMRR.com. All 149 startups generating $1.1T+ combined revenue.'
    },
    {
      icon: '🔍',
      title: 'Smart Filtering',
      description: 'Find startups by industry, revenue range, growth stage, founder, and more. Quickly identify business models relevant to you.'
    },
    {
      icon: '🏆',
      title: 'Champion Rankings',
      description: 'Discover top performers across industries. See which startups are crushing it and what makes them successful.'
    },
    {
      icon: '⚖️',
      title: 'Compare Side-by-Side',
      description: 'Compare up to 5 startups simultaneously. Analyze their revenue, MRR, industry, and stage to find patterns.'
    },
    {
      icon: '📈',
      title: 'Global Leaderboard',
      description: 'Rank startups by revenue and MRR. Filter by country to see how different regions perform.'
    },
    {
      icon: '📝',
      title: 'Generate Docs (Premium)',
      description: 'Automatically generate PRD, MVP specs, task lists, and Cursor AI prompts for any startup you want to clone.'
    },
    {
      icon: '🌐',
      title: 'Website Scanning (Premium)',
      description: 'Scan startup websites to extract business model insights, feature lists, and monetization strategies.'
    },
    {
      icon: '📱',
      title: 'Mobile First',
      description: 'Fully responsive design. Browse, search, and compare startups on any device, anywhere.'
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text-primary">Powerful Features</h1>
            <p className="text-xl text-muted-foreground">Everything you need to discover and clone proven startup business models</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, i) => (
              <div key={i} className="group p-8 bg-slate-50 border border-border rounded-lg hover:border-primary hover:shadow-lg transition-all">
                <p className="text-5xl mb-4">{feature.icon}</p>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 rounded-lg p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Find Your Next Startup Idea?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start with the free Explorer plan to browse all 149 verified startups from TrustMRR.com. Upgrade to Builder for advanced features like website scanning and document generation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/startups" className="btn btn-primary">
                Browse Startups
              </Link>
              <Link href="/#pricing" className="btn btn-outline">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
