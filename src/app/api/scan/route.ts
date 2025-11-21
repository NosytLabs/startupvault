import { NextRequest, NextResponse } from 'next/server';
import { scanWebsite } from '@/lib/browser-scanner';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    const analysis = await scanWebsite(url);
    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Scan error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to scan website' },
      { status: 500 },
    );
  }
}
