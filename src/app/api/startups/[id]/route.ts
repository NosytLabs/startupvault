import { NextRequest, NextResponse } from 'next/server';

const startupData = [
  {"name": "Gumroad", "description": "Go from 0 to $1", "revenue": 878595861, "mrr": 0, "founder": "shl", "industry": "Digital Products", "stage": "Scale"},
  {"name": "easytools sp. z o.o.", "description": "Tools that help creators sell and advertise", "revenue": 0, "mrr": 82107087, "founder": "easytools", "industry": "SaaS", "stage": "Growth"},
  {"name": "MaidsnBlack", "description": "Home Cleaning Tech Platform", "revenue": 21758670, "mrr": 0, "founder": "rohangilkes", "industry": "Marketplace", "stage": "Growth"},
  {"name": "Stack Influence", "description": "Micro Creator marketing for eComm", "revenue": 19557640, "mrr": 42906, "founder": "laurent_vinc", "industry": "Marketing", "stage": "Growth"},
  {"name": "TrimRx", "description": "Telehealth weight loss programs", "revenue": 0, "mrr": 0, "founder": "trimrx", "industry": "Healthcare", "stage": "Seed"},
  {"name": "Arcads AI", "description": "Create winning AI Video Ads", "revenue": 9335915, "mrr": 910086, "founder": "rom1trs", "industry": "AI", "stage": "Growth"},
  {"name": "HypeProxies", "description": "Proxy infrastructure with unlimited bandwidth", "revenue": 0, "mrr": 0, "founder": "basedgunnar", "industry": "Infrastructure", "stage": "Growth"},
  {"name": "Cometly", "description": "Marketing attribution and analytics for SaaS", "revenue": 7807905, "mrr": 223554, "founder": "heygrantcooper", "industry": "Analytics", "stage": "Growth"},
  {"name": "Rezi LLC", "description": "Digital products marketplace", "revenue": 7667622, "mrr": 0, "founder": "jacob_jacquet", "industry": "Digital Products", "stage": "Growth"},
  {"name": "Local SEO Guy", "description": "SEO services and tools", "revenue": 6716065, "mrr": 2400, "founder": "LocalSEO_Guy", "industry": "Services", "stage": "Scale"},
  {"name": "StartGlobal", "description": "US Business Formation platform", "revenue": 4370823, "mrr": 12027, "founder": "sanjaynediyara", "industry": "B2B SaaS", "stage": "Growth"},
  {"name": "DataExpert", "description": "Data engineering education", "revenue": 3477398, "mrr": 57898, "founder": "EcZachly", "industry": "Education", "stage": "Growth"},
  {"name": "SwiftSole", "description": "App development company", "revenue": 3263362, "mrr": 47738, "founder": "pookybypass", "industry": "Services", "stage": "Growth"},
  {"name": "Shugert Marketing", "description": "Certified Shopify Experts", "revenue": 3136799, "mrr": 0, "founder": "shugert", "industry": "Services", "stage": "Scale"},
  {"name": "GetLatka", "description": "Software analysis tools", "revenue": 2950000, "mrr": 0, "founder": "nathanlatka", "industry": "B2B SaaS", "stage": "Growth"},
  {"name": "Epstein's list", "description": "Old business funding GojiberryAI SaaS", "revenue": 2687123, "mrr": 46, "founder": "romanbuildsaas", "industry": "Funding", "stage": "Scale"},
  {"name": "Teachizy", "description": "Online learning platform", "revenue": 2027652, "mrr": 64179, "founder": "ledevultime", "industry": "Education", "stage": "Growth"},
  {"name": "ConvertLabs", "description": "SaaS for booking and marketing", "revenue": 1897686, "mrr": 35774, "founder": "rohangilkes", "industry": "SaaS", "stage": "Growth"},
  {"name": "Dealsourcr Ltd", "description": "Software solutions", "revenue": 1865565, "mrr": 60434, "founder": "ashleyrudland", "industry": "SaaS", "stage": "Growth"},
  {"name": "Indexsy", "description": "Buy and operate online businesses", "revenue": 1773135, "mrr": 32442, "founder": "indexsy", "industry": "Marketplace", "stage": "Scale"},
  {"name": "1Capture", "description": "Double SaaS revenue from free trials", "revenue": 1723708, "mrr": 176992, "founder": "RobbyFrank", "industry": "SaaS", "stage": "Growth"},
  {"name": "Digitiz.fr", "description": "French B2B SaaS media", "revenue": 1645199, "mrr": 0, "founder": "lfrissard", "industry": "Media", "stage": "Growth"},
  {"name": "Simple Analytics", "description": "Analytics software for businesses", "revenue": 1486955, "mrr": 38642, "founder": "simpleanalytic", "industry": "Analytics", "stage": "Scale"},
  {"name": "Liinks", "description": "Link in bio with analytics", "revenue": 1434910, "mrr": 26860, "founder": "clarkcharlie03", "industry": "Tools", "stage": "Growth"},
  {"name": "Parakeet Chat", "description": "Chat and AI for inmates", "revenue": 1411854, "mrr": 24822, "founder": "JordanRejaud", "industry": "SaaS", "stage": "Growth"}
].map((s, i) => ({ id: `${i + 1}`, ...s }));

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const startup = startupData.find((s) => s.id === params.id);

  if (!startup) {
    return NextResponse.json({ error: 'Startup not found' }, { status: 404 });
  }

  return NextResponse.json(startup);
}
