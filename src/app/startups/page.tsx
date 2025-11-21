'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/molecules/Navbar';
import { Footer } from '@/components/layout/footer';
import { StartupList } from '@/components/organisms/StartupList';
import { CloneModal } from '@/components/organisms/CloneModal';
import { useStartupData } from '@/shared/hooks/useStartupData';

export default function StartupsPage() {
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
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-secondary/10 to-background">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="mb-16 animate-fade-in">
            <h1 className="text-5xl font-bold mb-6 text-foreground">Verified Startup Database</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Explore <span className="font-semibold text-primary">{data.startups.length}</span> verified startups with real revenue data from TrustMRR.com
            </p>
          </div>

          <StartupList
            startups={data.startups}
            loading={data.loading}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          />
        </div>
      </div>
      <Footer />
      {cloneStartup && <CloneModal startup={cloneStartup} onClose={() => setCloneStartup(null)} />}
    </>
  );
}
