'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-300 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex-shrink-0 font-bold text-lg text-blue-600 hover:opacity-75 transition-opacity">
            ⭐ StartupVault
          </Link>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                pathname === '/' 
                  ? 'text-blue-600 bg-blue-50 border border-blue-200' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Startups
            </Link>
            
            <Link 
              href="/compare" 
              className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                pathname === '/compare' 
                  ? 'text-blue-600 bg-blue-50 border border-blue-200' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Compare
            </Link>
            
            <Link 
              href="/analytics" 
              className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                pathname === '/analytics' 
                  ? 'text-blue-600 bg-blue-50 border border-blue-200' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Analytics
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
