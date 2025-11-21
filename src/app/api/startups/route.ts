import { NextRequest, NextResponse } from 'next/server';
import { realTrustMRRData } from '@/lib/trustmrr-data';

const startupData = realTrustMRRData.map((s, i) => ({ id: `${i + 1}`, ...s }));

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sort = searchParams.get('sort') || 'recent';
  const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
  const search = searchParams.get('search');
  const industry = searchParams.get('industry');

  let results = [...startupData];

  if (search) {
    const term = search.toLowerCase();
    results = results.filter(
      (s) =>
        s.name.toLowerCase().includes(term) ||
        s.description?.toLowerCase().includes(term) ||
        s.founder?.toLowerCase().includes(term),
    );
  }

  if (industry) {
    results = results.filter((s) => s.industry?.toLowerCase() === industry.toLowerCase());
  }

  if (sort === 'mrr-high') {
    results.sort((a, b) => b.mrr - a.mrr);
  } else if (sort === 'revenue-high') {
    results.sort((a, b) => b.revenue - a.revenue);
  } else {
    results.sort((a, b) => parseInt(b.id) - parseInt(a.id));
  }

  return NextResponse.json(results.slice(0, limit));
}
