'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      width: '100%',
      borderBottom: '1px solid #ccc',
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto',
        padding: '0 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '4rem'
      }}>
        <Link href="/" style={{
          fontSize: '1.125rem',
          fontWeight: 'bold',
          color: '#3b82f6',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          whiteSpace: 'nowrap'
        }}>
          ⭐ StartupVault
        </Link>
        
        <div style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center'
        }}>
          <Link 
            href="/" 
            style={{
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              transition: 'all 0.2s',
              color: mounted && pathname === '/' ? '#3b82f6' : '#4b5563',
              background: mounted && pathname === '/' ? '#eff6ff' : 'transparent',
              border: mounted && pathname === '/' ? '1px solid #bfdbfe' : '1px solid transparent'
            }}
          >
            Startups
          </Link>
          
          <Link 
            href="/compare" 
            style={{
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              transition: 'all 0.2s',
              color: mounted && pathname === '/compare' ? '#3b82f6' : '#4b5563',
              background: mounted && pathname === '/compare' ? '#eff6ff' : 'transparent',
              border: mounted && pathname === '/compare' ? '1px solid #bfdbfe' : '1px solid transparent'
            }}
          >
            Compare
          </Link>
          
          <Link 
            href="/analytics" 
            style={{
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              transition: 'all 0.2s',
              color: mounted && pathname === '/analytics' ? '#3b82f6' : '#4b5563',
              background: mounted && pathname === '/analytics' ? '#eff6ff' : 'transparent',
              border: mounted && pathname === '/analytics' ? '1px solid #bfdbfe' : '1px solid transparent'
            }}
          >
            Analytics
          </Link>
        </div>
      </div>
    </nav>
  );
}
