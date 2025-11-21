'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/molecules/Navbar';
import { Footer } from '@/components/layout/footer';
import { CloneModal } from '@/components/organisms/CloneModal';
import { SiteScanner } from '@/components/organisms/SiteScanner';
import { calculateCloneability } from '@/lib/cloneability';

export default function StartupDetailPage() {
  const params = useParams();
  const [startup, setStartup] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showClone, setShowClone] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    const fetchStartup = async () => {
      try {
        const res = await fetch(`/api/startups/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setStartup(data);
        }
      } catch (err) {
        console.error('Failed to fetch startup', err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchStartup();
  }, [params.id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!startup) return <div className="min-h-screen flex items-center justify-center">Startup not found</div>;

  const score = calculateCloneability(startup);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-4">{startup.name}</h1>
            <p className="text-xl text-muted-foreground mb-6">{startup.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="p-4 bg-card border rounded-lg">
                <p className="text-sm text-muted-foreground">Annual Revenue</p>
                <p className="text-2xl font-bold">${(startup.revenue / 1000000).toFixed(1)}M</p>
              </div>
              <div className="p-4 bg-card border rounded-lg">
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold">${(startup.mrr / 1000).toFixed(0)}K</p>
              </div>
              <div className="p-4 bg-card border rounded-lg">
                <p className="text-sm text-muted-foreground">Industry</p>
                <p className="text-xl font-bold">{startup.industry}</p>
              </div>
              <div className="p-4 bg-card border rounded-lg">
                <p className="text-sm text-muted-foreground">Stage</p>
                <p className="text-xl font-bold">{startup.stage}</p>
              </div>
            </div>

            <div className="p-6 bg-primary/10 rounded-lg mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">Cloneability Score</p>
                  <p className="text-4xl font-bold text-primary">{score.overall}/100</p>
                  <p className="text-muted-foreground mt-2">{score.description}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setShowClone(true)} className="btn btn-primary px-8 py-3 text-lg">
                    Clone Guide
                  </button>
                  <button onClick={() => setShowScanner(true)} className="btn btn-secondary px-8 py-3 text-lg">
                    Scan Website
                  </button>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Score Breakdown</h3>
                <div className="space-y-3">
                  {Object.entries(score.factors).map(([key, value]) => (
                    <div key={key}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="text-sm font-bold">{value}/20</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-primary rounded-full h-2" style={{ width: `${(value / 20) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Recommendations</h3>
                <ul className="space-y-2">
                  {score.recommendations.map((rec, i) => (
                    <li key={i} className="flex gap-3 p-3 bg-card rounded-lg">
                      <span className="text-primary font-bold">→</span>
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Founder</h3>
              <p className="text-lg font-semibold">{startup.founder || 'Unknown'}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {showClone && <CloneModal startup={startup} onClose={() => setShowClone(false)} />}
      {showScanner && <SiteScanner startupUrl={startup?.website} onClose={() => setShowScanner(false)} />}
    </>
  );
}
