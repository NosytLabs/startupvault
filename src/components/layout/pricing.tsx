'use client';

export function Pricing() {
  return (
    <section className="py-20 bg-secondary/20">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Pricing Plans</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Simple pricing for startup cloning intelligence</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-8 rounded-lg border bg-card hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">Explorer</h3>
            <p className="text-sm text-muted-foreground mb-4">For browsing</p>
            <p className="text-3xl font-bold mb-6">Free</p>
            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> 50+ verified startups</li>
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> Revenue & MRR data</li>
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> Cloneability scoring</li>
              <li className="flex items-center gap-2"><span className="text-muted-foreground">✗</span> Build docs</li>
            </ul>
            <button className="w-full btn btn-secondary">Get Started</button>
          </div>

          <div className="p-8 rounded-lg border-2 border-primary bg-primary/10 scale-105 shadow-lg">
            <div className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold mb-2">Popular</div>
            <h3 className="text-xl font-bold mb-2">Builder</h3>
            <p className="text-sm text-muted-foreground mb-4">For building</p>
            <p className="text-3xl font-bold mb-6">$29<span className="text-sm text-muted-foreground">/mo</span></p>
            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> Everything in Explorer</li>
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> Build documentation</li>
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> Cursor AI prompts</li>
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> Data export</li>
            </ul>
            <button className="w-full btn btn-primary">Start Building</button>
          </div>

          <div className="p-8 rounded-lg border bg-card hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">Enterprise</h3>
            <p className="text-sm text-muted-foreground mb-4">For agencies</p>
            <p className="text-3xl font-bold mb-6">Custom</p>
            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> Everything in Builder</li>
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> White-label access</li>
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> API access</li>
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> Priority support</li>
            </ul>
            <button className="w-full btn btn-secondary">Contact Sales</button>
          </div>
        </div>
      </div>
    </section>
  );
}
