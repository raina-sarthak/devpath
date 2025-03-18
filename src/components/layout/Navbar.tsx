'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchBar } from '@/components/SearchBar';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Roadmap', href: '/roadmap' },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
            {/* Desktop Search Button */}
            <div className="relative flex items-center">
              <div className="relative flex items-center">
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div
                      initial={{ width: 0, opacity: 0, x: "100%" }}
                      animate={{ width: "300px", opacity: 1, x: "0%" }}
                      exit={{ width: 0, opacity: 0, x: "100%" }}
                      transition={{ 
                        duration: 0.3,
                        ease: [0.4, 0, 0.2, 1],
                        opacity: { duration: 0.15, ease: "linear" }
                      }}
                      className="absolute right-8 top-1/2 -translate-y-1/2 origin-right"
                    >
                      <SearchBar variant="navbar" onClose={() => setIsSearchOpen(false)} />
                    </motion.div>
                  )}
                </AnimatePresence>
                <motion.button
                  animate={{
                    scale: isSearchOpen ? 1.1 : 1,
                    color: isSearchOpen ? "rgb(255, 255, 255)" : "rgb(209, 213, 219)"
                  }}
                  transition={{ duration: 0.2 }}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </motion.button>
              </div>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Search Button */}
            <button
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Mobile Menu Button */}
            <button
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
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
      </div>

      {/* Mobile Search */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 p-4"
          >
            <SearchBar variant="navbar" onClose={() => setIsSearchOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 