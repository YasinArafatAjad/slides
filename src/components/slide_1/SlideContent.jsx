import { motion } from 'framer-motion';
import { FiStar, FiTrendingUp, FiZap, FiShield, FiHeart, FiAward } from 'react-icons/fi';
import AnimatedText from './AnimatedText';
import AnimatedButton from './AnimatedButton';

const SlideContent = ({ slide }) => {
  const slideData = {
    0: {
      badge: { icon: FiZap, text: "New Collection Available", color: "from-blue-500/20 to-purple-500/20 border-blue-500/30" },
      title: "Discover Premium Quality Products",
      subtitle: "Experience the perfect blend of style, comfort, and innovation with our carefully curated collection.",
      features: [
        { icon: FiStar, text: "Premium Quality" },
        { icon: FiTrendingUp, text: "Fast Delivery" },
        { icon: FiZap, text: "Best Prices" }
      ],
      buttonText: "Shop Now"
    },
    1: {
      badge: { icon: FiShield, text: "Trusted by Millions", color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30" },
      title: "Luxury Meets Affordability",
      subtitle: "Discover our exclusive range of premium products designed for the modern lifestyle. Quality guaranteed.",
      features: [
        { icon: FiShield, text: "Lifetime Warranty" },
        { icon: FiHeart, text: "Customer Love" },
        { icon: FiAward, text: "Award Winning" }
      ],
      buttonText: "Explore Collection"
    },
    2: {
      badge: { icon: FiAward, text: "Limited Time Offer", color: "from-orange-500/20 to-red-500/20 border-orange-500/30" },
      title: "Exclusive Designer Collection",
      subtitle: "Step into the world of luxury with our handpicked designer pieces. Limited edition items available now.",
      features: [
        { icon: FiAward, text: "Designer Quality" },
        { icon: FiStar, text: "Limited Edition" },
        { icon: FiZap, text: "Express Shipping" }
      ],
      buttonText: "Get Exclusive Access"
    }
  };

  const currentSlide = slideData[slide];

  return (
    <motion.div 
      className="w-full max-w-2xl mx-auto lg:mx-0 px-4 lg:px-0 lg:pr-8 text-center lg:text-left"
      key={`content-${slide}`}
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Badge */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className={`flex items-center gap-2 bg-gradient-to-r ${currentSlide.badge.color} backdrop-blur-sm border rounded-full px-3 py-2 mb-6 lg:mb-8 w-fit mx-auto lg:mx-0`}
      >
        <currentSlide.badge.icon className="text-yellow-400 text-sm" />
        <span className="text-xs lg:text-sm font-medium text-blue-200">{currentSlide.badge.text}</span>
      </motion.div>

      {/* Main Heading */}
      <AnimatedText
        text={currentSlide.title}
        delay={0.3}
        className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 lg:mb-6 leading-tight"
        key={`title-${slide}`}
      />

      {/* Subheading */}
      <AnimatedText
        text={currentSlide.subtitle}
        delay={0.8}
        className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 lg:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0"
        key={`subtitle-${slide}`}
      />    
      
      <motion.div
        key={`button-${slide}`}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="flex justify-center lg:justify-start"
      >
        <AnimatedButton buttonText={currentSlide.buttonText} />
      </motion.div>
    </motion.div>
  );
};

export default SlideContent;