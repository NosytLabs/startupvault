'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Footer } from '@/components/layout/footer';
import { allTrustMRRStartups } from '@/lib/trustmrr-all-data';
import { useFavorites } from '@/lib/useFavorites';

export default function StartupDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [saved, setSaved] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);

  const id = params.id as string;
  const startup = allTrustMRRStartups.find(s => s.id === id);

  if (!startup) {
    return (
      <>
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Startup not found</p>
            <Link href="/startups" className="text-primary hover:text-primary/80">Back to startups</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const relatedStartups = allTrustMRRStartups
    .filter(s => s.industry === startup.industry && s.id !== id)
    .slice(0, 3);

  const toggleSave = () => {
    if (isFavorite(id)) {
      removeFavorite(id);
      setSaved(false);
    } else {
      addFavorite(id);
      setSaved(true);
    }
  };

  const downloadDoc = async (docType: 'prd' | 'mvp' | 'tasks') => {
    setDownloading(docType);
    try {
      const response = await fetch('/api/docs/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startupId: startup.id, docType })
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${docType.toUpperCase()}-${startup.name.replace(/\s+/g, '-')}.md`;
        a.click();
      }
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloading(null);
    }
  };

  return (
    <>
      <main style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #eff6ff, #fff, #f5f3ff)'
      }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '3rem 1rem' }}>
          <Link href="/startups" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '2rem',
            color: '#3b82f6',
            textDecoration: 'none',
            fontWeight: 600,
            cursor: 'pointer'
          }}>
            <span>←</span> Back to Startups
          </Link>

          {/* Hero Card */}
          <div style={{
            background: 'linear-gradient(135deg, #eff6ff 0%, #f5f3ff 100%)',
            borderRadius: '1.25rem',
            border: '1px solid #dbeafe',
            padding: '2.5rem',
            marginBottom: '2rem',
            boxShadow: '0 8px 32px rgba(59, 130, 246, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem', fontWeight: 600 }}>
                  Rank #{startup.ranking}
                </div>
                <h1 style={{
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '0.5rem'
                }}>
                  {startup.name}
                </h1>
                <p style={{ fontSize: '1.125rem', color: '#4b5563', fontWeight: 500 }}>by {startup.founder}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {startup.isChampion && <div style={{ fontSize: '3rem' }}>🏆</div>}
                <button
                  onClick={toggleSave}
                  style={{
                    fontSize: '2.5rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    filter: saved ? 'brightness(1.1)' : 'brightness(0.9)'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  {saved ? '❤️' : '🤍'}
                </button>
              </div>
            </div>
            <p style={{ fontSize: '1.125rem', color: '#4b5563', lineHeight: 1.6 }}>{startup.description}</p>
          </div>

          {/* Key Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
              borderRadius: '1rem',
              padding: '1.5rem',
              border: '1px solid #93c5fd'
            }}>
              <div style={{ fontSize: '0.875rem', color: '#1e40af', fontWeight: 600, marginBottom: '0.5rem' }}>Revenue</div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#1e40af' }}>${(startup.revenue / 1000000).toFixed(1)}M</div>
            </div>
            {startup.mrr > 0 && (
            <div style={{
              background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
              borderRadius: '1rem',
              padding: '1.5rem',
              border: '1px solid #d8b4fe'
            }}>
              <div style={{ fontSize: '0.875rem', color: '#6d28d9', fontWeight: 600, marginBottom: '0.5rem' }}>MRR</div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#6d28d9' }}>${(startup.mrr / 1000000).toFixed(2)}M</div>
            </div>
            )}
            <div style={{
              background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
              borderRadius: '1rem',
              padding: '1.5rem',
              border: '1px solid #f472b6'
            }}>
              <div style={{ fontSize: '0.875rem', color: '#be185d', fontWeight: 600, marginBottom: '0.5rem' }}>Stage</div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#be185d' }}>{startup.stage}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)',
            borderRadius: '1.25rem',
            border: '2px solid #dbeafe',
            padding: '2rem',
            marginBottom: '2rem'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', color: '#0f172a' }}>Generate Build Documentation</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <button
                onClick={() => downloadDoc('prd')}
                disabled={downloading !== null}
                style={{
                  padding: '1rem 1.5rem',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0.75rem',
                  fontWeight: 700,
                  cursor: downloading ? 'not-allowed' : 'pointer',
                  fontSize: '1rem',
                  transition: 'all 0.3s',
                  opacity: downloading ? 0.7 : 1,
                  boxShadow: '0 8px 16px rgba(59, 130, 246, 0.3)'
                }}
                onMouseEnter={e => !downloading && (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                {downloading === 'prd' ? '⏳ Generating...' : '📄 Download PRD'}
              </button>
              <button
                onClick={() => downloadDoc('mvp')}
                disabled={downloading !== null}
                style={{
                  padding: '1rem 1.5rem',
                  background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0.75rem',
                  fontWeight: 700,
                  cursor: downloading ? 'not-allowed' : 'pointer',
                  fontSize: '1rem',
                  transition: 'all 0.3s',
                  opacity: downloading ? 0.7 : 1,
                  boxShadow: '0 8px 16px rgba(124, 58, 237, 0.3)'
                }}
                onMouseEnter={e => !downloading && (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                {downloading === 'mvp' ? '⏳ Generating...' : '🎯 Download MVP'}
              </button>
              <button
                onClick={() => downloadDoc('tasks')}
                disabled={downloading !== null}
                style={{
                  padding: '1rem 1.5rem',
                  background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0.75rem',
                  fontWeight: 700,
                  cursor: downloading ? 'not-allowed' : 'pointer',
                  fontSize: '1rem',
                  transition: 'all 0.3s',
                  opacity: downloading ? 0.7 : 1,
                  boxShadow: '0 8px 16px rgba(236, 72, 153, 0.3)'
                }}
                onMouseEnter={e => !downloading && (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                {downloading === 'tasks' ? '⏳ Generating...' : '✓ Download Tasks'}
              </button>
            </div>
          </div>

          {/* Business Info & Links */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{
              background: '#fff',
              borderRadius: '1rem',
              border: '1px solid #e5e7eb',
              padding: '1.5rem'
            }}>
              <h3 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '1.125rem', color: '#0f172a' }}>Business Info</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem' }}>
                <div><span style={{ color: '#6b7280' }}>Industry:</span> <span style={{ fontWeight: 600, color: '#0f172a' }}>{startup.industry}</span></div>
                <div><span style={{ color: '#6b7280' }}>Country:</span> <span style={{ fontWeight: 600, color: '#0f172a' }}>{startup.country}</span></div>
                <div><span style={{ color: '#6b7280' }}>Categories:</span> <span style={{ fontWeight: 600, color: '#0f172a' }}>{startup.categories?.join(', ') || 'N/A'}</span></div>
              </div>
            </div>
            <div style={{
              background: '#fff',
              borderRadius: '1rem',
              border: '1px solid #e5e7eb',
              padding: '1.5rem'
            }}>
              <h3 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '1.125rem', color: '#0f172a' }}>Links & Resources</h3>
              <a
                href={startup.website}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#3b82f6',
                  textDecoration: 'none',
                  fontWeight: 600,
                  transition: 'color 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#1e40af'}
                onMouseLeave={e => e.currentTarget.style.color = '#3b82f6'}
              >
                Visit Website →
              </a>
            </div>
          </div>

          {/* Related Startups */}
          {relatedStartups.length > 0 && (
            <div style={{
              background: '#fff',
              borderRadius: '1.25rem',
              border: '1px solid #e5e7eb',
              padding: '2rem'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#0f172a' }}>
                Similar {startup.industry} Startups
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {relatedStartups.map(s => (
                  <div
                    key={s.id}
                    onClick={() => router.push(`/startups/${s.id}`)}
                    style={{
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.75rem',
                      padding: '1rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#3b82f6';
                      e.currentTarget.style.backgroundColor = '#f8fafc';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.1)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = '#e5e7eb';
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, color: '#0f172a', marginBottom: '0.25rem' }}>{s.name}</div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{s.founder}</div>
                    </div>
                    <div style={{ textAlign: 'right', fontWeight: 600, color: '#3b82f6' }}>
                      ${((s.revenue || s.mrr) / 1000000).toFixed(1)}M
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
