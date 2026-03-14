'use client';

import Link from 'next/link';
import { useState } from 'react';
import SearchBar from './SearchBar';

const NAV_CATEGORIES = [
  { name: 'Finance', slug: 'finance-tools' },
  { name: 'Construction', slug: 'construction-tools' },
  { name: 'Converters', slug: 'unit-converters' },
  { name: 'Health', slug: 'health-fitness-tools' },
  { name: 'Math', slug: 'math-education-tools' },
  { name: 'Text', slug: 'text-writing-tools' },
  { name: 'Developer', slug: 'developer-web-tools' },
  { name: 'Generators', slug: 'generators' },
  { name: 'Everyday', slug: 'everyday-life-tools' },
  { name: 'Business', slug: 'business-ecommerce-tools' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600 shrink-0">
              <span className="text-2xl">🧰</span>
              <span>Toolbox<span className="text-gray-400">.ai</span></span>
            </Link>

            {/* Desktop search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <SearchBar compact />
            </div>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_CATEGORIES.slice(0, 5).map(c => (
                <Link key={c.slug} href={`/category/${c.slug}`}
                  className="text-sm text-gray-600 hover:text-blue-600 px-3 py-1.5 rounded-md hover:bg-blue-50 transition-colors">
                  {c.name}
                </Link>
              ))}
              <Link href="/#categories"
                className="text-sm text-blue-600 font-medium px-3 py-1.5 rounded-md hover:bg-blue-50">
                All Tools ›
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>

          {/* Mobile search */}
          <div className="md:hidden pb-3">
            <SearchBar compact />
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white py-2 px-4">
            <div className="grid grid-cols-2 gap-1">
              {NAV_CATEGORIES.map(c => (
                <Link key={c.slug} href={`/category/${c.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-gray-700 hover:text-blue-600 py-2 px-3 rounded-md hover:bg-blue-50">
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-8">
            {/* Brand */}
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white mb-3">
                <span className="text-2xl">🧰</span>
                <span>Toolbox.ai</span>
              </Link>
              <p className="text-sm text-gray-400 leading-relaxed">
                1,000+ free online tools for finance, construction, conversion, health, math, and more. Fast, accurate, no signup required.
              </p>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Tools</h3>
              <ul className="space-y-2 text-sm">
                {NAV_CATEGORIES.slice(0,5).map(c => (
                  <li key={c.slug}><Link href={`/category/${c.slug}`} className="hover:text-white transition-colors">{c.name}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">More</h3>
              <ul className="space-y-2 text-sm">
                {NAV_CATEGORIES.slice(5).map(c => (
                  <li key={c.slug}><Link href={`/category/${c.slug}`} className="hover:text-white transition-colors">{c.name}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Popular</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/tools/bmi-calculator" className="hover:text-white">BMI Calculator</Link></li>
                <li><Link href="/tools/loan-calculator" className="hover:text-white">Loan Calculator</Link></li>
                <li><Link href="/tools/age-calculator" className="hover:text-white">Age Calculator</Link></li>
                <li><Link href="/tools/percentage-calculator" className="hover:text-white">% Calculator</Link></li>
                <li><Link href="/tools/password-generator" className="hover:text-white">Password Generator</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="/disclaimer" className="hover:text-white">Disclaimer</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Toolbox.ai — All rights reserved.</p>
            <p>For informational purposes only. Not professional advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
