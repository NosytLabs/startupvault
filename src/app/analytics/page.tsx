'use client';
import { useState, useEffect } from 'react';
import { Footer } from '@/components/layout/footer';

export default function AnalyticsPage() {
  const [overview, setOverview] = useState<any>(null);
  const [trends, setTrends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [overRes, trendsRes] = await Promise.all([
          fetch('/api/analytics'),
          fetch('/api/analytics?type=industry-trends'),
        ]);

        if (overRes.ok) setOverview(await overRes.json());
        if (trendsRes.ok) setTrends(await trendsRes.json());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <>
        <div className="min-h-screen flex items-center justify-center">Loading analytics...</div>
      </>
    );

  return (
    <>
      <div style={{ background: 'linear-gradient(to bottom right, #f8fbf8 0%, #ffffff 50%, #f8f9fc 100%)' }} className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-16 animate-fade-in">
            <h1 style={{
              fontSize: 'clamp(2rem, 6vw, 3rem)',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #1a3a52 0%, #ff6b35 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1.5rem'
            }}>Startup Market Analytics</h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">Discover trends across <span className="font-bold text-primary">50 verified startups</span> with $1.1B+ combined revenue</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="p-8 bg-gradient-to-br from-teal-500/10 to-teal-600/10 border border-teal-500/20 rounded-lg hover:shadow-lg transition-all">
              <p className="text-sm text-muted-foreground mb-2 font-semibold">Total Startups</p>
              <p className="text-4xl font-bold" style={{color: '#1a3a52'}}>{overview?.totalStartups}</p>
            </div>
            <div className="p-8 bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 border border-cyan-500/20 rounded-lg hover:shadow-lg transition-all">
              <p className="text-sm text-muted-foreground mb-2 font-semibold">Combined Revenue</p>
              <p className="text-3xl font-bold" style={{color: '#0d47a1'}}>${(overview?.totalRevenue / 1000000000).toFixed(1)}B</p>
            </div>
            <div className="p-8 bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-lg hover:shadow-lg transition-all">
              <p className="text-sm text-muted-foreground mb-2 font-semibold">Combined MRR</p>
              <p className="text-3xl font-bold" style={{color: '#558b2f'}}>${(overview?.totalMrr / 1000000).toFixed(1)}M</p>
            </div>
            <div className="p-8 bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-lg hover:shadow-lg transition-all">
              <p className="text-sm text-muted-foreground mb-2 font-semibold">Average Revenue/Company</p>
              <p className="text-3xl font-bold" style={{color: '#d84315'}}>${(overview?.avgRevenue / 1000000).toFixed(1)}M</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Top Startups by Revenue</h2>
              <div className="space-y-3">
                {overview?.topByRevenue?.map((startup: any, i: number) => (
                  <div key={i} className="p-4 bg-card border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold">{startup.name}</h3>
                      <span className="text-lg font-bold text-primary">${(startup.revenue / 1000000).toFixed(1)}M</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{startup.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Top Startups by MRR</h2>
              <div className="space-y-3">
                {overview?.topByMrr?.map((startup: any, i: number) => (
                  <div key={i} className="p-4 bg-card border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold">{startup.name}</h3>
                      <span className="text-lg font-bold text-accent">${(startup.mrr / 1000).toFixed(0)}K</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{startup.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Revenue by Industry</h2>
            <div className="space-y-4">
              {trends.map((trend, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <h3 className="font-semibold">{trend.industry}</h3>
                    <span className="text-sm text-muted-foreground">{trend.count} startups</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-3">
                    <div
                      className="bg-primary rounded-full h-3 transition-all"
                      style={{ width: `${Math.min((trend.totalRevenue / trends[0].totalRevenue) * 100, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>${(trend.totalRevenue / 1000000).toFixed(1)}M total</span>
                    <span>Avg: ${(trend.avgRevenue / 1000000).toFixed(1)}M</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
