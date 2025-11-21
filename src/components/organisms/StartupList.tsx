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
    const gridCols = className?.includes('grid') ? 
      (className.includes('md:grid-cols-2') ? 2 : 3) : 1;
    return (
      <div className={className || 'space-y-4'}>
        {[...Array(gridCols * 2)].map((_, i) => (
          <div key={i} className="p-6 rounded-lg border bg-card animate-pulse">
            <div className="h-5 bg-secondary rounded w-1/3 mb-4"></div>
            <div className="h-3 bg-secondary rounded w-2/3 mb-3"></div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className="h-8 bg-secondary rounded"></div>
              ))}
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
      {startups.map((startup, index) => (
        <div
          key={startup.id}
          onClick={() => router.push(`/startups/${startup.id}`)}
          className="card p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300 cursor-pointer hover:scale-105 animate-slide-up"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-lg text-foreground">{startup.name}</h3>
                {startup.ranking && startup.ranking <= 5 && <span className="text-xl" title="Top 5 startup">🏆</span>}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{startup.description}</p>
              <p className="text-xs text-muted-foreground/70 mt-2">by <span className="font-semibold">{startup.founder}</span></p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 text-sm">
            {startup.revenue ? (
              <div className="p-3 bg-primary/5 hover:bg-primary/10 rounded-md transition">
                <p className="text-xs text-muted-foreground/80 font-medium">Revenue</p>
                <p className="font-bold text-primary mt-1">${(startup.revenue / 1000000).toFixed(1)}M</p>
              </div>
            ) : null}
            {startup.mrr ? (
              <div className="p-3 bg-accent/5 hover:bg-accent/10 rounded-md transition">
                <p className="text-xs text-muted-foreground/80 font-medium">MRR</p>
                <p className="font-bold text-accent mt-1">${(startup.mrr / 1000).toFixed(0)}K</p>
              </div>
            ) : null}
            {startup.industry && (
              <div className="p-3 bg-secondary/5 hover:bg-secondary/10 rounded-md transition">
                <p className="text-xs text-muted-foreground/80 font-medium">Industry</p>
                <p className="font-bold text-foreground text-xs mt-1">{startup.industry}</p>
              </div>
            )}
            {startup.stage && (
              <div className="p-3 bg-blue-500/5 hover:bg-blue-500/10 rounded-md transition">
                <p className="text-xs text-muted-foreground/80 font-medium">Stage</p>
                <p className="font-bold text-blue-400 text-xs mt-1">{startup.stage}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
