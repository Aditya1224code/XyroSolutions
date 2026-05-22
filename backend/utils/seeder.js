import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load env vars
dotenv.config();

// Import models
import User from '../models/User.js';
import Content from '../models/Content.js';

// Connect to DB
mongoose.connect(process.env.MONGODB_URI);

// Default content data
const defaultContent = {
  hero: {
    headline: "We bring brands to life.",
    subheadline: "XyroSolutions is a creative agency specializing in brand identity, web design, and digital campaigns for ambitious startups and growing businesses."
  },
  about: {
    title: "About Us",
    description: "We're a team of designers, developers, and strategists who believe great brands are built on clarity, consistency, and craft. Since 2020, we've helped 50+ companies tell their story and grow their audience."
  },
  services: {
    items: [
      { title: "Brand Identity", description: "Logo, type, color, guidelines." },
      { title: "Web Design", description: "Responsive, fast, accessible." },
      { title: "Campaign Kits", description: "Social, email, landing pages." }
    ]
  },
  portfolio: {
    projects: [
      { title: "Lumen Coffee", subtitle: "Brand + Site", image: "/portfolio_top_left.jpg" },
      { title: "North Supply", subtitle: "Packaging", image: "/portfolio_bottom_left.jpg" },
      { title: "Daybreak App", subtitle: "UI Kit", image: "/portfolio_bottom_right.jpg" }
    ]
  },
  process: {
    steps: [
      { number: "01", title: "Discover", description: "Goals, audience, constraints." },
      { number: "02", title: "Design", description: "Systems, prototypes, polish." },
      { number: "03", title: "Deliver", description: "Handoff, support, iteration." }
    ]
  },
  results: {
    metrics: [
      { value: "12+", label: "Launches shipped" },
      { value: "3 weeks", label: "Average time to first design" },
      { value: "100%", label: "Remote-friendly process" }
    ]
  },
  team: {
    members: [
      { name: "Alex Chen", role: "Creative Director", image: "/hero_portrait_left.jpg" },
      { name: "Sam Rivera", role: "Lead Designer", image: "https://res.cloudinary.com/dr4w6ordx/image/upload/v1779460343/ChatGPT_Image_May_22_2026_07_43_23_PM_gvldqm.png" },
      { name: "Jordan Park", role: "Developer", image: "/services_workspace_right.jpg" }
    ]
  },
  contact: {
    email: "xyrosolutions1@gmail.com",
    phone: "+1 (555) 123-4567",
    address: "123 Creative Ave, San Francisco, CA 94102"
  },
  blog: {
    featured: null
  }
};

// Seed function
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...\n');

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Content.deleteMany({});

    // Create admin user
    console.log('Creating admin user...');
    const adminPassword = 'Bhotu@23';

    const admin = await User.create({
      email: 'adityaswarajoxf@gmail.com',
      password: adminPassword,
      role: 'admin'
    });
    console.log(`✅ Admin user created: ${admin.email}`);

    // Create default content
    console.log('Creating default content...');
    const content = await Content.create(defaultContent);
    console.log('✅ Default content created');

    console.log('\n========================================');
    console.log('✅ Database seeded successfully!');
    console.log('========================================');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

// Run seeder
seedDatabase();
