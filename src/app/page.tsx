'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden">
      {/* Background gradient blur effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9]/10 via-[#8B5CF6]/10 to-[#EC4899]/10 blur-3xl opacity-30" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/50 via-black to-black" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center relative z-10 px-4"
      >
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] via-[#8B5CF6] to-[#EC4899] mb-6"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ 
            duration: 0.8,
            delay: 0.2,
            type: "spring",
            stiffness: 100 
          }}
        >
          DevPath
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          {/* Animated line */}
          <div className="h-0.5 w-32 md:w-48 mx-auto bg-gradient-to-r from-[#0EA5E9]/20 via-[#8B5CF6]/20 to-[#EC4899]/20 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              className="h-full w-full bg-gradient-to-r from-[#0EA5E9] via-[#8B5CF6] to-[#EC4899] origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </div>

          {/* Description text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-6 text-gray-400 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Chart your path to becoming a developer with our comprehensive roadmaps and resources
          </motion.p>

          {/* Navigation buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/roadmap" className="inline-block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] 
                  text-white font-medium transition-all
                  shadow-lg shadow-[#0EA5E9]/20 hover:shadow-[#0EA5E9]/40
                  border border-white/10"
              >
                Explore Paths →
              </motion.button>
            </Link>
            <Link href="/resources" className="inline-block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full bg-black/40
                  text-white font-medium transition-all
                  shadow-lg hover:shadow-[#8B5CF6]/20
                  border border-white/10 hover:border-[#8B5CF6]/50"
              >
                View Resources
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}