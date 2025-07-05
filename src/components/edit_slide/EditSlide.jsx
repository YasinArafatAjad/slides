import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  LuImage, 
  LuVideo, 
  LuType, 
  LuFileText, 
  LuSave, 
  LuSettings, 
  LuLayers, 
  LuSparkles,
  LuLanguages
} from 'react-icons/lu';
import { FiAlertCircle } from 'react-icons/fi';
import { Helmet } from 'react-helmet';

// Move InputField component outside to prevent recreation
const InputField = React.memo(({ type = 'text', value, onChange, error, placeholder, icon: Icon, multiline = false, fieldName, required = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative group"
  >
    <div className="relative">
      {Icon && (
        <div className="absolute left-4 top-4 text-gray-400 dark:text-gray-500 group-focus-within:text-blue-400 dark:group-focus-within:text-blue-400 transition-colors">
          <Icon className="w-5 h-5" />
        </div>
      )}
      {multiline ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={4}
          data-field={fieldName}
          className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-4 bg-white/50 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-500 focus:bg-white/80 dark:focus:bg-gray-800/90 transition-all duration-300 resize-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 ${error ? 'border-red-500 dark:border-red-500 bg-red-50/50 dark:bg-red-900/30' : ''}`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          data-field={fieldName}
          className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-4 bg-white/50 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-500 focus:bg-white/80 dark:focus:bg-gray-800/90 transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 ${error ? 'border-red-500 dark:border-red-500 bg-red-50/50 dark:bg-red-900/30' : ''}`}
        />
      )}
      {required && (
        <span className="absolute right-4 top-4 text-red-500 dark:text-red-400 text-sm">*</span>
      )}
    </div>
    {error && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm mt-2 ml-1 bg-red-50 dark:bg-red-900/30 px-3 py-2 rounded-lg border border-red-200 dark:border-red-500/30"
      >
        <FiAlertCircle className="w-4 h-4 flex-shrink-0" />
        <span>{error}</span>
      </motion.div>
    )}
  </motion.div>
));

// Move SlideSection component outside to prevent recreation
const SlideSection = React.memo(({ slide, index, formData, onInputChange, errors }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="bg-white/30 dark:bg-gray-800/40 backdrop-blur-md rounded-2xl p-8 border border-white/20 dark:border-gray-600/30 shadow-xl"
  >
    <div className="flex items-center gap-4 mb-8">
      <div className={`p-3 rounded-xl bg-gradient-to-r ${slide.color} text-white shadow-lg`}>
        {slide.icon}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{slide.title}</h3>
        <p className="text-gray-600 dark:text-gray-400">Configure content for {slide.title.toLowerCase()}</p>
      </div>
    </div>
    
    <div className="grid gap-8">
      {/* Image URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Image URL
        </label>
        <InputField
          value={formData[`slide${slide.id}ImageUrl`]}
          onChange={onInputChange}
          fieldName={`slide${slide.id}ImageUrl`}
          icon={LuImage}
          placeholder="https://example.com/image.jpg"
          error={errors[`slide${slide.id}ImageUrl`]}
        />
      </div>
      
      {/* English Content Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg text-white">
            <LuType className="w-4 h-4" />
          </div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">English Content</h4>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title <span className="text-red-500 dark:text-red-400">*</span>
            </label>
            <InputField
              value={formData[`slide${slide.id}Title`]}
              onChange={onInputChange}
              fieldName={`slide${slide.id}Title`}
              icon={LuType}
              placeholder="Enter an engaging title"
              error={errors[`slide${slide.id}Title`]}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Subtitle
            </label>
            <InputField
              value={formData[`slide${slide.id}Subtitle`]}
              onChange={onInputChange}
              fieldName={`slide${slide.id}Subtitle`}
              icon={LuType}
              placeholder="Enter a descriptive subtitle"
              error={errors[`slide${slide.id}Subtitle`]}
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <InputField
            value={formData[`slide${slide.id}Description`]}
            onChange={onInputChange}
            fieldName={`slide${slide.id}Description`}
            icon={LuFileText}
            multiline
            placeholder="Write a detailed description of your content..."
            error={errors[`slide${slide.id}Description`]}
          />
        </div>
      </div>

      {/* Bangla Content Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg text-white">
            <LuLanguages className="w-4 h-4" />
          </div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">বাংলা কন্টেন্ট (Bangla Content)</h4>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              শিরোনাম (Title) <span className="text-red-500 dark:text-red-400">*</span>
            </label>
            <InputField
              value={formData[`slide${slide.id}TitleBangla`]}
              onChange={onInputChange}
              fieldName={`slide${slide.id}TitleBangla`}
              icon={LuType}
              placeholder="একটি আকর্ষণীয় শিরোনাম লিখুন"
              error={errors[`slide${slide.id}TitleBangla`]}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              উপশিরোনাম (Subtitle)
            </label>
            <InputField
              value={formData[`slide${slide.id}SubtitleBangla`]}
              onChange={onInputChange}
              fieldName={`slide${slide.id}SubtitleBangla`}
              icon={LuType}
              placeholder="একটি বর্ণনামূলক উপশিরোনাম লিখুন"
              error={errors[`slide${slide.id}SubtitleBangla`]}
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            বিবরণ (Description)
          </label>
          <InputField
            value={formData[`slide${slide.id}DescriptionBangla`]}
            onChange={onInputChange}
            fieldName={`slide${slide.id}DescriptionBangla`}
            icon={LuFileText}
            multiline
            placeholder="আপনার কন্টেন্টের বিস্তারিত বিবরণ লিখুন..."
            error={errors[`slide${slide.id}DescriptionBangla`]}
          />
        </div>
      </div>
    </div>
  </motion.div>
));

function EditSlide() {
  const [formData, setFormData] = useState({
    // Background settings
    backgroundImageUrl: '',
    backgroundVideoUrl: '',
    
    // Slide 1 - English
    slide1ImageUrl: '',
    slide1Title: '',
    slide1Subtitle: '',
    slide1Description: '',
    
    // Slide 1 - Bangla
    slide1TitleBangla: '',
    slide1SubtitleBangla: '',
    slide1DescriptionBangla: '',
    
    // Slide 2 - English
    slide2ImageUrl: '',
    slide2Title: '',
    slide2Subtitle: '',
    slide2Description: '',
    
    // Slide 2 - Bangla
    slide2TitleBangla: '',
    slide2SubtitleBangla: '',
    slide2DescriptionBangla: '',
    
    // Slide 3 - English
    slide3ImageUrl: '',
    slide3Title: '',
    slide3Subtitle: '',
    slide3Description: '',
    
    // Slide 3 - Bangla
    slide3TitleBangla: '',
    slide3SubtitleBangla: '',
    slide3DescriptionBangla: ''
  });

  const [errors, setErrors] = useState({});

  // Single stable input change handler using useCallback
  const handleInputChange = useCallback((e) => {
    const fieldName = e.target.dataset.field;
    const value = e.target.value;
    
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));

    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: ''
      }));
    }
  }, [errors]);

  const validateForm = () => {
    const newErrors = {};
    
    // Validate required fields - at least one title per slide (English OR Bangla)
    for (let i = 1; i <= 3; i++) {
      const englishTitle = formData[`slide${i}Title`]?.trim();
      const banglaTitle = formData[`slide${i}TitleBangla`]?.trim();
      
      if (!englishTitle && !banglaTitle) {
        newErrors[`slide${i}Title`] = 'Please provide a title in English or Bangla';
        newErrors[`slide${i}TitleBangla`] = 'Please provide a title in English or Bangla';
      }
    }
    
    // Validate URLs if provided
    const urlFields = [
      { field: 'slide1ImageUrl', label: 'Slide 1 Image URL' },
      { field: 'slide2ImageUrl', label: 'Slide 2 Image URL' },
      { field: 'slide3ImageUrl', label: 'Slide 3 Image URL' },
      { field: 'backgroundImageUrl', label: 'Background Image URL' },
      { field: 'backgroundVideoUrl', label: 'Background Video URL' }
    ];
    
    urlFields.forEach(({ field, label }) => {
      const value = formData[field]?.trim();
      if (value && !isValidUrl(value)) {
        newErrors[field] = `Please enter a valid URL for ${label}`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Form submission started...');
    console.log('Current form data:', formData);
    
    if (validateForm()) {
      console.log('✅ Form validation passed!');
      console.log('📋 Complete form data:', JSON.stringify(formData, null, 2));
      alert('🎉 Slideshow configuration saved successfully!');
    } else {
      console.log('❌ Form validation failed!');
      console.log('🚨 Validation errors:', errors);
      
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const errorElement = document.querySelector(`[data-field="${firstErrorField}"]`);
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          errorElement.focus();
        }
      }
    }
  }, [formData, validateForm]);

  const slideFields = [
    {
      id: 1,
      icon: <LuLayers className="w-5 h-5" />,
      title: 'Slide 1',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      icon: <LuLayers className="w-5 h-5" />,
      title: 'Slide 2',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      icon: <LuLayers className="w-5 h-5" />,
      title: 'Slide 3',
      color: 'from-emerald-500 to-teal-500'
    }
  ];

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 relative overflow-hidden">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Slide Editor - Professional Slideshow Configuration Tool</title>
        <meta name="description" content="Create and customize beautiful slideshows with our intuitive slide editor. Configure images, titles, subtitles, and descriptions for professional presentations." />
        <meta name="keywords" content="slide editor, slideshow creator, presentation tool, slide configuration" />
      </Helmet>

      {/* Enhanced Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 dark:from-blue-500/10 dark:to-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 dark:from-emerald-500/10 dark:to-teal-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />

        <motion.div
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-pink-400/15 to-orange-400/15 dark:from-pink-500/8 dark:to-orange-500/8 rounded-full blur-2xl"
          animate={{
            x: [0, -60, 0],
            y: [0, 40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10,
          }}
        />

        {/* Floating Geometric Shapes */}
        <motion.div
          className="absolute top-1/4 left-1/6 w-4 h-4 bg-blue-400/40 dark:bg-blue-400/20 rounded-full"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-2/3 left-1/3 w-3 h-3 bg-purple-400/50 dark:bg-purple-400/25 rounded-full"
          animate={{
            y: [0, 25, 0],
            x: [0, -15, 0],
            scale: [1, 1.3, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <motion.div
          className="absolute top-1/2 right-1/5 w-2 h-2 bg-emerald-400/60 dark:bg-emerald-400/30 rounded-full"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.4, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />

        <motion.div
          className="absolute bottom-1/3 right-1/3 w-5 h-5 bg-pink-400/30 dark:bg-pink-400/15 rounded-full"
          animate={{
            y: [0, 35, 0],
            x: [0, -25, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6,
          }}
        />

        {/* Animated SVG Patterns */}
        <svg className="absolute inset-0 w-full h-full opacity-20 dark:opacity-10" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="lineGradient1Dark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="lineGradient2Dark" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          
          <motion.path
            d="M0,200 Q300,100 600,200 T1200,200"
            stroke="url(#lineGradient1)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 3, ease: "easeInOut" },
              opacity: { duration: 1 },
            }}
            className="dark:stroke-[url(#lineGradient1Dark)]"
          />
          
          <motion.path
            d="M0,600 Q400,500 800,600 T1200,600"
            stroke="url(#lineGradient2)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 4, ease: "easeInOut", delay: 1 },
              opacity: { duration: 1, delay: 1 },
            }}
            className="dark:stroke-[url(#lineGradient2Dark)]"
          />

          {/* Animated Circles */}
          <motion.circle
            cx="200"
            cy="150"
            r="3"
            fill="#3B82F6"
            opacity="0.4"
            className="dark:opacity-20"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <motion.circle
            cx="800"
            cy="650"
            r="2"
            fill="#10B981"
            opacity="0.5"
            className="dark:opacity-25"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </svg>

        {/* Floating Icons */}
        <motion.div
          className="absolute top-1/5 right-1/6 text-blue-400/30 dark:text-blue-400/15"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <LuSparkles className="w-6 h-6" />
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 left-1/5 text-purple-400/40 dark:text-purple-400/20"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -15, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        >
          <LuSettings className="w-5 h-5" />
        </motion.div>

        <motion.div
          className="absolute top-3/5 left-1/8 text-emerald-400/35 dark:text-emerald-400/18"
          animate={{
            y: [0, -25, 0],
            rotate: [0, 20, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <LuImage className="w-4 h-4" />
        </motion.div>
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border-b border-white/20 dark:border-gray-600/20 z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl text-white shadow-lg">
                <LuSettings className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Slide Editor
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Create stunning bilingual slideshows with ease</p>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Error Summary */}
      {hasErrors && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6"
        >
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-500/30 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <FiAlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
              <div>
                <h3 className="text-red-800 dark:text-red-300 font-semibold">Please fix the following errors:</h3>
                <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                  {Object.keys(errors).length} field{Object.keys(errors).length > 1 ? 's' : ''} need{Object.keys(errors).length === 1 ? 's' : ''} your attention
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Form Container */}
      <form onSubmit={handleSubmit} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">          
          {/* Slides Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">Configure Your Slides</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Customize the content for each slide in both English and Bangla. Include images, titles, subtitles, and descriptions to create engaging bilingual presentations.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                Fields marked with <span className="text-red-500 dark:text-red-400">*</span> are required
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 border border-white/20 dark:border-gray-600/20 shadow-xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg">
                  <LuImage className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Background Media</h3>
                  <p className="text-gray-600 dark:text-gray-400">Configure background image and video settings</p>
                </div>
              </div>

              <div className="grid gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Background Image URL
                  </label>
                  <InputField
                    value={formData.backgroundImageUrl}
                    onChange={handleInputChange}
                    fieldName="backgroundImageUrl"
                    icon={LuImage}
                    placeholder="https://example.com/background.jpg"
                    error={errors.backgroundImageUrl}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Background Video URL
                  </label>
                  <InputField
                    value={formData.backgroundVideoUrl}
                    onChange={handleInputChange}
                    fieldName="backgroundVideoUrl"
                    icon={LuVideo}
                    placeholder="https://example.com/background.mp4"
                    error={errors.backgroundVideoUrl}
                  />
                </div>
              </div>
            </motion.div>

            {slideFields.map((slide, index) => (
              <SlideSection 
                key={slide.id} 
                slide={slide} 
                index={index + 1} 
                formData={formData}
                onInputChange={handleInputChange}
                errors={errors}
              />
            ))}
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="flex justify-center pt-8"
          >
            <button
              type="submit"
              className="group relative inline-flex items-center justify-center gap-4 px-16 py-5 bg-white dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 font-semibold text-lg rounded-2xl border-2 border-gray-200 dark:border-gray-600 shadow-lg hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700/80 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-500/20 focus:border-blue-400 dark:focus:border-blue-400"
            >
              {/* Left Icon */}
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-500/20 rounded-full group-hover:bg-blue-200 dark:group-hover:bg-blue-500/30 transition-colors duration-300">
                <LuSave className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              
              {/* Button Text */}
              <span className="text-gray-700 dark:text-gray-200 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                Save Slideshow Configuration
              </span>
              
              {/* Right Icon */}
              <div className="flex items-center justify-center w-8 h-8 bg-purple-100 dark:bg-purple-500/20 rounded-full group-hover:bg-purple-200 dark:group-hover:bg-purple-500/30 transition-colors duration-300">
                <LuSparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              
              {/* Subtle Background Gradient on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 via-purple-50/0 to-blue-50/0 group-hover:from-blue-50/50 group-hover:via-purple-50/30 group-hover:to-blue-50/50 dark:from-blue-500/0 dark:via-purple-500/0 dark:to-blue-500/0 dark:group-hover:from-blue-500/10 dark:group-hover:via-purple-500/5 dark:group-hover:to-blue-500/10 rounded-2xl transition-all duration-300 -z-10"></div>
            </button>
          </motion.div>
        </div>
      </form>
    </div>
  );
}

export default EditSlide;