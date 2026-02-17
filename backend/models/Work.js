import mongoose from 'mongoose';

const workSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Work title is required'],
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
    required: [true, 'Work description is required'],
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
    required: [true, 'Work category is required'],
    enum: ['sih-alumni', 'amity-innovation', 'hackathons', 'cybercubs', 'other'],
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  achievements: [{
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
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add indexes for better performance
workSchema.index({ category: 1, isActive: 1, order: 1 });
workSchema.index({ createdAt: -1 });

const Work = mongoose.model('Work', workSchema);

export default Work;