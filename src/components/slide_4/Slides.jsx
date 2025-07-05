import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaArrowRight, FaStar } from 'react-icons/fa';

const Slides = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Revolutionary Design Experience",
      subtitle: "Transform Your Vision Into Reality",
      description: "Experience the future of design with our cutting-edge platform that combines innovation, creativity, and seamless functionality to bring your ideas to life.",
      badge: "New Launch",
      stats: { rating: "4.9", reviews: "2.5k", users: "50k+" }
    },
    {
      id: 2,
      title: "Premium Quality Guaranteed",
      subtitle: "Excellence in Every Detail",
      description: "Discover premium quality products and services that exceed expectations, crafted with precision and delivered with unmatched attention to detail.",
      badge: "Best Seller",
      stats: { rating: "4.8", reviews: "5.2k", users: "100k+" }
    },
    {
      id: 3,
      title: "Innovation Meets Performance",
      subtitle: "Power Your Success",
      description: "Unleash the power of innovation with our high-performance solutions designed to accelerate your growth and transform your business landscape.",
      badge: "Featured",
      stats: { rating: "4.9", reviews: "3.8k", users: "75k+" }
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const slideVariants = {
    enter: {
      y: 50,
      opacity: 0
    },
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1
    },
    exit: {
      zIndex: 0,
      y: -50,
      opacity: 0
    }
  };

  return (
    <section className="relative h-[100vh] overflow-hidden">
      {/* Background with fixed image */}
      <div
        className="absolute inset-0 bg-cover bg-center h-full w-full"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-blue-400/40 rounded-full"
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  y: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 }
                }}
                className="flex items-center justify-center"
              >
                {/* Content - Centered */}
                <div className="text-center max-w-4xl">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-4"
                  >
                    <span className="inline-block bg-gradient-to-r from-blue-500 to-zinc-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {slides[currentSlide].badge}
                    </span>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight"
                  >
                    {slides[currentSlide].title}
                  </motion.h1>

                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl md:text-2xl text-blue-300 mb-6 font-medium"
                  >
                    {slides[currentSlide].subtitle}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
                  >
                    {slides[currentSlide].description}
                  </motion.p>

                  {/* Stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-wrap justify-center gap-6 mb-8"
                  >
                    <div className="flex items-center gap-2 text-white">
                      <FaStar className="text-yellow-400" />
                      <span className="font-semibold">{slides[currentSlide].stats.rating}</span>
                      <span className="text-gray-400">({slides[currentSlide].stats.reviews} reviews)</span>
                    </div>
                    <div className="text-white">
                      <span className="font-semibold">{slides[currentSlide].stats.users}</span>
                      <span className="text-gray-400"> active users</span>
                    </div>
                  </motion.div>

                  {/* Shop Now Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <motion.button
                      className="group relative bg-gradient-to-r from-blue-500 to-zinc-500 text-white px-8 py-4 rounded-lg font-semibold text-lg overflow-hidden"
                      whileHover={{
                        background: "linear-gradient(to right, #2563eb, #0284c7)",
                        transition: { duration: 0.3 }
                      }}
                      whileTap={{ y: 2 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        Shop Now
                        <motion.span
                          initial={{ x: -10 }}
                          whileHover={{  x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FaArrowRight className="text-sm" />
                        </motion.span>
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows - Hidden on mobile */}
            <div className="hidden md:flex">
              <motion.button
                onClick={prevSlide}
                className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-lg text-white p-4 rounded-full hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaChevronLeft className="text-xl" />
              </motion.button>

              <motion.button
                onClick={nextSlide}
                className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-lg text-white p-4 rounded-full hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaChevronRight className="text-xl" />
              </motion.button>
            </div>
          </div>
        </div>
        {/* Slide Indicators */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                  ? 'bg-blue-500 scale-125'
                  : 'bg-white/40 hover:bg-white/60'
                }`}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Slides;