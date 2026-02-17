import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Send, Globe, Smartphone, Brain, Users, Palette, Cpu, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Category configurations with icons and project types
const categoryConfig: Record<string, {
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  projectTypes: { value: string; label: string; description: string }[];
  features: { value: string; label: string }[];
}> = {
  'web-development': {
    label: 'Web Development',
    icon: Globe,
    projectTypes: [
      { value: 'corporate', label: 'Corporate Website', description: 'Professional business website' },
      { value: 'ecommerce', label: 'E-Commerce Store', description: 'Online shop with payment integration' },
      { value: 'portfolio', label: 'Portfolio Website', description: 'Showcase your work beautifully' },
      { value: 'landing', label: 'Landing Page', description: 'High-converting single page' },
      { value: 'blog', label: 'Blog / News Site', description: 'Content management system' },
      { value: 'webapp', label: 'Web Application', description: 'Custom web-based software' },
      { value: 'saas', label: 'SaaS Platform', description: 'Software as a Service product' },
      { value: 'other', label: 'Other', description: 'Something else entirely' }
    ],
    features: [
      { value: 'responsive', label: 'Responsive Design' },
      { value: 'seo', label: 'SEO Optimization' },
      { value: 'cms', label: 'Content Management System' },
      { value: 'payment', label: 'Payment Integration' },
      { value: 'auth', label: 'User Authentication' },
      { value: 'analytics', label: 'Analytics Integration' },
      { value: 'multilingual', label: 'Multi-language Support' },
      { value: 'api', label: 'API Integration' }
    ]
  },
  'mobile-apps': {
    label: 'Mobile Apps',
    icon: Smartphone,
    projectTypes: [
      { value: 'ios', label: 'iOS App', description: 'Native iPhone/iPad application' },
      { value: 'android', label: 'Android App', description: 'Native Android application' },
      { value: 'cross-platform', label: 'Cross-Platform App', description: 'Works on both iOS and Android' },
      { value: 'hybrid', label: 'Hybrid App', description: 'Web-based mobile app' },
      { value: 'pwa', label: 'Progressive Web App', description: 'Installable web application' },
      { value: 'other', label: 'Other', description: 'Something else entirely' }
    ],
    features: [
      { value: 'push-notifications', label: 'Push Notifications' },
      { value: 'offline', label: 'Offline Mode' },
      { value: 'geolocation', label: 'GPS/Location Services' },
      { value: 'camera', label: 'Camera Integration' },
      { value: 'social-login', label: 'Social Login' },
      { value: 'in-app-purchase', label: 'In-App Purchases' },
      { value: 'analytics', label: 'Analytics' },
      { value: 'chat', label: 'Chat/Messaging' }
    ]
  },
  'ai-ml': {
    label: 'AI & Machine Learning',
    icon: Brain,
    projectTypes: [
      { value: 'chatbot', label: 'AI Chatbot', description: 'Intelligent conversation agent' },
      { value: 'recommendation', label: 'Recommendation System', description: 'Personalized suggestions' },
      { value: 'image-recognition', label: 'Image Recognition', description: 'Visual analysis and classification' },
      { value: 'nlp', label: 'Natural Language Processing', description: 'Text analysis and understanding' },
      { value: 'predictive', label: 'Predictive Analytics', description: 'Data-driven forecasting' },
      { value: 'automation', label: 'Process Automation', description: 'AI-powered workflows' },
      { value: 'other', label: 'Other', description: 'Custom AI solution' }
    ],
    features: [
      { value: 'training', label: 'Custom Model Training' },
      { value: 'integration', label: 'System Integration' },
      { value: 'api', label: 'API Access' },
      { value: 'dashboard', label: 'Analytics Dashboard' },
      { value: 'real-time', label: 'Real-time Processing' },
      { value: 'scalability', label: 'Scalable Architecture' }
    ]
  },
  'consulting': {
    label: 'Consulting',
    icon: Users,
    projectTypes: [
      { value: 'tech-audit', label: 'Technology Audit', description: 'Evaluate your tech stack' },
      { value: 'strategy', label: 'Digital Strategy', description: 'Plan your digital transformation' },
      { value: 'architecture', label: 'System Architecture', description: 'Design scalable solutions' },
      { value: 'security', label: 'Security Assessment', description: 'Identify vulnerabilities' },
      { value: 'optimization', label: 'Performance Optimization', description: 'Improve system efficiency' },
      { value: 'training', label: 'Team Training', description: 'Upskill your team' },
      { value: 'other', label: 'Other', description: 'Custom consulting' }
    ],
    features: [
      { value: 'documentation', label: 'Technical Documentation' },
      { value: 'workshops', label: 'Workshops & Training' },
      { value: 'roadmap', label: 'Implementation Roadmap' },
      { value: 'support', label: 'Ongoing Support' },
      { value: 'review', label: 'Code Review' },
      { value: 'mentoring', label: 'Team Mentoring' }
    ]
  },
  'design': {
    label: 'Design',
    icon: Palette,
    projectTypes: [
      { value: 'ui-ux', label: 'UI/UX Design', description: 'User interface and experience' },
      { value: 'branding', label: 'Brand Identity', description: 'Logo and brand guidelines' },
      { value: 'graphic', label: 'Graphic Design', description: 'Visual content creation' },
      { value: 'motion', label: 'Motion Graphics', description: 'Animated visual content' },
      { value: 'prototype', label: 'Prototyping', description: 'Interactive mockups' },
      { value: 'redesign', label: 'Website Redesign', description: 'Refresh existing design' },
      { value: 'other', label: 'Other', description: 'Custom design work' }
    ],
    features: [
      { value: 'wireframes', label: 'Wireframes' },
      { value: 'mockups', label: 'High-fidelity Mockups' },
      { value: 'prototype', label: 'Interactive Prototype' },
      { value: 'design-system', label: 'Design System' },
      { value: 'responsive', label: 'Responsive Designs' },
      { value: 'animation', label: 'Micro-animations' }
    ]
  },
  'iot-projects': {
    label: 'IoT Projects',
    icon: Cpu,
    projectTypes: [
      { value: 'smart-home', label: 'Smart Home System', description: 'Home automation solutions' },
      { value: 'industrial', label: 'Industrial IoT', description: 'Factory and manufacturing' },
      { value: 'healthcare', label: 'Healthcare IoT', description: 'Medical device integration' },
      { value: 'agriculture', label: 'Agricultural IoT', description: 'Smart farming solutions' },
      { value: 'wearables', label: 'Wearable Devices', description: 'Connected wearable tech' },
      { value: 'tracking', label: 'Asset Tracking', description: 'GPS and location tracking' },
      { value: 'environmental', label: 'Environmental Monitoring', description: 'Sensors and data collection' },
      { value: 'other', label: 'Other', description: 'Custom IoT solution' }
    ],
    features: [
      { value: 'sensors', label: 'Sensor Integration' },
      { value: 'cloud', label: 'Cloud Connectivity' },
      { value: 'dashboard', label: 'Real-time Dashboard' },
      { value: 'alerts', label: 'Automated Alerts' },
      { value: 'mobile-app', label: 'Mobile App Control' },
      { value: 'data-analytics', label: 'Data Analytics' },
      { value: 'edge-computing', label: 'Edge Computing' },
      { value: 'security', label: 'Security & Encryption' }
    ]
  },
  'other': {
    label: 'Other Services',
    icon: HelpCircle,
    projectTypes: [
      { value: 'custom', label: 'Custom Project', description: 'Tell us what you need' },
      { value: 'maintenance', label: 'Maintenance & Support', description: 'Ongoing system maintenance' },
      { value: 'migration', label: 'System Migration', description: 'Move to new platform' },
      { value: 'integration', label: 'System Integration', description: 'Connect existing systems' },
      { value: 'other', label: 'Other', description: 'Something unique' }
    ],
    features: [
      { value: 'support', label: '24/7 Support' },
      { value: 'documentation', label: 'Documentation' },
      { value: 'training', label: 'Training' },
      { value: 'maintenance', label: 'Maintenance' }
    ]
  }
};

const timelineOptions = [
  { value: 'urgent', label: 'Urgent (ASAP)', description: 'As soon as possible' },
  { value: '1-2-weeks', label: '1-2 Weeks', description: 'Quick turnaround' },
  { value: '1-month', label: '1 Month', description: 'Standard timeline' },
  { value: '2-3-months', label: '2-3 Months', description: 'Comfortable timeline' },
  { value: '3-6-months', label: '3-6 Months', description: 'Extended timeline' },
  { value: 'flexible', label: 'Flexible', description: 'No rush' }
];

interface ServiceInquiryPageProps {
  category?: string;
  onBackToServices: () => void;
  onGoHome: () => void;
}

export default function ServiceInquiryPage({ category: initialCategory, onBackToServices, onGoHome }: ServiceInquiryPageProps) {
  // Start at step 2 since category is already selected from Services page
  const [currentStep, setCurrentStep] = useState(2);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    category: initialCategory || 'web-development',
    projectType: '',
    projectDescription: '',
    budget: '',
    timeline: '',
    features: [] as string[],
    references: '',
    contactInfo: {
      name: '',
      email: '',
      phone: '',
      company: '',
      preferredContact: 'email'
    },
    additionalNotes: ''
  });

  // Total steps is 6 (skip category selection as it's already done)
  const totalSteps = 6;
  const displayStep = currentStep - 1; // Display step number for progress (1-6 instead of 2-7)
  const config = categoryConfig[formData.category] || categoryConfig['other'];
  const CategoryIcon = config.icon;

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 2) {
      setCurrentStep(currentStep - 1);
    } else {
      // If at step 2, go back to services
      onBackToServices();
    }
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/service-inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsSubmitted(true);
        toast.success('Your inquiry has been submitted successfully!');
      } else {
        throw new Error(data.message || 'Failed to submit inquiry');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return formData.category !== '';
      case 2: return formData.projectType !== '';
      case 3: return formData.projectDescription.length >= 10;
      case 4: return formData.budget.trim() !== '';
      case 5: return formData.timeline !== '';
      case 6: return formData.features.length > 0;
      case 7: 
        return formData.contactInfo.name.trim() !== '' && 
               formData.contactInfo.email.trim() !== '' && 
               formData.contactInfo.phone.trim() !== '';
      default: return false;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-lg text-center">
          <div className="w-20 h-20 bg-lime rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-dark" />
          </div>
          <h1 className="font-display font-bold text-2xl md:text-3xl text-dark mb-4">
            Thank You!
          </h1>
          <p className="text-gray-custom mb-6">
            Your inquiry has been submitted successfully. Our team will review your requirements and get back to you within 24-48 hours.
          </p>
          <p className="text-sm text-gray-custom mb-8">
            A confirmation email has been sent to <strong>{formData.contactInfo.email}</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onBackToServices}
              className="btn-outline"
            >
              Back to Services
            </button>
            <button
              onClick={onGoHome}
              className="btn-primary"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={onBackToServices}
              className="flex items-center gap-2 text-dark hover:text-lime transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Services</span>
            </button>
            <div className="flex items-center gap-2">
              <CategoryIcon size={24} className="text-lime" />
              <span className="font-display font-bold text-dark">{config.label}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-custom">Step {displayStep} of {totalSteps}</span>
            <span className="text-sm text-gray-custom">{Math.round((displayStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-lime transition-all duration-500 ease-out"
              style={{ width: `${(displayStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Form Content */}
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
          
          {/* Step 1: Project Type (was Step 2, but we skip category selection) */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="font-display font-bold text-2xl md:text-3xl text-dark mb-2">
                  What type of project is this?
                </h2>
                <p className="text-gray-custom">Select the option that best describes your project</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {config.projectTypes.map(type => (
                  <button
                    key={type.value}
                    onClick={() => setFormData(prev => ({ ...prev, projectType: type.value }))}
                    className={`p-5 rounded-xl border-2 text-left transition-all ${
                      formData.projectType === type.value
                        ? 'border-lime bg-lime/10'
                        : 'border-gray-200 hover:border-lime/50'
                    }`}
                  >
                    <h3 className="font-display font-bold text-dark">{type.label}</h3>
                    <p className="text-sm text-gray-custom mt-1">{type.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Project Description */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="font-display font-bold text-2xl md:text-3xl text-dark mb-2">
                  Tell us about your project
                </h2>
                <p className="text-gray-custom">Describe your vision and requirements</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Project Description *
                </label>
                <textarea
                  value={formData.projectDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, projectDescription: e.target.value }))}
                  placeholder="Describe your project goals, target audience, key features you need, and any specific requirements..."
                  rows={6}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lime focus:border-transparent resize-none"
                />
                <p className="text-xs text-gray-custom mt-2">
                  {formData.projectDescription.length}/2000 characters (minimum 10)
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Reference Websites/Apps (Optional)
                </label>
                <input
                  type="text"
                  value={formData.references}
                  onChange={(e) => setFormData(prev => ({ ...prev, references: e.target.value }))}
                  placeholder="Share links to websites or apps you like..."
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lime focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Step 4: Budget */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="font-display font-bold text-2xl md:text-3xl text-dark mb-2">
                  What's your budget?
                </h2>
                <p className="text-gray-custom">Enter your approximate budget for this project</p>
              </div>
              <div className="max-w-md mx-auto">
                <label className="block text-sm font-medium text-dark mb-2">
                  Your Budget *
                </label>
                <input
                  type="text"
                  value={formData.budget}
                  onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                  placeholder="e.g., $5,000, ₹50,000, or flexible"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lime focus:border-transparent text-lg"
                />
                <p className="text-sm text-gray-custom mt-2">
                  You can enter an exact amount, a range, or just say "flexible" if you're unsure.
                </p>
              </div>
            </div>
          )}

          {/* Step 5: Timeline */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="font-display font-bold text-2xl md:text-3xl text-dark mb-2">
                  When do you need this completed?
                </h2>
                <p className="text-gray-custom">Select your preferred timeline</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {timelineOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setFormData(prev => ({ ...prev, timeline: option.value }))}
                    className={`p-5 rounded-xl border-2 text-left transition-all ${
                      formData.timeline === option.value
                        ? 'border-lime bg-lime/10'
                        : 'border-gray-200 hover:border-lime/50'
                    }`}
                  >
                    <h3 className="font-display font-bold text-dark">{option.label}</h3>
                    <p className="text-sm text-gray-custom">{option.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Features */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="font-display font-bold text-2xl md:text-3xl text-dark mb-2">
                  What features do you need?
                </h2>
                <p className="text-gray-custom">Select all that apply</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {config.features.map(feature => (
                  <button
                    key={feature.value}
                    onClick={() => handleFeatureToggle(feature.value)}
                    className={`p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                      formData.features.includes(feature.value)
                        ? 'border-lime bg-lime/10'
                        : 'border-gray-200 hover:border-lime/50'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center ${
                      formData.features.includes(feature.value)
                        ? 'border-lime bg-lime'
                        : 'border-gray-300'
                    }`}>
                      {formData.features.includes(feature.value) && (
                        <Check size={14} className="text-dark" />
                      )}
                    </div>
                    <span className="font-medium text-dark">{feature.label}</span>
                  </button>
                ))}
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-dark mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                  placeholder="Any other features or requirements you'd like to mention..."
                  rows={3}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lime focus:border-transparent resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 7: Contact Information */}
          {currentStep === 7 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="font-display font-bold text-2xl md:text-3xl text-dark mb-2">
                  Almost done! How can we reach you?
                </h2>
                <p className="text-gray-custom">We'll use this information to contact you</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-dark mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.contactInfo.name}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      contactInfo: { ...prev.contactInfo, name: e.target.value }
                    }))}
                    placeholder="John Doe"
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lime focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.contactInfo.email}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      contactInfo: { ...prev.contactInfo, email: e.target.value }
                    }))}
                    placeholder="john@example.com"
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lime focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.contactInfo.phone}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      contactInfo: { ...prev.contactInfo, phone: e.target.value }
                    }))}
                    placeholder="+1 (555) 123-4567"
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lime focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Company Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.contactInfo.company}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      contactInfo: { ...prev.contactInfo, company: e.target.value }
                    }))}
                    placeholder="Your Company"
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lime focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Preferred Contact Method
                  </label>
                  <select
                    value={formData.contactInfo.preferredContact}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      contactInfo: { ...prev.contactInfo, preferredContact: e.target.value }
                    }))}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lime focus:border-transparent"
                  >
                    <option value="email">Email</option>
                    <option value="phone">Phone Call</option>
                    <option value="whatsapp">WhatsApp</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all text-dark hover:bg-gray-100"
            >
              <ArrowLeft size={18} />
              Back
            </button>
            
            {currentStep < 7 ? (
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  isStepValid()
                    ? 'bg-lime text-dark hover:bg-lime/90'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Next
                <ArrowRight size={18} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!isStepValid() || isSubmitting}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-medium transition-all ${
                  isStepValid() && !isSubmitting
                    ? 'bg-lime text-dark hover:bg-lime/90'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Inquiry
                    <Send size={18} />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
