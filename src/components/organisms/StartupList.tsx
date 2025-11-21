'use client';
import { useRouter } from 'next/navigation';

interface Startup {
  id: string;
  name: string;
  description?: string;
  revenue?: number;
  mrr?: number;
  founder?: string;
  industry?: string;
  stage?: string;
  ranking?: number;
}

interface StartupListProps {
  startups: Startup[];
  loading?: boolean;
  className?: string;
}

export function StartupList({ startups, loading, className }: StartupListProps) {
  const router = useRouter();

  if (loading) {
    const gridCols = className?.includes('grid') ? 2 : 1;
    return (
      <div className={className || 'space-y-4'}>
        {[...Array(gridCols * 2)].map((_, i) => (
          <div key={i} className="p-6 rounded-lg border border-border bg-card animate-pulse">
            <div className="h-5 bg-muted rounded w-1/3 mb-4"></div>
            <div className="h-3 bg-muted rounded w-2/3 mb-3"></div>
            <div className="flex gap-3 mt-4">
              <div className="h-8 bg-muted rounded w-24"></div>
              <div className="h-8 bg-muted rounded w-24"></div>
              <div className="h-8 bg-muted rounded w-24"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (startups.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-2xl font-bold text-foreground mb-3">No startups found</p>
        <p className="text-muted-foreground">Try a different search or filter</p>
      </div>
    );
  }

  return (
    <div className={className || 'space-y-4'}>
      {startups.map((startup) => (
        <div
          key={startup.id}
          onClick={() => router.push(`/startups/${startup.id}`)}
          className="p-6 rounded-lg border border-border bg-card hover:shadow-lg hover:border-primary transition-all duration-200 cursor-pointer"
        >
          <div className="mb-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-foreground">{startup.name}</h3>
                {startup.ranking && startup.ranking <= 5 && <span className="text-xl">🏆</span>}
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">{startup.description}</p>
            <p className="text-xs text-muted-foreground">by {startup.founder}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {startup.revenue && (
              <div className="p-3 rounded-md bg-slate-100 dark:bg-slate-800">
                <p className="text-xs font-semibold text-muted-foreground">Revenue</p>
                <p className="text-sm font-bold text-primary mt-1">${(startup.revenue / 1000000).toFixed(1)}M</p>
              </div>
            )}
            {startup.mrr && (
              <div className="p-3 rounded-md bg-slate-100 dark:bg-slate-800">
                <p className="text-xs font-semibold text-muted-foreground">MRR</p>
                <p className="text-sm font-bold text-primary mt-1">${(startup.mrr / 1000).toFixed(0)}K</p>
              </div>
            )}
            {startup.industry && (
              <div className="p-3 rounded-md bg-slate-100 dark:bg-slate-800">
                <p className="text-xs font-semibold text-muted-foreground">Industry</p>
                <p className="text-sm font-bold text-foreground mt-1">{startup.industry}</p>
              </div>
            )}
            {startup.stage && (
              <div className="p-3 rounded-md bg-slate-100 dark:bg-slate-800">
                <p className="text-xs font-semibold text-muted-foreground">Stage</p>
                <p className="text-sm font-bold text-foreground mt-1">{startup.stage}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
