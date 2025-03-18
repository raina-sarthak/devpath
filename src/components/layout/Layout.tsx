'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="flex-grow pt-16" // Add padding-top to account for fixed navbar
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </div>
  );
} 