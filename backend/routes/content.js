import express from 'express';
import { getContent, updateSection, updateAllContent } from '../controllers/contentController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getContent);

// Protected routes (Admin only)
router.put('/', protect, authorize('admin'), updateAllContent);
router.put('/:section', protect, authorize('admin'), updateSection);

export default router;
