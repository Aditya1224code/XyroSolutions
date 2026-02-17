import { ChevronRight, Code, Smartphone, Brain, Users, Palette, Archive, Cpu } from 'lucide-react';
import { Card } from '../components/ui/card';
import { motion } from 'framer-motion';

interface ServiceCategory {
  id: 'web-development' | 'mobile-apps' | 'ai-ml' | 'consulting' | 'design' | 'iot-projects' | 'other';
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

interface ServicesSectionProps {
  onStartInquiry?: (category: string) => void;
}

const serviceCategories: ServiceCategory[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Custom websites and web applications using modern technologies',
    icon: Code,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 hover:bg-blue-100'
  },
  {
    id: 'mobile-apps',
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile application development',
    icon: Smartphone,
    color: 'text-green-600',
    bgColor: 'bg-green-50 hover:bg-green-100'
  },
  {
    id: 'ai-ml',
    title: 'AI & ML',
    description: 'Artificial intelligence and machine learning solutions',
    icon: Brain,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 hover:bg-purple-100'
  },
  {
    id: 'iot-projects',
    title: 'IoT Projects',
    description: 'Internet of Things solutions and smart device integration',
    icon: Cpu,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50 hover:bg-cyan-100'
  },
  {
    id: 'consulting',
    title: 'Consulting',
    description: 'Technology consulting and strategic planning services',
    icon: Users,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 hover:bg-orange-100'
  },
  {
    id: 'design',
    title: 'Design',
    description: 'UI/UX design and digital branding solutions',
    icon: Palette,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50 hover:bg-pink-100'
  },
  {
    id: 'other',
    title: 'Other Services',
    description: 'Additional specialized services and custom solutions',
    icon: Archive,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50 hover:bg-gray-100'
  }
];

export default function ServicesSection({ onStartInquiry }: ServicesSectionProps) {
  return (
    <section className="py-20 px-6 lg:px-12 bg-[#F6F6F2]">
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Categories Grid */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              Service Categories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              What We Offer
            </h2>
            <p className="text-lg text-dark/70 max-w-3xl mx-auto">
              Choose from our comprehensive range of professional services tailored to meet your business needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={`p-6 cursor-pointer transition-all duration-300 ${category.bgColor}`}
                  onClick={() => onStartInquiry && onStartInquiry(category.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${category.color} bg-white/80`}>
                      <category.icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-dark mb-2">{category.title}</h3>
                      <p className="text-sm text-dark/70 mb-3">{category.description}</p>
                      <div className="flex items-center gap-1 text-primary text-sm font-medium">
                        Get Started <ChevronRight size={16} />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
