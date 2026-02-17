import { ArrowLeft } from 'lucide-react';
import ServicesSection from './ServicesSection';

interface ServicesPageProps {
  onBackToHome: () => void;
  onStartInquiry?: (category: string) => void;
}

export default function ServicesPage({ onBackToHome, onStartInquiry }: ServicesPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <div className="relative">
        {/* Navigation Bar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F6F6F2]/90 backdrop-blur-md py-4 shadow-sm">
          <div className="w-full px-6 lg:px-12 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBackToHome}
                className="flex items-center gap-2 text-dark hover:text-primary transition-colors"
              >
                <ArrowLeft size={20} />
                <span className="font-medium">Back to Home</span>
              </button>
            </div>
            
            <div className="font-display font-bold text-lg tracking-tight text-dark">
              NexGen Studio - Services
            </div>
          </div>
        </nav>
        
        {/* Hero Section */}
        <div className="pt-20 pb-8 px-6 lg:px-12 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
              Our Services
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Professional Services
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover our comprehensive range of technology services designed to help your 
              business grow and succeed in the digital landscape.
            </p>
          </div>
        </div>
      </div>

      {/* Services Content */}
      <div className="pt-0">
        <ServicesSection onStartInquiry={onStartInquiry} />
      </div>
    </div>
  );
}