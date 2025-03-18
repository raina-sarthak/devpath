'use client';

import React, { useState, useCallback, memo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { tracks } from '@/data/roadmaps';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';

// Memoized components
const TechnologyCard = memo(({ tech, isExpanded, onToggle }: { 
  tech: { name: string; level: string; description: string; resources?: string[]; }; 
  isExpanded: boolean; 
  onToggle: () => void;
}) => (
  <div
    className="text-sm bg-black/40 rounded-lg p-3 cursor-pointer hover:bg-black/60 transition-colors border border-white/5"
    onClick={onToggle}
  >
    <div className="flex items-center justify-between">
      <span className="text-white/90">{tech.name}</span>
      <span className={`text-xs px-2 py-1 rounded ${
        tech.level === 'Beginner' ? 'bg-emerald-950 text-emerald-400' :
        tech.level === 'Intermediate' ? 'bg-amber-950 text-amber-400' :
        'bg-rose-950 text-rose-400'
      }`}>
        {tech.level}
      </span>
    </div>
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-2 space-y-2"
        >
          <p className="text-gray-400 text-xs">{tech.description}</p>
          {tech.resources && (
            <div className="pt-2 border-t border-white/5">
              <p className="text-xs font-medium text-gray-300 mb-1">Resources:</p>
              <ul className="list-disc list-inside text-xs text-gray-400">
                {tech.resources.map((resource, idx) => (
                  <li key={idx}>{resource}</li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
));

TechnologyCard.displayName = 'TechnologyCard';

// Track details component
const TrackDetails = memo(({ track, expandedTech, setExpandedTech }: {
  track: typeof tracks[0];
  expandedTech: string | null;
  setExpandedTech: (tech: string | null) => void;
}) => (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: 'auto' }}
    exit={{ opacity: 0, height: 0 }}
    transition={{ duration: 0.3 }}
    className="mt-4 overflow-hidden"
  >
    {track.prerequisites && (
      <>
        <h4 className="font-semibold text-sm text-gray-300 mb-2">Prerequisites:</h4>
        <ul className="list-disc list-inside text-sm text-gray-400 space-y-1 mb-4">
          {track.prerequisites.map((prereq, idx) => (
            <li key={idx} className="text-sm">{prereq}</li>
          ))}
        </ul>
      </>
    )}

    <h4 className="font-semibold text-sm text-gray-300 mb-2">Estimated Time: {track.estimatedTime}</h4>

    <h4 className="font-semibold text-sm text-gray-300 mb-2 mt-4">Key Technologies:</h4>
    <div className="space-y-2">
      {track.technologies.map((tech) => (
        <TechnologyCard
          key={tech.name}
          tech={tech}
          isExpanded={expandedTech === tech.name}
          onToggle={() => setExpandedTech(expandedTech === tech.name ? null : tech.name)}
        />
      ))}
    </div>
  </motion.div>
));

TrackDetails.displayName = 'TrackDetails';

// Memoized Track Card Component
const TrackCard = memo(({ 
  track, 
  isSelected, 
  isTransitioning,
  expandedTech,
  setExpandedTech,
  onSelect 
}: { 
  track: typeof tracks[0];
  isSelected: boolean;
  isTransitioning: boolean;
  expandedTech: string | null;
  setExpandedTech: (tech: string | null) => void;
  onSelect: (trackId: string) => void;
}) => {
  const gradientColors = {
    'Beginner': 'from-emerald-600 to-emerald-400',
    'Intermediate': 'from-amber-600 to-amber-400',
    'Advanced': 'from-rose-600 to-rose-400'
  };

  return (
    <div
      className={`relative group cursor-pointer rounded-xl p-6
        bg-black/40 border border-white/10 
        hover:bg-black/60 hover:border-white/20 
        transition-all overflow-hidden
        ${isSelected ? 'bg-black/60 border-white/20' : ''}
        ${isTransitioning ? 'pointer-events-none' : ''}`}
      onClick={() => onSelect(track.id)}
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity
        bg-gradient-to-r ${gradientColors[track.difficulty]}`} />
      
      <div className="relative z-10">
        <span className="text-4xl mb-4 block filter drop-shadow-lg">{track.icon}</span>
        <h3 className="text-xl font-semibold mb-2 text-white/90">{track.title}</h3>
        <p className="text-gray-400 text-sm">{track.description}</p>
        
        <motion.div
          initial={false}
          animate={{ scaleX: isSelected ? 1 : 0 }}
          className={`h-0.5 w-full mt-4 bg-gradient-to-r ${gradientColors[track.difficulty]}`}
        />

        <AnimatePresence>
          {isSelected && !isTransitioning && (
            <>
              <TrackDetails
                track={track}
                expandedTech={expandedTech}
                setExpandedTech={setExpandedTech}
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.2 }}
                className="mt-6 flex justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <Link href={`/roadmap/${track.id}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-6 py-2.5 rounded-full
                      overflow-hidden group
                      text-white font-medium text-base
                      shadow-lg hover:shadow-xl
                      flex items-center space-x-2
                      ${track.difficulty === 'Beginner' ? 'shadow-emerald-500/20 hover:shadow-emerald-500/40' :
                        track.difficulty === 'Intermediate' ? 'shadow-amber-500/20 hover:shadow-amber-500/40' :
                        'shadow-rose-500/20 hover:shadow-rose-500/40'}`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${gradientColors[track.difficulty]} opacity-90
                      group-hover:opacity-100 transition-opacity`} />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-30">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent" />
                    </div>
                    <div className={`absolute -inset-0.5 ${
                      track.difficulty === 'Beginner' ? 'bg-emerald-500/20' :
                      track.difficulty === 'Intermediate' ? 'bg-amber-500/20' :
                      'bg-rose-500/20'
                    } blur-md group-hover:blur-lg transition-all duration-300 opacity-70 group-hover:opacity-100`} />
                    <span className="relative z-10 font-medium">Start Learning</span>
                    <motion.svg 
                      className="relative z-10 w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      initial={{ x: 0 }}
                      animate={{ x: [0, 5, 0] }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 1.5,
                        ease: "easeInOut"
                      }}
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={3} 
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </motion.svg>
                  </motion.button>
                </Link>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Loading overlay */}
        <AnimatePresence>
          {isTransitioning && isSelected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-xl flex items-center justify-center"
            >
              <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});

TrackCard.displayName = 'TrackCard';

export default function RoadMap() {
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [expandedTech, setExpandedTech] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleTrackSelect = useCallback((trackId: string) => {
    if (trackId === selectedTrack) {
      setIsTransitioning(true);
      setSelectedTrack(null);
      setExpandedTech(null);
      setTimeout(() => setIsTransitioning(false), 300);
      return;
    }

    setIsTransitioning(true);
    setSelectedTrack(trackId);
    setExpandedTech(null);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [selectedTrack]);

  return (
    <div className="min-h-screen bg-black text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-pink-900/10 opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900/80 via-black to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#0EA5E9] via-[#8B5CF6] to-[#EC4899] text-transparent bg-clip-text drop-shadow-lg">
            Choose Your Path
          </h2>
          <p className="text-gray-400">Select a development track to begin your journey</p>
        </div>

        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tracks.map((track) => (
              <TrackCard
                key={track.id}
                track={track}
                isSelected={selectedTrack === track.id}
                isTransitioning={isTransitioning}
                expandedTech={expandedTech}
                setExpandedTech={setExpandedTech}
                onSelect={handleTrackSelect}
              />
            ))}
          </div>
        )}

        {/* Call to action */}
        <div className="text-center mt-16">
          <Link href={selectedTrack ? `/${selectedTrack}` : '#'} className="inline-block">
            <motion.button 
              whileHover={selectedTrack && !isTransitioning ? { scale: 1.05 } : {}}
              whileTap={selectedTrack && !isTransitioning ? { scale: 0.95 } : {}}
              className={`relative px-8 py-3 rounded-full
                overflow-hidden group
                text-white font-medium text-base
                shadow-lg
                ${selectedTrack && !isTransitioning ? 
                  'hover:shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 cursor-pointer' : 
                  'opacity-50 cursor-not-allowed'}`}
              disabled={!selectedTrack || isTransitioning}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6]
                group-hover:opacity-90 transition-opacity" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent" />
              </div>
              <div className="absolute -inset-0.5 bg-blue-500/20 blur-md group-hover:blur-lg transition-all duration-300 
                opacity-70 group-hover:opacity-100" />
              <motion.div 
                className="relative z-10 flex items-center space-x-2"
                animate={
                  isTransitioning ? 
                  { scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 1 } } :
                  {}
                }
              >
                {isTransitioning ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <span>{selectedTrack ? 'Start Learning' : 'Select a path to begin'}</span>
                    {selectedTrack && (
                      <motion.svg 
                        className="w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        initial={{ x: 0 }}
                        animate={{ x: [0, 5, 0] }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 1.5,
                          ease: "easeInOut"
                        }}
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </motion.svg>
                    )}
                  </>
                )}
              </motion.div>
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
} 