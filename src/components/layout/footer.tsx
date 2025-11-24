'use client';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="flex flex-col gap-3">
            <div className="text-lg font-bold gradient-text-primary">
              ⭐ StartupVault
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Discover and clone proven startup business models using authentic data from TrustMRR.com
            </p>
          </div>

          {/* Product Column */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-foreground">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/startups" className="text-muted-foreground hover:text-primary transition-colors">Browse Startups</a></li>
              <li><a href="/compare" className="text-muted-foreground hover:text-primary transition-colors">Compare</a></li>
              <li><a href="/analytics" className="text-muted-foreground hover:text-primary transition-colors">Analytics</a></li>
              <li><a href="/leaderboard" className="text-muted-foreground hover:text-primary transition-colors">Leaderboard</a></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-foreground">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/features" className="text-muted-foreground hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-foreground">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} <span className="font-semibold text-foreground">StartupVault</span>. Authentic data from <span className="font-medium text-primary">TrustMRR.com</span>
          </p>
          <div className="flex items-center gap-3">
            <a href="#" className="w-8 h-8 rounded-full bg-muted hover:bg-primary/20 transition-colors flex items-center justify-center text-xs">𝕏</a>
            <a href="#" className="w-8 h-8 rounded-full bg-muted hover:bg-primary/20 transition-colors flex items-center justify-center text-xs">f</a>
            <a href="#" className="w-8 h-8 rounded-full bg-muted hover:bg-primary/20 transition-colors flex items-center justify-center text-xs">in</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
