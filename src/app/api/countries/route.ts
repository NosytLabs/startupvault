import { NextResponse } from 'next/server';
import { realTrustMRRData } from '@/lib/trustmrr-data';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const countries = [...new Set(realTrustMRRData.map(s => s.country))]
      .sort()
      .filter(Boolean);

    const countryStats = countries.map(country => ({
      country,
      count: realTrustMRRData.filter(s => s.country === country).length,
      totalMrr: realTrustMRRData
        .filter(s => s.country === country)
        .reduce((sum, s) => sum + s.mrr, 0),
      totalRevenue: realTrustMRRData
        .filter(s => s.country === country)
        .reduce((sum, s) => sum + s.revenue, 0),
    }));

    return NextResponse.json({
      countries: countryStats,
      total: countries.length,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch countries' }, { status: 500 });
  }
}
