'use client';

import { useState, Suspense } from 'react';
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
    limit: 100,
    sort: searchParams.get('sort') || 'recent',
    search: search || undefined,
    industry: industry || undefined,
  });

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-12 animate-fade-in-up">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold border border-primary/20">
              📊 Browse verified companies
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text-primary">
              Verified Startup Database
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Explore <span className="font-bold text-primary">{data.startups.length}</span> verified startups with <span className="font-bold text-primary">real revenue data</span> from TrustMRR.com. Real founders. Real MRR metrics.
            </p>
          </div>

          <StartupList
            startups={data.startups}
            loading={data.loading}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
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
