import { NextRequest, NextResponse } from 'next/server';
import { realTrustMRRData } from '@/lib/trustmrr-data';

const startupData = realTrustMRRData.map((s, i) => ({ id: `${i + 1}`, ...s }));

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sort = searchParams.get('sort') || 'ranking';
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const search = searchParams.get('search');
    const industry = searchParams.get('industry');
    const country = searchParams.get('country');
    const category = searchParams.get('category');
    const isChampion = searchParams.get('champion') === 'true';

    let results = [...startupData];

    if (search) {
      const term = search.toLowerCase();
      results = results.filter(
        (s) =>
          s.name.toLowerCase().includes(term) ||
          s.description?.toLowerCase().includes(term) ||
          s.founder?.toLowerCase().includes(term) ||
          s.country?.toLowerCase().includes(term),
      );
    }

    if (industry) {
      results = results.filter((s) => s.industry?.toLowerCase() === industry.toLowerCase());
    }

    if (country) {
      results = results.filter((s) => s.country?.toLowerCase() === country.toLowerCase());
    }

    if (category) {
      results = results.filter((s) => 
        s.categories?.some(c => c.toLowerCase().includes(category.toLowerCase()))
      );
    }

    if (isChampion) {
      results = results.filter((s) => s.isChampion === true);
    }

    if (sort === 'mrr-high') {
      results.sort((a, b) => b.mrr - a.mrr);
    } else if (sort === 'revenue-high') {
      results.sort((a, b) => b.revenue - a.revenue);
    } else if (sort === 'ranking') {
      results.sort((a, b) => (a.ranking || 999) - (b.ranking || 999));
    } else if (sort === 'recent') {
      results.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    }

    return NextResponse.json(results.slice(0, limit));
  } catch (error) {
    console.error('Error in /api/startups:', error);
    return NextResponse.json({ error: 'Failed to fetch startups' }, { status: 500 });
  }
}
