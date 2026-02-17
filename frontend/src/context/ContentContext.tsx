import React, { createContext, useState, useEffect, useCallback } from 'react';
import { contentApi, authApi } from '../lib/api';

// Default content for the website (fallback)
const defaultContent = {
  hero: {
    headline: "CREATIVE / STUDIO / BUILT FOR SMALL BRANDS",
    subheadline: "We design identities, sites, and campaigns that turn small teams into memorable brands.",
    cta: "Explore work",
    microLabel: "NEXGEN STUDIO — 2026"
  },
  about: {
    eyebrow: "WHO WE ARE",
    headline: "A small team with big craft.",
    body: "We're designers, developers, and writers who partner with founders, creators, and small teams. We keep the process simple—and the work sharp.",
    statement: "CLARITY FIRST. THEN THE FUN STUFF.",
    cta: "Meet the studio"
  },
  services: {
    headline: "WHAT WE DO",
    body: "Brand systems, web design, and campaigns—built to launch fast and grow with you.",
    cta: "See services",
    items: [
      { title: "Brand Identity", description: "Logo, type, color, guidelines." },
      { title: "Web Design", description: "Responsive, fast, accessible." },
      { title: "Campaign Kits", description: "Social, email, landing pages." }
    ]
  },
  portfolio: {
    headline: "SELECTED WORK",
    body: "A few recent launches—designed to move fast and feel human.",
    cta: "View all projects",
    projects: [
      { title: "Lumen Coffee", subtitle: "Brand + Site", image: "/portfolio_top_left.jpg" },
      { title: "North Supply", subtitle: "Packaging", image: "/portfolio_bottom_left.jpg" },
      { title: "Daybreak App", subtitle: "UI Kit", image: "/portfolio_bottom_right.jpg" }
    ]
  },
  process: {
    headline: "HOW WE WORK",
    body: "A simple process that keeps you in control—and keeps the work on time.",
    steps: [
      { number: "01", title: "Discover", description: "Goals, audience, constraints." },
      { number: "02", title: "Design", description: "Systems, prototypes, polish." },
      { number: "03", title: "Deliver", description: "Handoff, support, iteration." }
    ]
  },
  results: {
    headline: "Results that speak plainly.",
    body: "We measure success by launches shipped, clarity gained, and teams confident enough to grow.",
    metrics: [
      { value: "12+", label: "Launches shipped" },
      { value: "3 weeks", label: "Average time to first design" },
      { value: "100%", label: "Remote-friendly process" }
    ],
    testimonial: {
      quote: "NexGen turned our rough idea into a brand we're proud to show investors—in under a month.",
      author: "Ava R., Founder, Lumen Coffee"
    }
  },
  blog: {
    headline: "Latest notes",
    body: "Short reads on branding, product design, and shipping fast.",
    cta: "Read more",
    posts: [
      { title: "How to name your product without overthinking it", excerpt: "A practical guide to finding a name that sticks." },
      { title: "The 3-week landing page playbook", excerpt: "Ship fast without sacrificing quality." },
      { title: "Design systems for tiny teams", excerpt: "Build consistency without the overhead." }
    ]
  },
  contact: {
    headline: "Ready when you are.",
    body: "Tell us what you're building. We'll reply within 2 business days.",
    email: "hello@nexgen.studio",
    location: "Based everywhere / UTC±2",
    form: {
      emailPlaceholder: "you@company.com",
      messagePlaceholder: "What are you launching?",
      buttonText: "Send message"
    }
  },
  team: {
    members: [
      { name: "Alex Chen", role: "Creative Director", image: "/hero_portrait_left.jpg" },
      { name: "Sam Rivera", role: "Lead Designer", image: "/about_portrait_left.jpg" },
      { name: "Jordan Park", role: "Developer", image: "/services_workspace_right.jpg" }
    ]
  }
};

// TypeScript interfaces for type safety
interface TeamMember {
  name: string;
  role: string;
  image: string;
}

interface ServiceItem {
  title: string;
  description: string;
}

interface Project {
  title: string;
  subtitle: string;
  image: string;
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface Metric {
  value: string;
  label: string;
}

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
}

interface ContentSection {
  [key: string]: unknown;
}

interface ContentData {
  hero: {
    headline: string;
    subheadline: string;
    cta: string;
    microLabel: string;
  };
  about: {
    eyebrow: string;
    headline: string;
    body: string;
    statement: string;
    cta: string;
  };
  services: {
    headline: string;
    body: string;
    cta: string;
    items: ServiceItem[];
  };
  portfolio: {
    headline: string;
    body: string;
    cta: string;
    projects: Project[];
  };
  process: {
    headline: string;
    body: string;
    steps: ProcessStep[];
  };
  results: {
    headline: string;
    body: string;
    metrics: Metric[];
    testimonial: {
      quote: string;
      author: string;
    };
  };
  blog: {
    headline: string;
    body: string;
    cta: string;
    posts: BlogPost[];
  };
  contact: {
    headline: string;
    body: string;
    cta: string;
    email: string;
    location: string;
    form: {
      emailPlaceholder: string;
      messagePlaceholder: string;
      buttonText: string;
    };
  };
  team: {
    members: TeamMember[];
  };
}

interface ContentContextType {
  content: ContentData;
  updateContent: (section: string, data: ContentSection) => void;
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
  loading: boolean;
  error: string | null;
  refreshContent: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Export context for useContent hook
export { ContentContext };

// Deep merge helper function
const deepMerge = (target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> => {
  const result = { ...target };
  
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      // Deep merge objects
      result[key] = deepMerge(
        (target[key] as Record<string, unknown>) || {},
        source[key] as Record<string, unknown>
      );
    } else if (source[key] !== undefined) {
      // Use source value (including arrays)
      result[key] = source[key];
    }
  }
  
  return result;
};

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<ContentData>(defaultContent);
  const [isAdmin, setIsAdmin] = useState(() => authApi.isAuthenticated());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch content from API
  const fetchContent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await contentApi.getContent();
      if (response.success && response.data) {
        // Deep merge with defaults to ensure all fields exist
        const apiData = response.data as Record<string, unknown>;
        setContent(prev => {
          const merged = deepMerge(prev as unknown as Record<string, unknown>, apiData);
          // Ensure blog.posts exists (API doesn't store posts in content)
          if (!(merged.blog as Record<string, unknown>)?.posts) {
            (merged.blog as Record<string, unknown>).posts = (defaultContent.blog as Record<string, unknown>).posts;
          }
          return merged as unknown as ContentData;
        });
      }
    } catch (err) {
      console.error('Failed to fetch content:', err);
      setError(err instanceof Error ? err.message : 'Failed to load content');
      // Use cached content from localStorage as fallback
      const cached = localStorage.getItem('nexgen-content');
      if (cached) {
        setContent(JSON.parse(cached));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  // Cache content locally
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('nexgen-content', JSON.stringify(content));
    }
  }, [content, loading]);

  const updateContent = async (section: string, data: ContentSection) => {
    // Optimistically update UI
    setContent((prev: ContentData) => ({
      ...prev,
      [section]: { ...prev[section as keyof ContentData], ...data }
    }));

    // If admin, persist to backend
    if (isAdmin) {
      try {
        await contentApi.updateSection(section, data as Record<string, unknown>);
      } catch (err) {
        console.error('Failed to save content:', err);
        // Could revert here if needed
      }
    }
  };

  const refreshContent = async () => {
    await fetchContent();
  };

  return (
    <ContentContext.Provider value={{ 
      content, 
      updateContent, 
      isAdmin, 
      setIsAdmin, 
      loading, 
      error,
      refreshContent 
    }}>
      {children}
    </ContentContext.Provider>
  );
}
