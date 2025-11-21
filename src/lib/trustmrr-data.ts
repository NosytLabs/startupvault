// Import expanded data with all fields
import { expandedTrustMRRData } from './trustmrr-expanded-data';

// Complete Real TrustMRR Verified Startup Data - All authenticated revenue/MRR
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
