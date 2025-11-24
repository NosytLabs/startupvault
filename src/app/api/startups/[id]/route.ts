import { NextResponse } from 'next/server';
import { completeTrustMRRStartups } from '@/lib/trustmrr-complete-data';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const startup = completeTrustMRRStartups.find(s => s.id === parseInt(params.id));
    
    if (!startup) {
      return NextResponse.json({ error: 'Startup not found' }, { status: 404 });
    }

    const related = completeTrustMRRStartups
      .filter(s => s.industry === startup.industry && s.id !== startup.id)
      .slice(0, 4);

    return NextResponse.json({ startup, related });
  } catch (error) {
    console.error('Error in /api/startups/[id]:', error);
    return NextResponse.json({ error: 'Failed to fetch startup' }, { status: 500 });
  }
}
