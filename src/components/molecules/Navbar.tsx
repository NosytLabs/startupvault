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
    <nav suppressHydrationWarning className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link 
          href="/" 
          className="font-bold flex items-center gap-2 hover:opacity-90 transition-opacity duration-200 text-lg md:text-xl whitespace-nowrap flex-shrink-0 text-primary"
        >
          ⭐ StartupVault
        </Link>
        
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexShrink: 0 }} className="md:gap-2">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              className={`px-3 md:px-4 py-2 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 whitespace-nowrap ${
                isActive(item.href)
                  ? 'bg-primary text-white shadow-md hover:shadow-lg hover:bg-primary/90'
                  : 'text-foreground/80 hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary/30'
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
