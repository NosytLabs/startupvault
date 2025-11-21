'use client';
import { useState } from 'react';

interface CloneModalProps {
  startup: any;
  onClose: () => void;
}

export function CloneModal({ startup, onClose }: CloneModalProps) {
  const [step, setStep] = useState(1);

  const cloneGuide = [
    {
      title: 'Validate the Market',
      steps: ['Research competitors', 'Survey target audience', 'Test initial idea'],
    },
    {
      title: 'Build MVP',
      steps: ['Define core features', 'Build minimum product', 'Get early users'],
    },
    {
      title: 'Establish Revenue',
      steps: ['Choose pricing model', 'Launch monetization', 'Optimize conversion'],
    },
    {
      title: 'Scale Operations',
      steps: ['Hire team', 'Automate processes', 'Expand to new markets'],
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Clone {startup.name}</h2>
          <button onClick={onClose} className="text-2xl hover:opacity-60">
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-primary/10 rounded-lg">
              <p className="text-sm text-muted-foreground">Annual Revenue</p>
              <p className="text-2xl font-bold">${(startup.revenue / 1000000).toFixed(1)}M</p>
            </div>
            <div className="p-4 bg-accent/10 rounded-lg">
              <p className="text-sm text-muted-foreground">Monthly Revenue</p>
              <p className="text-2xl font-bold">${(startup.mrr / 1000).toFixed(0)}K</p>
            </div>
            <div className="p-4 bg-secondary/10 rounded-lg">
              <p className="text-sm text-muted-foreground">Industry</p>
              <p className="text-lg font-semibold">{startup.industry}</p>
            </div>
            <div className="p-4 bg-blue-100/10 rounded-lg">
              <p className="text-sm text-muted-foreground">Stage</p>
              <p className="text-lg font-semibold">{startup.stage}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">How to Clone This</h3>
            <div className="space-y-4">
              {cloneGuide.map((phase, idx) => (
                <div key={idx} className="border rounded-lg p-4 hover:bg-secondary/30 cursor-pointer transition">
                  <h4 className="font-semibold mb-2">
                    {idx + 1}. {phase.title}
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {phase.steps.map((s, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-primary">→</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary/10 p-4 rounded-lg">
            <p className="text-sm font-semibold mb-2">💡 Key Success Factors</p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Start with a laser-focused niche</li>
              <li>• Focus on customer acquisition early</li>
              <li>• Don't copy features - copy the business model</li>
              <li>• Build for your audience, not theirs</li>
            </ul>
          </div>

          <button
            onClick={onClose}
            className="w-full btn btn-primary py-3 font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
