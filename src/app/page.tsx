'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Features } from '@/components/features';
import { Footer } from '@/components/layout/footer';
import { StartupList } from '@/components/organisms/StartupList';
import { useStartupData } from '@/shared/hooks/useStartupData';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { branding } from '@/config'

const Pricing = dynamic(() => import('@/components/layout/pricing').then(m => m.Pricing), { ssr: false });
const Testimonials = dynamic(() => import('@/components/layout/testimonials').then(m => m.Testimonials), { ssr: false });

export default function HomePage() {
  const router = useRouter()
  const [keyword, setKeyword] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('')
  
  const trending = useStartupData({ sort: 'recent', limit: 8 })
  const highMrr = useStartupData({ sort: 'mrr-high', limit: 8 })
  
  const onSearch = () => {
    const params = new URLSearchParams()
    if (keyword) params.set('search', keyword)
    if (selectedIndustry) params.set('industry', selectedIndustry)
    router.push(`/startups?${params.toString()}`)
  }

  const industries = ['SaaS', 'Marketplace', 'AI', 'Digital Products', 'Analytics', 'Services', 'Education']
  
  return (
    <div className="min-h-screen" suppressHydrationWarning>
      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block mb-6 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold border border-primary/20">
              ✓ AUTHENTIC Data • 105 Verified Startups • $150B+ Revenue
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text-primary">
              {branding.subbrand}: Clone Proven Startup Models
            </h1>
            
            <p className="text-xl text-muted-foreground mb-4 leading-relaxed">
              Discover $150B+ in verified startup revenues from TrustMRR.com. Real founders. Real revenue/MRR data. Real business models to study and clone.
            </p>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Browse 105 verified startups, compare business models, and extract insights to launch your own ventures.
            </p>
          </div>

          {/* Search Section */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex flex-col gap-3">
              <input
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && onSearch()}
                placeholder="Search companies, founders, keywords..."
                className="h-12 px-4 border border-border rounded-lg bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={onSearch}
                className="btn btn-primary h-12"
              >
                🔍 Search Startups
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-primary/5 border border-primary/20 rounded-lg text-center">
              <div className="text-3xl font-bold text-primary mb-2">105</div>
              <div className="text-sm text-muted-foreground">Verified Startups</div>
            </div>
            <div className="p-6 bg-accent/5 border border-accent/20 rounded-lg text-center">
              <div className="text-3xl font-bold text-accent mb-2">$150B+</div>
              <div className="text-sm text-muted-foreground">Combined Revenue</div>
            </div>
            <div className="p-6 bg-secondary/5 border border-secondary/20 rounded-lg text-center">
              <div className="text-3xl font-bold text-secondary mb-2">10</div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Link href="/startups" className="btn btn-primary">
              Browse All Startups
            </Link>
            <Link href="/leaderboard" className="btn btn-outline">
              View Leaderboard
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-2">Trending Startups</h2>
            <p className="text-muted-foreground">Recently added to our database</p>
          </div>
          <StartupList
            startups={trending.startups}
            loading={trending.loading}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          />
        </div>
      </section>

      {/* High MRR Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-2">Highest MRR</h2>
            <p className="text-muted-foreground">Top performing companies by monthly recurring revenue</p>
          </div>
          <StartupList
            startups={highMrr.startups}
            loading={highMrr.loading}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          />
        </div>
      </section>

      {/* Features */}
      <Features />

      {/* Pricing */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground">Choose the plan that's right for you</p>
          </div>
          <Pricing />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Loved by Entrepreneurs</h2>
            <p className="text-lg text-muted-foreground">See what our users are saying</p>
          </div>
          <Testimonials />
        </div>
      </section>

      <Footer />
    </div>
  );
}
