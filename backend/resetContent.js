import Content from './models/Content.js';
import connectDB from './config/db.js';
import './config/env.js';

const resetContent = async () => {
  try {
    await connectDB();
    
    // Delete all content
    await Content.deleteMany({});
    console.log('Cleared all content');

    // Create new content with correct URLs
    const newContent = await Content.create({
      services: {
        items: [
          { title: "Brand Identity", description: "Logo, type, color, guidelines." },
          { title: "Web Design", description: "Responsive, fast, accessible." },
          { title: "Campaign Kits", description: "Social, email, landing pages." }
        ]
      },
      portfolio: {
        projects: [
          { title: "Web Design", subtitle: "Design + Branding", image: "https://res.cloudinary.com/dr4w6ordx/image/upload/v1779460343/ChatGPT_Image_May_22_2026_07_43_23_PM_gvldqm.png" },
          { title: "IOT Solutions", subtitle: "Innovation + Manufacturing", image: "https://res.cloudinary.com/dr4w6ordx/image/upload/v1779559829/nexgen-studio/wzygtdqcuaakv3nsytsb.png" },
          { title: "App Development", subtitle: "Development + Integration", image: "https://res.cloudinary.com/dr4w6ordx/image/upload/v1779559150/nexgen-studio/vksseodnsre0tcepekgh.png" }
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
        ],
        testimonial: {
          quote: "XyroSolutions turned our rough idea into a brand we're proud to show investors—in under a month.",
          author: "Founded By SCOR7"
        }
      },
      team: {
        members: [
          { name: "Alex Chen", role: "Creative Director", image: "/hero_portrait_left.jpg" },
          { name: "Sam Rivera", role: "Lead Designer", image: "https://res.cloudinary.com/dr4w6ordx/image/upload/v1779460343/ChatGPT_Image_May_22_2026_07_43_23_PM_gvldqm.png" },
          { name: "Jordan Park", role: "Developer", image: "/services_workspace_right.jpg" }
        ]
      }
    });

    console.log('✓ Content reset successfully with new image URLs');
    process.exit(0);
  } catch (error) {
    console.error('Error resetting content:', error);
    process.exit(1);
  }
};

resetContent();
