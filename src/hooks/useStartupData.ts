'use client';
import { useState, useEffect } from 'react';

interface Startup {
  id: string;
  name: string;
  description?: string;
  revenue?: number;
  mrr?: number;
  logo?: string;
}

interface UseStartupDataOptions {
  sort?: string;
  limit?: number;
}

export function useStartupData(options: UseStartupDataOptions) {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/startups?limit=${options.limit || 10}&sort=${options.sort || 'recent'}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setStartups(data);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
        setStartups([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [options.sort, options.limit]);

  return { startups, loading, error };
}
