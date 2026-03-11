import Work from './models/Work.js';
import connectDB from './config/db.js';
import './config/env.js';

const seedWorkData = async () => {
  try {
    await connectDB();
    
    // Clear existing work data
    await Work.deleteMany({});
    console.log('Cleared existing work data');

    // Seed data
    const workItems = [
      {
        title: 'Smart India Hackathon 2023',
        subtitle: 'Winner - Healthcare Innovation',
        description: 'Developed an AI-powered healthcare diagnostics platform that uses machine learning to analyze medical images and provide preliminary diagnosis recommendations. The solution won first place in the healthcare category of Smart India Hackathon 2023, competing against over 500 teams nationwide.\n\nOur team created a comprehensive platform that includes:\n- Real-time medical image analysis using computer vision\n- Patient data management system\n- Predictive analytics for early disease detection\n- Mobile app for healthcare professionals',
        shortDescription: 'AI-powered healthcare diagnostics platform that won first place in SIH 2023 healthcare category.',
        category: 'sih-alumni',
        image: 'https://res.cloudinary.com/dr4w6ordx/image/upload/v1000000000/nexgen-studio/group-photo.jpg',
        tags: ['Artificial Intelligence', 'Healthcare', 'Computer Vision', 'React', 'Python', 'TensorFlow'],
        achievements: [
          'First place in Healthcare Innovation category',
          'Selected among top 10 from 500+ teams',
          'Mentorship from industry experts',
          'Patent application submitted'
        ],
        links: [
          { title: 'Project Demo', url: 'https://demo.sih-healthcare.com' },
          { title: 'GitHub Repository', url: 'https://github.com/nexgen/sih-healthcare' }
        ],
        order: 1,
        isActive: true
      },
      {
        title: 'Amity Innovation Cell Partnership',
        subtitle: 'EdTech Platform Development',
        description: 'Collaborated with Amity Innovation Cell to develop an innovative EdTech platform that revolutionizes online learning through interactive content delivery and AI-powered personalized learning paths.\n\nThe platform includes:\n- Adaptive learning algorithms that adjust to student pace\n- Interactive video content with real-time quizzes\n- Virtual laboratory simulations\n- Collaborative study groups and peer learning\n- Analytics dashboard for educators\n\nThis project was part of Amity\'s initiative to transform digital education and received funding for further development.',
        shortDescription: 'EdTech platform with AI-powered personalized learning, developed in partnership with Amity Innovation Cell.',
        category: 'amity-innovation',
        image: 'https://res.cloudinary.com/dr4w6ordx/image/upload/v1000000001/nexgen-studio/amity-edtech.jpg',
        tags: ['EdTech', 'AI/ML', 'React', 'Node.js', 'MongoDB', 'WebRTC'],
        achievements: [
          'Selected for Amity Innovation Cell incubation',
          'Secured pre-seed funding',
          'Partnership with 5+ educational institutions',
          'Featured in Amity University tech showcase'
        ],
        links: [
          { title: 'Platform Demo', url: 'https://edu.amity-innovation.com' },
          { title: 'Case Study', url: 'https://blog.amity.edu/innovation-case-study' }
        ],
        order: 2,
        isActive: true
      },
      {
        title: 'HackathonX Global 2023',
        subtitle: 'Blockchain Solution for Supply Chain',
        description: 'Participated in HackathonX Global 2023 and developed a blockchain-based supply chain transparency platform called "ChainTrace". The solution provides end-to-end traceability for products from manufacturer to consumer.\n\nKey features of ChainTrace:\n- Immutable product journey tracking\n- QR code verification system for consumers\n- Smart contracts for automated compliance checks\n- Real-time alerts for supply chain disruptions\n- Integration with IoT sensors for condition monitoring\n\nThe project secured 2nd place among 300+ international teams and received recognition from industry leaders.',
        shortDescription: 'Blockchain-based supply chain transparency platform - 2nd place in HackathonX Global 2023.',
        category: 'hackathons',
        image: 'https://res.cloudinary.com/dr4w6ordx/image/upload/v1000000002/nexgen-studio/blockchain-supply.jpg',
        tags: ['Blockchain', 'Smart Contracts', 'Web3', 'IoT', 'React', 'Solidity'],
        achievements: [
          '2nd place among 300+ international teams',
          'Best Blockchain Innovation award',
          'Mentorship from blockchain industry veterans',
          'Featured in HackathonX showcase'
        ],
        links: [
          { title: 'Live Platform', url: 'https://chaintrace.blockchain.com' },
          { title: 'Smart Contract', url: 'https://etherscan.io/address/chaintrace' }
        ],
        order: 3,
        isActive: true
      },
      {
        title: 'Cybercubs National Championship',
        subtitle: 'Winner - Ethical Hacking Competition',
        description: 'Achieved first place in the Cybercubs National Championship 2023, a premier cybersecurity competition that tests ethical hacking skills, penetration testing, and security analysis capabilities.\n\nThe competition included:\n- Web application security assessment\n- Network penetration testing\n- Cryptography challenges\n- Digital forensics investigations\n- Social engineering awareness\n- Incident response scenarios\n\nOur team demonstrated exceptional skills in identifying vulnerabilities, developing security patches, and presenting comprehensive security audit reports.',
        shortDescription: 'First place in Cybercubs National Championship 2023 for ethical hacking and cybersecurity skills.',
        category: 'cybercubs',
        image: 'https://res.cloudinary.com/dr4w6ordx/image/upload/v1000000003/nexgen-studio/cybersecurity-winner.jpg',
        tags: ['Cybersecurity', 'Ethical Hacking', 'Penetration Testing', 'Digital Forensics', 'Network Security'],
        achievements: [
          'National Champion in cybersecurity competition',
          'Certified Ethical Hacker (CEH) recognition',
          'Featured in cybersecurity publications',
          'Invited as speaker at security conferences'
        ],
        links: [
          { title: 'Certificate', url: 'https://cybercubs.org/certificate/2023-winner' },
          { title: 'Competition Details', url: 'https://cybercubs.org/national-championship-2023' }
        ],
        order: 4,
        isActive: true
      },
      {
        title: 'TechCrunch Disrupt Hackathon',
        subtitle: 'AI-Powered Accessibility Tool',
        description: 'Developed "VisionAssist", an AI-powered accessibility tool that helps visually impaired individuals navigate the digital world more effectively. The project was created during TechCrunch Disrupt Hackathon and received significant attention from accessibility advocates and investors.\n\nVisionAssist features:\n- Real-time scene description using computer vision\n- Voice-controlled navigation interface\n- Text-to-speech with context awareness\n- Object recognition and spatial mapping\n- Integration with popular web browsers and mobile apps\n\nThe solution addresses a critical need in the accessibility space and has the potential to impact millions of users globally.',
        shortDescription: 'AI-powered accessibility tool for visually impaired users, developed at TechCrunch Disrupt.',
        category: 'hackathons',
        image: 'https://res.cloudinary.com/dr4w6ordx/image/upload/v1000000004/nexgen-studio/vision-assist.jpg',
        tags: ['Accessibility', 'AI/ML', 'Computer Vision', 'Voice Interface', 'React Native', 'Python'],
        achievements: [
          'Finalist at TechCrunch Disrupt Hackathon',
          'Accessibility Innovation Award',
          'Featured in TechCrunch article',
          'Interest from accessibility organizations'
        ],
        links: [
          { title: 'Demo Video', url: 'https://youtube.com/watch/visionassist-demo' },
          { title: 'TechCrunch Article', url: 'https://techcrunch.com/visionassist-accessibility' }
        ],
        order: 5,
        isActive: true
      }
    ];

    const result = await Work.insertMany(workItems);
    console.log(`✅ Successfully seeded ${result.length} work items`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding work data:', error);
    process.exit(1);
  }
};

seedWorkData();