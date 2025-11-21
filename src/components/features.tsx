'use client';

export function Features() {
  const features = [
    { 
      title: '💰 Real Revenue Data', 
      description: 'Verified metrics from 25+ successful startups with $2.7B+ combined revenue',
      icon: '📊'
    },
    { 
      title: '🎯 Cloneability Scores', 
      description: 'AI-powered scoring shows exactly which models you can replicate in your niche',
      icon: '✨'
    },
    { 
      title: '🔍 Smart Search', 
      description: 'Filter by industry, revenue, stage, founder - find your perfect model',
      icon: '🔎'
    },
    { 
      title: '📈 Clone Guides', 
      description: '4-step playbooks for each startup - from validation to scaling',
      icon: '📋'
    },
    { 
      title: '⚖️ Compare Side-by-Side', 
      description: 'Analyze multiple startups to identify patterns and opportunities',
      icon: '⚖️'
    },
    { 
      title: '📊 Market Analytics', 
      description: 'Industry trends, revenue insights, and performance benchmarks',
      icon: '📉'
    },
  ];

  return (
    <section className="py-28 bg-gradient-to-b from-background via-secondary/10 to-background">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Why StartupVault?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Everything you need to understand proven startup models and build yours faster
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="group relative p-8 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="font-bold text-lg mb-3 text-foreground group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
