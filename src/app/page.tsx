'use client';
import dynamic from 'next/dynamic';
import { Features } from '@/components/features';
import { Footer } from '@/components/layout/footer';
import { StartupList } from '@/components/organisms/StartupList';
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
  const [mounted, setMounted] = useState(false)
  const trending = useStartupData({ sort: 'recent', limit: 6 })
  const highMrr = useStartupData({ sort: 'mrr-high', limit: 6 })

  useEffect(() => {
    setMounted(true)
  }, [])
  
  const onSearch = () => {
    const params = new URLSearchParams()
    if (keyword) params.set('search', keyword)
    router.push(`/startups?${params.toString()}`)
  }
  
  if (!mounted) return null
  
  return (
    <div className="min-h-screen">
        <section id="home" className="pt-20 pb-16 bg-gradient-to-br from-secondary/50 to-background section-fade">
          <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight tracking-tight glow-effect">
                {branding.subbrand} • Search Verified Startups
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                {branding.longName} — {branding.tagline}
              </p>
              <div className="max-w-md mx-auto mb-8">
                <Lottie src="https://assets10.lottiefiles.com/packages/lf20_pqpmxb1x.json" className="h-40 mx-auto" />
              </div>
              <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
                Discover companies by revenue, industry, stage, tech stack, and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <input
                  value={keyword}
                  onChange={e => setKeyword(e.target.value)}
                  placeholder="Search companies, products, or keywords"
                  className="input flex-1 h-12 text-lg px-4"
                />
                <button
                  onClick={onSearch}
                  className="btn btn-primary h-12 px-8 text-lg font-semibold min-w-[160px] glow-effect"
                >
                  Search Database
                </button>
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
                <p className="text-muted-foreground">We're unable to load startups right now. Please retry or adjust your filters. If the issue persists, check service configuration.</p>
              </div>
            ) : (
              <StartupList
                startups={trending.startups}
                loading={trending.loading}
                onStartupClick={(id) => router.push(`/startups?id=${id}`)}
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
                <p className="text-muted-foreground">We're unable to load startups right now. Please retry or adjust your filters. If the issue persists, check service configuration.</p>
              </div>
            ) : (
              <StartupList
                startups={highMrr.startups}
                loading={highMrr.loading}
                onStartupClick={(id) => router.push(`/startups?id=${id}`)}
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
      </div>
  );
}