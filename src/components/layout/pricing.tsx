'use client';

export function Pricing() {
  return (
    <section className="py-28 bg-gradient-to-b from-secondary/15 to-background">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Pricing Plans</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">Simple pricing for startup research and cloning</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="group relative p-8 rounded-xl border border-border bg-card hover:shadow-xl hover:border-primary/50 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2 text-foreground">Explorer</h3>
              <p className="text-sm text-muted-foreground mb-6">For research</p>
              <p className="text-4xl font-bold mb-8 text-foreground">Free</p>
              <ul className="space-y-3 mb-10 text-sm">
                <li className="flex items-center gap-3"><span className="text-primary text-lg">✓</span> <span>50+ verified startups</span></li>
                <li className="flex items-center gap-3"><span className="text-primary text-lg">✓</span> <span>Revenue & MRR data</span></li>
                <li className="flex items-center gap-3"><span className="text-primary text-lg">✓</span> <span>Industry filtering</span></li>
                <li className="flex items-center gap-3"><span className="text-muted-foreground text-lg">✗</span> <span className="text-muted-foreground">Build docs</span></li>
              </ul>
              <button className="w-full btn btn-secondary hover:shadow-md">Get Started</button>
            </div>
          </div>

          <div className="group relative p-8 rounded-xl border-2 border-primary bg-gradient-to-br from-primary/15 to-primary/5 md:scale-105 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 inline-block bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
              ⭐ Most Popular
            </div>
            <div className="relative z-10 pt-2">
              <h3 className="text-2xl font-bold mb-2 text-foreground">Builder</h3>
              <p className="text-sm text-muted-foreground mb-6">For cloning</p>
              <p className="text-4xl font-bold mb-2 text-primary">$29<span className="text-lg text-muted-foreground font-normal">/mo</span></p>
              <p className="text-xs text-muted-foreground mb-8">Billed monthly • Cancel anytime</p>
              <ul className="space-y-3 mb-10 text-sm">
                <li className="flex items-center gap-3"><span className="text-primary text-lg">✓</span> <span>Everything in Explorer</span></li>
                <li className="flex items-center gap-3"><span className="text-primary text-lg">✓</span> <span>Website scanning</span></li>
                <li className="flex items-center gap-3"><span className="text-primary text-lg">✓</span> <span>Build documentation</span></li>
                <li className="flex items-center gap-3"><span className="text-primary text-lg">✓</span> <span>PRD & MVP guides</span></li>
              </ul>
              <button className="w-full btn btn-primary hover:shadow-lg shadow-md">Start Building</button>
            </div>
          </div>

          <div className="group relative p-8 rounded-xl border border-border bg-card hover:shadow-xl hover:border-primary/50 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2 text-foreground">Enterprise</h3>
              <p className="text-sm text-muted-foreground mb-6">For agencies</p>
              <p className="text-4xl font-bold mb-8 text-foreground">Custom</p>
              <ul className="space-y-3 mb-10 text-sm">
                <li className="flex items-center gap-3"><span className="text-primary text-lg">✓</span> <span>Everything in Builder</span></li>
                <li className="flex items-center gap-3"><span className="text-primary text-lg">✓</span> <span>API access</span></li>
                <li className="flex items-center gap-3"><span className="text-primary text-lg">✓</span> <span>Priority support</span></li>
                <li className="flex items-center gap-3"><span className="text-primary text-lg">✓</span> <span>Custom analysis</span></li>
              </ul>
              <button className="w-full btn btn-secondary hover:shadow-md">Contact Sales</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
