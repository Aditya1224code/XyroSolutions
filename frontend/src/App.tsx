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
import XyroAiPage from './sections/XyroAiPage';
import { ContentProvider } from './context/ContentContext';
import { useContent } from './hooks/useContent';
import { authApi } from './lib/api';

type Page = 'home' | 'work' | 'work-category' | 'services' | 'service-inquiry' | 'admin-login' | 'admin-dashboard' | 'privacy' | 'terms' | 'xyro-ai';

function MainWebsite({ 
  onAdminClick, 
  onPageChange, 
  onAiClick,
  currentPage 
}: { 
  onAdminClick: () => void;
  onPageChange: (page: string) => void;
  onAiClick: () => void;
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

      <button
        type="button"
        onClick={onAiClick}
        className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full border border-white/20 bg-gradient-to-r from-fuchsia-500 via-amber-400 to-cyan-400 px-3 py-2 text-xs font-semibold text-white shadow-[0_14px_36px_rgba(236,72,153,0.24)] backdrop-blur-md transition-transform hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(34,211,238,0.24)] dark:border-white/10 dark:text-white sm:px-4 sm:py-2.5 sm:text-sm"
        aria-label="Open Xyro AI"
      >
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/25 text-white shadow-sm backdrop-blur-sm sm:h-8 sm:w-8">
          <BotIcon />
        </span>
        <span className="hidden sm:inline">XYRO AI</span>
      </button>
      
      {/* Main Content */}
      <main>
        <HeroSection onNavigate={onPageChange} />
        <AboutSection />
        <PortfolioSection onNavigate={onPageChange} />
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
    case 'xyro-ai':
      return <XyroAiPage onBack={() => navigateTo('home')} />;
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
          onAiClick={() => navigateTo('xyro-ai')}
          currentPage={currentPage}
        />
      );
  }
}

function BotIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2v2M7 4h10a4 4 0 0 1 4 4v6a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6V8a4 4 0 0 1 4-4Zm-1 7h.01M16 11h.01M9 16c.8.7 1.7 1 3 1s2.2-.3 3-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

function App() {
  useEffect(() => {
    const updateDeviceClass = () => {
      const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
      document.documentElement.classList.toggle('touch-device', isTouchDevice);
    };

    updateDeviceClass();

    const mediaQuery = window.matchMedia('(hover: none) and (pointer: coarse)');
    mediaQuery.addEventListener('change', updateDeviceClass);

    return () => {
      mediaQuery.removeEventListener('change', updateDeviceClass);
      document.documentElement.classList.remove('touch-device');
    };
  }, []);

  return (
    <ContentProvider>
      <AppContent />
    </ContentProvider>
  );
}

export default App;
