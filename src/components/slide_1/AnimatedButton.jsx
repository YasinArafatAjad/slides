import { motion } from 'framer-motion';
import { Button } from '@mui/material';
import { FiShoppingBag, FiArrowRight } from 'react-icons/fi';

const AnimatedButton = ({ buttonText = "Shop Now" }) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 100,
        delay: 1.2,
      }}
      className="flex justify-center lg:justify-start"
    >
      <motion.div
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        <Button
          variant="contained"
          size="large"
          className="font-semibold py-3 px-6 lg:py-4 lg:px-8 rounded-full shadow-2xl transition-all duration-300 text-sm lg:text-base"
          startIcon={<FiShoppingBag className="text-lg lg:text-xl" />}
          endIcon={<FiArrowRight className="text-lg lg:text-xl" />}
          sx={{ 
            backgroundColor: '#e6d9d9', 
            color: '#000', 
            '&:hover': { backgroundColor: '#e6d9d9' },
            minWidth: 'auto',
            '@media (max-width: 640px)': {
              fontSize: '0.875rem',
              padding: '12px 24px'
            }
          }}
        >
          {buttonText}
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedButton;