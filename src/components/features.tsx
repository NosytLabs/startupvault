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
    <section className="py-20 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Why StartupVault?</h2>
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Everything you need to understand proven startup models and build yours faster
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="p-6 rounded-lg bg-card border hover:shadow-lg transition">
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
