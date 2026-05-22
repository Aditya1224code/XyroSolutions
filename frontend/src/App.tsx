import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import PortfolioSection from './sections/PortfolioSection';
import WorkPage from './sections/WorkPage';
import WorkCategoryPage from './sections/WorkCategoryPage';
import ServicesPage from './sections/ServicesPage';
import ServiceInquiryPage from './sections/ServiceInquiryPage';
import PrivacyPage from './sections/Privacy';
import TermsPage from './sections/Terms';
import ProcessSection from './sections/ProcessSection';
import ResultsSection from './sections/ResultsSection';
import BlogSection from './sections/BlogSection';
import ContactSection from './sections/ContactSection';
import AdminLogin from './sections/AdminLogin';
import AdminDashboard from './sections/AdminDashboard';
import { ContentProvider } from './context/ContentContext';
import { useContent } from './hooks/useContent';
import { authApi } from './lib/api';

type Page = 'home' | 'work' | 'work-category' | 'services' | 'service-inquiry' | 'admin-login' | 'admin-dashboard' | 'privacy' | 'terms';

function MainWebsite({ 
  onAdminClick, 
  onPageChange, 
  currentPage 
}: { 
  onAdminClick: () => void;
  onPageChange: (page: string) => void;
  currentPage: string;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation 
        scrolled={scrolled} 
        onAdminClick={onAdminClick} 
        onPageChange={onPageChange}
        currentPage={currentPage}
      />
      
      {/* Main Content */}
      <main>
        <HeroSection onNavigate={onPageChange} />
        <AboutSection />
        <PortfolioSection />
        <ProcessSection />
        <ResultsSection />
        <BlogSection />
        <ContactSection onNavigate={onPageChange} />
      </main>
    </div>
  );
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('web-development');
  const [selectedWorkCategory, setSelectedWorkCategory] = useState<string>('sih-alumni');
  const { isAdmin, setIsAdmin } = useContent();

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handlePageChange = (page: string, category?: string) => {
    if (page === 'service-inquiry' && category) {
      setSelectedCategory(category);
    }
    if (page === 'work-category' && category) {
      setSelectedWorkCategory(category);
    }
    navigateTo(page as Page);
  };

  const handleWorkCategorySelect = (category: string) => {
    setSelectedWorkCategory(category);
    navigateTo('work-category');
  };

  const handleAdminLogin = () => {
    setIsAdmin(true);
    navigateTo('admin-dashboard');
  };

  const handleLogout = () => {
    authApi.logout();
    setIsAdmin(false);
    navigateTo('home');
  };

  switch (currentPage) {
    case 'admin-login':
      return <AdminLogin onLogin={handleAdminLogin} onBack={() => navigateTo('home')} />;
    case 'admin-dashboard':
      return isAdmin ? (
        <AdminDashboard onLogout={handleLogout} onViewSite={() => navigateTo('home')} />
      ) : (
        <AdminLogin onLogin={handleAdminLogin} onBack={() => navigateTo('home')} />
      );
    case 'work':
      return <WorkPage onBackToHome={() => navigateTo('home')} onSelectCategory={handleWorkCategorySelect} />;
    case 'privacy':
      return <PrivacyPage onBack={() => navigateTo('home')} />;
    case 'terms':
      return <TermsPage onBack={() => navigateTo('home')} />;
    case 'work-category':
      return <WorkCategoryPage category={selectedWorkCategory} onBackToWork={() => navigateTo('work')} onGoHome={() => navigateTo('home')} />;
    case 'services':
      return <ServicesPage onBackToHome={() => navigateTo('home')} onStartInquiry={(category: string) => handlePageChange('service-inquiry', category)} />;
    case 'service-inquiry':
      return <ServiceInquiryPage category={selectedCategory} onBackToServices={() => navigateTo('services')} onGoHome={() => navigateTo('home')} />;
    case 'home':
    default:
      return (
        <MainWebsite 
          onAdminClick={() => navigateTo('admin-login')} 
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      );
  }
}

function App() {
  return (
    <ContentProvider>
      <AppContent />
    </ContentProvider>
  );
}

export default App;
