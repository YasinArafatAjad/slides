import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Copy, 
  Check, 
  AlertCircle, 
  Settings, 
  Database,
  Key,
  Globe,
  ChevronRight,
  ChevronDown,
  Monitor
} from 'lucide-react';

const SetupGuide = ({ isOpen, onClose }) => {
  const [copiedStep, setCopiedStep] = useState(null);
  const [expandedStep, setExpandedStep] = useState(1);
  const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173';

  const copyToClipboard = async (text, stepId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStep(stepId);
      setTimeout(() => setCopiedStep(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const steps = [
    {
      id: 1,
      title: "Create GA4 Property",
      icon: Globe,
      description: "Set up your Google Analytics 4 property and data stream",
      details: [
        "Go to Google Analytics (analytics.google.com)",
        "Click Admin → Create Property → GA4",
        "Enter property name and settings",
        "Create a Web data stream",
        `Use ${currentUrl} as your website URL`,
        "Copy your Measurement ID (G-XXXXXXXXXX)"
      ],
      links: [
        { text: "Google Analytics", url: "https://analytics.google.com/" }
      ],
      boltSpecific: true
    },
    {
      id: 2,
      title: "Enable APIs",
      icon: Database,
      description: "Enable required APIs in Google Cloud Console",
      details: [
        "Go to Google Cloud Console",
        "Create or select a project",
        "Enable 'Google Analytics Reporting API'",
        "Enable 'Google Analytics Data API'"
      ],
      links: [
        { text: "Google Cloud Console", url: "https://console.cloud.google.com/" }
      ]
    },
    {
      id: 3,
      title: "Create Service Account",
      icon: Key,
      description: "Create credentials for API access",
      details: [
        "Go to IAM & Admin → Service Accounts",
        "Create new service account",
        "Generate JSON key file",
        "Download and save the credentials"
      ],
      code: `{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n",
  "client_email": "analytics-service@your-project.iam.gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token"
}`
    },
    {
      id: 4,
      title: "Grant Access",
      icon: Settings,
      description: "Add service account to your GA4 property",
      details: [
        "Go to GA4 Admin → Property Access Management",
        "Click '+' to add users",
        "Enter service account email",
        "Assign 'Viewer' role",
        "Save changes"
      ]
    },
    {
      id: 5,
      title: "Configure Environment",
      icon: AlertCircle,
      description: "Update your .env file with the credentials",
      code: `# Google Analytics 4 Configuration
GA4_PROPERTY_ID=123456789
GOOGLE_CLIENT_EMAIL=analytics-service@your-project.iam.gserviceaccount.com
GOOGLE_PROJECT_ID=your-project-id
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nYOUR_PRIVATE_KEY_HERE\\n-----END PRIVATE KEY-----"

# Frontend GA4 Tracking (Bolt Environment)
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# Server Configuration (Bolt specific)
PORT=3001
VITE_ANALYTICS_API_URL=http://localhost:3001/api/analytics`,
      boltSpecific: true
    }
  ];

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center">
                <Monitor className="w-6 h-6 mr-2" />
                Analytics Setup
              </h2>
              <p className="text-blue-100">Connect your website with Google Analytics data.</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Bolt Environment Info */}
          {/* <BoltSetupInfo /> */}

          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`border rounded-xl overflow-hidden ${
                  step.boltSpecific 
                    ? 'border-blue-300 dark:border-blue-600 bg-blue-50/50 dark:bg-blue-900/10' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <button
                  onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                  className={`w-full p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-between ${
                    step.boltSpecific 
                      ? 'bg-blue-50 dark:bg-blue-900/20' 
                      : 'bg-gray-50 dark:bg-gray-700/50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 text-white rounded-lg ${
                      step.boltSpecific ? 'bg-blue-600' : 'bg-blue-500'
                    }`}>
                      <step.icon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                        Step {step.id}: {step.title}                        
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {expandedStep === step.id ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                <AnimatePresence>
                  {expandedStep === step.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-gray-200 dark:border-gray-700"
                    >
                      <div className="p-4 space-y-4">
                        {/* Details */}
                        <div className="space-y-2">
                          {step.details?.map((detail, idx) => (
                            <div key={idx} className="flex items-start space-x-2">
                              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                step.boltSpecific ? 'bg-blue-600' : 'bg-blue-500'
                              }`}></div>
                              <p className="text-gray-700 dark:text-gray-300">{detail}</p>
                            </div>
                          ))}
                        </div>

                        {/* Links */}
                        {step.links && (
                          <div className="flex flex-wrap gap-2">
                            {step.links.map((link, idx) => (
                              <a
                                key={idx}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors"
                              >
                                <span>{link.text}</span>
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            ))}
                          </div>
                        )}

                        {/* Code Block */}
                        {step.code && (
                          <div className="relative">
                            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                              <code>{step.code}</code>
                            </pre>
                            <button
                              onClick={() => copyToClipboard(step.code, step.id)}
                              className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
                            >
                              {copiedStep === step.id ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Bolt-Specific Notes */}
          {/* <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
            <div className="flex items-start space-x-3">
              <Monitor className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  Bolt Environment Notes
                </h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Use <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">{currentUrl}</code> as your GA4 website URL</li>
                  <li>• Backend runs on port 3001, frontend on current port</li>
                  <li>• Environment variables are already configured for development</li>
                  <li>• CORS is pre-configured for localhost development</li>
                </ul>
              </div>
            </div>
          </div> */}

          {/* Important Notes */}
          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                  Important Notes
                </h4>
                <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                  <li>• GA4 data has a 24-48 hour delay for most reports</li>
                  <li>• Only real-time active users are available immediately</li>
                  <li>• Service account needs "Viewer" access to your GA4 property</li>
                  <li>• Test the connection at /api/health after setup</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Test Connection */}
          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
              Test Your Connection
            </h4>
            <p className="text-sm text-green-700 dark:text-green-300 mb-3">
              After completing the setup, test your connection:
            </p>
            <div className="flex items-center space-x-2">
              <code className="px-3 py-2 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded text-sm">
                http://localhost:3001/api/health
              </code>
              <button
                onClick={() => copyToClipboard('http://localhost:3001/api/health', 'health')}
                className="p-2 bg-green-500 hover:bg-green-600 text-white rounded transition-colors"
              >
                {copiedStep === 'health' ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SetupGuide;