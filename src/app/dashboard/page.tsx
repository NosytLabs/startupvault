'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/molecules/Navbar';
import { Footer } from '@/components/layout/footer';
import Link from 'next/link';
import { useFavorites } from '@/lib/useFavorites';
import { allTrustMRRStartups } from '@/lib/trustmrr-all-data';

export default function DashboardPage() {
  const { favorites, clearAll } = useFavorites();
  const [saved, setSaved] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const startups = allTrustMRRStartups.filter(s => favorites.includes(s.id));
    setSaved(startups);
  }, [favorites]);

  if (!mounted) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">Loading...</div>
      </>
    );
  }

  const totalRevenue = saved.reduce((sum, s) => sum + s.revenue, 0);
  const totalMRR = saved.reduce((sum, s) => sum + s.mrr, 0);

  const handleExport = () => {
    const csv = [
      ['Name', 'Founder', 'Revenue', 'MRR', 'Industry', 'Stage', 'Country'].join(','),
      ...saved.map(s => 
        [
          `"${s.name}"`,
          `"${s.founder}"`,
          s.revenue,
          s.mrr,
          `"${s.industry}"`,
          `"${s.stage}"`,
          `"${s.country}"`
        ].join(',')
      )
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `startupvault-saved-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-3">My Saved Startups</h1>
            <p className="text-lg text-muted-foreground">Track and analyze your favorite verified startups</p>
          </div>

          {saved.length > 0 ? (
            <>
              <div className="grid md:grid-cols-4 gap-4 mb-8">
                <div className="p-6 bg-card border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Saved Startups</p>
                  <p className="text-4xl font-bold">{saved.length}</p>
                </div>
                <div className="p-6 bg-card border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Combined Revenue</p>
                  <p className="text-3xl font-bold">${(totalRevenue / 1000000).toFixed(1)}M</p>
                </div>
                <div className="p-6 bg-card border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Combined MRR</p>
                  <p className="text-3xl font-bold">${(totalMRR / 1000000).toFixed(2)}M</p>
                </div>
                <div className="p-6 bg-card border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Avg Revenue</p>
                  <p className="text-3xl font-bold">${(totalRevenue / saved.length / 1000000).toFixed(1)}M</p>
                </div>
              </div>

              <div className="flex gap-4 mb-8">
                <button onClick={handleExport} className="btn btn-primary">
                  📥 Export to CSV
                </button>
                <button onClick={clearAll} className="btn btn-outline">
                  Clear All
                </button>
              </div>

              <div className="grid gap-4">
                {saved.map(startup => (
                  <Link key={startup.id} href={`/startups/${startup.id}`}>
                    <div className="p-6 bg-card border rounded-lg hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            {startup.isChampion && <span className="text-lg">🏆</span>}
                            <h3 className="text-xl font-bold">{startup.name}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">by {startup.founder}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">${(startup.revenue / 1000000).toFixed(1)}M</p>
                          <p className="text-sm text-muted-foreground">Revenue</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{startup.description}</p>
                      <div className="flex gap-4 text-xs">
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded">{startup.industry}</span>
                        <span className="px-2 py-1 bg-accent/10 text-accent rounded">{startup.stage}</span>
                        <span className="px-2 py-1 bg-secondary text-foreground rounded">{startup.country}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16 bg-card border rounded-lg">
              <p className="text-2xl font-bold mb-4">No saved startups yet</p>
              <p className="text-muted-foreground mb-6">Start exploring and save your favorite startups to track them here</p>
              <Link href="/startups" className="btn btn-primary">
                Browse Startups
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
