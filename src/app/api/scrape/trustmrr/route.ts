import { NextRequest, NextResponse } from 'next/server';
import { getAllTrustMRRStartups } from '@/lib/trustmrr-full-scraper';

export async function POST(request: NextRequest) {
  try {
    const { forceRefresh } = await request.json().catch(() => ({ forceRefresh: false }));

    console.log('Starting TrustMRR full scrape...');
    const startups = await getAllTrustMRRStartups(forceRefresh);

    console.log(`Scraped ${startups.length} startups from TrustMRR`);

    return NextResponse.json({
      success: true,
      count: startups.length,
      data: startups,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Scrape error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to scrape TrustMRR',
      },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const forceRefresh = request.nextUrl.searchParams.get('refresh') === 'true';
    console.log('GET /api/scrape/trustmrr - forceRefresh:', forceRefresh);

    const startups = await getAllTrustMRRStartups(forceRefresh);

    return NextResponse.json({
      success: true,
      count: startups.length,
      data: startups,
      timestamp: new Date().toISOString(),
      cached: !forceRefresh,
    });
  } catch (error) {
    console.error('Scrape error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to scrape TrustMRR',
      },
      { status: 500 },
    );
  }
}
