'use client';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 bg-gradient-to-t from-secondary/40 to-transparent border-t border-border">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} <span className="font-semibold text-foreground">StartupVault</span>. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Authentic data from <span className="font-medium text-primary">TrustMRR.com</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
