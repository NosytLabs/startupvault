'use client';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">⭐ StartupVault</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm hover:text-primary transition">Explore</a>
            <a href="#" className="text-sm hover:text-primary transition">About</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
