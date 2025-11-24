'use client';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-16 border-t border-border bg-gradient-to-br from-blue-50/50 to-purple-50/50">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ⭐ StartupVault
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Discover and clone proven startup business models using authenticated data from TrustMRR.com
            </p>
          </div>

          {/* Product Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/startups" className="text-muted-foreground hover:text-primary transition-colors">Browse Startups</a></li>
              <li><a href="/compare" className="text-muted-foreground hover:text-primary transition-colors">Compare</a></li>
              <li><a href="/analytics" className="text-muted-foreground hover:text-primary transition-colors">Analytics</a></li>
              <li><a href="/leaderboard" className="text-muted-foreground hover:text-primary transition-colors">Leaderboard</a></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-muted-foreground hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="/" className="text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
              <li><a href="/" className="text-muted-foreground hover:text-primary transition-colors">API</a></li>
              <li><a href="/" className="text-muted-foreground hover:text-primary transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-muted-foreground hover:text-primary transition-colors">About</a></li>
              <li><a href="/" className="text-muted-foreground hover:text-primary transition-colors">Privacy</a></li>
              <li><a href="/" className="text-muted-foreground hover:text-primary transition-colors">Terms</a></li>
              <li><a href="/" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} <span className="font-semibold text-foreground">StartupVault</span>. Authentic data from <span className="font-medium text-primary">TrustMRR.com</span>
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">Follow us:</span>
            <div className="flex gap-3">
              <a href="#" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted hover:bg-primary/20 transition-colors">
                <span className="text-sm">𝕏</span>
              </a>
              <a href="#" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted hover:bg-primary/20 transition-colors">
                <span className="text-sm">f</span>
              </a>
              <a href="#" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted hover:bg-primary/20 transition-colors">
                <span className="text-sm">in</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
