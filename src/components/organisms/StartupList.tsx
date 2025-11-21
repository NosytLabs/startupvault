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
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 rounded-lg border bg-card animate-pulse">
            <div className="h-4 bg-secondary rounded w-1/3 mb-3"></div>
            <div className="h-3 bg-secondary rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (startups.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-2xl font-bold text-foreground mb-2">No startups found</p>
        <p className="text-muted-foreground">Try a different search or filter</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {startups.map((startup) => (
        <div
          key={startup.id}
          onClick={() => router.push(`/startups/${startup.id}`)}
          className="p-6 rounded-lg border bg-card hover:shadow-lg transition cursor-pointer hover:border-primary/50"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-lg">{startup.name}</h3>
                {startup.ranking && startup.ranking <= 5 && <span className="text-xl">⭐</span>}
              </div>
              <p className="text-sm text-muted-foreground">{startup.description}</p>
              <p className="text-xs text-muted-foreground mt-1">by {startup.founder}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 text-sm">
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
        </div>
      ))}
    </div>
  );
}
