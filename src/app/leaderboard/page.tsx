'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { allTrustMRRStartups } from '@/lib/trustmrr-all-data';
import { Footer } from '@/components/layout/footer';

export default function LeaderboardPage() {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState('');

  const startups = allTrustMRRStartups;
  const sorted = [...startups].sort((a, b) => (a.ranking || 999) - (b.ranking || 999));

  const countryMap = new Map<string, number>();
  startups.forEach(s => {
    const country = s.country || 'Unknown';
    countryMap.set(country, (countryMap.get(country) || 0) + 1);
  });

  const countries = Array.from(countryMap.entries())
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count);

  const filtered = selectedCountry
    ? sorted.filter(s => s.country === selectedCountry)
    : sorted;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white via-green-50/20 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-12 animate-fade-in-up">
            <div className="inline-block mb-4 px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold border border-secondary/20">
              🏆 Global rankings
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text-primary">
              TrustMRR Global Leaderboard
            </h1>
            <p className="text-lg text-muted-foreground">
              <span className="font-semibold text-primary">{sorted.length}</span> verified startups ranked by performance
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="group p-8 bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/30 rounded-xl hover:shadow-xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
              <div className="text-xs font-semibold text-primary/70 mb-2 uppercase tracking-wider">Total Verified Startups</div>
              <div className="text-4xl font-bold text-primary group-hover:scale-105 transition-transform origin-left">{sorted.length}</div>
            </div>
            <div className="group p-8 bg-gradient-to-br from-accent/15 to-accent/5 border border-accent/30 rounded-xl hover:shadow-xl hover:border-accent/50 transition-all duration-300 hover:-translate-y-1">
              <div className="text-xs font-semibold text-accent/70 mb-2 uppercase tracking-wider">Countries Represented</div>
              <div className="text-4xl font-bold text-accent group-hover:scale-105 transition-transform origin-left">🌍 {countries.length}</div>
            </div>
            <div className="group p-8 bg-gradient-to-br from-secondary/15 to-secondary/5 border border-secondary/30 rounded-xl hover:shadow-xl hover:border-secondary/50 transition-all duration-300 hover:-translate-y-1">
              <div className="text-xs font-semibold text-secondary/70 mb-2 uppercase tracking-wider">Combined Revenue</div>
              <div className="text-4xl font-bold text-secondary group-hover:scale-105 transition-transform origin-left">${(sorted.reduce((sum, s) => sum + s.revenue, 0) / 1000000000).toFixed(1)}B</div>
            </div>
          </div>

          {/* Country Filter */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">🌍 Filter by Country</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCountry('')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${!selectedCountry ? 'btn btn-primary' : 'border border-border hover:border-primary/50'}`}
              >
                All Countries
              </button>
              {countries.map(country => (
                <button
                  key={country.country}
                  onClick={() => setSelectedCountry(country.country)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${selectedCountry === country.country ? 'btn btn-primary' : 'border border-border hover:border-primary/50'}`}
                >
                  {country.country} ({country.count})
                </button>
              ))}
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <table className="w-full">
              <thead className="table-header">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-foreground">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-foreground">Startup</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-foreground">Founder</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-foreground">Country</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-foreground">Revenue/MRR</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-foreground">Stage</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((startup) => (
                  <tr key={startup.id} className="table-row cursor-pointer" onClick={() => router.push(`/startups/${startup.id}`)}>
                    <td className="px-6 py-4 text-sm font-bold text-primary">{startup.ranking}</td>
                    <td className="px-6 py-4 text-sm font-bold text-foreground">{startup.name}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">@{startup.founder}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{startup.country}</td>
                    <td className="px-6 py-4 text-sm font-bold"><span className="text-accent">${startup.revenue ? (startup.revenue / 1000000).toFixed(1) : (startup.mrr / 1000).toFixed(1)}M</span></td>
                    <td className="px-6 py-4 text-sm"><span className="badge-secondary">{startup.stage}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
