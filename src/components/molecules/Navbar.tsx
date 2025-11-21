'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  const links = [
    { href: '/', label: 'Startups' },
    { href: '/compare', label: 'Compare' },
    { href: '/analytics', label: 'Analytics' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex h-16 items-center justify-between gap-8">
          <Link href="/" className="flex-shrink-0 hover:opacity-75 transition-opacity duration-200">
            <span className="text-xl font-bold text-primary">⭐ StartupVault</span>
          </Link>
          <div className="flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                  pathname === link.href
                    ? 'text-primary border-b-2 border-primary pb-1'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
