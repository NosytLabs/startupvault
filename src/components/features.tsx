'use client';

export function Features() {
  const features = [
    { title: 'Verified Data', description: 'Real revenue metrics from verified sources' },
    { title: 'Searchable', description: 'Filter by industry, stage, revenue, and more' },
    { title: 'Analytics', description: 'Compare metrics across startups' },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why StartupVault?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="p-6 rounded-lg bg-card border text-center">
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
