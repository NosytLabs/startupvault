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
    return <div className="min-h-screen flex items-center justify-center">Loading analytics...</div>;

  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text-primary">
              Startup Market Analytics
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Discover trends across <span className="font-bold text-primary">{overview?.totalStartups}</span> verified startups with <span className="font-bold text-primary">${(overview?.totalRevenue / 1000000000).toFixed(1)}B+</span> combined revenue
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="p-8 bg-primary/5 border border-primary/20 rounded-lg hover:shadow-lg transition-all">
              <p className="text-sm text-muted-foreground mb-2 font-semibold">Total Startups</p>
              <p className="text-4xl font-bold text-primary">{overview?.totalStartups}</p>
            </div>
            <div className="p-8 bg-accent/5 border border-accent/20 rounded-lg hover:shadow-lg transition-all">
              <p className="text-sm text-muted-foreground mb-2 font-semibold">Combined Revenue</p>
              <p className="text-4xl font-bold text-accent">${(overview?.totalRevenue / 1000000000).toFixed(1)}B</p>
            </div>
            <div className="p-8 bg-secondary/5 border border-secondary/20 rounded-lg hover:shadow-lg transition-all">
              <p className="text-sm text-muted-foreground mb-2 font-semibold">Combined MRR</p>
              <p className="text-4xl font-bold text-secondary">${(overview?.totalMrr / 1000000).toFixed(1)}M</p>
            </div>
            <div className="p-8 bg-primary/5 border border-primary/20 rounded-lg hover:shadow-lg transition-all">
              <p className="text-sm text-muted-foreground mb-2 font-semibold">Average Revenue</p>
              <p className="text-4xl font-bold text-primary">${(overview?.avgRevenue / 1000000).toFixed(1)}M</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Top Startups by Revenue</h2>
              <div className="space-y-3">
                {overview?.topByRevenue?.map((startup: any, i: number) => (
                  <div key={i} className="p-4 bg-slate-50 border border-border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-foreground">{startup.name}</h3>
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
                  <div key={i} className="p-4 bg-slate-50 border border-border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-foreground">{startup.name}</h3>
                      <span className="text-lg font-bold text-accent">${(startup.mrr / 1000).toFixed(0)}K</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{startup.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
