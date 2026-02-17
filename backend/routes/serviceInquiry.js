import express from 'express';
import {
  createInquiry,
  getInquiries,
  getInquiry,
  updateInquiry,
  deleteInquiry,
  getInquiryStats
} from '../controllers/serviceInquiryController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public route - anyone can submit an inquiry
router.post('/', createInquiry);

// Protected routes - admin only
router.get('/', protect, authorize('admin'), getInquiries);
router.get('/stats', protect, authorize('admin'), getInquiryStats);
router.get('/:id', protect, authorize('admin'), getInquiry);
router.put('/:id', protect, authorize('admin'), updateInquiry);
router.delete('/:id', protect, authorize('admin'), deleteInquiry);

export default router;
