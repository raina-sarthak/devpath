'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Roadmap', href: '/roadmap' },
  { name: 'Resources', href: '/resources' },
  { name: 'Blog', href: '/blog' },
  { name: 'Community', href: '/community' },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-[#0EA5E9] via-[#8B5CF6] to-[#EC4899] text-transparent bg-clip-text">
              DevPath
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <button className="px-4 py-2 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] 
              text-white text-sm font-medium transition-all hover:opacity-90">
              Sign In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-around">
              <span className={`block h-0.5 w-full bg-white transform transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''
              }`} />
              <span className={`block h-0.5 w-full bg-white transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`} />
              <span className={`block h-0.5 w-full bg-white transform transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''
              }`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button className="w-full px-4 py-2 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] 
                text-white text-sm font-medium transition-all hover:opacity-90">
                Sign In
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 