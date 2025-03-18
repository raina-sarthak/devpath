'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { tracks } from '@/data/roadmaps';
import Link from 'next/link';

export default function ExpandedRoadmap() {
  const params = useParams();
  const trackId = params.trackId as string;
  const track = tracks.find(t => t.id === trackId);

  if (!track) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Roadmap not found</h2>
          <Link href="/roadmap">
            <button className="text-blue-400 hover:text-blue-300 transition-colors">
              Return to Roadmaps
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const gradientColors = {
    'Beginner': 'from-emerald-600 to-emerald-400',
    'Intermediate': 'from-amber-600 to-amber-400',
    'Advanced': 'from-rose-600 to-rose-400'
  };

  return (
    <div className="min-h-screen bg-black text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-pink-900/10 opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900/80 via-black to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Back button */}
        <Link href="/roadmap">
          <button className="mb-8 text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Roadmaps</span>
          </button>
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="text-6xl mb-6 block filter drop-shadow-lg">{track.icon}</span>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#0EA5E9] via-[#8B5CF6] to-[#EC4899] text-transparent bg-clip-text">
            {track.title}
          </h1>
          <p className="text-gray-400 text-lg">{track.description}</p>
        </motion.div>

        {/* Track Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          {/* Difficulty and Time */}
          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1">Difficulty</p>
              <span className={`px-4 py-1 rounded-full text-sm bg-gradient-to-r ${gradientColors[track.difficulty]} text-white`}>
                {track.difficulty}
              </span>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1">Estimated Time</p>
              <span className="text-white">{track.estimatedTime}</span>
            </div>
          </div>

          {/* Prerequisites */}
          {track.prerequisites && (
            <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-4 text-white">Prerequisites</h2>
              <ul className="list-disc list-inside space-y-2">
                {track.prerequisites.map((prereq, idx) => (
                  <li key={idx} className="text-gray-300">{prereq}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies */}
          <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4 text-white">Technologies You&apos;ll Learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {track.technologies.map((tech, idx) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-black/40 rounded-lg p-4 border border-white/10"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-white">{tech.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${
                      tech.level === 'Beginner' ? 'bg-emerald-950 text-emerald-400' :
                      tech.level === 'Intermediate' ? 'bg-amber-950 text-amber-400' :
                      'bg-rose-950 text-rose-400'
                    }`}>
                      {tech.level}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{tech.description}</p>
                  {tech.resources && (
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <p className="text-xs font-medium text-gray-300 mb-2">Learning Resources:</p>
                      <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                        {tech.resources.map((resource, idx) => (
                          <li key={idx}>{resource}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 