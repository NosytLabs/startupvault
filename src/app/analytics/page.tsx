'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/molecules/Navbar';
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
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">Loading analytics...</div>
      </>
    );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-12">Startup Market Analytics</h1>

          <div className="grid md:grid-cols-4 gap-4 mb-12">
            <div className="p-6 bg-card border rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Total Startups</p>
              <p className="text-4xl font-bold">{overview?.totalStartups}</p>
            </div>
            <div className="p-6 bg-card border rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Combined Revenue</p>
              <p className="text-3xl font-bold">${(overview?.totalRevenue / 1000000000).toFixed(1)}B</p>
            </div>
            <div className="p-6 bg-card border rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Combined MRR</p>
              <p className="text-3xl font-bold">${(overview?.totalMrr / 1000000).toFixed(1)}M</p>
            </div>
            <div className="p-6 bg-card border rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Average Revenue/Company</p>
              <p className="text-3xl font-bold">${(overview?.avgRevenue / 1000000).toFixed(1)}M</p>
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
