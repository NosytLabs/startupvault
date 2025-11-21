import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.2.0',
    features: ['startups', 'cloneability', 'scanning', 'doc-generation'],
    dataSource: 'TrustMRR',
    uptime: process.uptime(),
  });
}
