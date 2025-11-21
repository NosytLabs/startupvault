'use client';

export function Pricing() {
  return (
    <section className="py-20 bg-secondary/20">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Pricing</h2>
        <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">Start exploring verified startup data today</p>
        <div className="inline-block p-8 rounded-lg bg-card border">
          <p className="text-4xl font-bold mb-2">Free</p>
          <p className="text-muted-foreground">Full access to startup database</p>
        </div>
      </div>
    </section>
  );
}
