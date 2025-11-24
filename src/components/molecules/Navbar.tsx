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
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link 
          href="/" 
          className="text-xl font-bold gradient-text-primary flex items-center gap-2 hover:scale-110 transition-transform duration-200"
        >
          ⭐ StartupVault
        </Link>
        
        <div className="flex gap-1 items-center">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                isActive(item.href)
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-foreground hover:bg-muted/50'
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
