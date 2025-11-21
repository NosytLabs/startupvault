'use client';

interface Startup {
  id: string;
  name: string;
  description?: string;
  revenue?: number;
  mrr?: number;
  logo?: string;
}

interface StartupListProps {
  startups: Startup[];
  loading?: boolean;
  onStartupClick?: (id: string) => void;
  className?: string;
}

export function StartupList({ startups, loading, onStartupClick, className }: StartupListProps) {
  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {startups.map((startup) => (
        <div
          key={startup.id}
          onClick={() => onStartupClick?.(startup.id)}
          className="p-6 rounded-lg border bg-card hover:bg-card/80 cursor-pointer transition"
        >
          <h3 className="font-semibold mb-2">{startup.name}</h3>
          {startup.description && <p className="text-sm text-muted-foreground mb-3">{startup.description}</p>}
          {startup.revenue && <p className="text-sm font-medium">${(startup.revenue / 1000000).toFixed(1)}M Revenue</p>}
          {startup.mrr && <p className="text-sm text-primary">${startup.mrr.toLocaleString()} MRR</p>}
        </div>
      ))}
    </div>
  );
}
