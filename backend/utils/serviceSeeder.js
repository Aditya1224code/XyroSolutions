// Load environment variables first
import '../config/env.js';
import mongoose from 'mongoose';
import Service from '../models/Service.js';
import connectDB from '../config/db.js';

const sampleServices = [
  {
    title: 'Custom Web Development',
    subtitle: 'Full-Stack Solutions',
    description: 'We create modern, responsive websites and web applications using the latest technologies like React, Node.js, and cloud services. Our solutions are tailored to your business needs and optimized for performance and user experience.',
    shortDescription: 'Custom websites and web applications using modern tech stack',
    category: 'web-development',
    image: 'https://via.placeholder.com/400x250/3b82f6/ffffff?text=Web+Development',
    features: [
      'Responsive design across all devices',
      'Modern frontend frameworks (React, Vue, Angular)',
      'Backend API development with Node.js',
      'Database integration (MongoDB, PostgreSQL)',
      'SEO optimization',
      'Performance optimization',
      'Security best practices',
      'Deployment and hosting setup'
    ],
    pricing: 'Starting from $2,500',
    duration: '4-8 weeks',
    tags: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Tailwind CSS'],
    links: [
      { title: 'Portfolio Examples', url: '#work' },
      { title: 'Get Quote', url: '#contact' }
    ],
    order: 1,
    featured: true
  },
  {
    title: 'Mobile App Development',
    subtitle: 'iOS & Android Apps',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences. We develop apps for both iOS and Android platforms using React Native, Flutter, and native technologies.',
    shortDescription: 'Cross-platform mobile apps for iOS and Android',
    category: 'mobile-apps',
    image: 'https://via.placeholder.com/400x250/10b981/ffffff?text=Mobile+Apps',
    features: [
      'Cross-platform development (React Native, Flutter)',
      'Native iOS and Android development',
      'UI/UX design for mobile interfaces',
      'App store optimization and submission',
      'Push notifications and real-time features',
      'Offline functionality',
      'Integration with device features',
      'Performance optimization'
    ],
    pricing: 'Starting from $5,000',
    duration: '8-12 weeks',
    tags: ['React Native', 'Flutter', 'iOS', 'Android', 'Firebase'],
    links: [
      { title: 'App Examples', url: '#work' },
      { title: 'Discuss Project', url: '#contact' }
    ],
    order: 2,
    featured: true
  },
  {
    title: 'AI & Machine Learning Solutions',
    subtitle: 'Intelligent Automation',
    description: 'Custom AI and machine learning solutions to automate processes, gain insights from data, and enhance user experiences. From chatbots to predictive analytics, we build intelligent systems.',
    shortDescription: 'AI-powered solutions and intelligent automation systems',
    category: 'ai-ml',
    image: 'https://via.placeholder.com/400x250/8b5cf6/ffffff?text=AI+%26+ML',
    features: [
      'Custom machine learning models',
      'Natural language processing (NLP)',
      'Computer vision applications',
      'Chatbot development',
      'Predictive analytics',
      'Data pipeline automation',
      'Model deployment and monitoring',
      'Integration with existing systems'
    ],
    pricing: 'Starting from $4,000',
    duration: '6-10 weeks',
    tags: ['Python', 'TensorFlow', 'OpenAI', 'scikit-learn', 'FastAPI'],
    links: [
      { title: 'AI Projects', url: '#work' },
      { title: 'Schedule Consultation', url: '#contact' }
    ],
    order: 3,
    featured: false
  },
  {
    title: 'UI/UX Design',
    subtitle: 'Beautiful User Experiences',
    description: 'Professional UI/UX design services that create intuitive and visually appealing interfaces. We focus on user research, wireframing, prototyping, and creating designs that convert.',
    shortDescription: 'Professional UI/UX design for web and mobile applications',
    category: 'design',
    image: 'https://via.placeholder.com/400x250/ec4899/ffffff?text=UI%2FUX+Design',
    features: [
      'User research and persona development',
      'Wireframing and prototyping',
      'Visual design and branding',
      'Responsive design systems',
      'Usability testing',
      'Design handoff to developers',
      'Brand identity creation',
      'Accessibility compliance'
    ],
    pricing: 'Starting from $1,800',
    duration: '3-6 weeks',
    tags: ['Figma', 'Adobe Creative Suite', 'Sketch', 'InVision', 'Principle'],
    links: [
      { title: 'Design Portfolio', url: '#work' },
      { title: 'Start Project', url: '#contact' }
    ],
    order: 4,
    featured: false
  },
  {
    title: 'Technology Consulting',
    subtitle: 'Strategic Tech Guidance',
    description: 'Technology consulting services to help businesses make informed decisions about their tech stack, architecture, and digital transformation strategies. We provide expert guidance and implementation support.',
    shortDescription: 'Expert technology consulting and strategic planning',
    category: 'consulting',
    image: 'https://via.placeholder.com/400x250/f59e0b/ffffff?text=Consulting',
    features: [
      'Technology stack evaluation',
      'System architecture design',
      'Digital transformation planning',
      'Code review and optimization',
      'Team training and mentorship',
      'Project planning and estimation',
      'Risk assessment and mitigation',
      'Technology roadmap creation'
    ],
    pricing: 'Starting from $150/hour',
    duration: 'Flexible engagement',
    tags: ['Strategy', 'Architecture', 'Best Practices', 'Training', 'Planning'],
    links: [
      { title: 'Case Studies', url: '#work' },
      { title: 'Book Consultation', url: '#contact' }
    ],
    order: 5,
    featured: false
  }
];

const seedServices = async () => {
  try {
    await connectDB();
    
    // Clear existing services
    await Service.deleteMany({});
    console.log('Cleared existing services');
    
    // Insert sample services
    await Service.insertMany(sampleServices);
    console.log('Sample services inserted successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding services:', error);
    process.exit(1);
  }
};

seedServices();