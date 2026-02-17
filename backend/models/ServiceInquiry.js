import mongoose from 'mongoose';

const serviceInquirySchema = new mongoose.Schema({
  // Service category they're interested in
  category: {
    type: String,
    required: [true, 'Service category is required'],
    enum: ['web-development', 'mobile-apps', 'ai-ml', 'consulting', 'design', 'iot-projects', 'other']
  },
  
  // Project type (specific to category)
  projectType: {
    type: String,
    required: [true, 'Project type is required']
  },
  
  // Project description
  projectDescription: {
    type: String,
    required: [true, 'Project description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  
  // Budget range
  budget: {
    type: String,
    required: [true, 'Budget is required'],
    enum: ['under-5k', '5k-10k', '10k-25k', '25k-50k', '50k-100k', 'above-100k', 'not-sure']
  },
  
  // Timeline
  timeline: {
    type: String,
    required: [true, 'Timeline is required'],
    enum: ['urgent', '1-2-weeks', '1-month', '2-3-months', '3-6-months', 'flexible']
  },
  
  // Features needed (multiple selection)
  features: [{
    type: String
  }],
  
  // Reference websites or apps (optional)
  references: {
    type: String,
    maxlength: [500, 'References cannot exceed 500 characters']
  },
  
  // Contact Information
  contactInfo: {
    name: {
      type: String,
      required: [true, 'Name is required']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required']
    },
    company: {
      type: String
    },
    preferredContact: {
      type: String,
      enum: ['email', 'phone', 'whatsapp'],
      default: 'email'
    }
  },
  
  // Additional notes
  additionalNotes: {
    type: String,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  },
  
  // Status tracking
  status: {
    type: String,
    enum: ['new', 'contacted', 'in-discussion', 'proposal-sent', 'converted', 'closed'],
    default: 'new'
  },
  
  // Admin notes (internal)
  adminNotes: {
    type: String
  },
  
  // Priority
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
serviceInquirySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for efficient queries
serviceInquirySchema.index({ status: 1, createdAt: -1 });
serviceInquirySchema.index({ category: 1 });
serviceInquirySchema.index({ 'contactInfo.email': 1 });

const ServiceInquiry = mongoose.model('ServiceInquiry', serviceInquirySchema);

export default ServiceInquiry;
