import { NextRequest, NextResponse } from 'next/server';

// Mock data - will be replaced with database queries
const mockStartups = [
  {
    id: '1',
    name: 'Gumroad',
    description: 'Go from 0 to $1',
    revenue: 878595861,
    mrr: 0,
    founder: 'shl',
    logo: 'https://d21oz30g4w22sz.cloudfront.net/logos/gumroad-113809f2-c628-4d3a-8adb-fbdc414784d7.png',
  },
  {
    id: '2',
    name: 'easytools sp. z o.o.',
    description: 'Tools that help creators sell and advertise',
    revenue: 0,
    mrr: 82107087,
    founder: 'easytools',
    logo: 'https://files.stripe.com/links/MDB8YWNjdF8xSXIxTDRFbnRqdUdOYURHfGZsX2xpdmVfYTBOWjN0OXBsUGFpZklDOVBZMHJEUVBW00tG23D7uD',
  },
  {
    id: '3',
    name: 'MaidsnBlack',
    description: 'Home Cleaning Tech Driven Platform',
    revenue: 21758670,
    mrr: 0,
    founder: 'rohangilkes',
    logo: '',
  },
  {
    id: '4',
    name: 'Stack Influence',
    description: 'Micro Creator marketing platform for eComm brands',
    revenue: 19557640,
    mrr: 42906,
    founder: 'laurent_vinc',
    logo: 'https://d21oz30g4w22sz.cloudfront.net/logos/stack-influence-9ad26773-85fb-46ad-822a-6accdd49ee61.png',
  },
  {
    id: '5',
    name: 'TrimRx',
    description: 'Telehealth company specializing in weight loss programs',
    revenue: 0,
    mrr: 0,
    founder: 'trimrx',
    logo: '',
  },
  {
    id: '6',
    name: 'Arcads AI',
    description: 'Create winning AI Video Ads',
    revenue: 9335915,
    mrr: 910086,
    founder: 'rom1trs',
    logo: 'https://d21oz30g4w22sz.cloudfront.net/logos/freshr-sas-94b59d4e-2f38-43b3-83b8-630c88ed6bca.png',
  },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sort = searchParams.get('sort') || 'recent';
  const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
  const search = searchParams.get('search');

  let results = [...mockStartups];

  // Filter by search
  if (search) {
    const term = search.toLowerCase();
    results = results.filter(
      (s) =>
        s.name.toLowerCase().includes(term) ||
        s.description?.toLowerCase().includes(term) ||
        s.founder?.toLowerCase().includes(term),
    );
  }

  // Sort
  if (sort === 'mrr-high') {
    results.sort((a, b) => b.mrr - a.mrr);
  } else if (sort === 'revenue-high') {
    results.sort((a, b) => b.revenue - a.revenue);
  } else {
    results.sort((a, b) => b.id.localeCompare(a.id));
  }

  return NextResponse.json(results.slice(0, limit));
}
