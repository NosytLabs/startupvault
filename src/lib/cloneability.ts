export interface CloneabilityScore {
  overall: number;
  factors: {
    revenueValidation: number;
    businessModelClarity: number;
    marketTraction: number;
    scalability: number;
    barriers: number;
  };
  description: string;
  recommendations: string[];
}

export function calculateCloneability(startup: any): CloneabilityScore {
  const factors = {
    revenueValidation: 0,
    businessModelClarity: 0,
    marketTraction: 0,
    scalability: 0,
    barriers: 0,
  };

  // Revenue validation (0-20 points)
  if (startup.revenue > 50000000) factors.revenueValidation = 20;
  else if (startup.revenue > 10000000) factors.revenueValidation = 18;
  else if (startup.revenue > 1000000) factors.revenueValidation = 15;
  else if (startup.mrr > 500000) factors.revenueValidation = 18;
  else if (startup.mrr > 100000) factors.revenueValidation = 15;
  else if (startup.mrr > 50000) factors.revenueValidation = 12;
  else factors.revenueValidation = 8;

  // Business model clarity (0-20 points)
  const clarityKeywords = ['SaaS', 'marketplace', 'B2B', 'digital products', 'services'];
  if (clarityKeywords.some((k) => startup.industry?.toLowerCase().includes(k.toLowerCase()))) {
    factors.businessModelClarity = 18;
  } else {
    factors.businessModelClarity = 12;
  }

  // Market traction (0-20 points)
  if (startup.stage === 'Scale') factors.marketTraction = 20;
  else if (startup.stage === 'Growth') factors.marketTraction = 16;
  else factors.marketTraction = 10;

  // Scalability (0-20 points)
  const scalableIndustries = ['SaaS', 'AI', 'Analytics', 'Tools', 'Digital Products'];
  if (scalableIndustries.includes(startup.industry)) {
    factors.scalability = 18;
  } else if (['Marketplace', 'B2B SaaS', 'Media'].includes(startup.industry)) {
    factors.scalability = 15;
  } else {
    factors.scalability = 10;
  }

  // Barriers to entry (0-20 points) - Lower is better
  const highBarrierIndustries = ['Healthcare', 'Infrastructure', 'AI'];
  if (highBarrierIndustries.includes(startup.industry)) {
    factors.barriers = 8;
  } else if (['B2B SaaS', 'Analytics', 'Services'].includes(startup.industry)) {
    factors.barriers = 14;
  } else {
    factors.barriers = 18;
  }

  const overall = Math.round(
    (factors.revenueValidation +
      factors.businessModelClarity +
      factors.marketTraction +
      factors.scalability +
      factors.barriers) /
      5,
  );

  const recommendations = [];

  if (factors.revenueValidation < 15) recommendations.push('Focus on early revenue validation');
  if (factors.businessModelClarity < 15) recommendations.push('Clarify your business model');
  if (factors.marketTraction < 15) recommendations.push('Build initial market traction');
  if (factors.scalability < 15) recommendations.push('Consider how to scale this model');
  if (factors.barriers < 12) recommendations.push('Plan strategy to overcome high barriers to entry');

  if (recommendations.length === 0) {
    recommendations.push('Well-positioned for cloning - execute consistently');
  }

  return {
    overall: Math.min(100, overall),
    factors,
    description:
      overall >= 80
        ? 'Highly cloneable - strong product-market fit and proven model'
        : overall >= 60
          ? 'Moderately cloneable - good fundamentals with some challenges'
          : 'Specialized model - requires domain expertise',
    recommendations,
  };
}
