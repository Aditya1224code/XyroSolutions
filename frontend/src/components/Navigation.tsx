import { useEffect, useState } from 'react';
import { Menu, Moon, SunMedium, X, Lock } from 'lucide-react';
import { useTheme } from 'next-themes';

interface NavigationProps {
  scrolled: boolean;
  onAdminClick: () => void;
  onPageChange: (page: string) => void;
  currentPage: string;
}

export default function Navigation({ scrolled, onAdminClick, onPageChange, currentPage }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';
  const logoSrc = isDark ? '/logo-dark.svg' : '/logo.svg';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  const navLinks = [
    { label: 'Home', page: 'home', href: undefined },
    { label: 'Work', page: 'work', href: undefined },
    { label: 'Services', page: 'services', href: undefined },
    { label: 'Studio', page: undefined, href: '#about' },
    { label: 'Contact', page: undefined, href: '#contact' },
  ];

  const handleNavigation = (link: typeof navLinks[0]) => {
    if (link.page) {
      onPageChange(link.page);
    } else if (link.href) {
      // If we're not on home page, navigate to home first
      if (currentPage !== 'home') {
        onPageChange('home');
        setTimeout(() => {
          const element = document.querySelector(link.href!);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const element = document.querySelector(link.href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#F6F6F2]/90 backdrop-blur-md py-4 shadow-sm'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onPageChange('home')}
            className="h-[90px] md:h-[88px] flex shrink-0 items-center hover:opacity-80 transition-opacity"
            title="Xyro Solutions"
          >
            <img 
              src={logoSrc} 
              alt="Xyro Solutions" 
              className="h-[80px] md:h-[78px] w-auto"
              style={{ visibility: mounted ? 'visible' : 'hidden' }}
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavigation(link)}
                className="nav-link text-sm"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => onPageChange('services')}
              className="btn-primary text-sm"
            >
              Start a project
            </button>
            <button
              onClick={onAdminClick}
              className="p-2 text-gray-custom hover:text-dark transition-colors"
              title="Admin Access"
            >
              <Lock size={18} />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-black/10 bg-white/70 text-dark transition-colors hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              disabled={!mounted}
            >
              {mounted ? (isDark ? <SunMedium size={18} /> : <Moon size={18} />) : <span className="inline-block h-[18px] w-[18px]" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#F6F6F2] dark:bg-[#050608] transition-transform duration-500 md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavigation(link)}
              className="font-display text-3xl font-bold text-dark dark:text-white"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onPageChange('services');
            }}
            className="btn-primary text-lg mt-4"
          >
            Start a project
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onAdminClick();
            }}
            className="flex items-center gap-2 text-gray-custom mt-4"
          >
            <Lock size={18} />
            <span>Admin Access</span>
          </button>
          <button
            onClick={toggleTheme}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-dark transition-colors hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            disabled={!mounted}
          >
            {mounted ? (isDark ? <SunMedium size={18} /> : <Moon size={18} />) : <span className="inline-block h-[18px] w-[18px]" />}
            <span>{isDark ? 'Light mode' : 'Dark mode'}</span>
          </button>
        </div>
      </div>
    </>
  );
}
