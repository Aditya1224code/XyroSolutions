import Content from '../models/Content.js';

// @desc    Get all content
// @route   GET /api/content
// @access  Public
export const getContent = async (req, res, next) => {
  try {
    // Get the first (and only) content document
    let content = await Content.findOne();

    // If no content exists, create default content
    if (!content) {
      content = await Content.create({
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
        }
      });
    }

    res.status(200).json({
      success: true,
      data: content
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a content section
// @route   PUT /api/content/:section
// @access  Private (Admin)
export const updateSection = async (req, res, next) => {
  try {
    const { section } = req.params;
    const updateData = req.body;

    // Valid sections
    const validSections = [
      'hero', 'about', 'services', 'portfolio', 
      'process', 'results', 'blog', 'contact', 'team'
    ];

    if (!validSections.includes(section)) {
      return res.status(400).json({
        success: false,
        message: `Invalid section. Valid sections are: ${validSections.join(', ')}`
      });
    }

    // Find or create content
    let content = await Content.findOne();
    
    if (!content) {
      content = new Content();
    }

    // Update the specific section
    content[section] = { ...content[section].toObject(), ...updateData };
    content.updatedBy = req.user.id;
    
    await content.save();

    res.status(200).json({
      success: true,
      message: `${section} section updated successfully`,
      data: content[section]
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update all content
// @route   PUT /api/content
// @access  Private (Admin)
export const updateAllContent = async (req, res, next) => {
  try {
    const updateData = req.body;

    // Find or create content
    let content = await Content.findOne();
    
    if (!content) {
      content = new Content(updateData);
    } else {
      // Update each section
      Object.keys(updateData).forEach(section => {
        if (content[section]) {
          content[section] = updateData[section];
        }
      });
    }

    content.updatedBy = req.user.id;
    await content.save();

    res.status(200).json({
      success: true,
      message: 'Content updated successfully',
      data: content
    });
  } catch (error) {
    next(error);
  }
};
