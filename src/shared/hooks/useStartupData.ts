'use client';
import { useState, useEffect } from 'react';

interface Startup {
  id: string;
  name: string;
  description?: string;
  revenue?: number;
  mrr?: number;
  founder?: string;
  industry?: string;
  stage?: string;
  logo?: string;
}

interface UseStartupDataOptions {
  sort?: string;
  limit?: number;
  search?: string;
  industry?: string;
}

export function useStartupData(options: UseStartupDataOptions = {}) {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams({
          limit: (options.limit || 10).toString(),
          sort: options.sort || 'recent',
          ...(options.search && { search: options.search }),
          ...(options.industry && { industry: options.industry }),
        });

        const res = await fetch(`/api/startups?${params}`);
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
  }, [options.sort, options.limit, options.search, options.industry]);

  return { startups, loading, error };
}
