'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/molecules/Navbar';
import { Footer } from '@/components/layout/footer';
import { allTrustMRRStartups } from '@/lib/trustmrr-all-data';

export default function ComparePage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const startups = allTrustMRRStartups;
  const selectedData = startups.filter((s) => selected.includes(s.id));

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-2">Compare Startups</h1>
          <p className="text-muted-foreground mb-8">Select multiple startups to compare their metrics side-by-side</p>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="md:col-span-3">
              <label className="block text-sm font-semibold mb-2">Select Startups</label>
              <div className="grid grid-cols-2 gap-2 bg-card border rounded-lg p-4 max-h-96 overflow-y-auto">
                {startups.map((startup) => (
                  <label key={startup.id} className="flex items-center gap-2 p-2 hover:bg-secondary/30 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selected.includes(startup.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelected([...selected, startup.id]);
                        } else {
                          setSelected(selected.filter((id) => id !== startup.id));
                        }
                      }}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">{startup.name}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="bg-card border rounded-lg p-4 h-fit">
              <p className="text-sm text-muted-foreground">Selected</p>
              <p className="text-3xl font-bold">{selected.length}</p>
              <button
                onClick={() => setSelected([])}
                className="w-full mt-4 btn btn-secondary text-sm"
              >
                Clear
              </button>
            </div>
          </div>

          {selectedData.length > 0 && (
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50 border-b">
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
                    <tr key={startup.id} className="border-b hover:bg-secondary/20">
                      <td className="p-4 font-semibold">{startup.name}</td>
                      <td className="p-4 text-right">${(startup.revenue / 1000000).toFixed(1)}M</td>
                      <td className="p-4 text-right">${(startup.mrr / 1000000).toFixed(2)}M</td>
                      <td className="p-4">{startup.industry}</td>
                      <td className="p-4">{startup.stage}</td>
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
