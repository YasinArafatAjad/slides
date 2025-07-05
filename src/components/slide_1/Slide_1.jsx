import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container, Box } from '@mui/material';
import SlideContent from './SlideContent';
import SlideImage from './SlideImage';
import AnimatedSVG from './AnimatedSVG';

const Slide_1 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  const gradients = [
    "from-slate-900 via-purple-900 to-slate-900",
    "from-slate-900 via-emerald-900 to-slate-900",
    "from-slate-900 via-blue-900 to-slate-900"
  ];

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 7000); // 7 seconds per slide

    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <Box className={`relative min-h-screen overflow-hidden bg-gradient-to-br ${gradients[currentSlide]} transition-all duration-1000`}>
      <AnimatedSVG />
      
      {/* Background overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"
        animate={{ opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <Container maxWidth="xl" className="relative z-10 h-full">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen py-8 lg:py-12 gap-8 lg:gap-12">
          {/* Left Content */}
          <div className="w-full lg:flex-1 order-2 lg:order-1">
            <SlideContent slide={currentSlide} />
          </div>

          {/* Right Content - Image */}
          <div className="w-full lg:flex-1 order-1 lg:order-2 flex justify-center">
            <SlideImage slide={currentSlide} />
          </div>
        </div>
      </Container>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent" />
      
      {/* Slide dots-progress indicator */}
      <div className="absolute bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <motion.div
              key={index}
              className={`relative overflow-hidden rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-8 h-2 bg-gradient-to-r from-blue-500 to-purple-500' 
                  : 'w-2 h-2 bg-white/30'
              }`}
            >
              {index === currentSlide && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400"
                  initial={{ x: '-100%' }}
                  animate={{ x: '0%' }}
                  transition={{ duration: 6, ease: 'linear' }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default Slide_1;