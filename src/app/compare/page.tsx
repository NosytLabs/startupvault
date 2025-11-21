'use client';
import { useState, useEffect } from 'react';
import { Footer } from '@/components/layout/footer';
import { allTrustMRRStartups } from '@/lib/trustmrr-all-data';

export default function ComparePage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const startups = allTrustMRRStartups;
  const selectedData = startups.filter((s) => selected.includes(s.id));
  const filteredStartups = startups.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const totalRevenue = selectedData.reduce((sum, s) => sum + s.revenue, 0);
  const totalMRR = selectedData.reduce((sum, s) => sum + s.mrr, 0);
  const avgRevenue = selectedData.length ? totalRevenue / selectedData.length : 0;

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-3">Compare Startups</h1>
            <p className="text-lg text-muted-foreground">Select multiple verified startups to analyze side-by-side and learn from their business models</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6 mb-12">
            <div className="lg:col-span-3">
              <label className="block text-sm font-semibold mb-3">Search & Select Startups</label>
              <input
                type="text"
                placeholder="Search startups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input w-full mb-3"
              />
              <div className="bg-card border rounded-lg p-4 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {filteredStartups.map((startup) => (
                    <label key={startup.id} className="flex items-start gap-2 p-2 hover:bg-primary/5 rounded cursor-pointer transition">
                      <input
                        type="checkbox"
                        checked={selected.includes(startup.id)}
                        onChange={(e) => {
                          if (e.target.checked && selected.length < 5) {
                            setSelected([...selected, startup.id]);
                          } else if (!e.target.checked) {
                            setSelected(selected.filter((id) => id !== startup.id));
                          }
                        }}
                        disabled={selected.length >= 5 && !selected.includes(startup.id)}
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{startup.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{startup.industry}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-6 h-fit sticky top-4">
              <p className="text-sm text-muted-foreground mb-1">Selected</p>
              <p className="text-4xl font-bold text-primary mb-4">{selected.length}/5</p>
              {selectedData.length > 0 && (
                <div className="space-y-3 mb-4 pb-4 border-b border-border text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Combined Revenue</p>
                    <p className="font-bold text-lg">${(totalRevenue / 1000000).toFixed(1)}M</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Combined MRR</p>
                    <p className="font-bold text-lg">${(totalMRR / 1000000).toFixed(2)}M</p>
                  </div>
                </div>
              )}
              <button
                onClick={() => setSelected([])}
                className="w-full btn btn-secondary text-sm"
              >
                Clear Selection
              </button>
            </div>
          </div>

          {selectedData.length > 0 && (
            <div className="space-y-4">
              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/50 border-b sticky top-0">
                    <tr>
                      <th className="p-4 text-left font-semibold">Startup</th>
                      <th className="p-4 text-right font-semibold">Revenue</th>
                      <th className="p-4 text-right font-semibold">MRR</th>
                      <th className="p-4 text-left font-semibold">Industry</th>
                      <th className="p-4 text-left font-semibold">Stage</th>
                      <th className="p-4 text-left font-semibold">Founder</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedData.map((startup) => (
                      <tr key={startup.id} className="border-b hover:bg-secondary/20 transition">
                        <td className="p-4 font-semibold flex items-center gap-2">
                          {startup.isChampion && <span className="text-lg">🏆</span>}
                          {startup.name}
                        </td>
                        <td className="p-4 text-right font-bold text-primary">${(startup.revenue / 1000000).toFixed(1)}M</td>
                        <td className="p-4 text-right font-bold text-accent">${(startup.mrr / 1000000).toFixed(2)}M</td>
                        <td className="p-4">{startup.industry}</td>
                        <td className="p-4">
                          <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                            {startup.stage}
                          </span>
                        </td>
                        <td className="p-4 text-muted-foreground">{startup.founder}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-lg p-6">
                <h3 className="font-bold mb-4">Comparison Summary</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold text-primary">${(totalRevenue / 1000000).toFixed(1)}M</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Average Revenue/Company</p>
                    <p className="text-2xl font-bold text-accent">${(avgRevenue / 1000000).toFixed(1)}M</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total MRR</p>
                    <p className="text-2xl font-bold text-primary">${(totalMRR / 1000000).toFixed(2)}M</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selected.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">👈 Select 1-5 startups to compare their metrics</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
