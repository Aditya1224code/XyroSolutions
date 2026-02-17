import express from 'express';
import { body } from 'express-validator';
import { 
  getPosts, 
  getPost, 
  createPost, 
  updatePost, 
  deletePost,
  getTags
} from '../controllers/blogController.js';
import { protect, authorize, optionalAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

// Validation rules
const postValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required')
];

// Public routes
router.get('/', optionalAuth, getPosts);
router.get('/tags', getTags);
router.get('/:slug', optionalAuth, getPost);

// Protected routes (Admin only)
router.post('/', protect, authorize('admin'), postValidation, validate, createPost);
router.put('/:id', protect, authorize('admin'), updatePost);
router.delete('/:id', protect, authorize('admin'), deletePost);

export default router;
