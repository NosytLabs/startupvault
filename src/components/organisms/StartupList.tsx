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
          <div 
            key={i} 
            className="p-4 rounded border border-border bg-card/50 animate-pulse"
            style={{
              animation: `fadeIn 0.4s ease-out ${i * 0.05}s backwards`
            }}
          >
            <div className="h-4 bg-muted rounded w-1/3 mb-3"></div>
            <div className="h-3 bg-muted rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!startups || startups.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <p className="text-xl font-semibold text-foreground">No startups found</p>
        <p className="text-sm text-muted-foreground mt-2">Try a different search</p>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
      gap: '1.5rem', 
      width: '100%' 
    }}>
      {startups.map((startup, idx) => (
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
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            position: 'relative',
            overflow: 'hidden',
            animation: `slideUp 0.5s ease-out ${idx * 0.08}s backwards`
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
          {/* Gradient accent */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)',
            opacity: 0,
            transition: 'opacity 0.3s ease-out'
          }}
          onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.opacity = '1'}
          onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.opacity = '0'}
          />

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <h3 style={{
                fontWeight: 700,
                color: '#0f172a',
                fontSize: '1.125rem',
                lineHeight: 1.3,
                letterSpacing: '-0.5px'
              }}>{startup.name}</h3>
              {startup.ranking && startup.ranking <= 5 && <span style={{fontSize: '1.25rem', animation: 'scaleIn 0.4s ease-out'}}>🏆</span>}
            </div>
            <p style={{
              fontSize: '0.875rem',
              color: '#6b7280',
              marginBottom: '0.75rem',
              fontWeight: 500
            }}>by <span style={{fontWeight: 600, color: '#3b82f6'}}>{startup.founder}</span></p>
            <p style={{
              fontSize: '0.9375rem',
              color: '#4b5563',
              lineHeight: 1.6,
              maxHeight: '3rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}>{startup.description}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: '0.5rem' }}>
            {startup.revenue && startup.revenue > 0 && (
              <div style={{
                padding: '0.75rem',
                borderRadius: '0.5rem',
                background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                border: '1px solid #93c5fd',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '0.625rem',
                  color: '#1e40af',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  marginBottom: '0.25rem'
                }}>REVENUE</div>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: '#1e40af'
                }}>${(startup.revenue / 1000000).toFixed(1)}M</div>
              </div>
            )}
            {startup.mrr && startup.mrr > 0 && (
              <div style={{
                padding: '0.75rem',
                borderRadius: '0.5rem',
                background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
                border: '1px solid #d8b4fe',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '0.625rem',
                  color: '#6d28d9',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  marginBottom: '0.25rem'
                }}>MRR</div>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: '#6d28d9'
                }}>${((startup.mrr || 0) / 1000000).toFixed(2)}M</div>
              </div>
            )}
            {startup.stage && (
              <div style={{
                padding: '0.75rem',
                borderRadius: '0.5rem',
                background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
                border: '1px solid #f472b6',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '0.625rem',
                  color: '#be185d',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  marginBottom: '0.25rem'
                }}>STAGE</div>
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#be185d'
                }}>{startup.stage}</div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
