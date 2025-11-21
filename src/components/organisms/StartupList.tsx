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
      <div className={className || 'space-y-3'}>
        {[...Array(gridCols * 2)].map((_, i) => (
          <div key={i} className="p-4 rounded border border-border bg-card/50 animate-pulse">
            <div className="h-4 bg-muted rounded w-1/3 mb-3"></div>
            <div className="h-3 bg-muted rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!startups || startups.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl font-semibold text-foreground">No startups found</p>
        <p className="text-sm text-muted-foreground mt-2">Try a different search</p>
      </div>
    );
  }

  return (
    <div className={className || 'space-y-3'}>
      {startups.map((startup) => (
        <div
          key={startup.id}
          onClick={() => router.push(`/startups/${startup.id}`)}
          className="block p-5 rounded-lg border border-border bg-card hover:shadow-lg hover:border-primary/50 transition-all duration-300 cursor-pointer active:shadow-md hover:bg-card/80"
        >
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-bold text-foreground text-base leading-tight">{startup.name}</h3>
              {startup.ranking && startup.ranking <= 5 && <span className="text-lg animate-bounce" style={{animationDuration: '2s'}}>🏆</span>}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{startup.description}</p>
            <p className="text-xs text-muted-foreground mt-2">by <span className="font-medium">{startup.founder}</span></p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {startup.revenue && (
              <div className="p-3 rounded-md bg-gradient-to-br from-secondary/60 to-secondary/40 border border-border hover:from-secondary/80 hover:to-secondary/60 transition-colors">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Revenue</p>
                <p className="text-sm font-bold text-primary mt-1">${(startup.revenue / 1000000).toFixed(1)}M</p>
              </div>
            )}
            {startup.mrr && (
              <div className="p-3 rounded-md bg-gradient-to-br from-secondary/60 to-secondary/40 border border-border hover:from-secondary/80 hover:to-secondary/60 transition-colors">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">MRR</p>
                <p className="text-sm font-bold text-primary mt-1">${(startup.mrr / 1000).toFixed(0)}K</p>
              </div>
            )}
            {startup.industry && (
              <div className="p-3 rounded-md bg-gradient-to-br from-secondary/60 to-secondary/40 border border-border hover:from-secondary/80 hover:to-secondary/60 transition-colors">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Industry</p>
                <p className="text-sm font-bold text-foreground mt-1">{startup.industry}</p>
              </div>
            )}
            {startup.stage && (
              <div className="p-3 rounded-md bg-gradient-to-br from-secondary/60 to-secondary/40 border border-border hover:from-secondary/80 hover:to-secondary/60 transition-colors">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Stage</p>
                <p className="text-sm font-bold text-foreground mt-1">{startup.stage}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
