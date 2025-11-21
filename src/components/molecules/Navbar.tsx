'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const styles = `
    <style>
      .navbar {
        position: sticky;
        top: 0;
        z-index: 50;
        width: 100%;
        border-bottom: 1px solid #ccc;
        background: white;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      }
      
      .navbar-container {
        max-width: 80rem;
        margin: 0 auto;
        padding: 0 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 4rem;
      }
      
      .navbar-logo {
        font-size: 1.125rem;
        font-weight: bold;
        color: #3b82f6;
        text-decoration: none;
        display: flex;
        align-items: center;
        white-space: nowrap;
      }
      
      .navbar-logo:hover {
        opacity: 0.75;
      }
      
      .navbar-links {
        display: flex;
        gap: 1rem;
        align-items: center;
        margin: 0;
        padding: 0;
        list-style: none;
      }
      
      .navbar-link {
        text-decoration: none;
        padding: 0.5rem 1rem;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        font-weight: 500;
        transition: all 0.2s;
        color: #4b5563;
        background: transparent;
        border: 1px solid transparent;
      }
      
      .navbar-link:hover {
        color: #3b82f6;
        background: #f3f4f6;
      }
      
      .navbar-link.active {
        color: #3b82f6;
        background: #eff6ff;
        border: 1px solid #bfdbfe;
      }
    </style>
  `;

  return (
    <>
      {styles && <style dangerouslySetInnerHTML={{__html: styles.replace(/<style>|<\/style>/g, '')}} />}
      <nav className="navbar">
        <div className="navbar-container">
          <Link href="/" className="navbar-logo">
            ⭐ StartupVault
          </Link>
          
          <div className="navbar-links">
            <Link 
              href="/" 
              className={`navbar-link ${pathname === '/' ? 'active' : ''}`}
            >
              Startups
            </Link>
            
            <Link 
              href="/compare" 
              className={`navbar-link ${pathname === '/compare' ? 'active' : ''}`}
            >
              Compare
            </Link>
            
            <Link 
              href="/analytics" 
              className={`navbar-link ${pathname === '/analytics' ? 'active' : ''}`}
            >
              Analytics
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
