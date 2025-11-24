'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/startups', label: 'Startups' },
    { href: '/compare', label: 'Compare' },
    { href: '/analytics', label: 'Analytics' }
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link 
          href="/" 
          className="text-xl font-bold flex items-center gap-2 hover:opacity-80 transition-opacity duration-200"
          style={{
            background: 'linear-gradient(135deg, #1a3a52 0%, #ff6b35 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          ⭐ StartupVault
        </Link>
        
        <div className="flex gap-2 items-center">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                isActive(item.href)
                  ? 'bg-primary text-white shadow-md'
                  : 'text-foreground hover:bg-muted/50 hover:text-primary'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
