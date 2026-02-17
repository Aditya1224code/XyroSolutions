import { ArrowLeft } from 'lucide-react';
import WorkSection from './WorkSection';

interface WorkPageProps {
  onBackToHome: () => void;
}

export default function WorkPage({ onBackToHome }: WorkPageProps) {
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
              NexGen Studio - Work
            </div>
          </div>
        </nav>
        
        {/* Hero Section */}
        <div className="pt-20 pb-8 px-6 lg:px-12 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              Our Portfolio
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Our Work &amp; Achievements
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Explore our journey through innovative projects, competition wins, and 
              meaningful collaborations that showcase our expertise and passion for technology.
            </p>
          </div>
        </div>
      </div>

      {/* Work Content */}
      <div className="pt-0">
        <WorkSection />
      </div>
    </div>
  );
}