import { motion } from 'framer-motion';
import { FiArrowRight, FiStar } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';

const SlideContent = ({ slide, isActive }) => {
  const textVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const buttonVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        delay: 0.4,
        ease: "easeOut" 
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        duration: 0.6, 
        delay: 0.6,
        ease: "easeOut" 
      }
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background Image with Zoom Animation */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${slide.image})` }}
        animate={isActive ? { scale: [1, 1.6, 1] } : { scale: 1 }}
        transition={{ duration: 15, ease: "easeInOut", repeat: Infinity }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Animated SVG Background Elements */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 800">
        <motion.path
          d="M0,400 Q300,200 600,400 T1200,400"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        <motion.circle
          cx="100"
          cy="100"
          r="3"
          fill="rgba(255,255,255,0.3)"
          initial={{ scale: 0 }}
          animate={isActive ? { scale: [0, 1, 0] } : { scale: 0 }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
        <motion.circle
          cx="1100"
          cy="150"
          r="2"
          fill="rgba(255,255,255,0.4)"
          initial={{ scale: 0 }}
          animate={isActive ? { scale: [0, 1, 0] } : { scale: 0 }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }}
        />
      </svg>

      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center justify-center px-8">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Animated Icons */}
          <motion.div
            className="flex justify-center space-x-4 mb-6"
            variants={iconVariants}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
          >
            <HiSparkles className="text-yellow-400 text-3xl" />
            <FiStar className="text-white text-2xl" />
            <HiSparkles className="text-yellow-400 text-3xl" />
          </motion.div>

          {/* Animated Text Content */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
          >
            <motion.h2 
              className="text-lg md:text-xl font-light mb-4 tracking-wide"
              variants={textVariants}
            >
              {slide.subtitle}
            </motion.h2>
            
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              variants={textVariants}
            >
              {slide.title}
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90 leading-relaxed"
              variants={textVariants}
            >
              {slide.description}
            </motion.p>
          </motion.div>

          {/* Animated Button */}
          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
          >
            <motion.button
              className="group bg-white text-black px-8 py-4 rounded-full font-semibold text-lg flex items-center space-x-3 mx-auto hover:bg-gray-100 transition-all duration-300 shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Shop Now</span>
              <motion.div
                className="group-hover:translate-x-1 transition-transform duration-300"
              >
                <FiArrowRight className="text-xl" />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SlideContent;