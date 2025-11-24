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
            <div className="group p-8 bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/30 rounded-xl hover:shadow-xl hover:border-primary/50 transition-all duration-300">
              <p className="text-xs font-semibold text-primary/70 mb-2 uppercase tracking-wider">Total Startups</p>
              <p className="text-4xl md:text-5xl font-bold text-primary group-hover:scale-105 transition-transform origin-left">{overview?.totalStartups}</p>
            </div>
            <div className="group p-8 bg-gradient-to-br from-accent/15 to-accent/5 border border-accent/30 rounded-xl hover:shadow-xl hover:border-accent/50 transition-all duration-300">
              <p className="text-xs font-semibold text-accent/70 mb-2 uppercase tracking-wider">Combined Revenue</p>
              <p className="text-4xl md:text-5xl font-bold text-accent group-hover:scale-105 transition-transform origin-left">${(overview?.totalRevenue / 1000000000).toFixed(1)}B</p>
            </div>
            <div className="group p-8 bg-gradient-to-br from-secondary/15 to-secondary/5 border border-secondary/30 rounded-xl hover:shadow-xl hover:border-secondary/50 transition-all duration-300">
              <p className="text-xs font-semibold text-secondary/70 mb-2 uppercase tracking-wider">Combined MRR</p>
              <p className="text-4xl md:text-5xl font-bold text-secondary group-hover:scale-105 transition-transform origin-left">${(overview?.totalMrr / 1000000).toFixed(1)}M</p>
            </div>
            <div className="group p-8 bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/30 rounded-xl hover:shadow-xl hover:border-primary/50 transition-all duration-300">
              <p className="text-xs font-semibold text-primary/70 mb-2 uppercase tracking-wider">Average Revenue</p>
              <p className="text-4xl md:text-5xl font-bold text-primary group-hover:scale-105 transition-transform origin-left">${(overview?.avgRevenue / 1000000).toFixed(1)}M</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><span className="text-primary">📈</span> Top Startups by Revenue</h2>
              <div className="space-y-3">
                {overview?.topByRevenue?.map((startup: any, i: number) => (
                  <div key={i} className="group p-5 bg-gradient-to-r from-slate-50 to-blue-50/50 border border-border hover:border-primary/30 rounded-xl hover:shadow-md transition-all duration-300">
                    <div className="flex justify-between items-start mb-2 gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors truncate">{startup.name}</h3>
                      </div>
                      <span className="text-lg font-bold text-primary whitespace-nowrap">${(startup.revenue / 1000000).toFixed(1)}M</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{startup.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><span className="text-accent">⚡</span> Top Startups by MRR</h2>
              <div className="space-y-3">
                {overview?.topByMrr?.map((startup: any, i: number) => (
                  <div key={i} className="group p-5 bg-gradient-to-r from-slate-50 to-orange-50/50 border border-border hover:border-accent/30 rounded-xl hover:shadow-md transition-all duration-300">
                    <div className="flex justify-between items-start mb-2 gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-foreground group-hover:text-accent transition-colors truncate">{startup.name}</h3>
                      </div>
                      <span className="text-lg font-bold text-accent whitespace-nowrap">${(startup.mrr / 1000).toFixed(0)}K</span>
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
