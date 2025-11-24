'use client';
import { useState } from 'react';
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

  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text-primary">
              Compare Startups
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Select multiple verified startups to analyze <span className="font-bold text-primary">side-by-side</span> and learn from their business models
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6 mb-12">
            <div className="lg:col-span-3">
              <label className="block text-sm font-semibold mb-3">Search & Select Startups (Max 5)</label>
              <input
                type="text"
                placeholder="Search startups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-12 px-4 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary mb-3"
              />
              <div className="bg-slate-50 border border-border rounded-lg p-4 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {filteredStartups.map((startup) => (
                    <label key={startup.id} className="flex items-start gap-2 p-2 hover:bg-primary/10 rounded cursor-pointer transition">
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

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 h-fit sticky top-20">
              <p className="text-sm text-muted-foreground mb-1">Selected</p>
              <p className="text-4xl font-bold text-primary mb-4">{selected.length}/5</p>
              {selectedData.length > 0 && (
                <div className="space-y-3 mb-4 pb-4 border-b border-border text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Combined Revenue</p>
                    <p className="font-bold text-lg text-accent">${(totalRevenue / 1000000).toFixed(1)}M</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Combined MRR</p>
                    <p className="font-bold text-lg text-secondary">${(totalMRR / 1000000).toFixed(2)}M</p>
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
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="p-4 text-left font-semibold">Startup</th>
                    <th className="p-4 text-right font-semibold">Revenue</th>
                    <th className="p-4 text-right font-semibold">MRR</th>
                    <th className="p-4 text-left font-semibold">Industry</th>
                    <th className="p-4 text-left font-semibold">Stage</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedData.map((startup) => (
                    <tr key={startup.id} className="border-b border-border hover:bg-muted/30 transition">
                      <td className="p-4 font-medium">{startup.name}</td>
                      <td className="p-4 text-right text-accent font-semibold">${(startup.revenue / 1000000).toFixed(1)}M</td>
                      <td className="p-4 text-right text-secondary font-semibold">${(startup.mrr / 1000).toFixed(0)}K</td>
                      <td className="p-4">{startup.industry}</td>
                      <td className="p-4"><span className="px-2 py-1 bg-secondary/10 text-secondary rounded-full text-xs">{startup.stage}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
