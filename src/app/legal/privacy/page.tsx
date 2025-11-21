export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, subscribe to a plan, or contact us for support.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures designed to protect your information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Third-Party Services</h2>
            <p>
              Our platform uses third-party services such as Stripe for payment processing. Please refer to their privacy policies for information on how they handle your data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by updating the "Last Updated" date of this policy.
            </p>
          </section>

          <p className="text-sm text-muted-foreground/60 mt-12">Last Updated: November 21, 2025</p>
        </div>
      </div>
    </div>
  );
}
