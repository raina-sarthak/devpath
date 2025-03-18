'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { tracks } from '@/data/roadmaps';

interface SearchBarProps {
  variant?: 'navbar' | 'landing';
  onClose?: () => void;
}

export function SearchBar({ variant = 'landing', onClose }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof tracks>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = tracks.filter(track => 
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.technologies.some(tech => 
          tech.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setSearchResults(filtered);
      setIsOpen(true);
    } else {
      setSearchResults([]);
      setIsOpen(false);
    }
  }, [searchQuery]);

  const handleSelect = (trackId: string) => {
    router.push(`/roadmap?selected=${trackId}`);
    setSearchQuery('');
    setIsOpen(false);
    onClose?.();
  };

  return (
    <div className={`relative ${variant === 'navbar' ? 'w-full max-w-md' : 'w-full max-w-2xl'}`}>
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search roadmaps, technologies..."
          className={`w-full bg-white/5 border border-white/10 rounded-full
            text-white placeholder-gray-400 
            focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50
            ${variant === 'navbar' ? 'px-4 py-2 text-sm' : 'px-6 py-3 text-lg'}`}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            ×
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full mt-2 w-full bg-black/90 border border-white/10 rounded-xl 
              backdrop-blur-xl shadow-xl z-50 max-h-96 overflow-auto"
          >
            {searchResults.map((result) => (
              <button
                key={result.id}
                onClick={() => handleSelect(result.id)}
                className="w-full px-4 py-3 flex items-start gap-3 hover:bg-white/5 transition-colors text-left"
              >
                <span className="text-2xl">{result.icon}</span>
                <div>
                  <h3 className="text-white font-medium">{result.title}</h3>
                  <p className="text-sm text-gray-400">{result.description}</p>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 