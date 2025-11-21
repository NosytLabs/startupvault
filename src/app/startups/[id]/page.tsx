'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { completeTrustMRRStartups, calculateCloneabilityScore } from '@/lib/trustmrr-complete-data';

export default function StartupDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [startup, setStartup] = useState<any>(null);
  const [cloneScore, setCloneScore] = useState(0);
  const [relatedStartups, setRelatedStartups] = useState<any[]>([]);

  useEffect(() => {
    const id = params.id as string;
    const found = completeTrustMRRStartups.find(s => s.id === id);
    if (found) {
      setStartup(found);
      const score = calculateCloneabilityScore(found);
      setCloneScore(score);
      
      const related = completeTrustMRRStartups
        .filter(s => s.industry === found.industry && s.id !== id)
        .slice(0, 3);
      setRelatedStartups(related);
    }
  }, [params.id]);

  if (!startup) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Startup not found</p>
          <Link href="/" className="text-primary hover:text-primary/80">Back to home</Link>
        </div>
      </main>
    );
  }

  const scoreColor = cloneScore >= 80 ? 'text-green-600' : cloneScore >= 60 ? 'text-yellow-600' : 'text-orange-600';
  const progressColor = cloneScore >= 80 ? 'bg-green-600' : cloneScore >= 60 ? 'bg-yellow-600' : 'bg-orange-600';

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 mb-8 text-primary hover:text-primary/80">
          <span>←</span> Back to Startups
        </Link>

        <div className="bg-card rounded-lg border p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="text-sm text-muted-foreground mb-2">Rank #{startup.ranking}</div>
              <h1 className="text-4xl font-bold mb-2">{startup.name}</h1>
              <p className="text-lg text-muted-foreground">by {startup.founder}</p>
            </div>
            {startup.isChampion && <div className="text-5xl">🏆</div>}
          </div>
          <p className="text-lg mb-6">{startup.description}</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-2">Revenue</div>
              <div className="text-2xl font-bold">${(startup.revenue / 1000000).toFixed(1)}M</div>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-2">MRR</div>
              <div className="text-2xl font-bold">${(startup.mrr / 1000000).toFixed(2)}M</div>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-2">Stage</div>
              <div className="text-2xl font-bold">{startup.stage}</div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">AI Cloneability Score</h2>
          <div className="flex items-center gap-8">
            <div className="text-center">
              <div className={`text-6xl font-bold ${scoreColor}`}>{cloneScore}</div>
              <div className="text-sm text-muted-foreground mt-2">/100</div>
            </div>
            <div className="flex-1">
              <div className="w-full bg-secondary rounded-full h-4 overflow-hidden">
                <div className={`h-full ${progressColor} transition-all`} style={{ width: `${cloneScore}%` }}></div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                {cloneScore >= 80 ? "Highly cloneable - Strong business model" : cloneScore >= 60 ? "Moderately cloneable - Good opportunity" : "Cloneable - Custom approach needed"}
              </p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setShowClone(true)} className="btn btn-primary px-6 py-3">
                    Clone Guide
                  </button>
                  <button onClick={() => setShowScanner(true)} className="btn btn-secondary px-6 py-3">
                    Scan Website
                  </button>
                  <button onClick={() => setShowDocGen(true)} className="btn btn-accent px-6 py-3">
                    📄 Download Build Docs
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
      {showDocGen && <DocGenerator startup={startup} onClose={() => setShowDocGen(false)} />}
    </>
  );
}
