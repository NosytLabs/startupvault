'use client';

export function Testimonials() {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Trusted by Entrepreneurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 rounded-lg bg-card border">
              <p className="text-muted-foreground italic mb-4">"StartupVault provides the most accurate startup metrics I've found."</p>
              <p className="font-semibold">Founder #{i}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
