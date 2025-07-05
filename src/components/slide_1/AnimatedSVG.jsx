import { motion } from 'framer-motion';

const AnimatedSVG = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-20 left-10"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60" className="text-blue-400 opacity-30">
          <circle cx="30" cy="30" r="25" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="30" cy="30" r="15" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-40 right-20"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" className="text-purple-400 opacity-40">
          <polygon points="20,2 38,38 2,38" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-1/4"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <svg width="50" height="50" viewBox="0 0 50 50" className="text-pink-400 opacity-25">
          <rect x="10" y="10" width="30" height="30" stroke="currentColor" strokeWidth="2" fill="none" transform="rotate(45 25 25)" />
        </svg>
      </motion.div>

      {/* Animated lines */}
      <motion.svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 1200 800"
        initial="hidden"
        animate="visible"
      >
        <motion.path
          d="M0,400 Q300,200 600,400 T1200,400"
          stroke="url(#gradient)"
          strokeWidth="2"
          fill="none"
          className="opacity-30"
          variants={{
            hidden: { pathLength: 0 },
            visible: { pathLength: 1 },
          }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
};

export default AnimatedSVG;