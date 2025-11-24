'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { allTrustMRRStartups } from '@/lib/trustmrr-all-data';

export default function LeaderboardPage() {
  const router = useRouter();
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    const startups = allTrustMRRStartups;
    
    const sorted = [...startups].sort((a, b) => (a.ranking || 999) - (b.ranking || 999));
    setLeaderboard(sorted);

    const countryMap = new Map<string, number>();
    startups.forEach(s => {
      const country = s.country || 'Unknown';
      countryMap.set(country, (countryMap.get(country) || 0) + 1);
    });

    const countryList = Array.from(countryMap.entries())
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count);

    setCountries(countryList);
    setLoading(false);
  }, []);

  const filtered = selectedCountry
    ? leaderboard.filter(s => s.country === selectedCountry)
    : leaderboard;

  return (
    <div className="min-h-screen">
      <main className="bg-gradient-to-br from-secondary/10 via-background to-secondary/5">
        <div className="container max-w-6xl mx-auto px-4 py-16">
          <div className="mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-3 text-foreground">TrustMRR Global Leaderboard</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              <span className="font-semibold text-primary">{leaderboard.length}</span> verified startups ranked by performance
            </p>
          </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 hover:shadow-lg transition-all">
            <div className="text-4xl font-bold text-blue-600 mb-2">{leaderboard.length}</div>
            <div className="text-sm text-muted-foreground">Total Verified Startups</div>
          </div>
          <div className="p-8 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 hover:shadow-lg transition-all">
            <div className="text-4xl font-bold text-purple-600 mb-2">🌍 {countries.length}</div>
            <div className="text-sm text-muted-foreground">Countries Represented</div>
          </div>
          <div className="p-8 rounded-lg bg-gradient-to-br from-pink-500/10 to-pink-600/10 border border-pink-500/20 hover:shadow-lg transition-all">
            <div className="text-4xl font-bold text-pink-600 mb-2">${(leaderboard.reduce((sum, s) => sum + s.revenue, 0) / 1000000000).toFixed(1)}B</div>
            <div className="text-sm text-muted-foreground">Combined Revenue</div>
          </div>
        </div>

        {/* Filter by Country */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">🌍 Filter by Country</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCountry('')}
              className={`px-4 py-2.5 rounded-lg border font-semibold transition-all duration-300 ${!selectedCountry ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30 scale-105' : 'border-border hover:border-primary/50'}`}
            >
              All Countries
            </button>
            {countries.map(country => (
              <button
                key={country.country}
                onClick={() => setSelectedCountry(country.country)}
                className={`px-4 py-2.5 rounded-lg border font-semibold transition-all duration-300 ${selectedCountry === country.country ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30 scale-105' : 'border-border hover:border-primary/50'}`}
              >
                {country.country} ({country.count})
              </button>
            ))}
          </div>
        </div>

        {/* Full Leaderboard */}
        <div>
          <h2 className="text-3xl font-bold mb-6">📊 Full Leaderboard {selectedCountry && `- ${selectedCountry}`}</h2>
          <div className="space-y-2">
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : (
              <div className="overflow-x-auto bg-card rounded-lg border">
                <table className="w-full text-sm">
                  <thead className="border-b bg-secondary/50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Rank</th>
                      <th className="px-4 py-3 text-left font-semibold">Startup</th>
                      <th className="px-4 py-3 text-left font-semibold">Founder</th>
                      <th className="px-4 py-3 text-left font-semibold">Country</th>
                      <th className="px-4 py-3 text-right font-semibold">Revenue/MRR</th>
                      <th className="px-4 py-3 text-left font-semibold">Stage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((startup, idx) => (
                      <tr
                        key={startup.id}
                        className="border-b hover:bg-secondary/50 cursor-pointer transition"
                        onClick={() => router.push(`/startups/${startup.id}`)}
                      >
                        <td className="px-4 py-3 font-semibold text-primary">{startup.ranking}</td>
                        <td className="px-4 py-3">
                          <div className="font-semibold flex items-center gap-2">
                            {startup.isChampion && <span>🏆</span>}
                            {startup.name}
                          </div>
                          <div className="text-xs text-muted-foreground">{startup.industry}</div>
                        </td>
                        <td className="px-4 py-3 text-sm">{startup.founder}</td>
                        <td className="px-4 py-3 text-sm">{startup.country}</td>
                        <td className="px-4 py-3 text-right font-semibold">
                          ${(Math.max(startup.mrr || 0, startup.revenue || 0) / 1000000).toFixed(1)}M
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 rounded-full text-xs bg-primary/20 text-primary font-medium">
                            {startup.stage}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}
