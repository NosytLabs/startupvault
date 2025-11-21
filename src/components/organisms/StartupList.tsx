'use client';
import { calculateCloneability } from '@/lib/cloneability';

interface Startup {
  id: string;
  name: string;
  description?: string;
  revenue?: number;
  mrr?: number;
  founder?: string;
  industry?: string;
  stage?: string;
  logo?: string;
}

interface StartupListProps {
  startups: Startup[];
  loading?: boolean;
  onStartupClick?: (id: string) => void;
  onClone?: (startup: Startup) => void;
  className?: string;
}

export function StartupList({ startups, loading, onStartupClick, onClone, className }: StartupListProps) {
  if (loading) {
    return <div className="text-center py-12 text-muted-foreground">Loading verified startups...</div>;
  }

  if (startups.length === 0) {
    return <div className="text-center py-12 text-muted-foreground">No startups found matching your criteria</div>;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {startups.map((startup) => {
        const score = calculateCloneability(startup);
        const scoreColor = score.overall >= 80 ? 'text-green-600' : score.overall >= 60 ? 'text-blue-600' : 'text-yellow-600';

        return (
          <div
            key={startup.id}
            className="p-6 rounded-lg border bg-card hover:shadow-lg transition group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="font-bold text-lg group-hover:text-primary transition">{startup.name}</h3>
                <p className="text-sm text-muted-foreground">{startup.description}</p>
              </div>
              <div className={`text-right ${scoreColor}`}>
                <p className="text-sm font-semibold">Cloneability</p>
                <p className="text-2xl font-bold">{score.overall}</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-4 text-sm">
              {startup.revenue ? (
                <div className="p-2 bg-primary/10 rounded">
                  <p className="text-xs text-muted-foreground">Revenue</p>
                  <p className="font-semibold">${(startup.revenue / 1000000).toFixed(1)}M</p>
                </div>
              ) : null}
              {startup.mrr ? (
                <div className="p-2 bg-accent/10 rounded">
                  <p className="text-xs text-muted-foreground">MRR</p>
                  <p className="font-semibold">${(startup.mrr / 1000).toFixed(0)}K</p>
                </div>
              ) : null}
              {startup.industry && (
                <div className="p-2 bg-secondary/10 rounded">
                  <p className="text-xs text-muted-foreground">Industry</p>
                  <p className="font-semibold text-xs">{startup.industry}</p>
                </div>
              )}
              {startup.stage && (
                <div className="p-2 bg-blue-100/10 rounded">
                  <p className="text-xs text-muted-foreground">Stage</p>
                  <p className="font-semibold text-xs">{startup.stage}</p>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onStartupClick?.(startup.id)}
                className="flex-1 btn btn-secondary text-sm"
              >
                View Details
              </button>
              <button onClick={() => onClone?.(startup)} className="flex-1 btn btn-primary text-sm">
                Clone This
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
