import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  // Hero Section
  hero: {
    headline: { type: String, default: "CREATIVE / STUDIO / BUILT FOR SMALL BRANDS" },
    subheadline: { type: String, default: "We design identities, sites, and campaigns that turn small teams into memorable brands." },
    cta: { type: String, default: "Explore work" },
    microLabel: { type: String, default: "XYROSOLUTIONS — 2026" }
  },
  
  // About Section
  about: {
    eyebrow: { type: String, default: "WHO WE ARE" },
    headline: { type: String, default: "A small team with big craft." },
    body: { type: String, default: "We're designers, developers, and writers who partner with founders, creators, and small teams. We keep the process simple—and the work sharp." },
    statement: { type: String, default: "CLARITY FIRST. THEN THE FUN STUFF." },
    cta: { type: String, default: "Meet the studio" }
  },
  
  // Services Section
  services: {
    headline: { type: String, default: "WHAT WE DO" },
    body: { type: String, default: "Brand systems, web design, and campaigns—built to launch fast and grow with you." },
    cta: { type: String, default: "See services" },
    items: [{
      title: { type: String },
      description: { type: String }
    }]
  },
  
  // Portfolio Section
  portfolio: {
    headline: { type: String, default: "SELECTED WORK" },
    body: { type: String, default: "A few recent launches—designed to move fast and feel human." },
    cta: { type: String, default: "View all projects" },
    projects: [{
      title: { type: String },
      subtitle: { type: String },
      image: { type: String }
    }]
  },
  
  // Process Section
  process: {
    headline: { type: String, default: "HOW WE WORK" },
    body: { type: String, default: "A simple process that keeps you in control—and keeps the work on time." },
    steps: [{
      number: { type: String },
      title: { type: String },
      description: { type: String }
    }]
  },
  
  // Results Section
  results: {
    headline: { type: String, default: "Results that speak plainly." },
    body: { type: String, default: "We measure success by launches shipped, clarity gained, and teams confident enough to grow." },
    metrics: [{
      value: { type: String },
      label: { type: String }
    }],
    testimonial: {
      quote: { type: String, default: "XyroSolutions turned our rough idea into a brand we're proud to show investors—in under a month." },
      author: { type: String, default: "Ava R., Founder, Lumen Coffee" }
    }
  },
  
  // Blog Section
  blog: {
    headline: { type: String, default: "Latest notes" },
    body: { type: String, default: "Short reads on branding, product design, and shipping fast." },
    cta: { type: String, default: "View all articles" }
  },
  
  // Contact Section
  contact: {
    headline: { type: String, default: "Ready when you are." },
    body: { type: String, default: "Tell us what you're building. We'll reply within 2 business days." },
    cta: { type: String, default: "Send message" },
    email: { type: String, default: "xyrosolutions1@gmail.com" },
    location: { type: String, default: "Based everywhere / UTC±2" },
    form: {
      emailPlaceholder: { type: String, default: "you@company.com" },
      messagePlaceholder: { type: String, default: "What are you launching?" },
      buttonText: { type: String, default: "Send message" }
    }
  },
  
  // Team
  team: {
    members: [{
      name: { type: String },
      role: { type: String },
      image: { type: String }
    }]
  },

  updatedAt: {
    type: Date,
    default: Date.now
  },
  updatedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

// Update timestamp on save
contentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Content = mongoose.model('Content', contentSchema);

export default Content;
