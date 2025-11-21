import { NextRequest, NextResponse } from 'next/server';
import { realTrustMRRData } from '@/lib/trustmrr-data';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const country = searchParams.get('country');

    let champions = realTrustMRRData
      .filter(s => s.isChampion === true)
      .sort((a, b) => (a.ranking || 999) - (b.ranking || 999));

    if (country) {
      champions = champions.filter(s => s.country?.toLowerCase() === country.toLowerCase());
    }

    return NextResponse.json({
      champions: champions.slice(0, limit),
      total: champions.length,
      allChampions: realTrustMRRData.filter(s => s.isChampion).length,
    });
  } catch (error) {
    console.error('Error in /api/champions:', error);
    return NextResponse.json({ error: 'Failed to fetch champions' }, { status: 500 });
  }
}
