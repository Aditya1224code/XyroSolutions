import { useState, useEffect } from 'react';
import { ChevronRight, ExternalLink, Award, Users, Trophy, Zap, Plus, Monitor } from 'lucide-react';
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
  category: 'sih-alumni' | 'amity-innovation' | 'hackathons' | 'cybercubs' | 'web-development' | 'other';
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
  id: 'sih-alumni' | 'amity-innovation' | 'hackathons' | 'cybercubs' | 'web-development';
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
  },
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Full-stack web applications and responsive website projects',
    icon: Monitor,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50 hover:bg-indigo-100'
  }
];

export default function WorkSection() {
  const [workItems, setWorkItems] = useState<WorkItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [showAllWork, setShowAllWork] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWork();
  }, [selectedCategory]);

  const fetchWork = async () => {
    try {
      setLoading(true);
      const url = selectedCategory === 'all' 
        ? `${API_URL}/work` 
        : `${API_URL}/work/category/${selectedCategory}`;
      
      const response = await axios.get(url);
      setWorkItems(response.data.data || []);
    } catch (error) {
      console.error('Error fetching work:', error);
      setWorkItems([]);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryData = (categoryId: string) => {
    return workCategories.find(cat => cat.id === categoryId);
  };

  const filteredWorkItems = selectedCategory === 'all' 
    ? workItems
    : workItems.filter(item => item.category === selectedCategory);

  return (
    <section className="py-12 bg-transparent">
      <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Category Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {workCategories.map((category, index) => {
            const Icon = category.icon;
            const categoryWorkItems = workItems.filter(item => item.category === category.id);
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`p-6 cursor-pointer transition-all duration-300 ${category.bgColor} border-2 border-transparent hover:border-gray-200 hover:shadow-lg ${
                    selectedCategory === category.id ? 'ring-2 ring-blue-500 border-blue-200' : ''
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <Icon className={`h-8 w-8 ${category.color}`} />
                    <Badge variant="secondary" className="text-xs">
                      {categoryWorkItems.length}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{category.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{category.description}</p>
                  <div className="flex items-center text-blue-600 mt-4 text-sm font-medium">
                    View Details <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
            className="rounded-full"
          >
            All Work
          </Button>
          {workCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="rounded-full"
            >
              {category.title}
            </Button>
          ))}
        </div>

        {/* Work Items Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading work items...</p>
          </div>
        ) : filteredWorkItems.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {(showAllWork ? filteredWorkItems : filteredWorkItems.slice(0, 6)).map((workItem, index) => {
                const categoryData = getCategoryData(workItem.category);
                const Icon = categoryData?.icon || Award;

                return (
                  <motion.div
                    key={workItem._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
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
                              Read More
                            </span>
                            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {filteredWorkItems.length > 6 && (
              <div className="text-center">
                <Button
                  onClick={() => setShowAllWork(!showAllWork)}
                  variant="outline"
                  className="bg-white hover:bg-gray-50"
                >
                  {showAllWork ? 'Show Less' : `View All ${filteredWorkItems.length} Items`}
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Plus className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No work items found</h3>
            <p className="text-gray-600">
              {selectedCategory === 'all' 
                ? 'No work items have been added yet.' 
                : `No work items found for ${workCategories.find(c => c.id === selectedCategory)?.title}.`}
            </p>
          </div>
        )}
      </div>

      {/* Work Item Detail Modal */}
      {selectedWork && (
        <Dialog open={!!selectedWork} onOpenChange={() => setSelectedWork(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                {(() => {
                  const categoryData = getCategoryData(selectedWork.category);
                  const Icon = categoryData?.icon || Award;
                  return <Icon className={`h-6 w-6 ${categoryData?.color || 'text-gray-600'}`} />;
                })()}
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
                  {workCategories.find(c => c.id === selectedWork.category)?.title || 'Other'}
                </Badge>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}