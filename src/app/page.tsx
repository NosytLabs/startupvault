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
        <section id="home" className="pt-32 pb-24 bg-gradient-to-br from-blue-50 via-white to-purple-50" suppressHydrationWarning>
          <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <span style={{
                  display: 'inline-block',
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(124, 58, 237, 0.1))',
                  color: '#3b82f6',
                  borderRadius: '9999px',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  marginBottom: '1.5rem',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  letterSpacing: '0.5px'
                }}>
                  ✓ AUTHENTIC Data • 50 Verified Startups • $1.1B+ Revenue
                </span>
              </div>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                fontWeight: 900,
                background: 'linear-gradient(135deg, #3b82f6 0%, #7c3aed 50%, #2563eb 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '2rem',
                lineHeight: 1.2,
                letterSpacing: '-1px'
              }}>
                {branding.subbrand}: Clone Proven Startup Models
              </h1>
              <p style={{
                fontSize: '1.25rem',
                lineHeight: 1.6,
                color: '#4b5563',
                marginBottom: '1.5rem',
                maxWidth: '48rem',
                margin: '0 auto 1.5rem',
              }}>
                Discover $1.1B+ in verified startup revenues from TrustMRR.com. Real founders. Real revenue/MRR data. Real business models to study and clone.
              </p>
              <p style={{
                fontSize: '1rem',
                lineHeight: 1.6,
                color: '#6b7280',
                marginBottom: '2.5rem',
                maxWidth: '42rem',
                margin: '0 auto 2.5rem',
              }}>
                Browse 50 verified startups, scan their websites for insights, and generate actionable build documentation for your own ventures.
              </p>
              <div className="space-y-4 max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && onSearch()}
                    placeholder="Search companies, founders, keywords..."
                    className="input flex-1 h-12 px-4"
                  />
                  <button
                    onClick={onSearch}
                    className="btn btn-primary h-12 px-8 font-semibold min-w-[140px] glow-effect"
                  >
                    Search
                  </button>
                  <Link href="/champions" className="btn btn-secondary h-12 px-8 font-semibold">
                    🏆 Champions
                  </Link>
                  <Link href="/leaderboard" className="btn btn-secondary h-12 px-8 font-semibold">
                    📊 Leaderboard
                  </Link>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
                  <button
                    onClick={() => {
                      setSelectedIndustry('')
                      onSearch()
                    }}
                    style={{
                      padding: '0.5rem 1.25rem',
                      borderRadius: '9999px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      transition: 'all 0.25s',
                      border: selectedIndustry === '' ? '2px solid #3b82f6' : '2px solid #e5e7eb',
                      backgroundColor: selectedIndustry === '' ? '#eff6ff' : '#f9fafb',
                      color: selectedIndustry === '' ? '#3b82f6' : '#4b5563',
                      cursor: 'pointer',
                      boxShadow: selectedIndustry === '' ? '0 4px 12px rgba(59, 130, 246, 0.2)' : 'none'
                    }}
                  >
                    All Industries
                  </button>
                  {industries.map((ind) => (
                    <button
                      key={ind}
                      onClick={() => setSelectedIndustry(ind)}
                      style={{
                        padding: '0.5rem 1.25rem',
                        borderRadius: '9999px',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        transition: 'all 0.25s',
                        border: selectedIndustry === ind ? '2px solid #3b82f6' : '2px solid #e5e7eb',
                        backgroundColor: selectedIndustry === ind ? '#eff6ff' : '#f9fafb',
                        color: selectedIndustry === ind ? '#3b82f6' : '#4b5563',
                        cursor: 'pointer',
                        boxShadow: selectedIndustry === ind ? '0 4px 12px rgba(59, 130, 246, 0.2)' : 'none'
                      }}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="marketplace" className="py-28 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Trending Startups</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">Discover the most popular and fastest-growing startups in our database</p>
            </div>
            {trending.error ? (
              <div className="rounded-lg border bg-destructive/10 border-destructive p-6 max-w-2xl mx-auto">
                <h3 className="text-destructive font-semibold mb-2">Service unavailable</h3>
                <p className="text-muted-foreground">Unable to load startups. Please refresh and try again.</p>
              </div>
            ) : (
              <StartupList
                startups={trending.startups}
                loading={trending.loading}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full"
              />
            )}
          </div>
        </section>
        <section className="py-28 bg-gradient-to-b from-secondary/20 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">High MRR Companies</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">Explore companies with proven revenue models and strong growth metrics</p>
            </div>
            {highMrr.error ? (
              <div className="rounded-lg border bg-destructive/10 border-destructive p-6 max-w-2xl mx-auto">
                <h3 className="text-destructive font-semibold mb-2">Service unavailable</h3>
                <p className="text-muted-foreground">Unable to load startups. Please refresh and try again.</p>
              </div>
            ) : (
              <StartupList
                startups={highMrr.startups}
                loading={highMrr.loading}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full"
              />
            )}
          </div>
        </section>
        <div><Features /></div>
        <div><Pricing /></div>
        <section id="about" className="py-24 bg-gradient-to-b from-background to-secondary/20">
          <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">About StartupVault</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {branding.name} • {branding.subbrand} ({branding.longName}) provides an authentic database and cloning service with verified metrics and document generation.
            </p>
          </div>
        </section>
        <div><Testimonials /></div>
        <Footer />
      </div>
  );
}
