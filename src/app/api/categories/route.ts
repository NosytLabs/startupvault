import { NextResponse } from 'next/server';
import { realTrustMRRData } from '@/lib/trustmrr-data';

export async function GET() {
  try {
    const allCategories = realTrustMRRData.flatMap(s => s.categories || []);
    const categories = [...new Set(allCategories)]
      .sort()
      .filter(Boolean);

    const categoryStats = categories.map(category => ({
      category,
      count: realTrustMRRData.filter(s => s.categories?.includes(category)).length,
      totalMrr: realTrustMRRData
        .filter(s => s.categories?.includes(category))
        .reduce((sum, s) => sum + s.mrr, 0),
      totalRevenue: realTrustMRRData
        .filter(s => s.categories?.includes(category))
        .reduce((sum, s) => sum + s.revenue, 0),
    }));

    return NextResponse.json({
      categories: categoryStats,
      total: categories.length,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}
