'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function ChampionsPage() {
  const router = useRouter();
  const [champions, setChampions] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/champions').then(r => r.json()),
      fetch('/api/leaderboard').then(r => r.json()),
    ]).then(([champ, board]) => {
      const champs = champ.champions || [];
      setChampions(champs);
      setStats({
        totalMRR: champs.reduce((sum: number, s: any) => sum + s.mrr, 0),
        totalRevenue: champs.reduce((sum: number, s: any) => sum + s.revenue, 0),
        avgCloneability: 75,
      });
      setLoading(false);
    });
  }, []);

  const chartData = champions.map(s => ({
    name: s.name.substring(0, 12),
    MRR: s.mrr ? s.mrr / 1000000 : 0,
    Revenue: s.revenue ? s.revenue / 1000000 : 0,
  }));

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 mb-8 text-primary hover:text-primary/80">
          <span>←</span> Back to Home
        </Link>

        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">🏆 Champion Startups</h1>
          <p className="text-xl text-muted-foreground">Top performers verified on TrustMRR with proven business models</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg border border-blue-500/20 p-8">
            <div className="text-sm text-muted-foreground mb-2">Champions</div>
            <div className="text-4xl font-bold text-blue-600">{champions.length}</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-lg border border-purple-500/20 p-8">
            <div className="text-sm text-muted-foreground mb-2">Combined MRR</div>
            <div className="text-3xl font-bold text-purple-600">${(stats.totalMRR / 1000000).toFixed(1)}M</div>
          </div>
          <div className="bg-gradient-to-br from-pink-500/10 to-pink-600/10 rounded-lg border border-pink-500/20 p-8">
            <div className="text-sm text-muted-foreground mb-2">Combined Revenue</div>
            <div className="text-3xl font-bold text-pink-600">${(stats.totalRevenue / 1000000).toFixed(0)}M</div>
          </div>
        </div>

        {/* Charts */}
        {!loading && champions.length > 0 && (
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-card rounded-lg border p-6">
              <h2 className="text-xl font-bold mb-4">MRR vs Revenue</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(val: number) => `$${val.toFixed(1)}M`} />
                  <Legend />
                  <Bar dataKey="MRR" fill="#3b82f6" />
                  <Bar dataKey="Revenue" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card rounded-lg border p-6">
              <h2 className="text-xl font-bold mb-4">Champion Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={champions.map((s, i) => ({ name: s.name.substring(0, 10), value: s.revenue || s.mrr }))}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {champions.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val: number) => `$${(val / 1000000).toFixed(1)}M`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Champion Cards */}
        <div>
          <h2 className="text-2xl font-bold mb-6">All Champions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {loading ? (
              <div className="text-center py-12 text-muted-foreground">Loading champions...</div>
            ) : (
              champions.map((startup, idx) => (
                <div
                  key={startup.id}
                  className="bg-card rounded-lg border p-6 hover:border-primary/50 transition cursor-pointer hover:shadow-lg"
                  onClick={() => router.push(`/startups/${startup.id}`)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl font-bold text-primary">#{startup.ranking}</span>
                        <span className="text-3xl">🏆</span>
                      </div>
                      <h3 className="text-lg font-bold">{startup.name}</h3>
                      <p className="text-sm text-muted-foreground">{startup.founder}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{startup.description}</p>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <div className="text-xs text-muted-foreground">Revenue</div>
                      <div className="font-bold">${(startup.revenue / 1000000).toFixed(1)}M</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">MRR</div>
                      <div className="font-bold">${(startup.mrr / 1000000).toFixed(2)}M</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
