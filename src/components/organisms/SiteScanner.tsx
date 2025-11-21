'use client';
import { useState } from 'react';

interface SiteAnalysis {
  url: string;
  title: string;
  description: string;
  features: string[];
  pricing: string[];
  techStack: string[];
  architecture: any;
  cloningGuide: string[];
  rawContent: string;
}

interface SiteScannerProps {
  startupUrl?: string;
  onClose?: () => void;
}

export function SiteScanner({ startupUrl, onClose }: SiteScannerProps) {
  const [url, setUrl] = useState(startupUrl || '');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<SiteAnalysis | null>(null);
  const [error, setError] = useState('');

  const handleScan = async () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to scan website');
      }

      const data = await res.json();
      setAnalysis(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to scan website');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Scan Website for Cloning</h2>
          {onClose && (
            <button onClick={onClose} className="text-2xl hover:opacity-60">
              ✕
            </button>
          )}
        </div>

        <div className="p-6 space-y-6">
          {!analysis ? (
            <>
              <div>
                <label className="block text-sm font-semibold mb-2">Website URL</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="input flex-1"
                  />
                  <button onClick={handleScan} disabled={loading} className="btn btn-primary">
                    {loading ? 'Scanning...' : 'Scan'}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive">
                  {error}
                </div>
              )}

              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  💡 Enter any startup website URL to analyze its:
                </p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                  <li>• Tech stack (framework, styling, hosting)</li>
                  <li>• Core features and value propositions</li>
                  <li>• Pricing strategy</li>
                  <li>• Cloning roadmap and implementation steps</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div>
                <h3 className="text-xl font-bold mb-2">{analysis.title}</h3>
                <p className="text-muted-foreground mb-4">{analysis.description}</p>
                <a href={analysis.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                  {analysis.url}
                </a>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {analysis.techStack.length > 0 && (
                  <div className="p-4 bg-card border rounded-lg">
                    <h4 className="font-semibold mb-2">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.techStack.map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-primary/20 text-primary rounded text-xs font-semibold">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {analysis.features.length > 0 && (
                  <div className="p-4 bg-card border rounded-lg">
                    <h4 className="font-semibold mb-2">Key Features</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      {analysis.features.slice(0, 4).map((f, i) => (
                        <li key={i} className="truncate">
                          • {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysis.pricing.length > 0 && (
                  <div className="p-4 bg-card border rounded-lg">
                    <h4 className="font-semibold mb-2">Pricing</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      {analysis.pricing.map((p, i) => (
                        <li key={i} className="truncate">
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysis.architecture && (
                  <div className="p-4 bg-card border rounded-lg">
                    <h4 className="font-semibold mb-2">Architecture</h4>
                    <div className="text-sm space-y-1 text-muted-foreground">
                      {analysis.architecture.framework && <p>Framework: {analysis.architecture.framework}</p>}
                      {analysis.architecture.styling && <p>Styling: {analysis.architecture.styling}</p>}
                      {analysis.architecture.hosting && <p>Hosting: {analysis.architecture.hosting}</p>}
                      {analysis.architecture.cms && <p>CMS: {analysis.architecture.cms}</p>}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 bg-primary/10 rounded-lg">
                <h4 className="font-semibold mb-3">📋 Cloning Roadmap</h4>
                <div className="space-y-2 text-sm font-mono">
                  {analysis.cloningGuide.map((line, i) => (
                    <div key={i} className="text-muted-foreground">
                      {line}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => setAnalysis(null)} className="flex-1 btn btn-secondary">
                  Scan Another Site
                </button>
                {onClose && (
                  <button onClick={onClose} className="flex-1 btn btn-primary">
                    Close
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
