'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      width: '100%',
      background: scrolled 
        ? 'rgba(255, 255, 255, 0.9)' 
        : 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      borderBottom: scrolled 
        ? '1px solid rgba(229, 231, 235, 0.5)' 
        : '1px solid #e5e7eb',
      boxShadow: scrolled 
        ? '0 4px 20px rgba(59, 130, 246, 0.12)' 
        : '0 2px 16px rgba(59, 130, 246, 0.08)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto',
        padding: '0 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '4rem'
      }}>
        <Link href="/" style={{
          fontSize: '1.25rem',
          fontWeight: '900',
          background: 'linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          whiteSpace: 'nowrap',
          letterSpacing: '-0.5px',
          transition: 'transform 0.2s ease-out',
          cursor: 'pointer'
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          ⭐ StartupVault
        </Link>
        
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center'
        }}>
          {[
            { href: '/', label: 'Startups' },
            { href: '/compare', label: 'Compare' },
            { href: '/analytics', label: 'Analytics' }
          ].map((item, idx) => (
            <Link 
              key={item.href}
              href={item.href} 
              style={{
                textDecoration: 'none',
                padding: '0.625rem 1.125rem',
                borderRadius: '0.75rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                color: mounted && pathname === item.href ? '#ffffff' : '#4b5563',
                background: mounted && pathname === item.href 
                  ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
                  : 'transparent',
                border: 'none',
                boxShadow: mounted && pathname === item.href 
                  ? '0 4px 12px rgba(59, 130, 246, 0.3)'
                  : 'none',
                animation: mounted ? `slideInRight 0.4s ease-out ${idx * 0.1}s backwards` : 'none'
              }}
              onMouseEnter={e => {
                if (mounted && pathname !== item.href) {
                  e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={e => {
                if (mounted && pathname !== item.href) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
