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
    <section className="py-28 bg-gradient-to-b from-background via-secondary/10 to-background">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">What Builders Say</h2>
          <p className="text-lg text-muted-foreground">Discover how founders use StartupVault to build faster</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <div 
              key={i} 
              className="group relative p-8 rounded-xl bg-card border border-border hover:shadow-lg hover:border-primary/50 transition-all duration-300 overflow-hidden"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-foreground leading-relaxed mb-6 text-sm">"{testimonial.quote}"</p>
                <div className="pt-4 border-t border-border">
                  <p className="font-bold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-primary font-medium">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
