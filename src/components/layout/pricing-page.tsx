'use client';

import Link from 'next/link';

export function PricingPage() {
  const plans = [
    {
      name: 'Explorer',
      price: 'Free',
      description: 'Perfect for browsing and learning',
      features: [
        'Access to 50+ verified startups',
        'View revenue & MRR data',
        'Industry & revenue filtering',
        'Compare business models',
        'Revenue & MRR analytics',
        'Champions & Leaderboard views',
      ],
      cta: 'Get Started',
      highlight: false,
    },
    {
      name: 'Builder',
      price: '$29',
      period: '/month',
      description: 'For entrepreneurs building their clone',
      features: [
        'Everything in Explorer +',
        'Download build documentation (PRD, MVP, Tasks)',
        'Cursor IDE compatible prompts',
        'Website scanning & analysis tools',
        'Export startup data as CSV/JSON',
        'Custom startup recommendations',
        'Email support',
      ],
      cta: 'Start Building',
      highlight: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For agencies & consulting firms',
      features: [
        'Everything in Builder +',
        'Unlimited document downloads',
        'White-label access',
        'API access to startup data',
        'Priority support & consulting',
        'Custom integrations',
        'Team collaboration features',
      ],
      cta: 'Contact Sales',
      highlight: false,
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background via-secondary/10 to-background">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your startup cloning journey. All plans include access to our complete database of verified TrustMRR startups.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-xl border p-8 flex flex-col transition-all duration-300 ${
                plan.highlight
                  ? 'bg-gradient-to-br from-primary/10 to-primary/5 border-primary shadow-2xl scale-105 hover:scale-110'
                  : 'bg-card border-secondary hover:shadow-xl hover:scale-105'
              }`}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="flex-1 mb-8">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className="text-primary font-bold flex-shrink-0 mt-0.5">✓</span>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={`w-full py-3 px-4 rounded-lg font-semibold transition ${
                  plan.highlight
                    ? 'bg-primary text-primary-foreground hover:opacity-90'
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-primary/10 rounded-lg p-8 max-w-3xl mx-auto text-center border border-primary/20">
          <h3 className="text-xl font-bold text-foreground mb-4">All Plans Include</h3>
          <p className="text-muted-foreground mb-6">
            Access to our complete, authenticated database of 50+ startups with verified revenue/MRR data from TrustMRR.com. No hidden fees. Cancel anytime.
          </p>
          <Link href="/leaderboard" className="text-primary font-semibold hover:underline">
            View all verified startups →
          </Link>
        </div>
      </div>
    </section>
  );
}
