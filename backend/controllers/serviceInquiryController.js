import ServiceInquiry from '../models/ServiceInquiry.js';
import { sendEmail } from '../utils/email.js';

// @desc    Create a new service inquiry
// @route   POST /api/service-inquiries
// @access  Public
export const createInquiry = async (req, res) => {
  try {
    const inquiry = await ServiceInquiry.create(req.body);
    
    // Send response immediately - don't wait for emails
    res.status(201).json({
      success: true,
      message: 'Your inquiry has been submitted successfully. We will contact you soon!',
      data: inquiry
    });
    
    // Send emails in background (non-blocking)
    // Send notification email to admin
    sendEmail({
      to: process.env.ADMIN_EMAIL || 'admin@xyrosolutions.tech',
      subject: `New Service Inquiry: ${inquiry.category}`,
      html: `
        <h2>New Service Inquiry Received</h2>
        <p><strong>Category:</strong> ${inquiry.category}</p>
        <p><strong>Project Type:</strong> ${inquiry.projectType}</p>
        <p><strong>Budget:</strong> ${inquiry.budget}</p>
        <p><strong>Timeline:</strong> ${inquiry.timeline}</p>
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> ${inquiry.contactInfo.name}</p>
        <p><strong>Email:</strong> ${inquiry.contactInfo.email}</p>
        <p><strong>Phone:</strong> ${inquiry.contactInfo.phone}</p>
        <p><strong>Company:</strong> ${inquiry.contactInfo.company || 'N/A'}</p>
        <h3>Project Description</h3>
        <p>${inquiry.projectDescription}</p>
        <p><a href="${process.env.FRONTEND_URL}/admin">View in Admin Dashboard</a></p>
      `
    }).catch(err => console.error('Failed to send admin notification:', err));
    
    // Send confirmation email to user
    sendEmail({
      to: inquiry.contactInfo.email,
      subject: 'Thank you for your inquiry - XyroSolutions',
      html: `
        <h2>Thank you for contacting XyroSolutions!</h2>
        <p>Dear ${inquiry.contactInfo.name},</p>
        <p>We have received your service inquiry and our team will review it shortly.</p>
        <p>Here's a summary of your request:</p>
        <ul>
          <li><strong>Service Category:</strong> ${inquiry.category}</li>
          <li><strong>Project Type:</strong> ${inquiry.projectType}</li>
          <li><strong>Budget Range:</strong> ${inquiry.budget}</li>
          <li><strong>Timeline:</strong> ${inquiry.timeline}</li>
        </ul>
        <p>We typically respond within 24-48 hours. In the meantime, feel free to explore our portfolio at our website.</p>
        <p>Best regards,<br>XyroSolutions Team</p>
      `
    }).catch(err => console.error('Failed to send user confirmation:', err));
    
    return; // Response already sent
  } catch (error) {
    console.error('Create inquiry error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to submit inquiry'
    });
  }
};

// @desc    Get all service inquiries
// @route   GET /api/service-inquiries
// @access  Private (Admin only)
export const getInquiries = async (req, res) => {
  try {
    const { status, category, priority, page = 1, limit = 20 } = req.query;
    
    // Build query
    const query = {};
    if (status) query.status = status;
    if (category) query.category = category;
    if (priority) query.priority = priority;
    
    const skip = (page - 1) * limit;
    
    const inquiries = await ServiceInquiry.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await ServiceInquiry.countDocuments(query);
    
    // Get counts by status
    const statusCounts = await ServiceInquiry.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    
    res.json({
      success: true,
      data: inquiries,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      },
      statusCounts: statusCounts.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {})
    });
  } catch (error) {
    console.error('Get inquiries error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch inquiries'
    });
  }
};

// @desc    Get single service inquiry
// @route   GET /api/service-inquiries/:id
// @access  Private (Admin only)
export const getInquiry = async (req, res) => {
  try {
    const inquiry = await ServiceInquiry.findById(req.params.id);
    
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }
    
    res.json({
      success: true,
      data: inquiry
    });
  } catch (error) {
    console.error('Get inquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch inquiry'
    });
  }
};

// @desc    Update service inquiry
// @route   PUT /api/service-inquiries/:id
// @access  Private (Admin only)
export const updateInquiry = async (req, res) => {
  try {
    const { status, priority, adminNotes } = req.body;
    
    const inquiry = await ServiceInquiry.findByIdAndUpdate(
      req.params.id,
      { status, priority, adminNotes, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }
    
    res.json({
      success: true,
      data: inquiry
    });
  } catch (error) {
    console.error('Update inquiry error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update inquiry'
    });
  }
};

// @desc    Delete service inquiry
// @route   DELETE /api/service-inquiries/:id
// @access  Private (Admin only)
export const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await ServiceInquiry.findByIdAndDelete(req.params.id);
    
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Inquiry deleted successfully'
    });
  } catch (error) {
    console.error('Delete inquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete inquiry'
    });
  }
};

// @desc    Get inquiry statistics
// @route   GET /api/service-inquiries/stats
// @access  Private (Admin only)
export const getInquiryStats = async (req, res) => {
  try {
    const totalInquiries = await ServiceInquiry.countDocuments();
    const newInquiries = await ServiceInquiry.countDocuments({ status: 'new' });
    
    const byCategory = await ServiceInquiry.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    
    const byStatus = await ServiceInquiry.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    
    const byBudget = await ServiceInquiry.aggregate([
      { $group: { _id: '$budget', count: { $sum: 1 } } }
    ]);
    
    // Recent inquiries (last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const recentCount = await ServiceInquiry.countDocuments({
      createdAt: { $gte: weekAgo }
    });
    
    res.json({
      success: true,
      data: {
        totalInquiries,
        newInquiries,
        recentCount,
        byCategory: byCategory.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
        byStatus: byStatus.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
        byBudget: byBudget.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {})
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics'
    });
  }
};
