'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/molecules/Navbar';

export default function LeaderboardPage() {
  const router = useRouter();
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [champions, setChampions] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    Promise.all([
      fetch('/api/leaderboard').then(r => r.json()),
      fetch('/api/champions').then(r => r.json()),
      fetch('/api/countries').then(r => r.json()),
    ]).then(([lb, champ, ctry]) => {
      setLeaderboard(lb.leaderboard || []);
      setChampions(champ.champions || []);
      setCountries(ctry.countries || []);
      setLoading(false);
    });
  }, []);

  const filtered = selectedCountry
    ? leaderboard.filter(s => s.country === selectedCountry)
    : leaderboard;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="bg-gradient-to-br from-secondary/10 via-background to-secondary/5">
        <div className="container max-w-6xl mx-auto px-4 py-16">
          <div className="mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-3 text-foreground">TrustMRR Global Leaderboard</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              <span className="font-semibold text-primary">{leaderboard.length}</span> verified startups ranked by performance • <span className="font-semibold text-primary">{champions.length}</span> Champions
            </p>
          </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-card rounded-lg border p-6">
            <div className="text-3xl font-bold text-primary">{leaderboard.length}</div>
            <div className="text-sm text-muted-foreground">Total Verified Startups</div>
          </div>
          <div className="bg-card rounded-lg border p-6">
            <div className="text-3xl font-bold text-primary">{champions.length}</div>
            <div className="text-sm text-muted-foreground">Champion Status Startups</div>
          </div>
          <div className="bg-card rounded-lg border p-6">
            <div className="text-3xl font-bold text-primary">{countries.length}</div>
            <div className="text-sm text-muted-foreground">Countries Represented</div>
          </div>
        </div>

        {/* Champions Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">🏆 Champions (Top Performers)</h2>
          <div className="space-y-3">
            {champions.slice(0, 10).map((startup, idx) => (
              <div key={startup.id} className="bg-card rounded-lg border p-4 hover:border-primary/50 transition cursor-pointer" onClick={() => router.push(`/startups/${startup.id}`)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-xl font-bold text-primary w-8">{idx + 1}</div>
                    <div>
                      <div className="font-semibold">{startup.name}</div>
                      <div className="text-sm text-muted-foreground">{startup.founder} • {startup.country}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">${(startup.mrr || startup.revenue).toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">{startup.mrr ? 'MRR' : 'Revenue'}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter by Country */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-3">Filter by Country:</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCountry('')}
              className={`px-4 py-2 rounded-lg border transition ${!selectedCountry ? 'bg-primary text-white border-primary' : 'hover:border-primary/50'}`}
            >
              All Countries
            </button>
            {countries.map(country => (
              <button
                key={country.country}
                onClick={() => setSelectedCountry(country.country)}
                className={`px-4 py-2 rounded-lg border transition ${selectedCountry === country.country ? 'bg-primary text-white border-primary' : 'hover:border-primary/50'}`}
              >
                {country.country} ({country.count})
              </button>
            ))}
          </div>
        </div>

        {/* Full Leaderboard */}
        <div>
          <h2 className="text-2xl font-bold mb-4">📊 Full Leaderboard {selectedCountry && `- ${selectedCountry}`}</h2>
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
                          <div className="font-semibold">{startup.name}</div>
                          <div className="text-xs text-muted-foreground">{startup.industry}</div>
                        </td>
                        <td className="px-4 py-3 text-sm">{startup.founder}</td>
                        <td className="px-4 py-3 text-sm">{startup.country}</td>
                        <td className="px-4 py-3 text-right font-semibold">
                          ${(startup.mrr || startup.revenue).toLocaleString()}
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 rounded-full text-xs bg-primary/20 text-primary">
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
