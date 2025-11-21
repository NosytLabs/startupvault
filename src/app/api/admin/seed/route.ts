import { NextRequest, NextResponse } from 'next/server';
import { realTrustMRRData } from '@/lib/trustmrr-data';

// Admin endpoint to seed database with TrustMRR data
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    // Simple auth check (in production, use proper API keys)
    if (authHeader !== `Bearer ${process.env.ADMIN_SECRET_KEY || 'dev-key'}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Return the data to be seeded
    return NextResponse.json({
      success: true,
      count: realTrustMRRData.length,
      data: realTrustMRRData,
      timestamp: new Date().toISOString(),
      message: `${realTrustMRRData.length} startups ready to seed to database`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to seed database' },
      { status: 500 },
    );
  }
}
