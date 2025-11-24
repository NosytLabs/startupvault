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
      <section id="home" className="pt-32 pb-24" style={{ background: 'linear-gradient(to bottom right, #f8fbf8 0%, #ffffff 50%, #f8f9fc 100%)' }} suppressHydrationWarning>
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <span style={{
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, rgba(26, 58, 82, 0.08), rgba(255, 107, 53, 0.08))',
                color: '#1a3a52',
                borderRadius: '9999px',
                fontSize: '0.8125rem',
                fontWeight: 700,
                marginBottom: '1.5rem',
                border: '1px solid rgba(26, 58, 82, 0.15)',
                letterSpacing: '0.5px'
              }}>
                ✓ AUTHENTIC Data • 105 Verified Startups • $150B+ Revenue
              </span>
            </div>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 8vw, 4rem)',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #1a3a52 0%, #ff6b35 50%, #7cb342 100%)',
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
              color: '#5a7089',
              marginBottom: '1.5rem',
              maxWidth: '48rem',
              margin: '0 auto 1.5rem',
            }}>
              Discover $1.1B+ in verified startup revenues from TrustMRR.com. Real founders. Real revenue/MRR data. Real business models to study and clone.
            </p>
            <p style={{
              fontSize: '1rem',
              lineHeight: 1.6,
              color: '#7a8ba0',
              marginBottom: '2.5rem',
              maxWidth: '42rem',
              margin: '0 auto 2.5rem',
            }}>
              Browse 105 verified startups, scan their websites for insights, and generate actionable build documentation for your own ventures.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '42rem', margin: '0 auto 2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <input
                  value={keyword}
                  onChange={e => setKeyword(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && onSearch()}
                  placeholder="Search companies, founders, keywords..."
                  style={{
                    width: '100%',
                    height: '3rem',
                    padding: '0 1rem',
                    fontSize: '1rem',
                    borderRadius: '0.75rem',
                    border: '1.5px solid #e5e7eb',
                    backgroundColor: '#f9fafb',
                    transition: 'all 0.2s',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#1a3a52';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(26, 58, 82, 0.1)';
                    e.currentTarget.style.backgroundColor = '#fff';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e5edf2';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }}
                />
                <button
                  onClick={onSearch}
                  style={{
                    width: '100%',
                    height: '3rem',
                    padding: '0 2rem',
                    fontSize: '1rem',
                    fontWeight: 700,
                    borderRadius: '0.75rem',
                    border: 'none',
                    background: 'linear-gradient(135deg, #1a3a52 0%, #2d5a7b 100%)',
                    color: '#fff',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 8px 24px rgba(26, 58, 82, 0.3)',
                    letterSpacing: '0.5px',
                    fontFamily: 'inherit'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(26, 58, 82, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(26, 58, 82, 0.3)';
                  }}
                >
                  🔍 Search Startups
                </button>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <div
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#3b82f6';
                    e.currentTarget.style.backgroundColor = '#eff6ff';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.backgroundColor = '#fff';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                  }}
                  style={{
                    padding: '0.75rem 1.5rem',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    borderRadius: '0.75rem',
                    border: '1.5px solid #e5e7eb',
                    backgroundColor: '#fff',
                    color: '#3b82f6',
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                  }}
                >
                  <Link href="/champions" style={{ textDecoration: 'none', color: 'inherit' }}>
                    🏆 Champions
                  </Link>
                </div>
                <div
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#3b82f6';
                    e.currentTarget.style.backgroundColor = '#eff6ff';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.backgroundColor = '#fff';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                  }}
                  style={{
                    padding: '0.75rem 1.5rem',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    borderRadius: '0.75rem',
                    border: '1.5px solid #e5e7eb',
                    backgroundColor: '#fff',
                    color: '#3b82f6',
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                  }}
                >
                  <Link href="/leaderboard" style={{ textDecoration: 'none', color: 'inherit' }}>
                    📊 Leaderboard
                  </Link>
                </div>
              </div>
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
                  boxShadow: selectedIndustry === '' ? '0 4px 12px rgba(59, 130, 246, 0.2)' : 'none',
                  fontFamily: 'inherit'
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
                    boxShadow: selectedIndustry === ind ? '0 4px 12px rgba(59, 130, 246, 0.2)' : 'none',
                    fontFamily: 'inherit'
                  }}
                >
                  {ind}
                </button>
              ))}
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

      <Features />
      <Pricing />

      <section id="about" className="py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">About StartupVault</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {branding.name} • {branding.subbrand} ({branding.longName}) provides an authentic database and cloning service with verified metrics and document generation.
          </p>
        </div>
      </section>

      <Testimonials />
      <Footer />
    </div>
  );
}
