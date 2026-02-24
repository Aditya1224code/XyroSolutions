import { ArrowLeft, Award, Users, Trophy, Zap, ChevronRight } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { motion } from 'framer-motion';

interface WorkCategory {
  id: 'sih-alumni' | 'amity-innovation' | 'hackathons' | 'cybercubs';
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

const workCategories: WorkCategory[] = [
  {
    id: 'sih-alumni',
    title: 'SIH Alumni',
    description: 'Smart India Hackathon participation and achievements',
    icon: Award,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 hover:bg-blue-100'
  },
  {
    id: 'amity-innovation',
    title: 'Amity Innovation Cell',
    description: 'Affiliated projects and collaborations with Amity Innovation Cell',
    icon: Users,
    color: 'text-green-600',
    bgColor: 'bg-green-50 hover:bg-green-100'
  },
  {
    id: 'hackathons',
    title: 'Hackathon Projects',
    description: 'Various hackathon participations and winning projects',
    icon: Zap,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 hover:bg-purple-100'
  },
  {
    id: 'cybercubs',
    title: 'Cybercubs Winner',
    description: 'Cybersecurity competition achievements and recognitions',
    icon: Trophy,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50 hover:bg-amber-100'
  }
];

interface WorkPageProps {
  onBackToHome: () => void;
  onSelectCategory?: (category: string) => void;
}

export default function WorkPage({ onBackToHome, onSelectCategory }: WorkPageProps) {
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
              XyroSolutions - Work
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

      {/* Category Selection Grid */}
      <div className="px-6 lg:px-12 py-12 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Select a Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose a category to explore our projects and achievements
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workCategories.map((category, index) => {
            const Icon = category.icon;
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  className={`p-6 cursor-pointer transition-all duration-300 ${category.bgColor} border-2 border-transparent hover:border-blue-800 hover:shadow-lg h-full`}
                  onClick={() => onSelectCategory && onSelectCategory(category.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <Icon className={`h-10 w-10 ${category.color}`} />
                    <Badge variant="secondary" className="text-xs">
                      View
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">{category.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{category.description}</p>
                  <div className="flex items-center text-blue-600 text-sm font-medium">
                    View Projects <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}