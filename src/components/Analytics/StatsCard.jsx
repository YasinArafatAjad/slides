import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatsCard = ({ title, value, change, changeType, icon: Icon, color = 'primary' }) => {
  const colorClasses = {
    primary: 'from-primary-500 to-red-500',
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-green-500 to-emerald-500',
    purple: 'from-purple-500 to-pink-500',
    orange: 'from-orange-500 to-yellow-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-dark-800 rounded-xl shadow-lg border border-gray-200 dark:border-dark-700 p-6 relative overflow-hidden"
    >
      {/* Background Gradient */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorClasses[color]} opacity-10 rounded-full -mr-16 -mt-16`} />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses[color]} shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          {change && (
            <div className={`flex items-center space-x-1 ${
              changeType === 'increase' ? 'text-green-500' : 'text-red-500'
            }`}>
              {changeType === 'increase' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">{change}</span>
            </div>
          )}
        </div>
        
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {value}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {title}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;