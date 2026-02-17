import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Service title is required'],
    trim: true,
    maxLength: [100, 'Title cannot exceed 100 characters']
  },
  subtitle: {
    type: String,
    trim: true,
    maxLength: [200, 'Subtitle cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Service description is required'],
    trim: true,
    maxLength: [2000, 'Description cannot exceed 2000 characters']
  },
  shortDescription: {
    type: String,
    trim: true,
    maxLength: [300, 'Short description cannot exceed 300 characters']
  },
  category: {
    type: String,
    required: [true, 'Service category is required'],
    enum: ['web-development', 'mobile-apps', 'ai-ml', 'consulting', 'design', 'iot-projects', 'other'],
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  features: [{
    type: String,
    trim: true
  }],
  pricing: {
    type: String,
    trim: true
  },
  duration: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  links: [{
    title: {
      type: String,
      trim: true
    },
    url: {
      type: String,
      trim: true
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for better query performance
serviceSchema.index({ category: 1, isActive: 1, order: 1 });
serviceSchema.index({ featured: 1, isActive: 1 });

const Service = mongoose.model('Service', serviceSchema);

export default Service;