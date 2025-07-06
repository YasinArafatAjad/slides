import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaUsers, FaEye, FaFilter } from 'react-icons/fa';

const DetailedTrafficChart = ({ data, title, loading = false }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('sessions');

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {title}
        </h3>
        <div className="space-y-3">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
              <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Filter and sort data
  const filteredData = data
    .filter(item => filter === 'all' || item.category === filter)
    .sort((a, b) => {
      if (sortBy === 'sessions') return b.sessions - a.sessions;
      if (sortBy === 'users') return b.users - a.users;
      return a.platform.localeCompare(b.platform);
    });

  // Get unique categories for filter
  const categories = ['all', ...new Set(data.map(item => item.category))];

  const getSourceUrl = (source, medium) => {
    if (source.includes('google')) return 'https://google.com';
    if (source.includes('facebook')) return 'https://facebook.com';
    if (source.includes('instagram')) return 'https://instagram.com';
    if (source.includes('tiktok')) return 'https://tiktok.com';
    if (source.includes('youtube')) return 'https://youtube.com';
    if (source.includes('twitter')) return 'https://twitter.com';
    if (source.includes('linkedin')) return 'https://linkedin.com';
    if (source.includes('reddit')) return 'https://reddit.com';
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 sm:mb-0">
          {title}
        </h3>
        
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Category Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Sources' : category}
              </option>
            ))}
          </select>

          {/* Sort Options */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="sessions">Sort by Sessions</option>
            <option value="users">Sort by Users</option>
            <option value="platform">Sort by Platform</option>
          </select>
        </div>
      </div>

      {/* Traffic Sources List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredData.map((item, index) => {
          const sourceUrl = getSourceUrl(item.source, item.medium);
          
          return (
            <motion.div
              key={`${item.source}-${item.medium}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {/* Source Info */}
              <div className="flex items-center space-x-4 flex-1 min-w-0">
                <div className="text-2xl flex-shrink-0">
                  {item.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900 dark:text-white truncate">
                      {item.platform}
                    </h4>
                    {sourceUrl && (
                      <a
                        href={sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <FaExternalLinkAlt className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <span className="truncate">
                      {item.source} / {item.medium}
                    </span>
                    {item.campaign !== '(not set)' && (
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded text-xs">
                        {item.campaign}
                      </span>
                    )}
                  </div>
                  
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-2 ${
                    item.category === 'Social Media' ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400' :
                    item.category === 'Organic Search' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                    item.category === 'Direct' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                    item.category === 'Email Marketing' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' :
                    'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400'
                  }`}>
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Metrics */}
              <div className="flex items-center space-x-6 text-sm">
                <div className="text-center">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                    <FaEye className="w-3 h-3 mr-1" />
                    <span className="text-xs">Sessions</span>
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {item.sessions.toLocaleString()}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                    <FaUsers className="w-3 h-3 mr-1" />
                    <span className="text-xs">Users</span>
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {item.users.toLocaleString()}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>
            Showing {filteredData.length} of {data.length} traffic sources
          </span>
          <span>
            Total Sessions: {filteredData.reduce((sum, item) => sum + item.sessions, 0).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DetailedTrafficChart;