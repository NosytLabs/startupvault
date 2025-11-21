'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send email via Resend/SendGrid
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg text-muted-foreground">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-card rounded-lg border p-8">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Email</h3>
                <a href="mailto:hello@startupvault.com" className="text-primary hover:underline">
                  hello@startupvault.com
                </a>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Support</h3>
                <a href="mailto:support@startupvault.com" className="text-primary hover:underline">
                  support@startupvault.com
                </a>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Enterprise</h3>
                <a href="mailto:enterprise@startupvault.com" className="text-primary hover:underline">
                  enterprise@startupvault.com
                </a>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg border p-8">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full input h-32"
                  required
                />
              </div>
              <button type="submit" className="w-full btn btn-primary">
                {submitted ? 'Message Sent! ✓' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
