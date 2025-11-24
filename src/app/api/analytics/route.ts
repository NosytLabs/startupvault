import { NextRequest, NextResponse } from 'next/server';
import { allTrustMRRStartups } from '@/lib/trustmrr-all-data';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type') || 'overview';

  if (type === 'industry-trends') {
    const byIndustry = allTrustMRRStartups.reduce(
      (acc, s) => {
        const ind = s.industry || 'Other';
        if (!acc[ind]) acc[ind] = { count: 0, totalRevenue: 0, totalMrr: 0, avgStage: 0 };
        acc[ind].count++;
        acc[ind].totalRevenue += s.revenue || 0;
        acc[ind].totalMrr += s.mrr || 0;
        return acc;
      },
      {} as Record<string, any>,
    );

    const trends = Object.entries(byIndustry).map(([industry, data]) => ({
      industry,
      count: data.count,
      totalRevenue: data.totalRevenue,
      totalMrr: data.totalMrr,
      avgRevenue: Math.round(data.totalRevenue / data.count),
      avgMrr: Math.round(data.totalMrr / data.count),
    }));

    return NextResponse.json(trends.sort((a, b) => b.totalRevenue - a.totalRevenue));
  }

  if (type === 'stage-analysis') {
    const byStage = allTrustMRRStartups.reduce(
      (acc, s) => {
        const stage = s.stage || 'Unknown';
        if (!acc[stage]) acc[stage] = { count: 0, totalRevenue: 0, totalMrr: 0 };
        acc[stage].count++;
        acc[stage].totalRevenue += s.revenue || 0;
        acc[stage].totalMrr += s.mrr || 0;
        return acc;
      },
      {} as Record<string, any>,
    );

    return NextResponse.json(
      Object.entries(byStage).map(([stage, data]) => ({
        stage,
        count: data.count,
        totalRevenue: data.totalRevenue,
        totalMrr: data.totalMrr,
      })),
    );
  }

  // Default: overview stats
  const totalRevenue = allTrustMRRStartups.reduce((sum: number, s: any) => sum + (s.revenue || 0), 0);
  const totalMrr = allTrustMRRStartups.reduce((sum: number, s: any) => sum + (s.mrr || 0), 0);
  const avgRevenue = Math.round(totalRevenue / allTrustMRRStartups.length);
  const avgMrr = Math.round(totalMrr / allTrustMRRStartups.length);

  return NextResponse.json({
    totalStartups: allTrustMRRStartups.length,
    totalRevenue,
    totalMrr,
    avgRevenue,
    avgMrr,
    topByRevenue: [...allTrustMRRStartups].sort((a: any, b: any) => (b.revenue || 0) - (a.revenue || 0)).slice(0, 5),
    topByMrr: [...allTrustMRRStartups].sort((a: any, b: any) => (b.mrr || 0) - (a.mrr || 0)).slice(0, 5),
  });
}
