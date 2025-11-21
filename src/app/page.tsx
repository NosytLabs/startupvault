'use client';
import dynamic from 'next/dynamic';
import { Features } from '@/components/features';
import { Footer } from '@/components/layout/footer';
import { StartupList } from '@/components/organisms/StartupList';
import { CloneModal } from '@/components/organisms/CloneModal';
import { useStartupData } from '@/shared/hooks/useStartupData';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Lottie } from '@/components/atoms/Lottie'
import { branding } from '@/config'

const Pricing = dynamic(() => import('@/components/layout/pricing').then(m => m.Pricing), { ssr: false });
const Testimonials = dynamic(() => import('@/components/layout/testimonials').then(m => m.Testimonials), { ssr: false });

export default function HomePage() {
  const router = useRouter()
  const [keyword, setKeyword] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('')
  const [mounted, setMounted] = useState(false)
  const [cloneStartup, setCloneStartup] = useState<any>(null)
  
  const trending = useStartupData({ sort: 'recent', limit: 8 })
  const highMrr = useStartupData({ sort: 'mrr-high', limit: 8 })

  useEffect(() => {
    setMounted(true)
  }, [])
  
  const onSearch = () => {
    const params = new URLSearchParams()
    if (keyword) params.set('search', keyword)
    if (selectedIndustry) params.set('industry', selectedIndustry)
    router.push(`/startups?${params.toString()}`)
  }

  const industries = ['SaaS', 'Marketplace', 'AI', 'Digital Products', 'Analytics', 'Services', 'Education'];
  
  if (!mounted) return null
  
  return (
    <div className="min-h-screen">
        <section id="home" className="pt-20 pb-16 bg-gradient-to-br from-secondary/50 to-background section-fade">
          <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold mb-4">
                  📊 Real Data from 52 Verified TrustMRR Startups (Champions, Countries, Categories)
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight tracking-tight glow-effect">
                {branding.subbrand}: Clone Proven Startup Models
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-3xl mx-auto">
                Discover $1.2B+ in verified startup revenues & MRR data. Full leaderboard. Champions. 14+ countries. 25+ categories.
              </p>
              <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
                AI-powered cloneability scoring shows you which startup models are easiest to replicate. Get actionable insights backed by real data.
              </p>
              <div className="max-w-md mx-auto mb-8">
                <Lottie src="https://assets10.lottiefiles.com/packages/lf20_pqpmxb1x.json" className="h-40 mx-auto" />
              </div>
              <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
                Discover companies by revenue, industry, stage, tech stack, and more.
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
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  <button
                    onClick={() => {
                      setSelectedIndustry('')
                      onSearch()
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                      selectedIndustry === '' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'
                    }`}
                  >
                    All Industries
                  </button>
                  {industries.map((ind) => (
                    <button
                      key={ind}
                      onClick={() => {
                        setSelectedIndustry(ind)
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                        selectedIndustry === ind ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'
                      }`}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="marketplace" className="py-20 bg-background">
          <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Trending Startups</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Discover the most popular and fastest-growing startups in our database</p>
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
                onStartupClick={(id) => router.push(`/startups/${id}`)}
                onClone={setCloneStartup}
                className=""
              />
            )}
          </div>
        </section>
        <section className="py-20 bg-secondary/30">
          <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto cv-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">High MRR Companies</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Explore companies with proven revenue models and strong growth metrics</p>
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
                onStartupClick={(id) => router.push(`/startups/${id}`)}
                onClone={setCloneStartup}
                className=""
              />
            )}
          </div>
        </section>
        <div className="cv-auto"><Features /></div>
        <div className="cv-auto"><Pricing /></div>
        <section id="about" className="py-24 bg-gradient-to-b from-background to-secondary/20">
          <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center cv-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">About StartupVault</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {branding.name} • {branding.subbrand} ({branding.longName}) provides an authentic database and cloning service with verified metrics and document generation.
            </p>
          </div>
        </section>
        <div className="mx-auto"><Testimonials /></div>
        <Footer />
        {cloneStartup && <CloneModal startup={cloneStartup} onClose={() => setCloneStartup(null)} />}
      </div>
  );
}