import { NextRequest, NextResponse } from 'next/server';

const startupData = [
  {"name": "Gumroad", "description": "Go from 0 to $1", "revenue": 878595861, "mrr": 0, "founder": "shl", "industry": "Digital Products", "stage": "Scale", "website": "https://gumroad.com"},
  {"name": "easytools sp. z o.o.", "description": "Tools that help creators sell and advertise", "revenue": 0, "mrr": 82107087, "founder": "easytools", "industry": "SaaS", "stage": "Growth", "website": "https://www.easytools.pro"},
  {"name": "MaidsnBlack", "description": "Home Cleaning Tech Platform", "revenue": 21758670, "mrr": 0, "founder": "rohangilkes", "industry": "Marketplace", "stage": "Growth", "website": "https://maidsnblack.com"},
  {"name": "Stack Influence", "description": "Micro Creator marketing for eComm", "revenue": 19557640, "mrr": 42906, "founder": "laurent_vinc", "industry": "Marketing", "stage": "Growth", "website": "https://stackinfluence.com"},
  {"name": "TrimRx", "description": "Telehealth weight loss programs", "revenue": 0, "mrr": 0, "founder": "trimrx", "industry": "Healthcare", "stage": "Seed", "website": "https://trimrx.com"},
  {"name": "Arcads AI", "description": "Create winning AI Video Ads", "revenue": 9335915, "mrr": 910086, "founder": "rom1trs", "industry": "AI", "stage": "Growth", "website": "https://www.arcads.ai"},
  {"name": "HypeProxies", "description": "Proxy infrastructure with unlimited bandwidth", "revenue": 0, "mrr": 0, "founder": "basedgunnar", "industry": "Infrastructure", "stage": "Growth", "website": "https://www.hypeproxies.io"},
  {"name": "Cometly", "description": "Marketing attribution and analytics for SaaS", "revenue": 7807905, "mrr": 223554, "founder": "heygrantcooper", "industry": "Analytics", "stage": "Growth", "website": "https://cometly.com"},
  {"name": "Rezi LLC", "description": "Digital products marketplace", "revenue": 7667622, "mrr": 0, "founder": "jacob_jacquet", "industry": "Digital Products", "stage": "Growth", "website": "https://rezi.io"},
  {"name": "Local SEO Guy", "description": "SEO services and tools", "revenue": 6716065, "mrr": 2400, "founder": "LocalSEO_Guy", "industry": "Services", "stage": "Scale", "website": "https://www.localseoguy.com"},
  {"name": "StartGlobal", "description": "US Business Formation platform", "revenue": 4370823, "mrr": 12027, "founder": "sanjaynediyara", "industry": "B2B SaaS", "stage": "Growth", "website": "https://startglobal.us"},
  {"name": "DataExpert", "description": "Data engineering education", "revenue": 3477398, "mrr": 57898, "founder": "EcZachly", "industry": "Education", "stage": "Growth", "website": "https://dataexpert.io"},
  {"name": "SwiftSole", "description": "App development company", "revenue": 3263362, "mrr": 47738, "founder": "pookybypass", "industry": "Services", "stage": "Growth", "website": "https://swiftsole.dev"},
  {"name": "Shugert Marketing", "description": "Certified Shopify Experts", "revenue": 3136799, "mrr": 0, "founder": "shugert", "industry": "Services", "stage": "Scale", "website": "https://shugert.com"},
  {"name": "GetLatka", "description": "Software analysis tools", "revenue": 2950000, "mrr": 0, "founder": "nathanlatka", "industry": "B2B SaaS", "stage": "Growth", "website": "https://www.getlatka.com"},
  {"name": "Epstein's list", "description": "Old business funding GojiberryAI SaaS", "revenue": 2687123, "mrr": 46, "founder": "romanbuildsaas", "industry": "Funding", "stage": "Scale", "website": "https://epsteinslist.com"},
  {"name": "Teachizy", "description": "Online learning platform", "revenue": 2027652, "mrr": 64179, "founder": "ledevultime", "industry": "Education", "stage": "Growth", "website": "https://teachizy.com"},
  {"name": "ConvertLabs", "description": "SaaS for booking and marketing", "revenue": 1897686, "mrr": 35774, "founder": "rohangilkes", "industry": "SaaS", "stage": "Growth", "website": "https://convertlabs.io"},
  {"name": "Dealsourcr Ltd", "description": "Software solutions", "revenue": 1865565, "mrr": 60434, "founder": "ashleyrudland", "industry": "SaaS", "stage": "Growth", "website": "https://dealsourcr.com"},
  {"name": "Indexsy", "description": "Buy and operate online businesses", "revenue": 1773135, "mrr": 32442, "founder": "indexsy", "industry": "Marketplace", "stage": "Scale", "website": "https://www.indexsy.com"},
  {"name": "1Capture", "description": "Double SaaS revenue from free trials", "revenue": 1723708, "mrr": 176992, "founder": "RobbyFrank", "industry": "SaaS", "stage": "Growth", "website": "https://1capture.io"},
  {"name": "Digitiz.fr", "description": "French B2B SaaS media", "revenue": 1645199, "mrr": 0, "founder": "lfrissard", "industry": "Media", "stage": "Growth", "website": "https://digitiz.fr"},
  {"name": "Simple Analytics", "description": "Analytics software for businesses", "revenue": 1486955, "mrr": 38642, "founder": "simpleanalytic", "industry": "Analytics", "stage": "Scale", "website": "https://www.simpleanalytics.com"},
  {"name": "Liinks", "description": "Link in bio with analytics", "revenue": 1434910, "mrr": 26860, "founder": "clarkcharlie03", "industry": "Tools", "stage": "Growth", "website": "https://liinks.co"},
  {"name": "Parakeet Chat", "description": "Chat and AI for inmates", "revenue": 1411854, "mrr": 24822, "founder": "JordanRejaud", "industry": "SaaS", "stage": "Growth", "website": "https://parakeetchat.com"}
].map((s, i) => ({ id: `${i + 1}`, ...s }));

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sort = searchParams.get('sort') || 'recent';
  const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
  const search = searchParams.get('search');
  const industry = searchParams.get('industry');

  let results = [...startupData];

  if (search) {
    const term = search.toLowerCase();
    results = results.filter(
      (s) =>
        s.name.toLowerCase().includes(term) ||
        s.description?.toLowerCase().includes(term) ||
        s.founder?.toLowerCase().includes(term),
    );
  }

  if (industry) {
    results = results.filter((s) => s.industry?.toLowerCase() === industry.toLowerCase());
  }

  if (sort === 'mrr-high') {
    results.sort((a, b) => b.mrr - a.mrr);
  } else if (sort === 'revenue-high') {
    results.sort((a, b) => b.revenue - a.revenue);
  } else {
    results.sort((a, b) => parseInt(b.id) - parseInt(a.id));
  }

  return NextResponse.json(results.slice(0, limit));
}
