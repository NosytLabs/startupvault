'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Footer } from '@/components/layout/footer';
import { StartupList } from '@/components/organisms/StartupList';
import { CloneModal } from '@/components/organisms/CloneModal';
import { useStartupData } from '@/shared/hooks/useStartupData';

function StartupsContent() {
  const searchParams = useSearchParams();
  const [cloneStartup, setCloneStartup] = useState<any>(null);

  const search = searchParams.get('search') || '';
  const industry = searchParams.get('industry') || '';

  const data = useStartupData({
    limit: 50,
    sort: searchParams.get('sort') || 'recent',
    search: search || undefined,
    industry: industry || undefined,
  });

  return (
    <>
      <div style={{ background: 'linear-gradient(to bottom right, #f8fbf8 0%, #ffffff 50%, #f8f9fc 100%)' }} className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-16 animate-fade-in">
            <h1 style={{
              fontSize: 'clamp(2rem, 6vw, 3rem)',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #1a3a52 0%, #ff6b35 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem'
            }}>Verified Startup Database</h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
              Explore <span className="font-bold text-primary text-2xl">{data.startups.length}</span> verified startups with <span className="font-bold text-primary">real revenue data</span> from TrustMRR.com
            </p>
          </div>

          <StartupList
            startups={data.startups}
            loading={data.loading}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          />
        </div>
      </div>
      <Footer />
      {cloneStartup && <CloneModal startup={cloneStartup} onClose={() => setCloneStartup(null)} />}
    </>
  );
}

export default function StartupsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading startups...</div>}>
      <StartupsContent />
    </Suspense>
  );
}
