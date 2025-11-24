import { NextRequest, NextResponse } from 'next/server';
import { realTrustMRRData } from '@/lib/trustmrr-data';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const country = searchParams.get('country');
    const category = searchParams.get('category');
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 200);

    let results = [...realTrustMRRData]
      .filter(s => s.ranking)
      .sort((a, b) => (a.ranking || 999) - (b.ranking || 999));

    if (country) {
      results = results.filter(s => s.country?.toLowerCase() === country.toLowerCase());
    }

    if (category) {
      results = results.filter(s => 
        s.categories?.some(c => c.toLowerCase().includes(category.toLowerCase()))
      );
    }

    const leaderboard = results.slice(0, limit);

    return NextResponse.json({
      leaderboard,
      total: leaderboard.length,
      champions: leaderboard.filter(s => s.isChampion),
      countries: [...new Set(realTrustMRRData.map(s => s.country))],
      categories: [...new Set(realTrustMRRData.flatMap(s => s.categories))],
    });
  } catch (error) {
    console.error('Error in /api/leaderboard:', error);
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
  }
}
