'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/molecules/Navbar';
import { Footer } from '@/components/layout/footer';
import { calculateCloneability } from '@/lib/cloneability';

export default function ComparePage() {
  const [startups, setStartups] = useState<any[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const res = await fetch('/api/startups?limit=100');
        if (res.ok) {
          const data = await res.json();
          setStartups(data);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, []);

  const selectedData = startups.filter((s) => selected.includes(s.id));

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">Compare Startups</h1>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="md:col-span-3">
              <label className="block text-sm font-semibold mb-2">Select Startups to Compare</label>
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
            <div className="bg-card border rounded-lg p-4">
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
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-bold">Startup</th>
                    <th className="text-right p-4 font-bold">Revenue</th>
                    <th className="text-right p-4 font-bold">MRR</th>
                    <th className="text-right p-4 font-bold">Industry</th>
                    <th className="text-right p-4 font-bold">Stage</th>
                    <th className="text-right p-4 font-bold">Clone Score</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedData.map((startup) => {
                    const score = calculateCloneability(startup);
                    return (
                      <tr key={startup.id} className="border-b hover:bg-secondary/30">
                        <td className="p-4">
                          <div>
                            <p className="font-bold">{startup.name}</p>
                            <p className="text-xs text-muted-foreground">{startup.description}</p>
                          </div>
                        </td>
                        <td className="text-right p-4 font-mono">${(startup.revenue / 1000000).toFixed(1)}M</td>
                        <td className="text-right p-4 font-mono">${(startup.mrr / 1000).toFixed(0)}K</td>
                        <td className="text-right p-4">{startup.industry}</td>
                        <td className="text-right p-4">{startup.stage}</td>
                        <td className="text-right p-4">
                          <span className="font-bold text-primary">{score.overall}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {selectedData.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>Select startups above to compare them side-by-side</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
