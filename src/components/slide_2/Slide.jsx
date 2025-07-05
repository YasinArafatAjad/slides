import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaShoppingBag } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';

const Slide = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Revolutionary Design",
      subtitle: "Experience the Future",
      description: "Cutting-edge technology meets stunning aesthetics in our premium collection.",
      accent: "text-blue-300"
    },
    {
      id: 2,
      title: "Unleash Innovation",
      subtitle: "Transform Your Vision",
      description: "Where creativity meets functionality to deliver extraordinary experiences.",
      accent: "text-purple-300"
    },
    {
      id: 3,
      title: "Premium Excellence",
      subtitle: "Elevate Your Standards",
      description: "Discover the perfect blend of luxury, performance, and unmatched quality.",
      accent: "text-lime-300"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="h-[80vh] relative overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://res.cloudinary.com/diqrdzriq/video/upload/v1751228800/inm4omcuxhezhlvkpyzl.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Slide Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="w-full h-full flex items-center justify-center"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="container mx-auto px-6 text-center relative">
              {/* Main Content */}
              <motion.div
                className="max-w-4xl mx-auto"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <motion.h3
                  className={`text-lg font-medium ${slides[currentSlide].accent} mb-4`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {slides[currentSlide].subtitle}
                </motion.h3>

                <motion.h1
                  className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                >
                  {slides[currentSlide].title}
                </motion.h1>

                <motion.p
                  className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {slides[currentSlide].description}
                </motion.p>
              </motion.div>

              
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Navigation Arrows - Middle positioned */}
      <motion.button
        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-lg p-4 rounded-full text-white hover:bg-white/30 transition-all duration-300 border border-white/30 mt-20"
        onClick={prevSlide}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
      >
        <FaChevronLeft className="text-xl" />
      </motion.button>

      {/* Slide Indicators */}
              <motion.div
                className="flex justify-center space-x-2 mt-8 absolute bottom-6 left-1/2 -transform-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {slides.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/40'
                      }`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </motion.div>

      <motion.button
        className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-lg p-4 rounded-full text-white hover:bg-white/30 transition-all duration-300 border border-white/30"
        onClick={nextSlide}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
      >
        <FaChevronRight className="text-xl" />
      </motion.button>

      {/* Animated SVG Lines */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <svg width="120" height="60" viewBox="0 0 120 60">
          <motion.path
            d="M10,30 Q30,10 50,30 T90,30"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.circle
            cx="10"
            cy="30"
            r="3"
            fill="white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>
      </motion.div>
    </section>
  );
};

export default Slide; 