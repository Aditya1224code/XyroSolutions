import { useState } from 'react';
import { Menu, X, Lock } from 'lucide-react';

interface NavigationProps {
  scrolled: boolean;
  onAdminClick: () => void;
  onPageChange: (page: string) => void;
  currentPage: string;
}

export default function Navigation({ scrolled, onAdminClick, onPageChange, currentPage }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            className="font-display font-bold text-lg tracking-tight text-dark"
          >
            XyroSolutions
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
        className={`fixed inset-0 z-40 bg-[#F6F6F2] transition-transform duration-500 md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavigation(link)}
              className="font-display text-3xl font-bold text-dark"
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
        </div>
      </div>
    </>
  );
}
