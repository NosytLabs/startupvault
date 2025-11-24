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
      <div className={className || 'space-y-3'}>
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="p-6 rounded-lg border border-border bg-muted/30 animate-pulse"
            style={{ animation: `fadeIn 0.4s ease-out ${i * 0.05}s backwards` }}
          >
            <div className="h-5 bg-muted rounded w-1/3 mb-3"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
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
    <div className={className || 'space-y-4'}>
      {startups.map((startup, idx) => (
        <div
          key={startup.id}
          onClick={() => router.push(`/startups/${startup.id}`)}
          className="p-6 border border-border rounded-lg bg-white hover:border-primary hover:shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:translate-y-[-4px]"
          style={{ animation: `slideUp 0.5s ease-out ${idx * 0.08}s backwards` }}
        >
          {/* Gradient top border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-t-lg opacity-0 hover:opacity-100 transition-opacity" />

          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-bold text-foreground">{startup.name}</h3>
              <p className="text-sm text-muted-foreground">@{startup.founder || 'Unknown'}</p>
            </div>
            {startup.ranking && (
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-semibold text-sm">#{startup.ranking}</span>
            )}
          </div>

          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{startup.description || 'No description'}</p>

          <div className="flex gap-2 flex-wrap">
            {startup.revenue !== undefined && (
              <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-semibold">
                Revenue: ${(startup.revenue / 1000000).toFixed(1)}M
              </span>
            )}
            {startup.mrr !== undefined && startup.mrr > 0 && (
              <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-semibold">
                MRR: ${(startup.mrr / 1000).toFixed(1)}K
              </span>
            )}
            {startup.stage && (
              <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-semibold">
                {startup.stage}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
