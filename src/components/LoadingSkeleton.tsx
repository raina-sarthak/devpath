import { motion } from 'framer-motion';

export function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="relative rounded-xl p-6 backdrop-blur-lg
            bg-white/5 border border-white/10 overflow-hidden"
        >
          <div className="animate-pulse space-y-4">
            <div className="h-10 w-10 bg-white/10 rounded-full" />
            <div className="h-6 w-3/4 bg-white/10 rounded" />
            <div className="h-4 w-full bg-white/10 rounded" />
            <div className="h-0.5 w-full bg-white/10 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
} 