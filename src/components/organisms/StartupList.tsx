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
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', width: '100%' }}>
      {startups.map((startup) => (
        <div
          key={startup.id}
          onClick={() => router.push(`/startups/${startup.id}`)}
          style={{ 
            padding: '1.5rem', 
            borderRadius: '0.75rem', 
            border: '1px solid #ddd',
            backgroundColor: '#fff',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'block',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
            e.currentTarget.style.borderColor = '#3b82f6';
            e.currentTarget.style.backgroundColor = '#f8fafc';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
            e.currentTarget.style.borderColor = '#ddd';
            e.currentTarget.style.backgroundColor = '#fff';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-bold text-foreground text-base leading-tight">{startup.name}</h3>
              {startup.ranking && startup.ranking <= 5 && <span className="text-lg animate-bounce" style={{animationDuration: '2s'}}>🏆</span>}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{startup.description}</p>
            <p className="text-xs text-muted-foreground mt-2">by <span className="font-medium">{startup.founder}</span></p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {startup.revenue && (
              <div style={{ padding: '0.75rem', borderRadius: '0.5rem', background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', border: '1px solid #bfdbfe', transition: 'all 0.2s' }} onMouseOver={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)'; }}>
                <p style={{ fontSize: '0.625rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Revenue</p>
                <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#3b82f6', marginTop: '0.25rem' }}>${(startup.revenue / 1000000).toFixed(1)}M</p>
              </div>
            )}
            {startup.mrr && (
              <div style={{ padding: '0.75rem', borderRadius: '0.5rem', background: 'linear-gradient(135deg, #fef3c7 0%, #fcd34d 100%)', border: '1px solid #fbbf24', transition: 'all 0.2s' }} onMouseOver={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, #fcd34d 0%, #fbbf24 100%)'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, #fef3c7 0%, #fcd34d 100%)'; }}>
                <p style={{ fontSize: '0.625rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>MRR</p>
                <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#f59e0b', marginTop: '0.25rem' }}>${(startup.mrr / 1000).toFixed(0)}K</p>
              </div>
            )}
            {startup.industry && (
              <div style={{ padding: '0.75rem', borderRadius: '0.5rem', background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)', border: '1px solid #a5b4fc', transition: 'all 0.2s' }} onMouseOver={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, #c7d2fe 0%, #a5b4fc 100%)'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)'; }}>
                <p style={{ fontSize: '0.625rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Industry</p>
                <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#4f46e5', marginTop: '0.25rem' }}>{startup.industry}</p>
              </div>
            )}
            {startup.stage && (
              <div style={{ padding: '0.75rem', borderRadius: '0.5rem', background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)', border: '1px solid #d8b4fe', transition: 'all 0.2s' }} onMouseOver={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, #e9d5ff 0%, #d8b4fe 100%)'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)'; }}>
                <p style={{ fontSize: '0.625rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Stage</p>
                <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#9333ea', marginTop: '0.25rem' }}>{startup.stage}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
