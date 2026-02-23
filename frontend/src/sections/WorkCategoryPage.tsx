import { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Award, Users, Trophy, Zap, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { motion } from 'framer-motion';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://xyrosolutions.onrender.com/api';

interface WorkItem {
  _id: string;
  title: string;
  subtitle?: string;
  description: string;
  shortDescription?: string;
  category: 'sih-alumni' | 'amity-innovation' | 'hackathons' | 'cybercubs' | 'other';
  image?: string;
  tags?: string[];
  achievements?: string[];
  links?: Array<{
    title: string;
    url: string;
  }>;
  isActive: boolean;
  order: number;
}

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
    bgColor: 'bg-blue-50'
  },
  {
    id: 'amity-innovation',
    title: 'Amity Innovation Cell',
    description: 'Affiliated projects and collaborations with Amity Innovation Cell',
    icon: Users,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    id: 'hackathons',
    title: 'Hackathon Projects',
    description: 'Various hackathon participations and winning projects',
    icon: Zap,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    id: 'cybercubs',
    title: 'Cybercubs Winner',
    description: 'Cybersecurity competition achievements and recognitions',
    icon: Trophy,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50'
  }
];

interface WorkCategoryPageProps {
  category: string;
  onBackToWork: () => void;
  onGoHome: () => void;
}

export default function WorkCategoryPage({ category, onBackToWork, onGoHome }: WorkCategoryPageProps) {
  const [workItems, setWorkItems] = useState<WorkItem[]>([]);
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [loading, setLoading] = useState(true);

  const categoryData = workCategories.find(cat => cat.id === category);
  const Icon = categoryData?.icon || Award;

  useEffect(() => {
    fetchWork();
  }, [category]);

  const fetchWork = async () => {
    try {
      setLoading(true);
      const url = `${API_URL}/work/category/${category}`;
      const response = await axios.get(url);
      setWorkItems(response.data.data || []);
    } catch (error) {
      console.error('Error fetching work:', error);
      setWorkItems([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F6F6F2]/90 backdrop-blur-md py-4 shadow-sm">
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToWork}
              className="flex items-center gap-2 text-dark hover:text-primary transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Work</span>
            </button>
          </div>
          
          <div className="font-display font-bold text-lg tracking-tight text-dark">
            NexGen Studio - {categoryData?.title || 'Work'}
          </div>

          <Button variant="ghost" onClick={onGoHome} className="text-dark hover:text-primary">
            Home
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className={`pt-20 pb-12 px-6 lg:px-12 ${categoryData?.bgColor || 'bg-blue-50'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-2 ${categoryData?.bgColor || 'bg-blue-100'} rounded-full text-sm font-medium mb-4`}>
            <Icon className={`h-5 w-5 ${categoryData?.color || 'text-blue-600'}`} />
            <span className={categoryData?.color || 'text-blue-800'}>{categoryData?.title}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {categoryData?.title || 'Work'} Projects
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {categoryData?.description || 'Explore our projects and achievements'}
          </p>
        </div>
      </div>

      {/* Work Items Grid */}
      <div className="px-6 lg:px-12 py-12 max-w-7xl mx-auto">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading projects...</p>
          </div>
        ) : workItems.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workItems.map((workItem, index) => (
              <motion.div
                key={workItem._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-blue-200">
                  <div onClick={() => setSelectedWork(workItem)}>
                    {workItem.image && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={workItem.image}
                          alt={workItem.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Icon className={`h-5 w-5 ${categoryData?.color || 'text-gray-600'}`} />
                        <Badge variant="secondary" className="text-xs">
                          {categoryData?.title || 'Other'}
                        </Badge>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                        {workItem.title}
                      </h3>
                      
                      {workItem.subtitle && (
                        <p className="text-blue-600 font-medium mb-2">{workItem.subtitle}</p>
                      )}
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {workItem.shortDescription || workItem.description}
                      </p>

                      {workItem.tags && workItem.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {workItem.tags.slice(0, 3).map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {workItem.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{workItem.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="text-blue-600 font-medium text-sm group-hover:underline">
                          View Details
                        </span>
                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className={`w-24 h-24 mx-auto mb-4 ${categoryData?.bgColor || 'bg-gray-100'} rounded-full flex items-center justify-center`}>
              <Icon className={`h-12 w-12 ${categoryData?.color || 'text-gray-400'}`} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600">
              No projects have been added for {categoryData?.title} yet.
            </p>
            <Button onClick={onBackToWork} variant="outline" className="mt-6">
              Browse Other Categories
            </Button>
          </div>
        )}
      </div>

      {/* Work Item Detail Modal */}
      {selectedWork && (
        <Dialog open={!!selectedWork} onOpenChange={() => setSelectedWork(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                <Icon className={`h-6 w-6 ${categoryData?.color || 'text-gray-600'}`} />
                {selectedWork.title}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {selectedWork.image && (
                <div className="aspect-video overflow-hidden rounded-lg">
                  <img
                    src={selectedWork.image}
                    alt={selectedWork.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {selectedWork.subtitle && (
                <div>
                  <h3 className="text-lg font-semibold text-blue-600 mb-2">{selectedWork.subtitle}</h3>
                </div>
              )}

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Description</h4>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {selectedWork.description}
                </p>
              </div>

              {selectedWork.achievements && selectedWork.achievements.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Key Achievements</h4>
                  <ul className="space-y-2">
                    {selectedWork.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Award className="h-4 w-4 text-amber-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-600">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedWork.tags && selectedWork.tags.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Technologies & Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedWork.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedWork.links && selectedWork.links.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Related Links</h4>
                  <div className="space-y-2">
                    {selectedWork.links.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>{link.title}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  {categoryData?.title || 'Other'}
                </Badge>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
