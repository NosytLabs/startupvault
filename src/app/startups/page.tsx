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
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Verified Startup Database</h1>
            <p className="text-lg text-muted-foreground">
              Explore {data.startups.length} verified startups with real revenue data and cloneability insights
            </p>
          </div>

          <StartupList
            startups={data.startups}
            loading={data.loading}
          />
        </div>
      </div>
      <Footer />
      {cloneStartup && <CloneModal startup={cloneStartup} onClose={() => setCloneStartup(null)} />}
    </>
  );
}
