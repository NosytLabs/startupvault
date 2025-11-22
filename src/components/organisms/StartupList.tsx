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
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem', width: '100%' }}>
      {startups.map((startup) => (
        <div
          key={startup.id}
          onClick={() => router.push(`/startups/${startup.id}`)}
          style={{ 
            padding: '2rem', 
            borderRadius: '1.25rem', 
            border: '1px solid #e5e7eb',
            backgroundColor: '#fff',
            cursor: 'pointer',
            transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
            display: 'block',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.boxShadow = '0 24px 48px rgba(59, 130, 246, 0.25)';
            e.currentTarget.style.borderColor = '#3b82f6';
            e.currentTarget.style.backgroundColor = '#f8f9ff';
            e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)';
            e.currentTarget.style.borderColor = '#e5e7eb';
            e.currentTarget.style.backgroundColor = '#fff';
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
          }}
        >
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <h3 style={{
                fontWeight: 700,
                color: '#0f172a',
                fontSize: '1.125rem',
                lineHeight: 1.3,
                letterSpacing: '-0.5px'
              }}>{startup.name}</h3>
              {startup.ranking && startup.ranking <= 5 && <span style={{fontSize: '1.25rem'}}>🏆</span>}
            </div>
            <p style={{
              fontSize: '0.875rem',
              color: '#6b7280',
              marginBottom: '0.75rem',
              fontWeight: 500
            }}>by <span style={{fontWeight: 600}}>{startup.founder}</span></p>
            <p style={{
              fontSize: '0.9375rem',
              color: '#4b5563',
              lineHeight: 1.6,
              maxHeight: '3rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>{startup.description}</p>
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
