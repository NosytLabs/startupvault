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
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card rounded-lg border p-6">
            <h3 className="font-bold mb-4">Business Info</h3>
            <div className="space-y-3 text-sm">
              <div><span className="text-muted-foreground">Industry:</span> <span className="font-semibold">{startup.industry}</span></div>
              <div><span className="text-muted-foreground">Country:</span> <span className="font-semibold">{startup.country}</span></div>
              <div><span className="text-muted-foreground">Categories:</span> <span className="font-semibold">{startup.categories?.join(', ')}</span></div>
            </div>
          </div>
          <div className="bg-card rounded-lg border p-6">
            <h3 className="font-bold mb-4">Links</h3>
            <div className="space-y-2">
              <a href={startup.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:text-primary/80">
                Visit Website <span>→</span>
              </a>
              <a href={`https://trustmrr.com/founder/${startup.founder}`} target="_blank" rel="noopener noreferrer" className="block text-primary hover:text-primary/80 text-sm">
                View on TrustMRR <span>→</span>
              </a>
            </div>
          </div>
        </div>

        {relatedStartups.length > 0 && (
          <div className="bg-card rounded-lg border p-8">
            <h2 className="text-2xl font-bold mb-6">Similar {startup.industry} Startups</h2>
            <div className="grid gap-4">
              {relatedStartups.map(s => (
                <div
                  key={s.id}
                  className="border rounded-lg p-4 hover:bg-secondary/50 transition cursor-pointer"
                  onClick={() => router.push(`/startups/${s.id}`)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{s.name}</div>
                      <div className="text-sm text-muted-foreground">{s.founder}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${(s.revenue || s.mrr) / 1000000 > 1 ? `${(s.revenue || s.mrr) / 1000000}M` : `${((s.revenue || s.mrr) / 1000).toFixed(1)}K`}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
