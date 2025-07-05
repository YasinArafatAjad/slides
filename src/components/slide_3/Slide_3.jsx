import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideContent from './SlideContent';

const Slide_3 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Summer Collection",
      subtitle: "New Arrivals",
      description: "Discover our latest summer trends with premium quality fabrics and modern designs that elevate your style.",
      image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    {
      id: 2,
      title: "Urban Style",
      subtitle: "Street Fashion",
      description: "Express your personality with our urban collection featuring contemporary cuts and bold statements.",
      image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    {
      id: 3,
      title: "Premium Quality",
      subtitle: "Luxury Line",
      description: "Experience unmatched comfort and elegance with our premium collection crafted from finest materials.",
      image: "https://images.pexels.com/photos/1670187/pexels-photo-1670187.jpeg?auto=compress&cs=tinysrgb&w=1600"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="h-[80vh] relative overflow-hidden bg-black">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 0.6,
            ease: "easeInOut"
          }}
          className="absolute inset-0"
        >
          <SlideContent 
            slide={slides[currentSlide]} 
            isActive={true}
          />
        </motion.div>
      </AnimatePresence>

      {/* Side Navigation */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20">
        <div className="flex flex-col space-y-4">
          <motion.button
            className="w-12 h-12 rounded-full bg-black/70 bg-opacity-20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-opacity-30 transition-all duration-300"
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            whileTap={{ scale: 0.9 }}
          >
            ←
          </motion.button>
          <motion.button
            className="w-12 h-12 rounded-full bg-black/70 bg-opacity-20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-opacity-30 transition-all duration-300"
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            whileTap={{ scale: 0.9 }}
          >
            →
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Slide_3;