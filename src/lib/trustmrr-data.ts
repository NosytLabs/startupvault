// Import authentic TrustMRR data with verified revenue/MRR from trustmrr.com
import { expandedTrustMRRData } from './trustmrr-expanded-data';

// Complete AUTHENTIC TrustMRR Verified Startup Data - Only real revenue & MRR from trustmrr.com
export const realTrustMRRData = expandedTrustMRRData.map(s => ({
  name: s.name,
  description: s.description,
  revenue: s.revenue,
  mrr: s.mrr,
  founder: s.founder,
  industry: s.industry,
  stage: s.stage,
  website: s.website,
  country: s.country,
  ranking: s.ranking,
  isChampion: s.isChampion,
  categories: s.categories,
  verified: s.verified,
  verifiedDate: s.verifiedDate,
}));
