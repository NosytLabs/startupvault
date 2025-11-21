import { NextRequest, NextResponse } from 'next/server';
import { completeTrustMRRStartups } from '@/lib/trustmrr-complete-data';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sort = searchParams.get('sort') || 'ranking';
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const search = searchParams.get('search');
    const industry = searchParams.get('industry');
    const country = searchParams.get('country');

    let results = [...completeTrustMRRStartups];

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

    if (country) {
      results = results.filter((s) => s.country?.toLowerCase() === country.toLowerCase());
    }

    if (sort === 'mrr-high') {
      results.sort((a, b) => b.mrr - a.mrr);
    } else if (sort === 'revenue-high') {
      results.sort((a, b) => b.revenue - a.revenue);
    } else {
      results.sort((a, b) => (a.ranking || 999) - (b.ranking || 999));
    }

    return NextResponse.json(results.slice(0, limit));
  } catch (error) {
    console.error('Error in /api/startups:', error);
    return NextResponse.json({ error: 'Failed to fetch startups' }, { status: 500 });
  }
}
