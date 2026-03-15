import { useState, useRef, useEffect } from 'react';
import { useContent } from '../hooks/useContent';
import { 
  Layout, 
  Users, 
  Briefcase, 
  FolderOpen, 
  Settings, 
  LogOut, 
  Save,
  Plus,
  Trash2,
  ArrowLeft,
  Upload,
  Award,
  X,
  MessageSquare,
  Clock,
  Mail,
  Phone,
  Building,
  CheckCircle,
  AlertCircle,
  Menu
} from 'lucide-react';
import { toast } from 'sonner';
import { uploadApi } from '../lib/api';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://xyrosolutions.onrender.com/api';

type TabType = 'hero' | 'about' | 'services' | 'portfolio' | 'work' | 'process' | 'results' | 'blog' | 'contact' | 'inquiries';

interface ServiceInquiry {
  _id: string;
  category: string;
  projectType: string;
  projectDescription: string;
  budget: string;
  timeline: string;
  features: string[];
  references?: string;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    company?: string;
    preferredContact: string;
  };
  additionalNotes?: string;
  status: 'new' | 'contacted' | 'in-discussion' | 'proposal-sent' | 'converted' | 'closed';
  priority: 'low' | 'medium' | 'high';
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

interface AdminDashboardProps {
  onLogout: () => void;
  onViewSite: () => void;
}

export default function AdminDashboard({ onLogout, onViewSite }: AdminDashboardProps) {
  const { content, updateContent } = useContent();
  const [activeTab, setActiveTab] = useState<TabType>('hero');
  const [localContent, setLocalContent] = useState(content);
  const [workItems, setWorkItems] = useState<any[]>([]);
  const [serviceItems, setServiceItems] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<ServiceInquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<ServiceInquiry | null>(null);
  const [inquiryStats, setInquiryStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch work items
  useEffect(() => {
    if (activeTab === 'work') {
      fetchWorkItems();
    }
  }, [activeTab]);

  // Fetch service items
  useEffect(() => {
    if (activeTab === 'services') {
      fetchServiceItems();
    }
  }, [activeTab]);

  // Fetch inquiries
  useEffect(() => {
    if (activeTab === 'inquiries') {
      fetchInquiries();
    }
  }, [activeTab]);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('xyro-token');
      const response = await axios.get(`${API_URL}/service-inquiries`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInquiries(response.data.data || []);
      
      // Fetch stats
      const statsResponse = await axios.get(`${API_URL}/service-inquiries/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInquiryStats(statsResponse.data.data);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      toast.error('Failed to fetch inquiries');
    } finally {
      setLoading(false);
    }
  };

  const updateInquiryStatus = async (id: string, status: string, priority?: string, adminNotes?: string) => {
    try {
      const token = localStorage.getItem('xyro-token');
      await axios.put(`${API_URL}/service-inquiries/${id}`, 
        { status, priority, adminNotes },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Inquiry updated successfully');
      fetchInquiries();
    } catch (error) {
      toast.error('Failed to update inquiry');
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      const token = localStorage.getItem('xyro-token');
      await axios.delete(`${API_URL}/service-inquiries/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Inquiry deleted successfully');
      setSelectedInquiry(null);
      fetchInquiries();
    } catch (error) {
      toast.error('Failed to delete inquiry');
    }
  };

  const fetchWorkItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/work`);
      setWorkItems(response.data.data || []);
    } catch (error) {
      console.error('Error fetching work items:', error);
      toast.error('Failed to fetch work items');
    } finally {
      setLoading(false);
    }
  };

  const createWorkItem = async (workData: any) => {
    try {
      const token = localStorage.getItem('xyro-token');
      if (!token) {
        toast.error('Please login again');
        return;
      }

      const response = await axios.post(`${API_URL}/work`, workData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        toast.success('Work item created successfully!');
        fetchWorkItems();
        return response.data.data;
      }
    } catch (error: any) {
      console.error('Error creating work item:', error);
      toast.error(error.response?.data?.message || 'Failed to create work item');
    }
  };

  const updateWorkItem = async (id: string, workData: any) => {
    try {
      const token = localStorage.getItem('xyro-token');
      if (!token) {
        toast.error('Please login again');
        return;
      }

      const response = await axios.put(`${API_URL}/work/${id}`, workData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        toast.success('Work item updated successfully!');
        fetchWorkItems();
        return response.data.data;
      } else {
        toast.error('Update failed - no success flag');
      }
    } catch (error: any) {
      console.error('Error updating work item:', error);
      toast.error(error.response?.data?.message || 'Failed to update work item');
    }
  };

  const deleteWorkItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this work item?')) return;
    
    try {
      const token = localStorage.getItem('xyro-token');
      if (!token) {
        toast.error('Please login again');
        return;
      }

      const response = await axios.delete(`${API_URL}/work/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        toast.success('Work item deleted successfully!');
        fetchWorkItems();
      }
    } catch (error: any) {
      console.error('Error deleting work item:', error);
      toast.error(error.response?.data?.message || 'Failed to delete work item');
    }
  };

  // Service management functions
  const fetchServiceItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/services`);
      setServiceItems(response.data.data || []);
    } catch (error) {
      console.error('Error fetching service items:', error);
      toast.error('Failed to fetch service items');
    } finally {
      setLoading(false);
    }
  };

  const createServiceItem = async (serviceData: any) => {
    try {
      const token = localStorage.getItem('xyro-token');
      if (!token) {
        toast.error('Please login again');
        return;
      }

      const response = await axios.post(`${API_URL}/services`, serviceData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        toast.success('Service item created successfully!');
        fetchServiceItems();
        return response.data.data;
      }
    } catch (error: any) {
      console.error('Error creating service item:', error);
      toast.error(error.response?.data?.message || 'Failed to create service item');
    }
  };

  const updateServiceItem = async (id: string, serviceData: any) => {
    try {
      const token = localStorage.getItem('xyro-token');
      if (!token) {
        toast.error('Please login again');
        return;
      }

      const response = await axios.put(`${API_URL}/services/${id}`, serviceData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        toast.success('Service item updated successfully!');
        fetchServiceItems();
        return response.data.data;
      } else {
        toast.error('Update failed - no success flag');
      }
    } catch (error: any) {
      console.error('Error updating service item:', error);
      toast.error(error.response?.data?.message || 'Failed to update service item');
    }
  };

  const deleteServiceItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service item?')) return;
    
    try {
      const token = localStorage.getItem('xyro-token');
      if (!token) {
        toast.error('Please login again');
        return;
      }

      const response = await axios.delete(`${API_URL}/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        toast.success('Service item deleted successfully!');
        fetchServiceItems();
      }
    } catch (error: any) {
      console.error('Error deleting service item:', error);
      toast.error(error.response?.data?.message || 'Failed to delete service item');
    }
  };

  const handleSave = () => {
    // Update all sections
    Object.keys(localContent).forEach((section) => {
      updateContent(section, localContent[section as keyof typeof localContent]);
    });
    toast.success('All changes saved successfully!');
  };

  const updateSection = (section: string, data: Record<string, unknown>) => {
    setLocalContent(prev => ({
      ...prev,
      [section]: { ...prev[section as keyof typeof prev], ...data }
    }));
  };

  const updateArrayItem = (section: string, arrayKey: string, index: number, data: Record<string, unknown>) => {
    setLocalContent(prev => {
      const sectionData = prev[section as keyof typeof prev] as Record<string, unknown>;
      const currentArray = sectionData[arrayKey] as Record<string, unknown>[];
      const newArray = [...currentArray];
      newArray[index] = { ...newArray[index], ...data };
      return {
        ...prev,
        [section]: { ...sectionData, [arrayKey]: newArray }
      };
    });
  };

  const addArrayItem = (section: string, arrayKey: string, defaultItem: Record<string, unknown>) => {
    setLocalContent(prev => {
      const sectionData = prev[section as keyof typeof prev] as Record<string, unknown>;
      const currentArray = sectionData[arrayKey] as Record<string, unknown>[];
      return {
        ...prev,
        [section]: { ...sectionData, [arrayKey]: [...currentArray, defaultItem] }
      };
    });
  };

  const removeArrayItem = (section: string, arrayKey: string, index: number) => {
    setLocalContent(prev => {
      const sectionData = prev[section as keyof typeof prev] as Record<string, unknown>;
      const currentArray = sectionData[arrayKey] as Record<string, unknown>[];
      const newArray = currentArray.filter((_, i: number) => i !== index);
      return {
        ...prev,
        [section]: { ...sectionData, [arrayKey]: newArray }
      };
    });
  };

  const tabs = [
    { id: 'hero', label: 'Hero', icon: Layout },
    { id: 'about', label: 'About', icon: Users },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'portfolio', label: 'Portfolio', icon: FolderOpen },
    { id: 'work', label: 'Work', icon: Award },
    { id: 'inquiries', label: 'Inquiries', icon: MessageSquare },
    { id: 'process', label: 'Process', icon: Settings },
    { id: 'results', label: 'Results', icon: Briefcase },
    { id: 'blog', label: 'Blog', icon: FolderOpen },
    { id: 'contact', label: 'Contact', icon: Layout },
  ];

  return (
    <div className="min-h-screen bg-off-white flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-dark text-white p-4 flex items-center justify-between sticky top-0 z-40">
        <div>
          <h1 className="font-display font-bold text-lg">XyroSolutions</h1>
          <p className="text-white/50 text-xs">Admin Dashboard</p>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40 mt-[60px]"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0
        w-64 bg-dark text-white flex flex-col fixed h-[calc(100%-60px)] md:h-full top-[60px] md:top-0 z-50
        transition-transform duration-300 ease-in-out
      `}>
        <div className="hidden md:block p-6 border-b border-white/10">
          <h1 className="font-display font-bold text-xl">XyroSolutions</h1>
          <p className="text-white/50 text-sm">Admin Dashboard</p>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as TabType);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-lime text-dark' 
                    : 'text-white/70 hover:bg-white/10'
                }`}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <button
            onClick={() => {
              setSidebarOpen(false);
              onViewSite();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-white/70 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>View Site</span>
          </button>
          <button
            onClick={() => {
              setSidebarOpen(false);
              onLogout();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-white/70 hover:bg-white/10 transition-colors"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-dark capitalize">
              {activeTab} Section
            </h2>
            <button
              onClick={handleSave}
              className="btn-primary flex items-center gap-2 text-sm md:text-base"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>

          {/* Hero Editor */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6">
                <label className="block text-sm font-medium text-dark mb-2">Micro Label</label>
                <input
                  type="text"
                  value={localContent.hero.microLabel}
                  onChange={(e) => updateSection('hero', { microLabel: e.target.value })}
                  className="w-full"
                />
              </div>
              <div className="bg-white rounded-xl p-6">
                <label className="block text-sm font-medium text-dark mb-2">Headline (use / for line breaks)</label>
                <input
                  type="text"
                  value={localContent.hero.headline}
                  onChange={(e) => updateSection('hero', { headline: e.target.value })}
                  className="w-full"
                />
              </div>
              <div className="bg-white rounded-xl p-6">
                <label className="block text-sm font-medium text-dark mb-2">Subheadline</label>
                <textarea
                  value={localContent.hero.subheadline}
                  onChange={(e) => updateSection('hero', { subheadline: e.target.value })}
                  rows={3}
                  className="w-full"
                />
              </div>
              <div className="bg-white rounded-xl p-6">
                <label className="block text-sm font-medium text-dark mb-2">CTA Button Text</label>
                <input
                  type="text"
                  value={localContent.hero.cta}
                  onChange={(e) => updateSection('hero', { cta: e.target.value })}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {/* About Editor */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6">
                <label className="block text-sm font-medium text-dark mb-2">Eyebrow</label>
                <input
                  type="text"
                  value={localContent.about.eyebrow}
                  onChange={(e) => updateSection('about', { eyebrow: e.target.value })}
                  className="w-full"
                />
              </div>
              <div className="bg-white rounded-xl p-6">
                <label className="block text-sm font-medium text-dark mb-2">Headline</label>
                <input
                  type="text"
                  value={localContent.about.headline}
                  onChange={(e) => updateSection('about', { headline: e.target.value })}
                  className="w-full"
                />
              </div>
              <div className="bg-white rounded-xl p-6">
                <label className="block text-sm font-medium text-dark mb-2">Body Text</label>
                <textarea
                  value={localContent.about.body}
                  onChange={(e) => updateSection('about', { body: e.target.value })}
                  rows={4}
                  className="w-full"
                />
              </div>
              <div className="bg-white rounded-xl p-6">
                <label className="block text-sm font-medium text-dark mb-2">Statement</label>
                <input
                  type="text"
                  value={localContent.about.statement}
                  onChange={(e) => updateSection('about', { statement: e.target.value })}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {/* Services Editor */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6">
                <label className="block text-sm font-medium text-dark mb-2">Headline</label>
                <input
                  type="text"
                  value={localContent.services.headline}
                  onChange={(e) => updateSection('services', { headline: e.target.value })}
                  className="w-full"
                />
              </div>
              <div className="bg-white rounded-xl p-6">
                <label className="block text-sm font-medium text-dark mb-2">Body Text</label>
                <textarea
                  value={localContent.services.body}
                  onChange={(e) => updateSection('services', { body: e.target.value })}
                  rows={3}
                  className="w-full"
                />
              </div>
              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-dark">Service Items</label>
                  <button
                    onClick={() => addArrayItem('services', 'items', { title: 'New Service', description: 'Description here' })}
                    className="flex items-center gap-1 text-sm text-lime hover:text-dark transition-colors"
                  >
                    <Plus size={16} />
                    Add Service
                  </button>
                </div>
                <div className="space-y-4">
                  {localContent.services.items.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <span className="font-medium text-sm text-gray-custom">Service {index + 1}</span>
                        <button
                          onClick={() => removeArrayItem('services', 'items', index)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => updateArrayItem('services', 'items', index, { title: e.target.value })}
                          placeholder="Service Title"
                          className="w-full"
                        />
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateArrayItem('services', 'items', index, { description: e.target.value })}
                          placeholder="Service Description"
                          className="w-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Portfolio Editor */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6">
                <label className="block text-sm font-medium text-dark mb-2">Headline</label>
                <input
                  type="text"
                  value={localContent.portfolio.headline}
                  onChange={(e) => updateSection('portfolio', { headline: e.target.value })}
                  className="w-full"
                />
              </div>
              <div className="bg-white rounded-xl p-6">
                <label className="block text-sm font-medium text-dark mb-2">Body Text</label>
                <textarea
                  value={localContent.portfolio.body}
                  onChange={(e) => updateSection('portfolio', { body: e.target.value })}
                  rows={3}
                  className="w-full"
                />
              </div>
              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-dark">Projects</label>
                  <button
                    onClick={() => addArrayItem('portfolio', 'projects', { title: 'New Project', subtitle: 'Category', image: '/placeholder.jpg' })}
                    className="flex items-center gap-2 px-3 py-1.5 bg-lime text-dark rounded-lg hover:bg-lime/80 transition-colors text-sm"
                  >
                    <Plus size={16} />
                    Add Project
                  </button>
                </div>
                <div className="space-y-4">
                  {localContent.portfolio.projects.map((project, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <span className="font-medium text-sm text-gray-custom">Project {index + 1}</span>
                        <button
                          onClick={() => removeArrayItem('portfolio', 'projects', index)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                          title="Delete project"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={project.title}
                            onChange={(e) => updateArrayItem('portfolio', 'projects', index, { title: e.target.value })}
                            placeholder="Project Title"
                            className="w-full"
                          />
                          <input
                            type="text"
                            value={project.subtitle}
                            onChange={(e) => updateArrayItem('portfolio', 'projects', index, { subtitle: e.target.value })}
                            placeholder="Project Subtitle"
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            {project.image && (
                              <img 
                                src={project.image} 
                                alt={project.title}
                                className="w-16 h-16 object-cover rounded-lg border"
                              />
                            )}
                            <div className="flex-1">
                              <label className="block text-xs text-gray-custom mb-1">Image</label>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={project.image || ''}
                                  onChange={(e) => updateArrayItem('portfolio', 'projects', index, { image: e.target.value })}
                                  placeholder="/image-path.jpg"
                                  className="w-full text-sm"
                                />
                                <label className="cursor-pointer px-3 py-2 bg-dark text-white rounded-lg hover:bg-dark/80 transition-colors flex items-center gap-1">
                                  <Upload size={14} />
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={async (e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        try {
                                          const response = await uploadApi.uploadImage(file);
                                          if (response.success && response.data) {
                                            const imageUrl = (response.data as { url: string }).url;
                                            updateArrayItem('portfolio', 'projects', index, { image: imageUrl });
                                            toast.success('Image uploaded!');
                                          }
                                        } catch (error) {
                                          toast.error('Failed to upload image');
                                        }
                                      }
                                    }}
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Process Editor */}
          {activeTab === 'process' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6">
                <label className="block text-sm font-medium text-dark mb-2">Headline</label>
                <input
                  type="text"
                  value={localContent.process.headline}
                  onChange={(e) => updateSection('process', { headline: e.target.value })}
                  className="w-full"
                />
              </div>
              <div className="bg-white rounded-xl p-6">
                <label className="block text-sm font-medium text-dark mb-2">Body Text</label>
                <textarea
                  value={localContent.process.body}
                  onChange={(e) => updateSection('process', { body: e.target.value })}
                  rows={3}
                  className="w-full"
                />
              </div>
              <div className="bg-white rounded-xl p-6">
                <label className="block text-sm font-medium text-dark mb-2">Process Steps</label>
                <div className="space-y-4">
                  {localContent.process.steps.map((step, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <span className="font-medium text-sm text-gray-custom">Step {index + 1}</span>
                      </div>
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={step.number}
                          onChange={(e) => updateArrayItem('process', 'steps', index, { number: e.target.value })}
                          placeholder="Step Number"
                          className="w-full"
                        />
                        <input
                          type="text"
                          value={step.title}
                          onChange={(e) => updateArrayItem('process', 'steps', index, { title: e.target.value })}
                          placeholder="Step Title"
                          className="w-full"
                        />
                        <input
                          type="text"
                          value={step.description}
                          onChange={(e) => updateArrayItem('process', 'steps', index, { description: e.target.value })}
                          placeholder="Step Description"
                          className="w-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Results Editor */}
          {activeTab === 'results' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6">
                <label className="block text-sm font-medium text-dark mb-2">Headline</label>
                <input
                  type="text"
                  value={localContent.results.headline}
                  onChange={(e) => updateSection('results', { headline: e.target.value })}
                  className="w-full"
                />
              </div>
              <div className="bg-white rounded-xl p-6">
                <label className="block text-sm font-medium text-dark mb-2">Body Text</label>
                <textarea
                  value={localContent.results.body}
                  onChange={(e) => updateSection('results', { body: e.target.value })}
                  rows={3}
                  className="w-full"
                />
              </div>
              <div className="bg-white rounded-xl p-6">
                <label className="block text-sm font-medium text-dark mb-2">Metrics</label>
                <div className="space-y-4">
                  {localContent.results.metrics.map((metric, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={metric.value}
                          onChange={(e) => updateArrayItem('results', 'metrics', index, { value: e.target.value })}
                          placeholder="Value (e.g., 12+)"
                          className="w-full"
                        />
                        <input
                          type="text"
                          value={metric.label}
                          onChange={(e) => updateArrayItem('results', 'metrics', index, { label: e.target.value })}
                          placeholder="Label"
                          className="w-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl p-6">
                <label className="block text-sm font-medium text-dark mb-2">Testimonial</label>
                <textarea
                  value={localContent.results.testimonial.quote}
                  onChange={(e) => updateSection('results', { testimonial: { ...localContent.results.testimonial, quote: e.target.value } })}
                  rows={3}
                  className="w-full mb-3"
                  placeholder="Quote"
                />
                <input
                  type="text"
                  value={localContent.results.testimonial.author}
                  onChange={(e) => updateSection('results', { testimonial: { ...localContent.results.testimonial, author: e.target.value } })}
                  className="w-full"
                  placeholder="Author"
                />
              </div>
            </div>
          )}

          {/* Blog Editor */}
          {activeTab === 'blog' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6">
                <label className="block text-sm font-medium text-dark mb-2">Headline</label>
                <input
                  type="text"
                  value={localContent.blog.headline}
                  onChange={(e) => updateSection('blog', { headline: e.target.value })}
                  className="w-full"
                />
              </div>
              <div className="bg-white rounded-xl p-6">
                <label className="block text-sm font-medium text-dark mb-2">Body Text</label>
                <textarea
                  value={localContent.blog.body}
                  onChange={(e) => updateSection('blog', { body: e.target.value })}
                  rows={3}
                  className="w-full"
                />
              </div>
              <div className="bg-white rounded-xl p-6">
                <label className="block text-sm font-medium text-dark mb-2">Blog Posts</label>
                <div className="space-y-4">
                  {localContent.blog.posts.map((post, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={post.title}
                          onChange={(e) => updateArrayItem('blog', 'posts', index, { title: e.target.value })}
                          placeholder="Post Title"
                          className="w-full"
                        />
                        <textarea
                          value={post.excerpt}
                          onChange={(e) => updateArrayItem('blog', 'posts', index, { excerpt: e.target.value })}
                          rows={2}
                          placeholder="Post Excerpt"
                          className="w-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Work Editor */}
          {activeTab === 'work' && (
            <div className="space-y-6">
              {/* Add New Work Item */}
              <WorkItemForm
                onSubmit={createWorkItem}
                onCancel={() => {}}
                loading={loading}
              />

              {/* Work Items List */}
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-lg font-semibold text-dark mb-4">Existing Work Items</h3>
                
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-gray-600 mt-2">Loading work items...</p>
                  </div>
                ) : workItems.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No work items found. Create your first one above.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {workItems.map((item) => (
                      <WorkItemCard
                        key={item._id}
                        item={item}
                        onUpdate={updateWorkItem}
                        onDelete={deleteWorkItem}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Services Editor */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              {/* Add New Service Item */}
              <ServiceItemForm
                onSubmit={createServiceItem}
                onCancel={() => {}}
                loading={loading}
              />

              {/* Service Items List */}
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-lg font-semibold text-dark mb-4">Existing Service Items</h3>
                
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-gray-600 mt-2">Loading service items...</p>
                  </div>
                ) : serviceItems.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No service items found. Create your first one above.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {serviceItems.map((item) => (
                      <ServiceItemCard
                        key={item._id}
                        item={item}
                        onUpdate={updateServiceItem}
                        onDelete={deleteServiceItem}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Contact Editor */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6">
                <label className="block text-sm font-medium text-dark mb-2">Headline</label>
                <input
                  type="text"
                  value={localContent.contact.headline}
                  onChange={(e) => updateSection('contact', { headline: e.target.value })}
                  className="w-full"
                />
              </div>
              <div className="bg-white rounded-xl p-6">
                <label className="block text-sm font-medium text-dark mb-2">Body Text</label>
                <textarea
                  value={localContent.contact.body}
                  onChange={(e) => updateSection('contact', { body: e.target.value })}
                  rows={3}
                  className="w-full"
                />
              </div>
              <div className="bg-white rounded-xl p-6">
                <label className="block text-sm font-medium text-dark mb-2">Email</label>
                <input
                  type="text"
                  value={localContent.contact.email}
                  onChange={(e) => updateSection('contact', { email: e.target.value })}
                  className="w-full"
                />
              </div>
              <div className="bg-white rounded-xl p-6">
                <label className="block text-sm font-medium text-dark mb-2">Location</label>
                <input
                  type="text"
                  value={localContent.contact.location}
                  onChange={(e) => updateSection('contact', { location: e.target.value })}
                  className="w-full"
                />
              </div>
              <div className="bg-white rounded-xl p-6">
                <label className="block text-sm font-medium text-dark mb-2">Form Placeholders</label>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={localContent.contact.form.emailPlaceholder}
                    onChange={(e) => updateSection('contact', { form: { ...localContent.contact.form, emailPlaceholder: e.target.value } })}
                    placeholder="Email Placeholder"
                    className="w-full"
                  />
                  <input
                    type="text"
                    value={localContent.contact.form.messagePlaceholder}
                    onChange={(e) => updateSection('contact', { form: { ...localContent.contact.form, messagePlaceholder: e.target.value } })}
                    placeholder="Message Placeholder"
                    className="w-full"
                  />
                  <input
                    type="text"
                    value={localContent.contact.form.buttonText}
                    onChange={(e) => updateSection('contact', { form: { ...localContent.contact.form, buttonText: e.target.value } })}
                    placeholder="Button Text"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Inquiries Manager */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              {inquiryStats && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-xl p-6 border-l-4 border-lime">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-lime/20 rounded-lg flex items-center justify-center">
                        <MessageSquare size={20} className="text-lime" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-dark">{inquiryStats.totalInquiries}</p>
                        <p className="text-sm text-gray-custom">Total Inquiries</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 border-l-4 border-blue-500">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <AlertCircle size={20} className="text-blue-500" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-dark">{inquiryStats.newInquiries}</p>
                        <p className="text-sm text-gray-custom">New (Unread)</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 border-l-4 border-orange-500">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Clock size={20} className="text-orange-500" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-dark">{inquiryStats.recentCount}</p>
                        <p className="text-sm text-gray-custom">Last 7 Days</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 border-l-4 border-green-500">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <CheckCircle size={20} className="text-green-500" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-dark">{inquiryStats.byStatus?.converted || 0}</p>
                        <p className="text-sm text-gray-custom">Converted</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Inquiries List */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-dark">Service Inquiries</h3>
                  <p className="text-sm text-gray-custom mt-1">Manage and respond to customer inquiries</p>
                </div>

                {loading ? (
                  <div className="p-12 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime mx-auto"></div>
                    <p className="text-gray-custom mt-4">Loading inquiries...</p>
                  </div>
                ) : inquiries.length === 0 ? (
                  <div className="p-12 text-center">
                    <MessageSquare size={48} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-custom">No inquiries yet</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {inquiries.map((inquiry) => (
                      <div 
                        key={inquiry._id} 
                        className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                          inquiry.status === 'new' ? 'bg-blue-50/50' : ''
                        }`}
                        onClick={() => setSelectedInquiry(inquiry)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-dark">{inquiry.contactInfo.name}</span>
                              {inquiry.status === 'new' && (
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">New</span>
                              )}
                              <span className={`px-2 py-0.5 text-xs rounded-full ${
                                inquiry.priority === 'high' ? 'bg-red-100 text-red-700' :
                                inquiry.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {inquiry.priority}
                              </span>
                            </div>
                            <p className="text-sm text-gray-custom mb-2">
                              {inquiry.category.replace('-', ' ')} • {inquiry.projectType.replace('-', ' ')}
                            </p>
                            <p className="text-sm text-dark/70 line-clamp-2">{inquiry.projectDescription}</p>
                          </div>
                          <div className="text-right ml-4">
                            <p className="text-xs text-gray-custom">
                              {new Date(inquiry.createdAt).toLocaleDateString()}
                            </p>
                            <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${
                              inquiry.status === 'new' ? 'bg-blue-100 text-blue-700' :
                              inquiry.status === 'contacted' ? 'bg-purple-100 text-purple-700' :
                              inquiry.status === 'in-discussion' ? 'bg-yellow-100 text-yellow-700' :
                              inquiry.status === 'proposal-sent' ? 'bg-orange-100 text-orange-700' :
                              inquiry.status === 'converted' ? 'bg-green-100 text-green-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {inquiry.status.replace('-', ' ')}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Inquiry Detail Modal */}
              {selectedInquiry && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-dark">Inquiry Details</h3>
                        <p className="text-sm text-gray-custom">
                          Submitted on {new Date(selectedInquiry.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedInquiry(null)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    
                    <div className="p-6 space-y-6">
                      {/* Contact Info */}
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="font-semibold text-dark mb-3 flex items-center gap-2">
                          <Users size={18} /> Contact Information
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <Users size={16} className="text-gray-custom" />
                            <span className="text-dark">{selectedInquiry.contactInfo.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail size={16} className="text-gray-custom" />
                            <a href={`mailto:${selectedInquiry.contactInfo.email}`} className="text-blue-600 hover:underline">
                              {selectedInquiry.contactInfo.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone size={16} className="text-gray-custom" />
                            <a href={`tel:${selectedInquiry.contactInfo.phone}`} className="text-blue-600 hover:underline">
                              {selectedInquiry.contactInfo.phone}
                            </a>
                          </div>
                          {selectedInquiry.contactInfo.company && (
                            <div className="flex items-center gap-2">
                              <Building size={16} className="text-gray-custom" />
                              <span className="text-dark">{selectedInquiry.contactInfo.company}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-dark flex items-center gap-2">
                          <Briefcase size={18} /> Project Details
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-custom mb-1">Category</p>
                            <p className="font-medium text-dark capitalize">{selectedInquiry.category.replace('-', ' ')}</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-custom mb-1">Project Type</p>
                            <p className="font-medium text-dark capitalize">{selectedInquiry.projectType.replace('-', ' ')}</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-custom mb-1">Budget</p>
                            <p className="font-medium text-dark">{selectedInquiry.budget.replace(/-/g, ' ')}</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-custom mb-1">Timeline</p>
                            <p className="font-medium text-dark capitalize">{selectedInquiry.timeline.replace(/-/g, ' ')}</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3 md:col-span-2">
                            <p className="text-xs text-gray-custom mb-1">Features Requested</p>
                            <div className="flex flex-wrap gap-1">
                              {selectedInquiry.features.map((f, i) => (
                                <span key={i} className="px-2 py-0.5 bg-lime/20 text-dark text-xs rounded">
                                  {f.replace('-', ' ')}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-xs text-gray-custom mb-2">Project Description</p>
                          <p className="text-dark whitespace-pre-wrap">{selectedInquiry.projectDescription}</p>
                        </div>
                        
                        {selectedInquiry.references && (
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-xs text-gray-custom mb-2">References</p>
                            <p className="text-dark">{selectedInquiry.references}</p>
                          </div>
                        )}
                        
                        {selectedInquiry.additionalNotes && (
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-xs text-gray-custom mb-2">Additional Notes</p>
                            <p className="text-dark">{selectedInquiry.additionalNotes}</p>
                          </div>
                        )}
                      </div>

                      {/* Status & Actions */}
                      <div className="border-t border-gray-200 pt-6">
                        <h4 className="font-semibold text-dark mb-4">Update Status</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-dark mb-2">Status</label>
                            <select
                              value={selectedInquiry.status}
                              onChange={(e) => {
                                const updated = { ...selectedInquiry, status: e.target.value as ServiceInquiry['status'] };
                                setSelectedInquiry(updated);
                              }}
                              className="w-full p-3 border border-gray-200 rounded-lg"
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="in-discussion">In Discussion</option>
                              <option value="proposal-sent">Proposal Sent</option>
                              <option value="converted">Converted</option>
                              <option value="closed">Closed</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-dark mb-2">Priority</label>
                            <select
                              value={selectedInquiry.priority}
                              onChange={(e) => {
                                const updated = { ...selectedInquiry, priority: e.target.value as ServiceInquiry['priority'] };
                                setSelectedInquiry(updated);
                              }}
                              className="w-full p-3 border border-gray-200 rounded-lg"
                            >
                              <option value="low">Low</option>
                              <option value="medium">Medium</option>
                              <option value="high">High</option>
                            </select>
                          </div>
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-dark mb-2">Admin Notes</label>
                          <textarea
                            value={selectedInquiry.adminNotes || ''}
                            onChange={(e) => {
                              const updated = { ...selectedInquiry, adminNotes: e.target.value };
                              setSelectedInquiry(updated);
                            }}
                            placeholder="Add internal notes about this inquiry..."
                            rows={3}
                            className="w-full p-3 border border-gray-200 rounded-lg resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex items-center justify-between">
                      <button
                        onClick={() => deleteInquiry(selectedInquiry._id)}
                        className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2"
                      >
                        <Trash2 size={18} />
                        Delete
                      </button>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setSelectedInquiry(null)}
                          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            updateInquiryStatus(
                              selectedInquiry._id, 
                              selectedInquiry.status, 
                              selectedInquiry.priority,
                              selectedInquiry.adminNotes
                            );
                            setSelectedInquiry(null);
                          }}
                          className="px-6 py-2 bg-lime text-dark rounded-lg font-medium flex items-center gap-2"
                        >
                          <Save size={18} />
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// Work Item Form Component
function WorkItemForm({ 
  item, 
  onSubmit, 
  onCancel, 
  loading 
}: { 
  item?: any; 
  onSubmit: (data: any) => void; 
  onCancel: () => void; 
  loading: boolean; 
}) {
  const [formData, setFormData] = useState({
    title: item?.title || '',
    subtitle: item?.subtitle || '',
    description: item?.description || '',
    shortDescription: item?.shortDescription || '',
    category: item?.category || 'sih-alumni',
    image: item?.image || '',
    tags: item?.tags?.join(', ') || '',
    achievements: item?.achievements?.join('\n') || '',
    links: item?.links?.map((l: any) => `${l.title}|${l.url}`).join('\n') || '',
    order: item?.order || 0
  });

  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { value: 'sih-alumni', label: 'SIH Alumni' },
    { value: 'amity-innovation', label: 'Amity Innovation Cell' },
    { value: 'hackathons', label: 'Hackathon Projects' },
    { value: 'cybercubs', label: 'Cybercubs Winner' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'other', label: 'Other' }
  ];

  const handleImageUpload = async (file: File) => {
    if (!file) return;

    try {
      setUploading(true);
      const response = await uploadApi.uploadImage(file);
      
      // Extract just the URL from the response
      const imageUrl = response.data?.url;
      console.log('Upload response:', response);
      console.log('Extracted URL:', imageUrl);
      
      if (!imageUrl) {
        throw new Error('No URL returned from upload');
      }
      
      setFormData(prev => ({ ...prev, image: imageUrl }));
      toast.success('Image uploaded successfully!');
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const processedData = {
      ...formData,
      tags: formData.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t),
      achievements: formData.achievements.split('\n').map((a: string) => a.trim()).filter((a: string) => a),
      links: formData.links
        .split('\n')
        .map((l: string) => l.trim())
        .filter((l: string) => l)
        .map((l: string) => {
          const [title, url] = l.split('|');
          return { title: title?.trim() || '', url: url?.trim() || '' };
        })
        .filter((l: { title: string; url: string }) => l.title && l.url)
    };
    
    onSubmit(processedData);
  };

  return (
    <div className="bg-white rounded-xl p-6">
      <h3 className="text-lg font-semibold text-dark mb-4">
        {item ? 'Edit Work Item' : 'Add New Work Item'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-2">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
              className="w-full"
              placeholder="Work title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-dark mb-2">Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              required
              className="w-full"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-2">Subtitle</label>
          <input
            type="text"
            value={formData.subtitle}
            onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
            className="w-full"
            placeholder="Short subtitle or achievement"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-2">Short Description</label>
          <textarea
            value={formData.shortDescription}
            onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
            rows={2}
            className="w-full"
            placeholder="Brief description for card view"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-2">Full Description *</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={4}
            required
            className="w-full"
            placeholder="Complete description with details"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-2">Image</label>
          <div className="space-y-3">
            {formData.image ? (
              <div className="relative inline-block">
                <img
                  src={formData.image}
                  alt="Work item"
                  className="w-40 h-24 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600"
                >
                  <X size={12} />
                </button>
                <div className="mt-2 text-sm text-green-600 font-medium">
                  ✅ Image uploaded successfully
                </div>
              </div>
            ) : (
              <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <div className="space-y-2">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Click to upload</span> or drag and drop
                  </div>
                  <div className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {uploading && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />
                      <span className="text-sm text-gray-600">Uploading...</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-2">Tags (comma separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              className="w-full"
              placeholder="React, Node.js, AI, etc."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-dark mb-2">Order</label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
              className="w-full"
              placeholder="0"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-2">Achievements (one per line)</label>
          <textarea
            value={formData.achievements}
            onChange={(e) => setFormData(prev => ({ ...prev, achievements: e.target.value }))}
            rows={3}
            className="w-full"
            placeholder="First place in hackathon&#10;Developed innovative solution&#10;Team leadership"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-2">Links (format: Title|URL, one per line)</label>
          <textarea
            value={formData.links}
            onChange={(e) => setFormData(prev => ({ ...prev, links: e.target.value }))}
            rows={3}
            className="w-full"
            placeholder="GitHub Repository|https://github.com/username/repo&#10;Live Demo|https://example.com"
          />
        </div>

        <div className="flex gap-2 pt-4">
          <button
            type="submit"
            disabled={loading || !formData.title || !formData.description}
            className="btn-primary flex items-center gap-2 px-6"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
            ) : (
              <Save size={16} />
            )}
            {item ? 'Update' : 'Create'} Work Item
          </button>
          {item && (
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

// Work Item Card Component
function WorkItemCard({ 
  item, 
  onUpdate, 
  onDelete 
}: { 
  item: any; 
  onUpdate: (id: string, data: any) => void; 
  onDelete: (id: string) => void; 
}) {
  const [editing, setEditing] = useState(false);
  
  const categories = {
    'sih-alumni': 'SIH Alumni',
    'amity-innovation': 'Amity Innovation Cell',
    'hackathons': 'Hackathon Projects',
    'cybercubs': 'Cybercubs Winner',
    'web-development': 'Web Development',
    'other': 'Other'
  };

  const handleUpdate = (data: any) => {
    onUpdate(item._id, data);
    setEditing(false);
  };

  if (editing) {
    return (
      <WorkItemForm
        item={item}
        onSubmit={handleUpdate}
        onCancel={() => setEditing(false)}
        loading={false}
      />
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold text-dark">{item.title}</h4>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              {categories[item.category as keyof typeof categories] || item.category}
            </span>
            {item.order !== 0 && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Order: {item.order}
              </span>
            )}
          </div>
          
          {item.subtitle && (
            <p className="text-sm text-blue-600 mb-1">{item.subtitle}</p>
          )}
          
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {item.shortDescription || item.description}
          </p>
          
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {item.tags.slice(0, 3).map((tag: string, index: number) => (
                <span key={index} className="text-xs bg-gray-100 px-1 py-0.5 rounded">
                  {tag}
                </span>
              ))}
              {item.tags.length > 3 && (
                <span className="text-xs text-gray-500">+{item.tags.length - 3}</span>
              )}
            </div>
          )}
        </div>

        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            className="w-20 h-12 object-cover rounded ml-4"
          />
        )}
      </div>

      <div className="flex justify-between items-center mt-3 pt-3 border-t">
        <div className="text-xs text-gray-500">
          Created: {new Date(item.createdAt).toLocaleDateString()}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setEditing(true)}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(item._id)}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// Service Item Form Component
function ServiceItemForm({ 
  item, 
  onSubmit, 
  onCancel, 
  loading 
}: { 
  item?: any; 
  onSubmit: (data: any) => void; 
  onCancel: () => void; 
  loading: boolean; 
}) {
  const [formData, setFormData] = useState({
    title: item?.title || '',
    subtitle: item?.subtitle || '',
    description: item?.description || '',
    shortDescription: item?.shortDescription || '',
    category: item?.category || 'web-development',
    image: item?.image || '',
    features: item?.features?.join('\n') || '',
    pricing: item?.pricing || '',
    duration: item?.duration || '',
    tags: item?.tags?.join(', ') || '',
    links: item?.links?.map((l: any) => `${l.title}|${l.url}`).join('\n') || '',
    order: item?.order || 0,
    featured: item?.featured || false
  });

  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { value: 'web-development', label: 'Web Development' },
    { value: 'mobile-apps', label: 'Mobile Apps' },
    { value: 'ai-ml', label: 'AI & ML' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'design', label: 'Design' },
    { value: 'other', label: 'Other' }
  ];

  const handleImageUpload = async (file: File) => {
    if (!file) return;

    try {
      setUploading(true);
      const response = await uploadApi.uploadImage(file);
      
      // Extract just the URL from the response
      const imageUrl = response.data?.url;
      console.log('Upload response:', response);
      console.log('Extracted URL:', imageUrl);
      
      if (!imageUrl) {
        throw new Error('No URL returned from upload');
      }
      
      setFormData(prev => ({ ...prev, image: imageUrl }));
      toast.success('Image uploaded successfully!');
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const processedData = {
      ...formData,
      features: formData.features.split('\n').map((f: string) => f.trim()).filter((f: string) => f),
      tags: formData.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t),
      links: formData.links
        .split('\n')
        .map((l: string) => l.trim())
        .filter((l: string) => l)
        .map((l: string) => {
          const [title, url] = l.split('|');
          return { title: title?.trim() || '', url: url?.trim() || '' };
        })
        .filter((l: { title: string; url: string }) => l.title && l.url)
    };
    
    onSubmit(processedData);
  };

  return (
    <div className="bg-white rounded-xl p-6">
      <h3 className="text-lg font-semibold text-dark mb-4">
        {item ? 'Edit Service Item' : 'Add New Service Item'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-2">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
              className="w-full"
              placeholder="Service title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-dark mb-2">Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              required
              className="w-full"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-2">Subtitle</label>
          <input
            type="text"
            value={formData.subtitle}
            onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
            className="w-full"
            placeholder="Service subtitle or tagline"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-2">Short Description</label>
          <textarea
            value={formData.shortDescription}
            onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
            rows={2}
            className="w-full"
            placeholder="Brief description for card view"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-2">Full Description *</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={4}
            required
            className="w-full"
            placeholder="Complete service description"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-2">Pricing</label>
            <input
              type="text"
              value={formData.pricing}
              onChange={(e) => setFormData(prev => ({ ...prev, pricing: e.target.value }))}
              className="w-full"
              placeholder="Starting from $500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-dark mb-2">Duration</label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              className="w-full"
              placeholder="2-4 weeks"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-2">Image</label>
          <div className="space-y-3">
            {formData.image ? (
              <div className="relative inline-block">
                <img
                  src={formData.image}
                  alt="Service item"
                  className="w-40 h-24 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600"
                >
                  <X size={12} />
                </button>
                <div className="mt-2 text-sm text-green-600 font-medium">
                  ✅ Image uploaded successfully
                </div>
              </div>
            ) : (
              <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <div className="space-y-2">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Click to upload</span> or drag and drop
                  </div>
                  <div className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {uploading && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />
                      <span className="text-sm text-gray-600">Uploading...</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-2">Key Features (one per line)</label>
          <textarea
            value={formData.features}
            onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
            rows={4}
            className="w-full"
            placeholder="Custom design&#10;Responsive layout&#10;SEO optimized&#10;Fast loading"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-2">Tags (comma separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              className="w-full"
              placeholder="React, TypeScript, etc."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-dark mb-2">Order</label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
              className="w-full"
              placeholder="0"
            />
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                className="rounded"
              />
              <span className="text-sm font-medium text-dark">Featured Service</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-2">Links (format: Title|URL, one per line)</label>
          <textarea
            value={formData.links}
            onChange={(e) => setFormData(prev => ({ ...prev, links: e.target.value }))}
            rows={3}
            className="w-full"
            placeholder="Portfolio|https://portfolio.com&#10;Contact|https://contact.com"
          />
        </div>

        <div className="flex gap-2 pt-4">
          <button
            type="submit"
            disabled={loading || !formData.title || !formData.description}
            className="btn-primary flex items-center gap-2 px-6"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
            ) : (
              <Save size={16} />
            )}
            {item ? 'Update' : 'Create'} Service Item
          </button>
          {item && (
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

// Service Item Card Component
function ServiceItemCard({ 
  item, 
  onUpdate, 
  onDelete 
}: { 
  item: any; 
  onUpdate: (id: string, data: any) => void; 
  onDelete: (id: string) => void; 
}) {
  const [editing, setEditing] = useState(false);
  
  const categories = {
    'web-development': 'Web Development',
    'mobile-apps': 'Mobile Apps',
    'ai-ml': 'AI & ML',
    'consulting': 'Consulting',
    'design': 'Design',
    'other': 'Other'
  };

  const handleUpdate = (data: any) => {
    onUpdate(item._id, data);
    setEditing(false);
  };

  if (editing) {
    return (
      <ServiceItemForm
        item={item}
        onSubmit={handleUpdate}
        onCancel={() => setEditing(false)}
        loading={false}
      />
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold text-dark">{item.title}</h4>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              {categories[item.category as keyof typeof categories] || item.category}
            </span>
            {item.featured && (
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                Featured
              </span>
            )}
            {item.order !== 0 && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Order: {item.order}
              </span>
            )}
          </div>
          
          {item.subtitle && (
            <p className="text-sm text-blue-600 mb-1">{item.subtitle}</p>
          )}

          {item.pricing && (
            <p className="text-sm text-green-600 mb-1 font-medium">{item.pricing}</p>
          )}
          
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {item.shortDescription || item.description}
          </p>
          
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {item.tags.slice(0, 3).map((tag: string, index: number) => (
                <span key={index} className="text-xs bg-gray-100 px-1 py-0.5 rounded">
                  {tag}
                </span>
              ))}
              {item.tags.length > 3 && (
                <span className="text-xs text-gray-500">+{item.tags.length - 3}</span>
              )}
            </div>
          )}
        </div>

        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            className="w-20 h-12 object-cover rounded ml-4"
          />
        )}
      </div>

      <div className="flex justify-between items-center mt-3 pt-3 border-t">
        <div className="text-xs text-gray-500">
          Created: {new Date(item.createdAt).toLocaleDateString()}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setEditing(true)}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(item._id)}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}