import Contact from '../models/Contact.js';
import { sendEmail } from '../utils/email.js';

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req, res, next) => {
  try {
    const { email, message } = req.body;

    // Create contact submission
    const contact = await Contact.create({
      email,
      message,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.headers['user-agent']
    });

    // Try to send notification email (don't fail if email fails)
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        await sendEmail({
          to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER || 'xyrosolutions1@gmail.com',
          replyTo: email,
          subject: `New Contact Form Submission from ${email}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
          `
        });
      }
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError.message);
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! We\'ll get back to you within 2 business days.',
      data: {
        id: contact._id,
        email: contact.email
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact submissions
// @route   GET /api/contact
// @access  Private (Admin)
export const getContacts = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    
    // Build query
    const query = {};
    if (status) {
      query.status = status;
    }

    // Pagination
    const skip = (page - 1) * limit;
    
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('repliedBy', 'email');

    const total = await Contact.countDocuments(query);

    // Get stats
    const stats = await Contact.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      count: contacts.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      stats: stats.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {}),
      data: contacts
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single contact submission
// @route   GET /api/contact/:id
// @access  Private (Admin)
export const getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id).populate('repliedBy', 'email');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    // Mark as read if new
    if (contact.status === 'new') {
      contact.status = 'read';
      await contact.save();
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update contact status
// @route   PUT /api/contact/:id
// @access  Private (Admin)
export const updateContact = async (req, res, next) => {
  try {
    const { status, notes } = req.body;

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    // Update fields
    if (status) {
      contact.status = status;
      if (status === 'replied') {
        contact.repliedAt = Date.now();
        contact.repliedBy = req.user.id;
      }
    }
    if (notes !== undefined) {
      contact.notes = notes;
    }

    await contact.save();

    res.status(200).json({
      success: true,
      message: 'Contact updated successfully',
      data: contact
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete contact submission
// @route   DELETE /api/contact/:id
// @access  Private (Admin)
export const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    await contact.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
