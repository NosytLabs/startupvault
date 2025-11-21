'use client';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 border-t border-border bg-background">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} <span className="font-semibold text-foreground">StartupVault</span>. Authentic data from <span className="font-medium text-primary">TrustMRR.com</span>
          </p>
          <p className="text-xs text-muted-foreground">
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
