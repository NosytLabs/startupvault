'use client';

export function Testimonials() {
  const testimonials = [
    {
      quote: "StartupVault helped me validate my SaaS idea by showing me exactly which business models have proven to work. The cloneability scores are game-changing.",
      author: "Sarah Chen",
      role: "SaaS Founder"
    },
    {
      quote: "Instead of building from scratch, I analyzed 3 similar startups on StartupVault and combined their best practices. Saved me 6 months of development.",
      author: "Marcus Johnson",
      role: "Product Builder"
    },
    {
      quote: "The real revenue data and analytics are invaluable. I discovered a $50K MRR opportunity in a market niche I didn't know existed.",
      author: "Elena Rodriguez",
      role: "Entrepreneur"
    },
    {
      quote: "Using StartupVault's comparison tool, I realized my pricing was too low. Adjusted it and immediately increased revenue by 30%.",
      author: "David Park",
      role: "Bootstrap Founder"
    },
    {
      quote: "Finally, a database of startup models where I can actually trust the numbers. Real revenue, real founders, real inspiration.",
      author: "Priya Sharma",
      role: "Angel Investor"
    },
    {
      quote: "The clone guides gave me the exact roadmap I needed. Following their 4-step process, I went from idea to $5K MRR in 3 months.",
      author: "James Wilson",
      role: "Indie Hacker"
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Builders Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="p-6 rounded-lg bg-card border hover:shadow-lg transition">
              <p className="text-muted-foreground italic mb-4">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-primary">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
